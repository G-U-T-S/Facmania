import { Container } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { BeltManager } from './beltManager.js';
//! se o id é a posição do objeto
//! não existe nenhuma possibilidade de tal id acabar se repetindo?
//& coord / index / id = "x_y";
export class ObjectsManager extends Container {
    beltMng;
    constructor() {
        super();
        this.beltMng = new BeltManager();
        this.addChild(this.beltMng);
    }
    addObject(type, pos) {
        switch (type) {
            case "belt":
                this.beltMng.addBelt({ ...pos });
                break;
        }
    }
    removeObject(type, coord) {
        switch (type) {
            case "belt":
                this.beltMng.removeBelt(coord);
                break;
        }
    }
}
