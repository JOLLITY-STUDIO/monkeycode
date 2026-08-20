const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname);
const ROM_PATH = path.join(ROOT, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const TARGET = path.join(ROOT, 'src', 'game', 'data', 'prg', 'prg-bank-30.ts');
const rom = fs.readFileSync(ROM_PATH);
const PRG_OFFSET = 0x10;
const n = 30;
const off = PRG_OFFSET + n * 0x2000;
const data = [...rom.slice(off, off + 0x2000)];
console.log('bank30 bytes:', data.length, 'first:', data[0].toString(16), 'last:', data[data.length-1].toString(16));
const hexLine = a => a.map(v => '0x' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ');
const lines = [];
for (let i = 0; i < data.length; i += 16) {
  lines.push('  ' + hexLine(data.slice(i, i + 16)) + (i + 16 < data.length ? ',' : ''));
}
const content =
  `/** PRG-ROM Bank 30 (8KB) — 自动生成 */\n` +
  `const PRG_BANK_30: readonly number[] = [\n` +
  lines.join('\n') + '\n' +
  `];\n` +
  `export default PRG_BANK_30;\n`;
fs.writeFileSync(TARGET, content);
console.log('written:', TARGET);
