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

/** Bank 1 子状态处理函数类型 */
type SubStateHandler = () => void;

export class Bank1Dispatcher {
  private data: DataCache;
  private banks: BankManager;
  private renderer: Renderer;
  private oam: OamCache;
  private ppuQueue: PpuQueue;
  private input: InputManager;

  /** 当前 Bank 1 子状态 ($03CB) */
  private subState: number = 0;

  /** 子状态内的步骤计数器 ($03CC) */
  private stepCounter: number = 0;

  /** 初始化阶段变量 */
  private initPhase: number = 0;

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

  /**
   * 执行 Bank 1 子状态逻辑
   * 对应 ROM 中 $8015-$8048 的主循环
   *
   * 每帧从 NMI handler 调用一次
   */
  update(): void {
    // 读取当前子状态 ($03CB)
    this.subState = this.data.read(0x03CB);

    switch (this.subState) {
      case 0: this.subState00_TitleInit1(); break;
      case 1: this.subState01_TitleInit2(); break;
      case 2: this.subState02_TitleAnim(); break;
      case 3: this.subState03_TitleTransition(); break;
      case 4: this.subState04_TitleTransition2(); break;
      case 5: this.subState05_MenuInit(); break;
      case 6: this.subState06_MenuLoop(); break;
      default:
        // Unknown sub-state, skip
        break;
    }
  }

  /**
   * 初始化 Bank 1 状态机
   * 设置初始子状态为 0
   */
  init(subStateIndex: number): void {
    this.subState = subStateIndex;
    this.stepCounter = 0;
    this.initPhase = 0;

    // 写入 $03CB (子状态) 和 $03CC (步骤)
    this.data.write(0x03CB, subStateIndex);
    this.data.write(0x03CC, 0);

    // 切换到 PRG Bank 1
    this.banks.prgBank0 = 1;
    this.data.mmcBankReg2 = 1;
  }

  /**
   * 子状态 0: 标题初始化第1步
   * 对应 ROM $C05B
   *
   * 功能:
   *   1. 设置 CHR Bank 为标题画面图形
   *   2. 清除 OAM
   *   3. 设置初始 PPU 状态
   */
  private subState00_TitleInit1(): void {
    // $C05B: LDA #$00, STA $7A - 初始化阶段计数器
    this.data.zpWrite(0x7A, 0);

    // $C05F: LDA #$1E, STA $1B - CHR Bank 1 = $1E
    // $C063: LDA #$1F, STA $1A - CHR Bank 0 = $1F
    this.banks.chrBank0 = 0x1F;
    this.banks.chrBank1 = 0x1E;
    this.data.mmcBankReg0 = 0x1F;
    this.data.mmcBankReg1 = 0x1E;

    // 设置 PPU 控制寄存器: NMI on, BG=$1000, NT=0
    this.data.ppuCtrl = 0x90;
    this.data.ppuMask = 0x0E; // 显示背景，隐藏精灵
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    // 清除 OAM
    this.oam.clear();

    // $C067: LDA #$02, JSR $8059 - 调用某些初始化
    // $C06C: INC $03CB - 进入下一个子状态
    this.data.write(0x03CB, 1);
    this.data.write(0x03CC, 0);

    console.log('[Bank1] Sub-state 0: Title Init 1 - CHR banks set');
  }

  /**
   * 子状态 1: 标题初始化第2步
   * 对应 ROM $C070
   *
   * 功能:
   *   1. 加载标题画面调色板
   *   2. 加载标题画面名称表数据
   *   3. 设置精灵位置
   */
  private subState01_TitleInit2(): void {
    this.stepCounter = this.data.read(0x03CC);

    switch (this.stepCounter) {
      case 0:
        // 加载标题调色板
        this.loadTitlePalette();
        break;
      case 1:
        // 加载标题名称表
        this.loadTitleNametable();
        break;
      case 2:
        // 设置标题精灵
        this.setupTitleSprites();
        break;
      case 3:
        // 完成初始化，进入动画循环
        this.data.write(0x03CB, 2);
        this.data.write(0x03CC, 0);
        console.log('[Bank1] Sub-state 1: Title Init 2 - Complete, entering anim');
        return;
    }

    this.data.write(0x03CC, this.stepCounter + 1);
  }

  /** 加载标题画面调色板 */
  private loadTitlePalette(): void {
    // 标题画面调色板 (从 ROM 提取)
    // 背景调色板 0-3
    const bgPalette: number[] = [
      0x0F, 0x30, 0x10, 0x00,  // 0: 黑/白/灰/黑
      0x0F, 0x16, 0x26, 0x36,  // 1: 黑/红/浅红/粉
      0x0F, 0x12, 0x22, 0x32,  // 2: 黑/蓝/浅蓝/白
      0x0F, 0x19, 0x29, 0x39,  // 3: 黑/绿/亮绿/黄绿
    ];

    // 精灵调色板 4-7
    const sprPalette: number[] = [
      0x0F, 0x0F, 0x16, 0x26,  // 4
      0x0F, 0x12, 0x22, 0x32,  // 5
      0x0F, 0x19, 0x29, 0x39,  // 6
      0x0F, 0x0F, 0x0F, 0x0F,  // 7
    ];

    for (let i = 0; i < 16; i++) {
      this.renderer.writeVram(0x3F00 + i, bgPalette[i]);
      this.renderer.writeVram(0x3F10 + i, sprPalette[i]);
    }
  }

  /**
   * 加载标题画面名称表
   *
   * 标题画面布局 (天使之翼):
   *   - 顶部: 游戏标题 "キャプテン翼" (日文大字)
   *   - 中间: 角色图片 (大空翼等)
   *   - 底部: "PRESS START BUTTON" 文字
   *   - 版权信息: "(C) TECMO 1988"
   *
   * 由于原始标题画面由 Bank 1 脚本引擎动态生成，
   * 这里使用从 ROM 分析中得到的简化版数据。
   * 完整实现需要 Bank 1 脚本引擎。
   */
  private loadTitleNametable(): void {
    // 清空名称表
    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }

    // 使用 CHR Bank 0x1F (标题图形 bank 的 tile) 绘制标题画面
    // 标题文字 "CAPTAIN TSUBASA" 占据屏幕上半部分
    // 使用 tile 编号填充（每个 tile 8x8 像素）
    // 屏幕宽度 32 tiles, 高度 30 tiles

    // 顶部标题区域 - 绘制一些 tile 来显示 CHR 图形
    // tile 索引根据实际 CHR bank 0x1F 的内容排列
    // 在 Bank 1 的 $C000+ 区域中存储了标题的 tile 布局

    // 简化版: 在屏幕中央区域绘制 tile 来验证渲染
    // 实际标题画面需要从 ROM 提取完整布局数据

    // 临时: 绘制测试图案来验证 CHR 加载
    // 这会在左上角显示 tile 0-255 的网格
    for (let row = 0; row < 30; row++) {
      for (let col = 0; col < 32; col++) {
        const tileIdx = (row * 32 + col) & 0xFF;
        this.renderer.writeVram(0x2000 + row * 32 + col, tileIdx);
      }
    }

    // 设置属性表 - 全部使用调色板 0
    for (let i = 0; i < 64; i++) {
      this.renderer.writeVram(0x23C0 + i, 0x00);
    }

    console.log('[Bank1] Title nametable loaded (test pattern)');
  }

  /** 设置标题画面精灵 */
  private setupTitleSprites(): void {
    // 清除所有精灵
    this.oam.clear();

    // 标题画面通常显示少量精灵（如闪烁的"PRESS START"文字）
    // 原始 ROM 中精灵由 Bank 1 的脚本引擎动态设置
    // 这里暂时不设置精灵
  }

  /**
   * 子状态 2: 标题动画循环
   * 对应 ROM $C0A7
   *
   * 功能:
   *   1. 标题画面闪烁动画
   *   2. 等待 START 按键
   *   3. 检测到 START → 进入菜单
   */
  private subState02_TitleAnim(): void {
    // 检查 START 按键
    if (this.input.isPressed(0x10)) { // Button.START
      console.log('[Bank1] START pressed → Menu');
      // 进入菜单初始化子状态
      this.data.write(0x03CB, 5);
      this.data.write(0x03CC, 0);
      return;
    }

    // 标题闪烁动画 (通过 PPU MASK bit 控制特定精灵的显示)
    // 每30帧切换一次
    const frameCount = this.data.frameCount;
    if ((frameCount & 0x1F) === 0) {
      // 闪烁效果
    }
  }

  /** 子状态 3-4: 标题过渡效果 (占位) */
  private subState03_TitleTransition(): void {
    this.data.write(0x03CB, 4);
  }

  private subState04_TitleTransition2(): void {
    this.data.write(0x03CB, 2); // 返回标题循环
  }

  /**
   * 子状态 5: 菜单初始化
   * 对应 ROM $C106
   */
  private subState05_MenuInit(): void {
    // 切换到菜单的 CHR bank
    this.banks.chrBank0 = 0;
    this.banks.chrBank1 = 1;
    this.data.mmcBankReg0 = 0;
    this.data.mmcBankReg1 = 1;

    // 清除屏幕
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

    for (let i = 0; i < 16; i++) {
      this.renderer.writeVram(0x3F00 + i, menuPalette[i]);
      this.renderer.writeVram(0x3F10 + i, menuPalette[i]);
    }

    for (let i = 0; i < 64; i++) {
      this.renderer.writeVram(0x23C0 + i, 0x00);
    }

    this.data.write(0x03CB, 6);
    this.data.write(0x03CC, 0);
    console.log('[Bank1] Menu init complete');
  }

  /**
   * 子状态 6: 菜单循环
   * 对应 ROM $C181
   */
  private subState06_MenuLoop(): void {
    // 菜单逻辑在 State02_MenuSelect 中处理
    // Bank 1 的菜单循环主要用于渲染和动画
  }
}
