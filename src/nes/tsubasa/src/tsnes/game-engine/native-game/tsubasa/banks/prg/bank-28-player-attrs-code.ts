/**
 * Bank 28: Player Attributes ($8000-$9FFF)
 *？？？被那个bank使用？？
 bank-28 实际是阵型和球员行动选择引擎，不只是属性计算。
 * MMC3 可切换 bank。尚未发现调用者
 * 功能: 球员属性计算 — 能力值查询、属性修正、成长系统
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（属性计算引擎）
 * ═══════════════════════════════════════
 *
 * Phase 2b: 骨架实现 — 球员属性计算
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_28_attributes.ts
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { track } from '../debug-log';
import { DATA_$9616_$9E4D, DATA_$9E4E_$9ECE } from './bank-28-player-attrs-data';

// ── 球员数值/属性表 bank-29 ──
import { getBank29Data } from './bank-29-player-value-code';


// ═════════════════════════════════════════════════
// $800C: 球员数据分派 (ASM JMP $8D58)
// 调用来源: bank31 sub_EF7F_A (idx=0x31) → 每帧比赛期都会调用
// 功能: 根据 $043D (球员ID) 分派到不同球员逻辑
//       - 获取球员属性、坐标, 更新 $0x32/$0x33 指针
//       - 涉及球员数据重排和球场坐标计算
// ═════════════════════════════════════════════════
export function bank28_offset0C(sys: SystemState): void {
  // stub: 球员数据分派 — 更新数据指针
  // 原始代码会在每帧根据球员ID重新计算属性表偏移
  const playerId = sys.mem[0x043D] || 0;
  // 简单存储球员ID到工作区, 让后续代码能读取
  sys.mem[0x32] = playerId;
  sys.mem[0x33] = 0;
}

// ═════════════════════════════════════════════════
// $8015: 球员属性初始化 (ASM JMP $8224)
// 调用来源: bank31 sub_E616 (单球员初始化)
// 功能: 从 ROM 数据表加载球员初始属性到 RAM 工作区
//       设置球员基本参数 ($0400-$043F 区域)
// ═════════════════════════════════════════════════
export function bank28_offset15(sys: SystemState): void {
  // stub: 球员属性初始化
  // 设置默认工作区值, 确保 $32/$33 指针有效
  const playerId = sys.mem[0x0442] || sys.mem[0x043D] || 0;
  sys.mem[0x32] = playerId;
  sys.mem[0x33] = 0;
}

// ═════════════════════════════════════════════════
// $8000: 属性计算入口
// ═════════════════════════════════════════════════
//
// 6502 原始: 根据 $043D (球员索引) 和 $043E (属性类型) 计算最终能力值。
// 基础值 + 等级修正 + 装备加成 → 写入 $0430-$0433。
//
// 属性类型:
//   0: 射门 (Shot)
//   1: 速度 (Speed)
//   2: 技术 (Technique)
//   3: 体力 (Stamina)
//   4: 传球 (Pass)
//   5: 拦截 (Intercept)
//   6: 头球 (Header)
//   7: 守门 (GK)

export function bank28_entry(sys: SystemState): void {
  track('bank28_entry');

  const playerIdx = sys.mem[0x043D] || 0;
  const attrType = sys.mem[0x043E] || 0;

  // 从 DATA_$9616_$9E4D 读球员基础能力值
  const baseStatOff = (playerIdx * 0x10 + 6 + attrType) % DATA_$9616_$9E4D.length;
  const baseValue = DATA_$9616_$9E4D[baseStatOff] || 0;

  // 读取等级修正 (DATA_$9E4E_$9ECE 成长曲线)
  const level = readMem(sys, 0x0445) || 1;
  const lvOff = (attrType * 16 + Math.min(level, 15)) % DATA_$9E4E_$9ECE.length;
  const levelBonus = DATA_$9E4E_$9ECE[lvOff] || 0;

  // 读取装备加成 (RAM, 保持 readMem)
  const equipBonus = readMem(sys, 0x0506 + attrType) || 0;

  // 最终值 = 基础 + 等级 + 装备 (上限 99)
  let finalValue = baseValue + levelBonus + equipBonus;
  if (finalValue > 99) finalValue = 99;

  // 写入结果
  writeMem(sys, 0x0430, finalValue);
  writeMem(sys, 0x0431, baseValue);
  writeMem(sys, 0x0432, levelBonus);
  writeMem(sys, 0x0433, equipBonus);

  console.log(`[bank28] player #${playerIdx} attr ${attrType}: ${finalValue} ` +
    `(base=${baseValue} + lv=${levelBonus} + eq=${equipBonus})`);
}

/** 计算球员综合评分 */
export function bank28_getOverallRating(_sys: SystemState, playerIdx: number): number {
  const attrTypes = [0, 1, 2, 3, 4, 5]; // 射门、速度、技术、体力、传球、拦截
  let total = 0;
  for (const t of attrTypes) {
    const off = (playerIdx * 0x10 + 6 + t) % DATA_$9616_$9E4D.length;
    total += DATA_$9616_$9E4D[off] || 0;
  }
  return Math.round(total / attrTypes.length);
}

// ═════════════════════════════════════════════════
// $8024: 进球逻辑入口 (ASM JMP $82CA)
// 调用来源: bank31 sub_E233 (进球事件) → 每帧调用
// 功能: 进球时执行球员特写、庆祝动画、比分更新
// ═════════════════════════════════════════════════
export function bank28_offset24(sys: SystemState): void {
  // stub: 进球事件逻辑
  // bank31 sub_E233 本身已设置 $0615/$062D 等标志位
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank28_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank28_entry,
  0x0C: bank28_offset0C,
  0x15: bank28_offset15,
  0x24: bank28_offset24,
};

// ═════════════════════════════════════════════════
// DATA: DATA_$9616_$9E4D → 球员基础属性表
//       DATA_$9E4E_$9ECE → 等级修正曲线
// 其余 data 段由其他模块在运行时按需访问
// ═════════════════════════════════════════════════

console.log('[bank28] ✅ Phase 2b — 球员属性计算 (direct array access) | data');

// ── 球员数值表 bank-29 存取 ──
export { getBank29Data as bank28_getPlayerValueTable } from './bank-29-player-value-code';
