// ============================================================================
// scene/progress.ts — 进度表 & 场景自动加载
//
// 对应 ROM Bank 0:
//   $81D4-$83DB  — 场景状态机 Part 2 (进度表查表 + 场景跳转)
//   $80DF-$81D3  — 场景状态机 Part 1 (跳到进度表逻辑)
//
// 五张静态数据表 (ROM 地址 → 数据):
//   1. $83DC (35B) → 场景字节码触发表 1 (call $8464 + $82B5)
//   2. $83FE (33B) → 场景字节码触发表 2 (call $8464 + $82B5)
//   3. $8420 (34B) → 场景字节码触发表 3 (call $8464 + $82B5, clear $E0.bit6)
//   4. $8442 (34B) → 场景字节码触发表 4 (call $8464 + $82A9, inc scene if < $20)
//   5. $8398 (~68B) → 场景跳转表 ($8398[scene_id] → next scene)
//
// ROM 查表逻辑 ($814D / $816C / $81FD / $820D / $81E4):
//   每个场景进入时，依次检查四张触发表
//   只要表[scene_id] != 0，就以此值为脚本编号调用 $8464
//   然后根据是哪个表决定后续调用 $82B5 还是 $82A9
//   最后 $8398 表决定是否自动跳转到下一场景
// ============================================================================

import { SceneId } from './types';
import type { BytecodeInterpreter } from './bytecode';

// ═══════════════════════════════════════════════
// 静态数据表 — ROM 原文
// ═══════════════════════════════════════════════

/**
 * 进度触发表 1 — ROM $83DC (35 bytes)
 *
 * 索引 = scene_id ($26)。
 * 非零值 = 要加载的脚本编号 → 调用 $8464 解释器。
 * 随后调用 $82B5 处理数据。
 *
 * 关键映射:
 *   scene 0 (TECMO_LOGO)       → script 02
 *   scene 5 (BRAZIL_LEAGUE)     → script 07
 *   scene 10 (HIGH_SCHOOL_END)  → script 0C
 *   scene 11 (JAPAN_CUP)        → script 0E
 *   scene 14 (WORLD_YOUTH_DIALOG)→ script 10
 *   scene 15 (WORLD_YOUTH_END)  → script 12
 *   scene 24                     → script 18
 *   scene 30                     → script 1E
 *   scene 32                     → script 20
 */
export const PROGRESS_TABLE_1: ReadonlyArray<number> = [
  0x02, // 0: TECMO_LOGO
  0x00, // 1: TITLE
  0x00, // 2: LOAD_GAME
  0x00, // 3: MAIN_MENU
  0x00, // 4: STORY_INTRO
  0x07, // 5: BRAZIL_LEAGUE
  0x00, // 6: BRAZIL_DIALOG
  0x00, // 7: BRAZIL_END
  0x00, // 8: HIGH_SCHOOL
  0x00, // 9: HIGH_SCHOOL_DIALOG
  0x0C, // 10: HIGH_SCHOOL_END
  0x0E, // 11: JAPAN_CUP
  0x00, // 12: JAPAN_CUP_DIALOG
  0x00, // 13: WORLD_YOUTH
  0x10, // 14: WORLD_YOUTH_DIALOG
  0x12, // 15: WORLD_YOUTH_END
  0x00, // 16: ENDING
  0x00, // 17: FINAL_ENDING
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // 18-23
  0x18, // 24
  0x00, 0x00, 0x00, 0x00, 0x00, // 25-29
  0x1E, // 30
  0x00, // 31
  0x20, // 32
  0x00, 0x00, // 33-34
];

/**
 * 进度触发表 2 — ROM $83FE (33 bytes)
 *
 * 只有 scene 8 和 scene 31 有非零值。
 */
export const PROGRESS_TABLE_2: ReadonlyArray<number> = [
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x0A, // 8: HIGH_SCHOOL
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x21, // 31
  0x00,
];

/**
 * 进度触发表 3 — ROM $8420 (34 bytes)
 *
 * 覆盖最多场景的触发表。
 * 调用 $8464 + $82B5，然后清除 $E0 bit6。
 */
export const PROGRESS_TABLE_3: ReadonlyArray<number> = [
  0x03, // 0: TECMO_LOGO
  0x04, // 1: TITLE
  0x05, // 2: LOAD_GAME
  0x00, // 3: MAIN_MENU
  0x06, // 4: STORY_INTRO
  0x00, // 5: BRAZIL_LEAGUE
  0x00, // 6: BRAZIL_DIALOG
  0x00, // 7: BRAZIL_END
  0x00, // 8: HIGH_SCHOOL
  0x0B, // 9: HIGH_SCHOOL_DIALOG
  0x0D, // 10: HIGH_SCHOOL_END
  0x00, // 11: JAPAN_CUP
  0x00, // 12: JAPAN_CUP_DIALOG
  0x00, // 13: WORLD_YOUTH
  0x11, // 14: WORLD_YOUTH_DIALOG
  0x00, // 15: WORLD_YOUTH_END
  0x00, // 16: ENDING
  0x14, // 17: FINAL_ENDING
  0x00, 0x00, 0x00, 0x00, // 18-21
  0x16, // 22
  0x00, // 23
  0x17, // 24
  0x00, 0x00, // 25-26
  0x1A, 0x1B, 0x1C, 0x1D, // 27-30
  0x1F, // 31
  0x00, 0x00, // 32-33
];

/**
 * 进度触发表 4 — ROM $8442 (34 bytes)
 *
 * 调用 $8464 + $82A9 (不同于 $82B5)。
 * 如果场景 < $20，自动增量 scene_id。
 */
export const PROGRESS_TABLE_4: ReadonlyArray<number> = [
  0x00, 0x00, 0x00, 0x00, 0x00,
  0x08, // 5: BRAZIL_LEAGUE
  0x00, 0x00, 0x00, 0x00, 0x00,
  0x0F, // 11: JAPAN_CUP
  0x00, 0x00, 0x00,
  0x13, // 15: WORLD_YOUTH_END
  0x00, 0x00, 0x00, 0x00, 0x00,
  0x15, // 21
  0x00, 0x00, 0x00, 0x00,
  0x19, // 26
  0x00, 0x00, 0x00, 0x00, 0x00,
  0x22, 0x22, // 32-33
];

/**
 * 场景跳转表 — ROM $8398 (~68 bytes, inline in CODE_$81D4_$83DB)
 *
 * 索引 = 当前 scene_id。
 * 值 = 跳转到的下一个 scene_id。
 *
 * ROM 逻辑 ($81E4): LDX $26, LDA $8398,X, STA $26
 *
 * 该表主要驱动自动剧情推进：打完比赛 → 结算 → 下一段剧情。
 */
export const SCENE_TRANSITION_TABLE: ReadonlyArray<number> = [
  0x00, 0x00, 0x02, 0x02, 0x04, 0x04, 0x06, 0x06,
  0x08, 0x08, 0x0A, 0x0A, 0x0C, 0x0C, 0x0E, 0x0E,
  0x10, 0x10, 0x12, 0x12, 0x14, 0x14, 0x16, 0x17,
  0x17, 0x19, 0x19, 0x1B, 0x1B, 0x1D, 0x1D, 0x1F,
  0x1F, 0x1F, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03,
  0x01, 0x01, 0x01, 0x01, 0x01, 0x03, 0x03, 0x03,
  0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03,
  0x00, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03,
  0x03, 0x03, 0x02, 0x03,
];

// ═══════════════════════════════════════════════
// 进度表查表逻辑
// ═══════════════════════════════════════════════

/** 单个进度表查询结果 */
export interface ProgressResult {
  /** 要加载的脚本编号 */
  scriptNum: number;
  /** 来源表 (1-4) */
  tableIndex: number;
  /** 是否使用 $82A9 替代 $82B5 (仅 table 4) */
  useAltHandler: boolean;
  /** 是否清除 $E0 bit6 (仅 table 3) */
  clearE0Flag: boolean;
  /** 是否自动增量场景 (仅 table 4, 且 scene_id < 0x20) */
  autoIncrementScene: boolean;
}

/**
 * 查询给定场景的所有进度表触发项
 *
 * ROM 流程:
 *   for each table:
 *     val = TABLE[scene_id]
 *     if val != 0:
 *       call $8464(val)     // 加载脚本
 *       if table == 4: call $82A9
 *       else: call $82B5
 *       if table == 3: $E0 &= ~0x40
 *       if table == 4 && scene_id < 0x20: scene_id++
 */
export function queryProgress(sceneId: number): ProgressResult[] {
  const results: ProgressResult[] = [];

  // 表 1: $83DC
  const v1 = sceneId < PROGRESS_TABLE_1.length ? PROGRESS_TABLE_1[sceneId] : 0;
  if (v1 !== 0) {
    results.push({ scriptNum: v1, tableIndex: 1, useAltHandler: false, clearE0Flag: false, autoIncrementScene: false });
  }

  // 表 2: $83FE
  const v2 = sceneId < PROGRESS_TABLE_2.length ? PROGRESS_TABLE_2[sceneId] : 0;
  if (v2 !== 0) {
    results.push({ scriptNum: v2, tableIndex: 2, useAltHandler: false, clearE0Flag: false, autoIncrementScene: false });
  }

  // 表 3: $8420
  const v3 = sceneId < PROGRESS_TABLE_3.length ? PROGRESS_TABLE_3[sceneId] : 0;
  if (v3 !== 0) {
    results.push({ scriptNum: v3, tableIndex: 3, useAltHandler: false, clearE0Flag: true, autoIncrementScene: false });
  }

  // 表 4: $8442
  const v4 = sceneId < PROGRESS_TABLE_4.length ? PROGRESS_TABLE_4[sceneId] : 0;
  if (v4 !== 0) {
    results.push({
      scriptNum: v4,
      tableIndex: 4,
      useAltHandler: true,
      clearE0Flag: false,
      autoIncrementScene: sceneId < 0x20,
    });
  }

  return results;
}

/**
 * 获取场景跳转目标 — 对应 ROM $8398 表
 *
 * @returns 目标 scene_id，若为当前场景自身则返回 sceneId (不变)
 */
export function getSceneTransition(sceneId: number): number {
  if (sceneId >= SCENE_TRANSITION_TABLE.length) return sceneId;
  return SCENE_TRANSITION_TABLE[sceneId];
}

// ═══════════════════════════════════════════════
// 场景自动加载集成
// ═══════════════════════════════════════════════

/**
 * 场景进入时自动加载字节码
 *
 * ROM 中在 $8017 主循环内部完成：
 *   1. 查四张进度表
 *   2. 对每个非零项调用 $8464(scriptNum)
 *   3. 调用 $82B5 / $82A9 处理数据
 *   4. 查 $8398 决定是否跳转
 *
 * 本函数做语义化等价：
 *   - 查表获取脚本编号
 *   - 调用 bytecode.load(scriptNum)
 *   - 返回是否需要自动场景跳转
 */
export function loadSceneScripts(
  sceneId: number,
  bytecode: BytecodeInterpreter,
): { loaded: boolean; autoTransition: SceneId | null } {
  const results = queryProgress(sceneId);

  if (results.length === 0) {
    return { loaded: false, autoTransition: null };
  }

  // ROM 行为: 进度表逐表顺序执行，每个脚本执行完才加载下一个
  // 此处: 加载第一个脚本，其余加入队列 (bytecode.runFrame 在脚本结束后自动加载下一个)
  const first = results[0];
  let loaded = bytecode.load(first.scriptNum);

  for (let i = 1; i < results.length; i++) {
    bytecode.queueScript(results[i].scriptNum);
  }

  // 表 4 自动增量 (仅 scene_id < 0x20 时)
  // ROM: CMP #$20, BCC + E6
  let autoTransition: SceneId | null = null;
  const hasAutoIncrement = results.some(r => r.autoIncrementScene);
  if (hasAutoIncrement) {
    const nextSceneId = sceneId + 1;
    if (nextSceneId in SceneId || nextSceneId <= 0x20) {
      // 超过已枚举范围则用原始值
      autoTransition = (nextSceneId as SceneId);
    }
  }

  // $8398 表查跳转目标 (仅当目标 ≠ 当前场景时)  
  if (autoTransition === null) {
    const transitionTarget = getSceneTransition(sceneId);
    if (transitionTarget !== sceneId && transitionTarget >= 0 && transitionTarget <= 0x22) {
      autoTransition = transitionTarget as SceneId;
    }
  }

  return { loaded, autoTransition };
}
