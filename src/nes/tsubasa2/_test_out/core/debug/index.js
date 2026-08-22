"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugPanel = exports.renderGameSlot = exports.makeGameSlot = exports.DebugCanvasManager = exports.generateSPTDataText = exports.generateSPOAMDataText = exports.generateNTDataText = exports.renderPaletteImage = exports.getPaletteData = exports.getSpriteData = exports.generatePTDataText = exports.renderBothPatternTables = exports.renderPatternTable = exports.renderAllNameTables = exports.renderNameTable = exports.flagsToString = exports.disassembleRange = exports.disassemble = exports.DebugHookManager = exports.debugHooks = void 0;
var hooks_1 = require("./hooks");
Object.defineProperty(exports, "debugHooks", { enumerable: true, get: function () { return hooks_1.debugHooks; } });
Object.defineProperty(exports, "DebugHookManager", { enumerable: true, get: function () { return hooks_1.DebugHookManager; } });
var disasm_1 = require("./disasm");
Object.defineProperty(exports, "disassemble", { enumerable: true, get: function () { return disasm_1.disassemble; } });
Object.defineProperty(exports, "disassembleRange", { enumerable: true, get: function () { return disasm_1.disassembleRange; } });
Object.defineProperty(exports, "flagsToString", { enumerable: true, get: function () { return disasm_1.flagsToString; } });
var nametable_viewer_1 = require("./nametable-viewer");
Object.defineProperty(exports, "renderNameTable", { enumerable: true, get: function () { return nametable_viewer_1.renderNameTable; } });
Object.defineProperty(exports, "renderAllNameTables", { enumerable: true, get: function () { return nametable_viewer_1.renderAllNameTables; } });
var pattern_table_viewer_1 = require("./pattern-table-viewer");
Object.defineProperty(exports, "renderPatternTable", { enumerable: true, get: function () { return pattern_table_viewer_1.renderPatternTable; } });
Object.defineProperty(exports, "renderBothPatternTables", { enumerable: true, get: function () { return pattern_table_viewer_1.renderBothPatternTables; } });
Object.defineProperty(exports, "generatePTDataText", { enumerable: true, get: function () { return pattern_table_viewer_1.generatePTDataText; } });
var sprite_viewer_1 = require("./sprite-viewer");
Object.defineProperty(exports, "getSpriteData", { enumerable: true, get: function () { return sprite_viewer_1.getSpriteData; } });
var palette_viewer_1 = require("./palette-viewer");
Object.defineProperty(exports, "getPaletteData", { enumerable: true, get: function () { return palette_viewer_1.getPaletteData; } });
Object.defineProperty(exports, "renderPaletteImage", { enumerable: true, get: function () { return palette_viewer_1.renderPaletteImage; } });
// ── Text Generators ──
var text_generator_1 = require("./text-generator");
Object.defineProperty(exports, "generateNTDataText", { enumerable: true, get: function () { return text_generator_1.generateNTDataText; } });
Object.defineProperty(exports, "generateSPOAMDataText", { enumerable: true, get: function () { return text_generator_1.generateSPOAMDataText; } });
Object.defineProperty(exports, "generateSPTDataText", { enumerable: true, get: function () { return text_generator_1.generateSPTDataText; } });
// ── Debug Canvas ──
var debug_canvas_1 = require("./debug-canvas");
Object.defineProperty(exports, "DebugCanvasManager", { enumerable: true, get: function () { return debug_canvas_1.DebugCanvasManager; } });
Object.defineProperty(exports, "makeGameSlot", { enumerable: true, get: function () { return debug_canvas_1.makeGameSlot; } });
Object.defineProperty(exports, "renderGameSlot", { enumerable: true, get: function () { return debug_canvas_1.renderGameSlot; } });
// ── Debug Panel ──
var debug_panel_1 = require("./debug-panel");
Object.defineProperty(exports, "DebugPanel", { enumerable: true, get: function () { return debug_panel_1.DebugPanel; } });
