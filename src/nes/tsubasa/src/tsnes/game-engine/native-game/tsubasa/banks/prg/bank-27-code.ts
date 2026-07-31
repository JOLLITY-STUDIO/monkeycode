/**
 * Bank 27: Player Data ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 球员数据查询 — 球员属性、队伍数据、名称表
 *
 * ═══════════════════════════════════════
 * 架构角色: Data Provider（球员属性数据源）
 * ═══════════════════════════════════════
 *
 * Phase 2b: 骨架实现 — 球员数据查询
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_27_player_data.ts
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';
import { track } from './debug-log';

// ── ROM data registration ──// ═════════════════════════════════════════════════
// $8000: 球员数据查询入口
// ═════════════════════════════════════════════════
//
// 6502 原始: 根据 $043D (球员索引) 从 ROM 数据表读取球员属性，
// 写入 $0430-$043F 作为调用方返回值。
//
// 球员属性格式 (16 字节):
//   [0]:   球员号码 (1-99)
//   [1-4]: 名字 (4 字节, 可显示字符)
//   [5]:   位置 (0=GK, 1=DF, 2=MF, 3=FW)
//   [6]:   射门力
//   [7]:   速度
//   [8]:   技术
//   [9]:   体力
//   [10]:  传球
//   [11]:  拦截
//   [12]:  头球
//   [13]:  守门
//   [14-15]: 保留/特殊技能

export function bank27_entry(sys: SystemState): void {
  track('bank27_entry');

  const playerIdx = sys.mem[0x043D] || 0;

  // 从 ROM 读取球员数据 ($B000 offset = player * 16)
  const romBase = 0xB000 + playerIdx * 0x10;

  // 复制到 $0430-$043F
  for (let i = 0; i < 16; i++) {
    const val = readMem(sys, romBase + i);
    sys.mem[0x0430 + i] = val;
  }

  console.log(`[bank27] player #${playerIdx}: number=${sys.mem[0x0430]}, ` +
    `pos=${sys.mem[0x0435]}, shot=${sys.mem[0x0436]}, speed=${sys.mem[0x0437]}`);
}

/** 获取球员总数 — 从 ROM 头部读取 */
export function bank27_getPlayerCount(sys: SystemState): number {
  // 球员总数存储在 $B000 (第一个字节)
  return readMem(sys, 0xB000) || 128;
}

/** 查找特定球队的球员列表 */
export function bank27_getTeamPlayers(sys: SystemState, teamId: number, out: number[]): number {
  // 简化: 假设每队 16 名球员
  const baseIdx = teamId * 16;
  const count = 16;
  for (let i = 0; i < count; i++) {
    out[i] = baseIdx + i;
  }
  return count;
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank27_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank27_entry,
};

console.log('[bank27] ✅ Phase 2b — 球员数据查询 (player data ROM access)');
