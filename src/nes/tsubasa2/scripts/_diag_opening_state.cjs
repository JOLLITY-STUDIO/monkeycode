/** 诊断 OpeningScene 运行时状态：h5Frame / currentScroll / ntQueue / sceneId / store 关键 RAM */
const fs = require('fs');
const { HeadlessRuntime } = require('../dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('../dist-cjs/game/index');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);

const out = [];
for (let f = 0; f < 60; f++) {
  runtime.frame(game);
  const sc = game.store.scene;
  const opening = game.router.getController(100);
  const ppu = runtime.ppu;
  const line = {
    h5f: f + 10,
    sceneId: sc.currentSceneId,
    ram001B: game.store.readByte(0x001b).toString(16),
    ram00ED: game.store.readByte(0x00ed).toString(16),
    h5Frame: opening.h5Frame,
    scroll: opening.currentScroll,
    ntQueue: opening.ntQueue ? opening.ntQueue.length : -1,
    chrPlan: opening.currentChrPlan ? opening.currentChrPlan.length : -1,
    bgVis: ppu.f_bgVisibility,
    spVis: ppu.f_spVisibility,
    regS: ppu.regS,
    pal0: ppu.imgPalette ? ppu.imgPalette[0].toString(16) : '?',
  };
  out.push(JSON.stringify(line));
}
fs.writeFileSync('output/_diag_opening_state.log', out.join('\n'));
console.log(out.slice(0, 20).join('\n'));
