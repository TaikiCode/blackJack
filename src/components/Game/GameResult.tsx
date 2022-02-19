import { VFC } from "react";
import { GAME_MESSAGE } from "../../contents/gameStatus";
import { Card, PlayerInfo, Status } from "../../types/types";

interface Props {
    deck: Card[];
    playerInfo: PlayerInfo;
    status: Status;
    handleResetGameAction: (deck: Card[], playerInfo: PlayerInfo) => void;
}

const GameResult: VFC<Props> = ({
    deck,
    playerInfo,
    status,
    handleResetGameAction,
}) => {
    const resetGame = (
        deck: Card[],
        playerInfo: PlayerInfo,
        status: Status
    ) => {
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
            <p onClick={() => resetGame(deck, playerInfo, status)}>
                {status.resultMsg}
            </p>
        </div>
    );
};

export default GameResult;
