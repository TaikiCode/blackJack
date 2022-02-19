import { VFC } from "react";
import { Card, DealerInfo, Game, PlayerInfo, Status } from "../../types/types";
import CardList from "../CardList/CardList";
import Button from "../common/Button";

interface Props {
    gameState: Game;
    handleHitAction: (
        deck: Card[],
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo,
        status: Status
    ) => void;
    handleStayAction: (
        deck: Card[],
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo,
        status: Status
    ) => void;
}

const PlayingSection: VFC<Props> = ({
    gameState,
    handleHitAction,
    handleStayAction,
}) => {

    const {deck, dealerInfo, playerInfo, status} = gameState;

    const BUTTON_LIST = [
        {
            className: "blueStyle",
            onClick: () => handleHitAction(deck, dealerInfo, playerInfo, status),
            text: "Hit",
        },
        {
            className: "redStyle",
            onClick: () => handleStayAction(deck, dealerInfo, playerInfo, status),
            text: "Stay",
        },
    ];

    return (
        <div className="h-full w-full flex flex-col justify-center items-center p-10">
            <div className="h-4/5">
                <CardList owner="Dealer: " cardInfo={gameState.dealerInfo} />
                <CardList owner="Player: " cardInfo={gameState.playerInfo} />
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

export default PlayingSection;
