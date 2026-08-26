const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');
const r = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(r);
for (let f = 0; f < 11; f++) r.frame(g);
const oam = r.ppu.spriteMem || r.ppu.sprMem;
console.log('H5 active sprites at h5f=20');
for (let i = 0; i < 64; i++) {
  const base = i * 4;
  const y = oam[base];
  const tile = oam[base + 1];
  const attr = oam[base + 2];
  const x = oam[base + 3];
  if (y < 240 && tile) console.log(i, `[${x},${y},${tile.toString(16)},a${attr}]`);
}
