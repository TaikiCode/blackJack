import { Reducer } from "react";
import { calcCardTotal } from "../../lib/calcCardTotal";
import { Game } from "../../types/types";
import { GameActionType, ACTION_TYPE } from "./actionType";
import { initialState } from "./initialState";

export interface GameAction {
    type: GameActionType;
    payload: Game;
}

export const gameReducer: Reducer<Game, GameAction> = (
    state: Game,
    action: GameAction
) => {
    switch (action.type) {
        // ベットする
        case ACTION_TYPE.MAKE_BET: {
            let { betSize } = action.payload.playerInfo;
            const { budget } = state.playerInfo;
            if (budget < betSize) {
                betSize = budget;
            }
            return {
                ...state,
                playerInfo: {
                    ...state.playerInfo,
                    betSize: state.playerInfo.betSize + betSize,
                    budget: budget - betSize,
                },
            };
        }
        // ベット取り消し
        case ACTION_TYPE.CLEAR_BET: {
            const { betSize } = action.payload.playerInfo;
            return {
                ...state,
                playerInfo: {
                    ...state.playerInfo,
                    betSize: 0,
                    budget: state.playerInfo.budget + betSize,
                },
            };
        }
        // ヒット（１枚カードをひく）
        case ACTION_TYPE.HIT_ACTION: {
            const { deck, playerInfo, status } = action.payload;
            return {
                ...state,
                deck,
                playerInfo: {
                    ...state.playerInfo,
                    cards: playerInfo.cards,
                },
                status: {
                    ...state.status,
                    resultMsg: status.resultMsg,
                },
            };
        }
        // ゲームスタート
        case ACTION_TYPE.DEAL_ACTION: {
            const { deck, playerInfo, dealerInfo } = action.payload;
            return {
                ...state,
                deck,
                playerInfo: {
                    ...state.playerInfo,
                    cards: playerInfo.cards,
                },
                dealerInfo: {
                    ...state.dealerInfo,
                    cards: dealerInfo.cards,
                },
                status: {
                    ...state.status,
                    isPlaying: true,
                },
            };
        }
        // もうカードいらない
        case ACTION_TYPE.STAY_ACTION: {
            const { deck, dealerInfo, status } = action.payload;
            return {
                ...state,
                deck,
                dealerInfo: {
                    ...state.dealerInfo,
                    cards: dealerInfo.cards,
                },
                status: {
                    ...state.status,
                    resultMsg: status.resultMsg,
                },
            };
        }
        // ゲームリセット
        case ACTION_TYPE.RESET_GAME: {
            const { deck, playerInfo } = action.payload;
            return {
                ...initialState,
                deck,
                playerInfo: {
                    ...initialState.playerInfo,
                    cards: [],
                    budget: playerInfo.budget,
                },
                dealerInfo: {
                    ...initialState.dealerInfo,
                    cards: [],
                },
            };
        }
        case ACTION_TYPE.CALC_TOTAL: {
            const { playerInfo, dealerInfo } = action.payload;
            return {
                ...state,
                playerInfo: {
                    ...state.playerInfo,
                    total: calcCardTotal(playerInfo.cards, false),
                    totalAlt: calcCardTotal(playerInfo.cards, true),
                },
                dealerInfo: {
                    ...state.dealerInfo,
                    total: calcCardTotal(dealerInfo.cards, false),
                    totalAlt: calcCardTotal(dealerInfo.cards, true),
                },
            };
        }
        default:
            throw new Error();
    }
};

