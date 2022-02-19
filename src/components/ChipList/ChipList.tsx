import {VFC} from "react";
import { CHIP_LIST } from "../../contents/chipList";
import { Game, PlayerInfo } from "../../types/types";
import Chip from "./Chip/Chip";

interface Props {
    gameState: Game
    handleMakeBet: (playerInfo: PlayerInfo) => void;
    className?: string
}

const ChipList: VFC<Props> = ({gameState, handleMakeBet, className="chipListStyle"}) => {
    return (
        <div className={className}>
            <span>
                {!gameState.status.isPlaying &&
                    CHIP_LIST.map((chip, index) => (
                        <Chip
                            key={index}
                            chip={chip}
                            playerInfo={gameState.playerInfo}
                            handleMakeBet={handleMakeBet}
                        />
                    ))}
            </span>
        </div>
    );
};

export default ChipList;
