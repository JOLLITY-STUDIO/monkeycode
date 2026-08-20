// 用 tsnes 模拟器跑真实 ROM BOOT 阶段, dump NT/CHR slot/palette 基准
const fs = require('fs');
const path = require('path');

const ROM = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const { NES } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js');

const nes = new NES({ emulateSound: false, sampleRate: 0 });
const romData = fs.readFileSync(ROM);
nes.loadROM(romData);

function hex(v, n = 2) {
  return v.toString(16).padStart(n, '0').toUpperCase();
}

function dumpFrame(tag, frame) {
  const ppu = nes.ppu;
  const mmap = nes.mmap;
  // NT0 tile (30x32), 从 nameTable[0].tile 读前 960
  const nt = ppu.nameTable[0].tile;
  let nonZero = 0;
  const rows = [];
  for (let y = 0; y < 30; y++) {
    const row = [];
    for (let x = 0; x < 32; x++) {
      const t = nt[y * 32 + x];
      if (t !== 0) nonZero++;
      row.push(hex(t, 2));
    }
    rows.push(row.join(' '));
  }
  // palette RAM BG 16 + SPR 16
  const pal = [];
  for (let i = 0; i < 32; i++) pal.push(hex(ppu.vramMem[0x3f00 + i] & 0x3f, 2));
  // OAM spriteMem 前 64 字节 (16 精灵)
  const oam = [];
  for (let i = 0; i < 64; i++) oam.push(hex(ppu.spriteMem[i], 2));
  // cpu RAM 0490/0491
  const r490 = nes.cpu.mem[0x0490];
  const r491 = nes.cpu.mem[0x0491];
  const rED = nes.cpu.mem[0x00ED];
  console.log(`\n===== frame ${frame} [${tag}] =====`);
  console.log(`bgPatternTable=${ppu.f_bgPatternTable} spPatternTable=${ppu.f_spPatternTable} regS=${ppu.regS}`);
  console.log(`MMC3 chrBanks(1KB slot): [${Array.from(mmap.chrBanks).map(b => hex(b)).join(',')}]`);
  console.log(`ram_0490=${hex(r490)} ram_0491=${hex(r491)} ram_00ED=${hex(rED)}`);
  console.log(`BG palette: ${pal.slice(0, 16).join(' ')}`);
  console.log(`SPR palette: ${pal.slice(16).join(' ')}`);
  console.log(`OAM[0..63]: ${oam.join(' ')}`);
  console.log(`NT0 非零 tile=${nonZero}/960`);
  // 打印前 12 行 NT
  for (let y = 0; y < 12; y++) {
    console.log(`  NT0 y${hex(y)}: ${rows[y]}`);
  }
}

const DUMP_FRAMES = [10, 20, 30, 45, 60];
const TOTAL = 120;
for (let f = 1; f <= TOTAL; f++) {
  nes.frame();
  if (DUMP_FRAMES.includes(f)) {
    dumpFrame(f <= 45 ? 'BOOT-OPENING' : 'BOOT', f);
  }
}
console.log('\n[完成] 120 帧');
