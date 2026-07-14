/**
 * boss.ts — Langrisser II 关卡 Boss/敌方首领配置解析器
 *
 * Ported from legacy md-scenario.js parseSceneBossConfig
 *
 * ROM 数据源: 0x060600, 每关 8 字节 (4 对 class_id + level), 最多 12 关
 *   格式: [class_id(1B)][level(1B)] × 4, 0xFF 表示空位/终止
 */

import { read8 } from './rom';

// === 地址常量 ===
export const SCENARIO_BOSS_TABLE = 0x060600;
export const SCENARIO_BOSS_END = 0x060668;   // 0x060600 + 8*13
export const BOSS_ENTRY_SIZE = 8;             // 4 pairs × 2 bytes
export const MAX_BOSS_LEVELS = 12;            // 有 boss 配置的关卡数

// === Boss 条目接口 ===
export interface BossEntry {
  classId: number;   // 职业 ID (参照 classes.ts 职业表)
  level: number;     // 等级
}

// === 解析单关 Boss 配置 ===
// levelIndex: 0-based (关卡 1 = 0)
export function parseSceneBossConfig(
  rom: Uint8Array,
  levelIndex: number,
): BossEntry[] | null {
  const addr = SCENARIO_BOSS_TABLE + levelIndex * BOSS_ENTRY_SIZE;
  if (addr + BOSS_ENTRY_SIZE > SCENARIO_BOSS_END || addr >= rom.length) return null;

  const pairs: BossEntry[] = [];
  for (let i = 0; i < 4; i++) {
    const classId = rom[addr + i * 2];
    const level = rom[addr + i * 2 + 1];
    if (classId === 0xFF || level === 0xFF) break;
    pairs.push({ classId, level });
  }
  return pairs.length > 0 ? pairs : null;
}

// === 解析全部关卡 Boss 配置 ===
export function parseAllBossConfigs(rom: Uint8Array): Array<BossEntry[] | null> {
  const configs: Array<BossEntry[] | null> = [];
  for (let i = 0; i < MAX_BOSS_LEVELS; i++) {
    configs.push(parseSceneBossConfig(rom, i));
  }
  return configs;
}
