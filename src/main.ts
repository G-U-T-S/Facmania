import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.mjs';


(async () => {
  const app = new PIXI.Application();
  await app.init({
    resizeTo: window,
    backgroundColor: "black",
  });
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  document.body.appendChild(app.canvas);

  const graphics = new PIXI.Graphics().circle(0, 0, 10).fill('pink');

  app.stage.on('pointermove', (event) => {
    graphics.position.copyFrom(event.global);
    // graphics.position.x -= 5;
    // graphics.position.y -= 5;
  })

  const text = new PIXI.BitmapText();
  text.text = "PIXI";
  text.setSize(300, 300);
  text.position = {
    x: app.canvas.width / 2 - 150,
    y: app.canvas.height / 2 - 150
  };

  app.stage.addChild(text);
  app.stage.addChild(graphics);
})();