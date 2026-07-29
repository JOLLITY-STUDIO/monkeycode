/**
 * Debug Plugin System for tsnes
 *
 * 参照 FCEUX Debug 菜单工具，提供：
 * - Disassembler (反汇编)
 * - NameTable Viewer (名称表查看器)
 * - Pattern Table Viewer (图案表查看器)
 * - Sprite Viewer (精灵查看器)
 * - Palette Viewer (调色板查看器)
 *
 * 用法:
 *   import { debugHooks, disassemble, renderAllNameTables, ... } from './debug';
 *
 *   // 挂载 debug hook 系统
 *   debugHooks.attach(nes);
 *
 *   // 读取数据 (可随时调用，不依赖 hooks)
 *   const nts = renderAllNameTables(nes);
 *   const sprites = getSpriteData(nes);
 */

export { debugHooks, DebugHookManager } from './hooks';
export type { DebugInstrInfo, PostInstrHook, FrameHook } from './hooks';

export { disassemble, disassembleRange, flagsToString } from './disasm';
export type { AsmEntry } from './disasm';

export { renderNameTable, renderAllNameTables } from './nametable-viewer';
export type { NameTableFrame, NameTableAllFrames } from './nametable-viewer';

export { renderPatternTable, renderBothPatternTables } from './pattern-table-viewer';
export type { PatternTableFrame, PatternTableResult } from './pattern-table-viewer';

export { getSpriteData } from './sprite-viewer';
export type { SpriteEntry, SpriteViewerData } from './sprite-viewer';

export { getPaletteData, renderPaletteImage } from './palette-viewer';
export type { PaletteViewerData } from './palette-viewer';
