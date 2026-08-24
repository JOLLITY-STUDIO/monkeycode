/**
 * 比赛配置表 — 具象化契约
 *
 * 数据来源（声明式，迁移完成后即可生效）：
 *   - bank06 $B0xx 系列字节（半时长度、替补数）
 *   - bank19 $8050 area（对阵配置）
 *
 * 替换实现策略：
 *   - 索引键 = (homeTeam, awayTeam) 二元组（captain tsubasa 固定 22 队联赛）
 *   - 每条 MatchConfigEntry 声明式字段，无 lo/hi 拆字节、无 ROM 地址字面量
 *   - 未注册对阵 → 返回 DEFAULT_MATCH_CONFIG（不让调用方 null 判断）
 *
 * 历史：原 stub 用单一 DEFAULT；现版本按 (home, away) 二元查表，未注册的也走 DEFAULT。
 */

export interface MatchConfigEntry {
  /** 半时长度（分钟） */
  readonly halfLength: number;
  /** 最多替补数 */
  readonly maxSubstitutions: number;
  /** 伤停补时（分钟） */
  readonly injuryTime: number;
  /** 全场目标分钟数（halfLength + injuryTime） */
  readonly durationMinutes: number;
  /** 是否加时赛 */
  readonly extraTime: boolean;
}

/** 默认比赛配置（未注册对阵 fallback） */
export const DEFAULT_MATCH_CONFIG: MatchConfigEntry = {
  halfLength: 45,
  maxSubstitutions: 2,
  injuryTime: 0,
  durationMinutes: 45,
  extraTime: false,
};

/** 比赛配置表（按 [homeTeam, awayTeam] 二元组索引；声明式数据迁移后填充） */
export const MATCH_CONFIG_TABLE: ReadonlyArray<MatchConfigEntry & { readonly homeTeam: number; readonly awayTeam: number }> = [
  // 数据项由 V0.5 从 bank06/bank19 提取覆盖
];

/**
 * 查表：按 (homeTeam, awayTeam) 取比赛配置
 * 未注册 → 返回 DEFAULT_MATCH_CONFIG
 */
export function getMatchConfig(homeTeam: number = 0, awayTeam: number = 0): MatchConfigEntry {
  for (const e of MATCH_CONFIG_TABLE) {
    if (e.homeTeam === (homeTeam & 0xff) && e.awayTeam === (awayTeam & 0xff)) return e;
  }
  return DEFAULT_MATCH_CONFIG;
}
