import React from "react";
import Hole from "./Hole";
import { HoleState, PropertyData } from "../types";

interface Props {
  data: PropertyData;
  onHoleChange: (holeId: string, newState: HoleState) => void;
}

const Property: React.FC<Props> = ({ data, onHoleChange }) => {
  return (
    <div
      className="relative aspect-square bg-green-200 border-2 border-green-400 flex items-center justify-center"
      title={`${data.name} ($${data.price})`}
    >
      {data.holes.map((hole) => (
        <Hole key={hole.id} hole={hole} onChange={onHoleChange} />
      ))}

      {data.owner && (
        <span className="absolute bottom-1 right-1 text-xs font-semibold">
          {data.owner}
        </span>
      )}
    </div>
  );
};

export default Property;
