import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
class Cell extends PIXI.Container {
    occupied;
    globalPos;
    child;
    constructor(globalPos = { x: 0, y: 0 }) {
        super();
        this.occupied = false;
        this.globalPos = { ...globalPos };
        this.child = null;
    }
    hasChild() {
        return this.child !== null;
    }
    setChild(value) {
        this.child = value;
        this.addChild(value);
        this.occupied = true;
    }
    clearChild() {
        this.child = null;
        this.removeChildAt(0);
        this.occupied = false;
    }
    getChild() {
        return this.child;
    }
}
export class Grid extends PIXI.Container {
    values;
    constructor(sizeX, sizeY) {
        super();
        this.values = {};
        for (let x = 0; x < sizeX + 1; x++) {
            for (let y = 0; y < sizeY + 1; y++) {
                const cell = new Cell({ x: x * 32, y: y * 32 });
                this.addChild(cell);
                this.values[`${x}_${y}`] = cell;
            }
        }
    }
    hasCell(coord) {
        if (this.values[coord] !== undefined) {
            return true;
        }
        return false;
    }
    getCell(coord) {
        return this.values[coord];
    }
}
