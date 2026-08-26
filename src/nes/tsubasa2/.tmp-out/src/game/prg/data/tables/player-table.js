/**
 * 球员档案表 — 具象化契约（v2 重构完成）
 *
 * 数据来源（从真 ROM 提取）：
 *   - 24 字节能力 (shot/dribble/pass/tackle/stamina)  ROM 0x39fde + idx*24
 *   - GK 8 字节能力 (stamina/pass/catching/punching)    ROM 0x3ae96 + idx*8
 *   - 颜色 (明星/杂鱼)                               ROM 0x2b821/0x2b6d7 + idx*5
 *   - 头型 18 模板                                   ROM 0x28901 + idx
 *   - 角色名 ID→名字                                docs/rom-data-locations.md §1
 *
 * 翻译原则：
 *   - PLAYER_TABLE 是声明式具象化条目（已从真 ROM 提取填充）
 *   - 禁止 lo/hi 拆字节，禁止暴露 CPU 地址
 *   - 业务查找走 findPlayerById / findPlayersByTeam / findPlayerNameById
 *
 * 重生：scripts/extract_players.cjs（注释含用法）
 */
import { PLAYER_TABLE as PLAYER_TABLE_EXTRACTED, PLAYER_COLOR_TABLE, GK_STATS_TABLE, PLAYER_HAIR_TABLE, NAMED_PLAYER_COLOR_TABLE, } from './player-stats';
/** 球员档案表（从 player-stats.ts 再导出） */
export const PLAYER_TABLE = PLAYER_TABLE_EXTRACTED;
/** 球员颜色（明星） */
export const PLAYER_COLOR = PLAYER_COLOR_TABLE;
/** GK 能力值 */
export const GK_STATS = GK_STATS_TABLE;
/** 球员头型 18 模板 */
export const PLAYER_HAIR = PLAYER_HAIR_TABLE;
/** 杂鱼颜色 */
export const NAMED_PLAYER_COLOR = NAMED_PLAYER_COLOR_TABLE;
/** 按 ID 查询球员 */
export function findPlayerById(id) {
    for (const p of PLAYER_TABLE) {
        if (p.id === (id & 0xff))
            return p;
    }
    return null;
}
/** 按球队查询队员 ID 列表 */
export function findPlayersByTeam(teamId) {
    const ids = [];
    for (const p of PLAYER_TABLE) {
        if (p.club === (teamId & 0xff))
            ids.push(p.id);
    }
    return ids;
}
/** 按 ID 查询球员名（兜底空字符串） */
export function findPlayerNameById(id) {
    return findPlayerById(id)?.name ?? '';
}
