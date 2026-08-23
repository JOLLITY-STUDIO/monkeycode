/**
 * MatchEventService — 比赛事件（原 bank20）
 *
 * 行为翻译（去 CPU 化）：
 * - bank20 $8000 入口：JMP 表分发 4 个事件入口（$84DC/$83D9/$8624/$8796）
 * - $8010+：事件状态机（ram_053A 事件类型 → ram_053B 计数器 → ram_0547+ 事件参数）
 * - $8084+：事件标记解析（$F0 扩展 → JSR $C509）
 * - $80AB+：事件参数装载（ram_0538/0539 目标坐标）
 *
 * bank 切换语义 = import MatchEventService + 直接调用，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
import { BANK20_EVENT_TABLE, BANK20_EVENT_POINTER_TABLE, findEventById } from '../../data/tables/match-event-table';

/** 比赛事件类型 */
export enum MatchEventType {
  /** 射门 */
  SHOT = 0,
  /** 传球 */
  PASS = 1,
  /** 必杀技 */
  SPECIAL = 2,
  /** 对峙 */
  CONFRONT = 3,
}

/** 比赛事件请求 */
export interface MatchEventRequest {
  readonly type: MatchEventType;
  readonly eventId: number;
  readonly targetX: number;
  readonly targetY: number;
  readonly power: number;
}

/** 比赛事件结果 */
export interface MatchEventResult {
  readonly eventId: number;
  readonly success: boolean;
  readonly nextEventId: number;
}

export class MatchEventService {
  constructor(readonly store: DataStore) {}

  /**
   * 启动比赛事件（原 bank20 $8010-$8067）
   *
   * 行为：ram_053A 事件类型 → 设置 ram_053B 计数器 → 装载事件参数。
   * 事件通过 BANK20_EVENT_TABLE 查询，不读 CPU 地址。
   */
  startEvent(req: MatchEventRequest): MatchEventResult {
    const entry = findEventById(req.eventId);
    this.store.write('ram_053A', req.type);
    this.store.write('ram_053B', 1);
    this.store.write('ram_053D', 0);
    this.store.write('ram_0540', 0);
    this.store.write('ram_0541', 0xFF);
    this.store.write('ram_0543', 1);
    this.store.write('ram_0544', 0x23);
    this.store.write('ram_0545', 0x45);
    // 目标坐标
    this.store.write('ram_0547', req.targetX & 0xFF);
    this.store.write('ram_0548', req.targetY & 0xFF);
    return {
      eventId: req.eventId,
      success: true,
      nextEventId: entry?.nextEventId ?? 0,
    };
  }

  /**
   * 事件状态机更新（原 bank20 $8067-$8083）
   *
   * 行为：ram_053B 递减 → 0 时读取事件序列段。
   */
  updateEvent(): boolean {
    const counter = this.store.read('ram_053B');
    if (counter > 0) {
      this.store.write('ram_053B', counter - 1);
      return true;
    }
    return false;
  }

  /**
   * 解析事件段（原 bank20 $806D-$8083）
   *
   * 行为：从指针读取事件数据，$F0+ 扩展标记 → JSR $8084。
   */
  parseEventSegment(): number | null {
    const ptr = this.store.read('ram_004C');
    const y = this.store.read('ram_004D');
    const value = this.store.read(`ram_${ptr}_${y}`);
    if (value >= 0xF0) {
      // 扩展标记：SEC; SBC #$F0; JSR $C509
      return value - 0xF0;
    }
    this.store.write('ram_053B', value);
    return value;
  }

  /**
   * 事件标记解析（原 bank20 $8084-$80A9）
   *
   * 行为：SEC; SBC #$F0 → 事件标记分发。
   */
  resolveEventFlag(flag: number): number {
    return flag - 0xF0;
  }

  /**
   * 查询事件指针（原 bank20 $88E4 表）
   */
  findEventPointer(eventId: number): number {
    const entry = BANK20_EVENT_POINTER_TABLE.find(p => p.eventId === eventId);
    return entry ? (entry.hi << 8) | entry.lo : 0;
  }

  /** 导出表供外部访问 */
  get table() { return BANK20_EVENT_TABLE; }
}
