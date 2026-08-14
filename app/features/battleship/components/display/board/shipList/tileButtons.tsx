import React from "react";

const TileButtons = ({ clearTiles, confirmTiles, randomizeShips }) => {
  return (
    <div>
      <button onClick={confirmTiles}>Confirm</button>
      <button className="cancel" onClick={clearTiles}>Clear</button>
      <button onClick={randomizeShips}>Random</button>
    </div>
  );
};

export default TileButtons;