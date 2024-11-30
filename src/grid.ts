import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { PlacebleObject } from './placeableObject';
import { clearList } from '../node_modules/pixi.js/dist/pixi.js';


class Cell extends PIXI.Container{
  public occupied: boolean;
  public globalPos: {x: number, y: number};
  public child: PlacebleObject | null;

  constructor(globalPos = {x: 0, y: 0}) {
    super();

    this.occupied = false;
    this.globalPos = { ...globalPos };
    this.child = null;
  }

  hasChild(): boolean {
    return this.child !== null;
  }

  setChild(value: PlacebleObject) {
    this.child = value;
    this.addChild(value);
    this.occupied = true;
  }

  clearChild(): void {
    this.child = null;
    this.removeChildAt(0);
    this.occupied = false;
  }

  getChild(): PlacebleObject | null {
    return this.child;
  }
}


export class Grid extends PIXI.Container{
  private values: {[index: string]: Cell};

  constructor(sizeX: number, sizeY: number) {
    super();

    this.values = {}

    for (let x = 0; x < sizeX + 1; x++) {
      for (let y = 0; y < sizeY + 1; y++) {
        const cell = new Cell({x: x * 32, y: y * 32});

        this.addChild(cell);
        this.values[`${x}_${y}`] = cell;
      }
    }
  }

  hasCell(coord: string): boolean {
    if (this.values[coord] !== undefined) {
      return true;
    }

    return false;
  }

  getCell(coord: string): Cell | undefined {
    return this.values[coord];
  }
}