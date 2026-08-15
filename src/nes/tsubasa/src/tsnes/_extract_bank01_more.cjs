/**
 * 从 rom-data/prg-bank-01.ts 提取 Bank01 缺失的数据表 → 生成 bank01-more-tables.ts
 * 表索引 = CPU 地址 - 0xA000
 */
const fs = require('fs');

// 读取 PRG bank 01 原始字节 (解析 TS 数组)
const raw = fs.readFileSync('rom-data/prg-bank-01.ts', 'utf8');
const m = raw.match(/\[([\s\S]*)\]/);
const bytes = m[1].split(',').map(s => parseInt(s.trim(), 16));
console.log('ROM bytes:', bytes.length);

function hex(n, w = 2) { return '0x' + n.toString(16).toUpperCase().padStart(w, '0'); }

function fmt(arr) {
  const rows = [];
  for (let i = 0; i < arr.length; i += 16) {
    const chunk = arr.slice(i, i + 16);
    rows.push('  ' + chunk.map(v => hex(v)).join(', ') + (i + 16 >= arr.length ? '' : ','));
  }
  return rows.join('\n');
}

const slice = (cpuAddr, len) => bytes.slice(cpuAddr - 0xA000, cpuAddr - 0xA000 + len);

const out = [];
out.push('/**');
out.push(' * Bank 01 补充数据表 (Data/Model 层) — 由 _extract_bank01_more.cjs 从 rom-data/prg-bank-01.ts 提取');
out.push(' * 仅供 DataQueryService (Bank 01) 使用 (bank=service, data=model)。');
out.push(' */');
out.push('');

const tables = [
  ['SEARCH_IDX', 0xB9D3, 3, 'B9D3 — 搜索偏移表 ($B023 用)'],
  ['SEARCH_TABLE', 0xB9D6, 0x46, 'B9D6 — 16位搜索表 ($B023 用)'],
  ['ROSTER_PTR', 0xBA1C, 0x30, 'BA1C — 花名册指针表 (entry5 $AFC2 用)'],
  ['TEAM_GFX_BASE', 0xBA4C, 0x44, 'BA4C/BA4D — 16位队伍 GFX 基址表 (entry6/7 用)'],
  ['LOOKUP_16BIT', 0xBA90, 0x80, 'BA90/BA91 — 16位查表 ($B045/$B016 用)'],
  ['TEAM_BLOCK_06', 0xBB10, 10, 'BB10 — 队伍 0x06 阵容表 (entry8 用)'],
  ['TEAM_BLOCK_0C', 0xBB1A, 10, 'BB1A — 队伍 0x0C 阵容表 (entry8 用)'],
  ['TEAM_BLOCK_10', 0xBB24, 10, 'BB24 — 队伍 0x10 阵容表 (entry8 用)'],
  ['NAME_SEARCH', 0xBB2E, 3, 'BB2E/BB2F/BB30 — 姓名搜索指针'],
  ['NAME_ROW_TBL', 0xB981, 3, 'B981/B982/B983 — 姓名/行表'],
  ['SPRITE_POS_A', 0xB823, 10, 'B823 — 精灵位置表 A'],
  ['SPRITE_POS_B', 0xB82D, 4, 'B82D — 精灵位置表 B'],
  ['SPRITE_POS_C', 0xB831, 2, 'B831/B832 — 精灵位置表 C'],
  ['CHR_COPY_A', 0xACA2, 256, 'ACA2 — 0x100 字节字符复制块 (→ ram_0468)'],
  ['CHR_COPY_B', 0xACB8, 256, 'ACB8 — 0x100 字节字符复制块 (→ ram_0468)'],
  ['PLAYER_GFX_BASE', 0xBC48, 2, 'BC48/BC49 — 球员图形基址'],
  ['PLAYER_GFX_TBL', 0xBC58, 22, 'BC58 — 球员图形指针表 (entry2 用)'],
  ['SCRIPT_ENTRY1', 0xB296, 0x57, 'B296 — 入口1 数据脚本 ($B0C0)'],
  ['SCRIPT_ENTRY2', 0xB305, 0x6C, 'B305 — 入口2 数据脚本 ($B0C0)'],
  ['SCENE_SUB_TBL', 0xB371, 34, 'B371 — 场景子表 (entry3 $A67B 用)'],
  ['SCRIPT_ENTRY4A', 0xB43D, 0x77, 'B43D — 入口4 数据脚本 A ($B0C0)'],
  ['SCRIPT_ENTRY4B', 0xB451, 0x62, 'B451 — 入口4 数据脚本 B ($B0C0)'],
  ['SCRIPT_ENTRY4C', 0xB881, 0x5C, 'B881 — 入口4 数据脚本 C ($B0C0)'],
  ['PPU_BUF_A', 0xB4B3, 0x38, 'B4B3 — PPU buffer 数据 A ($97AB)'],
  ['PPU_BUF_B', 0xB6EB, 0x42, 'B6EB — PPU buffer 数据 B ($97AB)'],
  ['PPU_BUF_C', 0xB9C8, 0x0B, 'B9C8 — PPU buffer 数据 C ($97B6)'],
  ['PPU_BUF_D', 0xB583, 0x30, 'B583 — PPU buffer 数据 D ($97AB)'],
  ['PPU_BUF_E', 0xB7A7, 0x08, 'B7A7 — PPU buffer 数据 E ($97AB)'],
  ['PPU_BUF_F', 0xB8EB, 0x30, 'B8EB — PPU buffer 数据 F ($97AB)'],
];

for (const [name, addr, len, desc] of tables) {
  const arr = slice(addr, len);
  out.push(`/** ${desc} — ${hex(addr)} (${len} 字节) */`);
  out.push(`export const ${name}: readonly number[] = [`);
  out.push(fmt(arr));
  out.push('];');
  out.push('');
}

out.push('/** 全部补充表按名称导出 (调试/测试用) */');
out.push('export const BANK01_MORE_TABLES: Record<string, readonly number[]> = {');
for (const [name] of tables) out.push(`  ${name},`);
out.push('};');
out.push('');

fs.writeFileSync('tsubasa2-h5-src/src/data/bank01-more-tables.ts', out.join('\n'));
console.log('Written bank01-more-tables.ts with', tables.length, 'tables');
