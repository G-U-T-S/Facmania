export interface basicVector {
  x: number;
  y: number;
};


export type objectTypes = "none" | "belt" | "itemSource" | "remove";


export function posToCoord(pos: basicVector): string {
  return `${pos.x}_${pos.y}`;
}