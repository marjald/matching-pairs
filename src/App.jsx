import GameBoard from "./components/GameBoard";
import { CARD_DECK } from "./data.js";
import Header from "./components/Header";

// shuffle the cards
const INITIAL_GAMEBOARD = CARD_DECK;
INITIAL_GAMEBOARD.sort(() => Math.random() - 0.5);
const gameBoard = [...INITIAL_GAMEBOARD];

function App() {
  return (
    <>
      <Header heading="Matching Pairs" />
      <GameBoard cards={gameBoard} />
    </>
  );
}

export default App;
