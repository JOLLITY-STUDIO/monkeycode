/**
 * State 05: 比赛事件处理
 * 对应 ROM 中 $8270 的处理
 *
 * 处理: 进球动画、半场/终场显示、结果画面
 */
import { StateBase } from './StateBase';
import { MatchEngine, MatchPhase } from '../MatchEngine';

export class State05_MatchEvent extends StateBase {
  readonly id = 5;

  private eventType: string = '';
  private eventStep: number = 0;
  private matchEngine: MatchEngine | null = null;

  onEnter(): void {
    this.eventType = this.data.get<string>('eventType') || 'default';
    this.eventStep = 0;
    this.matchEngine = this.data.get('matchEngine') as MatchEngine || null;

    console.log(`[State 05] Event: ${this.eventType}`);

    // 持续事件时，清理画面
    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }
  }

  onUpdate(): void {
    switch (this.eventType) {
      case 'goal':
        this.processGoalEvent();
        break;
      case 'halftime':
      case 'fulltime':
        this.processResultEvent();
        break;
      default:
        this.sm.transitionTo(4);
        break;
    }
  }

  private processGoalEvent(): void {
    this.eventStep++;

    const eventData = this.data.get('eventData') as any;
    const scorer = eventData?.playerId ?? 0;

    // 显示 GOAL 文字
    if (this.eventStep === 1) {
      const goalText = 'GOAL!!';
      const startCol = 12;
      for (let i = 0; i < goalText.length; i++) {
        this.renderer.writeVram(0x2000 + 14 * 32 + startCol + i, goalText.charCodeAt(i));
      }
      console.log(`[State 05] GOAL!! by player ${scorer}`);
    }

    // 进球动画持续 120 帧 (2秒)
    if (this.eventStep > 120) {
      this.data.set('eventType', '');
      this.sm.transitionTo(4);
    }
  }

  private processResultEvent(): void {
    this.eventStep++;

    const matchEngine = this.matchEngine;
    if (!matchEngine) {
      this.sm.transitionTo(2); // 回菜单
      return;
    }

    const score = matchEngine.score;
    const resultText = `FINAL  ${score[0]} - ${score[1]}`;

    if (this.eventStep === 1) {
      const startCol = 10;
      for (let i = 0; i < resultText.length; i++) {
        this.renderer.writeVram(0x2000 + 12 * 32 + startCol + i, resultText.charCodeAt(i));
      }
      console.log(`[State 05] Final score: ${score[0]} - ${score[1]}`);
    }

    // 结果显示 300 帧 (5秒) 后回菜单
    if (this.eventStep > 300) {
      this.data.set('eventType', '');
      this.sm.transitionTo(2);
    }
  }
}
