import { useReducer, VFC } from "react";
import "./App.css";
import { GAME_MESSAGE } from "./contents/gameStatus";
import { initialState } from "./reducer/game/initialState";
import { reducer } from "./reducer/game/reducer";

const App: VFC = () => {

  const [gameState, gameDispatch] = useReducer(reducer, initialState)

  console.log(gameState)

  return (
    <div className="blackJackTable">
      {typeof GAME_MESSAGE["win"]}

    </div>
  );
};

export default App;
