import { VFC } from "react";
import { Game } from "../../types/types";
import CardList from "../CardList/CardList";
import Button from "../common/Button";

interface Props {
    gameState: Game;
    handleHitAction: (gameState: Game) => void;
    handleStayAction: (gameState: Game) => void;
}

const PlayingSection: VFC<Props> = ({
    gameState,
    handleHitAction,
    handleStayAction,
}) => {
    const BUTTON_LIST = [
        {
            className: "blueStyle",
            onClick: () => handleHitAction(gameState),
            text: "Hit",
        },
        {
            className: "redStyle",
            onClick: () => handleStayAction(gameState),
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
