/**
 * State 06: 半场/终场过渡画面
 *
 * 处理半场休息和终场过渡的显示。
 * 半场: 显示 "HALF TIME" 后回到下半场比赛
 * 终场: 短暂显示后进入结果画面 (State 07)
 *
 * v0.7.0: 新增状态，完善比赛流程
 */
import { StateBase } from './StateBase';

export class State06_Halftime extends StateBase {
  readonly id = 6;

  private isHalftime: boolean = false;
  private displayFrames: number = 0;

  onEnter(): void {
    const eventType = this.data.get<string>('eventType') || '';
    this.isHalftime = eventType === 'halftime';
    this.displayFrames = 0;

    console.log(`[State 06] ${this.isHalftime ? 'Halftime' : 'Fulltime transition'}`);

    // 初始化过渡画面 model
    this.model.setEvent(
      this.isHalftime ? 'halftime' : 'fulltime',
      0,
      0,
      (this.data.get('finalScore') as [number, number]) ?? [0, 0],
    );
  }

  onUpdate(): void {
    this.displayFrames++;

    if (this.isHalftime) {
      // 半场: 显示 180 帧 (3秒) 后回到比赛
      if (this.displayFrames >= 180) {
        this.data.set('eventType', '');
        this.model.event.type = '';
        this.sm.transitionTo(4); // 回到比赛 (下半场)
      }
    } else {
      // 终场: 显示 120 帧 (2秒) 后进入结果画面
      if (this.displayFrames >= 120) {
        this.sm.transitionTo(7); // 进入结果画面
      }
    }
  }
}
