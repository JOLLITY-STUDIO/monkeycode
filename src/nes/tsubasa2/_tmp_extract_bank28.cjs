// 临时脚本: 修正 bank28 数据表提取 (v2)
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
  // [名称, bank, 文件偏移, 长度, 注释]
  ['TBL_818E', 28, 0x018E, 11, '球员属性偏移表 ($818E, 11B) — $803A: Y=(A-$0B)'],
  ['TBL_8199', 28, 0x0199, 4, '属性数据偏移 ($8199, 2×16bit) — $8086 ADC $8199,Y'],
  ['TBL_8206', 28, 0x0206, 29, '位置查表 ($8206, 29B) — $81BB LDX $8206,Y'],
  ['TBL_824C', 28, 0x024C, 15, '位置查表 ($824C, 15B) — $822F LDX $824C,Y'],
  ['TBL_82C0', 28, 0x02C0, 11, '位置查表 ($82C0, 11B) — $829C LDX $82C0,Y'],
  ['TBL_8528', 28, 0x0528, 8, '队伍侧判断表 ($8528, 8B) — $850E CMP $8528,X'],
  ['TBL_8604', 28, 0x0604, 4, '阵型类型表 ($8604, 4B) — $85BC LDY $8604,X'],
  ['TBL_86B5', 28, 0x06B5, 5, '阵型表 ($86B5, 5B) — $8656 LDA $86B5,Y'],
  ['TBL_87C3', 28, 0x07C3, 4, '阵型表 ($87C3, 4B) — $8766 LDA $87C3,Y'],
  ['TBL_8A9D', 28, 0x0A9D, 22, '属性角色表 ($8A9D, 22B) — $8A6F LDY $8A9D,X (X=$0441/$0442)'],
  ['TBL_8B9E', 28, 0x0B9E, 16, '角度表 ($8B9E, 8×16bit) — $8AC8 CMP $8B9E,X'],
  ['TBL_8BBE', 28, 0x0BBE, 12, '角度表 ($8BBE, 6×16bit) — $8682/$8790 CMP $8BBE,X'],
  ['TBL_8E1B', 28, 0x0E1B, 16, '阵型数据指针表 ($8E1B, 8×16bit) — $8DD7 LDX $8E1B,X'],
  ['TBL_8C84', 28, 0x0C87, 64, '属性调整分派表 ($8C87, 32×16bit) — $8C84 JSR $C509'],
  ['TBL_8C3B', 28, 0x0C3E, 8, '等级设置分派表 ($8C3E, 4×16bit) — $8C3B JSR $C509'],
  ['TBL_8D9D', 28, 0x0DA0, 8, 'OAM分派表 ($8DA0, 4×16bit) — $8D9D JSR $C509'],
  ['TBL_9460', 28, 0x1460, 20, '阵型数据指针表A ($9460, 10×16bit) — $81CF LDA $9460,X'],
  ['TBL_9554', 28, 0x1554, 10, '阵型数据指针表B ($9554, 5×16bit) — $823F LDA $9554,X'],
  ['TBL_959E', 28, 0x159E, 20, '阵型数据指针表C ($959E, 10×16bit) — $82AE LDA $959E,X'],
  ['TBL_9E4E', 28, 0x1E4E, 192, '数值表 ($9E4E, 192B=0xC0项) — $8030/$8285 LDA $9E4E,Y/X'],
  ['TBL_BAB2', 29, 0x1AB2, 64, '队伍数据指针表 (bank29 偏移$1AB2=$BAB2, 32×16bit) — $8B41 LDA $BAB2,X'],
  ['TBL_86AF', 28, 0x06AF, 8, '阵型后续分派表 ($86AF, 4×16bit) — $86AC JSR $C509'],
  ['TBL_86C0', 28, 0x06C0, 8, '阵型后续分派表2 ($86C0, 4×16bit) — $86BD JSR $C509'],
  ['TBL_86F1', 28, 0x06F1, 8, '阵型后续分派表3 ($86F1, 4×16bit) — $86EE JSR $C509'],
  ['TBL_8716', 28, 0x0716, 8, '阵型后续分派表4 ($8716, 4×16bit) — $8713 JSR $C509'],
  ['TBL_87BD', 28, 0x07BD, 6, '阵型分派表5 ($87BD, 3×16bit) — $87BA JSR $C509'],
  ['TBL_87CD', 28, 0x07CD, 12, '阵型分派表6 ($87CD, 6×16bit) — $87CA JSR $C509'],
  ['TBL_88DD', 28, 0x08E0, 8, '阵型分派表7 ($88E0, 4×16bit) — $88DD JSR $C509'],
  ['TBL_8900', 28, 0x0903, 8, '阵型分派表8 ($8903, 4×16bit) — $8900 JSR $C509'],
  ['TBL_8956', 28, 0x0956, 8, '阵型分派表9 ($8956, 4×16bit) — $8953 JSR $C509'],
];
let out = [];
out.push('/**');
out.push(' * bank28-tables.ts — bank28 数据表 (从 ROM 提取)');
out.push(' * @bank 28 — 比赛对阵/阵型/等级/OAM 配置数据');
out.push(' *');
out.push(' * 偏移 = 反汇编地址 - $8000 (bank28 物理偏移)。');
out.push(' * $BAB2 表在 bank29 偏移 $1AB2 (运行时 $BAB2, bank28 $8B41 引用)。');
out.push(' *');
out.push(' * 供 MatchConfigService 消费, 禁止裸地址访问。');
out.push(' */');
out.push('');
for (const [name, bank, off, len, comment] of T) {
  out.push(`/** ${comment} */`);
  out.push(`export const ${name}: readonly number[] = [${dump(bank, off, len)}];`);
  out.push('');
}
out.push('export const BANK28_TABLES = {');
out.push('  TBL_818E, TBL_8199, TBL_8206, TBL_824C, TBL_82C0, TBL_8528,');
out.push('  TBL_8604, TBL_86B5, TBL_87C3, TBL_8A9D, TBL_8B9E, TBL_8BBE,');
out.push('  TBL_8E1B, TBL_8C84, TBL_8C3B, TBL_8D9D, TBL_9460, TBL_9554,');
out.push('  TBL_959E, TBL_9E4E, TBL_BAB2, TBL_86AF, TBL_86C0, TBL_86F1,');
out.push('  TBL_8716, TBL_87BD, TBL_87CD, TBL_88DD, TBL_8900, TBL_8956,');
out.push('} as const;');
fs.writeFileSync('src/game/prg/data/tables/bank28-tables.ts', out.join('\n') + '\n');
console.log('done, tables: ' + T.length);
