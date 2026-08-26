/**
 * Debug Plugin System for tsnes
 *
 * 参照 FCEUX Debug 菜单工具，提供：
 * - Disassembler (反汇编)
 * - NameTable Viewer (名称表查看器)
 * - Pattern Table Viewer (图案表查看器)
 * - Sprite Viewer (精灵查看器)
 * - Palette Viewer (调色板查看器)
 * - Text Generators (文本数据生成器)
 * - Debug Canvas (canvas 工具)
 * - Debug Panel (综合调试面板编排器)
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
export { disassemble, disassembleRange, flagsToString } from './disasm';
export { renderNameTable, renderAllNameTables } from './nametable-viewer';
export { renderPatternTable, renderBothPatternTables, generatePTDataText } from './pattern-table-viewer';
export { getSpriteData } from './sprite-viewer';
export { getPaletteData, renderPaletteImage } from './palette-viewer';
// ── Text Generators ──
export { generateNTDataText, generateSPOAMDataText, generateSPTDataText } from './text-generator';
// ── Debug Canvas ──
export { DebugCanvasManager, makeGameSlot, renderGameSlot } from './debug-canvas';
// ── Debug Panel ──
export { DebugPanel } from './debug-panel';
