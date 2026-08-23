/**
 * 比赛配置表 — 原 bank26/bank28 比赛配置（声明式表结构）
 *
 * bank26 $8277 区域：球员交换表（ram_0601+/0606+/060B+ 系列）。
 * bank28 data_tables：比赛配置数据（半场时长/换人/伤病时间）。
 *
 * 当前为默认值占位，逐段提取覆盖。
 */
export interface MatchConfigEntry {
  readonly halfLength: number;
  readonly maxSubstitutions: number;
  readonly injuryTime: number;
  readonly durationMinutes: number;
}

export const DEFAULT_MATCH_CONFIG: MatchConfigEntry = {
  halfLength: 45,
  maxSubstitutions: 2,
  injuryTime: 0,
  durationMinutes: 45,
};

/** 比赛配置表（按队伍对阵索引） */
export const MATCH_CONFIG_TABLE: ReadonlyArray<MatchConfigEntry> = [
  DEFAULT_MATCH_CONFIG,
];

export function getMatchConfig(homeTeam: number = 0, awayTeam: number = 0): MatchConfigEntry {
  void homeTeam;
  void awayTeam;
  return DEFAULT_MATCH_CONFIG;
}
