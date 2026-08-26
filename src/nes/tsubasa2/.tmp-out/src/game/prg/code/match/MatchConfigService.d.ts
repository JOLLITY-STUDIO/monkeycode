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
import { type MatchConfigEntry } from '../../data/tables/match-config-table';
export declare class MatchConfigService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /** 取比赛配置（按双方队 ID 查表） */
    getConfig(homeTeam: number, awayTeam: number): MatchConfigEntry;
    /** 半时长度（分钟，按双方队查表） */
    halfLength(homeTeam?: number, awayTeam?: number): number;
    /** 换人名额 */
    maxSubstitutions(homeTeam?: number, awayTeam?: number): number;
    /** 伤停补时（分钟） */
    injuryTime(homeTeam?: number, awayTeam?: number): number;
    /** 全场分钟数（halfLength * 2 + injuryTime） */
    totalMinutes(homeTeam?: number, awayTeam?: number): number;
    /** 赛事类型查询 */
    getTournament(homeTeam: number, awayTeam: number): MatchConfigEntry['tournament'];
    /** 是否加时赛 */
    hasExtraTime(homeTeam?: number, awayTeam?: number): boolean;
    /** 默认配置（兜底） */
    get default(): MatchConfigEntry;
}
