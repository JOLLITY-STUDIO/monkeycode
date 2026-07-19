/**
 * map.ts — Langrisser II 关卡地图数据解析器 (TypeScript版)
 *
 * 严格基于已验证的 md-map.js 逻辑转写
 * 基于 FUN_00009ec4 + PTR_LAB_00061cb0 系列表
 *
 * 重要: tile重映射逻辑严格按 md-map.js 实现
 *   - 原始tile分成低4位和高4位
 *   - 低4位用 remap1 表 (128字节)
 *   - 高4位用 remap2 表 (128字节)
 *   - 重映射后合并: (rhi << 4) | rlo
 */

import { read8, read16BE, read32BE } from './rom';

// === 地址常量 (与 md-map.js 一致) ===
export const LEVEL_MAP_TABLE = 0x61CB0;
export const LEVEL_AUX1_TABLE = 0x61D2C;
export const LEVEL_AUX2_TABLE = 0x61D30;
export const TILE_REMAP1_TABLE = 0x61E24;
export const TILE_REMAP2_TABLE = 0x61E28;

// === Tile 类型表 (与 md-map.js TILE_TYPES 一致) ===
export const TILE_TYPES: Record<number, string> = {
  0x00: '平原', 0x01: '森林', 0x02: '山', 0x03: '水',
  0x04: '墙',   0x05: '房间', 0x06: '宝箱', 0x07: '城堡',
  0x08: '桥',   0x09: '沙漠', 0x0A: '沼泽', 0x0B: '教会',
  0x0C: '栅栏', 0x0D: '废墟', 0x0E: '深水', 0x0F: '天空',
};

// === 关卡信息接口 ===
export interface LevelInfo {
  index: number;
  name: string;
  mapPtr: number;
  width: number;
  height: number;
  tileCount: number;
  hasUnits: boolean;
}

// === 关卡地图数据接口 (与 md-map.js parseLevelMap 返回值一致) ===
export interface LevelMapData {
  width: number;
  height: number;
  tiles: number[];              // 原始tile数据
  remapped: { original: number; remapped: number }[];
  remap1: number[];             // 低4位重映射表 (128字节)
  remap2: number[];             // 高4位重映射表 (128字节)
  romAddr: number;
}

// === 解析关卡列表 (严格按 md-map.js parseLevelList) ===
export function parseLevelList(rom: Uint8Array): LevelInfo[] {
  const levels: LevelInfo[] = [];

  for (let i = 0; i < 32; i++) {
    const ptr = read32BE(rom, LEVEL_MAP_TABLE + i * 4);
    if (ptr < 0x200 || ptr > rom.length) continue;

    const w = read16BE(rom, ptr);
    const h = read16BE(rom, ptr + 2);
    if (w === 0 || h === 0 || w > 128 || h > 128) continue;

    const unitCfgPtr = read32BE(rom, 0x18005E);
    const hasUnits = unitCfgPtr >= 0x200 && unitCfgPtr < rom.length;

    levels.push({
      index: i,
      name: `关卡${i + 1}`,
      mapPtr: ptr,
      width: w,
      height: h,
      tileCount: w * h,
      hasUnits,
    });
  }
  return levels;
}

// === 解析单关地图 tile 数据 (含重映射) ===
// BUGFIX: remap table stride corrected from *4 → *8
// ROM 0x061E24/0x061E28 are interleaved tables (each level = 8B pair)
// ROM trace: remap_lo = *(0x061E24 + (scenario-1)*8), remap_hi = *(0x061E28 + (scenario-1)*8)
// Cross-verified with legacy md-scenario.js which also uses *8
export function parseLevelMap(rom: Uint8Array, levelIndex: number): LevelMapData | null {
  const ptr = read32BE(rom, LEVEL_MAP_TABLE + levelIndex * 4);
  if (ptr < 0x200) return null;

  const width = read16BE(rom, ptr);
  const height = read16BE(rom, ptr + 2);
  if (width > 128 || height > 128 || width * height === 0) return null;

  const tileStart = ptr + 4;
  const tiles: number[] = [];
  for (let i = 0; i < width * height && tileStart + i < rom.length; i++) {
    tiles.push(rom[tileStart + i]);
  }

  // 读取重映射表 — stride = 8 (每关一对 4B lo + 4B hi 指针)
  const remap1Ptr = read32BE(rom, TILE_REMAP1_TABLE + levelIndex * 8);
  const remap2Ptr = read32BE(rom, TILE_REMAP2_TABLE + levelIndex * 8);

  const remap1: number[] = [];
  const remap2: number[] = [];
  for (let i = 0; i < 128 && remap1Ptr + i < rom.length; i++) {
    remap1.push(rom[remap1Ptr + i]);
    remap2.push(rom[remap2Ptr + i]);
  }

  // 重映射: 与 md-map.js 完全一致
  // - 低4位用 remap1 查表
  // - 高4位用 remap2 查表
  // - 合并: (rhi << 4) | rlo
  const remapped = tiles.map(t => {
    const lo = t & 0x0F;
    const hi = (t >> 4) & 0x0F;
    const rlo = remap1[lo] || lo;
    const rhi = remap2[hi] || hi;
    return { original: t, remapped: (rhi << 4) | rlo };
  });

  return { width, height, tiles, remapped, remap1, remap2, romAddr: ptr };
}

// === 渲染地图为 ASCII 预览 (与 md-map.js renderMapASCII 一致) ===
export function renderMapASCII(levelData: LevelMapData): string {
  const { width, height, remapped } = levelData;
  const tileChars = [
    '·', '#', '^', '~', '█', '□', '$', '▓',
    '=', '░', '≈', '♣', '+', '×', '≈', '☁',
  ];

  let result = `地图 (${width}×${height})\n`;
  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      const t = remapped[y * width + x];
      const c = t ? tileChars[t.remapped & 0xF] || '?' : ' ';
      line += c;
    }
    result += line + '\n';
  }
  return result;
}

// === 获取tile类型名称 ===
export function getTileTypeName(remappedValue: number): string {
  return TILE_TYPES[remappedValue & 0x0F] || `未知(0x${(remappedValue & 0x0F).toString(16)})`;
}
