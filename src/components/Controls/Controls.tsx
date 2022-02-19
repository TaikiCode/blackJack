import { VFC } from "react";
import { CHIP_LIST } from "../../contents/chipList";
import { checkDeckForShuffle } from "../../lib/checkDeckForShuffle";
import { checkForBurst } from "../../lib/checkForBurst";
import { checkGameStatus } from "../../lib/checkGameStatus";
import { drawCards } from "../../lib/drawCards";
import { Card, DealerInfo, Game, PlayerInfo, Status } from "../../types/types";
import Chip from "../Chip/Chip";
import ChipList from "../ChipList/ChipList";
import Button from "../common/Button";

interface Props {
    gameState: Game;
    handleStayAction: (
        deck: Card[],
        dealerInfo: DealerInfo,
        status: Status
    ) => void;
    handleDealAction: (
        deck: Card[],
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo
    ) => void;
    handleHitAction: (
        deck: Card[],
        playerInfo: PlayerInfo,
        status: Status
    ) => void;
    handleCalcTotalAction: (
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo
    ) => void;
    handleClearBet: (playerInfo: PlayerInfo) => void;
    handleMakeBet: (playerInfo: PlayerInfo) => void;
}

export const Controls: VFC<Props> = ({
    gameState,
    handleStayAction,
    handleDealAction,
    handleCalcTotalAction,
    handleHitAction,
    handleClearBet,
    handleMakeBet,
}) => {
    const stayClicked = (gameState: Game) => {
        const { deck, playerInfo, dealerInfo, status } = gameState;
        let playerTotal = Math.max(playerInfo.total, playerInfo.totalAlt);
        if (playerTotal > 21)
            playerTotal = Math.min(playerInfo.total, playerInfo.totalAlt);
        const checkedDeck = checkDeckForShuffle(deck);
        let dealerCards = dealerInfo.cards;
        let msg = checkGameStatus(dealerCards, playerTotal);

        if (msg === "") {
            do {
                drawCards(checkedDeck, dealerCards, 1);
                msg = checkGameStatus(dealerCards, playerTotal);
            } while (msg === "");
        }
        handleStayAction(checkedDeck, dealerInfo, {
            ...status,
            resultMsg: msg,
        });
        // calcCards();
    };

    const dealClicked = (gameState: Game) => {
        const { deck, playerInfo, dealerInfo } = gameState;
        const checkedDeck = checkDeckForShuffle(deck);
        const dealerCards = dealerInfo.cards;
        const playerCards = playerInfo.cards;
        if (playerInfo.betSize === 0) return;
        drawCards(checkedDeck, dealerCards, 2);
        drawCards(checkedDeck, playerCards, 2);
        handleDealAction(checkedDeck, dealerInfo, playerInfo);
        handleCalcTotalAction(dealerInfo, playerInfo);
    };

    const hitClicked = (gameState: Game) => {
        const { deck, playerInfo, dealerInfo, status } = gameState;
        const checkedDeck = checkDeckForShuffle(deck);
        const playerCards = playerInfo.cards;
        drawCards(checkedDeck, playerCards, 1);
        handleCalcTotalAction(dealerInfo, playerInfo);
        handleHitAction(checkedDeck, playerInfo, {
            ...status,
            resultMsg: checkForBurst(playerCards),
        });
    };

    const buttonVisible = (checkVal: boolean) => {
        return gameState.status.isPlaying === checkVal ? "hidden" : "";
    };

    const isDealDisabled = () => {
        return gameState.playerInfo.betSize === 0
            ? "bg-gray-500 opacity-40 cursor-not-allowed"
            : "";
    };

    const BUTTON_LIST = [
        {
            className:
                "blueStyle" +
                " " +
                isDealDisabled() +
                " " +
                buttonVisible(true),
            onClick: () => dealClicked(gameState),
            text: "Deal",
        },
        {
            className: "blueStyle" + " " + buttonVisible(false),
            onClick: () => hitClicked(gameState),
            text: "Hit",
        },
        {
            className: "redStyle" + " " + buttonVisible(false),
            onClick: () => stayClicked(gameState),
            text: "Stay",
        },
        {
            className: "yellowStyle" + " " + buttonVisible(true),
            onClick: () => handleClearBet(gameState.playerInfo),
            text: "Clear",
        },
    ];

    return (
        <div className="h-full">
            <div className="h-auto flex justify-center items-center">
                <div className="bg-black opacity-70 flex items-center rounded-md p-5 font-mono">
                    Bet: {gameState.playerInfo.betSize}
                </div>
                <span style={{ paddingLeft: 40 }}>
                    {BUTTON_LIST.map((item, index) => (
                        <Button
                            key={index}
                            displayText={item.text}
                            className={item.className + " " + "btnStyle"}
                            onClick={item.onClick}
                        />
                    ))}
                </span>
            </div>
            <ChipList gameState={gameState} handleMakeBet={handleMakeBet} />
        </div>
    );
};
