import { createContext, useState } from "react";

export interface HoleState {
  state: "unknown" | "dry" | "shallow" | "medium" | "deep";
}
export interface Player {
  id: string;
  name: string;
  cash: number;
  properties: string[];
  wells: number;
  caps: number;
  pipelines: number;
}

export interface GameState {
  holes: Record<string, HoleState>;
  players: Player[];
  current: number; // index in players
  turn: number;
  moneyOwed: Record<string, number>;
  cycleHole: (holeId: string) => void;
}

export const GameProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, setState] = useState<GameState>({
    holes: {},
    players: [],
    current: 0,
    turn: 0,
    moneyOwed: {},
    cycleHole: (holeId: string) => {
      console.log("cycleHole", holeId);
    },
  });

  return <GameCtx.Provider value={state}>{children}</GameCtx.Provider>;
};

export const GameCtx = createContext<GameState>(null as any);
