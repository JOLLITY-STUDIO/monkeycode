/**
 * State 99: 测试状态 — 验证渲染管线
 *
 * 这是一个纯测试状态，用于验证 Canvas 渲染是否正常工作。
 * 在画面上绘制棋盘格背景 + 直接 Canvas 文字叠加。
 *
 * 不依赖 CHR 图片资源、不依赖 Bank 切换。
 */
import { StateBase } from './StateBase';
import { SCREEN_W, SCREEN_H } from '../../core/Constants';
import { TILE_SIZE } from '../../core/types';

export class StateTest extends StateBase {
  readonly id = 99;

  /** 写入 VRAM 的简单 palette */
  private static readonly TEST_PALETTE: number[] = [
    0x0F, // 0: 黑 (背景透明色)
    0x30, // 1: 白
    0x16, // 2: 红
    0x12, // 3: 蓝
    0x27, // 4: 橙
    0x2A, // 5: 绿
    0x36, // 6: 深粉
    0x11, // 7: 浅蓝
    0x0F, 0x30, 0x16, 0x12, // BG palette 2
    0x0F, 0x27, 0x2A, 0x36, // BG palette 3
    0x0F, 0x11, 0x30, 0x16, // BG palette 4
    0x0F, 0x30, 0x16, 0x12, // Spr palette 1
    0x0F, 0x27, 0x2A, 0x36, // Spr palette 2
    0x0F, 0x11, 0x30, 0x16, // Spr palette 3
    0x0F, 0x30, 0x16, 0x12, // Spr palette 4
  ];

  /** 帧计数 (用于动态文字) */
  private frameCounter = 0;

  onEnter(): void {
    console.log('[State 99] ====== TEST MODE ENTER ======');
    console.log('[State 99] Verifying canvas rendering pipeline...');

    this.frameCounter = 0;

    // 1. 设置 PPU 配置
    // PPU_CTRL = $90: NMI on, BG=$1000, NT0, VRAM+1
    this.data.ppuCtrl = 0x90;
    // PPU_MASK = $0E: 显示背景, 隐藏精灵
    this.data.ppuMask = 0x0E;
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    console.log('[State 99] PPU config: ctrl=$90 mask=$0E scrollX=0 scrollY=0');

    // 2. 初始化调色板 (通过 VRAM 写入)
    for (let i = 0; i < StateTest.TEST_PALETTE.length; i++) {
      this.renderer.writeVram(0x3F00 + i, StateTest.TEST_PALETTE[i]);
    }
    console.log('[State 99] Palette written: 32 bytes to $3F00');

    // 3. 用交替的 tile 填充名称表 0 (产生棋盘格效果来验证渲染)
    this.fillNametableTest();
    console.log('[State 99] Nametable filled: chessboard (960 tiles)');

    // 4. 初始化属性表 (分配不同调色板到不同区域)
    this.fillAttributesTest();
    console.log('[State 99] Attributes filled: checkerboard pattern');

    // 5. 设置 Debug 文字叠加 (会在 render() 中绘制到 canvas 顶层)
    this.renderer.debugText = 'TEST - Canvas OK!';
    this.renderer.debugTextColor = '#ff4444';
    this.renderer.debugTextSize = 18;

    console.log('[State 99] ====== TEST MODE READY ======');
  }

  onUpdate(): void {
    this.frameCounter++;
    // 每 60 帧输出一次心跳，确认循环在运行
    if (this.frameCounter % 60 === 0) {
      console.log(`[State 99] Frame ${this.frameCounter} - render loop alive`);
      // 动态更新 debug 文字显示帧号
      this.renderer.debugText = `TEST OK | Frame: ${this.frameCounter} | State: 99`;
    }
  }

  onExit(): void {
    // 清理 debug 文字
    this.renderer.debugText = null;
    this.renderer.debugTextColor = '#ffffff';
    console.log('[State 99] Test state exited after ' + this.frameCounter + ' frames');
  }

  /**
   * 填充名称表 — 交替 tile 0 和 tile 1
   * 这样即使没有 CHR 图片，色块回退也能看到棋盘格
   */
  private fillNametableTest(): void {
    const tileCount = 32 * 30; // 名称表大小
    for (let i = 0; i < tileCount; i++) {
      const x = i % 32;
      const y = Math.floor(i / 32);
      // 棋盘格: (x + y) % 2 决定 tile 索引
      const tile = (x + y) % 2;
      // 写入 NT0 ($2000)
      this.renderer.writeVram(0x2000 + i, tile);
    }
  }

  /**
   * 填充属性表 — 不同区域用不同调色板
   * 每 4×4 tile 的块交替使用 palette 0 和 palette 1
   * palette 0 → 白底, palette 1 → 绿底 → 形成彩色棋盘格
   */
  private fillAttributesTest(): void {
    // 属性表: 8×8 字节，每字节控制 4×4 tile 区域的属性
    for (let ay = 0; ay < 8; ay++) {
      for (let ax = 0; ax < 8; ax++) {
        // 交替使用 palette 0 和 palette 1
        const palette = (ax + ay) % 2;
        const attrByte = palette | (palette << 2) | (palette << 4) | (palette << 6);
        // 写入 ATTR0 ($23C0)
        this.renderer.writeVram(0x23C0 + ay * 8 + ax, attrByte);
      }
    }
  }
}
