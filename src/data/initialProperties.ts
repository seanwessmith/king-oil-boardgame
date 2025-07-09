import { PropertyData } from "../types";
import { v4 as uuid } from "uuid";

function makeHoles(pattern: [number, number][]): PropertyData["holes"] {
  return pattern.map(([x, y]) => ({
    id: uuid(),
    state: "unknown" as const,
    x,
    y,
  }));
}

export const initialProperties: PropertyData[] = [
  {
    id: uuid(),
    name: "A1",
    price: 2000,
    owner: null,
    holes: makeHoles([
      [20, 20],
      [50, 20],
      [80, 20],
      [35, 60],
      [65, 60],
      [50, 80],
    ]),
  },
  // …17 more property objects arranged row-wise
];
