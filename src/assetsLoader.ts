import { Assets, Texture } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';


Assets.add({
  alias: "beltRight",
  src: "../assets/beltRight.png"
});


export const spriteSheets = {
  beltRight: await Assets.load<Texture>("beltRight")
};