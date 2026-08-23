/**
 * SkillService — 技能/必杀技判定（原 bank16）
 *
 * 行为翻译（去 CPU 化）：
 * - bank16 $8000 入口：根据 ram_0518 选择技能指针 → 加载动作序列
 * - $8677：动作序列执行器（读取 ram_0444 → 查表 → 调用动作）
 * - $86A6/$86C8/$86E3：技能匹配表（触发值/动作ID映射）
 * - $8138/$8150：动作分发（调用对应子程）
 *
 * bank 切换语义 = import SkillService + 直接调用方法，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
import {
  SKILL_TABLE, SKILL_POINTER_TABLE, SKILL_MOVE_ID_TABLE, SKILL_TRIGGER_TABLE,
  findSkillByMoveId, findSkillsByPlayer,
} from '../../data/tables/skill-table';

/** 技能触发请求（对应 ram_0518/0516 系列输入） */
export interface SkillTriggerRequest {
  /** 当前球员索引（ram_0616） */
  readonly playerIdx: number;
  /** 技能选择值（ram_0518） */
  readonly selector: number;
  /** 技能状态标志（ram_0516 位域） */
  readonly flags: number;
}

/** 技能动作执行结果 */
export interface SkillActionResult {
  /** 动作类型（原 ram_0523） */
  readonly actionType: number;
  /** 目标 X（原 ram_0524） */
  readonly targetX: number;
  /** 目标 Y（原 ram_0528） */
  readonly targetY: number;
  /** 附加参数（原 ram_0529） */
  readonly param: number;
}

export class SkillService {
  constructor(readonly store: DataStore) {}

  /**
   * 加载技能动作序列（原 bank16 $8000-$8020）
   *
   * 行为：根据 selector（ram_0518）查指针表 → 设置 ram_052A 为序列基址。
   * 指针表通过 SKILL_POINTER_TABLE 查询，不读 CPU 地址。
   */
  loadSkillSequence(selector: number): number {
    // 原 $8003-$8020：LDA $0518; ASL; TAY; 查指针表
    const idx = selector & 0x7F;
    const hiBit = (selector >> 7) & 1;
    const entry = SKILL_POINTER_TABLE[idx >>> 1];
    if (!entry) return 0;
    const base = hiBit ? ((entry.hi << 8) | entry.lo) : entry.lo;
    this.store.write('ram_052A', base);
    this.store.write('ram_0516', this.store.read('ram_0516') & 0xFB);
    return base;
  }

  /**
   * 解析动作序列段（原 bank16 $8021-$80A5）
   *
   * 行为：从序列基址读取动作段，解析 actionType/targetX/targetY/param。
   * 遇到 $F0+ 标记调用扩展解析子程（$80A9/$8991/$899C/$89A7）。
   */
  parseSkillSegment(base: number): SkillActionResult | null {
    let cursor = 0;
    const readByte = (): number => {
      // TODO B16: 接入 DataStore 的序列读取（原 (ram_055D),Y 间接寻址）
      void base;
      return 0 + cursor++;
    };

    const actionType = readByte();
    if (actionType >= 0xF0) {
      // 扩展标记：调用对应解析器
      return null;
    }
    const targetX = readByte();
    const targetY = readByte();
    const param = readByte();
    return { actionType, targetX, targetY, param };
  }

  /**
   * 查找球员可用的必杀技（原 bank16 $86E3 表查询）
   */
  findPlayerSkills(playerId: number): number[] {
    return findSkillsByPlayer(playerId);
  }

  /**
   * 检查必杀技触发（原 bank16 $86C8-$86C7）
   *
   * 行为：ram_043C & 0x7F 与 SKILL_TRIGGER_TABLE 比较。
   */
  checkSkillTrigger(moveId: number): boolean {
    const masked = moveId & 0x7F;
    return SKILL_TRIGGER_TABLE.some(t => t === masked);
  }

  /**
   * 查找必杀技动作 ID（原 bank16 $86A6 表 + $86E3 映射）
   *
   * 行为：遍历 7 项匹配表，命中则加载对应动作。
   */
  findSkillActionId(actionValue: number): number | null {
    // 原 $8690-$86A5：CMP $86A6,Y; BEQ; INY×2; CPY #$0E
    for (let i = 0; i < SKILL_MOVE_ID_TABLE.length; i++) {
      if (SKILL_MOVE_ID_TABLE[i] === actionValue) {
        return SKILL_MOVE_ID_TABLE[i + 1] ?? 0;
      }
    }
    return null;
  }

  /**
   * 查询技能（byMoveId 契约保留）
   */
  byMoveId(moveId: number): number[] {
    const skill = findSkillByMoveId(moveId);
    return skill ? [skill.moveId] : [];
  }

  /** 导出表供外部访问 */
  get table() { return SKILL_TABLE; }
  get pointers() { return SKILL_POINTER_TABLE; }
}
