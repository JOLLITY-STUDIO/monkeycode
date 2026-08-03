/**
 * 状态 4: 比赛主循环
 * 
 * 对应原始 ROM:
 *   Bank $00: $87B9-$820C
 *   Bank $04: 比赛流程/AI 逻辑
 * 
 * 功能:
 *   比赛的核心游戏循环。处理球员移动、AI 决策、
 *   球物理、摄像机滚动等。
 *   这是游戏中最复杂的状态。
 * 
 * 相关 RAM 变量:
 *   $06xx: 比赛数据 (比分、球员位置、球位置等)
 *   $0677-$0678: 比赛子状态机
 */

import { StateBase, StateContext } from './StateBase';
import { GameState } from '../GameStateTable';
import { RAM } from '../../rom/types';

export class State04_MatchMain extends StateBase {
  readonly state = GameState.MATCH_MAIN;
  readonly name = '比赛主循环';

  private localFrame: number = 0;

  enter(ctx: StateContext): void {
    console.log(`[${this.name}] 进入状态 4`);
    this.localFrame = 0;

    // TODO: 比赛初始化
    //   1. 加载双方球队数据 (球员属性等)
    //   2. 设置比赛初始状态 (比分 0:0, 开球等)
    //   3. 加载球场背景 CHR Bank
    //   4. 初始化摄像机位置
    //   5. 放置球员初始位置
  }

  update(ctx: StateContext): void {
    this.localFrame++;

    // TODO: 实现比赛主循环
    // 对应 $87B9 和 Bank $04 的逻辑:
    //   1. 读取手柄输入 → 控制当前球员移动
    //   2. AI 决策 → 控制对方球员
    //   3. 球物理更新 (位置、速度)
    //   4. 碰撞检测 (球员-球、球员-球员)
    //   5. 摄像机跟随
    //   6. 检测比赛事件 (射门、犯规、出界等)
    //   7. 如果触发事件 → 切换到状态 5 (MATCH_EVENT)

    if (this.localFrame % 60 === 0) {
      console.log(`[${this.name}] 帧: ${this.localFrame}`);
    }

    // 临时: 按 Start 触发事件 (测试状态切换)
    const joyCur = ctx.mem.data[RAM.JOY1_CUR];
    const joyPrev = ctx.mem.data[RAM.JOY1_PREV];
    const startPressed = (joyCur & 0x08) && !(joyPrev & 0x08);

    if (startPressed) {
      console.log(`[${this.name}] → 切换到状态 5 (比赛事件)`);
      ctx.mem.data[RAM.GAME_STATE] = GameState.MATCH_EVENT;
    }
  }

  exit(ctx: StateContext): void {
    console.log(`[${this.name}] 离开比赛主循环`);
  }
}
