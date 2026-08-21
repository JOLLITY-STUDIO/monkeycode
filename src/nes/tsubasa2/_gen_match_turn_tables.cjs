// 临时脚本: 从 ROM 提取 bank11 数据表 + PRG bank 18/19 pattern 表
// 生成 src/game/prg/data/tables/match-turn-table.ts + match-pattern-table.ts
const fs = require('fs');
const path = require('path');

const ROM = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const buf = fs.readFileSync(ROM);
console.log('ROM size:', buf.length);

// PRG bank N 位于 ROM 偏移 0x10 + N*0x2000
const bankOff = (n) => 0x10 + n * 0x2000;

const b11 = buf.slice(bankOff(11), bankOff(11) + 0x2000);
const b18 = buf.slice(bankOff(18), bankOff(18) + 0x2000);
const b19 = buf.slice(bankOff(19), bankOff(19) + 0x2000);

// bank11 CPU 地址 → 数组偏移 (与旧 readB11 语义一致: ≥0xA000 减 0xA000)
const off = (cpuAddr) => (cpuAddr >= 0xa000 ? cpuAddr - 0xa000 : cpuAddr - 0x8000);

function u8(cpuAddr) { return b11[off(cpuAddr)] ?? 0; }
function u16(cpuAddr) { return u8(cpuAddr) | (u8(cpuAddr + 1) << 8); }

function fmtTable(name, comment, bytes) {
  const lines = [];
  lines.push(`/** ${comment} */`);
  lines.push(`export const ${name}: readonly number[] = [`);
  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.slice(i, i + 16);
    lines.push('  ' + chunk.map((v) => '0x' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ',');
  }
  lines.push('];');
  return lines.join('\n');
}

const out = [];
out.push(`/**
 * match-turn-table.ts — bank11 比赛回合数据表 (声明式数组)
 * @bank 11 ($8000-$9FFF)  来源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes (PRG bank 11)
 *
 * 说明: 数据由 node 脚本从原始 .nes 提取 (ROM 偏移 = 0x10 + 11*0x2000 = 0x16010)。
 * 服务层 (MatchTurnService) 只能通过本模块具名查询函数访问, 禁止裸地址随机访问。
 *
 * 表结构:
 *   TABLE_A_81AA      脚本道具 handler 跳转表 (9 × u16 LE)
 *   TABLE_B_81C6      脚本控制码 handler 跳转表 (3 × u16 LE)
 *   DISP_81D5         位移表 (120B, $81D5)
 *   DISP_827F         位移表 (120B, $827F)
 *   T_UNIT_TILE_86EE  tile→单位 tile 表 (512B, $86EE, tile*2 索引)
 *   SCRIPT_PTR_87F6   脚本指针表 (u16 LE, $87F6)
 *   PALETTE_ATTR_8B42 调色板组 attr 表 (34B, $8B42)
 *   BLOCK_8B64        block 表基址 ($8B64, tile>>3 索引块, 每块 $100B, 环绕覆盖全 bank)
 *   PATTERN_ATTR_9BE4 图案属性表基址 ($9BE4 + ca*$100)
 */
`);

// ── 小表直接提取 ──
const tableA = [];
for (let i = 0; i < 9; i++) tableA.push(u16(0x81aa + i * 2));
out.push(`/** 表A $81AA — 脚本道具 handler (9 × u16 LE): 8327/83E7/83FF/8358/8377/8364/83D2/83E7/83EE */`);
out.push(`export const TABLE_A_81AA: readonly number[] = [${tableA.map((v) => '0x' + v.toString(16).toUpperCase().padStart(4, '0')).join(', ')}];`);

const tableB = [];
for (let i = 0; i < 3; i++) tableB.push(u16(0x81c6 + i * 2));
out.push(`/** 表B $81C6 — 脚本控制码 handler (3 × u16 LE): 81CC/8276/824D */`);
out.push(`export const TABLE_B_81C6: readonly number[] = [${tableB.map((v) => '0x' + v.toString(16).toUpperCase().padStart(4, '0')).join(', ')}];`);

out.push(fmtTable('DISP_81D5', '位移表 $81D5 (120B)', [...b11.slice(off(0x81d5), off(0x81d5) + 120)]));
out.push(fmtTable('DISP_827F', '位移表 $827F (120B)', [...b11.slice(off(0x827f), off(0x827f) + 120)]));
out.push(fmtTable('T_UNIT_TILE_86EE', 'tile→单位 tile 表 $86EE (512B, tile*2 索引 u16)', [...b11.slice(off(0x86ee), off(0x86ee) + 512)]));
out.push(fmtTable('PALETTE_ATTR_8B42', '调色板组 attr 表 $8B42 (34B)', [...b11.slice(off(0x8b42), off(0x8b42) + 34)]));

// ── 脚本指针表 ($87F6 起, 至 $8B42 attr 表前) ──
const scriptPtrStart = off(0x87f6);
const scriptPtrEnd = off(0x8b42);
const scriptPtrBytes = b11.slice(scriptPtrStart, scriptPtrEnd);
out.push(fmtTable('SCRIPT_PTR_87F6', `脚本指针表 $87F6 (${scriptPtrBytes.length}B = ${scriptPtrBytes.length / 2} × u16 LE, 至 $8B42 前)`, [...scriptPtrBytes]));

// ── 全 bank 原始字节 (block 表环绕访问所需) ──
out.push(fmtTable('MATCH_TURN_DATA', 'bank11 全字节 (8192B) — block 表环绕覆盖 + 脚本流数据源', [...b11]));

// ── 具名访问函数 ──
out.push(`
// ═══════════════════════════════════════════════════════════
// 具名查询函数 (ORM 风格, 服务层唯一入口)
// ═══════════════════════════════════════════════════════════

/** 读 bank11 原始字节 (CPU 地址 $8000-$9FFF; ≥$A000 按旧语义减 0xA000) */
export function matchTurnByte(cpuAddr: number): number {
  let o = cpuAddr - 0x8000;
  if (cpuAddr >= 0xa000) o = cpuAddr - 0xa000;
  return o >= 0 && o < MATCH_TURN_DATA.length ? MATCH_TURN_DATA[o] : 0;
}

/** 读 16bit 小端 (CPU 地址) */
export function matchTurnU16(cpuAddr: number): number {
  return matchTurnByte(cpuAddr) | (matchTurnByte(cpuAddr + 1) << 8);
}

/** 表A 脚本道具 handler 入口 ($81AA, idx 0-8) */
export function tableAAt(idx: number): number {
  return TABLE_A_81AA[(idx & 0x0f) % TABLE_A_81AA.length];
}

/** 表B 脚本控制码 handler 入口 ($81C6, idx 0-2) */
export function tableBAt(idx: number): number {
  return TABLE_B_81C6[(idx & 0x0f) % TABLE_B_81C6.length];
}

/** 位移表 $81D5 (entry_81CC/81CF) */
export function disp81D5At(idx: number): number {
  return DISP_81D5[(idx & 0xff) % DISP_81D5.length];
}

/** 位移表 $827F (entry_8276/827C) */
export function disp827FAt(idx: number): number {
  return DISP_827F[(idx & 0xff) % DISP_827F.length];
}

/** T_UNIT_TILE $86EE — tile*2 索引 u16 (fn_8525) */
export function tUnitTileAt(tile: number): number {
  const i = ((tile & 0xff) << 1) & 0x1ff;
  return T_UNIT_TILE_86EE[i] | (T_UNIT_TILE_86EE[i + 1] << 8);
}

/** 脚本指针表 $87F6 — ram_0524 索引 u16 (entry_814C) */
export function scriptPtrAt(idx: number): number {
  return scriptPtrU16(idx);
}
function scriptPtrU16(idx: number): number {
  const i = (idx & 0xff) * 2;
  if (i + 1 >= SCRIPT_PTR_87F6.length) return 0;
  return SCRIPT_PTR_87F6[i] | (SCRIPT_PTR_87F6[i + 1] << 8);
}

/** 调色板组 attr $8B42 — Y = A>>2 索引 (fn_86D3) */
export function paletteAttrAt(y: number): number {
  return PALETTE_ATTR_8B42[(y & 0x3f) % PALETTE_ATTR_8B42.length];
}

/** block 表 $8B64 — tile>>3 索引块, tile&7 块内行偏移, 后接位置偏移 off (环绕全 bank) */
export function blockByteAt(tile: number, off: number): number {
  const t = tile & 0xff;
  const base = 0x8b64 + ((t >> 3) << 8) + (t & 7) + (off & 0x3f);
  return matchTurnByte(base & 0xffff);
}

/** 图案属性表 $9BE4 + ca*$100 — tile 索引 (fn_85C2) */
export function patternAttrAt(ca: number, tile: number): number {
  return matchTurnByte(0x9be4 + ((ca & 3) << 8) + (tile & 0xff));
}
`);

fs.writeFileSync(path.join(__dirname, 'src', 'game', 'prg', 'data', 'tables', 'match-turn-table.ts'), out.join('\n'));
console.log('match-turn-table.ts written:', out.join('\n').length, 'bytes');

// ── pattern bank 18/19 ──
function fmtPatternBank(name, comment, bytes) {
  return fmtTable(name, comment, [...bytes]);
}
const p18 = fmtPatternBank('MATCH_PATTERN_BANK_18', 'PRG bank 18 (MMC3 R7=0x12, fn_85C2 pattern 数据源)', [...b18]);
const p19 = fmtPatternBank('MATCH_PATTERN_BANK_19', 'PRG bank 19 (MMC3 R7=0x13, fn_85C2 pattern 数据源)', [...b19]);
const patOut = `/**
 * match-pattern-table.ts — 比赛精灵 pattern 数据 (PRG 物理 bank 18/19)
 * 来源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes
 *   PRG bank 18 = ROM 偏移 0x24010, bank 19 = 0x26010 (各 0x2000B)
 *
 * fn_85C2 (bank11) 原通过 MMC3 R7 切换 $A000 窗口为物理 bank 12/13 (即
 * PRG bank 18/19) 读取图案字节; H5 直读本表, 不再模拟 bank 切换。
 */

${p18}

${p19}
`;
fs.writeFileSync(path.join(__dirname, 'src', 'game', 'prg', 'data', 'tables', 'match-pattern-table.ts'), patOut);
console.log('match-pattern-table.ts written:', patOut.length, 'bytes');
console.log('DONE');
