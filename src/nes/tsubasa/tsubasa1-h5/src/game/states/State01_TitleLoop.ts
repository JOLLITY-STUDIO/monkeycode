/**
 * 状态 1: 标题画面主循环
 * 
 * 对应原始 ROM:
 *   Bank $00: $82A7-$8275 (标题画面主循环)
 * 
 * 功能:
 *   等待玩家按 Start 键，进入菜单选择。
 *   支持标题画面的动画效果（如闪烁文字等）。
 */

import { StateBase, StateContext } from './StateBase';
import { GameState } from '../GameStateTable';
import { RAM, JOYPAD_BUTTON } from '../../rom/types';

export class State01_TitleLoop extends StateBase {
  readonly state = GameState.TITLE_LOOP;
  readonly name = '标题画面';

  /** 标题画面内部的帧计数 */
  private localFrame: number = 0;

  enter(ctx: StateContext): void {
    console.log(`[${this.name}] 进入状态 1`);
    this.localFrame = 0;
    
    // TODO: 确保标题画面布局已加载
    // TODO: 如果有标题动画精灵，在此初始化
  }

  update(ctx: StateContext): void {
    this.localFrame++;

    // TODO: 实现标题画面每帧逻辑
    // 对应 $82A7 的循环逻辑:
    //   1. 处理标题动画 (闪烁 "PRESS START" 等)
    //   2. 检测 Start 按键
    //   3. 如果按下 Start，推进到状态 2 (MENU_SELECT)

    // 临时: 每 60 帧输出一次调试信息
    if (this.localFrame % 60 === 0) {
      console.log(`[${this.name}] 帧: ${this.localFrame}, 等待 Start 键...`);
    }

    // 检测 Start 键按下
    const joyCur = ctx.mem.data[RAM.JOY1_CUR];
    const joyPrev = ctx.mem.data[RAM.JOY1_PREV];
    const startPressed = (joyCur & JOYPAD_BUTTON.START) && !(joyPrev & JOYPAD_BUTTON.START);

    if (startPressed) {
      console.log(`[${this.name}] Start 键按下 → 推进到状态 2 (菜单选择)`);
      ctx.mem.data[RAM.GAME_STATE] = GameState.MENU_SELECT;
    }
  }

  exit(ctx: StateContext): void {
    console.log(`[${this.name}] 离开标题画面`);
  }
}
