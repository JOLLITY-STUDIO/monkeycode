/**
 * Bank 1 子状态调度器
 * 对应 ROM 中 Bank 1 的状态分发逻辑
 *
 * Bank 1 负责标题画面、菜单画面、队伍选择等画面逻辑。
 * 当 PRG Bank 切换到 1 时，通过子状态索引（低4位）
 * 从跳转表 ($804B) 中查找对应的处理函数。
 *
 * 跳转表布局 ($804B):
 *   [0] $C05B - 标题初始化第1步 (设置CHR bank)
 *   [1] $C070 - 标题初始化第2步 (加载图形数据)
 *   [2] $C0A7 - 标题动画循环
 *   [3] $C0BE - 标题过渡效果
 *   [4] $C0ED - 标题过渡效果2
 *   [5] $C106 - 菜单初始化
 *   [6] $C181 - 菜单循环
 *   [7] $C213 - 更多...
 *
 * $03CB: Bank 1 内部的子状态计数器
 */

import type { DataCache } from '../cache/DataCache';
import type { BankManager } from '../cache/BankManager';
import type { Renderer } from '../renderer/Renderer';
import type { OamCache } from '../cache/OamCache';
import type { PpuQueue } from '../cache/PpuQueue';
import type { InputManager } from '../input/InputManager';

/**
 * 标题画面调色板 - 从 ROM Bank 2 偏移 $B24F 区域提取
 *
 * ROM 原始数据 ($B24F-$B25E, Bank 2 CPU $B24F):
 *   0F 33 0F 1A | 30 36 0F 30 | 0F 25 0F 0F | 0F 36 30 21
 *
 * 解码:
 *   BG[0]: 0F(黑) 33(浅灰) 0F(黑) 1A(绿)     → 标题背景
 *   BG[1]: 30(白) 36(粉红) 0F(黑) 30(白)     → 标题文字亮色
 *   BG[2]: 0F(黑) 25(暗紫) 0F(黑) 0F(黑)     → 阴影
 *   BG[3]: 0F(黑) 36(粉红) 30(白) 21(浅蓝)   → 高亮/轮廓
 */
const TITLE_BG_PALETTE: number[] = [
  0x0F, 0x33, 0x0F, 0x1A,  // BG 0
  0x30, 0x36, 0x0F, 0x30,  // BG 1
  0x0F, 0x25, 0x0F, 0x0F,  // BG 2
  0x0F, 0x36, 0x30, 0x21,  // BG 3
];

const TITLE_SPR_PALETTE: number[] = [
  0x0F, 0x0F, 0x16, 0x26,  // Spr 0 (红)
  0x0F, 0x12, 0x22, 0x32,  // Spr 1 (蓝)
  0x0F, 0x19, 0x29, 0x39,  // Spr 2 (绿)
  0x0F, 0x0F, 0x0F, 0x0F,  // Spr 3 (未使用)
];

/**
 * 标题画面 tile 索引映射
 *
 * CHR bank 0x1E (tileBase=0, 来自 chr_bank_0F.png tiles 0-127)
 * 包含标题画面背景图形 (大文字、角色图案)
 *
 * 以下是根据天使之翼标题画面实际 tile 布局手工构造的名称表数据。
 * 每行 32 tiles, 共 30 行。
 * 由于完整数据需要 Bank 7 脚本引擎动态生成，这里使用结构化的近似布局。
 */
function buildTitleNametable(): number[] {
  const nt = new Array<number>(960).fill(0x00);
  const EMPTY = 0x00; // 空白 tile

  // 标题文字 "キャプテン翼" 区域 (行 2-11)
  // 使用 tile 0x10-0x4F 范围内的标题大文字 tile
  // 这些 tile 在 CHR bank 0x1E 中组成日文大字
  const titleRows: { y: number; tiles: number[] }[] = [
    { y: 2, tiles: [0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19] },
    { y: 3, tiles: [0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29] },
    { y: 4, tiles: [0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39] },
    { y: 5, tiles: [0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49] },
    { y: 6, tiles: [0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59] },
    { y: 7, tiles: [0x60, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69] },
    { y: 8, tiles: [0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79] },
  ];

  for (const row of titleRows) {
    // 标题居中: 从列 4 开始绘制
    const startCol = 4;
    for (let i = 0; i < row.tiles.length; i++) {
      const col = startCol + i;
      if (col < 32) {
        nt[row.y * 32 + col] = row.tiles[i];
      }
    }
  }

  // 角色展示区域 (行 12-17) - 使用 tile 0x50-0x7F
  for (let y = 12; y < 18; y++) {
    for (let x = 0; x < 32; x++) {
      const tileIdx = 0x50 + ((y - 12) * 32 + x) % 128;
      // 只在非边缘区域绘制角色 tile
      if (x >= 4 && x < 28) {
        nt[y * 32 + x] = tileIdx;
      }
    }
  }

  // "PRESS START BUTTON" 提示文字 (行 22-23)
  // 使用 tile 0x80-0x9F (字母/数字 tile)
  const pressStartText = [
    0x50, 0x52, 0x45, 0x53, 0x53, 0x00, // P R E S S
    0x53, 0x54, 0x41, 0x52, 0x54, 0x00, // S T A R T
    0x42, 0x55, 0x54, 0x54, 0x4F, 0x4E, // B U T T O N
  ];

  const startCol = 7;
  for (let i = 0; i < pressStartText.length; i++) {
    if (i < 6) {
      nt[22 * 32 + startCol + i] = pressStartText[i];
    } else if (i < 12) {
      nt[23 * 32 + startCol + i - 6] = pressStartText[i];
    } else {
      nt[24 * 32 + startCol + i - 12] = pressStartText[i];
    }
  }

  // 版权信息 (行 27)
  const copyright = [0x43, 0x29, 0x00, 0x54, 0x45, 0x43, 0x4D, 0x4F, 0x00, 0x31, 0x39, 0x38, 0x38];
  for (let i = 0; i < copyright.length; i++) {
    nt[27 * 32 + 8 + i] = copyright[i];
  }

  return nt;
}

/**
 * 属性表 - 标题画面
 * 上半部分(文字/角色)使用调色板 1，下半部分(提示文字)使用调色板 3
 */
function buildTitleAttributes(): number[] {
  const attr = new Array<number>(64).fill(0x00);
  // 上半部分 (行 0-15): 每个 4x4 tile 块使用调色板 1 (attr=0x55 → 每个2x2=01)
  for (let i = 0; i < 32; i++) {
    attr[i] = 0x55; // 全部使用 palette 1
  }
  // 下半部分 (行 16-29): 使用调色板 3
  for (let i = 32; i < 64; i++) {
    attr[i] = 0xFF; // 全部使用 palette 3
  }
  return attr;
}

/**
 * 菜单画面调色板 - 从 ROM Bank 2 提取 ($B261 area)
 */
const MENU_BG_PALETTE: number[] = [
  0x0F, 0x36, 0x30, 0x21,  // BG 0: 黑/粉/白/蓝
  0x36, 0x11, 0x0F, 0x36,  // BG 1: 粉/蓝/黑/粉
  0x30, 0x21, 0x36, 0x30,  // BG 2: 白/蓝/粉/白
  0x0F, 0x0F, 0x0F, 0x21,  // BG 3: 黑/黑/黑/蓝
];

export class Bank1Dispatcher {
  private data: DataCache;
  private banks: BankManager;
  private renderer: Renderer;
  private oam: OamCache;
  private ppuQueue: PpuQueue;
  private input: InputManager;

  private subState: number = 0;
  private stepCounter: number = 0;
  private initPhase: number = 0;

  /** 预计算的标题画面名称表 */
  private titleNametable: number[] | null = null;

  /** 预计算的标题画面属性表 */
  private titleAttributes: number[] | null = null;

  constructor(
    data: DataCache,
    banks: BankManager,
    renderer: Renderer,
    oam: OamCache,
    ppuQueue: PpuQueue,
    input: InputManager,
  ) {
    this.data = data;
    this.banks = banks;
    this.renderer = renderer;
    this.oam = oam;
    this.ppuQueue = ppuQueue;
    this.input = input;
  }

  update(): void {
    this.subState = this.data.read(0x03CB);

    switch (this.subState) {
      case 0: this.subState00_TitleInit1(); break;
      case 1: this.subState01_TitleInit2(); break;
      case 2: this.subState02_TitleAnim(); break;
      case 3: this.subState03_TitleTransition(); break;
      case 4: this.subState04_TitleTransition2(); break;
      case 5: this.subState05_MenuInit(); break;
      case 6: this.subState06_MenuLoop(); break;
      default: break;
    }
  }

  init(subStateIndex: number): void {
    this.subState = subStateIndex;
    this.stepCounter = 0;
    this.initPhase = 0;
    this.data.write(0x03CB, subStateIndex);
    this.data.write(0x03CC, 0);
    this.banks.prgBank0 = 1;
    this.data.mmcBankReg2 = 1;
  }

  // ==========================================
  // 子状态 0: 标题初始化第1步 ($C05B)
  // ==========================================
  private subState00_TitleInit1(): void {
    this.data.zpWrite(0x7A, 0);

    // CHR Bank 设置: chrBank0=$1F, chrBank1=$1E
    this.banks.chrBank0 = 0x1F;
    this.banks.chrBank1 = 0x1E;
    this.data.mmcBankReg0 = 0x1F;
    this.data.mmcBankReg1 = 0x1E;

    this.data.ppuCtrl = 0x90;   // NMI on, BG=$1000, Spr=$0000, NT=0, VRAM+1
    this.data.ppuMask = 0x0E;   // 显示BG, 隐藏精灵
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    this.oam.clear();

    this.data.write(0x03CB, 1);
    this.data.write(0x03CC, 0);
    console.log('[Bank1] Sub-state 0: Title Init 1 - CHR=$1E/$1F');
  }

  // ==========================================
  // 子状态 1: 标题初始化第2步 ($C070)
  // ==========================================
  private subState01_TitleInit2(): void {
    this.stepCounter = this.data.read(0x03CC);

    switch (this.stepCounter) {
      case 0: this.loadTitlePalette(); break;
      case 1: this.loadTitleNametable(); break;
      case 2: this.setupTitleSprites(); break;
      case 3:
        this.data.write(0x03CB, 2);
        this.data.write(0x03CC, 0);
        console.log('[Bank1] Sub-state 1: Complete → Title Anim');
        return;
    }
    this.data.write(0x03CC, this.stepCounter + 1);
  }

  /** 加载标题画面调色板 (ROM提取) */
  private loadTitlePalette(): void {
    for (let i = 0; i < 16; i++) {
      this.renderer.writeVram(0x3F00 + i, TITLE_BG_PALETTE[i]);
      this.renderer.writeVram(0x3F10 + i, TITLE_SPR_PALETTE[i]);
    }
    console.log('[Bank1] Title palette loaded (ROM data)');
  }

  /** 加载标题画面名称表 */
  private loadTitleNametable(): void {
    // 清空名称表
    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }

    // 使用预构建的标题画面布局
    if (!this.titleNametable) {
      this.titleNametable = buildTitleNametable();
      this.titleAttributes = buildTitleAttributes();
    }

    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, this.titleNametable[i]);
    }

    for (let i = 0; i < 64; i++) {
      this.renderer.writeVram(0x23C0 + i, this.titleAttributes![i]);
    }

    console.log('[Bank1] Title nametable loaded (structured layout)');
  }

  /** 设置标题画面精灵 */
  private setupTitleSprites(): void {
    this.oam.clear();
    // PRESS START 闪烁精灵由动画循环处理
  }

  // ==========================================
  // 子状态 2: 标题动画循环 ($C0A7)
  // ==========================================
  private subState02_TitleAnim(): void {
    const fc = this.data.frameCount;

    // 闪烁效果: 每 60 帧 (约1秒) 切换一次
    if (fc % 60 === 0) {
      const blinkPhase = (fc / 60) & 1;
      // 通过修改 VRAM 中提示文字的调色板属性来模拟闪烁
      if (blinkPhase === 0) {
        // 显示 PRESS START
        for (let i = 56; i < 64; i++) {
          this.renderer.writeVram(0x23C0 + i, 0xFF);
        }
      } else {
        // 隐藏 PRESS START (使用黑色调色板)
        for (let i = 56; i < 64; i++) {
          this.renderer.writeVram(0x23C0 + i, 0x00);
        }
      }
    }
  }

  // ==========================================
  // 子状态 3-4: 过渡效果
  // ==========================================
  private subState03_TitleTransition(): void {
    this.data.write(0x03CB, 4);
  }

  private subState04_TitleTransition2(): void {
    this.data.write(0x03CB, 2);
  }

  // ==========================================
  // 子状态 5: 菜单初始化 ($C106)
  // ==========================================
  private subState05_MenuInit(): void {
    this.banks.chrBank0 = 0;
    this.banks.chrBank1 = 1;
    this.data.mmcBankReg0 = 0;
    this.data.mmcBankReg1 = 1;

    // 清屏
    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }

    // 菜单调色板
    for (let i = 0; i < 16; i++) {
      this.renderer.writeVram(0x3F00 + i, MENU_BG_PALETTE[i]);
      this.renderer.writeVram(0x3F10 + i, MENU_BG_PALETTE[i]);
    }

    for (let i = 0; i < 64; i++) {
      this.renderer.writeVram(0x23C0 + i, 0x00);
    }

    this.data.write(0x03CB, 6);
    this.data.write(0x03CC, 0);
    console.log('[Bank1] Menu init complete');
  }

  /** 子状态 6: 菜单循环 */
  private subState06_MenuLoop(): void {
    // 菜单逻辑在 State02_MenuSelect 中处理
  }
}
