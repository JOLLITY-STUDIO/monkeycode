/**
 * MatchField — 球場渲染層
 *
 * 管理球場畫面繪製：
 *   - 底層綠色草地 / 紋理（nametable tile 寫入）
 *   - 場上標記線（邊線、中線、中圈、禁區、球門）
 *   - 比分面板疊加
 *
 * 對接：
 *   - core/nametable.js — tile 寫入 API
 *   - core/ppu.js — scroll 寄存器
 *   - core/chr.js — tile 圖形來源
 *
 * 具體 tile 索引和佈局數據，待從 ROM CHR/PRG data bank 解析後補齊。
 */

// ============================================================
// §1 球場邏輯尺寸
// ============================================================

/** 球場寬度（像素） */
export const FIELD_W = 512;
/** 球場高度（像素） */
export const FIELD_H = 240;

// ============================================================
// §2 球場區域枚舉
// ============================================================

/** 球場功能區域 */
export enum FieldZone {
  /** 主隊禁區 */
  HOME_BOX    = 0,
  /** 客隊禁區 */
  AWAY_BOX    = 1,
  /** 中圈 */
  CENTER_CIRCLE = 2,
  /** 主隊半場 */
  HOME_HALF   = 3,
  /** 客隊半場 */
  AWAY_HALF   = 4,
  /** 邊界外 */
  OUT_OF_BOUNDS = 5,
}

/** 給定座標判斷所屬區域 */
export function getZone(x: number, y: number): FieldZone {
  if (x < 0 || y < 0 || x >= FIELD_W || y >= FIELD_H) return FieldZone.OUT_OF_BOUNDS;
  const cx = Math.floor(FIELD_W / 2);
  const cy = Math.floor(FIELD_H / 2);
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist <= 48) return FieldZone.CENTER_CIRCLE;
  // 禁區約 80x32
  if (y >= FIELD_H - 32 && x >= cx - 40 && x <= cx + 40) return FieldZone.HOME_BOX;
  if (y <= 32 && x >= cx - 40 && x <= cx + 40) return FieldZone.AWAY_BOX;
  return y >= cy ? FieldZone.HOME_HALF : FieldZone.AWAY_HALF;
}

// ============================================================
// §3 渲染介面（骨架）
// ============================================================

export interface MatchFieldSetup {
  /** CHR tile 起始索引（球場草地 tile） */
  grassTileBase: number;
  /** 邊線 tile */
  lineTileH: number;
  lineTileV: number;
  /** 角旗 tile */
  cornerTile: number;
  /** 球門 tile */
  goalTile: number;
  /** 調色板索引（0-3） */
  palette: number;
}

/** 默認 tile 佈局（待 ROM 分析後校準） */
export const DEFAULT_FIELD_SETUP: MatchFieldSetup = {
  grassTileBase: 0,
  lineTileH: 1,
  lineTileV: 2,
  cornerTile: 3,
  goalTile: 4,
  palette: 0,
};
