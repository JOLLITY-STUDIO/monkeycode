// 黑屏深度诊断 v3: 检查 bgbuffer/imgPalette/滚动/NT/CHR 渲染全链路
const NES = require('./_test_out/core/nes').default;
const { PRG, HEADER, NES_CHR_ROM } = require('./_test_out/game/rom');
const { Tsubasa2 } = require('./_test_out/game/index');

let lastBuf = null;
let frameCount = 0;
const nes = new NES({
  onFrame: (buf) => { lastBuf = buf; frameCount++; },
  onStatusUpdate: () => {},
  emulateSound: false,
});
nes.loadTsROM({ header: HEADER, prg: PRG, chr: NES_CHR_ROM });

const t = new Tsubasa2();
t.boot();
t.frame(nes);

const ppu = nes.ppu;
const p = (v) => '#' + (v >>> 0).toString(16).padStart(8, '0');

console.log('=== CTRL/MASK ===');
console.log('f_bgVisibility=', ppu.f_bgVisibility, 'f_spVisibility=', ppu.f_spVisibility,
  'f_dispType=', ppu.f_dispType, 'f_bgPatternTable=', ppu.f_bgPatternTable,
  'f_spPatternTable=', ppu.f_spPatternTable, 'f_spriteSize=', ppu.f_spriteSize);
console.log('scanline=', ppu.scanline, 'lastRenderedScanline=', ppu.lastRenderedScanline,
  'frameEnded=', ppu.frameEnded, 'curX=', ppu.curX);

console.log('=== scrollStore ===');
for (const k of ['bg_pt', 'h_fine', 'h_tile', 'h_nt', 'v_fine', 'v_tile', 'v_nt']) {
  console.log(' ', k, '=', ppu.scrollStore.get(k));
}
console.log('counters: fineV=', ppu.counters.fineV, 'tileV=', ppu.counters.tileV,
  'ntV=', ppu.counters.ntV, 'tileH=', ppu.counters.tileH, 'ntH=', ppu.counters.ntH);

console.log('=== imgPalette (bg) / sprPalette ===');
console.log(' imgPalette =', [...ppu.imgPalette].map(p).join(' '));
console.log(' sprPalette =', [...ppu.sprPalette].map(p).join(' '));
const rawPal = [];
for (let i = 0; i < 0x20; i++) rawPal.push(ppu.vramStore.get(0x3f00 + i));
console.log(' raw $3F00 =', rawPal.map((v) => v.toString(16).padStart(2, '0')).join(' '));

console.log('=== ntable1 / nameTable ===');
console.log(' ntable1 =', [...ppu.ntable1]);
const nt0 = ppu.nameTable[0];
const row0 = [];
for (let x = 0; x < 32; x++) row0.push(nt0.getTileIndex(x, 0));
console.log(' NT0 row0 tiles =', row0.map((v) => v.toString(16).padStart(2, '0')).join(' '));
const col0 = [];
for (let y = 0; y < 30; y++) col0.push(nt0.getTileIndex(0, y));
console.log(' NT0 col0 tiles =', col0.map((v) => v.toString(16).padStart(2, '0')).join(' '));
// NT0 非零 tile 计数
let nz = 0;
for (let y = 0; y < 30; y++) for (let x = 0; x < 32; x++) if (nt0.getTileIndex(x, y)) nz++;
console.log(' NT0 non-zero tiles =', nz);

console.log('=== CHR tile 数据 (ptTile 前 256 抽样) ===');
let tileNzpix = 0;
const emptyTiles = [];
for (let i = 0; i < 256; i++) {
  const tp = ppu.ptTile[i].pix;
  let has = false;
  for (let k = 0; k < 64; k++) if (tp[k]) { has = true; break; }
  if (has) tileNzpix++; else emptyTiles.push(i);
}
console.log(' ptTile[0..255] 含非零像素 =', tileNzpix, '空 tile =', emptyTiles.slice(0, 20).join(','));
// 检查 NT row0 用到的 tile 的像素
console.log(' row0 tile pixels non-empty:', row0.filter((ti) => { const tp = ppu.ptTile[ti].pix; for (let k = 0; k < 64; k++) if (tp[k]) return true; return false; }).length, '/', row0.length);

console.log('=== bgbuffer / buffer ===');
function countNz(buf) { let n = 0; for (let i = 0; i < buf.length; i++) if (buf[i]) n++; return n; }
console.log(' bgbuffer nonZero =', countNz(ppu.bgbuffer));
console.log(' buffer   nonZero =', countNz(ppu.buffer));
// bgbuffer 抽样: 若干行
for (let y = 0; y < 240; y += 40) {
  const samp = [];
  for (let x = 0; x < 256; x += 32) samp.push(p(ppu.bgbuffer[y * 256 + x]));
  console.log('  bgbuffer y' + y + ':', samp.join(' '));
}
// pixrendered 抽样
const pr = ppu.pixrendered;
let prHigh = 0;
for (let i = 0; i < pr.length; i++) if (pr[i] > 0xff) prHigh++;
console.log(' pixrendered>0xff count =', prHigh);

console.log('=== onFrame ===');
console.log('onFrame called =', frameCount, 'lastBuf nonZero =', lastBuf ? countNz(lastBuf) : -1);

console.log('=== mmap hooks ===');
console.log(' mmap.onBgRender =', typeof ppu.nes.mmap.onBgRender, 'onSpriteRender =', typeof ppu.nes.mmap.onSpriteRender);
console.log(' mmap.chrBanks =', ppu.nes.mmap.chrBanks);
