import { useReducer } from "react";
import { Card, DealerInfo, PlayerInfo, Status } from "../../types/types";
import { ACTION_TYPE } from "./actionType";
import { initialState } from "./initialState";
import { reducer } from "./reducer";

export const GameReducer = () => {
    const [gameState, gameDispatch] = useReducer(reducer, initialState);

    const handleMakeBet = (playerInfo: PlayerInfo) => {
        gameDispatch({
            type: ACTION_TYPE.MAKE_BET,
            payload: { ...gameState, playerInfo },
        });
    };

    const handleClearBet = (playerInfo: PlayerInfo) => {
        gameDispatch({
            type: ACTION_TYPE.CLEAR_BET,
            payload: { ...gameState, playerInfo },
        });
    };

    const handleStayAction = (
        deck: Card[],
        dealerInfo: DealerInfo,
        status: Status
    ) => {
        gameDispatch({
            type: ACTION_TYPE.STAY_ACTION,
            payload: { ...gameState, deck, dealerInfo, status },
        });
    };

    const handleDealAction = (
        deck: Card[],
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo
    ) => {
        gameDispatch({
            type: ACTION_TYPE.DEAL_ACTION,
            payload: { ...gameState, deck, dealerInfo, playerInfo },
        });
    };

    const handleHitAction = (
        deck: Card[],
        playerInfo: PlayerInfo,
        status: Status
    ) => {
        gameDispatch({
            type: ACTION_TYPE.HIT_ACTION,
            payload: { ...gameState, deck, playerInfo, status },
        });
    };

    const handleResetGameAction = (deck: Card[], playerInfo: PlayerInfo) => {
        gameDispatch({
            type: ACTION_TYPE.RESET_GAME,
            payload: { ...gameState, deck, playerInfo },
        });
    };

    const handleCalcTotalAction = (
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo
    ) => {
        gameDispatch({
            type: ACTION_TYPE.CALC_TOTAL,
            payload: { ...gameState, playerInfo, dealerInfo },
        });
    };

    return {
        gameState,
        handleMakeBet,
        handleClearBet,
        handleDealAction,
        handleHitAction,
        handleStayAction,
        handleResetGameAction,
        handleCalcTotalAction,
    };
};
