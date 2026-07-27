/**
 * BG — 背景捲動管理器
 *
 * 管理球場背景的 nametable 寫入與捲軸偏移。
 * 對接 core/ppu.js 的 scroll 寄存器與 core/nametable.js 的 tile 寫入。
 *
 * 球場背景在 ROM 中的來源：
 *   - CHR bank → 球場 tile 圖形
 *   - PRG data bank → nametable 佈局數據
 *   - PPU scroll → 鏡頭跟隨
 */

// ============================================================
// §1 背景層狀態
// ============================================================

/** 球場背景層狀態 */
export interface BgState {
  /** 水平捲軸偏移（像素，0-511） */
  scrollX: number;
  /** 垂直捲軸偏移（像素，0-239） */
  scrollY: number;
  /** 背景亮度（0-7，PPU mask 控制） */
  brightness: number;
  /** 是否啟用背景渲染 */
  enabled: boolean;
  /** 當前使用哪個 nametable 作為主要顯示（0-3） */
  activeNt: number;
  /** 球場 metadata（tile 起始索引等，後續從 ROM data bank 補齊） */
  pitchTileBase: number;
  pitchAttrBase: number;
}

/** 創建默認背景狀態 */
export function createBgState(): BgState {
  return {
    scrollX: 0,
    scrollY: 0,
    brightness: 7,
    enabled: true,
    activeNt: 0,
    pitchTileBase: 0,
    pitchAttrBase: 0,
  };
}

// ============================================================
// §2 鏡頭控制
// ============================================================

/** 鏡頭跟隨目標 */
export interface CameraTarget {
  /** 球場 X 座標 */
  x: number;
  /** 球場 Y 座標 */
  y: number;
}

/** 可視範圍常量 */
export const VIEWPORT_W = 256;
export const VIEWPORT_H = 240;

/** 根據目標球場座標計算理想捲軸偏移 */
export function calcScroll(fieldW: number, fieldH: number, target: CameraTarget): { scrollX: number; scrollY: number } {
  const sx = Math.max(0, Math.min(fieldW - VIEWPORT_W, Math.floor(target.x - VIEWPORT_W / 2)));
  const sy = Math.max(0, Math.min(fieldH - VIEWPORT_H, Math.floor(target.y - VIEWPORT_H / 2)));
  return { scrollX: sx, scrollY: sy };
}

// ============================================================
// §3 視窗座標轉換
// ============================================================

/** 球場座標 → 螢幕座標 */
export function fieldToScreen(fieldX: number, fieldY: number, scrollX: number, scrollY: number): { sx: number; sy: number } {
  return {
    sx: fieldX - scrollX,
    sy: fieldY - scrollY,
  };
}

/** 是否在螢幕可視範圍內 */
export function isVisible(fieldX: number, fieldY: number, scrollX: number, scrollY: number, margin: number = 16): boolean {
  const { sx, sy } = fieldToScreen(fieldX, fieldY, scrollX, scrollY);
  return sx >= -margin && sx < VIEWPORT_W + margin && sy >= -margin && sy < VIEWPORT_H + margin;
}
