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
import { type PlayerColorEntry, type PlayerGkEntry } from './player-stats';
export type { PlayerColorEntry, PlayerGkEntry } from './player-stats';
/** 球员档案表（从 player-stats.ts 再导出） */
export declare const PLAYER_TABLE: readonly import("../..").PlayerProfile[];
/** 球员颜色（明星） */
export declare const PLAYER_COLOR: readonly (PlayerColorEntry & {
    readonly id: number;
})[];
/** GK 能力值 */
export declare const GK_STATS: readonly (PlayerGkEntry & {
    readonly id: number;
})[];
/** 球员头型 18 模板 */
export declare const PLAYER_HAIR: readonly number[];
/** 杂鱼颜色 */
export declare const NAMED_PLAYER_COLOR: readonly (PlayerColorEntry & {
    readonly id: number;
})[];
/** 按 ID 查询球员 */
export declare function findPlayerById(id: number): typeof PLAYER_TABLE[number] | null;
/** 按球队查询队员 ID 列表 */
export declare function findPlayersByTeam(teamId: number): number[];
/** 按 ID 查询球员名（兜底空字符串） */
export declare function findPlayerNameById(id: number): string;
