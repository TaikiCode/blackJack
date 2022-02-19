import { useReducer } from "react";
import { checkDeckForShuffle } from "../../lib/checkDeckForShuffle";
import { checkForBurst } from "../../lib/checkForBurst";
import { checkGameStatus } from "../../lib/checkGameStatus";
import { drawCards } from "../../lib/drawCards";
import { Card, DealerInfo, PlayerInfo, Status } from "../../types/types";
import { ACTION_TYPE } from "./actionType";
import { initialState } from "./initialState";
import { reducer } from "./reducer";

export const GameReducer = () => {
    const [gameState, gameDispatch] = useReducer(reducer, initialState);

    const handleCalcTotalAction = (
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo
    ) => {
        gameDispatch({
            type: ACTION_TYPE.CALC_TOTAL,
            payload: { ...gameState, playerInfo, dealerInfo },
        });
    };


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
        playerInfo: PlayerInfo,
        status: Status
    ) => {
        let playerTotal = Math.max(playerInfo.total, playerInfo.totalAlt);
        if (playerTotal > 21) playerTotal = Math.min(playerInfo.total, playerInfo.totalAlt);
        const checkedDeck = checkDeckForShuffle(deck);
        let dealerCards = dealerInfo.cards;
        let msg = checkGameStatus(dealerCards, playerTotal);
        if (!msg) {
            do {
                drawCards(checkedDeck, dealerCards, 1);
                msg = checkGameStatus(dealerCards, playerTotal);
            } while (!msg);
        }
        gameDispatch({
            type: ACTION_TYPE.STAY_ACTION,
            payload: { ...gameState, deck, dealerInfo, status: {...status, resultMsg: msg} },
        });
        // calcCards();
    };

    const handleHitAction = (
        deck: Card[],
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo,
        status: Status
    ) => {
        const checkedDeck = checkDeckForShuffle(deck);
        const playerCards = playerInfo.cards;
        drawCards(checkedDeck, playerCards, 1);
        handleCalcTotalAction(dealerInfo, playerInfo);
        gameDispatch({
            type: ACTION_TYPE.HIT_ACTION,
            payload: { ...gameState, deck, playerInfo, status: {...status, resultMsg: checkForBurst(playerCards)} },
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


    const handleResetGameAction = (deck: Card[], playerInfo: PlayerInfo) => {
        gameDispatch({
            type: ACTION_TYPE.RESET_GAME,
            payload: { ...gameState, deck, playerInfo },
        });
    };


    return {
        gameState,
        handleCalcTotalAction,
        handleMakeBet,
        handleClearBet,
        handleDealAction,
        handleHitAction,
        handleStayAction,
        handleResetGameAction,
    };
};
