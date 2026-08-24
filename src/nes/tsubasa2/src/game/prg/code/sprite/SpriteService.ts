/**
 * SpriteService — 精灵生成
 *
 * V0.1 stub：契约签名；真实实现在 V0.5 覆盖。
 */
import type { DataStore } from '../../data/store/DataStore';

export class SpriteService {
  constructor(readonly store: DataStore) {}

  /** 将一个元精灵写入 OAM 缓冲（V0.5 实现） */
  putSprite(spriteId: number, x: number, y: number): void {
    // TODO V0.5
    void spriteId;
    void x;
    void y;
  }
}