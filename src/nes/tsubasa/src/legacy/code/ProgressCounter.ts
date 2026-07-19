/**
 * 天使之翼2 - 游戏总进度计数器系统 ($26 系统)
 * 
 * 对应原版 Bank $00:
 *   $8204-$8284: 主循环各阶段处理
 *   $822F: $26 进度查表 → 场景加载
 *   $8248: $C578 过场效果调用
 *   $824B: INC $26 → 推进进度
 *   $80FD-$8158: 初始化/比赛初始化序列
 * 
 * $26 不是简单的"难度值"或"帧计数", 而是游戏总进度计数器:
 *   0   = 开机/初始化
 *   1   = 第一段过场动画
 *   2   = 第二段过场动画  
 *   3   = 标题画面出现
 *   ...
 *   N   = 进入比赛
 *   N+M = 下半场...
 *   ...
 *   end = 比赛结束/回标题
 * 
 * $26 的每个值通过查 ROM 多张映射表确定:
 *   TABLE_83DC[$26]: 主要场景脚本索引
 *   TABLE_83FE[$26]: 第二套场景索引
 *   TABLE_8420[$26]: 第三套 (在 $822F 处检查)
 *   TABLE_8442[$26]: 第四套 (更细粒度)
 */

import { GameState } from '../types';
import { NesMemory } from './Memory';
import {
  switchMmc3Bank, waitVBlank, screenOff, screenOn,
  setPpuAddr, switchBankAndInit, waitScreenReady,
} from './CoreUtils';
import { sceneInit, getSceneRegs, saveSceneRegs } from './SceneInterpreter';
import {
  PROGRESS_TABLES,
  TABLE_83DC_OFFSET,
  TABLE_83FE_OFFSET,
  TABLE_8420_OFFSET,
  TABLE_8442_OFFSET,
} from './SceneData';

// ============================================================================
// 进度系统常量
// ============================================================================
/** 进度值 >= $20 时跳转到竞赛模式 */
const MATCH_THRESHOLD = 0x20;

// ============================================================================
// 进度表查表辅助函数
// ============================================================================

/** 查 $83DC 主场景表 */
export function lookupSceneIndex_83DC(progress: number): number {
  if (progress >= 34) return 0;
  return PROGRESS_TABLES[TABLE_83DC_OFFSET + progress];
}

/** 查 $83FE 第二场景表 */
export function lookupSceneIndex_83FE(progress: number): number {
  if (progress >= 34) return 0;
  return PROGRESS_TABLES[TABLE_83FE_OFFSET + progress];
}

/** 查 $8420 第三场景表 */
export function lookupSceneIndex_8420(progress: number): number {
  if (progress >= 34) return 0;
  return PROGRESS_TABLES[TABLE_8420_OFFSET + progress];
}

/** 查 $8442 第四场景表 */
export function lookupSceneIndex_8442(progress: number): number {
  if (progress >= 34) return 0;
  return PROGRESS_TABLES[TABLE_8442_OFFSET + progress];
}

// ============================================================================
// 主循环阶段处理
// 对应 $00:8204-$8284 的 $27 跳转表分发
// ============================================================================

/**
 * $27 = 0: 初始场景阶段
 * 
 * 流程:
 *   1. 如果 $0E bit3: 先执行 $83AB 逻辑
 *   2. 查 $8420[$26] → 如果非零: sceneInit + $82B5 等完成
 *   3. 查 $8442[$26] → 如果非零: sceneInit + $82A9 等完成
 *   4. 如果 $26 < $20: $C578 过场效果 → INC $26 → 切 bank1 → JSR $A018
 *   5. 如果 $26 >= 3: 设 $0446 = 5
 *   6. JMP $80FD (清 ZP + 比赛初始化)
 *   7. 如果 $26 >= $20: $27 = 5 → JMP $C57B
 */
export function progressPhase0(ctx: GameState, mem: NesMemory): void {
  const ram = ctx.cpu.ram;
  const progress = ram[0x26];
  
  // ── $8218-$822D: 检查 $8420 表 ──
  const idx8420 = lookupSceneIndex_8420(progress);
  if (idx8420 !== 0) {
    // JSR $8464 → 初始化场景
    sceneInit(ctx, mem, idx8420);
    // JSR $82B5 → 等待场景初始化完成
    // (等 VBlank 直到 $4D=$4E=0)
    waitForSceneReady(ctx, mem);
    // $8229: $E0 &= ~$40
    ram[0xE0] = ram[0xE0] & 0xBF;
  }
  
  // ── $822F-$8241: 检查 $8442 表 ──
  const idx8442 = lookupSceneIndex_8442(progress);
  if (idx8442 !== 0) {
    sceneInit(ctx, mem, idx8442);
    // JSR $82A9 → 等待数据加载完成
    waitForDataReady(ctx, mem);
  }
  
  // ── $8243-$8260: 进度推进 ──
  if (progress < MATCH_THRESHOLD) {
    // $8243: $0700 = 1
    mem.ram[0x0700] = 1;
    
    // $8248: JSR $C578 → 过场过渡效果
    // (效果函数在 Bank $0F, 待实现)
    
    // $824B: INC $26 → 推进进度!
    ram[0x26] = (progress + 1) & 0xFF;
    
    // $824D-$8252: 切 bank 1 → JSR $A018 比赛逻辑
    switchMmc3Bank(ctx, 1, 6);
    // JSR $A018 → 比赛逻辑入口 (待实现)
    
    // $8255-$825D: 如果 $26 >= 3 → 设 $0446 = 5
    if (ram[0x26] >= 3) {
      mem.ram[0x0446] = 5;
    }
    
    // JMP $80FD → 清 ZP + 比赛初始化
    ram[0x28] = 0;
    ram[0x29] = 0;
    ram[0x27] = 0;                         // 准备下一阶段
  } else {
    // $8263-$8267: $26 >= $20 → 进入竞赛模式
    ram[0x27] = 5;                         // 跳表索引 = 5
    // JMP $C57B → 过场结束效果
  }
  
  console.log(`[progress] Phase 0: $${progress.toString(16)} → $${ram[0x26].toString(16)}`);
}

/**
 * $27 = 1,2,3,4: 中间过场阶段
 * 
 * $826A-$8282 区域:
 *   切 bank1 → JSR $A003/$A01B → 切 bank2 → JSR $A20F
 *   → JMP $80FD
 */
export function progressPhase1_4(ctx: GameState, mem: NesMemory): void {
  const ram = ctx.cpu.ram;
  
  // $826A-$8277: 比赛引擎初始化序列
  switchMmc3Bank(ctx, 1, 6);               // LDX #1 / JSR $C4B9
  // JSR $A003 → 比赛逻辑
  
  switchMmc3Bank(ctx, 2, 6);               // LDX #2 / JSR $C4B9
  // JSR $A20F → 比赛引擎入口
  
  switchMmc3Bank(ctx, 1, 6);               // LDX #1 / JSR $C4B9
  // JSR $A01B → 比赛逻辑
  
  // JMP $80FD → 清索引
  ram[0x28] = 0;
  ram[0x29] = 0;
  ram[0x27] = 0;
  
  console.log(`[progress] Phase 1-4: completed`);
}

/**
 * $27 = 5: 竞赛/比赛阶段
 * $8285-$8294:
 *   设 $0700 = 1 → 等 1 VBlank → 切 bank1 → JMP $A00C
 */
export function progressPhase5(ctx: GameState, mem: NesMemory): void {
  const ram = ctx.cpu.ram;
  
  mem.ram[0x0700] = 1;                     // $8285
  waitVBlank(ctx, mem, 1);                 // $828C
  
  switchMmc3Bank(ctx, 1, 6);               // $828F
  
  // JMP $A00C → 比赛主逻辑入口
  ram[0x27] = 0;                           // 重置
  console.log('[progress] Phase 5: match started');
}

// ============================================================================
// $80FD-$8158: 初始化/比赛初始化序列
//  清 ZP 索引 → 设 $0700 = 1 → 切 bank → 比赛引擎 → 设 nametable
// ============================================================================
export function initMatchSequence(ctx: GameState, mem: NesMemory): void {
  const ram = ctx.cpu.ram;
  
  // $80FD: 清 ZP
  ram[0x28] = 0;
  ram[0x29] = 0;
  ram[0x27] = 0;
  
  // $8105: $0700 = 1
  mem.ram[0x0700] = 1;
  
  // $810A-$8111: 切 Bank 2 → 比赛引擎
  switchMmc3Bank(ctx, 2, 6);
  // JSR $A20C → 比赛引擎 (待实现)
  
  // $8112: 设 nametable
  setPpuAddr(ctx, 0, 0);                   // LDA #0 / JSR $8920
  
  // $8117-$8122: 切 Bank 1 → 比赛初始化
  switchMmc3Bank(ctx, 1, 6);
  // JSR $A006 → 比赛初始化 (待实现)
  
  // $811F: 播放音乐
  // JSR $C572 → 播放音乐 (待实现)
  
  // $8122-$812F: 难度选择
  // LDX #$55 (默认值)
  // 如果 $26 >= $20 → LDX #$4C (高难度)
  let diffVal = 0x55;
  if (ram[0x26] >= 0x20) {
    diffVal = 0x4C;
  }
  mem.ram[0x0700] = diffVal;
  
  // $812F-$813B: 清 $0450-$0453
  mem.ram[0x0450] = 0;
  mem.ram[0x0451] = 0;
  mem.ram[0x0452] = 0;
  mem.ram[0x0453] = 0;
  
  // $813D-$8142: 切 Bank 1 → 比赛初始化2
  switchMmc3Bank(ctx, 1, 6);
  // JSR $A009 → 比赛初始化2 (待实现)
  
  console.log(`[progress] Match sequence initialized, diff=${diffVal.toString(16)}`);
}

// ============================================================================
// 辅助函数
// ============================================================================

/**
 * $82B5: 等待场景初始化完成
 * 循环: 等 1 VBlank → 检查 $4D/$4E → 如果非零且没有按 Select 键 → 继续等
 * 直到 $4D=$4E=0 (脚本执行完毕)
 */
function waitForSceneReady(ctx: GameState, mem: NesMemory): void {
  const ram = ctx.cpu.ram;
  
  // 最多等 60 帧
  for (let i = 0; i < 60; i++) {
    waitVBlank(ctx, mem, 1);
    
    if (ram[0x4D] === 0 && ram[0x4E] === 0) {
      break;
    }
    
    // 检查 Select 键跳过 (bit5)
    if (ram[0x1E] & 0x20) {
      break;
    }
  }
}

/**
 * $82A9: 等待数据加载完成
 * 循环: 等 1 VBlank → 检查 $4D/$4E → 如果非零 → 继续等
 */
function waitForDataReady(ctx: GameState, mem: NesMemory): void {
  const ram = ctx.cpu.ram;
  
  for (let i = 0; i < 60; i++) {
    waitVBlank(ctx, mem, 1);
    
    if (ram[0x4D] === 0 && ram[0x4E] === 0) {
      break;
    }
  }
}
