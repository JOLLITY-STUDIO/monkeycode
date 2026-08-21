// 从 ROM 提取 bank20 全部数据段 → 生成 bank20-data.ts (结构化命名常量, 完整版)
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
function bank(n, lo, len) {
  const off = 0x10 + n * 0x2000 + lo;
  return Array.from(rom.slice(off, off + len));
}
function hex(a) {
  return a.map((v, i) => (i % 16 === 0 ? '\n  ' : ' ') + '0x' + v.toString(16).toUpperCase().padStart(2, '0')).join(',') + ',';
}
// ── bank20 数据表 (数组索引 = 标注地址-$8000) ──
const B20 = {
  T_82F6: bank(20, 0x2F6, 32),              // $82F6 调色板补丁
  T_83A6: bank(20, 0x3A6, 8),               // $83A6 精灵调色板
  T_885B: bank(20, 0x85B, 6),               // $885B 动画 tile
  T_88A8: bank(20, 0x8A8, 40),              // $88A8 计分板 tile
  T_88D0: bank(20, 0x8D0, 10),              // $88D0 计分板属性
  T_88DA: bank(20, 0x8DA, 5),               // $88DA Y 偏移
  T_88DF: bank(20, 0x8DF, 5),               // $88DF X 偏移
  T_88E4: bank(20, 0x8E4, 12),              // $88E4 名字记录 RAM 基址 6x2B
  NAME_MAP: bank(20, 0x8F0, 0x78),          // $88F0 名字映射表
  MAIN_STREAM_PTRS: bank(20, 0x968, 0x30),  // $8968 主数据流指针表 24x2B
  MAIN_STREAM: bank(20, 0xB48, 0x2000 - 0xB48), // $8B48-$9FFF 主状态机数据流
};
// ── bank21 数据段 (数组索引 = 标注地址-$A000) ──
const B21 = {
  A1B4: bank(21, 0x1B4, 0x40),                  // $A1B4 名字→数据表 (32x2B)
  AC47: bank(21, 0xC47, 0x40),                  // $AC47 名字→数据表2 (32x2B)
  BA87: bank(21, 0xA87, 0x30),                  // $BA87 精灵调色板表
  BACF: bank(21, 0xACF, 0x40),                  // $BACF 调色板基址表
  B80C: bank(21, 0x180C, 0x2AB),                // $B80C-$BAB6 调色板基址 (扩展覆盖 A*5 最大索引 0x27B)
  B6C7: bank(21, 0x16C7, 0x60),                 // $B6C7 调色板基址表 (真实偏移 0x16C7!)
  B767: bank(21, 0x1767, 0x100),                // $B767-$B866 调色板基址 (扩展)
  NAME_DATA_1: bank(21, 0x38A, 0xAC46 - 0xA38A),// $A38A-$AC46 A1B4 记录 ($84DC 子流)
  NAME_DATA_2: bank(21, 0xE25, 0xB6C6 - 0xAE25),// $AE25-$B6C6 AC47/$AC87表 记录 ($83D9 子流)
};
// ── bank31 数据段 (数组索引 = 标注地址-$E000) ──
const B31 = {
  FB4C: bank(31, 0x1B4C, 0x80),   // $FB4C 动画偏移表 64x2B
  FBCC: bank(31, 0x1BCC, 0x60),   // $FBCC 调色板表
};
let out = `/**
 * Bank 20 数据文件 — 结构化命名常量 (从 ROM 提取, 新架构: 数据全部提取分类, 禁止整 bank 数组)
 *
 * 数组索引约定:
 *   bank20 表   = 标注地址 - $8000
 *   bank21 表   = 标注地址 - $A000
 *   bank31 表   = 标注地址 - $E000
 *   MAIN_STREAM_DATA / B21_NAME_DATA_* 为数据池, 索引 = CPU 地址 - 池基址。
 */
`;
const table = (name, arr, note, extra = '') => `/** ${note}${extra ? ' (' + extra + ')' : ''} */
export const ${name}: ReadonlyArray<number> = [${hex(arr)}
];

`;
out += '// ═══════════════ bank20 数据表 (标注 $8xxx) ═══════════════\n\n';
out += table('T_82F6', B20.T_82F6, '$82F6: 调色板补丁 32B');
out += table('T_83A6', B20.T_83A6, '$83A6: 精灵调色板 8B');
out += table('T_885B', B20.T_885B, '$885B: 动画 tile 表 6B');
out += table('T_88A8', B20.T_88A8, '$88A8: 计分板 tile 表 40B');
out += table('T_88D0', B20.T_88D0, '$88D0: 计分板属性表 10B');
out += table('T_88DA', B20.T_88DA, '$88DA: Y 偏移 5B');
out += table('T_88DF', B20.T_88DF, '$88DF: X 偏移 5B');
out += table('T_88E4', B20.T_88E4, '$88E4: 名字记录 RAM 基址表 6x2B (LE)');
out += table('NAME_MAP_TABLE_88F0', B20.NAME_MAP, '$88F0: 名字映射表');
out += table('MAIN_STREAM_PTR_TABLE_8968', B20.MAIN_STREAM_PTRS, '$8968: 主数据流指针表 24x2B (LE, CPU 地址)');
out += table('MAIN_STREAM_DATA', B20.MAIN_STREAM, '$8B48-$9FFF: 主状态机数据流池', '索引 = CPU地址 - $8B48');
out += '// ═══════════════ bank21 数据表 (标注 $Axxx, 索引=地址-$A000) ═══════════════\n\n';
out += table('B21_A1B4', B21.A1B4, '$A1B4: 名字→数据表 32x2B (→$84DC 子流, 记录区 $A38A+)');
out += table('B21_AC47', B21.AC47, '$AC47: 名字→数据表2 32x2B (→$83D9 子流, 记录区 $AE25+)');
out += table('B21_BA87', B21.BA87, '$BA87: 精灵调色板表');
out += table('B21_BACF', B21.BACF, '$BACF: 调色板基址表');
out += table('B21_B80C', B21.B80C, '$B80C-$BAB6: 调色板基址表 (扩展, A*5 最大索引 0x27B)');
out += table('B21_B6C7', B21.B6C7, '$B6C7: 调色板基址表 (索引 0x16C7)');
out += table('B21_B767', B21.B767, '$B767-$B866: 调色板基址表 (扩展)');
out += table('B21_NAME_DATA_1', B21.NAME_DATA_1, '$A38A-$AC46: A1B4 名字记录数据池', '索引 = CPU地址 - $A38A');
out += table('B21_NAME_DATA_2', B21.NAME_DATA_2, '$AE25-$B6C6: AC47/$AC87 名字记录数据池', '索引 = CPU地址 - $AE25');
out += '// ═══════════════ bank31 数据表 (标注 $Exxx, 索引=地址-$E000) ═══════════════\n\n';
out += table('B31_FB4C', B31.FB4C, '$FB4C: 动画偏移表 64x2B (LE)');
out += table('B31_FBCC', B31.FBCC, '$FBCC: 调色板表');
fs.writeFileSync('src/game/prg/data/bank20-data.ts', out);
console.log('bank20-data.ts written, size=' + out.length);
console.log('MAIN_STREAM len=', B20.MAIN_STREAM.length);
console.log('NAME_DATA_1 len=', B21.NAME_DATA_1.length, 'NAME_DATA_2 len=', B21.NAME_DATA_2.length);
console.log('B6C7 head:', B21.B6C7.slice(0, 4).map(v => v.toString(16)));
console.log('B767 head:', B21.B767.slice(0, 4).map(v => v.toString(16)));
console.log('MAIN_STREAM head:', B20.MAIN_STREAM.slice(0, 8).map(v => v.toString(16)));
console.log('NAME_DATA_1 head:', B21.NAME_DATA_1.slice(0, 4).map(v => v.toString(16)));
console.log('NAME_DATA_2 head:', B21.NAME_DATA_2.slice(0, 4).map(v => v.toString(16)));
