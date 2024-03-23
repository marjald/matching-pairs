import { useState } from "react";
import GameBoard from "./components/GameBoard";
import { CARD_DECK } from "./data.js";
import Header from "./components/Header";

const INITIAL_GAMEBOARD = CARD_DECK;
INITIAL_GAMEBOARD.sort(() => Math.random() - 0.5);

function deriveGameBoard(playerSelections) {
  console.log(playerSelections);
  let gameBoard = [...INITIAL_GAMEBOARD];
  for (const selection of playerSelections) {
    const cardIndex = gameBoard.findIndex((card) => card.id === selection);
    gameBoard[cardIndex].revealed = true;
  }
  return gameBoard;
}

function App() {
  const [playerSelections, setPlayerSelections] = useState([]);
  const gameBoard = deriveGameBoard(playerSelections);

  function handleCardSelection(id) {
    // add the selected card id to the playerSelections state array
    setPlayerSelections((prevPlayerSelections) => [
      id,
      ...prevPlayerSelections,
    ]);
  }

  if (playerSelections.length % 2 === 0 && playerSelections.length > 0) {

    const Card1Alt =
      CARD_DECK[CARD_DECK.findIndex((card) => card.id === playerSelections[0])]
        .image.alt;
    const Card2Alt =
      CARD_DECK[CARD_DECK.findIndex((card) => card.id === playerSelections[1])]
        .image.alt;

    if (Card1Alt === Card2Alt) {
      console.log("MATCH");
    } else {
      console.log("NO MATCH");
      setPlayerSelections((prevPlayerSelections) => prevPlayerSelections.slice(2));
    }
  }

  return (
    <>
      <Header heading="Matching Pairs" />
      <GameBoard cards={gameBoard} onCardClick={handleCardSelection} />
    </>
  );
}

export default App;
