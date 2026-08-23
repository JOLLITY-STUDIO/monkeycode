/**
 * Sprite Viewer — 参照 FCEUX ppuViewer 的 oamPatternView / sprite 面板
 *
 * 显示 OAM 中所有 64 个精灵 (8×8 或 8×16) 的当前图案+调色板+位置
 */
import type NES from '../nes';
export interface SpriteEntry {
    /** OAM 索引 (0–63) */
    index: number;
    /** X 坐标 */
    x: number;
    /** Y 坐标 */
    y: number;
    /** 图案表 tile 索引 */
    tileIndex: number;
    /** 调色板偏移 (0/4/8/12, 与 PPU sprCol 一致) */
    palette: number;
    /** 水平翻转 */
    flipH: boolean;
    /** 垂直翻转 */
    flipV: boolean;
    /** 背景优先级 (0=在前面) */
    bgPriority: boolean;
    /** 精灵像素数据 (8 or 16 × 8 pixels) — RGBA */
    image: Uint32Array;
    /** 图像宽度 */
    imgWidth: number;
    /** 图像高度 */
    imgHeight: number;
}
export interface SpriteViewerData {
    sprites: SpriteEntry[];
    /** 精灵尺寸模式 */
    is8x16: boolean;
    /** 精灵图案表选择 */
    spTable: 0 | 1;
}
/**
 * 读取所有精灵数据
 */
export declare function getSpriteData(nes: NES): SpriteViewerData;
