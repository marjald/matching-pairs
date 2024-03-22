import { useState } from "react";
import GameBoard from "./components/GameBoard";
import { CARD_DECK } from "./data.js";
import Header from "./components/Header";

function App() {
  const [gameState, setGameState] = useState(CARD_DECK);
  const [playerSelections, setPlayerSelections] = useState([]);

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
      <GameBoard cards={gameState} onCardClick={handleCardSelection} />
    </>
  );
}

export default App;
