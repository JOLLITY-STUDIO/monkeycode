/**
 * 状态 2: 菜单/模式选择
 * 
 * 对应原始 ROM:
 *   Bank $00: $8276-$85CC
 * 
 * 功能:
 *   显示游戏模式选择菜单（剧情模式、PK模式等），
 *   处理光标移动和选择确认。
 */

import { StateBase, StateContext } from './StateBase';
import { GameState } from '../GameStateTable';
import { RAM } from '../../rom/types';

export class State02_MenuSelect extends StateBase {
  readonly state = GameState.MENU_SELECT;
  readonly name = '菜单选择';

  private localFrame: number = 0;

  enter(ctx: StateContext): void {
    console.log(`[${this.name}] 进入状态 2`);
    this.localFrame = 0;

    // TODO: 加载菜单画面
    //   - 设置菜单调色板
    //   - 加载菜单 Name Table
    //   - 初始化光标精灵位置
    //   - 设置菜单项默认选择
  }

  update(ctx: StateContext): void {
    this.localFrame++;

    // TODO: 实现菜单逻辑
    // 对应 $8276 的逻辑:
    //   1. 处理方向键移动光标
    //   2. 处理 A 键确认选择
    //   3. 处理 B 键返回
    //   4. 根据选择推进到状态 3 (TEAM_SELECT)

    if (this.localFrame % 60 === 0) {
      console.log(`[${this.name}] 帧: ${this.localFrame}, 等待菜单选择...`);
    }

    // 临时: 按 Start 推进（后续改为真正的菜单逻辑）
    const joyCur = ctx.mem.data[RAM.JOY1_CUR];
    const joyPrev = ctx.mem.data[RAM.JOY1_PREV];
    const startPressed = (joyCur & 0x08) && !(joyPrev & 0x08);

    if (startPressed) {
      console.log(`[${this.name}] → 推进到状态 3 (队伍/剧情选择)`);
      ctx.mem.data[RAM.GAME_STATE] = GameState.TEAM_SELECT;
    }
  }

  exit(ctx: StateContext): void {
    console.log(`[${this.name}] 离开菜单选择`);
  }
}
