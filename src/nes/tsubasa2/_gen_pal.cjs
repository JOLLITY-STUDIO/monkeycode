const fs = require('fs');
const path = require('path');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgStart = 16;
const bank31Start = prgStart + 31 * 8192;
const fbcc = bank31Start + (0x1BCC);
let end = fbcc;
for (let i = fbcc; i < bank31Start + 8192; i++) {
  let allFF = true;
  for (let k = 0; k < 16; k++) if (rom[i+k] !== 0xFF) { allFF = false; break; }
  if (allFF) { end = i; break; }
}
const pal = Array.from(rom.slice(fbcc, end));
console.log('palette length', pal.length);
const ROWS = [];
for (let i = 0; i < pal.length; i += 16) {
  const row = pal.slice(i, i + 16).map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ');
  ROWS.push('  ' + row + ',');
}
const content = `/**
 * Bank 31 调色板表 $FBCC (固定区 $E000 窗口, 数组索引 = $FBCC - $E000 = $1BCC)
 *
 * 对应 asm/bank31 固定区 $FBCC 起的 BG/SPR 调色板数据 (NES 颜色索引)。
 * 每项 12 字节 (PALETTE_ENTRY_SIZE), $CC02/$C530 按 A*12 查表填充。
 *
 * 由 bank19_auxiliary.ts 消费 (替代 PRG_BANK_31 原始字节查表)。
 * 与 bank31-data-scripts.ts 的 PALETTE_DATA 同源, 此处为完整 324 字节区段。
 */
export const B31_PALETTE_FBCC: ReadonlyArray<number> = [
${ROWS.join('\n')}
];

/** $FBCC 调色板表项大小 (每项 12 字节) */
export const B31_PALETTE_ENTRY_SIZE = 12;
`;
fs.writeFileSync(path.resolve('src/game/prg/data/bank31-palette-fbcc.ts'), content);
console.log('wrote bank31-palette-fbcc.ts');
