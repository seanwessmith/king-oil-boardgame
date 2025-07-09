// src/components/Sidebar.tsx
import { useContext } from "react";
import { GameCtx } from "../state/GameProvider";

const Sidebar = () => {
  const { players, current, turn, moneyOwed } = useContext(GameCtx);

  return (
    <aside className="w-56 shrink-0 bg-stone-100 border-l border-stone-300 p-3 flex flex-col gap-4">
      <h2 className="font-semibold text-lg">Game Info</h2>

      <div className="text-sm">
        <p className="mb-1">
          <span className="font-medium">Turn:</span> {turn} (
          {players[current]?.name})
        </p>

        {players.map((p) => (
          <details
            key={p.id}
            open={p.id === current.toString()}
            className="mb-2 border rounded p-2"
          >
            <summary className="cursor-pointer select-none">
              {p.name} — ${p.cash.toLocaleString()}
            </summary>

            <ul className="pl-4 list-disc text-xs">
              <li>Properties: {p.properties.length}</li>
              <li>Wells: {p.wells}</li>
              <li>Caps: {p.caps}</li>
              <li>Pipelines: {p.pipelines}</li>
              {moneyOwed[p.id] > 0 && (
                <li className="text-red-600">
                  Owes ${moneyOwed[p.id].toLocaleString()}
                </li>
              )}
            </ul>
          </details>
        ))}
      </div>

      <button className="mt-auto bg-lime-600 text-white py-2 rounded shadow">
        End Turn
      </button>
    </aside>
  );
};

export default Sidebar;
