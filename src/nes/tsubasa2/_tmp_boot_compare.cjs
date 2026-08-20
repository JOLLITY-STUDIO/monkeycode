// BOOT 基准对比: 模拟器 NT0/OAM/palette vs H5 模式块解码
const fs = require('fs');

// ── 1. 模拟器基准 ──
const ROM = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const { NES } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js');
const nes = new NES({ emulateSound: false, sampleRate: 0 });
nes.loadROM(fs.readFileSync(ROM));

function hex(v, n = 2) { return v.toString(16).padStart(n, '0').toUpperCase(); }

for (let f = 1; f <= 30; f++) nes.frame();
const ppu = nes.ppu;
const mmap = nes.mmap;

console.log('===== 模拟器 BOOT 帧 30 基准 =====');
console.log(`bgPatternTable=${ppu.f_bgPatternTable} spPatternTable=${ppu.f_spPatternTable}`);
console.log(`MMC3 chrBanks(1KB slot): [${Array.from(mmap.chrBanks).map(b => hex(b)).join(',')}]`);
console.log(`ram_0490=${hex(nes.cpu.mem[0x0490])} ram_0491=${hex(nes.cpu.mem[0x0491])}`);

// NT0 非零 tile (带位置)
console.log('\n-- NT0 非零 tile (x,y):tile --');
const nt = ppu.nameTable[0].tile;
let nz = 0;
for (let y = 0; y < 30; y++) {
  for (let x = 0; x < 32; x++) {
    const t = nt[y * 32 + x];
    if (t !== 0) {
      console.log(`  (${x},${y}):${hex(t)}`);
      nz++;
    }
  }
}
console.log(`非零总数=${nz}`);

// 属性表 (ATTR0)
console.log('\n-- ATTR0 (64B) --');
const attr0 = ppu.nameTable[0].attribute;
if (attr0) {
  const row = [];
  for (let i = 0; i < 64; i++) row.push(hex(attr0[i]));
  console.log('  ' + row.join(' '));
} else {
  console.log('  (无 attribute dump)');
}

// 完整 OAM 256B (64 精灵)
console.log('\n-- OAM 完整 (64 精灵, 每组 Y tile attr X) --');
for (let i = 0; i < 64; i++) {
  const y = ppu.spriteMem[i * 4];
  const t = ppu.spriteMem[i * 4 + 1];
  const a = ppu.spriteMem[i * 4 + 2];
  const x = ppu.spriteMem[i * 4 + 3];
  if (y !== 0xF8 && !(y === 0 && t === 0 && a === 0 && x === 0)) {
    console.log(`  spr${i}: Y=${hex(y)} tile=${hex(t)} attr=${hex(a)} X=${hex(x)}`);
  }
}

// 最终 palette
console.log('\n-- palette (帧30) --');
const pal = [];
for (let i = 0; i < 32; i++) pal.push(hex(ppu.vramMem[0x3f00 + i] & 0x3f, 2));
console.log(`  BG:  ${pal.slice(0, 16).join(' ')}`);
console.log(`  SPR: ${pal.slice(16).join(' ')}`);

// ── 2. H5 模式块解码对比 ──
console.log('\n===== H5 模式块 0 (ptr 0xBB48) 解码 =====');
const PRG_BANK_06 = require('./_test_out/game/data/prg-bank-06.js').default || require('./_test_out/game/data/prg-bank-06.js');
const bank6 = Array.isArray(PRG_BANK_06) ? PRG_BANK_06 : (PRG_BANK_06.PRG_BANK_06 || Object.values(PRG_BANK_06)[0]);

function decodeModeBlocks(ptr) {
  let off = ptr & 0x1FFF;
  const blocks = [];
  for (let guard = 0; guard < 64; guard++) {
    const flags = bank6[off];
    const addrLo = bank6[off + 1];
    const addrHi = bank6[off + 2];
    if (flags === undefined || flags === 0xFF) break;
    const vramAddr = (addrHi << 8) | addrLo;
    if (vramAddr < 0x2000 || vramAddr > 0x2FFF) break;
    const count = flags & 0x3F;
    if (count === 0 || count > 64) break;
    const tiles = [];
    for (let i = 0; i < count; i++) tiles.push(bank6[off + 3 + i]);
    blocks.push({ flags: flags, vramAddr, count, tiles, rawOffset: off });
    off += 3 + count;
    if ((flags & 0x40) !== 0) break;
  }
  return blocks;
}

for (let mode = 0; mode < 4; mode++) {
  const ptr = [0xBB48, 0xBB9A, 0xBBE8, 0xBC42][mode];
  console.log(`\n-- mode ${mode} (ptr ${hex(ptr)}) --`);
  const blocks = decodeModeBlocks(ptr);
  blocks.forEach((b, i) => {
    console.log(`  块${i}: flags=${hex(b.flags)} vram=${hex(b.vramAddr, 4)} count=${b.count} tiles=[${b.tiles.map(t => hex(t)).join(' ')}]`);
  });
}

// 模式块 tile → NT 坐标换算 (与 H5 applyModeBlocks 一致)
console.log('\n-- mode 0 写入 NT 的位置 (与 H5 applyModeBlocks 一致) --');
const blocks0 = decodeModeBlocks(0xBB48);
blocks0.forEach((b, i) => {
  const ntBase = b.vramAddr & 0x3FF;
  const tileX = ntBase & 0x1F;
  const tileY = (ntBase >> 5) & 0x1F;
  b.tiles.forEach((t, k) => {
    const x = tileX + k;
    if (tileY < 30 && x < 32) console.log(`  (${x},${tileY}):${hex(t)}`);
  });
});
