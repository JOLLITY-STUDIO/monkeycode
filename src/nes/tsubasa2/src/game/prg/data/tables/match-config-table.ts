/**
 * 比赛配置表（声明式表结构）
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