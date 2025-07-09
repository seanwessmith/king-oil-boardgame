// src/components/HolesOverlay.tsx
import React, { useContext } from "react";
import { holeMap } from "../data/holeMap";
import { GameCtx } from "../state/GameProvider";

const colorByDepth = {
  unknown: "bg-white border-gray-400",
  dry: "bg-gray-500 border-gray-700",
  shallow: "bg-yellow-400 border-yellow-600",
  medium: "bg-orange-500 border-orange-700",
  deep: "bg-red-600 border-red-800",
};

const HolesOverlay: React.FC = () => {
  const { holes, cycleHole } = useContext(GameCtx);

  return (
    <>
      {holeMap.map(({ id, x, y }) => {
        const state = holes[id]?.state ?? "unknown";
        return (
          <button
            key={id}
            style={{ left: `${x}%`, top: `${y}%` }}
            className={`absolute w-5 h-5 -ml-[10px] -mt-[10px] rounded-full border hover:border-gray-700
                         ${colorByDepth[state]} transition-all`}
            onClick={() => cycleHole(id)}
            aria-label={`Hole ${id}, ${state}`}
          />
        );
      })}
    </>
  );
};

export default HolesOverlay;
