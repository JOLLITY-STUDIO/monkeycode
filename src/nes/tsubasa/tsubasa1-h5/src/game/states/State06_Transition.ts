/**
 * 状态 6: 半场/比赛结束过渡
 * 
 * 对应原始 ROM:
 *   Bank $00: $8264-$826F
 * 
 * 功能:
 *   半场休息画面、比赛结束过渡动画。
 *   显示当前比分，等待玩家按 Start 继续。
 *   半场后返回比赛，终场后进入结算。
 */

import { StateBase, StateContext } from './StateBase';
import { GameState } from '../GameStateTable';
import { RAM } from '../../rom/types';

export class State06_Transition extends StateBase {
  readonly state = GameState.MATCH_TRANSITION;
  readonly name = '半场/过渡';

  private localFrame: number = 0;

  enter(ctx: StateContext): void {
    console.log(`[${this.name}] 进入状态 6`);
    this.localFrame = 0;

    // TODO: 加载半场/终场画面
    //   1. 判断是半场还是终场 (通过某个 RAM 变量)
    //   2. 显示比分
    //   3. 半场: 显示 "HALF TIME"
    //   4. 终场: 显示 "FULL TIME"
  }

  update(ctx: StateContext): void {
    this.localFrame++;

    // TODO: 实现过渡画面逻辑
    // 对应 $8264 的逻辑:
    //   1. 显示过渡画面
    //   2. 等待 Start 键
    //   3. 半场 → 返回状态 4 (下半场)
    //   4. 终场 → 推进到状态 7 (RESULT_SCREEN)

    if (this.localFrame % 60 === 0) {
      console.log(`[${this.name}] 帧: ${this.localFrame}`);
    }

    // 临时: 按 Start 推进
    const joyCur = ctx.mem.data[RAM.JOY1_CUR];
    const joyPrev = ctx.mem.data[RAM.JOY1_PREV];
    const startPressed = (joyCur & 0x08) && !(joyPrev & 0x08);

    if (startPressed) {
      // TODO: 根据半场/终场判断去向
      const isFullTime = false; // 临时: 始终当半场处理
      if (isFullTime) {
        console.log(`[${this.name}] → 推进到状态 7 (结算画面)`);
        ctx.mem.data[RAM.GAME_STATE] = GameState.RESULT_SCREEN;
      } else {
        console.log(`[${this.name}] → 返回状态 4 (下半场)`);
        ctx.mem.data[RAM.GAME_STATE] = GameState.MATCH_MAIN;
      }
    }
  }

  exit(ctx: StateContext): void {
    console.log(`[${this.name}] 离开过渡画面`);
  }
}
