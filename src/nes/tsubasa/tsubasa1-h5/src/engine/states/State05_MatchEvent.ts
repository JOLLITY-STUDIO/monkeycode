/**
 * State 05: 比赛事件处理
 * 对应 ROM 中 $8270 的处理
 *
 * 处理: 射门、传球、铲球、剧情对话等事件
 */

import { StateBase } from './StateBase';

export class State05_MatchEvent extends StateBase {
  readonly id = 5;

  /** 事件类型 */
  private eventType: string = '';
  /** 事件步骤 */
  private eventStep: number = 0;
  /** 事件完成 */
  private eventComplete: boolean = false;

  onEnter(): void {
    console.log('[State 05] Match Event');

    // 从 DataCache 读取事件类型
    this.eventType = this.data.get<string>('eventType') || 'default';
    this.eventStep = 0;
    this.eventComplete = false;
  }

  onUpdate(): void {
    if (this.eventComplete) {
      this.sm.transitionTo(4); // 返回比赛主循环
      return;
    }

    this.processEvent();
  }

  private processEvent(): void {
    // 根据事件类型分步处理
    switch (this.eventType) {
      case 'shoot':
        this.processShoot();
        break;
      case 'pass':
        this.processPass();
        break;
      case 'tackle':
        this.processTackle();
        break;
      case 'dialogue':
        this.processDialogue();
        break;
      default:
        this.eventComplete = true;
        break;
    }
  }

  private processShoot(): void {
    // TODO: 射门动画
    this.eventStep++;
    if (this.eventStep > 60) {
      this.eventComplete = true;
    }
  }

  private processPass(): void {
    // TODO: 传球动画
    this.eventComplete = true;
  }

  private processTackle(): void {
    // TODO: 铲球动画
    this.eventComplete = true;
  }

  private processDialogue(): void {
    // TODO: 对话/剧情脚本
    this.eventComplete = true;
  }
}
