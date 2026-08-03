/**
 * 状态 0: 初始化/标题画面设置
 * 
 * 对应原始 ROM:
 *   Bank $00: $82A1-$82A6
 * 
 * 原始 6502 代码:
 *   $82A1: INC $03CA     ; 推进到下一个状态
 *   $82A4: JSR $82A7     ; 调用标题画面初始化
 *   $82A7: ...           ; 标题画面设置逻辑
 * 
 * 功能:
 *   初始化标题画面相关数据（调色板、Name Table 布局、精灵等），
 *   设置完毕后自动推进到状态 1 (TITLE_LOOP)。
 */

import { StateBase, StateContext } from './StateBase';
import { GameState } from '../GameStateTable';
import { RAM } from '../../rom/types';

export class State00_InitTitle extends StateBase {
  readonly state = GameState.INIT_TITLE;
  readonly name = '初始化/标题设置';

  enter(ctx: StateContext): void {
    console.log(`[${this.name}] 进入状态 0`);
    
    // TODO: 实现标题画面初始化
    // 对应 $82A1-$82A6 的逻辑:
    //   1. 设置调色板 (标题画面专用)
    //   2. 加载标题画面 Name Table 数据
    //   3. 初始化标题画面精灵 (光标等)
    //   4. 设置 PPU Bank 选择 ($1A/$1B)

    // 原始代码在初始化完成后 INC $03CA 推进状态
    // 这里在 enter 阶段就推进
    ctx.mem.data[RAM.GAME_STATE] = GameState.TITLE_LOOP;
    console.log(`[${this.name}] → 推进到状态 ${GameState.TITLE_LOOP} (标题画面)`);
  }

  update(ctx: StateContext): void {
    // 状态 0 是一次性初始化，update 中不做任何事
    // 因为 enter() 已经推进到状态 1
  }
}
