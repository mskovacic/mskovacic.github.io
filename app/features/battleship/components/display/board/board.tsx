import Coordinate from "./coordinate/coordinate";
import ShipList from "./shipList/shipList";
import Overlay from "./overlay";
import "./board.css";

const Board = ({ state }) => {
  const {
    myBoard,
    placedShips,
    overlaySettings,
    title,
    showConfirmCancelButtons,
    clearTiles,
    clickTile,
    chosenTiles,
    confirmTiles,
    randomizeShips,
    shot,
    active,
  } = state;

  const boardClass = active ? "board active" : "board";

  const coordinate = (
    <div className={boardClass}>
      <h3>{title}</h3>
      <Coordinate {...{ placedShips, clickTile, chosenTiles, shot, myBoard }} />
    </div>
  );

  const shipList = (
    <ShipList
      {...{
        active,
        placedShips,
        showConfirmCancelButtons,
        clearTiles,
        confirmTiles,
        randomizeShips,
        shot,
      }}
    />
  );

  const board = myBoard ? (
    <>
      {shipList}
      {coordinate}
    </>
  ) : (
    <>
      {coordinate}
      {shipList}
    </>
  );

  return (
    <div className="whole-board">
      {board}
      <Overlay settings={overlaySettings} />
    </div>
  );
};

export default Board;