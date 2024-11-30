import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';


export class PlacebleObject extends PIXI.Sprite {
  public size: {x: number, y: number};

  constructor(inTilesSize = {x: 0, y: 0}, pos = {x: 0, y: 0}) {
    super({
      texture: PIXI.Texture.WHITE,
      width: 32, height: 32,
      position: { ...pos }
    });

    this.size = { ...inTilesSize };
  }
}