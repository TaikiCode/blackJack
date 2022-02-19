import { VFC } from "react";
import { GAME_MESSAGE } from "../../contents/gameStatus";
import { Card, Game, PlayerInfo, Status } from "../../types/types";

interface Props {
    gameState: Game;
    handleResetGameAction: (
        deck: Card[],
        playerInfo: PlayerInfo,
        status: Status
    ) => void;
}

const GameResult: VFC<Props> = ({ gameState, handleResetGameAction }) => {
    const { deck, playerInfo, status } = gameState;
    return (
        <div className="backdrop">
            <p onClick={() => handleResetGameAction(deck, playerInfo, status)}>
                {gameState.status.resultMsg}
            </p>
        </div>
    );
};

export default GameResult;
