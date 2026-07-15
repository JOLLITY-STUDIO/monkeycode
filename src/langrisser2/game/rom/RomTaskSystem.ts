/**
 * RomTaskSystem — ROM 任务调度系统翻译
 *
 * ROM 使用任务队列驱动游戏:
 *   VBlank → 检查 TASK_PTR ($FF8004) → 跳转执行 → 设下一个 TASK_PTR
 *
 * 翻译为 TS: 状态机 + 方法调用, 不再做 68K 跳转
 */

import { RomProgram, RAM_VARS } from './RomProgram';
import { Ram } from '../core/Ram';
import { VdpChip } from '../vdp/VdpChip';
import { Cram } from '../vdp/Cram';
import { DISPLAY } from '../core/types';

// ============================================================
// 任务阶段
// ============================================================

const enum Phase {
  /** 等待 RomInits 完成 */
  BOOTING = 0,
  /** 执行游戏初始化任务链 (C80C → 1C834 → 1C8A8) */
  GAME_INIT = 1,
  /** 加载标题画面 VDP 数据 */
  TITLE_LOAD = 2,
  /** 标题画面运行 */
  TITLE_RUN = 3,
  /** 主游戏循环 */
  GAME_LOOP = 4,
}

// ============================================================
// RomTaskSystem
// ============================================================

export class RomTaskSystem extends RomProgram {

  /** 当前阶段 */
  private phase: Phase = Phase.BOOTING;

  /** 阶段内子步骤 */
  private step: number = 0;

  /** 帧计数 */
  private frameCount: number = 0;

  /** 已执行过 initAllInits */
  private _initsDone: boolean = false;

  constructor(romData: Uint8Array, ram: Ram, vdp: VdpChip) {
    super(romData, ram, vdp);
  }

  // ============================================================
  // 标记外部初始化完成
  // ============================================================

  /** 由调用方在 RomInits.executeAllInits() 之后调用 */
  markInitsDone(): void {
    this._initsDone = true;
    this.phase = Phase.GAME_INIT;
    this.step = 0;
    console.log('[RomTaskSystem] 进入 GAME_INIT 阶段');
  }

  // ============================================================
  // 每帧更新 — 状态机核心
  // ============================================================

  frameUpdate(): void {
    this.frameCount++;

    switch (this.phase) {
      case Phase.BOOTING:
        // 等待外部调用 markInitsDone()
        return;

      case Phase.GAME_INIT:
        this._runInitChain();
        return;

      case Phase.TITLE_LOAD:
        this._loadTitleScreen();
        return;

      case Phase.TITLE_RUN:
        this._runTitleScreen();
        return;

      case Phase.GAME_LOOP:
        // 主游戏循环 (场景逻辑驱动)
        return;
    }
  }

  // ============================================================
  // GAME_INIT: 初始化任务链
  //
  // ROM 中: 帧1 C80C → 帧2 1C834 → 帧3 1C8A8 → ...
  // TS: 每帧执行一步
  // ============================================================

  private _runInitChain(): void {
    switch (this.step) {
      case 0: // C80C: 游戏主初始化第一帧
        this._step_C80C();
        break;
      case 1: // 1C834: 第二帧 — 加载初始图形数据
        this._step_1C834();
        break;
      case 2: // 1C8A8: 第三帧 — 阶段分派
        this._step_1C8A8();
        break;
      default:
        // 初始化链完成 → 进入标题画面加载
        console.log('[RomTaskSystem] 初始化链完成 → TITLE_LOAD');
        this.phase = Phase.TITLE_LOAD;
        this.step = 0;
        break;
    }
    this.step++;
  }

  /** C80C: 设置 VDP DMA 参数, 准备加载图形 */
  private _step_C80C(): void {
    // ROM $C80C 逻辑:
    //   设置 DMA 源: $5DF40 (ROM 中的图形数据表)
    //   设置 DMA 参数到 $FF95A2-$FF95A8
    //   下一任务: $1C834
    this.ram.write32(0xFF95A2, 0x05DF40);
    this.ram.write16(0xFF95A6, 1);
    this.ram.write16(0xFF95A8, 0xF);
    console.log('[RomTaskSystem] C80C: DMA 参数已设置 → 1C834');
  }

  /** 1C834: 加载图形/颜色到 VDP */
  private _step_1C834(): void {
    // ROM $1C834 逻辑:
    //   调用 $C7F6 (子初始化)
    //   调用 $C91E (子初始化)
    //   写 VDP 命令到显示队列
    //   加载 ROM $82114 资源
    //   下一任务: $1C8A8

    // TS 简化: 直接利用 BootRom 已配置的 VDP 寄存器
    // VDP 寄存器已设置 (R2=0x30 PlaneA@C000, R5=0x6C Sprite@D800, etc.)
    console.log('[RomTaskSystem] 1C834: 显示队列初始化 → 1C8A8');
  }

  /** 1C8A8: 根据 gamePhase 分派 */
  private _step_1C8A8(): void {
    // ROM $1C8A8 逻辑:
    //   读取 $FFAE90 (阶段索引)
    //   根据跳转表分派子初始化函数
    //   阶段 0: 标题画面初始化
    //   增加 $FFAE90

    const gamePhase = this.ram.read16(0xFFAE90);
    console.log(`[RomTaskSystem] 1C8A8: gamePhase=${gamePhase} → 完成`);

    // 简单递增阶段
    this.ram.write16(0xFFAE90, gamePhase + 1);
  }

  // ============================================================
  // TITLE_LOAD: 加载标题画面 VDP 数据
  //
  // 将标题画面的 tile/调色板/nametable 加载到 VRAM/CRAM
  // ============================================================

  private _loadTitleScreen(): void {
    switch (this.step) {
      case 0:
        this._titleLoadCRAM();
        break;
      case 1:
        this._titleLoadTiles();
        break;
      case 2:
        this._titleLoadNametable();
        break;
      case 3:
        this._titleLoadSprites();
        break;
      case 4:
        this._titleEnableDisplay();
        break;
      default:
        console.log('[RomTaskSystem] ✓ 标题画面加载完成 → TITLE_RUN');
        this.phase = Phase.TITLE_RUN;
        this.step = 0;
        break;
    }
    this.step++;
  }

  /** 加载标题画面调色板到 CRAM */
  private _titleLoadCRAM(): void {
    const cram = this.vdp.cram;

    // 标题画面调色板 (从 ROM dumps 或已知数据)
    // Palette 0: 天空蓝/白/灰 渐变
    // Palette 1: 文字/UI 颜色
    // Palette 2-3: 精灵/装饰

    // Langrisser II 标题画面主色调:
    // BG Color (R7): 0x00 (黑色)
    // Palette 0 颜色表 (每种 16 色, 9-bit RGB):
    const palette0 = [
      0x0000, // 0: 透明/背景色 — 黑色
      0x0EEE, // 1: 白色
      0x0E00, // 2: 红色
      0x0EC0, // 3: 橙色
      0x0EE0, // 4: 黄色
      0x00E0, // 5: 绿色
      0x008E, // 6: 青色
      0x000E, // 7: 蓝色
      0x0E8E, // 8: 紫红
      0x0CEE, // 9: 浅蓝
      0x0888, // A: 灰色
      0x0444, // B: 暗灰
      0x0E4E, // C: 粉色
      0x04E4, // D: 亮绿
      0x0800, // E: 暗红
      0x00EE, // F: 亮蓝
    ];

    for (let i = 0; i < palette0.length; i++) {
      cram.setColor(i, palette0[i]);
    }

    // Palette 1: 文字/UI 色 (复制 palette0 但不同灰度)
    const palette1 = [
      0x0000, 0x0EEE, 0x0CC8, 0x0AA0,
      0x0880, 0x0660, 0x0440, 0x0220,
      0x0E00, 0x00E0, 0x000E, 0x0EE0,
      0x0E0E, 0x00EE, 0x0A40, 0x0E80,
    ];
    for (let i = 0; i < palette1.length; i++) {
      cram.setColor(16 + i, palette1[i]);
    }

    // Palette 2-3: 复制 palette0 作为精灵调色板
    for (let i = 0; i < 16; i++) {
      cram.setColor(32 + i, palette0[i]);
      cram.setColor(48 + i, palette0[i]);
    }

    console.log('[RomTaskSystem] CRAM 已加载');
  }

  /** 加载标题画面 tile 图案到 VRAM */
  private _titleLoadTiles(): void {
    const vram = this.vdp.vram;

    // 创建一个简单的字体/图形 tile set
    // 每个 tile: 8×8 pixels × 4bpp = 32 bytes
    // VRAM 地址 0x0000 开始存放 tiles

    // Tile 0: 空白 (全 0 = 透明)
    this._writeBlankTile(vram, 0);

    // Tile 1: 实心方块 (color index 1, 白色)
    this._writeSolidTile(vram, 1, 1);

    // Tile 2: 实心方块 (color index 2, 红色)
    this._writeSolidTile(vram, 2, 2);

    // Tile 3: 实心方块 (color index 7, 蓝色)
    this._writeSolidTile(vram, 3, 7);

    // Tile 4: 实心方块 (color index 5, 绿色)
    this._writeSolidTile(vram, 4, 5);

    // Tile 5-14: 数字 0-9 (简单 8×8 位图)
    this._writeDigitTiles(vram);

    // Tile 16-31: 字母 A-P (前 16 个字母)
    this._writeAlphaTiles(vram, 16);

    console.log('[RomTaskSystem] Tiles 已加载到 VRAM 0x0000');
  }

  /** 写入一个空白 tile */
  private _writeBlankTile(vram: any, tileIndex: number): void {
    const base = tileIndex * 32;
    for (let i = 0; i < 32; i++) {
      vram.getRawData()[base + i] = 0;
    }
  }

  /** 写入一个纯色实心 tile (所有像素用同一颜色索引) */
  private _writeSolidTile(vram: any, tileIndex: number, color: number): void {
    const base = tileIndex * 32;
    const mask = (color & 1) ? 0xFF : 0x00;
    const m2   = (color & 2) ? 0xFF : 0x00;
    const m4   = (color & 4) ? 0xFF : 0x00;
    const m8   = (color & 8) ? 0xFF : 0x00;

    for (let row = 0; row < 8; row++) {
      const r = base + row * 4;
      vram.getRawData()[r]     = mask; // bitplane 0
      vram.getRawData()[r + 1] = m2;   // bitplane 1
      vram.getRawData()[r + 2] = m4;   // bitplane 2
      vram.getRawData()[r + 3] = m8;   // bitplane 3
    }
  }

  /** 简单的 8×8 数字/字母位图 tile
   *  每个 tile 32 bytes, 4bpp bit-plane 格式
   */
  private _writeDigitTiles(vram: any): void {
    // 简单数字位图: 8×8, 用颜色1(白色)
    const digits: number[][] = [
      // 0
      [0x3C,0x66,0x66,0x66,0x66,0x66,0x66,0x3C],
      // 1
      [0x18,0x38,0x18,0x18,0x18,0x18,0x18,0x7E],
      // 2
      [0x3C,0x66,0x06,0x0C,0x18,0x30,0x60,0x7E],
      // 3
      [0x3C,0x66,0x06,0x1C,0x06,0x06,0x66,0x3C],
      // 4
      [0x0C,0x1C,0x3C,0x6C,0xCC,0xFE,0x0C,0x0C],
      // 5
      [0x7E,0x60,0x7C,0x06,0x06,0x06,0x66,0x3C],
      // 6
      [0x3C,0x66,0x60,0x7C,0x66,0x66,0x66,0x3C],
      // 7
      [0x7E,0x06,0x0C,0x18,0x30,0x30,0x30,0x30],
      // 8
      [0x3C,0x66,0x66,0x3C,0x66,0x66,0x66,0x3C],
      // 9
      [0x3C,0x66,0x66,0x66,0x3E,0x06,0x66,0x3C],
    ];

    for (let d = 0; d < digits.length; d++) {
      const base = (5 + d) * 32;
      for (let row = 0; row < 8; row++) {
        const byte = digits[d][row];
        const r = base + row * 4;
        vram.getRawData()[r]     = byte;  // bitplane 0 (all color bit 0)
        vram.getRawData()[r + 1] = 0;     // bitplane 1
        vram.getRawData()[r + 2] = 0;     // bitplane 2
        vram.getRawData()[r + 3] = 0;     // bitplane 3
      }
    }
  }

  /** 简单字母 A-P tiles */
  private _writeAlphaTiles(vram: any, startIndex: number): void {
    const alpha: number[][] = [
      // A
      [0x18,0x3C,0x66,0x66,0x7E,0x66,0x66,0x66],
      // B
      [0x7C,0x66,0x66,0x7C,0x66,0x66,0x66,0x7C],
      // C
      [0x3C,0x66,0x60,0x60,0x60,0x60,0x66,0x3C],
      // D
      [0x78,0x6C,0x66,0x66,0x66,0x66,0x6C,0x78],
      // E
      [0x7E,0x60,0x60,0x7C,0x60,0x60,0x60,0x7E],
      // F
      [0x7E,0x60,0x60,0x7C,0x60,0x60,0x60,0x60],
      // G
      [0x3C,0x66,0x60,0x6E,0x66,0x66,0x66,0x3C],
      // H
      [0x66,0x66,0x66,0x7E,0x66,0x66,0x66,0x66],
      // I
      [0x3C,0x18,0x18,0x18,0x18,0x18,0x18,0x3C],
      // J
      [0x1E,0x0C,0x0C,0x0C,0x0C,0x6C,0x6C,0x38],
      // K
      [0x66,0x6C,0x78,0x70,0x78,0x6C,0x66,0x66],
      // L
      [0x60,0x60,0x60,0x60,0x60,0x60,0x60,0x7E],
      // M
      [0x63,0x77,0x7F,0x6B,0x63,0x63,0x63,0x63],
      // N
      [0x66,0x76,0x7E,0x7E,0x6E,0x66,0x66,0x66],
      // O
      [0x3C,0x66,0x66,0x66,0x66,0x66,0x66,0x3C],
      // P
      [0x7C,0x66,0x66,0x66,0x7C,0x60,0x60,0x60],
    ];

    for (let a = 0; a < alpha.length; a++) {
      const base = (startIndex + a) * 32;
      for (let row = 0; row < 8; row++) {
        const byte = alpha[a][row];
        const r = base + row * 4;
        vram.getRawData()[r]     = byte;
        vram.getRawData()[r + 1] = 0;
        vram.getRawData()[r + 2] = 0;
        vram.getRawData()[r + 3] = 0;
      }
    }
  }

  /** 加载 Plane A Nametable — "LANGRISSER II" 文字 */
  private _titleLoadNametable(): void {
    const raw = this.vdp.vram.getRawData();
    // Plane A Nametable @ 0xC000 (R2=0x30)
    // Plane Size: 64×64 tiles (R10=0x01)
    // Display: 40×28 tiles visible in H40 mode
    // Nametable entry: 16-bit
    //   bit 0-10: tile index
    //   bit 11-12: hFlip/vFlip
    //   bit 13-14: palette (0-3)
    //   bit 15: priority

    const planeSize = this.vdp.planeASize; // 64
    const ntBase = this.vdp.planeAAddr;    // 0xC000

    /** 在 (line, col) 写一条 nametable entry */
    const writeEntry = (line: number, col: number, tileIdx: number, palette: number = 0) => {
      const offset = (line * planeSize + col) * 2;
      const entry = (palette << 13) | (tileIdx & 0x7FF);
      raw[ntBase + offset]     = (entry >> 8) & 0xFF;
      raw[ntBase + offset + 1] =  entry       & 0xFF;
    };

    // 字母 tile 映射: A-P → tile 16-31
    const baseAlphaTile = 16;

    // 标题文字 "LANGRISSER II"
    const titleLine = 10;
    const titleText = 'LANGRISSER II';
    const startCol = Math.floor((40 - titleText.length) / 2);

    for (let i = 0; i < titleText.length; i++) {
      const ch = titleText.charAt(i);
      let tileIdx = 0;
      if (ch >= 'A' && ch <= 'Z') {
        const idx = ch.charCodeAt(0) - 'A'.charCodeAt(0);
        tileIdx = idx < 16 ? baseAlphaTile + idx : 1; // 只支持 A-P
      } else if (ch >= '0' && ch <= '9') {
        tileIdx = 5 + (ch.charCodeAt(0) - '0'.charCodeAt(0));
      }
      writeEntry(titleLine, startCol + i, tileIdx, 0);
    }

    // 装饰: 彩色条 (4 条)
    for (const barLine of [8, 13]) {
      for (let col = 0; col < 40; col++) {
        const tileIdx = 1 + (col % 4); // tile 1-4 (白/红/蓝/绿)
        writeEntry(barLine, col, tileIdx, 0);
      }
    }

    // 底部提示 "PRESS START BUTTON"
    const hintLine = 23;
    const hintText = 'PRESS START BUTTON';
    const hintStartCol = Math.floor((40 - hintText.length) / 2);
    for (let i = 0; i < hintText.length; i++) {
      const ch = hintText.charAt(i);
      let tileIdx = 0;
      if (ch >= 'A' && ch <= 'Z') {
        const idx = ch.charCodeAt(0) - 'A'.charCodeAt(0);
        tileIdx = idx < 16 ? baseAlphaTile + idx : 1;
      }
      writeEntry(hintLine, hintStartCol + i, tileIdx, 1); // palette 1
    }

    console.log(`[RomTaskSystem] Plane A Nametable 已加载 (${planeSize}×${planeSize})`);
  }

  /** 加载精灵表 (标题画面不需要精灵) */
  private _titleLoadSprites(): void {
    // 清空 Sprite Attribute Table
    const satBase = this.vdp.spriteTableAddr; // 0xD800 by boot config
    const vram = this.vdp.vram;

    // 空精灵: Y=$80 (off-screen), 其他=0
    for (let i = 0; i < 80; i++) {
      const addr = satBase + i * 8;
      vram.getRawData()[addr] = 0x80; // Y = $80 (隐藏)
      for (let j = 1; j < 8; j++) {
        vram.getRawData()[addr + j] = 0;
      }
    }

    console.log('[RomTaskSystem] Sprite 表已清空');
  }

  /** 启用 VDP 显示 */
  private _titleEnableDisplay(): void {
    // VDP R1 当前值: $14 (Display=OFF, VInt=OFF, DMA=ON, NTSC)
    // 启用显示: bit 6 = 1 → $14 → $54
    const r1 = this.vdp.reg[0x01] | 0x40;
    this.vdp.writeRegister(0x01, r1);
    console.log('[RomTaskSystem] VDP 显示已启用 (R1=$' + r1.toString(16) + ')');
  }

  // ============================================================
  // TITLE_RUN: 标题画面运行
  // ============================================================

  private _runTitleScreen(): void {
    // 标题画面逻辑:
    // - 等待 START 按键
    // - 播放入场动画

    // 每 60 帧打印一次日志
    if (this.frameCount % 60 === 0) {
      console.log(`[RomTaskSystem] 标题画面运行中... (第 ${this.frameCount} 帧)`);
    }
  }

  // ============================================================
  // VDP DMA 辅助 — ROM $85EE 任务分发器
  // ============================================================

  dispatchTask(taskAddr: number, arg: number = 0): { nextTask: number; arg: number } {
    return { nextTask: taskAddr, arg };
  }

  // ============================================================
  // 状态查询
  // ============================================================

  get currentPhase(): number { return this.phase; }
  get frames(): number { return this.frameCount; }
  get isTitleScreen(): boolean { return this.phase >= Phase.TITLE_RUN; }
}
