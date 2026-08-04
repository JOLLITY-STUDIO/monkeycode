/**
 * 游戏进度管理器
 *
 * 管理:
 *   - 当前比赛编号
 *   - 比赛历史记录
 *   - 脚本日志
 *
 * ⚠️ TODO: 比赛序列数据待从 ROM 提取
 */
import { FULL_MATCH_SEQUENCE, TOTAL_MATCHES, type MatchConfig } from '../data/MatchSequence';

export interface MatchResult {
  matchNumber: number;
  opponentName: string;
  playerScore: number;
  opponentScore: number;
  result: 'WIN' | 'LOSE' | 'DRAW';
  totalFrames: number;
  phase: string;
}

export interface GameProgress {
  currentMatchNumber: number;
  totalMatches: number;
  completedMatches: MatchResult[];
  phase: string;
  isGameComplete: boolean;
}

export class ProgressManager {
  private currentMatchNumber: number = 1;
  private completedMatches: MatchResult[] = [];
  private matchStartFrame: number = 0;
  private currentMatchConfig: MatchConfig | null = null;

  logCallback: ((msg: string) => void) | null = null;
  matchEndCallback: ((result: MatchResult, progress: GameProgress) => void) | null = null;
  gameCompleteCallback: (() => void) | null = null;

  constructor() {
    this.currentMatchConfig = FULL_MATCH_SEQUENCE[0] || null;
  }

  getCurrentMatch(): MatchConfig | null {
    return this.currentMatchConfig;
  }

  getProgress(): GameProgress {
    return {
      currentMatchNumber: this.currentMatchNumber,
      totalMatches: TOTAL_MATCHES,
      completedMatches: [...this.completedMatches],
      phase: this.currentMatchConfig?.phase || 'unknown',
      isGameComplete: TOTAL_MATCHES > 0 && this.currentMatchNumber > TOTAL_MATCHES,
    };
  }

  startMatch(frame: number): MatchConfig | null {
    this.matchStartFrame = frame;
    const match = FULL_MATCH_SEQUENCE.find(m => m.matchNumber === this.currentMatchNumber);
    if (match) {
      this.currentMatchConfig = match;
      this.log(`[Progress] 第 ${match.matchNumber}/${TOTAL_MATCHES} 场: ${match.playerTeamName} vs ${match.opponentName}`);
    }
    return this.currentMatchConfig;
  }

  endMatch(playerScore: number, opponentScore: number, totalFrames: number): MatchResult {
    let result: 'WIN' | 'LOSE' | 'DRAW';
    if (playerScore > opponentScore) result = 'WIN';
    else if (playerScore < opponentScore) result = 'LOSE';
    else result = 'DRAW';

    const matchResult: MatchResult = {
      matchNumber: this.currentMatchNumber,
      opponentName: this.currentMatchConfig?.opponentName || '???',
      playerScore,
      opponentScore,
      result,
      totalFrames: totalFrames - this.matchStartFrame,
      phase: this.currentMatchConfig?.phase || 'unknown',
    };

    this.completedMatches.push(matchResult);
    this.log(`[Progress] 比赛#${matchResult.matchNumber} 结束: ${matchResult.playerScore}-${matchResult.opponentScore} (${matchResult.result})`);

    if (this.matchEndCallback) {
      this.matchEndCallback(matchResult, this.getProgress());
    }
    return matchResult;
  }

  advanceToNext(): MatchConfig | null {
    this.currentMatchNumber++;
    if (TOTAL_MATCHES > 0 && this.currentMatchNumber > TOTAL_MATCHES) {
      this.log('[Progress] 全部比赛完成!');
      if (this.gameCompleteCallback) {
        this.gameCompleteCallback();
      }
      return null;
    }
    const next = FULL_MATCH_SEQUENCE.find(m => m.matchNumber === this.currentMatchNumber);
    if (next) this.currentMatchConfig = next;
    return this.currentMatchConfig;
  }

  getTotalScore(): [number, number] {
    return this.completedMatches.reduce(
      ([p, o], m) => [p + m.playerScore, o + m.opponentScore],
      [0, 0] as [number, number],
    );
  }

  getWinLossRecord(): { wins: number; losses: number; draws: number } {
    let wins = 0, losses = 0, draws = 0;
    for (const m of this.completedMatches) {
      if (m.result === 'WIN') wins++;
      else if (m.result === 'LOSE') losses++;
      else draws++;
    }
    return { wins, losses, draws };
  }

  generateLog(): string {
    const lines: string[] = [];
    lines.push('='.repeat(60));
    lines.push('  天使之翼 H5 - 通关日志');
    lines.push('='.repeat(60));
    for (const m of this.completedMatches) {
      const status = m.result === 'WIN' ? '胜' : m.result === 'LOSE' ? '败' : '平';
      lines.push(`  #${m.matchNumber}: vs ${m.opponentName}  ${m.playerScore}-${m.opponentScore}  ${status}  (${m.totalFrames}帧)`);
    }
    const total = this.getTotalScore();
    const wl = this.getWinLossRecord();
    lines.push(`\n累计比分: ${total[0]} - ${total[1]}`);
    lines.push(`胜负统计: ${wl.wins}胜 ${wl.draws}平 ${wl.losses}负`);
    lines.push('='.repeat(60));
    return lines.join('\n');
  }

  reset(): void {
    this.currentMatchNumber = 1;
    this.completedMatches = [];
    this.matchStartFrame = 0;
    this.currentMatchConfig = FULL_MATCH_SEQUENCE[0] || null;
  }

  private log(msg: string): void {
    if (this.logCallback) this.logCallback(msg);
    console.log(msg);
  }
}
