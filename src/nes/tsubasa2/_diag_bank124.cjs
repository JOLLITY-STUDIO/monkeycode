// 临时诊断2：检查 bank1k 124 tile 40-63 内容 + PPU onBgRenderScanline 是否生效 + buffer 按扫描线分布
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');

const rt = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(rt);
const ppu = rt.ppu;

// 1. 检查 vromTilesByBank1k[124] tile 40-63
const vt = rt.vromTilesByBank1k;
for (let b of [0, 124, 125, 126, 127, 1]) {
  const arr = vt[b];
  if (!arr) { console.log('bank1k', b, 'MISSING'); continue; }
  let init = 0, opaque = 0;
  for (let t = 0; t < 64; t++) {
    if (arr[t] && arr[t].initialized) init++;
    if (arr[t] && arr[t].opaque && arr[t].opaque[0]) opaque++;
  }
  console.log(`bank1k ${b}: initialized=${init}/64 opaqueRow0=${opaque}`);
}
// tile 40-63 详细
for (let t = 40; t <= 63; t++) {
  const tile = vt[124][t];
  const op = tile && tile.opaque ? Array.from(tile.opaque).map(v => v ? '#' : '.').join('') : '?';
  console.log(`bank124 tile ${t}: init=${tile && tile.initialized} opaque=${op}`);
}
