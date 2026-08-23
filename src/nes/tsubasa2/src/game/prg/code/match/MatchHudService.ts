/**
 * MatchHudService — 比赛 HUD（原 bank24 HUD 渲染）
 *
 * @bank 24（HUD/记分牌）
 *
 * 对应原始地址：ram_046F+ HUD 数据区。
 *
 * V0.1 stub：契约签名；真实实现在 V0.5 覆盖。
 */
import type { DataStore } from '../../data/store/DataStore';

export class MatchHudService {
  constructor(readonly store: DataStore) {}

  /** 刷新 HUD 到渲染缓冲（$05E8，V0.5 实现） */
  refresh(): void {
    // TODO V0.5: 翻译 HUD 渲染（比分/时间/体力条）
  }
}
