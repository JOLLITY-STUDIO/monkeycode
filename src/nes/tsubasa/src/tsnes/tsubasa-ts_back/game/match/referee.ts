/**
 * Referee — 比賽規則判定
 *
 * 判定比賽事件：
 *   - 進球、出界、犯規
 *   - 角球、球門球、界外球
 *   - 越位
 *   - 比賽結束條件
 *
 * 具體規則和閾值，待從 ROM 比賽 bank 解析後補齊。
 */

// ============================================================
// §1 判定事件枚舉
// ============================================================

export enum RefereeEvent {
  /** 無事件 */
  NONE          = 0,
  /** 進球（主隊） */
  GOAL_HOME     = 1,
  /** 進球（客隊） */
  GOAL_AWAY     = 2,
  /** 球出底線（主隊球門球） */
  GOAL_KICK_HOME = 3,
  /** 球出底線（客隊球門球） */
  GOAL_KICK_AWAY = 4,
  /** 角球 */
  CORNER_KICK   = 5,
  /** 界外球 */
  THROW_IN      = 6,
  /** 半場結束 */
  HALFTIME_END  = 7,
  /** 全場結束 */
  FULLTIME_END  = 8,
}

// ============================================================
// §2 球門區域常量
// ============================================================

/** 主隊球門左邊界 X */
export const GOAL_HOME_LEFT  = 232;
/** 主隊球門右邊界 X */
export const GOAL_HOME_RIGHT = 280;
/** 主隊球門上邊界 Y */
export const GOAL_HOME_TOP   = 240;
/** 主隊球門下邊界 Y（即底線） */
export const GOAL_HOME_BOTTOM = 240;

/** 客隊球門左邊界 X */
export const GOAL_AWAY_LEFT  = 232;
/** 客隊球門右邊界 X */
export const GOAL_AWAY_RIGHT = 280;
/** 客隊球門上邊界 Y（即底線） */
export const GOAL_AWAY_TOP    = 0;
/** 客隊球門下邊界 Y */
export const GOAL_AWAY_BOTTOM = 0;

// ============================================================
// §3 判定函數（骨架）
// ============================================================

/**
 * 判定球是否過線（主隊球門方向，球進入客隊半場底線）
 * 待從 ROM 確認確切的觸發條件
 */
export function checkGoalHome(ballX: number, ballY: number): boolean {
  return ballY <= 0 &&
    ballX >= GOAL_AWAY_LEFT &&
    ballX <= GOAL_AWAY_RIGHT;
}

export function checkGoalAway(ballX: number, ballY: number): boolean {
  return ballY >= 240 &&
    ballX >= GOAL_HOME_LEFT &&
    ballX <= GOAL_HOME_RIGHT;
}
