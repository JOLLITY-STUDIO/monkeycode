/**
 * State 02: 菜单选择
 * 对应 ROM 中 $8276: LDA #$60, JSR $84D2
 *
 * State ID $60 = PRG Bank 6, 子状态 0
 *
 * 菜单项:
 *   1. 1P GAME (单人模式)
 *   2. 2P GAME (双人对战)
 *   3. CONTINUE (继续/密码)
 *
 * 菜单渲染由 Bank 1 子状态 6 处理
 */

import { StateBase } from './StateBase';
import { Button } from '../../core/types';

export class State02_MenuSelect extends StateBase {
  readonly id = 2;

  /** 当前选中项 (0-based) */
  private selectedItem: number = 0;

  /** 菜单项数量 */
  private readonly MENU_ITEMS = 3;

  /** 菜单项名称 */
  private readonly menuNames = [
    '1P GAME',
    '2P GAME',
    'CONTINUE',
  ];

  /** 光标位置Y偏移 (精灵坐标) */
  private readonly CURSOR_Y_OFFSETS = [80, 104, 128];

  onEnter(): void {
    console.log('[State 02] Menu Select');
    this.selectedItem = 0;

    // 设置菜单画面 PPU 配置
    this.data.ppuCtrl = 0x90;
    this.data.ppuMask = 0x1E; // 显示 BG + 精灵
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    // 加载菜单画面
    this.loadMenuScreen();
    this.updateCursor();
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
    // 清空名称表
    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }

    // 加载菜单调色板
    const menuPalette: number[] = [
      0x0F, 0x30, 0x10, 0x00,
      0x0F, 0x12, 0x22, 0x32,
      0x0F, 0x16, 0x26, 0x36,
      0x0F, 0x19, 0x29, 0x39,
    ];
    const sprPalette: number[] = [
      0x0F, 0x0F, 0x16, 0x26,
      0x0F, 0x12, 0x22, 0x32,
      0x0F, 0x19, 0x29, 0x39,
      0x0F, 0x0F, 0x0F, 0x0F,
    ];

    for (let i = 0; i < 16; i++) {
      this.renderer.writeVram(0x3F00 + i, menuPalette[i]);
      this.renderer.writeVram(0x3F10 + i, sprPalette[i]);
    }

    // 绘制菜单文字 (使用 tile 布局)
    // 菜单文字通常从 tile 0x40+ 开始（字母/数字）
    // 这里用简单的 tile 编号绘制
    const textStartRow = 10; // 第10行开始
    for (let idx = 0; idx < this.MENU_ITEMS; idx++) {
      const row = textStartRow + idx * 3;
      // 在每行绘制菜单项名称
      // 使用 CHR 中的字体 tile
      // 原始 ROM 中字体数据在 Bank 1 的 $C000+ 区域
      // 这里用占位 tile 显示
      for (let col = 0; col < 10; col++) {
        const tileIdx = 0x40 + col + idx * 16; // 使用不同的 tile 区分菜单项
        this.renderer.writeVram(0x2000 + row * 32 + col + 8, tileIdx);
      }
    }

    // 设置属性表
    for (let i = 0; i < 64; i++) {
      this.renderer.writeVram(0x23C0 + i, 0x00);
    }
  }

  /** 更新光标位置 */
  private updateCursor(): void {
    const y = this.CURSOR_Y_OFFSETS[this.selectedItem];

    // 清除旧光标精灵
    this.oam.clear();

    // 设置光标精灵
    this.oam.setSprite(0, {
      y: y,
      tileIndex: 0x10, // 光标 tile (箭头或其他标记)
      attributes: 0x00, // 调色板 0
      x: 48,
    });

    console.log(`[State 02] Cursor at: ${this.menuNames[this.selectedItem]}`);
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
        this.data.set('isContinue', true);
        this.sm.transitionTo(3); // → Team Select
        break;
    }
  }
}
