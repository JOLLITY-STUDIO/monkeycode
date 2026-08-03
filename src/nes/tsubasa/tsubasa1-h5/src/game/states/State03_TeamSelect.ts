/**
 * 状态 3: 队伍选择/剧情
 * 
 * 对应原始 ROM:
 *   Bank $00: $85CD-$87B8
 * 
 * 功能:
 *   队伍选择界面、剧情对话、密码输入等。
 *   通过子状态 $03CB 切换不同的子画面。
 */

import { StateBase, StateContext } from './StateBase';
import { GameState } from '../GameStateTable';
import { RAM } from '../../rom/types';

export class State03_TeamSelect extends StateBase {
  readonly state = GameState.TEAM_SELECT;
  readonly name = '队伍/剧情选择';

  private localFrame: number = 0;

  enter(ctx: StateContext): void {
    console.log(`[${this.name}] 进入状态 3`);
    this.localFrame = 0;

    // TODO: 根据子状态 $03CB 加载对应画面
    //   $03CB = 0: 队伍选择
    //   $03CB = 1: 剧情对话
    //   $03CB = 2: 密码输入
    //   等等...
  }

  update(ctx: StateContext): void {
    this.localFrame++;

    // TODO: 实现队伍选择/剧情逻辑
    // 对应 $85CD 的逻辑:
    //   1. 根据 $03CB 分发子状态
    //   2. 处理选择/对话推进
    //   3. 完成后推进到状态 4 (MATCH_MAIN)

    if (this.localFrame % 60 === 0) {
      console.log(`[${this.name}] 帧: ${this.localFrame}, 子状态: ${ctx.mem.data[RAM.SCENE_STATE]}`);
    }

    // 临时: 按 Start 推进
    const joyCur = ctx.mem.data[RAM.JOY1_CUR];
    const joyPrev = ctx.mem.data[RAM.JOY1_PREV];
    const startPressed = (joyCur & 0x08) && !(joyPrev & 0x08);

    if (startPressed) {
      console.log(`[${this.name}] → 推进到状态 4 (比赛主循环)`);
      ctx.mem.data[RAM.GAME_STATE] = GameState.MATCH_MAIN;
    }
  }

  exit(ctx: StateContext): void {
    console.log(`[${this.name}] 离开队伍选择`);
  }
}
