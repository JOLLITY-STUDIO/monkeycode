const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
const game = new ts.default(nes);
game.boot();
const store = game.store;
const ppu = nes.ppu;

const log = [];
function hex(addr, n, w) {
  const out = [];
  for (let i = 0; i < n; i += w) {
    const row = [];
    for (let j = 0; j < w; j++) row.push(store.read(addr + i + j).toString(16).padStart(2, '0'));
    out.push('$' + (addr + i).toString(16).toUpperCase() + ': ' + row.join(' '));
  }
  return out.join('\n');
}
function ntNz(nt) {
  let n = 0;
  for (let y = 0; y < 30; y++) {
    const row = nt[y];
    if (!row) continue;
    for (let x = 0; x < 32; x++) {
      if (row[x] && row[x].tile !== 0) n++;
    }
  }
  return n;
}

// 帧 10/20/30/60/90 采样
const samples = [5, 10, 20, 30, 60, 90];
let nextSample = 0;
for (let i = 0; i < 90; i++) {
  game.interrupts.nmi(i);
  ts.writeStoreToPpu(store, ppu);
  ppu.startFrame();
  ppu.renderFramePartially(0, 240);
  ppu.endFrame();
  if (i + 1 === samples[nextSample]) {
    const f = i + 1;
    let bufNz = 0;
    for (let k = 0; k < 0x40; k++) if (store.read(0x05E8 + k) !== 0) bufNz++;
    log.push(`=== frame ${f}: ram_0628=${store.read('ram_0628').toString(16)} ram_0629=${store.read('ram_0629').toString(16)} ram_00ED=${store.read('ram_00ED').toString(16)} ram_004C=${store.read('ram_004C').toString(16)} $05E8 buffer nz=${bufNz} nt0=${ntNz(store.nt0)} nt1=${ntNz(store.nt1)}`);
    if (bufNz > 0) log.push(hex(0x05e8, 0x40, 16));
    nextSample++;
  }
}

// 协程槽状态
const sys = game.system;
log.push('=== coroutines ===');
if (sys && sys._coroutines) {
  for (const [k, v] of Object.entries(sys._coroutines)) {
    if (v) log.push(`slot ${k}: active`);
  }
} else {
  log.push('sys._coroutines 不存在');
}

log.push('=== ram_062A palette anim region ===');
log.push(hex(0x062a, 0x40, 16));

log.push('=== store paletteTable ===');
log.push('bg[0].colors: ' + store.paletteTable.bgPalettes[0].colors.map(c => c.r.toString(16).padStart(2, '0') + c.g.toString(16).padStart(2, '0') + c.b.toString(16).padStart(2, '0')).join(' '));
log.push('spr[0].colors: ' + store.paletteTable.sprPalettes[0].colors.map(c => c.r.toString(16).padStart(2, '0') + c.g.toString(16).padStart(2, '0') + c.b.toString(16).padStart(2, '0')).join(' '));

// 检查 scene id / NMI_CALLBACK_TABLE
log.push('=== NMI_CALLBACK_TABLE ===');
const router = game.router;
if (router && router.dispatchByIndex) {
  for (let i = 0; i < 8; i++) log.push(`idx ${i}: target=${router.dispatchByIndex(i)}`);
}

fs.writeFileSync(path.resolve(__dirname, '_diag_buf_out.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));
