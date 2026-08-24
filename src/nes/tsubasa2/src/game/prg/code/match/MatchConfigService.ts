/**
 * MatchConfigService — 比赛配置（V0.5 真实实现）
 *
 * 行为翻译：
 * - halfLength/maxSubstitutions/injuryTime 全查 MATCH_CONFIG_TABLE
 * - getConfig(home, away) 提供给 MatchEngineService.startMatch 用
 * - getTournament(home, away) 查赛事类型
 *
 * 配置数据已从真 ROM 提取（5 大赛事：SaoPaulo/Nankatsu/JapanCup/WorldCup/AsianCup）。
 */
import type { DataStore } from '../../data/store/DataStore';
import { getMatchConfig, DEFAULT_MATCH_CONFIG, type MatchConfigEntry } from '../../data/tables/match-config-table';

export class MatchConfigService {
  constructor(readonly store: DataStore) {}

  /** 取比赛配置（按双方队 ID 查表） */
  getConfig(homeTeam: number, awayTeam: number): MatchConfigEntry {
    return getMatchConfig(homeTeam, awayTeam);
  }

  /** 半时长度（分钟，按双方队查表） */
  halfLength(homeTeam: number = 0, awayTeam: number = 0): number {
    return this.getConfig(homeTeam, awayTeam).halfLength;
  }

  /** 换人名额 */
  maxSubstitutions(homeTeam: number = 0, awayTeam: number = 0): number {
    return this.getConfig(homeTeam, awayTeam).maxSubstitutions;
  }

  /** 伤停补时（分钟） */
  injuryTime(homeTeam: number = 0, awayTeam: number = 0): number {
    return this.getConfig(homeTeam, awayTeam).injuryTime;
  }

  /** 全场分钟数（halfLength * 2 + injuryTime） */
  totalMinutes(homeTeam: number = 0, awayTeam: number = 0): number {
    const c = this.getConfig(homeTeam, awayTeam);
    return c.durationMinutes;
  }

  /** 赛事类型查询 */
  getTournament(homeTeam: number, awayTeam: number): MatchConfigEntry['tournament'] {
    return this.getConfig(homeTeam, awayTeam).tournament;
  }

  /** 是否加时赛 */
  hasExtraTime(homeTeam: number = 0, awayTeam: number = 0): boolean {
    return this.getConfig(homeTeam, awayTeam).extraTime;
  }

  /** 默认配置（兜底） */
  get default(): MatchConfigEntry { return DEFAULT_MATCH_CONFIG; }
}
