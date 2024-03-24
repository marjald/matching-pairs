import PropTypes from "prop-types";
import { useState } from "react";
import Card from "./Card";
import { gameLength } from "../data";

export default function GameBoard({ cards }) {
  const [playerSelections, setPlayerSelections] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  console.log(selectedCards);
  function handleCardSelection(id) {
    // get the index of the selected card in the gameBoard array so we can set it to revealed.
    const selectedCardIndex = cards.findIndex((card) => card.id === id);

    // if there was no match on last turn then selectedCards would contain null. Hide the cards on this click.
    if (selectedCards.includes(null)) {
      cards[selectedCard1Index].revealed = false;
      cards[selectedCard2Index].revealed = false;
      setSelectedCards([]);
    }

    // add the selected card id to the playerSelections state array if it is not currently revealed.
    if (cards[selectedCardIndex].revealed === false) {
      setPlayerSelections((prevPlayerSelections) => [
        id,
        ...prevPlayerSelections,
      ]);

      // update the selected cards state.  If there is only 1 then don't bother removing the last one.
      setSelectedCards((prevSelectedCards) => {
        if (prevSelectedCards.length === 2) {
          return [id, ...prevSelectedCards.slice(0, -1)];
        } else return [id, ...prevSelectedCards];
      });

      // update the card in the gameBoard to show as revealed
      cards[selectedCardIndex].revealed = true;

      // Selected Cards Match

      // Selected Cards don't match
    }
  }

  // The last 2 selected cards from the board, get the index and the card object
  const selectedCard1Index = cards.findIndex(
    (card) => card.id === playerSelections[0]
  );
  const selectedCard2Index = cards.findIndex(
    (card) => card.id === playerSelections[1]
  );
  let selectedCard1 = cards[selectedCard1Index];
  let selectedCard2 = cards[selectedCard2Index];

  // if the length of the playerSelections array is even then we know that a new pair of cards has been selected
  if (
    playerSelections.length % 2 === 0 &&
    playerSelections.length > 0 &&
    selectedCards.length === 2
  ) {
    // use the card image alt text to identify a match
    if (selectedCard1.image.alt === selectedCard2.image.alt) {
      setSelectedCards((prevSelectedCards) => [
        "matched",
        ...prevSelectedCards,
      ]);
      setTimeout(() => {
        setSelectedCards([]);
      }, 1500);
    } else {
      setSelectedCards((prevSelectedCards) => [
        "nomatch",
        ...prevSelectedCards,
      ]);
      //if there is not match then hide the images
      setTimeout(() => {
        setSelectedCards((prevSelectedCards) => [
          null,
          ...prevSelectedCards.slice(1),
        ]);
      }, 500);
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
          isRevealed={row.revealed}
          isSelected={selectedCards.includes(row.id)}
          isMatched={
            selectedCards.includes(row.id) && selectedCards.includes("matched")
          }
          isNotMatched={
            selectedCards.includes(row.id) && selectedCards.includes("nomatch")
          }
          isDisabled={selectedCards.includes('matched') || selectedCards.includes('nomatch')}
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
