/**
 * State 01: 标题画面循环
 * 对应 ROM 中 $82A7 的处理
 *
 * 职责: 等待 START 按键，进行标题画面的动画
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

    // 设置 bank 锁定 (禁用游戏逻辑调用，仅NMI处理)
    this.data.bankLock = 1;

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
    // 通过 PPU MASK 控制 "PRESS START" 文字的显示/隐藏
    if (this.animFrame === 0) {
      this.data.ppuMask = 0x0E; // 显示背景
    } else {
      this.data.ppuMask = 0x0E; // 暂时保持不变 (实际应控制特定sprite)
    }
  }

  /** START 按键处理 */
  private onStartPressed(): void {
    console.log('[State 01] START pressed → Menu');
    // 切换 bank 以加载菜单数据
    this.banks.prgBank0 = 1;

    // 过渡到菜单选择状态
    this.sm.transitionTo(2);
  }

  onExit(): void {
    // 清除闪烁效果
    this.data.ppuMask = 0x0E;
  }
}
