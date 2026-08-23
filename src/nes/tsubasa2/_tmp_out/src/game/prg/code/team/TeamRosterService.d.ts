/**
 * TeamRosterService — 球队名单查询
 * @bank 29 (roster 数据 bank)
 *
 * 职责: 球队名单/战术块/CPU 阵容结构化查询。
 *
 * 命名规范: 旧名 Bank29RosterService → 新名 TeamRosterService。
 *
 * TODO: 翻译 asm/bank29 roster 数据 → 结构化表
 */
import { DataStore } from '../../data/store/DataStore';
export declare class TeamRosterService {
    protected _store: DataStore;
    constructor(store: DataStore);
    /** 查询球队阵容 (原 readBank29 地址查表) */
    getRoster(teamId: number): readonly number[];
}
export default TeamRosterService;
