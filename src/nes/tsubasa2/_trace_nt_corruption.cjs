const fs = require('fs');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

const ppu = runtime.ppu;
const opening = game.router.getController(100);
const origApply = opening.applyNtToPpu.bind(opening);
const out = [];
opening.applyNtToPpu = function (t) {
  const f = this.currentFrame ? this.currentFrame.f : -1;
  out.push(`BEFORE apply f=${f} r21=` + dumpR(21) + ' r23=' + dumpR(23) + ' r25=' + dumpR(25));
  origApply(t);
  out.push(`AFTER  apply f=${f} r21=` + dumpR(21) + ' r23=' + dumpR(23) + ' r25=' + dumpR(25));
};

function dumpR(r) {
  const nt = ppu.nameTable[0];
  const base = r * 32;
  return Array.from(nt.tile.slice(base, base + 32)).map(x => x.toString(16).padStart(2, '0')).join(' ');
}

for (let h5 = 0; h5 <= 3732; h5++) {
  game.frame(runtime);
  const nes = h5 + 10;
  if (nes >= 3720 && nes <= 3735) {
    out.push(`END  frame nes=${nes} r21=` + dumpR(21) + ' r23=' + dumpR(23) + ' r25=' + dumpR(25));
  }
}

fs.writeFileSync('_trace_nt_corruption_out.txt', out.join('\n'), 'utf8');
console.log('done lines=' + out.length);
