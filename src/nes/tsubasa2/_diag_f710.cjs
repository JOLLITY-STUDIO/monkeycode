const fs = require('fs');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

const targets = [710, 760, 800, 810];
for (let h5 = 0; h5 <= 810 - 10 + 1; h5++) {
  game.frame(runtime);
  const nes = h5 + 10;
  if (targets.includes(nes)) {
    const ppu = runtime.ppu;
    const out = {
      frame: nes,
      scroll: {
        regV: ppu.regV, regH: ppu.regH, regVT: ppu.regVT, regHT: ppu.regHT,
        regFV: ppu.regFV, regFH: ppu.regFH,
        cntV: ppu.cntV, cntH: ppu.cntH, cntVT: ppu.cntVT, cntHT: ppu.cntHT,
      },
      ntable1: ppu.ntable1,
      ntNZ: [0,1,2,3].map(i => { let c=0; const t=ppu.nameTable[i].tile; for(let j=0;j<960;j++) if(t[j]!==0)c++; return c; }),
    };
    console.log(JSON.stringify(out));
  }
}
