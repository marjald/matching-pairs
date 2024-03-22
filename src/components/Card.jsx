import PropTypes from "prop-types";

export default function Card({
  isRevealed,
  cardImg,
  cardImgAlt,
  cardID,
  onCardClick,
}) {
  const cardContent = isRevealed ? (
    <img src={cardImg} alt={cardImgAlt} className="w-32 h-32 m-2" />
  ) : (
    <div className="w-32 h-32 m-2 bg-yellow-800"></div>
  );

  return (
    <div>
      <button onClick={() => onCardClick(cardID)}>{cardContent}</button>
    </div>
  );
}

Card.propTypes = {
  isRevealed: PropTypes.bool,
  cardImg: PropTypes.string,
  cardImgAlt: PropTypes.string,
  cardID: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
};
