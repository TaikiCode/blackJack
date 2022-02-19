import { useReducer } from "react";
import { GAME_MESSAGE } from "../../contents/gameStatus";
import { checkDeckForShuffle } from "../../lib/checkDeckForShuffle";
import { checkForBurst } from "../../lib/checkForBurst";
import { checkGameStatus } from "../../lib/checkGameStatus";
import { drawCards } from "../../lib/drawCards";
import { DealerInfo, Game, PlayerInfo } from "../../types/types";
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

    const handleStayAction = ({
        deck,
        dealerInfo,
        playerInfo,
        status,
    }: Game) => {
        let playerTotal = Math.max(playerInfo.total, playerInfo.totalAlt);
        if (playerTotal > 21)
            playerTotal = Math.min(playerInfo.total, playerInfo.totalAlt);
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
            payload: {
                ...gameState,
                deck: checkedDeck,
                dealerInfo,
                status: { ...status, resultMsg: msg },
            },
        });
        // calcCards();
    };

    const handleHitAction = ({
        deck,
        dealerInfo,
        playerInfo,
        status,
    }: Game) => {
        const checkedDeck = checkDeckForShuffle(deck);
        const playerCards = playerInfo.cards;
        drawCards(checkedDeck, playerCards, 1);
        handleCalcTotalAction(dealerInfo, playerInfo);
        gameDispatch({
            type: ACTION_TYPE.HIT_ACTION,
            payload: {
                ...gameState,
                deck: checkedDeck,
                playerInfo,
                status: { ...status, resultMsg: checkForBurst(playerCards) },
            },
        });
    };

    const handleDealAction = ({
        deck,
        dealerInfo,
        playerInfo
    }: Game) => {
        const checkedDeck = checkDeckForShuffle(deck);
        const dealerCards = dealerInfo.cards;
        const playerCards = playerInfo.cards;
        if (playerInfo.betSize === 0) return;
        drawCards(checkedDeck, dealerCards, 2);
        drawCards(checkedDeck, playerCards, 2);
        handleCalcTotalAction(dealerInfo, playerInfo);
        gameDispatch({
            type: ACTION_TYPE.DEAL_ACTION,
            payload: {
                ...gameState,
                deck: checkedDeck,
                dealerInfo,
                playerInfo,
            },
        });
    };

    const handleResetGameAction = ({
        deck,
        playerInfo,
        status
    }: Game) => {
        let { betSize, budget } = playerInfo;
        let { resultMsg } = status;
        if (resultMsg === GAME_MESSAGE["draw"]) {
            budget = budget + betSize;
        } else if (resultMsg === GAME_MESSAGE["win"]) {
            budget = budget + betSize * 2;
        }

        gameDispatch({
            type: ACTION_TYPE.RESET_GAME,
            payload: {
                ...gameState,
                deck,
                playerInfo: { ...playerInfo, budget },
            },
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
    };
};
