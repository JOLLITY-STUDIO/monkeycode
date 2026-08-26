/**
 * PlayerQueryService — 球员数据查询（已接入 PLAYER_TABLE 真数据）
 *
 * V0.2 完成：从 data/tables/player-table 真数据表查询。
 * PlayerProfile 字段对齐 ROM 0x39fde 的 23 字节结构（7 base + 8 low + 8 high）。
 *
 * 原则（v2）：
 *   - 不暴露 CPU 地址；查询走 findById/findTeamRoster 命名 API
 *   - 数据从 PLAYER_TABLE 声明式表读取，不走 ROM 字节拼接
 */
import type { DataStore } from '../../data/store/DataStore';
/**
 * 球员档案（声明式表结构，字段与 ROM 0x39fde 的 24 字节结构一一对应）
 * - 7 base:   stamina/shot/pass/dribble/block/tackle/intercept
 * - 8 low:    lowShot/lowPass/lowTrap/lowLet/lowCtrlClr/lowUnctrl/lowChal/lowIntc
 * - 8 high:   highShot/highPass/highTrap/highLet/highCtrlClr/highUnctrl/highChal/highIntc
 * - GK: stamina/pass/catching/punching/vsShot/vsDribble/lowRush/highClaim
 *        （position=1 时使用，此时 shot/dribble/block/tackle/intercept/low/high 全 0）
 */
export interface PlayerProfile {
    readonly id: number;
    readonly name: string;
    readonly club: number;
    readonly position: number;
    /** 体力 */
    readonly stamina: number;
    /** 射门 */
    readonly shot: number;
    /** 传球 */
    readonly pass: number;
    /** 盘带 */
    readonly dribble: number;
    /** 阻挡（GK 时为 0） */
    readonly block: number;
    /** 铲球（GK 时为 0） */
    readonly tackle: number;
    /** 拦截（GK 时为 0） */
    readonly intercept: number;
    /** 低空射门（GK 时为 0） */
    readonly lowShot: number;
    readonly lowPass: number;
    readonly lowTrap: number;
    readonly lowLet: number;
    readonly lowCtrlClr: number;
    readonly lowUnctrl: number;
    readonly lowChal: number;
    readonly lowIntc: number;
    /** 高空射门（GK 时为 0） */
    readonly highShot: number;
    readonly highPass: number;
    readonly highTrap: number;
    readonly highLet: number;
    readonly highCtrlClr: number;
    readonly highUnctrl: number;
    readonly highChal: number;
    readonly highIntc: number;
    /** GK 扑救 (position=1 时有值,FW/MF 时缺省 0) */
    readonly catching?: number;
    /** GK 击球 (position=1 时有值,FW/MF 时缺省 0) */
    readonly punching?: number;
    /** GK 对射门站位 (position=1 时有值,FW/MF 时缺省 0) */
    readonly vsShot?: number;
    /** GK 对盘带站位 (position=1 时有值,FW/MF 时缺省 0) */
    readonly vsDribble?: number;
    /** GK 低空出击 (position=1 时有值,FW/MF 时缺省 0) */
    readonly lowRush?: number;
    /** GK 高空接球 (position=1 时有值,FW/MF 时缺省 0) */
    readonly highClaim?: number;
}
/** GK 能力值条目（ROM 0x3ae96 + idx*8） */
export interface PlayerGkEntry {
    readonly stamina: number;
    readonly pass: number;
    readonly catching: number;
    readonly punching: number;
    readonly vsShot: number;
    readonly vsDribble: number;
    readonly lowRush: number;
    readonly highClaim: number;
}
export declare class PlayerQueryService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /** 按球员 ID 查询档案 */
    findById(playerId: number): PlayerProfile | null;
    /** 按球队查询队员 ID 列表（先按 TeamRoster 精确查，无则回退到 PLAYER_TABLE.club） */
    findTeamRoster(teamId: number): number[];
    /** 按球员名查询 ID（精确匹配） */
    findIdByName(name: string): number | null;
}
