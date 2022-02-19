import { GAME_MESSAGE } from "../contents/gameStatus";
import { Card } from "../types/types";
import { calcCardTotal } from "./calcCardTotal";

//  バーストしたかどうかの判定
export const checkForBurst = (playerCards: Card[]): string => {
  const t1 = calcCardTotal(playerCards, false);
  const t2 = calcCardTotal(playerCards, true);
  const min = Math.min(t1, t2);
  return min > 21 ? GAME_MESSAGE["burst"] : "";
};
