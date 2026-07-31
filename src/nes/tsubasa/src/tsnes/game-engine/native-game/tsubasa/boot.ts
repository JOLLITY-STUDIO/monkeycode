/**
 * Boot entry point — Bank-by-bank 6502 → TypeScript 翻译引擎
 *
 * ═══════════════════════════════════════
 * 启动流程 (纯翻译模式，不走 CPU 模拟器)
 * ═══════════════════════════════════════
 *
 * 1. 创建 PPU/APU 硬件模拟层 (保留，供渲染/音频)
 * 2. 创建 SystemState (替代 CPU 模拟器)
 * 3. SystemState 内部自动管理 bank ROM 注册与 MMC3 内存映射
 *    - CODE banks (bank-XX.ts) import 时自动调用 registerBankRom() 注册 8KB 数据
 *    - 翻译代码直接通过 SystemState 内存接口读写，无需 6502 opcode 解释
 * 4. 调用 translate_BANK31_RESET → 进入主循环
 *
 * ═══════════════════════════════════════
 * Bank 翻译状态
 * ═══════════════════════════════════════
 *
 *   ✅ bank 00 — 场景分派引擎
 *   ✅ bank 01 — 比赛跳跃/标题渲染
 *   ✅ bank 02 — NMI 渲染器
 *   ✅ bank 30 — 系统库 (37 个函数)
 *   ✅ bank 31 — 启动向量 + 主循环
 *   ✅ bank 01-29 data — ROM 已注册
 *   🔶 bank 11/16/19/20/22/24/26/27/28 — SKELETON
 *
 * ═══════════════════════════════════════
 * 旧版本留底
 * ═══════════════════════════════════════
 *
 *   原始 6502 CPU 模拟器版本保留在 game-engine-v1/ (git checkpoint 88170f9)。
 *   如需回滚: git checkout 88170f9 -- game-engine/
 */

import NES from '../../core/nes';
import type { NESOptions, ControllerId } from '../../core/nes';
import type { ButtonKey } from '../../core/controller';
import { createSystemState, SystemState } from './banks/system-state';
import { translate_BANK31_RESET } from './banks/prg/bank-31-code';

/**
 * 创建 NES 实例（纯翻译路径，不走 CPU 模拟器）。
 *
 * 翻译路径:
 *   SystemState 直操内存/PPU，bank-by-bank 翻译为 TS。
 *   各 bank 的 ROM 数据通过 import 时自动 registerBankRom() 注册到 SystemState，
 *   MMC3 映射由 bank 翻译代码中的 bankSwitch 管理。
 *
 * 返回的 NES 实例上附加 `__tsSys` 属性供翻译路径使用。
 */
export function createTsubasaNES(opts?: NESOptions): NES {
  const nes = new NES(opts ?? {});

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
// TSEngine already exported above (line 74)
