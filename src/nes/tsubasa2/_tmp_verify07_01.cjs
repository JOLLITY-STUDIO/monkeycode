// 校验 bank07 SCENE 场景表 + bank01 player-table vs ROM
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const B07 = (addr) => 0x10 + 7 * 0x2000 + (addr - 0xA000); // 运行时 $A000 窗口
const B01 = (addr) => 0x10 + 1 * 0x2000 + (addr - 0xA000); // bank01 $A000 窗口

// ── bank07 SCENE_PTR_TABLE (24 项小端) ──
const tsPtr = [0xa0d4,0xa0df,0xa127,0xa13f,0xa150,0xa164,0xa174,0xa190,0xa1a1,0xa1c9,0xa1f1,0xa22a,0xa23b,0xa274,0xa284,0xa294,0xa2a4,0xa2bc,0xa2d4,0xa2ec,0xa304,0xa31c,0xa337,0xa373];
// 指针表本身在 bank07 $8000 窗口 (运行时 $A000?), 查 _full.s 确认位置: 假设 $8000 起
// 从 GameSystemService 注释: SCENE_PTR_TABLE @ bank0 $8B1C 查表, 表在 bank07 $8000
const ptrRom = [];
for (let i = 0; i < 24; i++) ptrRom.push(rom[0x10 + 7 * 0x2000 + i * 2] | (rom[0x10 + 7 * 0x2000 + i * 2 + 1] << 8));
console.log('SCENE_PTR_TABLE @bank07 $8000:');
let ok = true;
for (let i = 0; i < 24; i++) {
  if (ptrRom[i] !== tsPtr[i]) { ok = false; console.log('  [' + i + '] ROM=' + ptrRom[i].toString(16) + ' TS=' + tsPtr[i].toString(16)); }
}
console.log(ok ? 'PASS' : 'FAIL');

// ── bank01 STAMINA_TABLE_16BIT ($BA90, 64×16bit) ──
const tsSt = [0x0000,0x0060,0x00D0,0x0150,0x0210,0x0300,0x03F8,0x0500,0x0628,0x0780,0x0900,0x0A30,0x0CE0,0x0DA0,0x0F70,0x1150,0x1350,0x1570,0x17B0,0x1900,0x1C60,0x1ED0,0x2048,0x23C8,0x2550,0x28E0,0x2A78,0x2D18,0x30C8,0x3288,0x3558,0x3830,0x3B10,0x3EF8,0x4040,0x4490,0x47E8,0x4A48,0x4EB0,0x5120,0x5500,0x5920,0x5D50,0x6190,0x65E0,0x6940,0x6E00,0x73E0,0x77D0,0x7C00,0x8280,0x8780,0x8DE0,0x93D0,0x9AE0,0xA1C0,0xA9C0,0xB1D0,0xB904,0xC280,0xCBA0,0xD700,0xE8FF,0xE8FF];
const stRom = [];
for (let i = 0; i < 64; i++) stRom.push(rom[B01(0xBA90) + i * 2] | (rom[B01(0xBA90) + i * 2 + 1] << 8));
let ok2 = true;
for (let i = 0; i < 64; i++) if (stRom[i] !== tsSt[i]) { ok2 = false; console.log('  stamina[' + i + '] ROM=' + stRom[i].toString(16) + ' TS=' + tsSt[i].toString(16)); }
console.log((ok2 ? 'PASS' : 'FAIL') + ' STAMINA_TABLE_16BIT @$BA90 (64×16bit)');

// ── bank01 PLAYER_STAT_TABLE_16BIT (36×16bit, $BA90 前段? 实际在 $B8D0 附近?) ──
// player-table 注释说 8bit 表, 但值是 16bit。先 dump bank01 $B8B0-$BB00 看真实布局
console.log('\nbank01 $B8B0-$BB00 dump:');
for (let a = 0xB8B0; a < 0xBB00; a += 16) {
  const bytes = [];
  for (let i = 0; i < 16; i++) bytes.push(rom[B01(a) + i].toString(16).padStart(2, '0'));
  console.log(a.toString(16) + ': ' + bytes.join(' '));
}
