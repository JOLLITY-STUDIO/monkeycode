/**
 * StatusPanel — 比賽資訊面板
 *
 * 螢幕頂端顯示的比賽狀態：
 *   - 比分（主隊 : 客隊）
 *   - 比賽時間（倒計時）
 *   - 控球指示器
 *
 * 具體 tile 字型和佈局，待從 ROM CHR 解析後補齊。
 */

// ============================================================
// §1 面板數據介面
// ============================================================

export interface StatusData {
  /** 主隊名稱（字串或 tile 列表） */
  homeName: string;
  /** 客隊名稱 */
  awayName: string;
  /** 主隊比分 */
  scoreHome: number;
  /** 客隊比分 */
  scoreAway: number;
  /** 當前時間（秒，顯示為 mm:ss） */
  gameTime: number;
  /** 階段描述 */
  phaseLabel: string;
  /** 控球方（0 = 主隊, 1 = 客隊） */
  possession: number;
}

// ============================================================
// §2 佈局常量
// ============================================================

/** 比分面板 Y 座標（tile 行） */
export const STATUS_ROW = 0;
/** 比分面板高度（tile 行） */
export const STATUS_HEIGHT = 2;
/** 面板下方球場起始行 */
export const FIELD_START_ROW = STATUS_HEIGHT;

// ============================================================
// §3 面板數據工廠
// ============================================================

/** 從比賽快照生成狀態面板數據 */
export function buildStatusData(
  homeName: string,
  awayName: string,
  scoreHome: number,
  scoreAway: number,
  gameTime: number,
  phaseLabel: string,
  possession: number,
): StatusData {
  return {
    homeName,
    awayName,
    scoreHome,
    scoreAway,
    gameTime,
    phaseLabel,
    possession,
  };
}
