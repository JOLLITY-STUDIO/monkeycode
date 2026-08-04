/**
 * State 05: 比赛事件处理 (进球动画)
 *
 * 处理进球后的短暂动画显示。
 * halftime/fulltime 事件已移至 State 06 处理。
 *
 * v0.7.0: 简化 — 只处理 goal 事件，halftime/fulltime 委托 State 06
 */
import { StateBase } from './StateBase';
import type { MatchEngine } from '../MatchEngine';

export class State05_MatchEvent extends StateBase {
  readonly id = 5;

  private eventType: string = '';
  private matchEngine: MatchEngine | null = null;

  onEnter(): void {
    this.eventType = this.data.get<string>('eventType') || 'goal';
    this.matchEngine = this.data.get('matchEngine') as MatchEngine || null;

    console.log(`[State 05] Event: ${this.eventType}`);

    // 初始化 event model
    if (this.matchEngine) {
      this.model.setEvent(
        this.eventType as any,
        0,
        this.data.get('eventData')?.playerId ?? 0,
        this.matchEngine.score as [number, number],
      );
    } else {
      this.model.setEvent(this.eventType as any, 0);
    }
  }

  onUpdate(): void {
    this.model.advanceEvent();

    // 进球动画持续 120 帧 (2秒) 后回到比赛
    if (this.model.event.step > 120) {
      this.data.set('eventType', '');
      this.data.set('eventData', null);
      this.model.event.type = '';
      this.sm.transitionTo(4);
    }
  }
}
