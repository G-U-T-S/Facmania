import { Container } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { Belt } from '../objects/belt.js';
//& coord / index / id = "x_y";
export class BeltManager extends Container {
    belts;
    lasPlacedBelt;
    constructor() {
        super();
        this.belts = {};
    }
    addBelt(pos) {
        //! levo em consideração que a pos ta sempre snaped;
        let dir = { x: 1, y: 0 };
        if (this.lasPlacedBelt !== undefined) {
            if (pos.x > this.lasPlacedBelt.position.x) {
                dir = { x: 1, y: 0 };
                this.lasPlacedBelt.changeDirection({ x: 1, y: 0 });
            }
            else if (pos.x < this.lasPlacedBelt.position.x) {
                dir = { x: -1, y: 0 };
                this.lasPlacedBelt.changeDirection({ x: -1, y: 0 });
            }
            else if (pos.y > this.lasPlacedBelt.position.y) {
                dir = { x: 0, y: 1 };
                this.lasPlacedBelt.changeDirection({ x: 0, y: 1 });
            }
            else if (pos.y < this.lasPlacedBelt.position.y) {
                dir = { x: 0, y: -1 };
                this.lasPlacedBelt.changeDirection({ x: 0, y: -1 });
            }
        }
        //* ignora se na posição já existe uma belt;
        if (this.belts[`${pos.x}_${pos.y}`] === undefined) {
            const belt = new Belt({ ...pos }, { ...dir });
            this.belts[`${pos.x}_${pos.y}`] = belt;
            this.addChild(belt);
        }
        this.lasPlacedBelt = this.belts[`${pos.x}_${pos.y}`];
    }
    removeBelt(coord) {
        if (this.belts[coord] === undefined) {
            return;
        }
        const obj = this.belts[coord];
        this.removeChild(obj);
        delete this.belts[coord];
    }
}