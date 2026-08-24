/**
 * MatchRoundService — 比赛回合/战术
 *
 * 行为翻译（去 CPU 化）：
 * - 启动回合：初始化回合状态机（活跃/序列/计数器/类型）
 * - 回合状态机更新：活跃 → 计数器递减 → 0 时装载下一段
 * - 解析回合段：从指针读取回合数据，$F0+ 扩展标记 → 标记分发
 * - 回合标记解析：AND #$0F → 标记分发
 * - 查询回合参数：BANK24_ROUND_POINTER_TABLE 查表
 *
 * bank 切换 = import MatchRoundService + 直接调用，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
import { BANK24_ROUND_TABLE, BANK24_ROUND_POINTER_TABLE, findRoundById } from '../../data/tables/match-round-table';

/** 回合类型 */
export enum MatchRoundType {
  /** 开球 */
  KICKOFF = 0,
  /** 进攻 */
  OFFENSE = 1,
  /** 防守 */
  DEFENSE = 2,
  /** 死球 */
  DEAD_BALL = 3,
}

/** 回合请求 */
export interface MatchRoundRequest {
  readonly type: MatchRoundType;
  readonly roundId: number;
}

/** 回合结果 */
export interface MatchRoundResult {
  readonly roundId: number;
  readonly active: boolean;
  readonly nextRoundId: number;
}

export class MatchRoundService {
  constructor(readonly store: DataStore) {}

  /**
   * 启动比赛回合：初始化回合状态机（活跃/序列/计数器）。
   * 回合通过 BANK24_ROUND_TABLE 查询。
   */
  startRound(req: MatchRoundRequest): MatchRoundResult {
    const entry = findRoundById(req.roundId);
    this.store.write('ram_05E3', 1);
    this.store.write('ram_05E4', 0);
    this.store.write('ram_05E5', 0);
    this.store.write('ram_05E9', 0);
    this.store.write('ram_05F4', 0);
    return {
      roundId: req.roundId,
      active: true,
      nextRoundId: entry?.nextRoundId ?? 0,
    };
  }

  /**
   * 回合状态机更新：活跃 → 计数器递减 → 0 时装载下一段。
   */
  updateRound(): boolean {
    const active = this.store.read('ram_05E3');
    if (active === 0) return false;
    const counter = this.store.read('ram_05E9');
    if (counter > 0) {
      this.store.write('ram_05E9', counter - 1);
      return true;
    }
    const seq = this.store.read('ram_05E4') + 1;
    this.store.write('ram_05E4', seq);
    return true;
  }

  /**
   * 解析回合段：从指针读取回合数据，$F0+ 扩展标记 → 标记分发。
   */
  parseRoundSegment(): number | null {
    const y = this.store.read('ram_05E5');
    const ptr = this.store.read('ram_005F');
    const value = this.store.read(`ram_${ptr}_${y}`);
    if (value >= 0xF0) {
      return value & 0x0F;
    }
    this.store.write('ram_05E9', value);
    return value;
  }

  /** 回合标记解析：AND #$0F */
  resolveRoundFlag(flag: number): number {
    return flag & 0x0F;
  }

  /** 查询回合参数：BANK24_ROUND_POINTER_TABLE 查表 */
  findRoundParam(typeId: number): number {
    const table = BANK24_ROUND_POINTER_TABLE;
    const entry = table.find(t => t.typeId === typeId);
    return entry ? entry.paramId : 0;
  }

  /** 导出表供外部访问 */
  get table() { return BANK24_ROUND_TABLE; }
}