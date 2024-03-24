import PropTypes from "prop-types";

export default function Card({
  isRevealed,
  isSelected,
  isMatched,
  cardImg,
  cardImgAlt,
  cardID,
  onCardClick,
}) {
  let cardClasses = "w-32 h-32 m-2 rounded-3xl hover:rotate-12";
  isSelected
    ? (cardClasses += " bg-blue-200 rotate-12")
    : (cardClasses += " bg-blue-950");

  isMatched ? (cardClasses += " animate-bounce") : null;

  const cardContent = isRevealed ? (
    <div className={cardClasses}>
      <img src={cardImg} alt={cardImgAlt} className="w-32 h-32 m-2" />
    </div>
  ) : (
    <div className="w-32 h-32 m-2 bg-yellow-800 rounded-3xl hover:rotate-12"></div>
  );

  return (
    <div>
      <button onClick={() => onCardClick(cardID)}>{cardContent}</button>
    </div>
  );
}

Card.propTypes = {
  isRevealed: PropTypes.bool,
  isSelected: PropTypes.bool,
  isMatched: PropTypes.bool,
  cardImg: PropTypes.string,
  cardImgAlt: PropTypes.string,
  cardID: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
};
