/**
 * 生成 src/game/data/showcase-data.ts — Bank31 $E9DA 演出 NT 块表 (33 项全量)
 *
 * 输入: src/game/data/prg-bank-31.ts (CPU $E000-$FFFF 窗口)
 * 输出: src/game/data/showcase-data.ts
 *
 * $E93D 算法 (反汇编确认, _tmp_bzk_out/bank_31/bank_31_part02.asm):
 *   PHA (A=演出类型码 $D6DE[ram_043B]); TXA; PHA (X=块坐标进位)
 *   PLA → X: LSR; ROR ram_003E; LSR; ROR ram_003E; STA ram_003F
 *            → ram_003E = (X&3)<<6, ram_003F = X>>2 (坐标进位)
 *   PLA → A: ASL; ROR ram_003A; TAY      → Y = A<<1 (A bit7 → ram_003A bit7)
 *   LDA $E9DA,Y (16bit LE) → 数据块指针    ← 指针表由【类型码 A】索引!
 *   块数据: [xLo, xHi, attr, tiles...]
 *     addrLo = xLo + ram_003E; addrHi = xHi + ram_003F   (NT 名表地址)
 *     attr bit0-1 = 行数, bit2-7 = 每行 tile 数
 *     每行: 写组头 [count=perRow, addrLo, addrHi] → perRow 个 tile 字节
 *           0xFE 提前终止(剩余补 0); 0x00 是合法 tile; 行间写 0x00 分隔
 *     行间 addrLo += 0x20 (名表下一行)
 *   最后 ram_0515 = 0x80 (通知 $C951 NMI 消费)
 *   ram_003A bit7 = 类型码 bit7 → 置位时跳过数据读取(整块画空 = 闪烁)
 *
 * 消费方 $C951 (bank_30_part02.asm): 读 ram_04A5 组 → $2006(地址) / $2007(tile)
 *   → 目标是【NT 名表】渲染, 非 OAM 精灵。
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src', 'game', 'data', 'prg-bank-31.ts');
const OUT = path.join(ROOT, 'src', 'game', 'data', 'showcase-data.ts');

function loadNums(file, len) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/=\s*\[([\s\S]*)\]/);
  if (!m) throw new Error('未找到数组: ' + file);
  const nums = m[1].match(/0x[0-9A-Fa-f]+|\b\d+\b/g).map(Number);
  if (nums.length < len) throw new Error(`数组过短: ${file} ${nums.length}<${len}`);
  return nums;
}

const nums = loadNums(SRC, 0x2000);
const b = (addr) => nums[addr - 0xE000] ?? 0;
const u16 = (addr) => b(addr) | (b(addr + 1) << 8);

// ── $E9DA 指针表 (33 项: 类型 0x00-0x20, $E9DA-$EA1B) ──
const PTR_BASE = 0xE9DA;
const ENTRY_COUNT = 33;
const ptrs = [];
for (let i = 0; i < ENTRY_COUNT; i++) ptrs.push(u16(PTR_BASE + i * 2));
console.log('$E9DA 指针表 (' + ENTRY_COUNT + ' 项):');
console.log(ptrs.map(p => '$' + p.toString(16).toUpperCase()).join(' '));

// ── 数据块解码 ($E93D 语义: 0x00 合法 tile, 0xFE 终止, 行间补 0) ──
function decodeBlock(i) {
  const p = ptrs[i];
  // 块边界 = 下一指针 (最后一块给 +0x80 余量)
  const end = i + 1 < ptrs.length ? ptrs[i + 1] : p + 0x80;
  const xLo = b(p);
  const xHi = b(p + 1);
  const attr = b(p + 2);
  const rows = attr & 0x03;
  const perRow = attr >> 2;
  let off = p + 3;
  const tiles = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    while (row.length < perRow) {
      if (off >= end) break;          // 超出块边界 → 补 0
      const t = b(off++);
      if (t === 0xfe) break;          // 行终止 → 剩余补 0
      row.push(t);                    // 0x00 是合法 tile, 保留
    }
    while (row.length < perRow) row.push(0);
    tiles.push(row);
  }
  return { addr: p, xLo, xHi, rows, perRow, tiles };
}

const blocks = ptrs.map((_, i) => decodeBlock(i));
for (let i = 0; i < blocks.length; i++) {
  const blk = blocks[i];
  console.log(`  idx${String(i).padStart(2)} $${blk.addr.toString(16).toUpperCase()}: NT$${blk.xHi.toString(16).toUpperCase()}${blk.xLo.toString(16).toUpperCase()} ${blk.rows}R×${blk.perRow}C ${JSON.stringify(blk.tiles)}`);
}

// ── ASCII 预览: 块 0 (大空翼) 网格 ──
const CHR7 = path.join(ROOT, 'src', 'game', 'data', 'ppu', 'tile', 'chr', 'chr-bank-07.ts');
function loadChr7() {
  const text = fs.readFileSync(CHR7, 'utf8');
  const m = text.match(/=\s*\[([\s\S]*)\]/);
  if (!m) return null;
  return m[1].match(/0x[0-9A-Fa-f]+|\b\d+\b/g).map(Number);
}
const chr7 = loadChr7();
function tileAscii(bank, tileId) {
  const off = tileId * 16;
  if (!bank || off + 16 > bank.length) return null;
  const lines = [];
  for (let row = 0; row < 8; row++) {
    const b0 = bank[off + row], b1 = bank[off + row + 8];
    let s = '';
    for (let c = 0; c < 8; c++) {
      const mask = 0x80 >> c;
      const ci = ((b1 & mask) ? 2 : 0) | ((b0 & mask) ? 1 : 0);
      s += ci === 0 ? '.' : (ci === 1 ? ':' : (ci === 2 ? 'o' : '#'));
    }
    lines.push(s);
  }
  return lines;
}
function gridAscii(blk) {
  const rows = [];
  for (let r = 0; r < blk.rows; r++) {
    const lineRows = ['', '', '', '', '', '', '', ''];
    for (let c = 0; c < blk.perRow; c++) {
      const a = tileAscii(chr7, blk.tiles[r][c]);
      if (!a) continue;
      for (let k = 0; k < 8; k++) lineRows[k] += ' ' + a[k];
    }
    rows.push(lineRows.join('\n'));
  }
  return rows.join('\n');
}
console.log('\n── block0 (idx0 $EA1C) bank7 ASCII 预览 ──');
console.log(gridAscii(blocks[0]));

// ── 生成 showcase-data.ts ──
function tsHex(n) { return '0x' + n.toString(16).toUpperCase().padStart(2, '0'); }

const lines = [];
lines.push('/**');
lines.push(' * Bank31 $E9DA 演出 NT 块表 — 自动生成 (scripts/gen-showcase-data.cjs)');
lines.push(' *');
lines.push(' * $E93D 解包语义 (反汇编确认):');
lines.push(' *   A = $D6DE[ram_043B] 演出类型码 → Y=A<<1 查 $E9DA 指针表 (块索引 = 类型码)');
lines.push(' *   X = 坐标进位: ram_003E=(X&3)<<6, ram_003F=X>>2 ($D67C 调用 X=0)');
lines.push(' *   block = [xLo, xHi, attr, tiles...]; attr bit0-1=行数, bit2-7=每行 tile 数');
lines.push(' *   NT 名表地址 = xHi<<8 | xLo (行间 +0x20); 0x00 合法 tile, 0xFE 行终止补 0');
lines.push(' *   类型码 bit7 置位 → 整块画空 (13 帧闪烁, $D65F 链 ORA #$80)');
lines.push(' * 消费方 $C951 把组写到 PPU $2006/$2007 → NT 名表渲染 (非 OAM 精灵)');
lines.push(' */');
lines.push('');
lines.push('/** 演出 NT 块 */');
lines.push('export interface ShowcaseSpriteBlock {');
lines.push('  /** PRG 地址 ($E9DA 表指向) */');
lines.push('  addr: number;');
lines.push('  /** NT 名表地址低字节 (xLo) */');
lines.push('  xLo: number;');
lines.push('  /** NT 名表地址高字节 (xHi) */');
lines.push('  xHi: number;');
lines.push('  /** 行数 (垂直 tile 数) */');
lines.push('  rows: number;');
lines.push('  /** 每行 tile 数 (水平) */');
lines.push('  perRow: number;');
lines.push('  /** 每行 tile 索引 (0x00 是合法 tile, 画空白) */');
lines.push('  tiles: number[][];');
lines.push('}');
lines.push('');
lines.push('/** $E9DA 指针表 (' + ENTRY_COUNT + ' 项, CPU $E000 窗口, 索引 = 类型码 0x00-0x20) */');
lines.push('export const SHOWCASE_SPRITE_PTRS: readonly number[] = [');
for (const p of ptrs) lines.push('  ' + p + ',');
lines.push('];');
lines.push('');
lines.push('/** 演出 NT 块表 (' + ENTRY_COUNT + ' 项) */');
lines.push('export const SHOWCASE_SPRITE_BLOCKS: readonly ShowcaseSpriteBlock[] = [');
for (const blk of blocks) {
  lines.push('  {');
  lines.push(`    addr: 0x${blk.addr.toString(16).toUpperCase()},`);
  lines.push(`    xLo: 0x${blk.xLo.toString(16).toUpperCase()},`);
  lines.push(`    xHi: 0x${blk.xHi.toString(16).toUpperCase()},`);
  lines.push(`    rows: ${blk.rows},`);
  lines.push(`    perRow: ${blk.perRow},`);
  lines.push('    tiles: [');
  for (const row of blk.tiles) {
    lines.push('      [' + row.map(tsHex).join(', ') + '],');
  }
  lines.push('    ],');
  lines.push('  },');
}
lines.push('];');
lines.push('');
lines.push('/**');
lines.push(' * $D6DE 演出类型表 (Bank30): ram_043B → 类型码');
lines.push(' * 索引: 0-6 → 普通演出, 7-9 → 特写类 (0x1E/0x1F/0x20)');
lines.push(' */');
lines.push('export const SHOWCASE_D6DE: readonly number[] = [');
lines.push('  0x02, 0x01, 0x00, 0x03, 0x04, 0x05, 0x06, 0x1e, 0x1f, 0x20,');
lines.push('];');
lines.push('');
lines.push('/**');
lines.push(' * 类型码 → NT 块索引 (对应 $E93D: Y=类型码<<1 查 $E9DA)。');
lines.push(' * 位 7 为闪烁标志 (ORA #$80, $D672), 剥掉后索引 0x00-0x20。');
lines.push(' */');
lines.push('export function showcaseBlockIndexByType(type: number): number {');
lines.push('  return (type & 0x7f) & 0xff;');
lines.push('}');
lines.push('');
lines.push('/** 类型码 bit7 = 闪烁 (整块画空, 对应 $E93D 中 ram_003A bit7 → 跳过数据读取) */');
lines.push('export function showcaseTypeIsFlash(type: number): boolean {');
lines.push('  return (type & 0x80) !== 0;');
lines.push('}');
lines.push('');
lines.push('/**');
lines.push(' * NT 名表地址 → (tileX, tileY) (NT0: 低 5 位=列, 高 5 位=行)。');
lines.push(' * $C951 消费方写 PPU $2006 地址即此语义。');
lines.push(' */');
lines.push('export function ntAddrToTile(addr: number): { tileX: number; tileY: number } {');
lines.push('  return { tileX: addr & 0x1f, tileY: (addr >> 5) & 0x1f };');
lines.push('}');
lines.push('');
lines.push('/**');
lines.push(' * ram_043B → 演出 NT 块 (走 $D6DE 类型码 → $E9DA 表)。');
lines.push(' * 块索引 = 类型码 (非 ram_043B, 非 类型>>2) — 反汇编 $E93D 确认。');
lines.push(' */');
lines.push('export function getShowcaseBlock(ram043B: number): ShowcaseSpriteBlock {');
lines.push('  const type = SHOWCASE_D6DE[ram043B & 0x3f] ?? 0;');
lines.push('  const idx = showcaseBlockIndexByType(type);');
lines.push('  return SHOWCASE_SPRITE_BLOCKS[idx] ?? SHOWCASE_SPRITE_BLOCKS[0];');
lines.push('}');
lines.push('');

fs.writeFileSync(OUT, lines.join('\n'), 'utf8');
console.log('\n写入', OUT, `(${blocks.length} 块)`);
