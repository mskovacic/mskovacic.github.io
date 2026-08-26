import React from "react";
import "./log.css";
import LogListItem from "./logListItem";
import NewGameButton from "./newGameButton";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const LogList = ({ messages, newGame, isGameOver, hasRequestedRematch }) => {
  const log = useScrollToBottom(messages);

  const elms = messages.map(({ time, message }, index) => {
    return <LogListItem key={index} time={time} message={message} />;
  });

  return (
    <div className="log-display">
      <NewGameButton {...{ newGame, isGameOver, hasRequestedRematch }} />
      <div className="logs" ref={log}>
        {elms}
      </div>
    </div>
  );
};

export default LogList;
