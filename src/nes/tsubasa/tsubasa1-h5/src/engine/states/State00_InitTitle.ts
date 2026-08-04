/**
 * State 00: 初始化/标题画面
 * 对应 ROM 中 $82A1: LDA #$10, JSR $84D2
 *
 * State ID $10 = PRG Bank 1, 子状态 0
 * 实际的标题初始化由 Bank1Dispatcher 处理
 *
 * 职责:
 *   1. 设置 PPU 基本配置
 *   2. 委托 Bank1Dispatcher 进行标题画面初始化
 *   3. 初始化完成后跳转到 State 01 (标题循环)
 */

import { StateBase } from './StateBase';

export class State00_InitTitle extends StateBase {
  readonly id = 0;

  /** 初始化步骤计数器 */
  private initStep: number = 0;

  /** 初始化完成标志 */
  private initDone: boolean = false;

  onEnter(): void {
    console.log('[State 00] Init Title Screen');

    // 设置标题画面 PPU 配置
    // PPU_CTRL = $90: NMI on, BG=$1000, Spr=$0000, NT=0, VRAM+1
    this.data.ppuCtrl = 0x90;
    // PPU_MASK = $0E: 显示背景(不含最左8px), 隐藏精灵
    this.data.ppuMask = 0x0E;
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    this.initStep = 0;
    this.initDone = false;

    // 初始化 PPU 缓冲区 ($82CC)
    this.initPpuBuffers();

    // Bank1Dispatcher 会在 StateMachine.dispatchBankState() 中被初始化
    // 它会处理:
    //   1. 设置 CHR bank ($1E/$1F)
    //   2. 加载标题调色板
    //   3. 加载标题名称表
    //   4. 设置标题精灵
    //   5. 进入子状态 2 (标题动画循环)
  }

  onUpdate(): void {
    if (this.initDone) {
      return; // 已跳转到 State 01
    }

    // State 00 在 Bank 1 初始化启动后立即过渡到 State 01
    // 5 页标题加载在 State 01 (标题循环) 期间由 Bank1Dispatcher 继续完成
    this.initDone = true;
    console.log('[State 00] Bank 1 dispatched → transitioning to State 01');
    this.sm.transitionTo(1);
  }

  /** 初始化PPU缓冲区地址 (对应 $82CC-$82EA) */
  private initPpuBuffers(): void {
    // 设置默认的PPU更新缓冲区地址
    this.data.write(0x0315, 0x20); // 名称表0
    this.data.write(0x0316, 0x00);
    this.data.write(0x0317, 0x3F); // 属性表

    this.data.write(0x039A, 0x20);
    this.data.write(0x039B, 0xC0);
    this.data.write(0x039C, 0x23);
  }

  onExit(): void {
    console.log('[State 00] Exit - entering title loop');
  }
}
