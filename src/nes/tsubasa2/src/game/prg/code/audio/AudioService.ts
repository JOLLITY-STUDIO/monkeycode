/**
 * AudioService — 音频引擎 (APU 模拟 + BGM/SFX 数据)
 * @bank 12 + audio ROM (13/14/15 BGM)
 *
 * 职责: 音频播放请求, BGM/SE 数据管理, 帧推进。
 *
 * 命名规范: 旧名 Bank12AudioService → 新名 AudioService。
 *
 * TODO: 翻译 asm/bank12 音频引擎 + bank13-15 BGM 数据
 */
import { DataStore } from '../../data/store/DataStore';

export const SE_POINTER_TABLE: Readonly<Record<number, number>> = {
  // TODO: 从 asm/bank12 提取 SE 指针表
};

export const BGM_DATA_MAP: Readonly<Record<number, string>> = {
  // TODO: 从 asm/bank13-15 提取 BGM 数据映射
};

export class AudioService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 请求播放 (原 requestPlay) */
  requestPlay(id: number): boolean {
    // TODO: 翻译音频请求
    void id;
    return false;
  }

  /** 停止全部 */
  stopAll(): void {
    // TODO: 翻译停止逻辑
  }

  /** 帧推进 */
  update(): void {
    // TODO: 翻译音频帧推进
  }
}

export default AudioService;
