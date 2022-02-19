import { VFC } from "react";
import { checkDeckForShuffle } from "../../lib/checkDeckForShuffle";
import { drawCards } from "../../lib/drawCards";
import { Card, DealerInfo, Game, PlayerInfo } from "../../types/types";
import ChipList from "../ChipList/ChipList";
import Button from "../common/Button";

interface Props {
    gameState: Game;
    handleMakeBet: (playerInfo: PlayerInfo) => void;
    handleCalcTotalAction: (
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo
    ) => void;
    handleDealAction: (
        deck: Card[],
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo
    ) => void;
    handleClearBet: (playerInfo: PlayerInfo) => void;
    className?: string;
}

const BetSection: VFC<Props> = (props) => {
    const dealClicked = ({ deck, playerInfo, dealerInfo }: Game) => {
        const checkedDeck = checkDeckForShuffle(deck);
        const dealerCards = dealerInfo.cards;
        const playerCards = playerInfo.cards;
        if (playerInfo.betSize === 0) return;
        drawCards(checkedDeck, dealerCards, 2);
        drawCards(checkedDeck, playerCards, 2);
        props.handleDealAction(checkedDeck, dealerInfo, playerInfo);
        props.handleCalcTotalAction(dealerInfo, playerInfo);
    };

    const isDealDisabled = () => {
        return props.gameState.playerInfo.betSize === 0
            ? "bg-gray-500 opacity-40 cursor-not-allowed btn-disabled"
            : "";
    };

    const BUTTON_LIST = [
        {
            className: "blueStyle" + " " + isDealDisabled(),
            onClick: () => dealClicked(props.gameState),
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
