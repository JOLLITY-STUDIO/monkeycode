/**
 * MatchEngineService — 比赛引擎（原 bank26 比赛引擎）
 *
 * @bank 26（比赛主引擎）
 *
 * V0.1 stub：契约签名；真实实现在 V0.5 覆盖。
 */
import type { DataStore } from '../../data/store/DataStore';

/** 比赛状态（ram_0468+ 系列实体，V0.5 定稿字段） */
export interface MatchState {
  readonly homeTeam: number;
  readonly awayTeam: number;
  homeScore: number;
  awayScore: number;
  timeMinutes: number;
  timeSeconds: number;
}

export class MatchEngineService {
  constructor(readonly store: DataStore) {}

  /** 开始比赛（V0.5 实现） */
  startMatch(homeTeam: number, awayTeam: number): MatchState {
    // TODO V0.5: 翻译比赛初始化（阵容装载/比分/时间）
    void homeTeam;
    void awayTeam;
    return { homeTeam, awayTeam, homeScore: 0, awayScore: 0, timeMinutes: 45, timeSeconds: 0 };
  }

  /** 每帧比赛逻辑（V0.5 实现） */
  update(frame: number): void {
    // TODO V0.5
    void frame;
  }
}
