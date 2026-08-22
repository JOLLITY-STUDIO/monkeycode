// 临时: 提取 bank28/bank29 缺失数据区, 追加到 bank28-tables.ts
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const HEADER = 0x10;
function hex(n) { return n.toString(16).toUpperCase().padStart(2, '0'); }
function dump(bank, off, len) {
  const B = HEADER + bank * 0x2000;
  const arr = [];
  for (let i = 0; i < len; i++) arr.push('0x' + hex(rom[B + off + i]));
  return arr.join(', ');
}
const T = [
  ['DATA_LINEUP_834A', 28, 0x034A, 0x120, '阵容显示 tile 数据 ($834A-$8469, 0x120B) — $82CA/$830A 读 ($0061),Y 0x18B×12 写 $04A5'],
  ['DATA_FPTR_8E2B', 28, 0x0E2B, 0x635, '阵型指针 2D 表 ($8E2B-$945F, 16B/行) — sub8DC9 经 TBL_8E1B 指针 + LDA($0048),Y 读 16bit'],
  ['DATA_FORM_9474', 28, 0x1474, 0x162, '阵型数据区 ($9474-$95D5, 覆盖 $9474/$9500/$955E/$95B2 等指针目标) — $819D/$8224/$828F 经 TBL_9460/9554/959E 读'],
  ['DATA_ATTR_95D6', 28, 0x15D6, 0x878, '属性数据 ($95D6-$9E4D) — sub803A 基址 $95D6/$9662 + ($0032),Y'],
  ['DATA_9FCE', 28, 0x1FCE, 0x32, '属性尾表 ($9FCE-$9FFF) — sub803A A==1F 基址 $9FCE + $9FF0 调色板尾'],
  ['DATA_AE86', 29, 0x0E86, 0x17A, 'bank29 属性数据 ($AE86-$AFFF, bank内偏移$E86) — sub803A A==0/$0B/$1E 基址 $AE86; 物理ROM=0x3AE96=GK能力值区'],
];
let path = 'src/game/prg/data/tables/bank28-tables.ts';
let src = fs.readFileSync(path, 'utf8');
let out = [];
out.push('/**');
out.push(' * ===== 补充数据区 (2026-08-22 提取, 供 MatchConfigService 完整翻译) =====');
out.push(' */');
out.push('');
for (const [name, bank, off, len, comment] of T) {
  out.push(`/** ${comment} */`);
  out.push(`export const ${name}: readonly number[] = [${dump(bank, off, len)}];`);
  out.push('');
}
// 在 BANK28_TABLES 聚合前插入新导出
const marker = 'export const BANK28_TABLES = {';
const idx = src.indexOf(marker);
if (idx < 0) { console.error('marker not found'); process.exit(1); }
const head = src.slice(0, idx);
const tail = src.slice(idx);
const names = T.map((t) => t[0]).join(', ');
const newBlock = out.join('\n') +
  'export const BANK28_EXTRA = {\n  ' + names + ',\n} as const;\n\n';
fs.writeFileSync(path, head + newBlock + tail);
console.log('appended ' + T.length + ' tables to ' + path);
// 快速校验几个关键字节
console.log('check 834A head:', dump(28, 0x034A, 4));
console.log('check 8E2B head:', dump(28, 0x0E2B, 4));
console.log('check 95D6 head:', dump(28, 0x15D6, 4));
console.log('check 9FCE head:', dump(28, 0x1FCE, 4));
console.log('check AE86 head:', dump(29, 0x0E86, 4));
