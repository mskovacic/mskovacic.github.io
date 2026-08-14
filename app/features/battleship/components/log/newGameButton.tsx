import React from "react";

const NewGameButton = ({ newGame, isGameOver, hasRequestedRematch }) => {
  if (!isGameOver) return null;

  return (
    <div className="new-game">
      <button onClick={newGame} disabled={hasRequestedRematch}>
        {hasRequestedRematch ? "Waiting for opponent..." : "Play again"}
      </button>
    </div>
  );
};

export default NewGameButton;
