// src/components/Lobby.tsx
import React, { useContext, useState } from "react";
import { LobbyCtx } from "../state/LobbyProvider";

export const Lobby: React.FC = () => {
  const lobbyCtx = useContext(LobbyCtx)!;
  const [name, setName] = useState("");
  const { lobby, join, start } = lobbyCtx;

  if (!lobby) {
    // no lobby yet on server — show a “create & join” form
    return (
      <div className="p-4">
        <h1 className="text-2xl mb-2">Create and Join Lobby</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="border p-2 mb-2 w-full"
        />
        <button
          disabled={!name}
          onClick={() => join(name)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create & Join
        </button>
      </div>
    );
  }

  // lobby exists
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl">Waiting Room</h1>
      <ul className="list-disc list-inside">
        {lobby.players.map((p) => (
          <li key={p} className={p === lobby.host ? "font-bold" : ""}>
            {p} {p === lobby.host && "(Host)"}
          </li>
        ))}
      </ul>
      {/* only the host sees the start button */}
      <button
        disabled={lobby.players.length < 2}
        onClick={() => start()}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {lobby.players.length < 2
          ? "Waiting for another player…"
          : "Start Game"}
      </button>
    </div>
  );
};
