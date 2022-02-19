export const ACTION_TYPE = {
  MAKE_BET: "MAKE_BET",
  CLEAR_BET: "CLEAR_BET",
  HIT_ACTION: "HIT_ACTION",
  DEAL_ACTION: "DEAL_ACTION",
  STAY_ACTION: "STAY_ACTION",
  RESET_GAME: "RESET_ACTION",
  CALC_TOTAL: "CALC_TOTAL",
} as const;

// type SizeType = "small" | "medium" | "large"
export type GameActionType = typeof ACTION_TYPE[keyof typeof ACTION_TYPE];
// 全てのtypeを配列として取得
// const AllSizeType: ("small" | "medium" | "large")[]
// export const AllActionType = Object.values(ActionType);



