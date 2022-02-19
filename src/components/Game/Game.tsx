import { VFC, useReducer } from "react";
import { initialState } from "../../reducer/game/initialState";
import { gameReducer } from "../../reducer/game";
import Alert from "../common/Alert";
import { ACTION_TYPE } from "../../reducer/game/actionType";
import { Card, DealerInfo, PlayerInfo, Status } from "../../types/types";
import GameResult from "../GameResult/GameResult";
import Section from "../Section";

const Game: VFC = () => {
    const [gameState, gameDispatch] = useReducer(gameReducer, initialState);
    const { deck, playerInfo, dealerInfo, status } = gameState;

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

    return (
        <div className="blackJackTable relative">
            <div className="absolute top-10 right-10">
                <Alert
                    displayText={`Budget:  ${playerInfo.budget}`}
                    className="font-mono bg-black text-lg px-5 py-3 rounded-xl opacity-60 flex items-center"
                />
            </div>
            <Section
                gameState={gameState}
                handleMakeBet={handleMakeBet}
                handleCalcTotalAction={handleCalcTotalAction}
                handleDealAction={handleDealAction}
                handleClearBet={handleClearBet}
                handleHitAction={handleHitAction}
                handleStayAction={handleStayAction}
            />
            {status.resultMsg && (
                <GameResult
                    deck={deck}
                    playerInfo={playerInfo}
                    status={status}
                    handleResetGameAction={handleResetGameAction}
                />
            )}
        </div>
    );
};

export default Game;
