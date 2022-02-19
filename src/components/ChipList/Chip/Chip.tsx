import { VFC } from "react";
import { PlayerInfo } from "../../../types/types";
import "./chip.scss";

interface Props {
    chip: any;
    playerInfo: PlayerInfo;
    handleMakeBet: (playerInfo: PlayerInfo) => void;
}

const Chip: VFC<Props> = ({ chip, playerInfo, handleMakeBet }) => {
    return (
        <button
            className={`chip ${chip.color}`}
            onClick={() =>
                handleMakeBet({ ...playerInfo, betSize: chip.value })
            }
        />
    );
};

export default Chip;
