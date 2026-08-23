/**
 * Pattern Table Viewer — 参照 FCEUX ppuViewer (src/drivers/Qt/ppuViewer.cpp)
 *
 * 显示两个图案表 (CHR-ROM / CHR-RAM)，每个 128×128 像素 (16×16 tiles)
 * 支持多种调色板选择查看
 */
import type NES from '../nes';
export interface PatternTableFrame {
    data: Uint32Array;
    width: number;
    height: number;
}
export interface PatternTableResult {
    /** 图案表 0 ($0000-$0FFF): tiles 0-255 */
    table0: PatternTableFrame;
    /** 图案表 1 ($1000-$1FFF): tiles 256-511 */
    table1: PatternTableFrame;
    /** 当前背景图案表选择位 */
    bgTable: 0 | 1;
    /** 当前精灵图案表选择位 */
    spTable: 0 | 1;
}
/**
 * 渲染单个图案表
 * 参照 FCEUX ppuPatternView_t::paintEvent():
 * - 16×16 tiles 排列
 * - 每个 tile 8×8 pixels → 128×128 总大小
 * - 用指定的调色板 (前 4 色)
 *
 * @param nes - NES 实例
 * @param tableIdx - 0 (tiles 0-255) 或 1 (tiles 256-511)
 * @param paletteOffset - 使用的调色板偏移 (0-3, 对应 4 色组)
 * @param paletteSrc - 自定义调色板 (256 色)，不传则使用 imgPalette
 */
export declare function renderPatternTable(nes: NES, tableIdx: number, paletteOffset?: number, paletteSrc?: Uint32Array): PatternTableFrame;
/**
 * 渲染两个图案表 (参照 FCEUX 同时显示两种表)
 * @param palT0 - table0 的自定义调色板，不传则用 imgPalette
 * @param palT1 - table1 的自定义调色板，不传则用 imgPalette
 */
export declare function renderBothPatternTables(nes: NES, paletteOffset?: number, palT0?: Uint32Array, palT1?: Uint32Array): PatternTableResult;
/**
 * 生成 PT 数据文本：
 * - 两个 Pattern Table (16×16 tiles) 的 CHR 内容状态 + CHR bank 映射
 * - 格式参照 generateSPTDataText，额外加上每 1KB slot 对应的 CHR bank index
 */
export declare function generatePTDataText(nes: NES, frameCount?: number): string;
