/**
 * AudioService — 音频引擎（原 bank12 音频）
 *
 * @bank 12（音频引擎 / BGM / SE）
 *
 * 对应原始地址：
 *   $0700: 音频请求队列（游戏逻辑写请求 → 本服务消费）
 *   $4000-$4017: APU 寄存器写（由渲染管线同步到 PAPU）
 *
 * V0.1 stub：请求队列契约；真实播放链路（BGM/SE 数据表）在 V0.6 覆盖。
 */
import type { DataStore } from '../../data/store/DataStore';

export class AudioService {
  constructor(readonly store: DataStore) {}

  /** 每帧推进音频引擎（读取 $0700 请求队列 → APU 寄存器，V0.6 实现） */
  update(): void {
    // TODO V0.6: 翻译 bank12 音频引擎 update
  }

  /** 请求播放音效（写入 $0700 队列，原版语义） */
  playSe(seId: number): void {
    // TODO V0.6
    void seId;
  }

  /** 请求播放 BGM */
  playBgm(bgmId: number): void {
    // TODO V0.6
    void bgmId;
  }
}
