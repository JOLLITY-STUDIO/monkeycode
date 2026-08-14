/**
 * 生成 tsubasa2-h5-src/src/data/team/roster.ts
 * 输入: tsnes/rom-data/prg-bank-29.ts (8192B 原始 PRG 数据)
 * 输出: 内嵌完整 PRG_BANK_29 + 结构化模型 (战术块/指针表/阵容区)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const SRC = path.join(ROOT, 'rom-data', 'prg-bank-29.ts');
const OUT = path.join(__dirname, '..', 'src', 'data', 'team', 'roster.ts');

const text = fs.readFileSync(SRC, 'utf8');
const bytes = [...text.matchAll(/0x([0-9a-fA-F]{2})/g)].map(m => parseInt(m[1], 16));
if (bytes.length !== 8192) throw new Error('bank29 bytes mismatch: ' + bytes.length);

// 生成 16 字节一行的字面量
function hexRows(data) {
  const rows = [];
  for (let i = 0; i < data.length; i += 16) {
    rows.push('  ' + data.slice(i, i + 16).map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ',');
  }
  return rows.join('\n');
}

// 战术块 (0x0000-0x1AB1, 00 00 分隔)
const BLOCK_LIMIT = 0x1AB2;
const blocks = [];
let start = 0;
for (let i = 0; i < BLOCK_LIMIT - 1; i++) {
  if (bytes[i] === 0 && bytes[i + 1] === 0) {
    if (i - start >= 4) blocks.push(bytes.slice(start, i));
    let j = i; while (j < BLOCK_LIMIT && bytes[j] === 0) j++;
    i = j - 1; start = j;
  }
}
if (BLOCK_LIMIT - start >= 4) blocks.push(bytes.slice(start, BLOCK_LIMIT));

// 指针表 (0x1AB2-0x1AF5)
const ptrs = [];
for (let off = 0x1AB2; off + 1 < 0x1D00; off += 2) {
  const v = bytes[off] | (bytes[off + 1] << 8);
  if (v === 0) break;
  ptrs.push(v);
}

// 阵容区 (0x1AF8-0x1CFE)
const rosters = [];
let off = 0x1AF8;
let ridx = 0;
while (off + 8 < 0x1D00) {
  while (off < 0x1D00 && bytes[off] === 0) off++;
  if (off >= 0x1D00 || bytes[off] === 0xFF) break;
  const s = off;
  const gfx = bytes.slice(off, off + 4);
  const team = bytes.slice(off + 4, off + 7);
  off += 7;
  const players = [];
  while (off < 0x1D00 && bytes[off] !== 0x0F) { players.push([bytes[off], bytes[off + 1]]); off += 2; }
  if (off < 0x1D00) off += 1;
  rosters.push({ idx: ridx++, offset: s, gfx, team, players });
}

const out = `/**
 * Bank 29 数据模型 (Data/Model 层) — 球队战术/阵型 + CPU 阵容
 *
 * 来源: rom-data/prg-bank-29.ts (自动生成, 勿手改)
 * CPU 映射: bank 0x1D 切到 $A000-$BFFF (由 Bank 30/26/31 加载, Bank 01 消费)
 *
 * 结构:
 *   [0x0000-0x1AB1] 战术块 ×${blocks.length} (00 00 分隔, 多数 22B)
 *   [0x1AB2-0x1AF5] 阵容指针表 ×${ptrs.length} (2B LE → $BAF6-$BCE0)
 *   [0x1AF8-0x1CFE] CPU 阵容区 ×${rosters.length} (GFX 4B + 队标 3B + [位置码,球员ID]×N + $0F)
 *   [0x1D00-0x1FFF] 0xFF 填充
 *
 * 仅供服务层使用 (bank=service, data=model): Bank01Service/TeamService
 */

/** 原始 PRG bank 29 (8192B, CPU $A000-$BFFF) */
export const PRG_BANK_29: readonly number[] = [
${hexRows(bytes)}
];

// ═══════════════════════════════════════════════════════════════
// 战术/阵型属性块 (0x0000-0x1AB1)
// ═══════════════════════════════════════════════════════════════

/** 单个战术块: 20 字节有效数据 (块间 00 00 分隔) */
export interface TacticalBlock {
  idx: number;
  /** PRG offset (0x0000-0x1AB1) */
  offset: number;
  /** CPU 地址 ($8000-$9AB1) */
  cpuAddr: number;
  data: readonly number[];
}

/** 全部战术块 (解析自 PRG_BANK_29, 按 00 00 分隔) */
export const TACTICAL_BLOCKS: readonly TacticalBlock[] = (() => {
  const list: TacticalBlock[] = [];
  const limit = 0x1AB2;
  let start = 0;
  for (let i = 0; i < limit - 1; i++) {
    if (PRG_BANK_29[i] === 0 && PRG_BANK_29[i + 1] === 0) {
      if (i - start >= 4) {
        list.push({ idx: list.length, offset: start, cpuAddr: 0xA000 + start, data: PRG_BANK_29.slice(start, i) });
      }
      let j = i; while (j < limit && PRG_BANK_29[j] === 0) j++;
      i = j - 1; start = j;
    }
  }
  if (limit - start >= 4) {
    list.push({ idx: list.length, offset: start, cpuAddr: 0xA000 + start, data: PRG_BANK_29.slice(start, limit) });
  }
  return list;
})();

/** 按索引取战术块 */
export function getTacticalBlock(idx: number): TacticalBlock | undefined {
  return TACTICAL_BLOCKS[idx];
}

// ═══════════════════════════════════════════════════════════════
// 阵容指针表 (0x1AB2-0x1AF5)
// ═══════════════════════════════════════════════════════════════

/** 34 项指针 → CPU $BAF6-$BCE0 (各球队阵容数据地址) */
export const ROSTER_POINTERS: readonly number[] = [
${hexRows(ptrs)}
];

// ═══════════════════════════════════════════════════════════════
// CPU 球队阵容区 (0x1AF8-0x1CFE)
// ═══════════════════════════════════════════════════════════════

/** 阵容球员条目: [位置码, 球员ID] */
export interface RosterPlayerSlot {
  /** 位置码 (0-11, 场上位置) */
  pos: number;
  /** 球员ID (引用 PLAYERS 目录 0x01-0x75) */
  player: number;
}

/** CPU 球队阵容 */
export interface CpuRoster {
  idx: number;
  /** PRG offset */
  offset: number;
  /** CPU 地址 ($BAF8-$BCFE) */
  cpuAddr: number;
  /** GFX 基址 4 字节 */
  gfx: readonly number[];
  /** 队标 3 字节 */
  badge: readonly number[];
  /** 球员槽位 [位置码, 球员ID]×N */
  players: readonly RosterPlayerSlot[];
  /** 原始数据 (含 $0F 终止) */
  raw: readonly number[];
}

/** CPU 球队阵容列表 (解析自 PRG_BANK_29) */
export const CPU_ROSTERS: readonly CpuRoster[] = (() => {
  const list: CpuRoster[] = [];
  const limit = 0x1D00;
  let off = 0x1AF8;
  let idx = 0;
  while (off + 8 < limit) {
    while (off < limit && PRG_BANK_29[off] === 0) off++;
    if (off >= limit || PRG_BANK_29[off] === 0xFF) break;
    const s = off;
    const gfx = PRG_BANK_29.slice(off, off + 4);
    const badge = PRG_BANK_29.slice(off + 4, off + 7);
    off += 7;
    const players: RosterPlayerSlot[] = [];
    while (off < limit && PRG_BANK_29[off] !== 0x0F) {
      players.push({ pos: PRG_BANK_29[off], player: PRG_BANK_29[off + 1] });
      off += 2;
    }
    if (off < limit) off += 1;
    list.push({ idx: idx++, offset: s, cpuAddr: 0xA000 + s, gfx, badge, players, raw: PRG_BANK_29.slice(s, off) });
  }
  return list;
})();

/** 按球队序号取阵容 */
export function getCpuRoster(idx: number): CpuRoster | undefined {
  return CPU_ROSTERS[idx];
}

/** 按指针表目标地址反查阵容 (供 Bank 01 查询) */
export function getRosterByAddr(cpuAddr: number): CpuRoster | undefined {
  return CPU_ROSTERS.find(r => r.cpuAddr === cpuAddr);
}

// ═══════════════════════════════════════════════════════════════
// 汇总导出
// ═══════════════════════════════════════════════════════════════

export default {
  PRG_BANK_29,
  TACTICAL_BLOCKS,
  ROSTER_POINTERS,
  CPU_ROSTERS,
};
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out, 'utf8');
console.log('OK →', path.relative(ROOT, OUT));
console.log('bytes:', bytes.length, '| blocks:', blocks.length, '| ptrs:', ptrs.length, '| rosters:', rosters.length);
