const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const core = require(path.resolve(__dirname, '../_tmp_out/core/index.js'));
const NES = core.NES;
const nes = new NES();
nes.loadTsROM({
  header: ts.HEADER,
  prg: ts.PRG,
  chr: ts.NES_CHR_ROM,
});
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
log.push('ram_00ED=' + store.read('ram_00ED') + ' ram_0020=' + store.read('ram_0020') + ' ram_0021=' + store.read('ram_0021') + ' nt0=' + countNt(store.nt0));

// 真实 H5 路径: game.frame(nes) = attachMapper + nmi + writeStoreToPpu + PPU render(advanceDots)
for (let i = 0; i < 90; i++) {
  try {
    game.frame(nes);
  } catch (e) {
    log.push('CRASH frame ' + (i + 1) + ': ' + e.message);
    if (e.stack) log.push(e.stack.split('\n').slice(0, 8).join('\n'));
    break;
  }
}

log.push('=== after 90 frames ===');
log.push('ram_00ED=' + store.read('ram_00ED') + ' ram_0026=' + store.read('ram_0026') + ' nt0=' + countNt(store.nt0) + ' nt1=' + countNt(store.nt1));

// DataStore NT0 非零 tile
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

// 调色板
let palNz = 0;
for (let i = 0; i < 0x20; i++) if (ppu.vramMem[0x3f00 + i] !== 0) palNz++;
log.push('PPU palette RAM ($3F00-$3F1F) nonZero=' + palNz);

// CHR pattern 表: 检查 ptTile[0..511] 有多少 initialized
let ptInit = 0, ptOpaque = 0;
for (let i = 0; i < 512; i++) {
  const t = ppu.ptTile[i];
  if (t && t.initialized) ptInit++;
  if (t && t.opaque && t.opaque[0]) ptOpaque++;
}
log.push('ptTile initialized=' + ptInit + '/512 (opaque row0=' + ptOpaque + ')');

// 高频 tile pattern 检查
const tileCounts = {};
for (const e of nz) tileCounts[e.t] = (tileCounts[e.t] || 0) + 1;
const topTiles = Object.entries(tileCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(e => parseInt(e[0]));
log.push('top tiles: ' + topTiles.map(t => '$' + t.toString(16)).join(' '));
for (const t of topTiles) {
  const tile = ppu.ptTile[t];
  const pix = tile && tile.pix ? tile.pix : null;
  let nzP = 0;
  if (pix) for (let i = 0; i < pix.length; i++) if (pix[i] !== 0) nzP++;
  log.push(`ptTile[$${t.toString(16)}] initialized=${tile && tile.initialized ? 1 : 0} nonZeroPix=${nzP}`);
}

// buffer 非零
let bufNz = 0;
const buf = ppu.buffer;
for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) bufNz++;
log.push('ppu.buffer nonZero=' + bufNz + ' / ' + buf.length);
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
log.push('f_bgVisibility=' + ppu.f_bgVisibility + ' f_spVisibility=' + ppu.f_spVisibility + ' f_bgPatternTable=' + ppu.f_bgPatternTable + ' f_spPatternTable=' + ppu.f_spPatternTable);
log.push('bg_pt(scrollStore)=' + ppu.scrollStore.get('bg_pt'));

// 精灵
let sprNz = 0;
for (let i = 0; i < 0x100; i++) if (ppu.spriteMem[i] !== 0xf8 && i % 4 === 0) sprNz++;
log.push('ppu.spriteMem visible sprites=' + sprNz);

// ── 脚本 VM / VRAM buffer 状态 ──
log.push('ram_0056(scriptBank)=' + store.read('ram_0056') + ' ram_004D(scriptPtr)=' + store.read('ram_004D') + ' ram_004E=' + store.read('ram_004E'));
log.push('ram_0051/52/53(textPos)=' + store.read('ram_0051') + '/' + store.read('ram_0052') + '/' + store.read('ram_0053'));
log.push('ram_05E8..05F7(PPU buffer)=' + Array.from({length: 16}, (_, i) => store.read('ram_05E' + ((8 + i).toString(16).toUpperCase()))).map(v => v.toString(16).padStart(2, '0')).join(' '));
log.push('oam.busy=' + game.store.oam.busy + ' vramLen=' + game.store.oam.vramLen());
const vrb = [];
for (let i = 0; i < game.store.oam.vramLen() && i < 48; i++) vrb.push(game.store.oam.readVramByte(i).toString(16).padStart(2, '0'));
log.push('oam vram buffer[0..' + Math.min(game.store.oam.vramLen(), 48) + '): ' + vrb.join(' '));

fs.writeFileSync(path.resolve(__dirname, '_diag_black2_out.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));
