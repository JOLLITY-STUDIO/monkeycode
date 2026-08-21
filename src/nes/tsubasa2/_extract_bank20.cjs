// 从 ROM 提取 bank20 数据段 → 生成 bank20-data.ts (结构化命名常量)
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
console.log('ROM size:', rom.length, 'header:', rom.length - 0x4010 * 16);
// MMC3: PRG 从 0x10 开始, bankN 物理偏移 = 0x10 + N*0x2000
function bank(n, lo, len) {
  const off = 0x10 + n * 0x2000 + lo;
  return Array.from(rom.slice(off, off + len));
}
function hex(a) {
  return a.map((v, i) => (i % 16 === 0 ? '\n  ' : ' ') + '0x' + v.toString(16).toUpperCase().padStart(2, '0')).join(',') + ',';
}
// bank20 数据段 (数组索引 = 标注地址-$8000)
const B20 = {
  T_82F6: bank(20, 0x2F6, 32),        // $82F6 调色板补丁
  T_83A6: bank(20, 0x3A6, 8),         // $83A6 精灵调色板
  T_885B: bank(20, 0x85B, 6),         // $885B 动画 tile
  T_88A8: bank(20, 0x8A8, 40),        // $88A8 计分板 tile
  T_88D0: bank(20, 0x8D0, 10),        // $88D0 计分板属性
  T_88DA: bank(20, 0x8DA, 5),         // $88DA Y 偏移
  T_88DF: bank(20, 0x8DF, 5),         // $88DF X 偏移
  T_88E4: bank(20, 0x8E4, 12),        // $88E4 名字记录 RAM 基址
  NAME_MAP: bank(20, 0x8F0, 0x78),    // $88F0 名字映射表
  MAIN_STREAM_PTRS: bank(20, 0x968, 0x30), // $8968 主数据流指针表 (24项x2B)
};
// bank21 数据段 (数组索引 = 标注地址-$A000)
const B21 = {
  A1B4: bank(21, 0x1B4, 0x40),        // $A1B4 名字→数据表
  AC47: bank(21, 0xC47, 0x40),        // $AC47 名字→数据表2
  BA87: bank(21, 0xA87, 0x30),        // $BA87 精灵调色板表
  BACF: bank(21, 0xACF, 0x40),        // $BACF 调色板基址表
  B80C: bank(21, 0x80C, 0x60),        // $B80C 调色板基址表
  B6C7: bank(21, 0x6C7, 0x60),        // $B6C7 调色板基址表
  B767: bank(21, 0x767, 0x60),        // $B767 调色板基址表
};
// bank31 数据段 (数组索引 = 标注地址-$E000)
const B31 = {
  FB4C: bank(31, 0x1B4C, 0x80),       // $FB4C 动画偏移表
  FBCC: bank(31, 0x1BCC, 0x60),       // $FBCC 调色板表
};
let out = `/**
 * Bank 20 数据文件 — 结构化命名常量 (从 ROM 提取, 数组索引 = 标注地址-$8000)
 *
 * 新架构规范: 数据全部提取分类为命名常量, 禁止整 bank 数组 + 地址偏移访问。
 * bank20 引用的 $A000-$BFFF 窗口表 (bank21) 与 $E000 固定区表 (bank31) 一并提取。
 */
`;
const table = (name, arr, note) => `/** ${note} */
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
out += table('T_88E4', B20.T_88E4, '$88E4: 名字记录 RAM 基址表 6x2B');
out += table('NAME_MAP_TABLE_88F0', B20.NAME_MAP, '$88F0: 名字映射表');
out += table('MAIN_STREAM_PTR_TABLE_8968', B20.MAIN_STREAM_PTRS, '$8968: 主数据流指针表 24x2B');
out += '// ═══════════════ bank21 数据表 (标注 $Axxx, 数组索引=地址-$A000) ═══════════════\n\n';
out += table('B21_A1B4', B21.A1B4, '$A1B4: 名字→数据表');
out += table('B21_AC47', B21.AC47, '$AC47: 名字→数据表2');
out += table('B21_BA87', B21.BA87, '$BA87: 精灵调色板表');
out += table('B21_BACF', B21.BACF, '$BACF: 调色板基址表');
out += table('B21_B80C', B21.B80C, '$B80C: 调色板基址表');
out += table('B21_B6C7', B21.B6C7, '$B6C7: 调色板基址表');
out += table('B21_B767', B21.B767, '$B767: 调色板基址表');
out += '// ═══════════════ bank31 数据表 (标注 $Exxx, 数组索引=地址-$E000) ═══════════════\n\n';
out += table('B31_FB4C', B31.FB4C, '$FB4C: 动画偏移表 64x2B');
out += table('B31_FBCC', B31.FBCC, '$FBCC: 调色板表');
fs.writeFileSync('src/game/prg/data/bank20-data.ts', out);
console.log('bank20-data.ts written, size=' + out.length);
// 输出头部验证
console.log('T_82F6 head:', B20.T_82F6.slice(0, 4).map(v => v.toString(16)));
console.log('MAIN_STREAM_PTRS head:', B20.MAIN_STREAM_PTRS.slice(0, 6).map(v => v.toString(16)));
