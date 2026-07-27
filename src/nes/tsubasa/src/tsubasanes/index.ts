// ============================================================================
// index.ts — tsubasanes 公共 API
//
// 纯 TS + Canvas 游戏引擎，去掉 CPU/解析层。
// ROM 数据已完全语义化为对象和函数调用，无需 bank/二进制概念。
// ============================================================================

// ── 启动 ──
export { boot, stepScene } from './boot';

// ── 引擎 ──
export { Engine, type EngineConfig } from './engine';

// ── PPU / 渲染 ──
export { Ppu, NES_PALETTE } from './ppu/ppu';
export { renderToCanvas, clearCanvas, type CanvasContext, type WechatCanvasContext } from './ppu/renderer';

// ── 核心基础设施 ──
export { wram, sram, oamBuf, zp, read, write, clear } from './core/memory';
export { createMmc3, initDefault, mmc3Write, getPrgBankIdx, type Mmc3State } from './core/mmc3';
export { createJoypad, readJoy1, writeJoyStrobe, setJoyMask, bindKeyboard, type JoypadState } from './core/input';

// ── 场景系统 ──
export { Scene, SCENE_NAMES, SceneState, SceneId, NO_INPUT, type JoypadInput } from './scene/types';
export { SceneManager, getSceneManager, resetSceneManager } from './scene/manager';
export { OpeningScene } from './scene/opening';
export { TitleScene } from './scene/title';
export { BytecodeInterpreter, OPCODE, createBytecodeState, type BytecodeState, type ScriptEntry } from './scene/bytecode';
export { PROGRESS_TABLE_1, PROGRESS_TABLE_2, PROGRESS_TABLE_3, PROGRESS_TABLE_4, SCENE_TRANSITION_TABLE, queryProgress, getSceneTransition, loadSceneScripts, type ProgressResult } from './scene/progress';

// ── 配置 ──
export * as Config from './config';

// ── 常量 ──
export * as Const from './constants';
