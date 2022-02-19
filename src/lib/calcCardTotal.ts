import { Card } from "../types/types";

// カードの合計スコアを計算
export const calcCardTotal = (cards: Card[], isEleven: boolean): number => {
  let sum = Object.keys(cards).reduce((total, card) => {
    let cardVal = Number(cards[Number(card)].cardValue);
    cardVal = cardVal === 1 && isEleven ? 11 : cardVal;
    return Number(total) + cardVal;
  }, 0);
  return sum;
};
