/**
 * State 02: 菜单选择
 * 对应 ROM 中 $8276 的处理
 *
 * 菜单项:
 *   1. 1P GAME (单人模式)
 *   2. 2P GAME (双人对战)
 *   3. CONTINUE (继续/密码)
 */

import { StateBase } from './StateBase';
import { Button } from '../../core/types';

export class State02_MenuSelect extends StateBase {
  readonly id = 2;

  /** 当前选中项 (0-based) */
  private selectedItem: number = 0;

  /** 菜单项数量 */
  private readonly MENU_ITEMS = 3;

  /** 光标位置Y偏移 */
  private readonly CURSOR_Y_OFFSETS = [80, 104, 128];

  onEnter(): void {
    console.log('[State 02] Menu Select');
    this.selectedItem = 0;

    // 加载菜单画面
    this.loadMenuScreen();
  }

  onUpdate(): void {
    // 上下移动选择
    if (this.input.isPressed(Button.UP)) {
      this.selectedItem = (this.selectedItem - 1 + this.MENU_ITEMS) % this.MENU_ITEMS;
      this.updateCursor();
    }
    if (this.input.isPressed(Button.DOWN)) {
      this.selectedItem = (this.selectedItem + 1) % this.MENU_ITEMS;
      this.updateCursor();
    }

    // A 键确认
    if (this.input.isPressed(Button.A)) {
      this.confirmSelection();
      return;
    }

    // B 键取消 (返回标题)
    if (this.input.isPressed(Button.B)) {
      this.sm.transitionTo(1);
      return;
    }
  }

  /** 加载菜单画面 */
  private loadMenuScreen(): void {
    // 清空屏幕
    // TODO: 加载实际的菜单名称表数据

    // 显示菜单项
    // 1. 1 PLAYER
    // 2. 2 PLAYERS
    // 3. CONTINUE
  }

  /** 更新光标位置 */
  private updateCursor(): void {
    const y = this.CURSOR_Y_OFFSETS[this.selectedItem];
    // 更新光标精灵的位置
    this.oam.setSprite(0, {
      y: y,
      tileIndex: 0x10, // 光标tile
      attributes: 0x00,
      x: 48,
    });
  }

  /** 确认选择 */
  private confirmSelection(): void {
    switch (this.selectedItem) {
      case 0: // 1P GAME
        console.log('[State 02] 1P Game selected');
        this.data.set('playerCount', 1);
        this.sm.transitionTo(3); // → Team Select
        break;
      case 1: // 2P GAME
        console.log('[State 02] 2P Game selected');
        this.data.set('playerCount', 2);
        this.sm.transitionTo(3); // → Team Select
        break;
      case 2: // CONTINUE
        console.log('[State 02] Continue selected');
        // TODO: 密码输入画面
        this.data.set('isContinue', true);
        this.sm.transitionTo(3); // → Team Select
        break;
    }
  }
}
