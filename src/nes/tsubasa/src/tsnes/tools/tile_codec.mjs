/**
 * NES CHR Tile 编解码器
 *
 * 每个 tile = 16 字节, 8×8 像素:
 *   字节 0~7   = bitplane 0 (低位)
 *   字节 8~15  = bitplane 1 (高位)
 *   像素值 = (bp1_bit << 1) | bp0_bit  → 0~3
 */

const TILE_SIZE = 16;
const TILE_W = 8;
const TILE_H = 8;

const PIXEL_CHARS = ['  ', '░░', '▒▒', '██'];

/**
 * 从 raw bytes 解码一个 tile
 */
export function decodeTile(bytes, tileIdx) {
  const offset = tileIdx * TILE_SIZE;
  const bp0 = bytes.slice(offset, offset + 8);
  const bp1 = bytes.slice(offset + 8, offset + 16);
  const pixels = [];
  const ascii  = [];

  for (let y = 0; y < TILE_H; y++) {
    const row = [];
    let line = '';
    for (let x = 0; x < TILE_W; x++) {
      const shift = 7 - x;
      const p0 = (bp0[y] >> shift) & 1;
      const p1 = (bp1[y] >> shift) & 1;
      const color = (p1 << 1) | p0;
      row.push(color);
      line += PIXEL_CHARS[color];
    }
    pixels.push(row);
    ascii.push(line);
  }

  return { index: tileIdx, bp0, bp1, pixels, ascii };
}

/**
 * 解码所有 tile
 */
export function decodeAllTiles(bytes) {
  const total = bytes.length / TILE_SIZE;
  const tiles = [];
  for (let i = 0; i < total; i++) {
    tiles.push(decodeTile(bytes, i));
  }
  return tiles;
}

/**
 * 从 .ts 文件加载 bank 数据（兼容两种格式）：
 *   1. 旧格式: const _CHR_BANK_N: readonly number[] = [...];   （通过 lastIndexOf 找最后的 [）
 *   2. 新格式: export const TILE_XXX: TileDef = { bp0: [...], bp1: [...] }; （通过正则找 bp0/bp1）
 */
import { readFileSync } from 'fs';

export function loadBank(filePath) {
  const raw = readFileSync(filePath, 'utf-8');

  // ── 方式 1: 找最后一个平铺字节数组 ──
  const start = raw.lastIndexOf('[');
  const end = raw.lastIndexOf(']');
  if (start >= 0 && end > start) {
    const bytes = raw.slice(start + 1, end)
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => parseInt(s, 16));

    if (bytes.length >= TILE_SIZE && bytes.length % TILE_SIZE === 0) {
      return { bytes, tiles: decodeAllTiles(bytes) };
    }
  }

  // ── 方式 2: 从 TILE_XXX: TileDef 定义中提取 bp0/bp1 ──
  const bp0Regex = /bp0:\s*\[([^\]]+)\]/g;
  const bp1Regex = /bp1:\s*\[([^\]]+)\]/g;

  const bp0List = [];
  const bp1List = [];
  let m;
  while ((m = bp0Regex.exec(raw)) !== null) {
    bp0List.push(m[1].split(',').map(s => parseInt(s.trim(), 16)));
  }
  while ((m = bp1Regex.exec(raw)) !== null) {
    bp1List.push(m[1].split(',').map(s => parseInt(s.trim(), 16)));
  }

  // 按 tile 交错: 每 tile 先 bp0 (8B) 再 bp1 (8B)
  if (bp0List.length > 0 && bp1List.length > 0) {
    const bytes = [];
    const total = Math.min(bp0List.length, bp1List.length);
    for (let i = 0; i < total; i++) {
      bytes.push(...bp0List[i], ...bp1List[i]);
    }
    if (bytes.length >= TILE_SIZE) {
      return { bytes, tiles: decodeAllTiles(bytes) };
    }
  }

  throw new Error(`无法解析 bank 文件: ${filePath}（既无平铺字节数组，也无可解析的 tile 定义）`);
}

/**
 * @typedef {Object} TileVisual
 * @property {number}   index  tile 序号
 * @property {number[]} bp0    8 字节 bitplane 0
 * @property {number[]} bp1    8 字节 bitplane 1
 * @property {number[][]} pixels  8×8 像素值 (0~3)
 * @property {string[]}   ascii   8 行 ASCII 可视化
 */
