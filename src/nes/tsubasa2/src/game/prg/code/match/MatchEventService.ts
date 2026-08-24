/**
 * MatchEventService — 比赛事件
 *
 * 行为翻译（去 CPU 化）：
 * - 启动事件：清零事件参数区 → 装载事件参数 → 目标坐标
 * - 事件状态机更新：计数器递减 → 0 时读取下一段
 * - 解析事件段：$F0+ 扩展标记 → 标记分发
 * - 事件标记解析：SEC; SBC #$F0 → 事件标记分发
 * - 查询事件指针：BANK20_EVENT_POINTER_TABLE 查表
 *
 * bank 切换 = import MatchEventService + 直接调用，无 MMC3 窗口模拟。
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
   * 启动比赛事件：事件类型 → 计数器 → 装载事件参数 → 目标坐标。
   * 步长 0x15 清零 0x 0x7E 范围事件参数区。
   */
  startEvent(req: MatchEventRequest): MatchEventResult {
    const entry = findEventById(req.eventId);
    this.store.write('ram_053A', req.type);
    this.store.write('ram_053B', 1);
    for (let x = 0; x < 0x7E; x += 0x15) {
      this.store.write(`ram_0547_${x}`, 0);
    }
    this.store.write('ram_053D', 0);
    this.store.write('ram_0540', 0);
    this.store.write('ram_0541', 0xFF);
    this.store.write('ram_0543', 1);
    this.store.write('ram_0544', 0x23);
    this.store.write('ram_0545', 0x45);
    this.store.write('ram_0547', req.targetX & 0xFF);
    this.store.write('ram_0548', req.targetY & 0xFF);
    return {
      eventId: req.eventId,
      success: true,
      nextEventId: entry?.nextEventId ?? 0,
    };
  }

  /** 事件状态机更新：计数器递减 → 0 时读取下一段 */
  updateEvent(): boolean {
    const counter = this.store.read('ram_053B');
    if (counter > 0) {
      this.store.write('ram_053B', counter - 1);
      return true;
    }
    return false;
  }

  /** 解析事件段：$F0+ 扩展标记 → 标记分发 */
  parseEventSegment(): number | null {
    const ptr = this.store.read('ram_004C');
    const y = this.store.read('ram_004D');
    const value = this.store.read(`ram_${ptr}_${y}`);
    if (value >= 0xF0) {
      return value - 0xF0;
    }
    this.store.write('ram_053B', value);
    return value;
  }

  /** 事件标记解析：SEC; SBC #$F0 */
  resolveEventFlag(flag: number): number {
    return flag - 0xF0;
  }

  /** 查询事件动作脚本偏移：BANK20_EVENT_POINTER_TABLE 查表（已消除 lo/hi 拆分） */
  findEventPointer(eventId: number): number {
    const entry = BANK20_EVENT_POINTER_TABLE.find(p => p.eventId === eventId);
    return entry ? entry.target : 0;
  }

  /** 导出表供外部访问 */
  get table() { return BANK20_EVENT_TABLE; }
}