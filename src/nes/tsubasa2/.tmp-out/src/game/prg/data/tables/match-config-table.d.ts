/**
 * 比赛配置表 — 具象化契约（v2 重构完成）
 *
 * 数据来源（从真 ROM 提取）：
 *   - 玩家队配置                            ROM 0xAA47+
 *   - 比赛时间/半场                          docs/rom-data-locations.md §7
 *
 * 翻译原则：
 *   - MATCH_CONFIG_TABLE 声明式具象化条目（按 (homeTeam, awayTeam) 二元组索引）
 *   - 5 大赛事分类：SaoPaulo / Nankatsu / JapanCup / WorldCup / AsianCup
 *   - 默认配置 DEFAULT_MATCH_CONFIG 作为兜底
 *
 * 重生：scripts/extract_match_config.cjs （注释含用法）
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
    /** 主场队 ID */
    readonly homeTeam: number;
    /** 客场队 ID */
    readonly awayTeam: number;
    /** 赛事类型 */
    readonly tournament: 'saopaulo' | 'nankatsu' | 'japanHighSchool' | 'japanCup' | 'worldCup' | 'exhibition';
}
/** 默认比赛配置（未注册对阵 fallback） */
export declare const DEFAULT_MATCH_CONFIG: MatchConfigEntry;
/** 比赛配置表（按 home/away 二元索引，已从真 ROM 提取） */
export declare const MATCH_CONFIG_TABLE: ReadonlyArray<MatchConfigEntry>;
/**
 * 查表：按 (homeTeam, awayTeam) 取比赛配置
 * 未注册 → 返回 DEFAULT_MATCH_CONFIG
 */
export declare function getMatchConfig(homeTeam?: number, awayTeam?: number): MatchConfigEntry;
