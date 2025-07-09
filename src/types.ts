export type HoleState = "unknown" | "shallow" | "medium" | "deep" | "dry";

export interface HoleData {
  id: string;
  state: HoleState;
  /** absolute % coords inside the 100×100 property square */
  x: number;
  y: number;
}

export interface PropertyData {
  id: string;
  name: string;
  price: number;
  owner: string | null;
  holes: HoleData[];
}