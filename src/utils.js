export function getCardIndex(cards, cardIdToFind) {
  return cards.findIndex((card) => card.id === cardIdToFind);
}
