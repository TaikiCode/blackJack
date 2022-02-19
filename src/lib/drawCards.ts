import { Card } from "../types/types";

// カードを引く処理
export const drawCards = (deck: Card[], playerCards: Card[], numberOfCards: number): Card[] => {
  for (let i = 1; i <= numberOfCards; i++) {
    const card: any = deck.pop();
    playerCards.push(card);
  }
  return playerCards;
};

