import { PlacebleObject } from './placeableObject.js';
import { spriteFrames } from '../assetsLoader.js';
export class Belt extends PlacebleObject {
    direction;
    constructor(pos, dir) {
        //& maybe just change direction if its diferent;  
        let chosedFrames = [];
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
        super({ x: 1, y: 1 }, { ...pos }, chosedFrames);
        this.direction = { ...dir };
        this.animationSpeed = 0.2;
        this.play();
    }
    changeDirection(newDir) {
        this.direction = { ...newDir };
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
