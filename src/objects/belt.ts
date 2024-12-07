import { Texture } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { PlacebleObject } from './placeableObject.js';
import { basicVector } from '../interfacesAndTypes.js';
import { spriteFrames } from '../assetsLoader.js';


export class Belt extends PlacebleObject{
  public direction: basicVector;

  constructor(pos: basicVector, dir: basicVector) {
    let chosedFrames: Array<Texture> = [];

    if (dir.x > 0) {
      chosedFrames = spriteFrames.belt.right;
    }
    else if (dir.x < 0) {
      chosedFrames = spriteFrames.belt.left;
    }
    else if (dir.y > 0) {
      chosedFrames = spriteFrames.belt.down;
    }
    else if (dir.y < 0) {
      chosedFrames = spriteFrames.belt.up;
    }
    else {
      chosedFrames = spriteFrames.belt.right;
    }

    super(
      {x: 1, y: 1}, pos, chosedFrames
    );

    this.direction = dir;
    this.animationSpeed = 0.25;
    this.play();
  }

  public changeDirection(newDir: basicVector): void {
    this.direction = newDir;

    if (newDir.x > 0) {
      this.textures = spriteFrames.belt.right;
    }
    else if (newDir.x < 0) {
      this.textures = spriteFrames.belt.left;
    }
    else if (newDir.y > 0) {
      this.textures = spriteFrames.belt.down;
    }
    else if (newDir.y < 0) {
      this.textures = spriteFrames.belt.up;
    }
    else {
      this.textures = spriteFrames.belt.right;
    }

    this.play();
  }
}