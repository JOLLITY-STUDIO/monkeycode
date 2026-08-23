/**
 * MatchActionService — 比赛动作/指令（原 bank28）
 *
 * 行为翻译（去 CPU 化）：
 * - bank28 $8000 入口：JMP 表分发多个动作入口（$82CA/$8B22/$8609/$8C06/$8D58 等）
 * - $802D+：动作分发主程（JSR $803A → 动作执行）
 * - $803A+：动作查找（ram_0034/Y 间接 → $9E4E/Y 表 → ram_0032/0033 指针）
 * - $8050+：动作参数解析（$23 标记 → ram_0033/0032 坐标运算）
 * - $8084+：动作地址计算（ram_0032/Y → $8199/Y 表偏移）
 * - $8093+：动作类型判定（CPX #$1F → JMP $813F）
 *
 * bank 切换语义 = import MatchActionService + 直接调用，无 MMC3 窗口模拟。
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
   * 执行比赛动作（原 bank28 $802D-$8039）
   *
   * 行为：JSR $803A 查找动作 → 执行。
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
   * 查找动作指针（原 bank28 $803A-$8039）
   *
   * 行为：ram_0034/Y 读取 → $9E4E/Y 表 → ram_0032/0033 指针。
   */
  findActionPointer(actionId: number): number {
    const entry = BANK28_ACTION_POINTER_TABLE.find(p => p.actionId === actionId);
    if (!entry) return 0;
    this.store.write('ram_0032', entry.lo);
    this.store.write('ram_0033', entry.hi);
    return (entry.hi << 8) | entry.lo;
  }

  /**
   * 解析动作参数（原 bank28 $8050-$8083）
   *
   * 行为：$23 标记 → ram_0033/0032 坐标运算。
   * ASL×4 → ROL ram_0033 → 坐标值。
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
   * 动作地址计算（原 bank28 $8084-$8097）
   *
   * 行为：ram_0032/Y → $8199/Y 表偏移 → 动作地址。
   */
  computeActionAddr(y: number): number {
    const table = BANK28_ACTION_TABLE;
    const entry = table[y];
    if (!entry) return 0;
    return entry.offset;
  }

  /**
   * 动作类型判定（原 bank28 $8093-$8097）
   *
   * 行为：CPX #$1F → JMP $813F（类型分发）。
   */
  resolveActionType(x: number): number {
    if (x >= 0x1F) return -1;
    return x;
  }

  /** 导出表供外部访问 */
  get table() { return BANK28_ACTION_TABLE; }
  get pointers() { return BANK28_ACTION_POINTER_TABLE; }
}
