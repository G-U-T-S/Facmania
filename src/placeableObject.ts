import { AnimatedSprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { basicVector } from './interfaces';


export class PlacebleObject extends AnimatedSprite {
  readonly sizeInTiles: basicVector;
  readonly size: {x: number, y: number};
  public key: number;
  public hasAnimation: boolean;

  constructor(sizeInTiles: basicVector, pos: basicVector, frames: Array<PIXI.Texture>, hasAnim: boolean) {
    super(frames);

    this.key = -1;
    this.hasAnimation = hasAnim;
    this.position = { ...pos };
    this.sizeInTiles = { ...sizeInTiles };
    this.size = {
      x: sizeInTiles.x * 32, y: sizeInTiles.y * 32
    }
    this.animationSpeed = 0.5;
    this.play();
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