/**
 * State 02: 菜单选择
 * 对应 ROM 中 $8276: LDA #$60, JSR $84D2
 *
 * State ID $60 = PRG Bank 6, 子状态 0
 *
 * 菜单项 (天使之翼):
 *   1. 1P GAME (キーパー? / 单人模式)
 *   2. 2P GAME (双人对战)
 *   3. CONTINUE (继续/密码)
 */

import { StateBase } from './StateBase';
import { Button } from '../../core/types';

export class State02_MenuSelect extends StateBase {
  readonly id = 2;

  private selectedItem: number = 0;
  private readonly MENU_ITEMS = 3;
  private readonly menuNames = ['1P GAME', '2P GAME', 'CONTINUE'];
  private readonly CURSOR_Y_OFFSETS = [96, 120, 144];

  onEnter(): void {
    console.log('[State 02] Menu Select');
    this.selectedItem = 0;

    this.data.ppuCtrl = 0x90;
    this.data.ppuMask = 0x1E;
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    this.loadMenuScreen();
    this.updateCursor();
  }

  onUpdate(): void {
    if (this.input.isPressed(Button.UP)) {
      this.selectedItem = (this.selectedItem - 1 + this.MENU_ITEMS) % this.MENU_ITEMS;
      this.updateCursor();
    }
    if (this.input.isPressed(Button.DOWN)) {
      this.selectedItem = (this.selectedItem + 1) % this.MENU_ITEMS;
      this.updateCursor();
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

  private loadMenuScreen(): void {
    // 清屏
    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }

    // 调色板已在 Bank1Dispatcher.subState05_MenuInit 中设置
    // 绘制菜单文字 (使用 tile 布局)
    // 天使之翼菜单文字使用 CHR bank 0x00/0x01 中的日文字体 tile

    // 顶部标题 "CAPTAIN TSUBASA" (行 4-7)
    const titleTiles = [
      0x43, 0x41, 0x50, 0x54, 0x41, 0x49, 0x4E, 0x00,
      0x54, 0x53, 0x55, 0x42, 0x41, 0x53, 0x41,
    ];
    for (let i = 0; i < titleTiles.length; i++) {
      this.renderer.writeVram(0x2000 + 5 * 32 + 9 + i, titleTiles[i]);
    }

    // 菜单项 (行 12-18)
    for (let idx = 0; idx < this.MENU_ITEMS; idx++) {
      const row = 12 + idx * 3;
      const name = this.menuNames[idx];
      const startCol = 10;
      for (let c = 0; c < name.length; c++) {
        const charCode = name.charCodeAt(c);
        // 简单字体映射: A-Z → tile 0x41-0x5A, 0-9 → tile 0x30-0x39, space → 0x00
        let tileIdx: number;
        if (charCode === 0x20) {
          tileIdx = 0x00;
        } else if (charCode >= 0x41 && charCode <= 0x5A) {
          tileIdx = charCode; // A-Z → 0x41-0x5A
        } else if (charCode >= 0x30 && charCode <= 0x39) {
          tileIdx = charCode; // 0-9 → 0x30-0x39
        } else {
          tileIdx = 0x00; // unknown → space
        }
        this.renderer.writeVram(0x2000 + row * 32 + startCol + c, tileIdx);
      }
    }

    // 属性表
    for (let i = 0; i < 64; i++) {
      this.renderer.writeVram(0x23C0 + i, 0x00);
    }
  }

  private updateCursor(): void {
    const y = this.CURSOR_Y_OFFSETS[this.selectedItem];
    this.oam.clear();
    this.oam.setSprite(0, {
      y: y,
      tileIndex: 0x10, // 箭头 tile
      attributes: 0x01, // 调色板 1
      x: 56,
    });
    console.log(`[State 02] Cursor at: ${this.menuNames[this.selectedItem]}`);
  }

  private confirmSelection(): void {
    switch (this.selectedItem) {
      case 0:
        console.log('[State 02] 1P Game selected');
        this.data.set('playerCount', 1);
        break;
      case 1:
        console.log('[State 02] 2P Game selected');
        this.data.set('playerCount', 2);
        break;
      case 2:
        console.log('[State 02] Continue selected');
        this.data.set('isContinue', true);
        break;
    }
    this.sm.transitionTo(3);
  }
}
