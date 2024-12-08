import { Container } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { Belt } from './belt.js';
//! se o id é a posição do objeto
//! não existe nenhuma possibilidade de tal id acabar se repetindo?
//TODO talve um arquivo separado para lidar com a logica das belts;
//& coord / index / id = "x_y";
export class ObjectManager extends Container {
    belts;
    lasPlacedBelt;
    constructor() {
        super();
        this.belts = {};
    }
    addBelt(pos) {
        //! levo em consideração que a posição ta sempre snaped;
        if (this.belts[`${pos.x}_${pos.y}`] === undefined) {
            //* não tem belt na posição
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
            const belt = new Belt({ ...pos }, { ...dir });
            this.belts[`${pos.x}_${pos.y}`] = belt;
            this.addChild(belt);
            this.lasPlacedBelt = belt;
        }
        else {
            //* tem belt na posição
            this.lasPlacedBelt = this.belts[`${pos.x}_${pos.y}`];
        }
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
    getObject(type, coord) {
        let obj = undefined;
        switch (type) {
            case "belt": {
                obj = this.belts[coord];
                break;
            }
        }
        return obj;
    }
}
