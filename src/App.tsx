// in App.tsx
import { LobbyProvider } from "./state/LobbyProvider";
import { Lobby } from "./components/Lobby";
import { GameProvider } from "./state/GameProvider";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

export function App() {
  const [inGame, setInGame] = useState(false);

  return (
    <LobbyProvider>
      <div className="min-h-screen">
        {inGame ? (
          <GameProvider>
            <div className="flex">
              <Board />
              <Sidebar />
            </div>
          </GameProvider>
        ) : (
          <Lobby />
        )}
      </div>
    </LobbyProvider>
  );
}
