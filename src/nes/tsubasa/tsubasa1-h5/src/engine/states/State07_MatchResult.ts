/**
 * State 07: 比赛结果画面
 *
 * 显示比赛最终比分和胜负结果。
 * 显示一段时间后返回菜单或继续剧情。
 *
 * v0.7.0: 新增状态，完善比赛流程
 */
import { StateBase } from './StateBase';
import { Button } from '../../core/types';

export class State07_MatchResult extends StateBase {
  readonly id = 7;

  private displayFrames: number = 0;
  private finalScore: [number, number] = [0, 0];
  private playerTeamName: string = '';
  private opponentTeamName: string = '';

  onEnter(): void {
    this.displayFrames = 0;
    this.finalScore = (this.data.get('finalScore') as [number, number]) ?? [0, 0];
    this.playerTeamName = (this.data.get('playerTeamName') as string) ?? 'Nankatsu';
    this.opponentTeamName = (this.data.get('opponentTeamName') as string) ?? 'Opponent';

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

    // 显示 360 帧 (6秒) 或按 START 跳过
    if (this.displayFrames >= 360 || this.input.isPressed(Button.START)) {
      // 记录比赛结果日志
      const result = this.finalScore[0] > this.finalScore[1] ? 'WIN' :
                     this.finalScore[0] < this.finalScore[1] ? 'LOSE' : 'DRAW';
      console.log(`[State 07] Final: ${this.playerTeamName} ${this.finalScore[0]}-${this.finalScore[1]} ${this.opponentTeamName} [${result}]`);

      // 清理比赛数据
      this.data.set('eventType', '');
      this.data.set('finalScore', null);
      this.data.set('matchEngine', null);
      this.model.event.type = '';

      // 返回菜单
      this.sm.transitionTo(2);
    }
  }
}
