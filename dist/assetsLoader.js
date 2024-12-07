import { Assets, Texture, Rectangle } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';
const spriteSheets = {
    beltUp: await Assets.load("../assets/beltUp.png"),
    beltRight: await Assets.load("../assets/beltRight.png"),
    beltDown: await Assets.load("../assets/beltDown.png"),
    beltLeft: await Assets.load("../assets/beltLeft.png")
};
export const spriteFrames = {
    belt: {
        up: await convertSpritesheet(spriteSheets.beltUp, { x: 32, y: 32 }, 6),
        right: await convertSpritesheet(spriteSheets.beltRight, { x: 32, y: 32 }, 6),
        down: await convertSpritesheet(spriteSheets.beltDown, { x: 32, y: 32 }, 6),
        left: await convertSpritesheet(spriteSheets.beltLeft, { x: 32, y: 32 }, 6)
    }
};
async function convertSpritesheet(sheet, frameSize, frameCount) {
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
