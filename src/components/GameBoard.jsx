import PropTypes from "prop-types";
import Card from "./Card";

export default function GameBoard({ cards, onCardClick }) {
  console.log('<GameBoard /> rendered');
  return (
    <div className="flex flex-wrap mx-72">
      {cards.map((row) => (       
          <Card key={row.id}
            isRevealed={row.revealed}
            cardImg={row.image.src}
            cardImgAlt={row.image.alt}
            cardID={row.id}
            onCardClick={onCardClick}
          />
      ))}
    </div>
  );
}

GameBoard.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      revealed: PropTypes.bool,
      image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onCardClick: PropTypes.func.isRequired,
};
