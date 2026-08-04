/**
 * State 05: 比赛事件处理 (纯逻辑 — 只更新 EventModel)
 *
 * 处理: 进球动画、半场/终场显示、结果画面。
 *
 * v0.6.0: 已移除所有 renderer 直接调用，通过 GameModel 通信。
 */
import { StateBase } from './StateBase';
import type { MatchEngine } from '../MatchEngine';

export class State05_MatchEvent extends StateBase {
  readonly id = 5;

  private eventType: string = '';
  private matchEngine: MatchEngine | null = null;

  onEnter(): void {
    this.eventType = this.data.get<string>('eventType') || 'default';
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
    // 进球动画持续 120 帧 (2秒) 后回到比赛
    if (this.model.event.step > 120) {
      this.data.set('eventType', '');
      this.model.event.type = '';
      this.sm.transitionTo(4);
    }
  }

  private processResultEvent(): void {
    if (!this.matchEngine) {
      this.sm.transitionTo(2);
      return;
    }

    // 结果显示 300 帧 (5秒) 后回菜单
    if (this.model.event.step > 300) {
      this.data.set('eventType', '');
      this.model.event.type = '';
      this.sm.transitionTo(2);
    }
  }
}
