/**
 * MatchAuxService — 比赛辅助（原 bank20 辅助逻辑）
 *
 * @bank 20（比赛辅助：裁判/界外/角球/球门球等）
 *
 * V0.1 stub：契约签名；真实实现在 V0.5 覆盖。
 */
import type { DataStore } from '../../data/store/DataStore';

export class MatchAuxService {
  constructor(readonly store: DataStore) {}

  /** 处理死球/界外事件（V0.5 实现） */
  handleDeadBall(): void {
    // TODO V0.5
  }
}
