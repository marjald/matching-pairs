import PropTypes from "prop-types";
import { useState } from "react";
import Card from "./Card";
import { gameLength } from "../data";
import { getCardIndex } from "../utils";

export default function GameBoard({ cards }) {
  const [gameState, setGamesState] = useState({
    selectedCard1Id: null,
    selectedCard2Id: null,
    matchStatus: null,
  });

  function handleCardSelection(id) {
    // get the index of the selected card on the board (cards array) in the gameBoard array so we can set it to revealed.
    const selectedCardIndex = getCardIndex(cards, id);
    cards[selectedCardIndex].revealed = true;

    // if there is already a card selected...
    if (gameState.selectedCard1Id) {
      // ...get the index of this card.  We now have the 2 selected card indexes selectedCardIndex and prevSelectedCardIndex
      const prevSelectedCardIndex = getCardIndex(
        cards,
        gameState.selectedCard1Id
      );
      // check for a match between the 2 selected cards using the alt image text which is the same for each pair of cards
      // status is either matched or nomatch and set to selectedMatchStatus to use in updating the game state
      const selectedMatchStatus =
        cards[prevSelectedCardIndex].image.alt ===
        cards[selectedCardIndex].image.alt
          ? "matched"
          : "nomatch";
      // update to matched state which will trigger the animation styles and disable the click actions on other cards.
      setGamesState((prevGameState) => {
        return {
          ...prevGameState,
          selectedCard2Id: id,
          matchStatus: selectedMatchStatus,
        };
      });
      // wait and then reset so the matched cards will be de-selected and animation stopped.
      setTimeout(() => {
        // if there wasn't a match then we also need to hide the cards that were selected (flip them face down)
        // if there was a match this is not needed as the cards can remain face up
        if (selectedMatchStatus === "nomatch") {
          cards[prevSelectedCardIndex].revealed = false;
          cards[selectedCardIndex].revealed = false;
        }
        setGamesState({
          selectedCard1Id: null,
          selectedCard2Id: null,
          matchStatus: null,
        });
      }, 1750);
    } else {
      // no cards selected
      setGamesState({
        selectedCard1Id: id,
        selectedCard2Id: null,
        matchStatus: null,
      });
    }
  }

  // temporary end of game check.  need to add a game over screen with a reset and score perhaps.
  const revealedCardCount = cards.reduce((count, card) => {
    // Check if the revealed property is true
    if (card.revealed === true) {
      // Increment the count if the condition is met
      return count + 1;
    }
    return count; // Return the current count if the condition is not met
  }, 0); // Initialize count to 0

  console.log("Number of revealed cards:", revealedCardCount);

  if (revealedCardCount === gameLength) {
    console.log("*** YOU WIN ***");
  }

  return (
    <div className="flex flex-wrap gap-4 m-auto w-3/4">
      {cards.map((row) => (
        <Card
          key={row.id}
          selectedCards={gameState}
          isRevealed={row.revealed}
          cardImg={row.image.src}
          cardImgAlt={row.image.alt}
          cardID={row.id}
          onCardClick={handleCardSelection}
        />
      ))}
    </div>
  );
}

// Define the PropTypes shape as a constant
const cardShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  revealed: PropTypes.bool,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
});

// GameBoard.propTypes definition with selectedCard1 and selectedCard2
GameBoard.propTypes = {
  cards: PropTypes.arrayOf(cardShape).isRequired,
  selectedCards: PropTypes.arrayOf(PropTypes.string),
};
