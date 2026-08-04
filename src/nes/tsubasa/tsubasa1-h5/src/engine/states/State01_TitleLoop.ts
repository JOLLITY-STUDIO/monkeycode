/**
 * State 01: 标题画面循环
 * 对应 ROM 中 $82A7: LDA #$5D, JSR $84D2
 *
 * State ID $5D = PRG Bank 5, 子状态 D
 * 标题动画和输入检测由 Bank 1 子状态 2 处理
 *
 * 职责:
 *   1. 维护标题画面显示
 *   2. 检测 START 按键 → 进入菜单
 *   3. 标题画面闪烁动画
 */

import { StateBase } from './StateBase';
import { Button } from '../../core/types';

export class State01_TitleLoop extends StateBase {
  readonly id = 1;

  /** 闪烁计数器 */
  private blinkCounter: number = 0;

  /** 标题动画帧 */
  private animFrame: number = 0;

  onEnter(): void {
    console.log('[State 01] Title Loop');

    this.blinkCounter = 0;
    this.animFrame = 0;

    // 保持 bankLock = 0 让状态机正常更新
    this.data.bankLock = 0;

    // 设置 PPU 配置
    this.data.ppuCtrl = 0x90; // NMI on, BG=$1000, Spr=$0000, NT=0, VRAM+1
    this.data.ppuMask = 0x0E; // 显示BG, 不显示精灵
    this.data.scrollX = 0;
    this.data.scrollY = 0;
  }

  onUpdate(): void {
    // 动画更新
    this.blinkCounter = (this.blinkCounter + 1) & 0x3F;

    // 检查 START 按键
    if (this.input.isPressed(Button.START)) {
      this.onStartPressed();
      return;
    }

    // 标题画面闪烁效果 (每30帧切换)
    if (this.blinkCounter === 0) {
      this.animFrame = (this.animFrame + 1) & 0x01;
      this.updateBlinkEffect();
    }
  }

  /** 更新闪烁效果 */
  private updateBlinkEffect(): void {
    // 通过 PPU MASK 控制特定元素的显示
    // 原始 ROM 中由 Bank 1 的子状态 2 处理闪烁
    if (this.animFrame === 0) {
      this.data.ppuMask = 0x0E; // 显示背景
    } else {
      this.data.ppuMask = 0x0E; // 闪烁时也显示背景（精灵由Bank1管理）
    }
  }

  /** START 按键处理 */
  private onStartPressed(): void {
    console.log('[State 01] START pressed → Menu');

    // 强制 Bank1Dispatcher 进入菜单子状态 (跳过剩余标题页)
    this.data.write(0x03CB, 5); // 子状态 5 = 菜单初始化
    this.data.write(0x03CC, 0);

    // 过渡到菜单选择状态 (State 2)
    // 注意: Bank 1 已是活动 bank，dispatchBankState 会跳过 re-init
    this.sm.transitionTo(2);
  }

  onExit(): void {
    // 清除闪烁效果
    this.data.ppuMask = 0x0E;
    console.log('[State 01] Exit title loop');
  }
}
