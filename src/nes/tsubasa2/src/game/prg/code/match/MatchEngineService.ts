/**
 * MatchEngineService — 比赛主引擎（原 bank26）
 *
 * 行为翻译（去 CPU 化）：
 * - bank26 $8000 入口：大量 JMP 表分发（$84F8/$86F6/$8835/$87E1/$888D/$88A8/$8B4A/$8F72/$8CA4 等）
 * - $803C+：比赛初始化（ram_044E/0621 清零 → JSR $C600 → 切 bank → ram_0600 判定）
 * - $805A+：球员槽位初始化（ram_0617 球员数 → ram_0601+ 球员ID → ram_0606+ 类型 → ram_060B+ 状态）
 * - $8084+：球员数据装载（ram_060B,X → ram_043D/043E/0442）
 * - $8277+：球员交换逻辑（ram_0601/Y 与 ram_0601/X 交换 → ram_0606/Y=$01）
 *
 * bank 切换语义 = import MatchEngineService + 直接调用，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
import { DEFAULT_MATCH_CONFIG, getMatchConfig, type MatchConfigEntry } from '../../data/tables/match-config-table';

/** 比赛状态（ram_0468+ 系列实体） */
export interface MatchState {
  readonly homeTeam: number;
  readonly awayTeam: number;
  homeScore: number;
  awayScore: number;
  timeMinutes: number;
  timeSeconds: number;
  /** 当前控球方（ram_043B） */
  possession: number;
  /** 当前球员索引（ram_0616） */
  currentPlayerIdx: number;
}

/** 球员槽位数据（ram_0601+/0606+/060B+ 系列） */
export interface PlayerSlot {
  readonly slotIdx: number;
  readonly playerId: number;
  readonly type: number;
  readonly state: number;
}

export class MatchEngineService {
  constructor(readonly store: DataStore) {}

  /**
   * 开始比赛（原 bank26 $803C-$8057）
   *
   * 行为：ram_044E/0621 清零 → 初始化 → 球员槽位装载。
   * bank 切换（JSR $C600）= import + 直接调用，无 MMC3 窗口。
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
   * 装载球员槽位（原 bank26 $805A-$8127）
   *
   * 行为：ram_0600 球员数 → 遍历 ram_0601+/0606+/060B+。
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
   * 读取球员槽位（原 bank26 $8084-$80B6）
   *
   * 行为：ram_0616 当前索引 → ram_060B/0606/0601 读取。
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
   * 球员数据装载（原 bank26 $808E-$80B6）
   *
   * 行为：ram_060B → ram_043D; ram_0606 → ram_043E; ram_0601 → ram_0442。
   */
  loadPlayerData(idx: number): void {
    const slot = this.getPlayerSlot(idx);
    this.store.write('ram_043D', slot.state);
    this.store.write('ram_043E', slot.type);
    this.store.write('ram_0442', slot.playerId);
  }

  /**
   * 球员交换（原 bank26 $823E-$8277）
   *
   * 行为：ram_0601/X ↔ ram_0601/Y 交换；ram_0606/Y=$01; ram_060B/Y=$00。
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
   * 每帧比赛逻辑（原 bank26 $803C-$80F0 主循环 + $80EA-$80F0 帧尾）
   *
   * 行为：
   * - $80DF: INC ram_0616（当前球员索引递增）
   * - $80E2: CMP ram_0600（与球员总数比较）
   * - $80E5: BEQ $80EA（遍历完所有球员 → 执行帧尾）
   * - $80E7: JMP $8074（继续下一个球员）
   * - $80EA: JSR $9085（帧尾例程：HUD 更新/时间推进）
   * - $80F0: LDA ram_043B → 控球方判定 → 分发
   *
   * bank 切换（JSR $C606/$C618 等）= import + 直接调用，无 MMC3 窗口。
   */
  update(frame: number): void {
    void frame;
    const store = this.store;
    // 球员遍历循环（原 $80DF-$80E7）
    const totalPlayers = store.read('ram_0600');
    let currentIdx = store.read('ram_0616');
    currentIdx = (currentIdx + 1) & 0xFF;
    store.write('ram_0616', currentIdx);
    if (currentIdx !== totalPlayers) {
      // 继续遍历下一个球员（原 JMP $8074）
      return;
    }
    // 所有球员处理完毕 → 帧尾例程（原 $80EA: JSR $9085）
    this.frameTailUpdate();
    // 控球方判定（原 $80F0: LDA ram_043B）
    const possession = store.read('ram_043B');
    this.dispatchPossession(possession);
  }

  /**
   * 帧尾更新（原 bank26 $80EA: JSR $9085）
   *
   * 行为：HUD 更新、比赛时间推进、比分检查。
   * 原 $9085 调用 $C509 分发表 → 具体帧尾例程。
   */
  private frameTailUpdate(): void {
    const store = this.store;
    // 原 $9085: 帧尾例程 — 更新比赛时间
    // ram_0468+ 系列比分/时间状态推进
    const seconds = store.read('ram_0469');
    if (seconds > 0) {
      store.write('ram_0469', seconds - 1);
    } else {
      const minutes = store.read('ram_0468');
      if (minutes > 0) {
        store.write('ram_0468', minutes - 1);
        store.write('ram_0469', 59);
      }
      // 时间到 → 半场/终场判定（原 $8124: JMP $C621）
    }
  }

  /**
   * 控球方分发（原 bank26 $80F0-$8104）
   *
   * 行为：ram_043B 控球方 → JSR $C509 分发表 → 对应例程。
   * 原 $80FE: 跳转表 5 项（$8007/$8118/$811E/$8120/$8170）。
   */
  private dispatchPossession(possession: number): void {
    const store = this.store;
    // 原 $80F0: LDA ram_043B; JSR $C509; 跳转表分发
    // possession = 0: 进攻方控球
    // possession = 1: 防守方控球
    // possession = 2: 死球
    if (possession === 0) {
      // 进攻方例程（原 $8007）
      store.write('ram_0617', store.read('ram_0617') | 0x80);
    } else if (possession === 1) {
      // 防守方例程（原 $8118）
      store.write('ram_062D', 0);
    } else if (possession === 2) {
      // 死球例程（原 $811E）
      store.write('ram_0617', 0);
    }
  }

  /**
   * 球员槽位递增（原 bank26 $80DF）
   *
   * 行为：INC ram_0616（当前球员索引 +1）。
   */
  advancePlayerSlot(): number {
    const idx = (this.store.read('ram_0616') + 1) & 0xFF;
    this.store.write('ram_0616', idx);
    return idx;
  }

  /**
   * 检查球员遍历完成（原 bank26 $80E2-$80E5）
   *
   * 行为：CMP ram_0600 → BEQ（全部球员处理完毕）。
   */
  isPlayerTraversalComplete(): boolean {
    return this.store.read('ram_0616') === this.store.read('ram_0600');
  }

  /** 导出配置供外部访问 */
  get config() { return DEFAULT_MATCH_CONFIG; }
}
