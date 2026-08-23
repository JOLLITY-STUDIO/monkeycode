/**
 * SkillService — 技能/必杀技（原 bank16 必杀技）
 *
 * @bank 16（技能/必杀技数据与判定）
 *
 * V0.1 stub：契约签名；技能数据表（data/tables/skill-table.ts）在 V0.2 提取。
 */
import type { DataStore } from '../../data/store/DataStore';

export class SkillService {
  constructor(readonly store: DataStore) {}

  /** 查询技能（V0.2 数据表接入后实现） */
  byMoveId(moveId: number): number[] {
    // TODO V0.2: 从 skill-table 查询
    void moveId;
    return [];
  }
}
