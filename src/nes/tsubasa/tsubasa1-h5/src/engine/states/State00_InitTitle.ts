/**
 * State 00: 初始化/标题画面
 * 对应 ROM 中 $82A1 的处理
 *
 * 职责: 初始化标题画面资源、调色板、名称表
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

    // 切换到标题所需的 CHR bank: bank 0 (title graphics), bank 1 (characters)
    this.banks.chrBank0 = 0;
    this.banks.chrBank1 = 1;
    // PRG bank 0 = 0 (core engine stays resident)
    this.banks.prgBank0 = 0;
  }

  onUpdate(): void {
    if (this.initDone) {
      // 初始化完成后切换到标题循环
      this.sm.transitionTo(1);
      return;
    }

    // 分步初始化 (模拟原始代码的PPU写入序列)
    switch (this.initStep) {
      case 0:
        this.loadTitlePalette();
        break;
      case 1:
        this.loadTitleNametable();
        break;
      case 2:
        this.loadTitleSprites();
        break;
      case 3:
        this.initDone = true;
        break;
    }
    this.initStep++;
  }

  /** 初始化PPU缓冲区地址 (对应 $82CC-$82EA) */
  private initPpuBuffers(): void {
    // 设置默认的PPU更新缓冲区地址
    // $0315-$0317: PPU地址缓冲
    this.data.write(0x0315, 0x20); // 名称表0
    this.data.write(0x0316, 0x00);
    this.data.write(0x0317, 0x3F); // 属性表

    // $039A-$039C: 备用缓冲
    this.data.write(0x039A, 0x20);
    this.data.write(0x039B, 0xC0);
    this.data.write(0x039C, 0x23);
  }

  /** 加载标题调色板 */
  private loadTitlePalette(): void {
    // 背景调色板
    const bgPalette = [
      0x0F, 0x20, 0x10, 0x00,  // 调色板0: 黑/白/灰/黑
      0x0F, 0x27, 0x17, 0x07,  // 调色板1: 黑/橙/红/棕
      0x0F, 0x12, 0x22, 0x32,  // 调色板2: 黑/蓝/浅蓝/白
      0x0F, 0x19, 0x29, 0x39,  // 调色板3: 黑/绿/亮绿/黄绿
    ];

    // 精灵调色板
    const sprPalette = [
      0x0F, 0x16, 0x26, 0x36,  // 调色板4
      0x0F, 0x12, 0x22, 0x32,  // 调色板5
      0x0F, 0x27, 0x17, 0x07,  // 调色板6
      0x0F, 0x19, 0x29, 0x39,  // 调色板7
    ];

    // 写入VRAM调色板区域 ($3F00)
    for (let i = 0; i < 16; i++) {
      this.renderer.writeVram(0x3F00 + i, bgPalette[i]);
      this.renderer.writeVram(0x3F10 + i, sprPalette[i]);
    }
  }

  /** 加载标题名称表 */
  private loadTitleNametable(): void {
    // 清空名称表 tile 区域 ($2000-$23BF)
    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }

    // 测试: 在屏幕上绘制已知的 tile 编号，用于验证 CHR 渲染
    // tile 0 = 通常是空格/空白
    // tile 1-15 = 可能包含标题用字体
    // 从 chr_bank_00.png 的底部区域 (tile 128+) 绘制看看有什么
    for (let row = 0; row < 30; row++) {
      for (let col = 0; col < 32; col++) {
        const tileIdx = (row * 32 + col) % 256;
        this.renderer.writeVram(0x2000 + row * 32 + col, tileIdx);
      }
    }

    // 设置属性表: 全部使用调色板0 (默认)
    for (let i = 0; i < 64; i++) {
      this.renderer.writeVram(0x23C0 + i, 0x00);
    }

    // TODO: 从ROM数据加载实际标题屏幕数据
  }

  /** 加载标题精灵 */
  private loadTitleSprites(): void {
    // 清空OAM
    this.oam.clear();
  }
}
