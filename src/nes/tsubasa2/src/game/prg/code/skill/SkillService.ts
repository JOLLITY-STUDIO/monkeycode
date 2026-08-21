/**
 * SkillService — 特殊动作/必杀技
 * @bank 16
 *
 * 职责: 必杀技 (射门/盘带/传球) 效果, 特殊动作演出。
 *
 * 命名规范: 旧名 Bank16Service → 新名 SkillService。
 *
 * TODO: 翻译 asm/bank16 技能
 */
import { DataStore } from '../../data/store/DataStore';

export class SkillService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 必杀技 ID 查询 (原 byMoveId) */
  getMove(moveId: number): Readonly<Record<string, number>> {
    // TODO: 结构化必杀技表
    void moveId;
    return {};
  }
}

export default SkillService;
