/**
 * TeamRosterService — 队伍名单/阵型
 *
 * V0.1 stub：契约签名；真实数据表（data/tables/team-table.ts）在 V0.2 从 asm 提取。
 */
import type { DataStore } from '../../data/store/DataStore';
export declare class TeamRosterService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /** 取队伍阵型（V0.2 数据表接入后实现） */
    getFormation(teamId: number): number[];
    /** 队伍名 */
    getTeamName(teamId: number): string;
}
