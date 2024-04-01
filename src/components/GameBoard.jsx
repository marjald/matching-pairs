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
    // if the card is not revealed
    if (cards[selectedCardIndex].revealed === false) {
      // reveal it
      cards[selectedCardIndex].revealed = true;
    }

    if (gameState.selectedCard1Id) {
      // check for a match
      const selectedMatchStatus =
        cards[getCardIndex(cards, gameState.selectedCard1Id)].image.alt ===
        cards[getCardIndex(cards, id)].image.alt
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
        if (selectedMatchStatus === "nomatch") {
          cards[
            getCardIndex(cards, gameState.selectedCard1Id)
          ].revealed = false;
          cards[getCardIndex(cards, id)].revealed = false;
        }
        setGamesState({
          selectedCard1Id: null,
          selectedCard2Id: null,
          matchStatus: null,
        });
      }, 1750);
    } else {
      // no cards selected (first time only)
      setGamesState({
        selectedCard1Id: id,
        selectedCard2Id: null,
        matchStatus: null,
      });
    }
  }

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
