import { VFC, useReducer } from "react";
import { initialState } from "../../reducer/game/initialState";
import { gameReducer } from "../../reducer/game";
import CardList from "../CardList/CardList";
import Alert from "../common/Alert";
import { ACTION_TYPE } from "../../reducer/game/actionType";
import { Card, DealerInfo, PlayerInfo, Status } from "../../types/types";
import { Controls } from "../Controls/Controls";
import GameResult from "../GameResult/GameResult";

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
            <div className="h-2/3">
                <CardList
                    owner="Dealer: "
                    cardTotal={dealerInfo.total}
                    cardTotalAlt={dealerInfo.totalAlt}
                    cards={dealerInfo.cards}
                />
                <CardList
                    owner="Player: "
                    cardTotal={playerInfo.total}
                    cardTotalAlt={playerInfo.totalAlt}
                    cards={playerInfo.cards}
                />
            </div>
            <div className="h-1/3">
                <Controls
                    gameState={gameState}
                    handleStayAction={handleStayAction}
                    handleDealAction={handleDealAction}
                    handleCalcTotalAction={handleCalcTotalAction}
                    handleHitAction={handleHitAction}
                    handleClearBet={handleClearBet}
                    handleMakeBet={handleMakeBet}
                />
            </div>
            <div className="absolute top-5 right-10">
                <Alert
                    displayText={`Budget:  ${playerInfo.budget}`}
                    className="font-mono bg-black text-lg px-5 py-3 rounded-xl opacity-60 flex items-center"
                />
            </div>
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
