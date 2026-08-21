/**
 * SpriteService — 精灵生成器
 * @bank 22
 *
 * 职责: 数据+代码混合精灵生成 (原 HybridService)。
 *
 * 命名规范: 旧名 Bank22Service → 新名 SpriteService。
 *
 * TODO: 翻译 asm/bank22 精灵生成
 */
import { DataStore } from '../../data/store/DataStore';

export class SpriteService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 生成精灵组 */
  spawn(groupId: number): void {
    // TODO: 翻译精灵生成逻辑
    void groupId;
  }
}

export default SpriteService;
