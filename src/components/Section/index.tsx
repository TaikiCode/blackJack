import { VFC } from "react";
import { Game, PlayerInfo } from "../../types/types";
import BetSection from "./BetSection";
import PlayingSection from "./PlayingSection";

interface Props {
    gameState: Game;
    handleMakeBet: (playerInfo: PlayerInfo) => void;
    handleClearBet: (playerInfo: PlayerInfo) => void;
    handleDealAction: (gameState: Game) => void;
    handleHitAction: (gameState: Game) => void;
    handleStayAction: (gameState: Game) => void;
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
