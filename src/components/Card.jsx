import PropTypes from "prop-types";

export default function Card({
  selectedCards,
  isRevealed,
  cardImg,
  cardImgAlt,
  cardID,
  onCardClick,
}) {
  const isSelected =
    selectedCards.selectedCard1Id === cardID ||
    selectedCards.selectedCard2Id === cardID;

  const isMatched = isSelected && selectedCards.matchStatus === "matched";
  const isNotMatched = isSelected && selectedCards.matchStatus === "nomatch";
  const isDisabled = selectedCards.matchStatus !== null;

  // Derive the classes needed for each card
  let cardClasses = "w-32 h-32 m-2 rounded-3xl hover:rotate-12";

  // If card is selected then set the selected background colour, otherwise set standard background colour
  isSelected
    ? (cardClasses += " bg-blue-200 rotate-12")
    : (cardClasses += " bg-blue-950");

  // If there is a match then add the success animation, if no match then add shake animation
  if (isMatched) {
    cardClasses += " animate-jump animate-once animate-duration-[2000ms]";
  } else if (isNotMatched) {
    cardClasses += " animate-shake animate-thrice animate-duration-100";
  }

  // set the content for the card.  If it is reveled then show the image, otherwise show empty card (card back).
  const cardContent = isRevealed ? (
    <div className={cardClasses}>
      <img src={cardImg} alt={cardImgAlt} className="w-32 h-32 m-2" />
    </div>
  ) : (
    <div className={cardClasses + " bg-yellow-800"}></div>
  );

  return (
    <div>
      <button onClick={() => onCardClick(cardID)} disabled={isDisabled}>
        {cardContent}
      </button>
    </div>
  );
}

Card.propTypes = {
  selectedCards: PropTypes.shape({
    selectedCard1Id: PropTypes.string,
    selectedCard2Id: PropTypes.string,
    matchStatus: PropTypes.string,
  }),
  isRevealed: PropTypes.bool,
  cardImg: PropTypes.string,
  cardImgAlt: PropTypes.string,
  cardID: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
};
