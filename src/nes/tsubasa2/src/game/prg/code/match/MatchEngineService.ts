/**
 * MatchEngineService — 比赛核心引擎
 * @bank 26 ($8000-$9FFF)
 *
 * 职责: 比赛主循环、回合状态机、球员移动/传球/射门、比赛时钟。
 *
 * 命名规范: 旧名 MatchEngineService/bank26 → 新名 MatchEngineService (不变)。
 *
 * TODO: 翻译 asm/bank26 比赛引擎
 */
import { DataStore } from '../../data/store/DataStore';

export class MatchEngineService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 比赛主循环 (原 mainLoop) */
  mainLoop(frame: number): void {
    // TODO: 翻译比赛主循环
    void frame;
  }
}

export default MatchEngineService;
