/**
 * SpriteAnimationService — 精灵动画（原 bank27 精灵动画）
 *
 * @bank 27（精灵动画帧）
 *
 * V0.1 stub：契约签名；真实实现在 V0.5 覆盖。
 */
import type { DataStore } from '../../data/store/DataStore';

export class SpriteAnimationService {
  constructor(readonly store: DataStore) {}

  /** 推进动画帧（V0.5 实现） */
  advance(): void {
    // TODO V0.5
  }
}
