/**
 * 比赛配置表 — 原 bank28 比赛配置（声明式表结构）
 *
 * V0.2 从 asm/bank28/*.s 的 .byte 数据提取。当前为默认值占位。
 */
export interface MatchConfigEntry {
  readonly halfLength: number;
  readonly maxSubstitutions: number;
  readonly injuryTime: number;
}

export const DEFAULT_MATCH_CONFIG: MatchConfigEntry = {
  halfLength: 45,
  maxSubstitutions: 2,
  injuryTime: 0,
};

export function getMatchConfig(): MatchConfigEntry {
  return DEFAULT_MATCH_CONFIG;
}
