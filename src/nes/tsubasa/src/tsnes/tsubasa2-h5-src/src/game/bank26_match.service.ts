/**
 * Match Engine Service — Bank 26 (CPU $8000-$9FFF, PRG offset $34010-$3600F)
 *
 * 比赛核心引擎: 球员移动、碰撞检测、必杀技判定、射门/扑救逻辑
 * 这是整个游戏最复杂的 Bank，原始代码 ~8KB。
 *
 * 子区域 (来自 Bank 26 analysis):
 *   $8000 — NMI handler (PPU 渲染)
 *   $8045 — 主比赛循环
 *   $80?? — 球员移动 AI
 *   $82?? — 相持/碰撞解析
 *   $84?? — 传球/拦截
 *   $86?? — 射门/必杀技
 *   $88?? — 扑救/门将反应
 *   $8A?? — 进球/动画
 *   $8C?? — 事件分发/状态切换
 *   $8E?? — 球员替换
 *   $90?? — 数据表 (队伍/球员参数)
 */
import { DataStore } from '../data/DataStore';
import type { MatchPhase } from '../model/types';

/** 比赛状态 (flat, 不依赖 CPU) */
interface MatchState {
  phase: MatchPhase;
  timerLo: number;
  timerHi: number;
  scoreA: number;
  scoreB: number;
  ballX: number;
  ballY: number;
  ballOwner: number;  // 0=free, 1-11=home, 12-22=away
}

export class MatchEngineService {
  private _state: MatchState;
  private _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
    this._state = {
      phase: 0 as MatchPhase,
      timerLo: 0, timerHi: 0,
      scoreA: 0, scoreB: 0,
      ballX: 0, ballY: 0,
      ballOwner: 0,
    };
  }

  /** Bank 26 $8000 入口: NMI handler */
  nmiEntry(): void {
    // PPU 渲染 + 比赛帧更新
    // TODO: 翻译 $8000
  }

  /** Bank 26 $8045 入口: 主比赛循环 */
  mainLoop(): void {
    // 球员移动 → 碰撞 → 传球/拦截 → 射门/扑救 → 得分 → 动画
    // TODO: 翻译 $8045
  }

  /** 必杀技判定 */
  specialMoveCheck(_playerId: number, _moveId: number): boolean {
    // 检查体力是否足够，成功率计算
    // TODO: 翻译必杀技系统
    return false;
  }

  /** 射门处理 */
  handleShoot(_attackerId: number, _power: number): void {
    // 射门抛物线 + 门将反应 + 进球判断
    // TODO: 翻译射门系统
  }

  /** 获取比赛状态 */
  getState(): Readonly<MatchState> {
    return { ...this._state };
  }
}
