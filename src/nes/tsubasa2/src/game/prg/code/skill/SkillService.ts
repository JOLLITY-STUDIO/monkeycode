/**
 * SkillService — 技能/必杀技判定
 *
 * 行为翻译（去 CPU 化）：
 * - 加载技能动作序列：selector 查 SKILL_POINTER_TABLE → 返回 16 位动作序列地址
 * - 解析动作序列段：读取序列字节 → actionType/targetX/targetY/param
 * - 查找球员可用必杀技：findSkillsByPlayer
 * - 检查必杀技触发：SKILL_TRIGGER_TABLE 4 项匹配
 * - 查找必杀技动作 ID：SKILL_MOVE_ID_TABLE 查表
 * - 技能查询（byMoveId）：findSkillByMoveId
 *
 * bank 切换 = import SkillService + 直接调用方法，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
import {
  SKILL_TABLE, SKILL_POINTER_TABLE, SKILL_MOVE_ID_TABLE, SKILL_TRIGGER_TABLE,
  findSkillByMoveId, findSkillsByPlayer,
} from '../../data/tables/skill-table';

/** 技能触发请求 */
export interface SkillTriggerRequest {
  /** 当前球员索引 */
  readonly playerIdx: number;
  /** 技能选择值 */
  readonly selector: number;
  /** 技能状态标志 */
  readonly flags: number;
}

/** 技能动作执行结果 */
export interface SkillActionResult {
  readonly actionType: number;
  readonly targetX: number;
  readonly targetY: number;
  readonly param: number;
}

export class SkillService {
  constructor(readonly store: DataStore) {}

  /**
   * 加载技能动作序列：selector 查 SKILL_POINTER_TABLE → 返回动作脚本字节偏移。
   * 已消除 lo/hi 拆分：entry.target 是单个 16-bit number。
   */
  loadSkillSequence(selector: number): number {
    const idx = (selector << 1) & 0xFE;
    const hiBit = (selector >> 7) & 1;
    const entry = SKILL_POINTER_TABLE[idx >>> 1];
    if (!entry) return 0;
    this.store.write('ram_005D', entry.target & 0xff);
    this.store.write('ram_005E', (entry.target >> 8) & 0xff);
    void hiBit;
    return entry.target;
  }

  /**
   * 解析动作序列段：读取序列字节 → actionType/targetX/targetY/param。
   * $F0+ 为扩展标记 → 调用对应处理例程后继续循环。
   */
  parseSkillSegment(): SkillActionResult | null {
    const store = this.store;
    store.write('ram_052A', store.read('ram_0517'));
    store.write('ram_0516', store.read('ram_0516') & ~0x04);
    store.write('ram_052B', 0);
    store.write('ram_052D', 0);
    store.write('ram_052C', 0);
    store.write('ram_0530', 0);
    store.write('ram_003A', 0);
    let cursor = store.read('ram_003A');
    const readSeqByte = (): number => {
      store.write('ram_003A', cursor + 1);
      cursor++;
      const ptrLo = store.read('ram_005D');
      return store.read(`ram_seq_${ptrLo + cursor - 1}`);
    };
    const actionType = readSeqByte();
    if (actionType >= 0xF0) {
      return null;
    }
    store.write('ram_0523', actionType);
    store.write('ram_0516', (store.read('ram_0516') | 0x40) & ~0x10);
    const targetX = readSeqByte();
    if (targetX >= 0xF0) return null;
    store.write('ram_0524', targetX);
    const targetY = readSeqByte();
    if (targetY >= 0xF0) return null;
    store.write('ram_0528', targetY);
    const param = readSeqByte();
    if (param >= 0xF0) return null;
    store.write('ram_0529', param);
    const ptrLo = store.read('ram_005D');
    const newPtr = (ptrLo + cursor) & 0xFF;
    store.write('ram_005D', newPtr);
    if (ptrLo + cursor > 0xFF) {
      store.write('ram_005E', (store.read('ram_005E') + 1) & 0xFF);
    }
    return { actionType, targetX, targetY, param };
  }

  /** 查找球员可用的必杀技 */
  findPlayerSkills(playerId: number): number[] {
    return findSkillsByPlayer(playerId);
  }

  /**
   * 检查必杀技触发：SKILL_TRIGGER_TABLE 4 项匹配。
   * 检查 moveId & 0x7F 是否在触发表中。
   */
  checkSkillTrigger(moveId: number): boolean {
    const masked = moveId & 0x7F;
    for (let i = 0; i < 4 && i < SKILL_TRIGGER_TABLE.length; i++) {
      if (SKILL_TRIGGER_TABLE[i] === masked) return true;
    }
    return false;
  }

  /** 查找必杀技动作 ID：SKILL_MOVE_ID_TABLE 查表 */
  findSkillActionId(actionValue: number): number | null {
    for (let i = 0; i < SKILL_MOVE_ID_TABLE.length; i++) {
      if (SKILL_MOVE_ID_TABLE[i] === actionValue) {
        return SKILL_MOVE_ID_TABLE[i + 1] ?? 0;
      }
    }
    return null;
  }

  /** 技能查询（byMoveId） */
  byMoveId(moveId: number): number[] {
    const skill = findSkillByMoveId(moveId);
    return skill ? [skill.moveId] : [];
  }

  /** 导出表供外部访问 */
  get table() { return SKILL_TABLE; }
  get pointers() { return SKILL_POINTER_TABLE; }
}