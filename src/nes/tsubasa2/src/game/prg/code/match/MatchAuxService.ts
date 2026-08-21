/**
 * MatchAuxService — 比赛辅助 (计时状态机/精灵渲染/计分板)
 * @bank 20
 *
 * 职责: 4 路 dispatch (计时/计分板/精灵渲染), 15 code 段, 16 内部函数。
 *
 * 命名规范: 旧名 Bank20Service → 新名 MatchAuxService。
 *
 * TODO: 翻译 asm/bank20 (差分验证 17014/0 参照)
 */
import { DataStore } from '../../data/store/DataStore';

export class MatchAuxService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 比赛辅助帧推进 (原 dispatch 4 路) */
  update(frame: number): void {
    // TODO: 翻译 4 路 dispatch
    void frame;
  }
}

export default MatchAuxService;
