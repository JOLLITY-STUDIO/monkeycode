/**
 * tiles.ts — Langrisser II 地形属性解析器 (TypeScript版)
 *
 * Ported from legacy md-scenario.js parseSceneTileAttrs
 *
 * ROM 数据源:
 *   0x061D2C — TILE_ATTR_LO_TABLE (每关 8B 指针对, stride=8)
 *   0x061D30 — TILE_ATTR_HI_TABLE (每关 8B 指针对, stride=8)
 *   每关数据: 0x280 字节, 每字节含 lo_nibble(移动消耗) + hi_nibble(防御修正)
 *
 * 索引方式: tile_idx = y * width + x
 *   attr_lo[tile_idx] = 移动消耗 (0-15)
 *   attr_hi[tile_idx] = 防御修正 (0-15, 百分比加成)
 */

import { read32BE } from './rom';

// === 地址常量 ===
export const TILE_ATTR_LO_TABLE = 0x061D2C;
export const TILE_ATTR_HI_TABLE = 0x061D30;
export const TILE_ATTR_SIZE = 0x280; // 每关 640 字节 (每 tile 1 字节 = 2 nibbles)

// === 地形属性接口 ===
export interface TileAttrBlock {
  /** 移动消耗 (0-15, per-tile) */
  moveCost: number[];
  /** 防御修正 (0-15, 百分比) */
  defBonus: number[];
}

// === 地形类型常量 (低 nibble) ===
export const TILE_TYPE_NAMES: Record<number, string> = {
  0x00: '平原', 0x01: '森林', 0x02: '山',   0x03: '水',
  0x04: '墙',   0x05: '房间', 0x06: '宝箱', 0x07: '城堡',
  0x08: '桥',   0x09: '沙漠', 0x0A: '沼泽', 0x0B: '教会',
  0x0C: '栅栏', 0x0D: '废墟', 0x0E: '深水', 0x0F: '天空',
};

// === 默认移动消耗 (按 tile 类型) ===
// Source: CombatSystem.ts TERRAIN_MOVE_COST + ROM 验证
export const DEFAULT_MOVE_COST: Record<number, number> = {
  0x00: 1,   // 平原
  0x01: 2,   // 森林
  0x02: 3,   // 山
  0x03: 4,   // 水
  0x04: 99,  // 墙 (不可通行)
  0x05: 1,   // 房间
  0x06: 1,   // 宝箱
  0x07: 1,   // 城堡
  0x08: 1,   // 桥
  0x09: 2,   // 沙漠
  0x0A: 3,   // 沼泽
  0x0B: 1,   // 教会
  0x0C: 99,  // 栅栏
  0x0D: 2,   // 废墟
  0x0E: 99,  // 深水
  0x0F: 0,   // 天空
};

// === 默认防御修正 (按 tile 类型, 百分比) ===
export const DEFAULT_DEF_BONUS: Record<number, number> = {
  0x00: 0,   // 平原  0%
  0x01: 20,  // 森林  20%
  0x02: 30,  // 山    30%
  0x03: 0,   // 水    0%
  0x04: 0,   // 墙
  0x05: 30,  // 房间  30%
  0x06: 0,   // 宝箱
  0x07: 30,  // 城堡  30%
  0x08: 0,   // 桥
  0x09: 0,   // 沙漠
  0x0A: 0,   // 沼泽
  0x0B: 30,  // 教会  30%
  0x0C: 0,   // 栅栏
  0x0D: 0,   // 废墟
  0x0E: 0,   // 深水
  0x0F: 0,   // 天空
};

// === 解析单关地形属性 ===
// 每关 0x280 字节, stride=8 (参照 ROM 代码 FUN_00009ec4)
export function parseTileAttrs(rom: Uint8Array, levelIndex: number): TileAttrBlock | null {
  const loPtr = read32BE(rom, TILE_ATTR_LO_TABLE + levelIndex * 8);
  const hiPtr = read32BE(rom, TILE_ATTR_HI_TABLE + levelIndex * 8);

  if (loPtr < 0x200 || loPtr >= rom.length) return null;
  if (hiPtr < 0x200 || hiPtr >= rom.length) return null;

  const moveCost: number[] = [];
  const defBonus: number[] = [];

  for (let i = 0; i < TILE_ATTR_SIZE && loPtr + i < rom.length; i++) {
    const b = rom[loPtr + i];
    moveCost.push(b & 0x0F);
    defBonus.push((b >> 4) & 0x0F);
  }
  // hiPtr table provides additional def data (upper nibble overlay in ROM)
  for (let i = 0; i < TILE_ATTR_SIZE && hiPtr + i < rom.length; i++) {
    const b = rom[hiPtr + i];
    // high-nibble table data: combine with existing def bonus
    // ROM logic: adds upper nibble as extra defense modifier
    defBonus[i] = (defBonus[i] + ((b >> 4) & 0x0F)) & 0x0F;
  }

  return { moveCost, defBonus };
}

// === 获取单个 tile 的属性 ===
export function getTileAttr(
  attrs: TileAttrBlock,
  mapWidth: number,
  x: number,
  y: number,
): { moveCost: number; defBonus: number } {
  const idx = y * mapWidth + x;
  return {
    moveCost: attrs.moveCost[idx] ?? 1,
    defBonus: attrs.defBonus[idx] ?? 0,
  };
}
