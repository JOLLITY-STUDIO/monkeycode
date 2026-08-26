/**
 * player-stats.ts — 球员档案具象化表（从真 ROM 全字段提取）
 *
 * 数据源（docs/rom-data-locations.md §1-§3）：
 *   - 能力值 23 字节（7 base + 8 low + 8 high）  ROM 0x39fde + idx*24
 *   - GK 8 字节能力                              ROM 0x3ae96 + idx*8
 *   - 头型 18 模板                                ROM 0x28901 + idx
 *   - 颜色（明星/杂鱼）                            ROM 0x2b821/0x2b6d7 + idx*5
 *
 * 重生脚本：scripts/extract_players.cjs
 * 用法：cd scripts && node extract_players.cjs > ../src/game/prg/data/tables/player-stats.ts
 */
import type { PlayerProfile, PlayerGkEntry } from '../../code/player/PlayerQueryService';
export type { PlayerGkEntry } from '../../code/player/PlayerQueryService';
/** 球员颜色条目（皮肤/头发/上衣/短裤） */
export interface PlayerColorEntry {
    readonly skin: number;
    readonly hair: number;
    readonly shirt: number;
    readonly shorts: number;
}
/** 球员档案表（明星 0x01-0x2D 共 45 项，杂鱼不在此表）— 23 字段全捕获 */
export declare const PLAYER_TABLE: ReadonlyArray<PlayerProfile>;
/** 球员 ID → 档案具名查询（替代 PRG $0BAC ram 指针 + 间接查表） */
export declare function findPlayerById(id: number): PlayerProfile | undefined;
/** 球员颜色（明星 ROM 0x2b821 + idx*5） */
export declare const PLAYER_COLOR_TABLE: ReadonlyArray<PlayerColorEntry & {
    readonly id: number;
}>;
/** GK 能力值（ROM 0x3ae96 + gkIdx*8）按 GK 表索引顺序映射 5 名 GK */
export declare const GK_STATS_TABLE: ReadonlyArray<PlayerGkEntry & {
    readonly id: number;
}>;
/** 球员头型（ROM 0x28901 + idx，18 个模板） */
export declare const PLAYER_HAIR_TABLE: ReadonlyArray<number>;
/** 杂鱼颜色（ROM 0x2b6d7 + idx*5） */
export declare const NAMED_PLAYER_COLOR_TABLE: ReadonlyArray<PlayerColorEntry & {
    readonly id: number;
}>;
