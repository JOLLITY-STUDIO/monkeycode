/**
 * SpriteAnimationService — 场景/精灵动画数据加载 + 动画帧推进
 * @bank 27
 *
 * 职责: 动画数据加载, 动画帧推进 (差分验证 7274/0 参照)。
 *
 * 命名规范: 旧名 Bank27Service → 新名 SpriteAnimationService。
 *
 * TODO: 翻译 asm/bank27 动画数据
 */
import { DataStore } from '../../data/store/DataStore';

export class SpriteAnimationService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 动画帧推进 */
  update(frame: number): void {
    // TODO: 翻译动画帧推进
    void frame;
  }
}

export default SpriteAnimationService;
