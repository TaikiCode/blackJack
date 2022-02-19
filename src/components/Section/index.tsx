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

const Section: VFC<Props> = ({
    gameState,
    handleMakeBet,
    handleClearBet,
    handleDealAction,
    handleHitAction,
    handleStayAction,
    handleCalcTotalAction,
}) =>
    gameState.status.isPlaying ? (
        <PlayingSection
            gameState={gameState}
            handleHitAction={handleHitAction}
            handleStayAction={handleStayAction}
            handleCalcTotalAction={handleCalcTotalAction}
        />
    ) : (
        <BetSection
            gameState={gameState}
            handleMakeBet={handleMakeBet}
            handleCalcTotalAction={handleCalcTotalAction}
            handleDealAction={handleDealAction}
            handleClearBet={handleClearBet}
        />
    );

export default Section;
