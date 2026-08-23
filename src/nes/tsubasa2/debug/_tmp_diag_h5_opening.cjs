/**
 * _tmp_diag_h5_opening.cjs — H5 开场渲染诊断 (基于 _diag_black.cjs 修正路径)
 * 跑 120 帧, 输出 ram_062A 调色板 / NT0 / PPU palette / buffer / OAM 状态
 */
const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/src/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));

const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
const game = new ts.default(nes);
game.boot();
const ppu = nes.ppu;
const store = game.store;

function countNt(nt) {
  let n = 0;
  for (let y = 0; y < 30; y++) {
    const row = nt[y];
    if (!row) continue;
    for (let x = 0; x < 32; x++) if (row[x] && row[x].tile !== 0) n++;
  }
  return n;
}

const log = [];
log.push('=== boot ===');
log.push('ram_00ED=' + store.read('ram_00ED') + ' nt0=' + countNt(store.nt0));
log.push('ram_062A(0-1F)=' + Array.from({ length: 0x20 }, (_, i) =>
  store.read('ram_0' + (0x62A + i).toString(16).toUpperCase().padStart(3, '0'))).map(v => v.toString(16).padStart(2, '0')).join(' '));

for (let i = 0; i < 120; i++) {
  try {
    game.interrupts.nmi(i);
    ts.writeStoreToPpu(store, ppu);
    ppu.startFrame();
    ppu.advanceDots(262 * 341);
    ppu.renderFramePartially(0, 240);
    ppu.endFrame();
  } catch (e) {
    log.push('CRASH frame ' + (i + 1) + ': ' + e.message);
    log.push((e.stack || '').split('\n').slice(0, 5).join('\n'));
    break;
  }
  if (i % 30 === 29) {
    log.push(`F${i + 1}: nt0=${countNt(store.nt0)} ram_00ED=${store.read('ram_00ED')} ram_062A[0..7]=${Array.from({ length: 8 }, (_, k) => store.read('ram_0' + (0x62A + k).toString(16).toUpperCase().padStart(3, '0'))).map(v => v.toString(16)).join(',')}`);
  }
}

log.push('=== after 120 frames ===');
log.push('ram_00ED=' + store.read('ram_00ED') + ' nt0=' + countNt(store.nt0));
log.push('ram_062A(0-1F)=' + Array.from({ length: 0x20 }, (_, i) =>
  store.read('ram_0' + (0x62A + i).toString(16).toUpperCase().padStart(3, '0'))).map(v => v.toString(16).padStart(2, '0')).join(' '));
log.push('ram_004A=' + store.read('ram_004A') + ' ram_004B=' + store.read('ram_004B'));

// PPU 调色板
const pal = [];
for (let i = 0; i < 32; i++) pal.push(ppu.vramMem[0x3f00 + i] || 0);
log.push('PPU palette BG : [' + pal.slice(0, 16).map(v => '#' + v.toString(16).toUpperCase().padStart(2, '0')).join(',') + ']');
log.push('PPU palette SPR: [' + pal.slice(16, 32).map(v => '#' + v.toString(16).toUpperCase().padStart(2, '0')).join(',') + ']');

// buffer
const buf = ppu.buffer;
let bufNz = 0;
for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) bufNz++;
log.push('ppu.buffer nonZero=' + bufNz + ' / ' + buf.length);

// OAM
let sprCount = 0;
for (let i = 0; i < 64; i++) {
  const y = ppu.spriteMem[i * 4];
  if (y > 0 && y < 240) sprCount++;
}
log.push('OAM visible sprites=' + sprCount);

// NT0 非零 tile 位置
const nz = [];
for (let y = 0; y < 30; y++) {
  const row = store.nt0[y];
  if (!row) continue;
  for (let x = 0; x < 32; x++) if (row[x] && row[x].tile !== 0) nz.push(`(${x},${y})t=${row[x].tile.toString(16)}`);
}
log.push('NT0 nonZero=' + nz.length + (nz.length <= 40 ? ' ' + nz.join(' ') : ''));

fs.writeFileSync(path.resolve(__dirname, '_tmp_diag_h5_opening.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));
