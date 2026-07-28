/**
 * game-engine — Tsubasa NES Emulation Engine 总入口
 *
 * ═══════════════════════════════════════════
 * 目录映射（新结构 → 原始代码）
 * ═══════════════════════════════════════════
 *
 * core/    ← src/                     CPU/PPU/APU/mapper 核心模拟器
 * data/    ← tsubasa-hex2asm/         ROM 数据层（PRG + CHR bank）
 * scene/   ← prg_bank_00_dispatch_   场景引擎语义翻译
 * render/  ← 渲染层                    Canvas/ImageData 画面输出
 * adapters/ ← 平台适配器              微信小程序 / Web 浏览器
 *
 * ═══════════════════════════════════════════
 * 启动流程
 * ═══════════════════════════════════════════
 *
 * const nes = createTsubasaNES({ onFrame: renderToCanvas });
 * const adapter = new WebAdapter(canvas);
 * setInterval(() => {
 *   nes.frame();
 *   adapter.renderFrame(nes.ppu);
 * }, 1000 / 60);
 *
 * ═══════════════════════════════════════════
 */

// ── Boot ──────────────────────────────────
export {
  createTsubasaNES,
  NES,
  type NESOptions,
  type ControllerId,
  type ButtonKey,
} from './core/boot';

// ── Core Emulator ─────────────────────────
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

// ── Scene Engine ──────────────────────────
export {
  SceneType,
  dispatchScene,
  tickScene,
  type SceneContext,
} from './scene/dispatch';
export {
  BytecodeOp,
  createBytecodeContext,
  execBytecode,
  type BytecodeContext,
} from './scene/bytecode';
export {
  OPCODE_TABLE,
  dispatchOp,
} from './scene/opcode-table';

// ── Render ────────────────────────────────
export {
  createRenderTarget,
  renderFrame,
  resizeCanvas,
  type RenderTarget,
} from './render/canvas-renderer';

// ── Platform Adapters ─────────────────────
export { MpAdapter } from './adapters/mp-adapter';
export { WebAdapter } from './adapters/web-adapter';
