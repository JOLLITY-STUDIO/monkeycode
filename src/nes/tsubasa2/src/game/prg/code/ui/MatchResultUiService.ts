/**
 * MatchResultUiService — 比赛终场界面
 *
 * UI 元素（比赛结束后 1-2 秒显示）：
 *   - 终场比分 (HOME - AWAY)
 *   - 进球球员名
 *   - XP 获得 + 升级箭头
 *   - "PRESS A TO CONTINUE"
 *
 * 数据消费：
 *   - data/tables/match-config-table (赛事配置)
 *   - data/tables/team-table (队名)
 *   - data/tables/player-table (球员名 + 经验)
 *   - data/tables/levelup-table (等级查询)
 *   - data/store/DataStore ram_044E/0450 (比分), ram_0468+ (经验)
 *
 * 当前：V1.0 stub 实现（基础查询 + 视图对象）。NT/OAM 写入待 V1.0 收尾。
 */
import type { DataStore } from '../../data/store/DataStore';
import { findLevelByExp, findLevelById } from '../../data/tables/levelup-table';
import { findTeamNameById } from '../../data/tables/team-table';
import { findPlayerNameById, findPlayerById } from '../../data/tables/player-table';
import { getMatchConfig } from '../../data/tables/match-config-table';

export interface MatchResultInput {
  readonly homeTeam: number;
  readonly awayTeam: number;
  readonly homeScore: number;
  readonly awayScore: number;
  /** 进球球员 ID 列表（按时间顺序） */
  readonly scorers: ReadonlyArray<number>;
  /** 用户控制球员 ID（MVP） */
  readonly mvpPlayerId: number;
  /** 获得经验 */
  readonly expGained: number;
  /** MVP 累计经验（升级前） */
  readonly mvpExpBefore: number;
}

export interface MatchResultView {
  readonly homeName: string;
  readonly awayName: string;
  readonly scoreText: string;
  readonly winner: 'home' | 'away' | 'draw';
  readonly scorerNames: ReadonlyArray<string>;
  readonly mvpName: string;
  readonly mvpLevelBefore: number;
  readonly mvpLevelAfter: number;
  readonly leveledUp: boolean;
  readonly expGained: number;
  readonly expRequiredNext: number;
  readonly tournament: string;
}

export class MatchResultUiService {
  private step = 0;
  private frameCount = 0;

  constructor(readonly store: DataStore) {}

  reset(): void {
    this.step = 0;
    this.frameCount = 0;
  }

  /**
   * 输入比赛结果数据 → 输出渲染视图。
   */
  render(input: MatchResultInput): MatchResultView {
    const homeName = findTeamNameById(input.homeTeam) || 'HOME';
    const awayName = findTeamNameById(input.awayTeam) || 'AWAY';
    const winner: MatchResultView['winner'] =
      input.homeScore > input.awayScore ? 'home' :
      input.homeScore < input.awayScore ? 'away' : 'draw';
    const scorerNames = input.scorers.map(id => findPlayerNameById(id) || `#${id}`);
    const mvp = findPlayerById(input.mvpPlayerId);
    const mvpName = mvp?.name || `#${input.mvpPlayerId}`;
    const lvBefore = findLevelByExp(input.mvpExpBefore);
    const lvAfter = findLevelByExp(input.mvpExpBefore + input.expGained);
    const nextLv = lvAfter < 30 ? findLevelById(lvAfter + 1) : null;
    const cfg = getMatchConfig(input.homeTeam, input.awayTeam);

    const view: MatchResultView = {
      homeName,
      awayName,
      scoreText: `${input.homeScore} - ${input.awayScore}`,
      winner,
      scorerNames,
      mvpName,
      mvpLevelBefore: lvBefore,
      mvpLevelAfter: lvAfter,
      leveledUp: lvAfter > lvBefore,
      expGained: input.expGained,
      expRequiredNext: nextLv ? nextLv.expRequired - (input.mvpExpBefore + input.expGained) : 0,
      tournament: cfg.tournament,
    };

    // 状态机：step 0 = 显示分数，step 1 = 进球者，step 2 = 升级，step 3 = 按键继续
    if (this.step === 0 && this.frameCount > 30) {
      this.drawScore(view);
      this.step = 1;
    } else if (this.step === 1 && this.frameCount > 60) {
      this.drawScorers(view);
      this.step = 2;
    } else if (this.step === 2 && this.frameCount > 90) {
      if (view.leveledUp) this.drawLevelUp(view);
      this.step = 3;
    }
    this.frameCount++;
    return view;
  }

  private drawScore(view: MatchResultView): void {
    // TODO V1.0: 写 NT 缓冲头部 "HOME - AWAY" + 大字号比分
    void view;
  }

  private drawScorers(view: MatchResultView): void {
    // TODO V1.0: 写 NT 缓冲 "GOALS" + 进球者名列表
    void view;
  }

  private drawLevelUp(view: MatchResultView): void {
    // TODO V1.0: 写 NT 缓冲 "LEVEL UP!" + 升级前后等级对比
    void view;
  }

  exit(): void {
    this.step = 0;
    this.frameCount = 0;
  }

  get currentStep(): number { return this.step; }
}
