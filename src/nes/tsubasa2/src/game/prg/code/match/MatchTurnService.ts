/**
 * MatchTurnService — 比赛回合逻辑
 * @bank 11 (回合/滚动/精灵组)
 *
 * 职责: 回合推进、滚动控制、脚本处理、精灵组写入。
 *
 * 命名规范: 旧名 Bank11Service → 新名 MatchTurnService。
 *
 * TODO: 翻译 asm/bank11 (差分验证 10064/0 参照)
 */
import { DataStore } from '../../data/store/DataStore';

export class MatchTurnService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 回合推进 (原 frameTick) */
  update(frame: number): void {
    // TODO: 翻译回合逻辑
    void frame;
  }
}

export default MatchTurnService;
