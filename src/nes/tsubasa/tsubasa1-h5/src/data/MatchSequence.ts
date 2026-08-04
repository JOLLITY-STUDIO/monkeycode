/**
 * 比赛序列数据
 *
 * ⚠️ TODO: 比赛序列需要从 ROM Bank 3 中实际提取。
 * ROM 中的比赛序列由 Bank 3 的数据表和 Bank 7 的脚本引擎控制。
 *
 * 分析要点:
 *   - ROM 中 State 分发器 ($81F7) 有 state 0-7 的状态机
 *   - State 3 = 队员选择, State 4 = 比赛, State 5 = 比赛事件
 *   - 对手数据在 Bank 3 的表格中
 *   - 比赛流程由 Bank 7 脚本引擎驱动
 */

/** 单场比赛定义 */
export interface MatchConfig {
  matchNumber: number;
  /** TODO: 从 ROM 提取真实对手名 */
  opponentName: string;
  /** TODO: 从 ROM 提取真实对手ID */
  opponentId: number;
  playerTeamName: string;
  /** TODO: 从 ROM 确定实际比赛阶段分类 */
  phase: string;
}

/**
 * ⚠️ 占位：比赛序列
 * TODO: 从 ROM Bank 3 数据表提取真实比赛序列
 *
 * 已知 ROM State 结构:
 *   State 0: 初始化/标题
 *   State 1: 标题画面等待
 *   State 2: 菜单选择 (START / CONTINUE)
 *   State 3: 队员选择/阵型 (固定南葛队)
 *   State 4: 比赛主循环
 *   State 5: 比赛事件处理
 *   State 6: 过渡动画
 *   State 7: 结果画面
 */
export const FULL_MATCH_SEQUENCE: MatchConfig[] = [
  // TODO: 从 ROM Bank 3 中提取真实比赛序列
];

export const TOTAL_MATCHES = FULL_MATCH_SEQUENCE.length;

export function getMatchConfig(matchNumber: number): MatchConfig | null {
  return FULL_MATCH_SEQUENCE.find(m => m.matchNumber === matchNumber) || null;
}
