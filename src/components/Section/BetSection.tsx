import { VFC } from "react";
import { Card, DealerInfo, Game, PlayerInfo } from "../../types/types";
import ChipList from "../ChipList/ChipList";
import Button from "../common/Button";

interface Props {
    gameState: Game;
    handleMakeBet: (playerInfo: PlayerInfo) => void;
    handleDealAction: (
        deck: Card[],
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo
    ) => void;
    handleClearBet: (playerInfo: PlayerInfo) => void;
    className?: string;
}

const BetSection: VFC<Props> = (props) => {

    const {deck, dealerInfo, playerInfo, status} = props.gameState;

    const isDealDisabled = () => {
        return props.gameState.playerInfo.betSize === 0
            ? "bg-gray-500 opacity-40 cursor-not-allowed btn-disabled"
            : "";
    };

    const BUTTON_LIST = [
        {
            className: "blueStyle" + " " + isDealDisabled(),
            onClick: () => props.handleDealAction(deck, dealerInfo, playerInfo),
            text: "Deal",
        },
        {
            className: "yellowStyle",
            onClick: () => props.handleClearBet(props.gameState.playerInfo),
            text: "Clear",
        },
    ];

    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="text-2xl italic tracking-widest">ベッド額はいくらにしますか？</h1>
            <p className="text-gray-300 text-sm my-3">*チップをクリックしてベッドする</p>
            <div className="flex items-center mt-20 mb-10">
                <div className="bg-black opacity-70 flex items-center rounded-md p-5 font-mono">
                    Bet: {props.gameState.playerInfo.betSize}
                </div>
                <div className="ml-24">
                    {BUTTON_LIST.map((item, index) => (
                        <Button
                            key={index}
                            displayText={item.text}
                            className={item.className + " " + "btnStyle"}
                            onClick={item.onClick}
                        />
                    ))}
                </div>
            </div>
            <ChipList {...props} className="flex justify-center items-center" />
        </div>
    );
};

export default BetSection;
