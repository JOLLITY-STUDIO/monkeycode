/**
 * scenario.ts — Langrisser II 场景配置解析器 (TypeScript版)
 *
 * 严格基于已验证的 md-character.js 逻辑转写
 *
 * 数据流 (Ghidra FUN_0000a122 + FUN_0000a16a):
 *   ROM 0x0821BE (4B指针表 ×31关)
 *        │ FUN_0000a122: 复制128B到RAM 0xFFFF9F62
 *        ▼
 *   128B配置分为4段(每段32B = 8 dword), 按单位阵营选择:
 *     段0 (0x00-0x1F): 玩家方 (unit[0x20] == 1)
 *     段1 (0x20-0x3F): AI特殊 (unit[0x20] == 3)
 *     段2 (0x40-0x5F): NPC (其他)
 *     段3 (0x60-0x7F): 默认敌方
 */

import { read8, read16BE, read32BE } from './rom';

// === 地址常量 (与 md-character.js 一致) ===
export const SCENARIO_UNIT_CONFIG_PTR_TABLE = 0x0821BE;
export const SCENARIO_CONFIG_SIZE = 128;
export const SCENARIO_CONFIG_DWORD_COUNT = 32;
export const SCENARIO_COUNT = 31;

// === 场景配置段接口 (与 md-character.js parseScenarioUnitConfig 一致) ===
export interface ScenarioConfigSegment {
  name: 'player' | 'aiSpecial' | 'npc' | 'enemyDefault';
  offset: number;
  dwords: number[];   // 8个dword
}

// === 场景配置接口 ===
export interface ScenarioUnitConfig {
  levelIndex: number;
  ptrAddr: number;
  configPtr: number;
  romAddr: number;
  segments: ScenarioConfigSegment[];
  raw: number[];
  error?: string;
}

// === 已知的6种场景配置变体 (与 md-character.js SCENARIO_CONFIG_VARIANTS 一致) ===
export const SCENARIO_CONFIG_VARIANTS: { ptr: number; levels: string; note: string }[] = [
  { ptr: 0x08223A, levels: '默认',       note: '多数关卡用' },
  { ptr: 0x0822BA, levels: '4,12,23',    note: '' },
  { ptr: 0x08233A, levels: '8',          note: '' },
  { ptr: 0x0823BA, levels: '11',         note: '' },
  { ptr: 0x08243A, levels: '25-27,31',   note: '' },
  { ptr: 0x0824BA, levels: '22,28,30',   note: '' },
];

// === 解析场景单位配置 (严格按 md-character.js parseScenarioUnitConfig) ===
//
// Ghidra FUN_0000a122 流程:
//   puVar3 = *(uint**)(0x0821BE + (level-1) * 4)  // 指针表查询
//   memcpy(RAM 0xFFFF9F62, puVar3, 128)            // 复制 32 dword
//
// Ghidra FUN_0000a16a 流程 (使用配置):
//   A0+4 = &0xFFFF9F62                  // 起始
//   A0+8 = &0xFFFF9F62                  // 当前指针
//   if (unit[0x20] != 1) A0+4 += 0x20   // 跳过 32B (第1段:玩家方)
//   if (unit[0x20] != 3) A0+4 += 0x20   // 跳过 32B (第2段:AI特殊)
//   A0+4 += 0x20                        // 跳过 32B (第3段:NPC)
//   // 第4段 32B = 默认敌方
export function parseScenarioUnitConfig(rom: Uint8Array, levelIndex: number): ScenarioUnitConfig {
  const ptrAddr = SCENARIO_UNIT_CONFIG_PTR_TABLE + (levelIndex - 1) * 4;
  if (ptrAddr + 4 > rom.length) {
    return { levelIndex, ptrAddr, configPtr: 0, romAddr: 0, segments: [], raw: [], error: '指针地址越界' };
  }

  const configPtr = read32BE(rom, ptrAddr);
  if (configPtr < 0x200 || configPtr + SCENARIO_CONFIG_SIZE > rom.length) {
    return {
      levelIndex,
      ptrAddr,
      configPtr,
      romAddr: 0,
      segments: [],
      raw: [],
      error: '配置指针无效',
    };
  }

  // 解析 4 段 (每段 8 dword = 32 字节)
  const segments: ScenarioConfigSegment[] = [];
  const segmentNames: Array<'player' | 'aiSpecial' | 'npc' | 'enemyDefault'> = ['player', 'aiSpecial', 'npc', 'enemyDefault'];

  for (let s = 0; s < 4; s++) {
    const segBase = configPtr + s * 32;
    const dwords: number[] = [];
    for (let d = 0; d < 8; d++) {
      dwords.push(read32BE(rom, segBase + d * 4));
    }
    segments.push({
      name: segmentNames[s],
      offset: s * 32,
      dwords,
    });
  }

  return {
    levelIndex,
    ptrAddr,
    configPtr,
    romAddr: configPtr,
    segments,
    raw: Array.from(rom.slice(configPtr, configPtr + SCENARIO_CONFIG_SIZE)),
  };
}

// === 解析全部31关的场景单位配置指针 (与 md-character.js parseAllScenarioConfigs 一致) ===
export function parseAllScenarioConfigs(rom: Uint8Array): ScenarioUnitConfig[] {
  const configs: ScenarioUnitConfig[] = [];
  for (let i = 1; i <= SCENARIO_COUNT; i++) {
    const cfg = parseScenarioUnitConfig(rom, i);
    if (cfg) configs.push(cfg);
  }
  return configs;
}

// === 获取场景配置指针表 (31个指针) ===
export function getScenarioConfigPtrs(rom: Uint8Array): number[] {
  const ptrs: number[] = [];
  for (let i = 0; i < SCENARIO_COUNT; i++) {
    ptrs.push(read32BE(rom, SCENARIO_UNIT_CONFIG_PTR_TABLE + i * 4));
  }
  return ptrs;
}
