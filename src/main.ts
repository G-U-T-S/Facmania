import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
import { Grid } from './grid.js';
import { PlacebleObject } from './placeableObject.js';
import { initDevtools } from '../node_modules/@pixi/devtools/dist/index.js';//* DEBUG


class ItemSource extends PlacebleObject {
  constructor(position = {x: 0, y: 0}) {
    super(
      {x: 0, y: 0}, { ...position }
    );
  }
}


(async () => {
  const app = new PIXI.Application();
  await app.init({
    resizeTo: window,
    backgroundColor: "black",
  });
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  document.body.appendChild(app.canvas);  const canvas = document.querySelector("canvas");
  
  //& desativa o menu do botão direito
  app.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
  });
  
  let index: 0 | 1 = 0;
  const bgDark = await PIXI.Assets.load<PIXI.Texture>("../assets/bgDark.png");
  const bgLight = await PIXI.Assets.load<PIXI.Texture>("../assets/bgLight.png");
  const BG = new PIXI.Container();

  //! inefficient;
  for (let Y = 0; Y < 22; Y++) {
    for (let X = 0; X < 39; X++) {
      const sprite = new PIXI.Sprite();
      
      if (index === 0) {
        sprite.texture = bgDark;
        index = 1;
      }
      else {
        sprite.texture = bgLight;
        index = 0;
      }

      sprite.position = {x: X * 32, y: Y * 32};

      BG.addChild(sprite);
    }
  }
  app.stage.addChild(BG);

  const grid = new Grid(38, 21);
  app.stage.addChild(grid);

  app.stage.onpointertap = (ev) => {
    const coord = `${Math.floor(ev.globalX / 32)}_${Math.floor(ev.globalY / 32)}`;
    if (grid.hasCell(coord)) {
      const cell = grid.getCell(coord);

      if (cell !== undefined) {
        if (!cell.occupied) {
          cell.setChild(new ItemSource({
            x: cell.globalPos.x, y: cell.globalPos.y
          }));
        }
        else {
          cell.clearChild()
        }
      }
    }
  };

  initDevtools({
    app: app
  });
})();