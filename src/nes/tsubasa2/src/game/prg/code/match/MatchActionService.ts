/**
 * MatchActionService — 比赛动作/指令
 *
 * 行为翻译（去 CPU 化）：
 * - 执行动作：查找动作指针 → 执行
 * - 查找动作指针：BANK28_ACTION_POINTER_TABLE 查表
 * - 解析动作参数：$23+ 标记 → 坐标运算（ASL×4）
 * - 动作地址计算：BANK28_ACTION_TABLE 查表
 * - 动作类型判定：CPX #$1F → 类型分发
 *
 * bank 切换 = import MatchActionService + 直接调用，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
import { BANK28_ACTION_TABLE, BANK28_ACTION_POINTER_TABLE, findActionById } from '../../data/tables/match-action-table';

/** 比赛动作类型 */
export enum MatchActionType {
  /** 移动 */
  MOVE = 0,
  /** 传球 */
  PASS = 1,
  /** 射门 */
  SHOOT = 2,
  /** 抢断 */
  TACKLE = 3,
  /** 必杀 */
  SPECIAL = 4,
}

/** 动作请求 */
export interface MatchActionRequest {
  readonly type: MatchActionType;
  readonly actionId: number;
  readonly playerIdx: number;
}

/** 动作结果 */
export interface MatchActionResult {
  readonly actionId: number;
  readonly success: boolean;
  readonly nextActionId: number;
  readonly posX: number;
  readonly posY: number;
}

export class MatchActionService {
  constructor(readonly store: DataStore) {}

  /**
   * 执行比赛动作：查找动作指针 → 执行。
   */
  executeAction(req: MatchActionRequest): MatchActionResult {
    const entry = findActionById(req.actionId);
    const ptr = this.findActionPointer(req.actionId);
    return {
      actionId: req.actionId,
      success: ptr !== 0,
      nextActionId: entry?.nextActionId ?? 0,
      posX: 0,
      posY: 0,
    };
  }

  /**
   * 查找动作指针：BANK28_ACTION_POINTER_TABLE 查表。
   * 结果写入 ram_0032/0033（原版间接指针视图）。
   */
  findActionPointer(actionId: number): number {
    const entry = BANK28_ACTION_POINTER_TABLE.find(p => p.actionId === actionId);
    if (!entry) return 0;
    this.store.write('ram_0032', entry.lo);
    this.store.write('ram_0033', entry.hi);
    return (entry.hi << 8) | entry.lo;
  }

  /**
   * 解析动作参数：$23+ 标记 → 坐标运算（ASL×4）。
   */
  parseActionParam(): number {
    const value = this.store.read('ram_0032');
    const hi = this.store.read('ram_0033');
    if (value >= 0x23) {
      const adj = value - 0x23;
      this.store.write('ram_0032', adj << 2);
      this.store.write('ram_0033', hi);
      return adj << 2;
    }
    return value;
  }

  /**
   * 动作地址计算：BANK28_ACTION_TABLE 查表。
   */
  computeActionAddr(y: number): number {
    const table = BANK28_ACTION_TABLE;
    const entry = table[y];
    if (!entry) return 0;
    return entry.offset;
  }

  /**
   * 动作类型判定：CPX #$1F → 类型分发。
   */
  resolveActionType(x: number): number {
    if (x >= 0x1F) return -1;
    return x;
  }

  /** 导出表供外部访问 */
  get table() { return BANK28_ACTION_TABLE; }
  get pointers() { return BANK28_ACTION_POINTER_TABLE; }
}