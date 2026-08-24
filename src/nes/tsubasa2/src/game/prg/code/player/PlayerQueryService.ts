/**
 * PlayerQueryService — 球员数据查询
 *
 * V0.1 stub：契约签名；真实数据表（data/tables/player-table.ts）在 V0.2 从 asm 提取。
 */
import type { DataStore } from '../../data/store/DataStore';

/** 球员基础档案（声明式表结构，字段对应为业务字段，V0.2 定稿） */
export interface PlayerProfile {
  readonly id: number;
  readonly name: string;
  readonly club: number;
  readonly position: number;
  readonly shot: number;
  readonly dribble: number;
  readonly pass: number;
  readonly tackle: number;
  readonly speed: number;
  readonly stamina: number;
}

export class PlayerQueryService {
  constructor(readonly store: DataStore) {}

  /** 按球员 ID 查询档案（V0.2 数据表接入后实现） */
  findById(playerId: number): PlayerProfile | null {
    // TODO V0.2: 从 player-table 查询
    void playerId;
    return null;
  }

  /** 按球队查询队员 ID 列表 */
  findTeamRoster(teamId: number): number[] {
    // TODO V0.2: 从 team-table 查询
    void teamId;
    return [];
  }
}