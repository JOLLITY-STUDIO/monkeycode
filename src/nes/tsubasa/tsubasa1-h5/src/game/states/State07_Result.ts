/**
 * 状态 7: 结算/结果画面
 * 
 * 对应原始 ROM:
 *   Bank $00: $8270-$8275
 * 
 * 功能:
 *   比赛结束后显示结果。
 *   可能的画面:
 *   - 比分结算
 *   - 球员评分/经验值
 *   - 剧情推进
 *   - 返回标题画面
 */

import { StateBase, StateContext } from './StateBase';
import { GameState } from '../GameStateTable';
import { RAM } from '../../rom/types';

export class State07_Result extends StateBase {
  readonly state = GameState.RESULT_SCREEN;
  readonly name = '结算画面';

  private localFrame: number = 0;

  enter(ctx: StateContext): void {
    console.log(`[${this.name}] 进入状态 7`);
    this.localFrame = 0;

    // TODO: 加载结算画面
    //   1. 显示最终比分
    //   2. 显示球员评分 (如果有)
    //   3. 显示剧情文本 (如果有)
  }

  update(ctx: StateContext): void {
    this.localFrame++;

    // TODO: 实现结算画面逻辑
    // 对应 $8270 的逻辑:
    //   1. 显示结果
    //   2. 等待 Start 键
    //   3. 返回标题画面 (状态 0 或 1)

    if (this.localFrame % 60 === 0) {
      console.log(`[${this.name}] 帧: ${this.localFrame}`);
    }

    // 临时: 按 Start 返回标题
    const joyCur = ctx.mem.data[RAM.JOY1_CUR];
    const joyPrev = ctx.mem.data[RAM.JOY1_PREV];
    const startPressed = (joyCur & 0x08) && !(joyPrev & 0x08);

    if (startPressed) {
      console.log(`[${this.name}] → 返回状态 0 (初始化/标题)`);
      ctx.mem.data[RAM.GAME_STATE] = GameState.INIT_TITLE;
    }
  }

  exit(ctx: StateContext): void {
    console.log(`[${this.name}] 离开结算画面`);
  }
}
