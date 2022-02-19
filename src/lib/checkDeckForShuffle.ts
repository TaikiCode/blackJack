import { CARD_LIST } from "../contents/cardsData";
import { Card } from "../types/types";

// 最低のデッキ枚数
const MIN_COUNT = 10;

const shuffle = (deck: Card[]): Card[] => {
  let k,
    t,
    j,
    i = deck.length,
    rand = Math.random;
  while (i--) {
    k = (rand() * (i + 1)) | 0;
    t = deck[k];
    deck[k] = deck[i];
    deck[i] = t;
  }
  return deck;
};

// デッキにカードを補充するか
export const checkDeckForShuffle = (currentDeck: Card[]): Card[] => {
  return currentDeck.length < MIN_COUNT
    ? currentDeck.concat(shuffle(CARD_LIST))
    : currentDeck;
};
