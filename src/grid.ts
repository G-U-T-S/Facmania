import { Container } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { PlacebleObject } from './placeableObject';


export class Grid extends Container {
  readonly values: {[index: number]: PlacebleObject};
  readonly usedKeys: {[index: number]: 0};

  constructor() {
    super();
    this.values = {};
    this.usedKeys = {};
  }

  public addObject(obj: PlacebleObject) {
    const key = this.getNewKey();
    this.addChild(obj);
    obj.key = key;
    
    this.values[key] = obj;
    this.usedKeys[key] = 0;
  }

  public removeObject(key: number) {
    const obj = this.values[key];
    this.removeChild(obj);

    delete this.values[key];
    delete this.usedKeys[key];
  }

  public hasObject(key: number): boolean {
    if (this.values[key] === undefined) {
      return false;
    }
    
    return true;
  }

  private getNewKey(): number {
    let newKey = -1;

    while (this.usedKeys[newKey] !== undefined || newKey < 0) {
      newKey = Math.floor(Math.random() * 10000000);//! talvez acabe os numeros
    }

    return newKey;
  }
}