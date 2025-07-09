import React from "react";
import { HoleData, HoleState } from "../types";

const cycle: Record<HoleState, HoleState> = {
  unknown: "shallow",
  shallow: "medium",
  medium: "deep",
  deep: "dry",
  dry: "unknown",
};

interface Props {
  hole: HoleData;
  onChange: (holeId: string, newState: HoleState) => void;
}

const Hole: React.FC<Props> = ({ hole, onChange }) => {
  const handleClick = () => onChange(hole.id, cycle[hole.state]);

  const color =
    hole.state === "unknown"
      ? "bg-white border-gray-400"
      : `bg-drilling-${hole.state} border-drilling-${hole.state}`;

  return (
    <button
      onClick={handleClick}
      className={`absolute w-4 h-4 rounded-full border ${color} transition-all`}
      style={{ left: `${hole.x}%`, top: `${hole.y}%` }}
    />
  );
};

export default Hole;
