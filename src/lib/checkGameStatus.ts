import { GAME_MESSAGE } from "../contents/gameStatus";
import { Card } from "../types/types";
import { calcCardTotal } from "./calcCardTotal";

export const checkGameStatus = (
  dealerCards: Card[],
  playerTotal: number
): string => {
  let status = "";

  const t1 = calcCardTotal(dealerCards, false);
  const t2 = calcCardTotal(dealerCards, true);

  if (Math.min(t1, t2) > 21) {
    status = GAME_MESSAGE["win"];
  } else if (
    (t1 <= 21 && t1 === playerTotal) ||
    (t2 <= 21 && t2 === playerTotal)
  ) {
    status = GAME_MESSAGE["draw"];
  } else if ((t1 <= 21 && t1 > playerTotal) || (t2 <= 21 && t2 > playerTotal)) {
    status = GAME_MESSAGE["lose"];
  }

  return status;
};
