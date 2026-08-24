/**
 * MatchHudService — 比赛 HUD（比分/时间/体力条）
 *
 * V0.1 stub：契约签名；真实实现在 V0.5 覆盖。
 */
import type { DataStore } from '../../data/store/DataStore';

export class MatchHudService {
  constructor(readonly store: DataStore) {}

  /** 刷新 HUD 到渲染缓冲（V0.5 实现） */
  refresh(): void {
    // TODO V0.5: 翻译 HUD 渲染（比分/时间/体力条）
  }
}