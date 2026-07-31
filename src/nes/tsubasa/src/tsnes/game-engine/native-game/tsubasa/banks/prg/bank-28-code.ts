/**
 * Bank 28: Player Attributes ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
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
import { DATA_$9616_$9E4D, DATA_$9E4E_$9ECE } from './bank-28-data';// ═════════════════════════════════════════════════
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
// Dispatch table
// ═════════════════════════════════════════════════

export const bank28_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank28_entry,
};

// ═════════════════════════════════════════════════
// DATA: DATA_$9616_$9E4D → 球员基础属性表
//       DATA_$9E4E_$9ECE → 等级修正曲线
// 其余 data 段由其他模块在运行时按需访问
// ═════════════════════════════════════════════════

console.log('[bank28] ✅ Phase 2b — 球员属性计算 (direct array access) | data');
