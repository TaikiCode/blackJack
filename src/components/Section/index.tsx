import { VFC } from "react";
import { Card, DealerInfo, Game, PlayerInfo, Status } from "../../types/types";
import BetSection from "./BetSection";
import PlayingSection from "./PlayingSection";

interface Props {
    gameState: Game;
    handleMakeBet: (playerInfo: PlayerInfo) => void;
    handleClearBet: (playerInfo: PlayerInfo) => void;
    handleDealAction: (
        deck: Card[],
        dealerInfo: DealerInfo,
        playerInfo: PlayerInfo
    ) => void;
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

const Section: VFC<Props> = ({
    gameState,
    handleMakeBet,
    handleClearBet,
    handleDealAction,
    handleHitAction,
    handleStayAction,
}) =>
    gameState.status.isPlaying ? (
        <PlayingSection
            gameState={gameState}
            handleHitAction={handleHitAction}
            handleStayAction={handleStayAction}
        />
    ) : (
        <BetSection
            gameState={gameState}
            handleMakeBet={handleMakeBet}
            handleDealAction={handleDealAction}
            handleClearBet={handleClearBet}
        />
    );

export default Section;
