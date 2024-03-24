import PropTypes from "prop-types";

export default function Card({
  isRevealed,
  isSelected,
  isMatched,
  isNotMatched,
  isDisabled,
  cardImg,
  cardImgAlt,
  cardID,
  onCardClick,
}) {
  let cardClasses = "w-32 h-32 m-2 rounded-3xl hover:rotate-12";
  isSelected
    ? (cardClasses += " bg-blue-200 rotate-12")
    : (cardClasses += " bg-blue-950");

  isMatched ? (cardClasses += " animate-jump animate-once animate-duration-[2000ms]") : null;
  isNotMatched ? (cardClasses += " animate-shake animate-thrice animate-duration-100") : null;

  const cardContent = isRevealed ? (
    <div className={cardClasses}>
      <img src={cardImg} alt={cardImgAlt} className="w-32 h-32 m-2" />
    </div>
  ) : (
    <div className={cardClasses + " bg-yellow-800"}></div>
  );

  return (
    <div>
      <button onClick={() => onCardClick(cardID)} disabled={isDisabled}>{cardContent}</button>
    </div>
  );
}

Card.propTypes = {
  isRevealed: PropTypes.bool,
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isMatched: PropTypes.bool,
  isNotMatched: PropTypes.bool,
  cardImg: PropTypes.string,
  cardImgAlt: PropTypes.string,
  cardID: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
};
