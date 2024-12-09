import {
  Application, Texture, Assets, Container,
  ContainerChild, Sprite, BitmapText
} from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';

import { initDevtools } from '../node_modules/@pixi/devtools/dist/index.js';//* DEBUG
import { basicVector, objectTypes, posToCoord } from './utils.js';
import { ObjectsManager } from './managers/objectsManager.js';


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

  let selectedItem: objectTypes = "none";
  let isDraggin = false;
  
  const bgDark = await Assets.load<Texture>("../assets/bgDark.png");
  const bgLight = await Assets.load<Texture>("../assets/bgLight.png");
  const BG = createBg([bgDark, bgLight]);
  app.stage.addChild(BG);

  const objectMng = new ObjectsManager();
  app.stage.addChild(objectMng);

  const debugText = new BitmapText({x: 50, y: 50});
  app.stage.addChild(debugText);

  app.stage.onpointerdown = (ev) => {
    isDraggin = true;

    if (selectedItem === "remove") {
      objectMng.removeObject("belt", posToCoord(getSnapedPos({x: ev.globalX, y: ev.globalY})));
    }
    else if (selectedItem === "belt") {
      objectMng.addObject("belt", getSnapedPos({x: ev.globalX, y: ev.globalY}));
    }  
  };

  app.stage.onpointerup = () => {
    isDraggin = false;

    selectedItem = selectedItem == "remove" ? "belt" : "remove";
  };

  app.stage.onpointermove = (ev) => {
    if (!isDraggin) {
      return;
    }

    if (selectedItem === "remove") {
      objectMng.removeObject("belt", posToCoord(getSnapedPos({x: ev.globalX, y: ev.globalY})));
    }
    else if (selectedItem === "belt") {
      objectMng.addObject("belt", getSnapedPos({x: ev.globalX, y: ev.globalY}));
    }
  };


  //! just debug, going to change it later
  function createBg(textures: Array<Texture>): ContainerChild {
    let index: number = 0;
    const bg = new Container();
    
    for (let Y = 0; Y < 22; Y++) {
      for (let X = 0; X < 39; X++) {
        if (index >= textures.length) {
          index = 0;
        }

        bg.addChild(
          new Sprite(
            {
              texture: textures[index],
              position: {x: X * 32, y: Y * 32}
            }
          )
        );

        index++;
      }
    }

    return bg;
  }


  function getSnapedPos(pos: basicVector): basicVector {
    return {
      x: Math.floor(pos.x / 32) * 32,
      y: Math.floor(pos.y / 32) * 32
    };
  }

  initDevtools({ app: app });
})();