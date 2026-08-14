import Board from "~/features/battleship/components/display/board/board";
import "./display.css";

const Display = ({ myState, opponentState }) => {
  return (
    <div className="display">
      <Board state={myState} />
      <Board state={opponentState} />
    </div>
  );
};

export default Display;