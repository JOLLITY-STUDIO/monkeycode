/**
 * game-engine — Tsubasa NES Bank-by-Bank 6502→TypeScript 翻译引擎
 *
 * ═══════════════════════════════════════════
 * 目录结构
 * ═══════════════════════════════════════════
 *
 * banks/   ← 翻译后的 PRG bank 代码 (逐 bank 6502 → TS 语义翻译)
 * core/    ← PPU/APU/controller 硬件模拟层 (保留 raw NES 硬件)
 * data/    ← ROM 数据层 (原 hex2asm, 后续逐步内联)
 * scene/   ← 已弃用 (功能已移至 bank-00.ts, 待移除)
 * render/  ← Canvas 画面输出
 * adapters/ ← 平台适配器 (微信小程序 / Web)
 * test/    ← 整合测试 (run-all.ts)
 *
 * ═══════════════════════════════════════════
 * Bank 翻译状态 (Phase 2 — 32/32 文件就绪)
 * ═══════════════════════════════════════════
 *
 *   ✅ bank 00 — 场景分派引擎 + 字节码解释器 + 精灵动画 (完整翻译)
 *   ✅ bank 01 — 比赛跳跃/物理引擎 + 标题画面渲染 (完整翻译)
 *   ✅ bank 02 — NMI 渲染器 + PPU 更新 + 手柄输入 (完整翻译)
 *   ✅ bank 03 — DATA (ROM 注册 ✅)
 *   ✅ bank 04 — DATA (ROM 注册 ✅)
 *   ✅ bank 05 — DATA (ROM 注册 ✅)
 *   ✅ bank 06 — 调色板/场景数据 (完整翻译 + ROM)
 *   ✅ bank 07 — DATA (ROM 注册 ✅)
 *   ✅ bank 08 — DATA (ROM 注册 ✅)
 *   ✅ bank 09 — DATA (ROM 注册 ✅)
 *   ✅ bank 10 — DATA (ROM 注册 ✅)
 *   🔶 bank 11 — 背景/瓦片渲染 (SKELETON, ROM 注册 ✅)
 *   ✅ bank 12 — 音讯引擎 MML 解析器 + APU 写入 (完整翻译)
 *   ✅ bank 13 — DATA (ROM 注册 ✅)
 *   ✅ bank 14 — DATA (ROM 注册 ✅)
 *   ✅ bank 15 — 音乐序列数据 (完整翻译 + ROM)
 *   🔶 bank 16 — 场景逻辑/脚本引擎 (SKELETON, ROM 注册 ✅)
 *   ✅ bank 17 — DATA (ROM 注册 ✅)
 *   ✅ bank 18 — DATA (ROM 注册 ✅)
 *   🔶 bank 19 — 查表数据 (SKELETON, ROM 注册 ✅)
 *   🔶 bank 20 — 队伍/球员选择 (SKELETON, ROM 注册 ✅)
 *   ✅ bank 21 — DATA (ROM 注册 ✅)
 *   🔶 bank 22 — 精灵/OAM 引擎 (SKELETON, ROM 注册 ✅)
 *   ✅ bank 23 — DATA (ROM 注册 ✅)
 *   🔶 bank 24 — 过场/比赛场景控制 (SKELETON, ROM 注册 ✅)
 *   ✅ bank 25 — DATA (ROM 注册 ✅)
 *   🔶 bank 26 — 核心比赛引擎 (SKELETON, ROM 注册 ✅)
 *   🔶 bank 27 — 球员数据查询 (SKELETON, ROM 注册 ✅)
 *   🔶 bank 28 — 球员属性计算 (SKELETON, ROM 注册 ✅)
 *   ✅ bank 29 — DATA (ROM 注册 ✅)
 *   ✅ bank 30 — 系统库 (37 CODE 块: 乘除/NMI/PPU/状态机/输入…) (完整翻译)
 *   ✅ bank 31 — 启动向量 + 赛场主循环 + 球员逻辑 + 精灵渲染 (完整翻译)
 */

// ── Boot ──────────────────────────────────
export {
  createTsubasaNES,
  getSystemState,
  NES,
} from './native-game/tsubasa/boot';
export type {
  TSEngine,
  SystemState,
  NESOptions,
  ControllerId,
  ButtonKey,
} from './native-game/tsubasa/boot';
 

// ── Core Emulator (硬件层, 保留) ───────────
export { default as CPU } from './core/cpu';
export { default as PPU } from './core/ppu/index';
export { default as PAPU } from './core/papu/index';
export { default as Controller } from './core/controller';
export { default as GameGenie } from './core/gamegenie';
export { default as ROM } from './core/rom-loader';
export { default as Tile } from './core/tile';

// ── Data ─────────────────────────────────
// ROM 数据已内联到各 bank 的 -data.ts 文件中 (banks/prg/, banks/chr/)。
// 不再通过 data/ 目录集中导出, 各 bank import 时自动 registerBankRom() 注册。

// ── Scene Engine — 已弃用, 由 bank-00.ts 替代 ──
// export { SceneType, dispatchScene, tickScene } from './scene/dispatch';

// ── Render ────────────────────────────────
export {
  createRenderTarget,
  renderFrame,
  resizeCanvas,
} from './render/canvas-renderer';
export type { RenderTarget } from './render/canvas-renderer';

// ── Platform Adapters ─────────────────────
export { MpAdapter } from './adapters/mp-adapter';
export { WebAdapter } from './adapters/web-adapter';
