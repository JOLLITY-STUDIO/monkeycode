/**
 * Bank 1 子状态调度器
 * 对应 ROM 中 Bank 1 的状态分发逻辑 ($804B jump table)
 *
 * 标题画面使用 5 页 (page 0-4) 分步加载，通过 sub-states 1→2→3→4 循环：
 *   page 0 → sub1(load) → sub2(anim/timer) → sub3(trans) → sub4(next page)
 *   → page 1 → sub1(load) → ... → page 4 → sub5(menu)
 *
 * 跳转表布局 ($804B):
 *   [0] $C05B - 标题初始化第1步 (设置CHR bank)
 *   [1] $C070 - 标题初始化第2步 (加载图形数据 → $C2C2, $C383)
 *   [2] $C0A7 - 标题动画循环 (递减 $79 计数器)
 *   [3] $C0BE - 标题过渡效果 (翻页动画 → $C3CE)
 *   [4] $C0ED - 如果 $7A<5: $7A++, 回 sub1; 否则 → sub5
 *   [5] $C106 - 菜单初始化
 *   [6] $C181 - 菜单循环
 *
 * $03CB: Bank 1 内部的子状态计数器
 * $03CC: 步骤计数器
 * $79:   帧计数器 (sub2中递减)
 * $7A:   页面索引 (0-4)
 */

import type { DataCache } from '../cache/DataCache';
import type { BankManager } from '../cache/BankManager';
import type { Renderer } from '../renderer/Renderer';
import type { OamCache } from '../cache/OamCache';
import type { PpuQueue } from '../cache/PpuQueue';
import type { InputManager } from '../input/InputManager';

/**
 * 标题画面调色板 - 从 ROM Bank 2 偏移 $B24F 区域提取
 * ROM 原始数据 ($B24F-$B25E):
 *   0F 33 0F 1A | 30 36 0F 30 | 0F 25 0F 0F | 0F 36 30 21
 */
const TITLE_BG_PALETTE: number[] = [
  0x0F, 0x33, 0x0F, 0x1A,  // BG 0: 黑, 浅灰紫, 黑, 绿
  0x30, 0x36, 0x0F, 0x30,  // BG 1: 纯白, 肉色, 黑, 纯白
  0x0F, 0x25, 0x0F, 0x0F,  // BG 2: 黑, 粉紫, 黑, 黑
  0x0F, 0x36, 0x30, 0x21,  // BG 3: 黑, 肉色, 纯白, 蓝
];

const TITLE_SPR_PALETTE: number[] = [
  0x0F, 0x0F, 0x16, 0x26,  // Spr 0: 红
  0x0F, 0x12, 0x22, 0x32,  // Spr 1: 蓝
  0x0F, 0x19, 0x29, 0x39,  // Spr 2: 绿
  0x0F, 0x0F, 0x0F, 0x0F,  // Spr 3: 未使用
];

// ============================================================
// 名称表构建 — 5 页分页布局 (模拟 ROM 的 RLE 分页加载)
// 真实 ROM 通过 Bank 7 的 RLE 引擎 ($C2C2) 解压数据
// 这里暂时使用结构化近似布局
// ============================================================

/** 构建全页背景 (page 0-4 的 baseline, 每页只填充特定区域) */
function buildTitlePage(page: number): { nametable: number[]; attrs: number[] } {
  const nt = new Array<number>(960).fill(0x00);
  const attrs = new Array<number>(64).fill(0x00);

  switch (page) {
    case 0: {
      // Page 0: 标题大字 "CAPTAIN TSUBASA" (上半部分) + 背景
      // 用 tile 0x01 做彩色条带上边框验证渲染管线
      for (let x = 0; x < 32; x++) { nt[0 * 32 + x] = 0x01; nt[29 * 32 + x] = 0x01; }
      for (let y = 1; y < 29; y++) { nt[y * 32 + 0] = 0x01; nt[y * 32 + 31] = 0x01; }

      // 标题条纹 (行 3-8, 交替使用 tile 0x02 和 0x03)
      for (let y = 3; y <= 8; y++) {
        const tile = (y % 2 === 0) ? 0x02 : 0x03;
        for (let x = 6; x < 26; x++) {
          nt[y * 32 + x] = tile;
        }
      }

      // CAPTAIN TSUBASA 文字占位 (行 5, tile 0x10-0x1F)
      const title = "CAPTAIN TSUBASA";
      for (let i = 0; i < title.length; i++) {
        nt[5 * 32 + 8 + i] = 0x10 + i;
      }

      // 上半部分使用调色板 1
      for (let i = 0; i < 32; i++) attrs[i] = 0x55;
      break;
    }

    case 1: {
      // Page 1: 标题大字下半部分 + 副标题
      for (let y = 9; y <= 11; y++) {
        for (let x = 6; x < 26; x++) {
          nt[y * 32 + x] = (y % 2 === 0) ? 0x02 : 0x03;
        }
      }
      // 副标题 (行 9)
      const subtitle = "FOOTBALL KING";
      for (let i = 0; i < subtitle.length; i++) {
        nt[9 * 32 + 8 + i] = 0x20 + i;
      }

      for (let i = 0; i < 32; i++) attrs[i] = 0x55;
      break;
    }

    case 2: {
      // Page 2: 角色展示区 (行 12-18)
      for (let y = 12; y < 18; y++) {
        for (let x = 5; x < 27; x++) {
          nt[y * 32 + x] = 0x30 + ((y - 12) * 22 + (x - 5)) % 0x80;
        }
      }
      for (let i = 16; i < 40; i++) attrs[i] = 0xAA; // palette 2
      break;
    }

    case 3: {
      // Page 3: PRESS START 提示 (行 22-24)
      const press = ">>> PRESS START <<<";
      for (let i = 0; i < press.length; i++) {
        nt[22 * 32 + 7 + i] = 0x40 + (press.charCodeAt(i) & 0x3F);
      }
      const button = "[BUTTON]";
      for (let i = 0; i < button.length; i++) {
        nt[23 * 32 + 10 + i] = 0x40 + (button.charCodeAt(i) & 0x3F);
      }

      // PRESS START 区域使用调色板 3 (attr bytes 40-55 → tile rows 20-27)
      for (let i = 40; i < 56; i++) attrs[i] = 0xFF;
      break;
    }

    case 4: {
      // Page 4: 版权信息 (行 27) + 装饰
      const copyright = "(C) 1988 TECMO";
      for (let i = 0; i < copyright.length; i++) {
        nt[27 * 32 + 8 + i] = 0x50 + (copyright.charCodeAt(i) & 0x3F);
      }
      for (let i = 56; i < 64; i++) attrs[i] = 0xFF;
      break;
    }
  }

  return { nametable: nt, attrs };
}

/**
 * 菜单画面调色板 - 从 ROM Bank 2 提取 ($B261 area)
 */
const MENU_BG_PALETTE: number[] = [
  0x0F, 0x36, 0x30, 0x21,
  0x36, 0x11, 0x0F, 0x36,
  0x30, 0x21, 0x36, 0x30,
  0x0F, 0x0F, 0x0F, 0x21,
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

  /** 标题页面索引: 对应 ROM 中的 $7A (0-4) */
  private titlePage: number = 0;

  constructor(
    data: DataCache, banks: BankManager, renderer: Renderer,
    oam: OamCache, ppuQueue: PpuQueue, input: InputManager,
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
    this.stepCounter = this.data.read(0x03CC);

    switch (this.subState) {
      case 0: this.subState00_TitleInit1(); break;
      case 1: this.subState01_LoadPage(); break;
      case 2: this.subState02_TitleAnim(); break;
      case 3: this.subState03_Transition(); break;
      case 4: this.subState04_NextPage(); break;
      case 5: this.subState05_MenuInit(); break;
      case 6: this.subState06_MenuLoop(); break;
      default: break;
    }
  }

  init(subStateIndex: number): void {
    this.subState = subStateIndex;
    this.stepCounter = 0;
    this.titlePage = 0;
    this.data.write(0x03CB, subStateIndex);
    this.data.write(0x03CC, 0);
    this.data.zpWrite(0x7A, 0);  // page counter
    this.banks.prgBank0 = 1;
    this.data.mmcBankReg2 = 1;
  }

  // ==========================================
  // 子状态 0: 标题初始化 ($C05B)
  // ==========================================
  private subState00_TitleInit1(): void {
    this.data.zpWrite(0x7A, 0);  // 重置页面索引
    this.titlePage = 0;

    // CHR Bank: chrBank0=$1F (sprite), chrBank1=$1E (background)
    this.banks.chrBank0 = 0x1F;
    this.banks.chrBank1 = 0x1E;
    this.data.mmcBankReg0 = 0x1F;
    this.data.mmcBankReg1 = 0x1E;

    this.data.ppuCtrl = 0x90;
    this.data.ppuMask = 0x0E;
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    this.oam.clear();

    this.data.write(0x03CB, 1);
    this.data.write(0x03CC, 0);
    console.log('[Bank1] Sub-state 0: Title Init - CHR=$1E/$1F page=0');
  }

  // ==========================================
  // 子状态 1: 加载当前页数据 ($C070)
  //   对应 ROM: JSR $C2C2 (load NT) + JSR $C383 (load palette)
  //   按 page index ($7A) 分页加载
  //   RLE 解码器只写入非零 tile, 故页面级数据逐页累积
  // ==========================================
  private subState01_LoadPage(): void {
    this.titlePage = this.data.zpRead(0x7A);
    console.log(`[Bank1] Sub-state 1: Loading page ${this.titlePage}/4`);

    // Step 0: 加载调色板 (只在 page 0 时加载)
    if (this.titlePage === 0) {
      for (let i = 0; i < 16; i++) {
        this.renderer.writeVram(0x3F00 + i, TITLE_BG_PALETTE[i]);
        this.renderer.writeVram(0x3F10 + i, TITLE_SPR_PALETTE[i]);
      }
      console.log('[Bank1] Page 0: Palette loaded');
    }

    // 模拟 RLE 行为: 只写入非零 tile, 保留已有数据
    const diff = buildTitlePage(this.titlePage);

    // 写入名称表 (跳过 tile===0 的字节, 保留上页数据)
    let ntWritten = 0;
    for (let i = 0; i < 960; i++) {
      if (diff.nametable[i] !== 0) {
        this.renderer.writeVram(0x2000 + i, diff.nametable[i]);
        ntWritten++;
      }
    }

    // 写入属性表 (跳过值为0的字节, 合并已有属性)
    let atWritten = 0;
    for (let i = 0; i < 64; i++) {
      if (diff.attrs[i] !== 0) {
        this.renderer.writeVram(0x23C0 + i, diff.attrs[i]);
        atWritten++;
      }
    }

    // 帧间隔计数器 ($79): 控制每页显示的时间
    // 最后一页持久显示，不自动翻页
    const animFrames = this.titlePage < 4 ? 0x40 : 0xFF;
    this.data.zpWrite(0x79, animFrames);

    // $1D: transition flag
    this.data.zpWrite(0x1D, this.titlePage < 4 ? 0x80 : 0x00);

    console.log(`[Bank1] Page ${this.titlePage} NT loaded (${ntWritten} tiles + ${atWritten} attrs), ` +
      `anim timer=$${animFrames.toString(16)}`);
    this.data.write(0x03CB, 2);
    this.data.write(0x03CC, 0);
  }

  // ==========================================
  // 子状态 2: 标题动画/页面显示 ($C0A7)
  //   递减 $79 计数器, 闪烁 PRESS START
  //   page 0-3: 短暂显示后翻页;  page 4: 持久显示
  // ==========================================
  private subState02_TitleAnim(): void {
    // 最后一页 (page 4): 持久显示，不翻页
    if (this.titlePage >= 4) {
      this.doPressStartBlink();
      return;
    }

    // 动画计数器 ($79)
    const timer = this.data.zpRead(0x79);
    if (timer > 0) {
      this.data.zpWrite(0x79, (timer - 1) & 0xFF);
      // 只在有 PRESS START 文字的页闪烁 (page 3)
      if (this.titlePage >= 3) {
        this.doPressStartBlink();
      }
      return;
    }

    // 计数器归零: 设置过渡定时器并前进
    // ROM: $80B6: LDA #$80, STA $79 → 翻页过渡持续 $80 帧
    this.data.zpWrite(0x79, 0x80);
    this.data.write(0x03CB, 3);
    this.data.write(0x03CC, 0);
    console.log(`[Bank1] Page ${this.titlePage} display done → transition`);
  }

  /** PRESS START 闪烁 — 每 30 帧切换可见性
   *  修正: 使用正确的 attribute 区域 40-55 (tile rows 20-27) */
  private doPressStartBlink(): void {
    const timer = this.data.zpRead(0x79);
    const blinkPhase = Math.floor(timer / 30) & 1;

    // PRESS START 文字在 tile rows 22-24
    // attribute bytes 40-47 对应 tile rows 20-23
    // attribute bytes 48-55 对应 tile rows 24-27
    for (let i = 40; i < 56; i++) {
      this.renderer.writeVram(0x23C0 + i, blinkPhase === 0 ? 0xFF : 0x00);
    }
  }

  // ==========================================
  // 子状态 3: 翻页过渡效果 ($C0BE)
  //   对应 ROM: JSR $C3CE (transition routine)
  //   递减 $79 计数器 (由 sub-state 2 设为 $80)
  // ==========================================
  private subState03_Transition(): void {
    const timer = this.data.zpRead(0x79);
    if (timer > 0) {
      this.data.zpWrite(0x79, (timer - 1) & 0xFF);
      return;
    }

    // 过渡计数器归零: 前进到下一页判断
    console.log(`[Bank1] Page ${this.titlePage} transition done → next`);
    this.data.write(0x03CB, 4);
    this.data.write(0x03CC, 0);
  }

  // ==========================================
  // 子状态 4: 翻到下一页 或 进入菜单 ($C0ED)
  //   $7A++: 如果 < 5, 回到 sub1 (加载); 否则 → sub5 (菜单)
  // ==========================================
  private subState04_NextPage(): void {
    this.titlePage = (this.data.zpRead(0x7A) + 1) & 0xFF;
    this.data.zpWrite(0x7A, this.titlePage);

    if (this.titlePage < 5) {
      // 回到子状态 1: 加载下一页
      console.log(`[Bank1] Sub-state 4: Next page → ${this.titlePage}/4`);
      this.data.write(0x03CB, 1);
      this.data.write(0x03CC, 0);
    } else {
      // 5 页全部加载完成: 进入菜单初始化
      console.log('[Bank1] Sub-state 4: All pages loaded → Menu Init');
      this.data.write(0x03CB, 5);
      this.data.write(0x03CC, 0);
    }
  }

  // ==========================================
  // 子状态 5: 菜单初始化 ($C106)
  // ==========================================
  private subState05_MenuInit(): void {
    this.banks.chrBank0 = 0;
    this.banks.chrBank1 = 1;
    this.data.mmcBankReg0 = 0;
    this.data.mmcBankReg1 = 1;

    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }

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
