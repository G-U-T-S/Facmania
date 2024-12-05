import { Application, Texture, Assets, Container, Sprite, Rectangle } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { Grid } from './grid.js';
import { PlacebleObject } from './placeableObject.js';
import { initDevtools } from '../node_modules/@pixi/devtools/dist/index.js'; //* DEBUG
import { spriteSheets } from './assetsLoader.js';
class Belt extends PlacebleObject {
    constructor(pos) {
        super({ x: 1, y: 1 }, { ...pos }, convertSpritesheet(spriteSheets.belt, { x: 32, y: 32 }, 6), true);
    }
}
function convertSpritesheet(sheet, frameSize, frameCount) {
    //! por enquanto so conssegue carregar animações alinhadas, não considera colunas;
    const textures = [];
    for (let x = 0; x < frameCount; x++) {
        textures.push(new Texture({
            source: sheet.source,
            frame: new Rectangle(x * frameSize.x, 0, frameSize.x, frameSize.y)
        }));
    }
    return textures;
}
(async () => {
    const app = new Application();
    await app.init({
        resizeTo: window,
        backgroundColor: "black",
    });
    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;
    document.body.appendChild(app.canvas);
    //& desativa o menu do botão direito
    app.canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    let selectedItem = "none";
    let isDraggin = false;
    const bgDark = await Assets.load("../assets/bgDark.png");
    const bgLight = await Assets.load("../assets/bgLight.png");
    const BG = createBg([bgDark, bgLight]);
    app.stage.addChild(BG);
    const grid = new Grid();
    app.stage.addChild(grid);
    app.stage.onpointermove = (ev) => {
        if (!isDraggin) {
            return;
        }
        if (selectedItem === "remove") {
            tryRemoveObject(getSnapedPos({ x: ev.globalX, y: ev.globalY }));
        }
        else {
            tryPlaceObject(selectedItem, getSnapedPos({ x: ev.globalX, y: ev.globalY }));
        }
    };
    app.stage.onpointerdown = (ev) => {
        isDraggin = true;
        if (selectedItem === "remove") {
            tryRemoveObject(getSnapedPos({ x: ev.globalX, y: ev.globalY }));
        }
        else {
            tryPlaceObject(selectedItem, getSnapedPos({ x: ev.globalX, y: ev.globalY }));
        }
    };
    app.stage.onpointerup = () => {
        isDraggin = false;
        selectedItem = selectedItem == "remove" ? "belt" : "remove";
    };
    //! just debug, going to change it later
    function createBg(textures) {
        let index = 0;
        const bg = new Container();
        for (let Y = 0; Y < 22; Y++) {
            for (let X = 0; X < 39; X++) {
                if (index >= textures.length) {
                    index = 0;
                }
                bg.addChild(new Sprite({
                    texture: textures[index],
                    position: { x: X * 32, y: Y * 32 }
                }));
                index++;
            }
        }
        return bg;
    }
    function getSnapedPos(pos) {
        return {
            x: Math.floor(pos.x / 32) * 32,
            y: Math.floor(pos.y / 32) * 32
        };
    }
    function tryPlaceObject(item, position) {
        let obj = undefined;
        let collide = false;
        switch (item) {
            case "belt": {
                obj = new Belt({ ...position });
                break;
            }
        }
        if (obj === undefined) {
            return;
        }
        Object.entries(grid.values).forEach((value, _) => {
            if (obj.isColliding(value[1])) {
                collide = true;
                return;
            }
        });
        if (!collide) {
            grid.addObject(obj);
        }
    }
    function tryRemoveObject(point) {
        Object.entries(grid.values).forEach((value, _) => {
            const obj = value[1];
            if (obj.collideWithPoint({ ...point })) {
                grid.removeObject(obj.key);
                return;
            }
        });
    }
    initDevtools({ app: app });
})();
