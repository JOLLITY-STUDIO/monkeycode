/**
 * MatchTurnService — 比赛回合（原 bank11 回合逻辑）
 *
 * @bank 11（比赛回合）
 *
 * V0.1 stub：契约签名；真实实现在 V0.5 覆盖。
 */
import type { DataStore } from '../../data/store/DataStore';

export class MatchTurnService {
  constructor(readonly store: DataStore) {}

  /** 推进一个回合（传球/带球/射门/铲球，V0.5 实现） */
  advanceTurn(): void {
    // TODO V0.5: 翻译回合主循环
  }
}
