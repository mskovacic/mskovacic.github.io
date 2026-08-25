import { useEffect, useState } from "react";
import type { Route } from "./+types/lobby";
import { CityLobby } from "~/features/lobby/cityLobby";
import "~/features/lobby/cityLobby.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "City Lobby · MSK" },
    {
      name: "description",
      content: "Explore the city lobby, meet other players, and start a game.",
    },
  ];
}

export default function Lobby() {
  const [username, setUsername] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("city_lobby_username");
    if (stored) setUsername(stored);
    setIsReady(true);
  }, []);

  if (!isReady) return <div className="lobby-loading">Loading city...</div>;

  return <CityLobby initialUsername={username} onUsernameChange={setUsername} />;
}
