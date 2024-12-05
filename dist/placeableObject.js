import { AnimatedSprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
export class PlacebleObject extends AnimatedSprite {
    sizeInTiles;
    size;
    key;
    hasAnimation;
    constructor(sizeInTiles, pos, frames, hasAnim) {
        super(frames);
        this.key = -1;
        this.hasAnimation = hasAnim;
        this.position = { ...pos };
        this.sizeInTiles = { ...sizeInTiles };
        this.size = {
            x: sizeInTiles.x * 32, y: sizeInTiles.y * 32
        };
        this.animationSpeed = 0.5;
        this.play();
    }
    isColliding(other) {
        const AisToTheRightOfB = this.position.x >= other.position.x + other.size.x;
        const AisToTheLeftOfB = this.position.x + this.size.x <= other.position.x;
        const AisAboveB = this.position.y + this.size.y <= other.position.y;
        const AisBelowB = this.position.y >= other.position.y + other.size.y;
        return (!AisToTheRightOfB && !AisToTheLeftOfB && !AisAboveB && !AisBelowB);
    }
    collideWithPoint(point) {
        return (point.x >= this.position.x &&
            point.x <= this.position.x + this.size.x &&
            point.y >= this.position.y &&
            point.y <= this.position.y + this.size.y);
    }
}
