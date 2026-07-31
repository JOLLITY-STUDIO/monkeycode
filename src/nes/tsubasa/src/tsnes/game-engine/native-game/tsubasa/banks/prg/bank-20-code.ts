/**
 * Bank 20: Team/Player Selection ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 队伍/球员选择 — 阵容编辑、球员数据管理、选择菜单
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（阵容管理）
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $800F (team select init)
 *   $8003 → JMP $84DC (player data load)
 *   $8006 → JMP $83D9 (roster update)
 *   $8009 → JMP $8624 (formation/setup)
 *   $800C → JMP $8796 (menu handler)
 *
 * Phase 2b: 骨架实现 — 阵容数据管理
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_20_team_data.ts
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';
import { track } from './debug-log';

// ── ROM data registration ──// ═════════════════════════════════════════════════
// $8000/$800F: 队伍选择初始化
// ═════════════════════════════════════════════════
export function bank20_teamSelectInit(sys: SystemState): void {
  track('bank20_teamSelectInit');

  // 从 ROM 加载队伍列表
  // 默认队伍: 日本 (teamId=0)
  writeMem(sys, 0x05FC, 0);   // 队伍索引
  writeMem(sys, 0x0530, 11);  // 阵容大小 = 11
  writeMem(sys, 0x0531, 0);   // 阵型 = 4-4-2 (默认)

  // 初始化球员槽位
  for (let i = 0; i < 11; i++) {
    writeMem(sys, 0x0532 + i, i); // 默认选前 11 名球员
  }

  console.log('[bank20] team select initialized');
}

// ═════════════════════════════════════════════════
// $8003/$84DC: 球员数据加载
// ═════════════════════════════════════════════════
export function bank20_playerDataLoad(sys: SystemState): void {
  track('bank20_playerDataLoad');

  const teamIdx = readMem(sys, 0x05FC) || 0;

  // 从 ROM 数据表加载队伍球员数据到 $0601
  // 每个球员 16 字节: [number, name(4), pos, stats(10)]
  for (let i = 0; i < 11; i++) {
    const playerSlot = readMem(sys, 0x0532 + i) || 0;
    const romBase = 0xB200 + teamIdx * 0xB0 + playerSlot * 0x10;

    for (let j = 0; j < 0x10; j++) {
      writeMem(sys, 0x0601 + i * 0x10 + j, readMem(sys, romBase + j));
    }
  }

  console.log(`[bank20] loaded team ${teamIdx} player data`);
}

// ═════════════════════════════════════════════════
// $8006/$83D9: 阵容更新
// ═════════════════════════════════════════════════
export function bank20_rosterUpdate(sys: SystemState): void {
  track('bank20_rosterUpdate');

  // 交换当前槽位 ($053D) 和选择槽位 ($053E) 的球员
  const slotA = readMem(sys, 0x053D) || 0;
  const slotB = readMem(sys, 0x053E) || 0;

  if (slotA !== slotB && slotA < 11 && slotB < 11) {
    const temp = readMem(sys, 0x0532 + slotA);
    writeMem(sys, 0x0532 + slotA, readMem(sys, 0x0532 + slotB));
    writeMem(sys, 0x0532 + slotB, temp);
  }

  console.log(`[bank20] roster: swapped slot ${slotA} ↔ ${slotB}`);
}

// ═════════════════════════════════════════════════
// $8009/$8624: 阵型设置
// ═════════════════════════════════════════════════
export function bank20_formationSetup(sys: SystemState): void {
  track('bank20_formationSetup');

  const formation = readMem(sys, 0x0531) || 0;

  // 阵型决定球员的初始位置
  // 0=4-4-2, 1=4-3-3, 2=3-5-2, 3=5-3-2
  const formations = [
    // 4-4-2: 4DF, 4MF, 2FW
    [1,1,1,1, 2,2,2,2, 3,3, 0],
    // 4-3-3: 4DF, 3MF, 3FW
    [1,1,1,1, 2,2,2, 3,3,3, 0],
    // 3-5-2: 3DF, 5MF, 2FW
    [1,1,1, 2,2,2,2,2, 3,3, 0],
    // 5-3-2: 5DF, 3MF, 2FW
    [1,1,1,1,1, 2,2,2, 3,3, 0],
  ];

  const pos = formations[formation % formations.length];
  for (let i = 0; i < 11; i++) {
    writeMem(sys, 0x0601 + i * 0x10 + 8, pos[i]); // 位置
  }

  console.log(`[bank20] formation ${formation} applied`);
}

// ═════════════════════════════════════════════════
// $800C/$8796: 菜单处理器
// ═════════════════════════════════════════════════
export function bank20_menuHandler(sys: SystemState): void {
  track('bank20_menuHandler');

  // 读取手柄输入
  const joypad = sys.mem[0x0028] || 0;

  if (joypad & 0x08) {
    // UP: 光标上移
    sys.mem[0x053D] = Math.max((sys.mem[0x053D] || 0) - 1, 0);
  }
  if (joypad & 0x04) {
    // DOWN: 光标下移
    sys.mem[0x053D] = Math.min((sys.mem[0x053D] || 0) + 1, 10);
  }
  if (joypad & 0x01) {
    // A button: 确认选择
    writeMem(sys, 0x053E, sys.mem[0x053D]);
    bank20_rosterUpdate(sys);
  }
  if (joypad & 0x02) {
    // B button: 返回/结束
    writeMem(sys, 0x052B, 0); // 返回标题画面标识
  }
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank20_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank20_teamSelectInit,
  0x03: bank20_playerDataLoad,
  0x06: bank20_rosterUpdate,
  0x09: bank20_formationSetup,
  0x0C: bank20_menuHandler,
};

console.log('[bank20] ✅ Phase 2b — 队伍/球员管理 (teamSelect|player|roster|formation|menu)');
