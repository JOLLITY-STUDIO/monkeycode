/**
 * State 00: 开场动画 + 初始化
 * 对应 ROM 中 $82A1: LDA #$10, JSR $84D2
 *
 * State ID $10 = PRG Bank 1, 子状态 0
 *
 * 实际行为:
 *   OpeningScenePlayer 管理 6 个分镜动画 (Sub 1-6)
 *   → 动画结束自动过渡到 State 01 (标题循环)
 *
 * 此 State 只做初始化，后续由 StateMachine.update() 驱动 OpeningScenePlayer
 */

import { StateBase } from './StateBase';

export class State00_InitTitle extends StateBase {
  readonly id = 0;

  onEnter(): void {
    console.log('[State 00] Opening animation + Title init');

    // 设置 PPU 基本配置
    this.data.ppuCtrl = 0x90;  // NMI on, BG=$1000, Spr=$0000, NT=0, VRAM+1
    this.data.ppuMask = 0x0E;  // 显示背景
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    // 初始化 PPU 缓冲区 ($82CC)
    this.initPpuBuffers();

    // OpeningScenePlayer 由 StateMachine 在 transitionTo(0) 中初始化
    // 分镜动画由 StateMachine.update() 逐帧驱动
  }

  onUpdate(): void {
    // OpeningScenePlayer 由 StateMachine.update() 驱动
    // 此方法仅做心跳日志
  }

  /** 初始化PPU缓冲区地址 (对应 $82CC-$82EA) */
  private initPpuBuffers(): void {
    this.data.write(0x0315, 0x20); // 名称表0
    this.data.write(0x0316, 0x00);
    this.data.write(0x0317, 0x3F); // 属性表

    this.data.write(0x039A, 0x20);
    this.data.write(0x039B, 0xC0);
    this.data.write(0x039C, 0x23);
  }

  onExit(): void {
    console.log('[State 00] Exit → entering title loop');
  }
}
