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
 * scene/   ← 场景引擎 (旧 placeholder, 待翻译 bank00 后淘汰)
 * render/  ← Canvas 画面输出
 * adapters/ ← 平台适配器 (微信小程序 / Web)
 *
 * ═══════════════════════════════════════════
 * 启动流程 (翻译模式)
 * ═══════════════════════════════════════════
 *
 * const engine = createTsubasaNES({ onFrame: renderToCanvas });
 * tickFrame(engine); // 每帧调用, 替代旧 nes.frame()
 *
 * ═══════════════════════════════════════════
 * Bank 翻译状态
 * ═══════════════════════════════════════════
 *
 *   ✅ bank 31 — boot vectors, 主循环, 球员逻辑, 精灵渲染
 *   ✅ bank 30 — system library (jump tables, 乘除, NMI, PPU)
 *   ⏳ bank 02 — NMI renderer (文件已创建, 待完整翻译)
 *   ⏳ bank 01 — match jump + title (文件已创建, 待完整翻译)
 *   ⏳ bank 00 — scene dispatch (部分翻译)
 *   ⏳ bank 03-29 — (待创建)
 */

// ── Boot ──────────────────────────────────
export {
  createTsubasaNES,
  getSystemState,
  NES,
} from './core/boot';
export type {
  TSEngine,
  SystemState,
  NESOptions,
  ControllerId,
  ButtonKey,
} from './core/boot';

// ── Translated Banks ──────────────────────
export {
  translate_BANK31_RESET,
  translate_BANK31_GET_BALL_POS,
  translate_BANK31_PLAYER_LOGIC,
  translate_BANK31_BANK_SWITCH,
  translate_BANK31_JUMP_TABLE_DISPATCH,
  translate_BANK31_POS_UPDATE,
  translate_BANK31_SPRITE_DMA_INIT,
  translate_BANK31_SPRITE_SETUP,
  translate_BANK31_DMA_HELPER,
  translate_BANK31_SPRITE_DRAW,
  translate_BANK31_SPRITE_BANK_LOOP,
  translate_BANK31_BANK_HELPER,
  tick_BANK31_mainLoop,
  init_BANK31_matchEntry,
} from './banks/bank-31';

export {
  bank01_startGame,
  bank01_titleInit,
  bank01_titleProcess,
  bank01_sceneSwitchHelper1,
  bank01_loadSceneData,
  bank01_bytecodeHelper,
  bank01_bytecodeHelper2,
  bank01_auxEntry1,
  bank01_auxEntry2,
  bank01_auxEntry3,
  bank01_auxEntry4,
  bank01_auxEntry5,
  bank01_auxEntry6,
  bank01_auxEntry7,
  bank01_auxEntry8,
  bank01_crossBankEntry,
} from './banks/bank-01';

export {
  bank02_nmiHandler,
  bank02_ppuScrollUpdate,
  bank02_loadSceneData,
  bank02_sceneSwitchHelper,
  bank02_auxEntry1,
  bank02_auxEntry2,
  bank02_auxEntry8,
} from './banks/bank-02';

export {
  rom06, rom06Ptr16, getBank06Data,
} from './banks/bank-06';

export {
  bank12_init, bank12_update, bank12_audioFrame, getBank12Data,
} from './banks/bank-12';

export {
  rom15, rom15Ptr16, getBank15Data,
} from './banks/bank-15';

export {
  bank30_initSystem,
  bank30_initScene,
  bank30_getCharData,
  bank30_multiply,
  bank30_divide,
  bank30_spriteDma,
  bank30_memFill,
  bank30_bankSwitch,
} from './banks/mocks';

export {
  bank00_dispatchScene,
  bank00_execBytecode,
  bank00_tickTimers,
  bank00_waitFrame,
  bank00_register,
} from './banks/bank-00';

export {
  createSystemState,
  writeMem,
  readMem,
  registerBankRom,
} from './banks/system-state';
export type { CpuRegs } from './banks/system-state';

// ── Core Emulator (硬件层, 保留) ───────────
export { default as CPU } from './core/cpu';
export { default as PPU } from './core/ppu/index';
export { default as PAPU } from './core/papu/index';
export { default as Controller } from './core/controller';
export { default as GameGenie } from './core/gamegenie';
export { default as ROM } from './core/rom-loader';
export { default as Tile } from './core/tile';

// ── Data ─────────────────────────────────
export {
  PRG_ROM_BANKS,
  PRG_8K_BANK_COUNT,
  MMC3_INIT_MAP,
  readPrgRom,
} from './data/rom-data';
export {
  CHR_ROM_BANKS,
  CHR_VROM_BANKS,
  CHR_ROM_SIZE,
  CHR_BANK_COUNT,
  CHR_VROM_COUNT,
} from './data/chr-data';

// ── Scene Engine (旧, 待淘汰) ──────────────
export {
  SceneType,
  dispatchScene,
  tickScene,
} from './scene/dispatch';
export type { SceneContext } from './scene/dispatch';
export {
  BytecodeOp,
  createBytecodeContext,
  execBytecode,
} from './scene/bytecode';
export type { BytecodeContext } from './scene/bytecode';
export {
  OPCODE_TABLE,
  dispatchOp,
} from './scene/opcode-table';

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
