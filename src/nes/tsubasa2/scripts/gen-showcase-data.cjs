/**
 * 生成 src/game/data/showcase-data.ts — Bank31 $E9DA 演出精灵表 (32 项全量)
 *
 * 输入: src/game/data/prg-bank-31.ts (CPU $E000-$FFFF 窗口)
 * 输出: src/game/data/showcase-data.ts
 *
 * $E93D 算法 (反汇编确认):
 *   A = $D6DE[ram_043B] 演出类型; X = 屏幕 x 偏移
 *   ram_003E = X 低 2 位进位, ram_003F = X>>2 (当前 H5 调用 X=0)
 *   Y = A<<1 → $E9DA,Y 16bit LE 指针 → 数据块
 *   数据块: [xLo, xHi, attr, tiles...]
 *     attr bit0-1 = 行数, bit2-7 = 每行精灵数
 *     每行: 读 perRow 个 tile 字节; $FE 提前终止(剩余补 0x00); 0x00 是合法 tile
 *     行后附加 0x00 分隔字节
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src', 'game', 'data', 'prg-bank-31.ts');
const OUT = path.join(ROOT, 'src', 'game', 'data', 'showcase-data.ts');
const CHR7 = path.join(ROOT, 'src', 'game', 'data', 'ppu', 'tile', 'chr', 'chr-bank-07.ts');

function loadNums(file, len) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/=\s*\[([\s\S]*)\]/);
  if (!m) throw new Error('未找到数组: ' + file);
  const nums = m[1].match(/0x[0-9A-Fa-f]+|\b\d+\b/g).map(Number);
  if (nums.length < len) throw new Error(`数组过短: ${file} ${nums.length}<${len}`);
  return nums;
}

const nums = loadNums(SRC, 0x2000);
const chr7 = loadNums(CHR7, 0x2000);
const b = (addr) => nums[addr - 0xE000] ?? 0;
const u16 = (addr) => b(addr) | (b(addr + 1) << 8);

// ── $E9DA 指针表 (32 项) ──
const PTR_BASE = 0xE9DA;
const ptrs = [];
for (let i = 0; i < 32; i++) ptrs.push(u16(PTR_BASE + i * 2));
console.log('$E9DA 指针表 (32 项):');
console.log(ptrs.map(p => '$' + p.toString(16).toUpperCase()).join(' '));

// ── 数据块解码 (修正: 0x00 合法, 仅 $FE 终止) ──
function decodeBlock(p) {
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
      const t = b(off++);
      if (t === 0xfe) break;      // 行终止
      row.push(t);                // 0x00 是合法 tile, 保留
    }
    while (row.length < perRow) row.push(0); // 不足补 0
    tiles.push(row);
  }
  return { addr: p, xLo, xHi, rows, perRow, tiles };
}

const blocks = ptrs.map(decodeBlock);
for (let i = 0; i < blocks.length; i++) {
  const blk = blocks[i];
  console.log(`  idx${String(i).padStart(2)} $${blk.addr.toString(16).toUpperCase()}: x=${blk.xLo},${blk.xHi} ${blk.rows}R×${blk.perRow}C ${JSON.stringify(blk.tiles)}`);
}

// ── $D6DE 类型→块索引映射 (Bank30) ──
// $D6DE (10B): [02 01 00 03 04 05 06 1E 1F 20] → 类型 >> 2 = 块索引
const D6DE = [0x02, 0x01, 0x00, 0x03, 0x04, 0x05, 0x06, 0x1e, 0x1f, 0x20];
const typeToBlock = (t) => (t >> 2) & 0x1f;

// ── ASCII 预览: bank 7 块 0 网格 (人脸特写确认) ──
function tileAscii(bank, tileId) {
  const off = tileId * 16;
  if (off + 16 > bank.length) return null;
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
      const t = blk.tiles[r][c];
      const a = tileAscii(chr7, t);
      if (!a) continue;
      for (let k = 0; k < 8; k++) lineRows[k] += ' ' + a[k];
    }
    rows.push(lineRows.join('\n'));
  }
  return rows.join('\n');
}

console.log('\n── block0 (idx0 $EA1C) bank7 ASCII 预览 ──');
console.log(gridAscii(blocks[0]));
console.log('\n── block1 (idx1 $EA29) bank7 ASCII 预览 ──');
console.log(gridAscii(blocks[1]));

// ── 生成 showcase-data.ts ──
function tsHex(n) { return '0x' + n.toString(16).toUpperCase().padStart(2, '0'); }

const lines = [];
lines.push('/**');
lines.push(' * Bank31 $E9DA 演出精灵表 — 自动生成 (scripts/gen-showcase-data.cjs)');
lines.push(' *');
lines.push(' * $E93D 解包语义 (见脚本头注释):');
lines.push(' *   block = [xLo, xHi, attr, tiles...]');
lines.push(' *   attr bit0-1 = 行数, bit2-7 = 每行精灵数');
lines.push(' *   tiles[r] 长度 = perRow (0x00 是合法 tile, 0xFE 提前终止补 0)');
lines.push(' *   xLo/xHi = 演出画面位置 (H5: 屏幕像素 (x, y))');
lines.push(' */');
lines.push('');
lines.push('/** 演出精灵块 */');
lines.push('export interface ShowcaseSpriteBlock {');
lines.push('  /** PRG 地址 ($E9DA 表指向) */');
lines.push('  addr: number;');
lines.push('  /** 画面位置 x (像素) */');
lines.push('  x: number;');
lines.push('  /** 画面位置 y (像素) */');
lines.push('  y: number;');
lines.push('  /** 行数 (垂直 tile 数) */');
lines.push('  rows: number;');
lines.push('  /** 每行精灵数 (水平 tile 数) */');
lines.push('  perRow: number;');
lines.push('  /** 每行 tile 索引 (0x00 = 透明) */');
lines.push('  tiles: number[][];');
lines.push('}');
lines.push('');
lines.push('/** $E9DA 指针表 (32 项, CPU $E000 窗口) */');
lines.push('export const SHOWCASE_SPRITE_PTRS: readonly number[] = [');
for (const p of ptrs) lines.push('  ' + p + ',');
lines.push('];');
lines.push('');
lines.push('/** 演出精灵块表 (32 项) */');
lines.push('export const SHOWCASE_SPRITE_BLOCKS: readonly ShowcaseSpriteBlock[] = [');
for (const blk of blocks) {
  lines.push('  {');
  lines.push(`    addr: 0x${blk.addr.toString(16).toUpperCase()},`);
  lines.push(`    x: ${blk.xLo},`);
  lines.push(`    y: ${blk.xHi},`);
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
lines.push(' * 类型码 → 精灵块索引 (对应 $E93D 的 A>>2 查表)');
lines.push(' * 类型 0x00-0x03 → idx0; 0x04-0x06 → idx1; 0x1E/0x1F → idx7; 0x20 → idx8');
lines.push(' */');
lines.push('export function showcaseBlockIndexByType(type: number): number {');
lines.push('  return (type >> 2) & 0x1f;');
lines.push('}');
lines.push('');
lines.push('/**');
lines.push(' * ram_043B → 演出精灵块 (走 $D6DE 类型映射)');
lines.push(' */');
lines.push('export function getShowcaseBlock(ram043B: number): ShowcaseSpriteBlock {');
lines.push('  const type = SHOWCASE_D6DE[ram043B & 0x3f] ?? 0;');
lines.push('  return SHOWCASE_SPRITE_BLOCKS[showcaseBlockIndexByType(type)];');
lines.push('}');
lines.push('');

fs.writeFileSync(OUT, lines.join('\n'), 'utf8');
console.log('\n写入', OUT, `(${blocks.length} 块)`);
