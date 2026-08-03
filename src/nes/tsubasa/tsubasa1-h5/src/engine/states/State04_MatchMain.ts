/**
 * State 04: 比赛主循环
 * 对应 ROM 中 $826A 的处理
 */

import { StateBase } from './StateBase';
import { Button } from '../../core/types';

export class State04_MatchMain extends StateBase {
  readonly id = 4;

  /** 比赛时间 */
  private matchTime: number = 0;

  /** 比分 */
  private score: [number, number] = [0, 0];

  /** 当前控球方 */
  private possession: 0 | 1 = 0;

  onEnter(): void {
    console.log('[State 04] Match Main - Start');
    this.matchTime = 0;
    this.score = [0, 0];
    this.possession = 0;

    // 允许游戏逻辑更新
    this.data.bankLock = 0;

    // 加载比赛场景
    this.loadMatchScene();
  }

  onUpdate(): void {
    // 比赛时间更新
    this.matchTime++;

    // 比赛逻辑 (后续会拆分到 MatchEngine)
    this.updateMatch();

    // 暂停检查
    if (this.input.isPressed(Button.START)) {
      // TODO: 暂停菜单
    }
  }

  private loadMatchScene(): void {
    // TODO: 加载球场背景、球员数据、UI等
  }

  private updateMatch(): void {
    // TODO: 完整的比赛引擎逻辑
    // - 球员移动
    // - 球移动
    // - AI决策
    // - 碰撞检测
    // - 事件触发
  }
}
