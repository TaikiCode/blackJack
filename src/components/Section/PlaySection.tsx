import { VFC } from "react";
import { checkDeckForShuffle } from "../../lib/checkDeckForShuffle";
import { checkForBurst } from "../../lib/checkForBurst";
import { checkGameStatus } from "../../lib/checkGameStatus";
import { drawCards } from "../../lib/drawCards";
import { Card, DealerInfo, Game, PlayerInfo, Status } from "../../types/types";
import CardList from "../CardList/CardList";
import Button from "../common/Button";

interface Props {
    gameState: Game;
    handleHitAction: (
        deck: Card[],
        playerInfo: PlayerInfo,
        status: Status
    ) => void;
    handleStayAction: (
        deck: Card[],
        dealerInfo: DealerInfo,
        status: Status
    ) => void;
    handleCalcTotalAction: (
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo
    ) => void;
}

const PlaySection: VFC<Props> = ({
    gameState,
    handleHitAction,
    handleStayAction,
    handleCalcTotalAction,
}) => {
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

    const BUTTON_LIST = [
        {
            className: "blueStyle",
            onClick: () => hitClicked(gameState),
            text: "Hit",
        },
        {
            className: "redStyle",
            onClick: () => stayClicked(gameState),
            text: "Stay",
        },
    ];

    return (
        <div className="h-full w-full flex flex-col justify-center items-center p-10">
            <div className="h-4/5">
                <CardList
                    owner="Dealer: "
                    cardTotal={gameState.dealerInfo.total}
                    cardTotalAlt={gameState.dealerInfo.totalAlt}
                    cards={gameState.dealerInfo.cards}
                />
                <CardList
                    owner="Player: "
                    cardTotal={gameState.playerInfo.total}
                    cardTotalAlt={gameState.playerInfo.totalAlt}
                    cards={gameState.playerInfo.cards}
                />
            </div>
            <div className="h-1/5 flex items-center">
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
    );
};

export default PlaySection;
