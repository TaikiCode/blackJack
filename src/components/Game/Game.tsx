import { VFC } from "react";
import Alert from "../common/Alert";
import GameResult from "./GameResult";
import Section from "../Section";
import { GameReducer } from "../../reducer/game";

const Game: VFC = () => {
    const gameReducer = GameReducer();
    const { gameState, handleResetGameAction } = gameReducer;

    return (
        <div className="blackJackTable relative">
            <div className="absolute top-10 right-10">
                <Alert
                    displayText={`Budget:  ${gameState.playerInfo.budget}`}
                    className="font-mono bg-black text-lg px-5 py-3 rounded-xl opacity-60 flex items-center"
                />
            </div>
            <Section {...gameReducer} />
            {gameState.status.resultMsg && (
                <GameResult
                    deck={gameState.deck}
                    playerInfo={gameState.playerInfo}
                    status={gameState.status}
                    handleResetGameAction={handleResetGameAction}
                />
            )}
        </div>
    );
};

export default Game;
