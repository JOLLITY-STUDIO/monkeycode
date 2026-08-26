/**
 * 队伍数据表 — 具象化契约（v2 重构完成）
 *
 * 数据源（从真 ROM 提取）：
 *   - 玩家队 (Sao Paulo/Nankatsu/Asian/Exhibition/WC)  ROM 0xAA47 / 0xAA53 / 0xAA5F / 0xAA6A
 *   - Brazil League (5 队)                              ROM 0x03BB1A+
 *   - Japan High School (6 队)                          ROM 0x03BB62+
 *   - Japan Cup (4 队)                                  ROM 0x03BBB4+
 *   - World Cup (16 队)                                 ROM 0x03BC0A+
 *   - 阵型/战术 1 byte                                   ROM 0x3bac2
 *
 * 翻译原则：
 *   - TEAM_TABLE / TEAM_ROSTER_TABLE 声明式具象化条目（已从真 ROM 提取填充）
 *   - 禁止 lo/hi 拆字节，禁止暴露 CPU 地址
 *   - 业务查找走 findTeamById / findTeamNameById / findRosterById
 */
import { TEAM_TABLE as TEAM_TABLE_EXTRACTED, TEAM_ROSTER_TABLE, findRosterById as findRosterByIdRaw, } from './team-roster';
/** 兼容 TeamEntry 形状的 TEAM_TABLE（已从 ROM 提取） */
export const TEAM_TABLE = TEAM_TABLE_EXTRACTED;
/** 完整阵容表（含 type/subs/formation/tactic） */
export const TEAMS_FULL = TEAM_ROSTER_TABLE;
/** 按 ID 查询队伍 */
export function findTeamById(id) {
    for (const t of TEAM_TABLE) {
        if (t.id === (id & 0xff))
            return t;
    }
    return null;
}
/** 按 ID 查询队名（兜底空字符串） */
export function findTeamNameById(id) {
    return findTeamById(id)?.name ?? '';
}
/** 按 ID 查询完整阵容（含 formation/players/subs） */
export function findRosterById(id) {
    return findRosterByIdRaw(id);
}
