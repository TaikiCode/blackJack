import { VFC } from "react";
import { GAME_MESSAGE } from "../../contents/gameStatus";
import { Card, Game, PlayerInfo } from "../../types/types";

interface Props {
    gameState: Game;
    handleResetGameAction: (deck: Card[], playerInfo: PlayerInfo) => void;
}

const GameResult: VFC<Props> = ({ gameState, handleResetGameAction }) => {
    const resetGame = ({ deck, playerInfo, status }: Game) => {
        let { betSize, budget } = playerInfo;
        let { resultMsg } = status;
        if (resultMsg === GAME_MESSAGE["draw"]) {
            budget = budget + betSize;
        } else if (resultMsg === GAME_MESSAGE["win"]) {
            budget = budget + betSize * 2;
        }
        handleResetGameAction(deck, { ...playerInfo, budget });
    };

    return (
        <div className="backdrop">
            <p onClick={() => resetGame(gameState)}>
                {gameState.status.resultMsg}
            </p>
        </div>
    );
};

export default GameResult;
