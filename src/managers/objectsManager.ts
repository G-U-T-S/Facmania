import { Container } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { basicVector, objectTypes } from '../utils.js';
import { BeltManager } from './beltManager.js';


//! se o id é a posição do objeto
//! não existe nenhuma possibilidade de tal id acabar se repetindo?

//& coord / index / id = "x_y";


export class ObjectsManager extends Container {
  private beltMng: BeltManager;

  constructor() {
    super();

    this.beltMng = new BeltManager();
    this.addChild(this.beltMng);
  }

  public addObject(type: objectTypes, pos: basicVector): void {
    switch (type) {
      case "belt":
        this.beltMng.addBelt({ ...pos });
        break;
    }
  }

  public removeObject(type: objectTypes, coord: string): void {
    switch (type) {
      case "belt":
        this.beltMng.removeBelt(coord);
        break;
    }
  }
}