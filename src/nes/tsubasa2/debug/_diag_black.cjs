const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
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

function hexRows(addr, count, width) {
  const out = [];
  for (let i = 0; i < count; i += width) {
    const row = [];
    for (let j = 0; j < width; j++) row.push(ppu.vramMem[addr + i + j].toString(16).padStart(2, '0'));
    out.push('$' + (addr + i).toString(16).toUpperCase() + ': ' + row.join(' '));
  }
  return out.join('\n');
}

const log = [];
log.push('=== boot ===');
log.push('ram_00ED=' + store.read('ram_00ED') + ' ram_0026=' + store.read('ram_0026') + ' nt0=' + countNt(store.nt0));

// 运行 90 帧: 完整链路
for (let i = 0; i < 90; i++) {
  try {
    game.interrupts.nmi(i);
    ts.writeStoreToPpu(store, ppu);
    ppu.startFrame();
    ppu.renderFramePartially(0, 240);
    ppu.endFrame();
  } catch (e) {
    log.push('CRASH frame ' + (i + 1) + ': ' + e.message);
    log.push(e.stack.split('\n').slice(0, 8).join('\n'));
    break;
  }
}

log.push('=== after 90 frames ===');
log.push('ram_00ED=' + store.read('ram_00ED') + ' ram_0026=' + store.read('ram_0026') + ' nt0=' + countNt(store.nt0));

// NT0 tile 值 (DataStore)
const nz = [];
for (let y = 0; y < 30; y++) {
  const row = store.nt0[y];
  if (!row) continue;
  for (let x = 0; x < 32; x++) {
    const t = row[x] && row[x].tile !== 0 ? row[x].tile : 0;
    if (t !== 0) nz.push({ x, y, t, p: row[x].palette });
  }
}
log.push('DataStore nt0 nonZero=' + nz.length);
log.push(nz.slice(0, 60).map(e => `(${e.x},${e.y})tile=${e.t.toString(16)}p=${e.p}`).join(' '));

// PPU vramMem NT0
let vramNz = 0;
for (let i = 0; i < 0x3c0; i++) if (ppu.vramMem[0x2000 + i] !== 0) vramNz++;
log.push('PPU vramMem NT0 ($2000-$23BF) nonZero=' + vramNz);
log.push(hexRows(0x2000, 0x40, 16));

// 调色板
log.push('PPU palette RAM ($3F00-$3F1F):');
log.push(hexRows(0x3f00, 0x20, 16));
const pal = ppu.palTable;
log.push('palTable.curTable first 16: ' + Array.from(pal.curTable.slice(0, 16)).map(c => c.toString(16).padStart(6, '0')).join(' '));

// 图案表检查: 用到的高频 tile 的 pattern 是否非空
const tileCounts = {};
for (const e of nz) tileCounts[e.t] = (tileCounts[e.t] || 0) + 1;
const topTiles = Object.entries(tileCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(e => parseInt(e[0]));
log.push('top tiles: ' + topTiles.map(t => '$' + t.toString(16)).join(' '));
for (const t of topTiles) {
  // pattern table 0 (背景): ptTile[t] 是 Tile 对象 {pix, initialized, opaque}
  const tile = ppu.ptTile[t];
  const pix = tile && tile.pix ? tile.pix : null;
  let nzP = 0;
  let opaque = tile ? tile.opaque : 0;
  if (pix) for (let i = 0; i < pix.length; i++) if (pix[i] !== 0) nzP++;
  log.push(`ptTile[$${t.toString(16)}] initialized=${tile && tile.initialized ? 1 : 0} opaque=${opaque} nonZeroPix=${nzP}`);
}

// buffer 非零
let bufNz = 0;
const buf = ppu.buffer;
for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) bufNz++;
log.push('ppu.buffer nonZero=' + bufNz + ' / ' + buf.length);
// buffer 抽样: 取几个非零像素 (如果有)
if (bufNz > 0) {
  let shown = 0;
  for (let i = 0; i < buf.length && shown < 10; i++) {
    if (buf[i] !== 0) {
      const x = i % 256, y = (i / 256) | 0;
      log.push(`  pixel(${x},${y}) = ${buf[i].toString(16)}`);
      shown++;
    }
  }
}

log.push('scrollX=' + store.scrollX + ' scrollY=' + store.scrollY);
log.push('ram_0020=' + store.read('ram_0020') + ' ram_0021=' + store.read('ram_0021'));
log.push('f_bgVisibility=' + ppu.f_bgVisibility + ' f_spVisibility=' + ppu.f_spVisibility);
log.push('bg_pt=' + (ppu.scrollStore && ppu.scrollStore.bg_pt) + ' spr_pt=' + (ppu.scrollStore && ppu.scrollStore.spr_pt));
log.push('ppu.ctrl1=' + ppu.ctrl1 + ' ctrl2=' + ppu.ctrl2);

fs.writeFileSync(path.resolve(__dirname, '_diag_black_out.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));
