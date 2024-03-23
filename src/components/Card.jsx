import PropTypes from "prop-types";

export default function Card({
  isRevealed,
  cardImg,
  cardImgAlt,
  cardID,
  onCardClick,
}) {
  const cardContent = isRevealed ? (
    <div className="w-32 h-32 m-2 bg-yellow-600 rounded-3xl hover:rotate-12"><img src={cardImg} alt={cardImgAlt} className="w-32 h-32 m-2" /></div>
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
  cardImg: PropTypes.string,
  cardImgAlt: PropTypes.string,
  cardID: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
};
