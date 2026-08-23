// 验证 Bug A (yield 保存 E6-ED) + Bug C (ctrl 随 tile 数) 修复效果
const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const core = require(path.resolve(__dirname, '../_tmp_out/core/index.js'));
const NES = core.NES;
const nes = new NES();
nes.loadTsROM({ header: ts.HEADER, prg: ts.PRG, chr: ts.NES_CHR_ROM });
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

// 每帧采样: ed 变化 / buffer ctrl 分布
const edHistory = [];
const ctrlCounts = {};
let maxNt0 = 0;
for (let i = 0; i < 300; i++) {
  try {
    game.frame(nes);
  } catch (e) {
    log.push('CRASH frame ' + (i + 1) + ': ' + e.message);
    break;
  }
  const ed = store.read('ram_00ED');
  if (edHistory.length === 0 || edHistory[edHistory.length - 1].ed !== ed) {
    edHistory.push({ f: i + 1, ed });
  }
  const ctrl = store.read('ram_05E8');
  if (ctrl !== 0) ctrlCounts['$' + ctrl.toString(16)] = (ctrlCounts['$' + ctrl.toString(16)] || 0) + 1;
  const n0 = countNt(store.nt0);
  if (n0 > maxNt0) maxNt0 = n0;
}

log.push('=== ed history (300 frames) ===');
log.push(edHistory.map(e => `f${e.f}:ed=${e.ed}`).join(' '));
log.push('=== buffer ctrl ($05E8) distribution ===');
log.push(JSON.stringify(ctrlCounts));
log.push('=== final ===');
log.push('ram_00ED=' + store.read('ram_00ED') + ' ram_0056(scriptBank)=' + store.read('ram_0056') + ' ram_004D=' + store.read('ram_004D') + ' ram_004E=' + store.read('ram_004E'));
log.push('ram_0051/52/53=' + store.read('ram_0051') + '/' + store.read('ram_0052') + '/' + store.read('ram_0053'));
log.push('ram_05E8..05F7=' + Array.from({length: 16}, (_, i) => store.read('ram_05E' + ((8 + i).toString(16).toUpperCase()))).map(v => v.toString(16).padStart(2, '0')).join(' '));
log.push('nt0 nonZero=' + countNt(store.nt0) + ' (max=' + maxNt0 + ') nt1=' + countNt(store.nt1));

// NT0 非零 tile 分布 (行统计)
const rowCounts = {};
for (let y = 0; y < 30; y++) {
  let n = 0;
  const row = store.nt0[y];
  if (row) for (let x = 0; x < 32; x++) if (row[x] && row[x].tile !== 0) n++;
  if (n) rowCounts[y] = n;
}
log.push('nt0 rowCounts=' + JSON.stringify(rowCounts));

// 具体 tile 内容 (前 60 个)
const nz = [];
for (let y = 0; y < 30; y++) {
  const row = store.nt0[y];
  if (!row) continue;
  for (let x = 0; x < 32; x++) {
    if (row[x] && row[x].tile !== 0) nz.push({ x, y, t: row[x].tile });
  }
}
log.push('nt0 nonZero tiles=' + nz.length + ': ' + nz.slice(0, 60).map(e => `(${e.x},${e.y})=$${e.t.toString(16)}`).join(' '));

// PPU vramMem NT0
let vramNz = 0;
for (let i = 0; i < 0x3c0; i++) if (ppu.vramMem[0x2000 + i] !== 0) vramNz++;
log.push('PPU vramMem NT0 nonZero=' + vramNz);
let palNz = 0;
for (let i = 0; i < 0x20; i++) if (ppu.vramMem[0x3f00 + i] !== 0) palNz++;
log.push('PPU palette RAM nonZero=' + palNz);

fs.writeFileSync(path.resolve(__dirname, '_diag_fix_edbuf_out.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));
