/**
 * NameTable Viewer — 参照 FCEUX NameTableViewer (src/drivers/Qt/NameTableViewer.cpp)
 *
 * 显示 4 个 nametable 的内容，包含：
 * - 32×30 tiles 用实际调色板渲染 (256×240 像素/nametable)
 * - 滚动位置指示线
 * - 属性表可视化
 */
import type NES from '../nes';
/** 渲染一帧 nametable 的图像数据 */
export interface NameTableFrame {
    /** RGBA 像素 (256 × 240) */
    data: Uint32Array;
    width: number;
    height: number;
}
export interface ScrollState {
    x: number;
    y: number;
    /** 写入发生时的 NES 可见 scanline，-1 表示在 VBlank 期间写入 */
    scanline: number;
    /** 来源：'$2005' 或 '$2006' */
    source: string;
}
export interface NameTableAllFrames {
    /** 4 个 nametable (0=0x2000, 1=0x2400, 2=0x2800, 3=0x2C00) */
    nt: [NameTableFrame, NameTableFrame, NameTableFrame, NameTableFrame];
    /** 逻辑地址到物理 nametable 的映射 (ntable1) */
    mapping: [number, number, number, number];
    /** 当前滚动位置（主视口用） */
    scrollX: number;
    scrollY: number;
    /** 最后 $2005 写入的原始滚动值（调试用） */
    rawScrollX: number;
    rawScrollY: number;
    /** 是否从 lastScrollWrite 取值 */
    fromScrollWrite: boolean;
    /** 本帧所有完整的 $2005 滚动写入对，用于 split-screen 调试 */
    scrolls: ScrollState[];
}
/**
 * 渲染单个 NameTable
 *
 * 策略:
 * 1. 优先从 PPU 已渲染好的背景帧 (bgbuffer) 取该 tile 在当前帧实际被画出的像素。
 *    这能正确处理 MMC3/动态 CHR bank 切换：同一帧不同 scanline 可能用不同 bank。
 * 2. 若该 tile 当前帧不在可视区域内，用 PPU 逐 scanline 录制的 CHR bank 快照，
 *    从 ROM vromTile 查找对应 scanline 的正确 tile 数据。
 * 3. 两者都不通 → 品红棋盘标记。
 */
export declare function renderNameTable(nes: NES, ntIndex: number, scrollX: number, scrollY: number): NameTableFrame;
/**
 * 渲染所有 4 个 nametable + 滚动位置标记
 */
export declare function renderAllNameTables(nes: NES): NameTableAllFrames;
