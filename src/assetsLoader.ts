import { Assets, Texture } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';


Assets.add({
  alias: "belt",
  src: "../assets/belt.png"
});


export const spriteSheets = {
  belt: await Assets.load<PIXI.Texture>("belt")
};