export const initialState = {
  deck: [],
  playerInfo: {
    total: 0,
    totalAlt: 0,
    cards: [],
    betSize: 0, // ベッド額
    budget: 1000, // 予算
  },
  dealerInfo: {
    total: 0,
    totalAlt: 0,
    cards: [],
  },
  status: {
    isPlaying: false,
    resultMsg: "",
  },
};
