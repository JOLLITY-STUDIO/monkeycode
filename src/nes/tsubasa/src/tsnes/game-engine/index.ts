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
} from './banks/bank-30';

export {
  bank00_dispatchScene,
  bank00_execBytecode,
  bank00_tickTimers,
  bank00_waitFrame,
  bank00_register,
} from './banks/bank-00';

// ── DATA Banks (纯 ROM 数据, 自动注册) ──
// These banks register their 8KB ROM on import via registerBankRom().
// Re-exported so the module loader ensures registration occurs.
export { rom03, rom03Ptr16, getBank03Data } from './banks/bank-03';
export { rom04, rom04Ptr16, getBank04Data } from './banks/bank-04';
export { rom05, rom05Ptr16, getBank05Data } from './banks/bank-05';
export { rom07, rom07Ptr16, getBank07Data } from './banks/bank-07';
export { rom08, rom08Ptr16, getBank08Data } from './banks/bank-08';
export { rom09, rom09Ptr16, getBank09Data } from './banks/bank-09';
export { rom10, rom10Ptr16, getBank10Data } from './banks/bank-10';
export { rom13, rom13Ptr16, getBank13Data } from './banks/bank-13';
export { rom14, rom14Ptr16, getBank14Data } from './banks/bank-14';
export { rom17, rom17Ptr16, getBank17Data } from './banks/bank-17';
export { rom18, rom18Ptr16, getBank18Data } from './banks/bank-18';
export { rom21, rom21Ptr16, getBank21Data } from './banks/bank-21';
export { rom23, rom23Ptr16, getBank23Data } from './banks/bank-23';
export { rom25, rom25Ptr16, getBank25Data } from './banks/bank-25';
export { rom29, rom29Ptr16, getBank29Data } from './banks/bank-29';

// ── CODE Bank Skeletons (ROM 注册 + entry stubs) ──
export { bank11_dispatch, bank11_init, bank11_scrollUpdate, bank11_tileWrite, bank11_attrSetup } from './banks/bank-11';
export { bank16_dispatch, bank16_dispatchEntry, bank16_sceneTick } from './banks/bank-16';
export { bank19_dispatch, bank19_entry } from './banks/bank-19';
export { bank20_dispatch, bank20_teamSelectInit, bank20_playerDataLoad, bank20_rosterUpdate, bank20_formationSetup, bank20_menuHandler } from './banks/bank-20';
export { bank22_dispatch, bank22_spriteConvert } from './banks/bank-22';
export { bank24_dispatch, bank24_sceneStateMachine, bank24_sceneTick, bank24_sceneDataLoad, bank24_sceneRender, bank24_auxHelper } from './banks/bank-24';
export { bank26_dispatch, bank26_matchInit, bank26_playerAI, bank26_ballPhysics, bank26_collision, bank26_playerState, bank26_teamLogic, bank26_goalCheck, bank26_eventHandler, bank26_dataQuery, bank26_matchFlow, bank26_sceneTransition } from './banks/bank-26';
export { bank27_dispatch, bank27_entry } from './banks/bank-27';
export { bank28_dispatch, bank28_entry } from './banks/bank-28';

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
