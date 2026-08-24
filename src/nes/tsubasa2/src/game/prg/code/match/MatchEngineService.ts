/**
 * MatchEngineService — 比赛主引擎
 *
 * 行为翻译（去 CPU 化）：
 * - 开始比赛：初始化双方球队、比分、时间、控球方
 * - 球员槽位装载：逐项写入 [playerId, type, state]
 * - 球员数据装载：槽位 → 帧工作区
 * - 球员交换：两个槽位内容互换
 * - 每帧比赛逻辑：球员遍历循环 → 帧尾例程 → 控球方分发（5 种状态机）
 * - 帧尾例程：HUD 更新 / 时间推进
 * - 控球方分发：5 种状态 → 防守例程 / 时间到 / 重置栈 / 暂停
 * - 防守例程：按控球方与标志位分发（跳过状态、设置标志）
 *
 * bank 切换 = import MatchEngineService + 直接调用，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
import { DEFAULT_MATCH_CONFIG, getMatchConfig } from '../../data/tables/match-config-table';

/** 比赛状态 */
export interface MatchState {
  readonly homeTeam: number;
  readonly awayTeam: number;
  homeScore: number;
  awayScore: number;
  timeMinutes: number;
  timeSeconds: number;
  /** 当前控球方 */
  possession: number;
  /** 当前球员索引 */
  currentPlayerIdx: number;
}

/** 球员槽位数据 */
export interface PlayerSlot {
  readonly slotIdx: number;
  readonly playerId: number;
  readonly type: number;
  readonly state: number;
}

export class MatchEngineService {
  constructor(readonly store: DataStore) {}

  /**
   * 开始比赛：初始化双方球队、比分、时间、控球方。
   */
  startMatch(homeTeam: number, awayTeam: number): MatchState {
    this.store.write('ram_044E', 0);
    this.store.write('ram_0621', 0);
    this.store.write('ram_0617', 0);
    const config = getMatchConfig(homeTeam, awayTeam);
    return {
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      timeMinutes: config.durationMinutes,
      timeSeconds: 0,
      possession: 0,
      currentPlayerIdx: 0,
    };
  }

  /**
   * 装载球员槽位：写入球员数 + 逐项 [playerId, type, state]。
   */
  loadPlayerSlots(playerIds: number[]): void {
    this.store.write('ram_0600', playerIds.length);
    for (let i = 0; i < playerIds.length; i++) {
      this.store.write(`ram_0601_${i}`, playerIds[i]);
      this.store.write(`ram_0606_${i}`, 0);
      this.store.write(`ram_060B_${i}`, 0);
    }
    this.store.write('ram_0617', playerIds.length);
  }

  /**
   * 读取球员槽位：[playerId, type, state]。
   */
  getPlayerSlot(idx: number): PlayerSlot {
    return {
      slotIdx: idx,
      playerId: this.store.read(`ram_0601_${idx}`),
      type: this.store.read(`ram_0606_${idx}`),
      state: this.store.read(`ram_060B_${idx}`),
    };
  }

  /**
   * 球员数据装载：槽位 → 帧工作区（state/type/playerId）。
   */
  loadPlayerData(idx: number): void {
    const slot = this.getPlayerSlot(idx);
    this.store.write('ram_043D', slot.state);
    this.store.write('ram_043E', slot.type);
    this.store.write('ram_0442', slot.playerId);
  }

  /**
   * 球员交换：两个槽位内容互换；type=1, state=0 标记为新槽。
   */
  swapPlayers(idxX: number, idxY: number): void {
    const slotX = this.getPlayerSlot(idxX);
    const slotY = this.getPlayerSlot(idxY);
    this.store.write(`ram_0601_${idxX}`, slotY.playerId);
    this.store.write(`ram_060B_${idxX}`, slotY.state);
    this.store.write(`ram_0606_${idxX}`, slotY.type);
    this.store.write(`ram_0606_${idxY}`, 1);
    this.store.write(`ram_060B_${idxY}`, 0);
    this.store.write(`ram_0601_${idxY}`, slotX.playerId);
  }

  /**
   * 每帧比赛逻辑：
   * - 球员遍历循环：递增索引 → 与总数比较 → 未到尾部继续
   * - 帧尾例程：HUD 更新 / 时间推进
   * - 控球方判定 → 分发
   */
  update(frame: number): void {
    void frame;
    const store = this.store;
    const totalPlayers = store.read('ram_0600');
    let currentIdx = store.read('ram_0616');
    currentIdx = (currentIdx + 1) & 0xFF;
    store.write('ram_0616', currentIdx);
    if (currentIdx !== totalPlayers) {
      return;
    }
    this.frameTailUpdate();
    const possession = store.read('ram_043B');
    this.dispatchPossession(possession);
  }

  /**
   * 帧尾更新：比赛时间递减；分钟/秒计满后半场/终场判定。
   */
  private frameTailUpdate(): void {
    const store = this.store;
    const seconds = store.read('ram_0469');
    if (seconds > 0) {
      store.write('ram_0469', seconds - 1);
    } else {
      const minutes = store.read('ram_0468');
      if (minutes > 0) {
        store.write('ram_0468', minutes - 1);
        store.write('ram_0469', 59);
      }
    }
  }

  /**
   * 控球方分发（5 种状态机）：
   * - 0: 继续主循环
   * - 1: 设置 ram_0612=$0A → 防守例程
   * - 2: 重置栈指针
   * - 3: 防守例程 → 重置栈
   * - 4: ram_0617=0 → 跳回主循环
   */
  private dispatchPossession(possession: number): void {
    const store = this.store;
    switch (possession) {
      case 0:
        break;
      case 1:
        store.write('ram_0612', 0x0A);
        this.defenseRoutine();
        break;
      case 2:
        break;
      case 3:
        this.defenseRoutine();
        break;
      case 4:
        store.write('ram_0617', 0);
        break;
      default:
        break;
    }
  }

  /**
   * 防守例程：
   * - ram_0617 bit7 置位 → 跳过
   * - 控球方=2 → 跳过
   * - ram_062D=0；ram_044E = ram_0444 & 3；ram_0617 |= 0x80
   */
  private defenseRoutine(): void {
    const store = this.store;
    const flags = store.read('ram_0617');
    if ((flags & 0x80) !== 0) return;
    const possession = store.read('ram_043B');
    if (possession === 2) return;
    store.write('ram_062D', 0);
    const playerFlags = store.read('ram_0444');
    store.write('ram_044E', playerFlags & 0x03);
    store.write('ram_0617', flags | 0x80);
  }

  /** 球员槽位递增：当前球员索引 +1 */
  advancePlayerSlot(): number {
    const idx = (this.store.read('ram_0616') + 1) & 0xFF;
    this.store.write('ram_0616', idx);
    return idx;
  }

  /** 检查球员遍历完成：当前索引 == 球员总数 */
  isPlayerTraversalComplete(): boolean {
    return this.store.read('ram_0616') === this.store.read('ram_0600');
  }

  /** 导出配置供外部访问 */
  get config() { return DEFAULT_MATCH_CONFIG; }
}