import { AnimatedSprite, Texture } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { basicVector } from '../interfacesAndTypes';


export class PlacebleObject extends AnimatedSprite {
  readonly sizeInTiles: basicVector;
  readonly size: basicVector;

  constructor(sizeInTiles: basicVector, pos: basicVector, frames: Array<Texture>) {
    super(frames);

    this.position = { ...pos };
    this.sizeInTiles = { ...sizeInTiles };
    this.size = {
      x: sizeInTiles.x * 32, y: sizeInTiles.y * 32
    }
  }

  public isColliding(other: PlacebleObject): boolean {
    const AisToTheRightOfB = this.position.x >= other.position.x + other.size.x;
    const AisToTheLeftOfB = this.position.x + this.size.x <= other.position.x;
    const AisAboveB = this.position.y + this.size.y <= other.position.y;
    const AisBelowB = this.position.y >= other.position.y + other.size.y;

    return (!AisToTheRightOfB && !AisToTheLeftOfB && !AisAboveB && !AisBelowB);
  }

  public collideWithPoint(point: basicVector): boolean {
    return (
      point.x >= this.position.x &&
      point.x <= this.position.x + this.size.x &&
      point.y >= this.position.y &&
      point.y <= this.position.y + this.size.y
    );
  }
}