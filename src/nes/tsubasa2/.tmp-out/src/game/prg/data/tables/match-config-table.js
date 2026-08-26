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
/** 默认比赛配置（未注册对阵 fallback） */
export const DEFAULT_MATCH_CONFIG = {
    halfLength: 45,
    maxSubstitutions: 2,
    injuryTime: 0,
    durationMinutes: 45,
    extraTime: false,
    homeTeam: 0,
    awayTeam: 0,
    tournament: 'saopaulo',
};
/** 比赛配置表（按 home/away 二元索引，已从真 ROM 提取） */
export const MATCH_CONFIG_TABLE = [
    // Sao Paulo 赛（圣保罗）— 短时友谊赛
    { homeTeam: 0x80, awayTeam: 0x85, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: 'saopaulo' },
    { homeTeam: 0x80, awayTeam: 0x86, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: 'saopaulo' },
    { homeTeam: 0x80, awayTeam: 0x87, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: 'saopaulo' },
    { homeTeam: 0x80, awayTeam: 0x88, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: 'saopaulo' },
    { homeTeam: 0x80, awayTeam: 0x89, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: 'saopaulo' },
    // Nankatsu 赛（日本高中）— 半时 10 分钟
    { homeTeam: 0x81, awayTeam: 0x8A, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: 'nankatsu' },
    { homeTeam: 0x81, awayTeam: 0x8B, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: 'nankatsu' },
    { homeTeam: 0x81, awayTeam: 0x8C, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: 'nankatsu' },
    { homeTeam: 0x81, awayTeam: 0x8D, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: 'nankatsu' },
    { homeTeam: 0x81, awayTeam: 0x8E, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: 'nankatsu' },
    { homeTeam: 0x81, awayTeam: 0x8F, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: 'nankatsu' },
    // Japan Cup 赛（亚洲杯）
    { homeTeam: 0x82, awayTeam: 0x90, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: 'japanCup' },
    { homeTeam: 0x82, awayTeam: 0x91, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: 'japanCup' },
    { homeTeam: 0x82, awayTeam: 0x92, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: 'japanCup' },
    { homeTeam: 0x82, awayTeam: 0x93, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: 'japanCup' },
    // World Cup 赛（世界杯 — 半时 22.5 分钟）
    { homeTeam: 0x84, awayTeam: 0xA0, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: 'worldCup' },
    { homeTeam: 0x84, awayTeam: 0xA1, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: 'worldCup' },
    { homeTeam: 0x84, awayTeam: 0xA2, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: 'worldCup' },
    { homeTeam: 0x84, awayTeam: 0xA3, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: 'worldCup' },
    // Exhibition（表演赛）
    { homeTeam: 0x80, awayTeam: 0x82, halfLength: 5, maxSubstitutions: 5, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: 'exhibition' },
];
/**
 * 查表：按 (homeTeam, awayTeam) 取比赛配置
 * 未注册 → 返回 DEFAULT_MATCH_CONFIG
 */
export function getMatchConfig(homeTeam = 0, awayTeam = 0) {
    for (const e of MATCH_CONFIG_TABLE) {
        if (e.homeTeam === (homeTeam & 0xff) && e.awayTeam === (awayTeam & 0xff))
            return e;
    }
    return DEFAULT_MATCH_CONFIG;
}
