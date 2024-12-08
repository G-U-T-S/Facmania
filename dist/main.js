import { Application, Assets, Container, Sprite, BitmapText } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { initDevtools } from '../node_modules/@pixi/devtools/dist/index.js'; //* DEBUG
import { ObjectManager } from './objects/objectsManager.js';
//TODO criar um sistema para lidar com a sincronização
//TODO das esteiras, talvez algo como factorio, que separe cada esteira em sua propria linha
(async () => {
    const app = new Application();
    await app.init({ resizeTo: window });
    app.stage.hitArea = app.screen;
    app.stage.eventMode = "static";
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
    const objectMng = new ObjectManager();
    app.stage.addChild(objectMng);
    const debugText = new BitmapText({ x: 50, y: 50 });
    app.stage.addChild(debugText);
    app.stage.onpointerdown = (ev) => {
        isDraggin = true;
        if (selectedItem === "remove") {
            objectMng.removeObject("belt", posToCoord(getSnapedPos({ x: ev.globalX, y: ev.globalY })));
        }
        else if (selectedItem === "belt") {
            objectMng.addBelt(getSnapedPos({ x: ev.globalX, y: ev.globalY }));
        }
    };
    app.stage.onpointerup = () => {
        isDraggin = false;
        selectedItem = selectedItem == "remove" ? "belt" : "belt";
    };
    app.stage.onpointermove = (ev) => {
        if (!isDraggin) {
            return;
        }
        if (selectedItem === "remove") {
            objectMng.removeObject("belt", posToCoord(getSnapedPos({ x: ev.globalX, y: ev.globalY })));
        }
        else if (selectedItem === "belt") {
            objectMng.addBelt(getSnapedPos({ x: ev.globalX, y: ev.globalY }));
        }
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
    function posToCoord(pos) {
        return `${pos.x}_${pos.y}`;
    }
    initDevtools({ app: app });
})();
