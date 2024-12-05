import { Container } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
export class Grid extends Container {
    values;
    usedKeys;
    constructor() {
        super();
        this.values = {};
        this.usedKeys = {};
    }
    addObject(obj) {
        const key = this.getNewKey();
        this.addChild(obj);
        obj.key = key;
        this.values[key] = obj;
        this.usedKeys[key] = 0;
    }
    removeObject(key) {
        const obj = this.values[key];
        this.removeChild(obj);
        delete this.values[key];
        delete this.usedKeys[key];
    }
    hasObject(key) {
        if (this.values[key] === undefined) {
            return false;
        }
        return true;
    }
    getNewKey() {
        let newKey = -1;
        while (this.usedKeys[newKey] !== undefined || newKey < 0) {
            newKey = Math.floor(Math.random() * 10000000); //! talvez acabe os numeros
        }
        return newKey;
    }
}
