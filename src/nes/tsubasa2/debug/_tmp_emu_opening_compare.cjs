/**
 * _tmp_emu_opening_compare.cjs — 模拟器开场 120 帧状态快照 (与 H5 _tmp_diag_h5_opening.cjs 对比)
 * 每 30 帧: ram_00ED / NT0非零 / PPU palette($3F00-$3F1F) / OAM可见精灵 / buffer非零
 */
const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));

const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

function countNt0() {
  let n = 0;
  for (let i = 0; i < 0x3c0; i++) if (nes.ppu.vramMem[0x2000 + i] !== 0) n++;
  return n;
}
function countNt1() {
  let n = 0;
  for (let i = 0; i < 0x3c0; i++) if (nes.ppu.vramMem[0x2800 + i] !== 0) n++;
  return n;
}
function sprCount() {
  let n = 0;
  for (let i = 0; i < 64; i++) {
    const y = nes.ppu.spriteMem[i * 4];
    if (y > 0 && y < 240) n++;
  }
  return n;
}

const log = [];
for (let f = 0; f < 120; f++) {
  nes.frame();
  if ((f + 1) % 30 === 0) {
    const pal = [];
    for (let i = 0; i < 32; i++) pal.push(nes.ppu.vramMem[0x3f00 + i] || 0);
    log.push(`F${f + 1}: ram_00ED=${nes.cpu.mem[0x00ED]} nt0=${countNt0()} nt1=${countNt1()} sprites=${sprCount()}`);
    log.push(`  palette BG : [${pal.slice(0, 16).map(v => '#' + v.toString(16).toUpperCase().padStart(2, '0')).join(',')}]`);
    log.push(`  palette SPR: [${pal.slice(16, 32).map(v => '#' + v.toString(16).toUpperCase().padStart(2, '0')).join(',')}]`);
    log.push(`  ram_062A[0..7]=${Array.from({ length: 8 }, (_, k) => nes.cpu.mem[0x62A + k]).map(v => v.toString(16)).join(',')}`);
    log.push(`  ram_063A[0..7]=${Array.from({ length: 8 }, (_, k) => nes.cpu.mem[0x63A + k]).map(v => v.toString(16)).join(',')}`);
  }
}

// 最终 buffer
const buf = nes.ppu.buffer;
let bufNz = 0;
for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) bufNz++;
log.push(`final buffer nonZero=${bufNz} / ${buf.length}`);
log.push(`final ram_00ED=${nes.cpu.mem[0x00ED]} nt0=${countNt0()} nt1=${countNt1()}`);

fs.writeFileSync(path.resolve(__dirname, '_tmp_emu_opening_compare.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));
