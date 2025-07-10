// src/state/LobbyProvider.tsx
import React, { createContext, useEffect, useState } from "react";

interface Lobby {
  id: string;
  players: string[];
  host: string;
}

interface LobbyCtx {
  lobby: Lobby | null;
  join: (name: string) => void;
  leave: (name: string) => void;
  start: () => void;
}

export const LobbyCtx = createContext<LobbyCtx | null>(null);

export const LobbyProvider = ({ children }: { children: React.ReactNode }) => {
  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [ws] = useState(new WebSocket("ws://localhost:3000/chat"));

  useEffect(() => {
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("message", message);
      switch (message.type) {
        case "lobbyUpdate":
          setLobby(message.body);
          break;
        case "gameStarted":
          setLobby(null);
          break;
        default:
          console.log("unknown message type", message);
          break;
      }
    };
    return () => {
      ws.close();
    };
  }, [ws]);

  const join = (playerName: string) => {
    ws.send(JSON.stringify({ type: "joinLobby", body: { playerName } }));
  };
  const leave = (playerName: string) =>
    ws.send(JSON.stringify({ type: "leaveLobby", body: { playerName } }));
  const start = () => ws.send(JSON.stringify({ type: "startGame" }));

  return (
    <LobbyCtx.Provider value={{ lobby, join, leave, start }}>
      {children}
    </LobbyCtx.Provider>
  );
};
