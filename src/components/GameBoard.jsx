import PropTypes from "prop-types";
import Card from "./Card";

export default function GameBoard({
  cards,
  selectedCard1,
  selectedCard2,
  onCardClick,
}) {
  return (
    <div className="flex flex-wrap gap-4 m-auto w-3/4">
      {cards.map((row) => (
        <Card
          key={row.id}
          isRevealed={row.revealed}
          isSelected={
            (selectedCard1 && selectedCard1.id === row.id) ||
            (selectedCard2 && selectedCard2.id === row.id)
          }
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
  selectedCard1: PropTypes.shape({
    id: PropTypes.string.isRequired,
    revealed: PropTypes.bool,
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
