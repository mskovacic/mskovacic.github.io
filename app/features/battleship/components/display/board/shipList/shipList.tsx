import React from "react";
import "./shipList.css";
import ShipListItem from "./shipListItem";
import TileButtons from "./tileButtons";

const ShipList = ({
  placedShips,
  showConfirmCancelButtons,
  clearTiles,
  confirmTiles,
  randomizeShips,
  shot,
  active
}) => {
  const className = active ? "ship-list active" : "ship-list";
  const lst = [];
  for (const index in placedShips) {
    const ship = placedShips[index];
    lst.push(<ShipListItem key={index} ship={ship} shot={shot} />);
  }
  return (
    <div className={className}>
      <div>{lst}</div>
      {showConfirmCancelButtons && (
        <TileButtons {...{ clearTiles, confirmTiles, randomizeShips }} />
      )}
    </div>
  );
};

export default ShipList;