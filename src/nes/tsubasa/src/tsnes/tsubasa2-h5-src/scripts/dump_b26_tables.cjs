// 从 rom-data/prg-bank-26.ts 提取 Bank26 全部数据表 → 生成 bank26-tables.ts
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '../../rom-data/prg-bank-26.ts'), 'utf8');
const hexes = src.match(/0x[0-9A-Fa-f]{2}/g).map(h => parseInt(h, 16));
console.log('prg-bank-26 length:', hexes.length);

// CPU 基址 $8000 → PRG offset 0
const cpu = a => hexes[a - 0x8000];

// ── 定义需要提取的表: [name, startCPU, len, comment] ──
const tables = [
  ['T_8278', 0x8278, 0x14, '队伍索引表 (4B 有效 + 等级阈值 $828C)'],
  ['T_828C', 0x828C, 0x0C, '等级阈值表 1 (0x9A/0x60/0x30...)'],
  ['T_83D7', 0x83D7, 0x0A, '队伍能力修正表'],
  ['T_83E1', 0x83E1, 0x14, '等级数据表 ($83E1)'],
  ['T_84EF', 0x84EF, 0x09, '区域码表 (门将/后卫/中场/前锋)'],
  ['T_86B1', 0x86B1, 0x08, '区域转换表'],
  ['T_888B', 0x888B, 0x02, '球员替换索引表'],
  ['T_88EB', 0x88EB, 0x08, '阵型数据表'],
  ['T_8928', 0x8928, 0x02, '状态阈值表'],
  ['T_8975', 0x8975, 0x03, '状态码表'],
  ['T_8A63', 0x8A63, 0x0C, '球队修正表'],
  ['T_8AAC', 0x8AAC, 0x04, '等级阈值表 2'],
  ['T_8B46', 0x8B46, 0x04, '等级阈值表 3'],
  ['T_8D93', 0x8D93, 0x17, '等级表指针 (11×2B)'],
  ['T_8DAA', 0x8DAA, 0x0C, '等级表数据 ($8DAA)'],
  ['T_908E', 0x908E, 0x07, '队伍状态切换表'],
  ['T_90E6', 0x90E6, 0x23, '状态处理表 ($90E6-$9108)'],
  ['T_9109', 0x9109, 0x07, '队伍初始化表'],
  ['T_92EA', 0x92EA, 0x04, '方向表 (角球/边线)'],
  ['T_9D82', 0x9D82, 0x19, 'OAM tile 表 (精灵)'],
  ['T_9DB9', 0x9DB9, 0x04, '光标移动方向表'],
  ['T_9EB7', 0x9EB7, 0x48, '阵型表 (9 阵型 × 8B)'],
  ['T_9F0F', 0x9F0F, 0x28, '战术表'],
  ['T_9F79', 0x9F79, 0x40, 'OAM 指针表 (32×2B)'],
  ['T_9FB9', 0x9FB9, 0x37, '区域坐标表 (5 组)'],
  ['T_9FF0', 0x9FF0, 0x10, '球员数据指针表 (8×2B, 指向 Bank29 $A000)'],
];

// ── 生成 TS 文件 ──
const lines = [];
lines.push(`/**`);
lines.push(` * Bank 26 数据模型 (Data/Model 层) — 比赛核心引擎数据`);
lines.push(` *`);
lines.push(` * 来源: rom-data/prg-bank-26.ts (自动生成, 原始字节)`);
lines.push(` * CPU 映射: bank 0x1A 切到 $8000-$9FFF`);
lines.push(` *`);
lines.push(` * 本文件由 scripts/dump_b26_tables.cjs 自动生成 — 禁止手工编辑。`);
lines.push(` */`);
lines.push(``);
lines.push(`import PRG_BANK_26 from '../../../rom-data/prg-bank-26';`);
lines.push(``);
lines.push(`/** bank26 CPU 基址 */`);
lines.push(`export const B26_CPU_BASE = 0x8000;`);
lines.push(``);
lines.push(`/** 读 bank26 原始字节 (CPU 地址) */`);
lines.push(`export function readB26(cpuAddr: number): number {`);
lines.push(`  const off = cpuAddr - B26_CPU_BASE;`);
lines.push(`  return off >= 0 && off < PRG_BANK_26.length ? PRG_BANK_26[off] : 0;`);
lines.push(`}`);
lines.push(``);
lines.push(`/** 读 bank26 16bit LE (CPU 地址) */`);
lines.push(`export function readB26U16(cpuAddr: number): number {`);
lines.push(`  return readB26(cpuAddr) | (readB26(cpuAddr + 1) << 8);`);
lines.push(`}`);
lines.push(``);

for (const [name, start, len, comment] of tables) {
  const bytes = [];
  for (let i = 0; i < len; i++) bytes.push(cpu(start + i));
  lines.push(`/** $${start.toString(16).toUpperCase()} — ${comment} */`);
  lines.push(`export const ${name}: readonly number[] = [`);
  for (let r = 0; r < bytes.length; r += 8) {
    const row = bytes.slice(r, r + 8).map(b => `0x${b.toString(16).toUpperCase()}`).join(', ');
    lines.push(`  ${row},`);
  }
  lines.push(`];`);
  lines.push(``);
}

fs.writeFileSync(path.join(__dirname, '../src/data/bank26-tables.ts'), lines.join('\n'));
console.log('generated bank26-tables.ts with', tables.length, 'tables');
