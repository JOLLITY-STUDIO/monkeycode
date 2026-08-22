// 诊断 BOOT 帧: PT/NT/调色板/OAM/buffer
// 用法: node _diag_boot.cjs
'use strict';
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const OUT = path.join(ROOT, '_test_out');
process.chdir(ROOT);

const TSC = path.join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc');
console.log('[tsc] compile ...');
execFileSync(process.execPath, [TSC, '-p', 'tsconfig.play.json'], { stdio: 'inherit' });
console.log('[tsc] OK');

const { Tsubasa2 } = require(path.join(OUT, 'game/index.js'));
const { NES } = require(path.join(OUT, 'core/nes.js'));

const ts = new Tsubasa2();
const nes = new NES({ emulateSound: false });
ts.boot();

for (let f = 0; f < 30; f++) ts.frame(nes);

const ppu = nes.ppu;
function hex(c) { return '#' + c.toString(16).padStart(6, '0'); }

console.log('\n=== PPU 控制 ===');
console.log('  f_bgVisibility =', ppu.f_bgVisibility, '(0=不显示, 1=显示)');
console.log('  f_spVisibility =', ppu.f_spVisibility);
console.log('  f_bgPatternTable =', ppu.f_bgPatternTable, '(0=PT0 $0000, 1=PT1 $1000)');
console.log('  f_spPatternTable =', ppu.f_spPatternTable);
console.log('  f_nTblAddress =', ppu.f_nTblAddress);
console.log('  scanline =', ppu.scanline, 'lastRendered=', ppu.lastRenderedScanline);

console.log('\n=== Pattern Table (ptTile) 非零 tile 数 ===');
let pt0 = 0, pt1 = 0, pt0Bytes = 0, pt1Bytes = 0;
for (let i = 0; i < 256; i++) {
  const t0 = ppu.ptTile[i];
  let nz0 = 0; for (let p = 0; p < t0.pix.length; p++) if (t0.pix[p] !== 0) nz0++;
  if (nz0) pt0++; pt0Bytes += nz0;
  const t1 = ppu.ptTile[256 + i];
  let nz1 = 0; for (let p = 0; p < t1.pix.length; p++) if (t1.pix[p] !== 0) nz1++;
  if (nz1) pt1++; pt1Bytes += nz1;
}
console.log('  PT0 ($0000-$0FFF):', pt0, '/256 tiles,', pt0Bytes, '非零字节');
console.log('  PT1 ($1000-$1FFF):', pt1, '/256 tiles,', pt1Bytes, '非零字节');

console.log('\n=== NT0 (tile + attr) ===');
let nt0Tile = 0, attr = 0;
const NT_TILE = [];
const NT_ATTR = [];
for (let y = 0; y < 30; y++) {
  for (let x = 0; x < 32; x++) {
    const t = ts.store.nt0[y][x].tile;
    if (t) {
      nt0Tile++;
      if (NT_TILE.length < 20) NT_TILE.push(`(${x},${y})=${t.toString(16).padStart(2,'0')}`);
    }
    const a = ts.store.nt0[y][x].palette;
    if (a) attr++;
  }
}
console.log('  tile 非零数:', nt0Tile, '采样:', NT_TILE.join(' '));
console.log('  palette 非零数:', attr);

// VRAM 实际写到 PPU 的 NT0
let vramNT0Tile = 0, vramNT0Attr = 0;
for (let i = 0x2000; i < 0x23C0; i++) if (ppu.vramMem[i]) vramNT0Tile++;
for (let i = 0x23C0; i < 0x2400; i++) if (ppu.vramMem[i]) vramNT0Attr++;
console.log('  VRAM $2000-$23BF 非零 tile:', vramNT0Tile, ', $23C0-$23FF 非零 attr:', vramNT0Attr);

console.log('\n=== Palette ===');
console.log('  imgPalette[0..15]:', Array.from(ppu.imgPalette.slice(0, 16)).map(hex).join(' '));
console.log('  sprPalette[0..15]:', Array.from(ppu.sprPalette.slice(0, 16)).map(hex).join(' '));

console.log('\n=== Frame buffer 中线 (Y=120) 唯一色 ===');
const mid = Array.from(ppu.buffer.slice(120 * 256, 121 * 256));
const uniq = [...new Set(mid)];
console.log('  unique colors:', uniq.length);
console.log('  ', uniq.slice(0, 8).map(hex).join(' '));

// 总览 buffer 总像素数
let black = 0, nonblack = 0;
const buf = ppu.buffer;
for (let i = 0; i < buf.length; i++) {
  if (buf[i] === 0x000000 || buf[i] === 0) black++; else nonblack++;
}
console.log('  buffer 黑色像素:', black, '/', buf.length, '(', (black * 100 / buf.length).toFixed(1), '%), 非黑:', nonblack);

// scanline 0/120/239 上的特定像素 (y=120, x=72-96 这块精灵应该存在的地方)
console.log('\n=== 精灵位置附近像素 ===');
for (const [y, x] of [[72, 72], [80, 80], [104, 88], [128, 80]]) {
  const idx = y * 256 + x;
  console.log(`  (${x},${y}) buf=${hex(buf[idx])}`);
}

// OAM 渲染 scanline
let spSL = 0;
for (let i = 0; i < 240; i++) if (ppu.scanlineSpriteCount[i] > 0) spSL++;
console.log('\n=== Sprite scanline ===');
console.log('  有 sprite 的 scanline 数:', spSL);
