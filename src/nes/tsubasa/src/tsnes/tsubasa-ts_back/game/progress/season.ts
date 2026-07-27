/**
 * 赛季 / 关卡定义 — 游戏具体内容
 *
 * 天使之翼 II 共 4 个赛季（Season），总计 32 关（Stage）：
 *   - 南葛中学 (7关)
 *   - 巴西联赛 (8关)
 *   - 日本杯   (5关)
 *   - 世青赛   (12关)
 */

import type { TeamId } from '../team/team';

// ═══════════════════════════════════════════════════════════════
// § 类型对象
// ═══════════════════════════════════════════════════════════════

/** 赛季 */
export interface Season {
  readonly id: number;
  readonly name: string;
  /** 包含的关卡 ID 范围 */
  readonly stages: readonly number[];
}

/** 关卡 */
export interface Stage {
  readonly id: number;
  readonly seasonId: number;
  /** 关卡名称 */
  readonly name: string;
  /** 对手队伍（可能为 null，如剧情关） */
  readonly opponentTeam: TeamId | null;
}

// ═══════════════════════════════════════════════════════════════
// § 数据
// ═══════════════════════════════════════════════════════════════

export const SEASONS: Record<number, Season> = {
  0: { id: 0, name: '南葛中学',   stages: [1, 2, 3, 4, 5, 6, 7] },
  1: { id: 1, name: '巴西联赛',   stages: [8, 9, 10, 11, 12, 13, 14, 15] },
  2: { id: 2, name: '日本杯',     stages: [16, 17, 18, 19, 20] },
  3: { id: 3, name: '世青赛',     stages: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32] },
};

/** 全部 32 关占位 — 对手等详细数据后续从 ROM 反推 */
export const STAGES: Record<number, Stage> = {};

for (const s of Object.values(SEASONS)) {
  for (const sid of s.stages) {
    STAGES[sid] = { id: sid, seasonId: s.id, name: `${s.name} #${sid}`, opponentTeam: null };
  }
}

/** 总关卡数 */
export const TOTAL_STAGES = 32;
