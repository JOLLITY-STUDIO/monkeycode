/**
 * SkillService — 特殊动作/必杀技
 * @bank 16 ($A000-$BFFF 窗口)
 *
 * 职责: 必杀技 (射门/盘带/传球等) 查询与角色必杀技分配。
 *
 * asm 来源: asm/bank16/data_tables.s $89BF 明星必杀 ROM 地址表;
 *           code_main.s $8021 主脚本解析器 (必杀技 ID → 脚本跳转)。
 *
 * 命名规范: 旧名 Bank16Service → 新名 SkillService。
 */
import { DataStore } from '../../data/store/DataStore';
import { getCharacterSkills, getMovePtr } from '../../data/tables/skill-table';

/** 必杀技定义记录 */
export interface MoveDefinition {
  /** 必杀技 ID */
  moveId: number;
  /** 该必杀技脚本在 bank16 内的起始 ROM 地址 (0xFFFF = 无) */
  scriptPtr: number;
}

export class SkillService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /**
   * 必杀技 ID 查询 (原 byMoveId)。
   *
   * asm: data_tables.s $89BF 明星必杀 ROM 地址表。
   * 以 moveId 索引地址表, 返回该必杀技动作脚本的起始地址。
   * 超出表范围或无 (0xFFFF) 时 scriptPtr 为 0xFFFF。
   */
  getMove(moveId: number): Readonly<MoveDefinition> {
    const scriptPtr = getMovePtr(moveId);
    return { moveId, scriptPtr };
  }

  /**
   * 角色必杀技分配 — 取某角色 7 个必杀槽位
   * (Shot/Pass/Dribble/1-2/Block/Tackle/PassCut)。
   *
   * asm: data_tables.s $8F00+ 区角色必杀表 (每人 7 项×2B)。
   * 未提取完成时返回 null。
   */
  getCharacterSkills(charIndex: number): Readonly<number[]> | null {
    return getCharacterSkills(charIndex);
  }
}

export default SkillService;
