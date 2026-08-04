/**
 * State 02: 菜单选择 (纯逻辑 — 只更新 GameModel)
 *
 * 对应 ROM 中 $8276: LDA #$60, JSR $84D2
 * State ID $60 = PRG Bank 6, 子状态 0
 *
 * 菜单项:
 *   1. START    (开始新游戏)
 *   2. CONTINUE (继续/密码)
 *
 * 注意: 原作为单人游戏，无 2P 对战模式。
 * v0.6.0: 已移除所有 renderer/oam 直接调用，通过 GameModel 通信。
 */
import { StateBase } from './StateBase';
import { Button } from '../../core/types';

export class State02_MenuSelect extends StateBase {
  readonly id = 2;

  private readonly MENU_ITEMS = ['START', 'CONTINUE'];
  private selectedItem: number = 0;

  onEnter(): void {
    console.log('[State 02] Menu Select');
    this.selectedItem = 0;

    this.data.ppuCtrl = 0x90;
    this.data.ppuMask = 0x1E;
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    // v0.6.0: 只更新 model，不写 VRAM
    this.model.setMenu('CAPTAIN TSUBASA', this.MENU_ITEMS, 0);
  }

  onUpdate(): void {
    if (this.input.isPressed(Button.UP)) {
      this.selectedItem = (this.selectedItem - 1 + this.MENU_ITEMS.length) % this.MENU_ITEMS.length;
      this.model.setMenu('CAPTAIN TSUBASA', this.MENU_ITEMS, this.selectedItem);
      console.log(`[State 02] Cursor at: ${this.MENU_ITEMS[this.selectedItem]}`);
    }
    if (this.input.isPressed(Button.DOWN)) {
      this.selectedItem = (this.selectedItem + 1) % this.MENU_ITEMS.length;
      this.model.setMenu('CAPTAIN TSUBASA', this.MENU_ITEMS, this.selectedItem);
      console.log(`[State 02] Cursor at: ${this.MENU_ITEMS[this.selectedItem]}`);
    }
    if (this.input.isPressed(Button.A)) {
      this.confirmSelection();
      return;
    }
    if (this.input.isPressed(Button.B)) {
      this.sm.transitionTo(1);
      return;
    }
  }

  private confirmSelection(): void {
    switch (this.selectedItem) {
      case 0:
        console.log('[State 02] START selected → Member Select');
        this.data.set('isContinue', false);
        break;
      case 1:
        console.log('[State 02] CONTINUE selected');
        this.data.set('isContinue', true);
        break;
    }
    this.sm.transitionTo(3);
  }
}
