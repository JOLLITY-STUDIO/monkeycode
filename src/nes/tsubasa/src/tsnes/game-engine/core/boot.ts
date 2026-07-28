/**
 * Boot entry point — Bank-by-bank 6502 → TypeScript 翻译引擎
 *
 * ═══════════════════════════════════════
 * 启动流程 (翻译模式)
 * ═══════════════════════════════════════
 *
 * 1. 创建 PPU/APU 硬件模拟层 (保留)
 * 2. 创建 SystemState (替代 CPU 模拟器)
 * 3. 调用 translate_BANK31_RESET → 设置 MMC3 → bank30 mock init → 进入主循环
 * 4. 主循环: 翻译后的 bank 代码直接操作内存/PPU, 无需 6502 opcode 解释
 *
 * ═══════════════════════════════════════
 * Bank 翻译状态
 * ═══════════════════════════════════════
 *
 *   ✅ bank 31 — boot vectors, 主循环骨架
 *   ⏳ bank 30 — system library (mock)
 *   ⏳ bank 00 — scene dispatch (mock)
 *   ⏳ bank 01-29 — 未翻译 (mock)
 *
 * ═══════════════════════════════════════
 * 旧版本留底
 * ═══════════════════════════════════════
 *
 *   原始 6502 CPU 模拟器版本保留在 game-engine-v1/ (git checkpoint 88170f9)。
 *   如需回滚: git checkout 88170f9 -- game-engine/
 */

import NES from './nes';
import type { NESOptions, ControllerId } from './nes';
import type { ButtonKey } from './controller';
import { createSystemState, SystemState } from '../banks/system-state';
import { translate_BANK31_RESET } from '../banks/bank-31';

// ── ROM 数据 (CPU 模拟器路径需要) ──────────────────
import { PRG_ROM_BANKS } from '../data/rom-data';
import { CHR_ROM_BANKS } from '../data/chr-data';
import { buildRomBuffer } from '../../tsubasa-hex2asm/rom_header';

/**
 * 创建 NES 实例（向后兼容，返回 NES 实例）。
 *
 * 双路径策略:
 *   1. CPU 模拟器路径 — 加载 iNES ROM → CPU 逐条执行 6502 opcode（当前主力）
 *   2. 翻译路径 — SystemState 直操内存/PPU，bank-by-bank 翻译为 TS（陆续接入）
 *
 * 返回的 NES 实例上附加 `__tsSys` 属性供翻译路径使用。
 */
export function createTsubasaNES(opts?: NESOptions): NES {
  const nes = new NES(opts ?? {});

  // ── CPU 模拟器路径: 加载 ROM ──────────────────
  const romBuffer = buildRomBuffer(PRG_ROM_BANKS, CHR_ROM_BANKS);
  nes.loadROM(romBuffer);

  // ── 翻译路径: 初始化 SystemState ──────────────
  const sys = createSystemState(nes.ppu, nes.papu);
  (nes as any).__tsSys = sys;
  translate_BANK31_RESET(sys);

  return nes;
}

/**
 * 从 NES 实例获取翻译 SystemState。
 * 用于在翻译路径中替代 CPU 模拟器直接操作内存。
 */
export function getSystemState(nes: NES & { __tsSys?: SystemState }): SystemState | null {
  return nes.__tsSys ?? null;
}

/** 翻译引擎完整实例（CPU 模拟器 + 翻译双路径） */
export interface TSEngine {
  nes: NES;
  sys: SystemState;
}

// 重新导出类型以保持兼容
export type { NESOptions, ControllerId, ButtonKey };
export { NES };
export type { SystemState };
export type { TSEngine };
