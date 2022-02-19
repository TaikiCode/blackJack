import { VFC } from "react";
import { Game } from "../../types/types";

interface Props {
    gameState: Game;
    handleResetGameAction: (gameState: Game) => void;
}

const GameResult: VFC<Props> = ({ gameState, handleResetGameAction }) => {
    return (
        <div className="backdrop">
            <p onClick={() => handleResetGameAction(gameState)}>
                {gameState.status.resultMsg}
            </p>
        </div>
    );
};

export default GameResult;
