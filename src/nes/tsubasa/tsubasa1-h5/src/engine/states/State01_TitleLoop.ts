/**
 * State 01: 标题画面循环
 * 对应 ROM 中 $82A7: LDA #$5D, JSR $84D2
 *
 * State ID $5D = PRG Bank 5, 子状态 D
 *
 * 但实际标题画面使用 Bank 1 的子状态调度器 (Bank1Dispatcher)，
 * 因为它已经加载了标题 RLE 数据。这里保持兼容性。
 *
 * 职责:
 *   1. Bank1Dispatcher 驱动 5 页标题加载 + 闪烁动画
 *   2. 检测 START 按键 → 进入菜单 (State 2)
 */

import { StateBase } from './StateBase';
import { Button } from '../../core/types';

export class State01_TitleLoop extends StateBase {
  readonly id = 1;

  /** 闪烁计数器 (Bank1Dispatcher 管理中，这里仅作心跳) */
  private frameCount: number = 0;

  onEnter(): void {
    console.log('[State 01] Title Loop');

    this.frameCount = 0;

    // 保持 bankLock = 0 让状态机正常更新
    this.data.bankLock = 0;

    // 标题 PPU 配置
    this.data.ppuCtrl = 0x90; // NMI on, BG=$1000, Spr=$0000, NT=0, VRAM+1
    this.data.ppuMask = 0x0E; // 显示背景
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    // Bank1Dispatcher 已在 StateMachine 中初始化 (State 0→State 1 过渡时)
    // 它会处理 5 页标题 RLE 加载 + PRESS START 闪烁
  }

  onUpdate(): void {
    this.frameCount++;

    // Bank1Dispatcher.update() 由 StateMachine.update() 调用
    // 这里只处理 START 按键检测

    // 检查 START 按键 → 进入菜单
    if (this.input.isPressed(Button.START)) {
      this.onStartPressed();
      return;
    }
  }

  /** START 按键处理 */
  private onStartPressed(): void {
    console.log('[State 01] START pressed → Menu');

    // 强制 Bank1Dispatcher 进入菜单子状态
    this.data.write(0x03CB, 5); // Sub 5 = menu init
    this.data.write(0x03CC, 0);

    // 过渡到菜单选择状态 (State 2)
    this.sm.transitionTo(2);
  }

  onExit(): void {
    this.data.ppuMask = 0x0E;
    console.log('[State 01] Exit title loop');
  }
}
