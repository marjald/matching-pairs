import { useState } from "react";
import GameBoard from "./components/GameBoard";
import { CARD_DECK, gameLength } from "./data.js";
import Header from "./components/Header";

// shuffle the cards
const INITIAL_GAMEBOARD = CARD_DECK;
INITIAL_GAMEBOARD.sort(() => Math.random() - 0.5);

function App() {
  const [playerSelections, setPlayerSelections] = useState([]);
  const gameBoard = [...INITIAL_GAMEBOARD];

  function handleCardSelection(id) {
    // get the index of the selected card in the gameBoard array so we can set it to revealed.
    const selectedCardIndex = gameBoard.findIndex((card) => card.id === id);

    // add the selected card id to the playerSelections state array if it is not currently revealed.
    if (gameBoard[selectedCardIndex].revealed === false) {
      setPlayerSelections((prevPlayerSelections) => [
        id,
        ...prevPlayerSelections,
      ]);
    }
    // update the card in the gameBoard to show as revealed
    gameBoard[selectedCardIndex].revealed = true;
  }

  // The last 2 selected cards from the board, get the index and the card object
  const selectedCard1Index = gameBoard.findIndex(
    (card) => card.id === playerSelections[0]
  );
  const selectedCard2Index = gameBoard.findIndex(
    (card) => card.id === playerSelections[1]
  );
  let selectedCard1 = gameBoard[selectedCard1Index];
  let selectedCard2 = gameBoard[selectedCard2Index];

  // if the length of the playerSelections array is even then we know that a new pair of cards has been selected
  if (playerSelections.length % 2 === 0 && playerSelections.length > 0) {
    // use the card image alt text to identify a match
    if (selectedCard1.image.alt === selectedCard2.image.alt) {
      console.log("MATCH");
    } else {
      // if there is not match then hide the images
      setTimeout(() => {
        gameBoard[selectedCard1Index].revealed = false;
        gameBoard[selectedCard2Index].revealed = false;
      }, 100);
    }
  }

  const revealedCardCount = gameBoard.reduce((count, card) => {
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
    <>
      <Header heading="Matching Pairs" />
      <GameBoard
        cards={gameBoard}
        selectedCard1={selectedCard1}
        selectedCard2={selectedCard2}
        onCardClick={handleCardSelection}
      />
    </>
  );
}

export default App;
