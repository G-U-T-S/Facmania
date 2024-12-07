import { Container } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { Belt } from './objects/belt.js';
// import { PlacebleObject } from './objects/placeableObject.js';
//! se o id é a posição do objeto
//! não existe nenhuma possibilidade de tal id acabar se repetindo?
//& coord / index / id = "x_y";
export class ObjectManager extends Container {
    belts;
    constructor() {
        super();
        this.belts = {};
    }
    addBelt(pos, dir) {
        if (this.belts[`${pos.x}_${pos.y}`] !== undefined) {
            this.belts[`${pos.x}_${pos.y}`].changeDirection(dir);
            return;
        }
        const belt = new Belt(pos, dir);
        this.belts[`${pos.x}_${pos.y}`] = belt;
        this.addChild(belt);
    }
    addItemSource() { }
    removeObject(type, coord) {
        switch (type) {
            case "belt":
                if (this.belts[coord] === undefined) {
                    return false;
                }
                const obj = this.belts[coord];
                this.removeChild(obj);
                delete this.belts[coord];
                break;
        }
        return true;
    }
}
