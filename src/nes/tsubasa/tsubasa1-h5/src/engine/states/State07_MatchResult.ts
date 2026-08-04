/**
 * State 07: 比赛结果画面
 *
 * 显示比赛最终比分和胜负结果。
 * 使用 ProgressManager 跟踪通关进度。
 * 如果有下一场比赛 → State 02 (菜单)
 * 如果全部比赛完成 → State 08 (通关画面)
 */
import { StateBase } from './StateBase';
import { Button } from '../../core/types';
import type { ProgressManager } from '../../model/ProgressManager';
import type { MatchEngine } from '../MatchEngine';

export class State07_MatchResult extends StateBase {
  readonly id = 7;

  private displayFrames: number = 0;
  private finalScore: [number, number] = [0, 0];
  private playerTeamName: string = '';
  private opponentTeamName: string = '';
  private progressManager: ProgressManager | null = null;
  private resultLogged: boolean = false;

  onEnter(): void {
    this.displayFrames = 0;
    this.resultLogged = false;
    this.finalScore = (this.data.get('finalScore') as [number, number]) ?? [0, 0];
    this.playerTeamName = (this.data.get('playerTeamName') as string) ?? 'Nankatsu';
    this.opponentTeamName = (this.data.get('opponentTeamName') as string) ?? 'Opponent';
    this.progressManager = this.data.get('progressManager') as ProgressManager || null;

    const result = this.finalScore[0] > this.finalScore[1] ? 'WIN' :
                   this.finalScore[0] < this.finalScore[1] ? 'LOSE' : 'DRAW';

    console.log(`[State 07] Match Result: ${this.playerTeamName} ${this.finalScore[0]}-${this.finalScore[1]} ${this.opponentTeamName} (${result})`);

    // 初始化结果 model
    this.model.setEvent(
      'result',
      0,
      0,
      this.finalScore,
    );
  }

  onUpdate(): void {
    this.displayFrames++;

    // 记录比赛结果 (只记录一次)
    if (!this.resultLogged && this.displayFrames >= 10) {
      this.resultLogged = true;
      this.logMatchResult();
    }

    // 显示 180 帧 (3秒) 或按 START 跳过
    if (this.displayFrames >= 180 || (this.displayFrames >= 30 && this.input.isPressed(Button.START))) {
      // 清理比赛数据
      this.data.set('eventType', '');
      this.data.set('finalScore', null);
      this.data.set('matchEngine', null);
      this.model.event.type = '';

      // 判断游戏流程
      this.decideNextState();
    }
  }

  /** 记录比赛结果到进度管理器 */
  private logMatchResult(): void {
    if (this.progressManager) {
      const engine = this.data.get('matchEngine') as MatchEngine | undefined;
      const frames = this.data.get('frameCounter') as number ?? 0;
      this.progressManager.endMatch(
        this.finalScore[0],
        this.finalScore[1],
        frames,
      );
    }

    const result = this.finalScore[0] > this.finalScore[1] ? 'WIN' :
                   this.finalScore[0] < this.finalScore[1] ? 'LOSE' : 'DRAW';
    console.log(`[State 07] Final: ${this.playerTeamName} ${this.finalScore[0]}-${this.finalScore[1]} ${this.opponentTeamName} [${result}]`);
  }

  /** 决定下一个状态 */
  private decideNextState(): void {
    if (this.progressManager) {
      const nextMatch = this.progressManager.advanceToNext();
      if (nextMatch) {
        // 还有下一场比赛 → 回到菜单准备
        console.log(`[State 07] Next match: #${nextMatch.matchNumber} vs ${nextMatch.opponentName}`);
        this.data.set('playerTeamName', nextMatch.playerTeamName);
        this.data.set('opponentTeamName', nextMatch.opponentName);
        this.sm.transitionTo(2);
        return;
      }
    }

    // 没有更多比赛 → 通关画面
    console.log('[State 07] No more matches → Game Complete!');
    this.sm.transitionTo(8);
  }
}
