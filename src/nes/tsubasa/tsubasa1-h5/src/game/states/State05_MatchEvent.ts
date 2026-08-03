/**
 * 状态 5: 比赛事件/过场
 * 
 * 对应原始 ROM:
 *   Bank $00: $820D-$8263
 *   Bank $06: 比赛事件处理/特殊技能
 * 
 * 功能:
 *   处理比赛中的各种事件动画:
 *   - 射门动画 (普通射门/必杀技)
 *   - 传球动画
 *   - 扑救动画
 *   - 犯规/任意球
 *   - 进球庆祝
 *   - 界外球/角球
 *   等等
 * 
 * 事件完成后返回状态 4 (MATCH_MAIN) 或
 * 推进到状态 6 (MATCH_TRANSITION)。
 */

import { StateBase, StateContext } from './StateBase';
import { GameState } from '../GameStateTable';
import { RAM } from '../../rom/types';

export class State05_MatchEvent extends StateBase {
  readonly state = GameState.MATCH_EVENT;
  readonly name = '比赛事件/过场';

  private localFrame: number = 0;
  /** 事件动画持续时间 */
  private eventDuration: number = 120; // 临时: 2秒

  enter(ctx: StateContext): void {
    console.log(`[${this.name}] 进入状态 5`);
    this.localFrame = 0;

    // TODO: 根据事件类型初始化动画
    //   事件类型存储在某个 RAM 变量中 (待确认具体地址)
    //   1. 加载事件对应的动画数据 (Bank $03/$06)
    //   2. 设置动画帧序列
    //   3. 播放音效
  }

  update(ctx: StateContext): void {
    this.localFrame++;

    // TODO: 实现事件动画逻辑
    // 对应 $820D 和 Bank $06 的逻辑:
    //   1. 逐帧播放动画
    //   2. 更新比分 (如果是进球)
    //   3. 动画结束后:
    //      - 如果比赛继续 → 回到状态 4
    //      - 如果是半场/终场 → 推进到状态 6

    if (this.localFrame % 30 === 0) {
      console.log(`[${this.name}] 事件动画中... 帧: ${this.localFrame}/${this.eventDuration}`);
    }

    // 临时: 动画结束后返回比赛
    if (this.localFrame >= this.eventDuration) {
      console.log(`[${this.name}] 事件结束 → 返回状态 4 (比赛)`);
      ctx.mem.data[RAM.GAME_STATE] = GameState.MATCH_MAIN;
    }
  }

  exit(ctx: StateContext): void {
    console.log(`[${this.name}] 离开事件状态`);
  }
}
