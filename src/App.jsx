import { useState } from "react";
import GameBoard from "./components/GameBoard";
import { CARD_DECK } from "./data.js";
import Header from "./components/Header";

let INITIAL_GAMEBOARD = CARD_DECK;

function deriveGameBoard(playerSelections) {
  let gameBoard = [...INITIAL_GAMEBOARD];

  for (const selection of playerSelections) {
    const cardIndex = gameBoard.findIndex(card => card.id === selection)
    gameBoard[cardIndex].revealed = true;
  }
  return gameBoard;
}

function App() {
  console.log('<App /> rendered');
  const [playerSelections, setPlayerSelections] = useState([]);
  const gameBoard = deriveGameBoard(playerSelections);

  function handleCardSelection(id) {
    setPlayerSelections((prevPlayerSelections) => {
      const updatedSelections = [id, ...prevPlayerSelections];
      console.log([id, ...prevPlayerSelections]);
      return updatedSelections;
    });
  }

  return (
    <>
      <Header heading="Matching Pairs" />
      <GameBoard cards={gameBoard} onCardClick={handleCardSelection} />
    </>
  );
}

export default App;
