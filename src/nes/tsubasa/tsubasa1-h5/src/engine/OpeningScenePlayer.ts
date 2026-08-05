/**
 * OpeningScenePlayer — 开场动画播放器
 *
 * ============================================================
 * 对应 ROM Bank 1 的 $804B-$8105 子状态调度器:
 *
 * 子状态跳转表 ($804B):
 *   [0] $C05B - 初始化 (设置 CHR Bank 1E/1F, 清空 ram_007A)
 *   [1] $C070 - 加载当前页数据 (RLE解码 $C2C2 + 调色板 $C36C + PPU设置)
 *   [2] $C0A7 - 等待计时器 + PPU 传输 (ram_0079 从 $20 倒数)
 *   [3] $C0BE - 调色板动画 + 页面过渡 (ram_0079 从 $80 倒数)
 *   [4] $C0ED - 翻页判断 (ram_0079 从 $40 倒数, ram_007A++,
 *                         <5→回 Sub1, =5→Sub5)
 *   [5] $C106 - 额外场景 5 (CHR Bank 切换)
 *   [6] $C181 - 额外场景 6 (CHR Bank 切换)
 *   [7] $C213 - 过渡到标题画面
 *
 * ROM 4 页循环 (ram_007A: 0→4):
 *   Page 0→Sub1(load)→Sub2(wait 32f)→Sub3(anim 128f)→Sub4(wait 64f)→page++
 *   → Page 1→Sub1→Sub2→Sub3→Sub4→page++
 *   → Page 2→Sub1→Sub2→Sub3→Sub4→page++
 *   → Page 3→Sub1→Sub2→Sub3→Sub4→page++
 *   → Page 4→Sub5→Sub6→Sub7(exit)
 *
 * 计时器参考 (ROM Bank 1):
 *   Sub 2 ($80A7): ram_0079 = $20 → 32 帧等待
 *   Sub 3 ($80BE): ram_0079 = $80 → 128 帧等待 + palette 渐变动画
 *   Sub 4 ($80ED): ram_0079 = $40 → 64 帧等待
 *   每页总时长: Sub1(~1f) + Sub2(32f) + Sub3(128f) + Sub4(64f) ≈ 225 帧
 *
 * 开场 BGM 由 AudioEngine 在场景初始化时触发。
 *
 * @see _tmp_disasm_out/banks/bank_01_code.asm $804B-$8105
 * @see BUG-028: nametable 数据从 ROM 提取 (Phase B 待完成)
 * ============================================================
 */

import type { DataCache } from '../cache/DataCache';
import type { BankManager } from '../cache/BankManager';
import type { Renderer } from '../renderer/Renderer';
import type { OamCache } from '../cache/OamCache';
import type { AudioEngine } from '../audio/AudioEngine';
import { OPENING_PAGES as ROM_OPENING_DATA } from '../data/OpeningRleData';

// ============================================================
// 分镜定义
// ============================================================

/** 单个分镜场景 */
interface OpeningScene {
  /** 分镜编号 */
  id: number;
  /** 背景 CHR Bank (MMC1 $A000 寄存器) */
  chrBankBg: number;
  /** 精灵 CHR Bank (MMC1 $C000 寄存器) */
  chrBankSpr: number;
  /** PPU 控制寄存器值 */
  ppuCtrl: number;
  /** PPU 遮罩寄存器值 */
  ppuMask: number;
  /** 持续时间 (帧数, 0=持久不退出) */
  duration: number;
  /** 调色板数据 (16 字节 BG + 16 字节 Spr, 共 32 字节) */
  palette?: number[];
}

/**
 * CHR Bank 编号说明 (0-31):
 *   0x00 = Bank 00 (标题图形)
 *   0x09 = Bank 09 (日文字体)
 *   0x0D = Bank 0D (角色头像上部)
 *   0x0E = Bank 0E (大空翼立绘)
 *   0x0F = Bank 0F (角色头像下部)
 *   0x1E = Bank 1E (标题背景, Sub 0 使用)
 *   0x1F = Bank 1F (标题精灵, Sub 0 使用)
 */

/**
 * 默认开场动画调色板
 * 来自 ROM Bank 2 $B24F 区域 (标题画面调色板)
 *
 * BG 子调色板 (16 字节):
 *   0: 0F 33 0F 1A  黑色背景, 灰紫色, 黑色, 绿色
 *   1: 30 36 0F 30  纯白, 肉色, 黑色, 纯白
 *   2: 0F 25 0F 0F  黑色, 粉紫色, 黑色, 黑色
 *   3: 0F 36 30 21  黑色, 肉色, 纯白, 蓝色
 *
 * Spr 子调色板 (16 字节):
 *   0: 0F 0F 16 26  红
 *   1: 0F 12 22 32  蓝
 *   2: 0F 19 29 39  绿
 *   3: 0F 0F 0F 0F  未使用
 */
const OPENING_PALETTE: number[] = [
  // BG
  0x0F, 0x33, 0x0F, 0x1A,  // BG 0
  0x30, 0x36, 0x0F, 0x30,  // BG 1
  0x0F, 0x25, 0x0F, 0x0F,  // BG 2
  0x0F, 0x36, 0x30, 0x21,  // BG 3
  // Spr
  0x0F, 0x0F, 0x16, 0x26,  // Spr 0
  0x0F, 0x12, 0x22, 0x32,  // Spr 1
  0x0F, 0x19, 0x29, 0x39,  // Spr 2
  0x0F, 0x0F, 0x0F, 0x0F,  // Spr 3
];

/**
 * Sub 5-6 额外场景用 CHR Bank 配置
 * 这些场景在 4 页循环完成后播放
 */
const POST_PAGE_SCENES: OpeningScene[] = [
  // Sub 5: 大空翼立绘 (CHR Bank 0E+0F)
  {
    id: 5,
    chrBankBg: 0x0E,
    chrBankSpr: 0x0F,
    ppuCtrl: 0x90,
    ppuMask: 0x0E,
    duration: 90,
  },
  // Sub 6: 收尾动画 (CHR Bank 00+0D)
  {
    id: 6,
    chrBankBg: 0x00,
    chrBankSpr: 0x0D,
    ppuCtrl: 0x90,
    ppuMask: 0x0E,
    duration: 60,
  },
];

// ============================================================
// 页面定义 — 4 页循环 nametable 数据
// ============================================================

/**
 * 4 页开场动画数据
 *
 * 每页对应 ROM ram_007A 索引 0-3, 第 4 次循环后进入 Sub 5
 *
 * Phase B (ROM 数据提取) 完成后, 此数据将被替换为从
 * Bank 7 $D0F3 指针表提取的真实 RLE 解码 nametable 数据。
 *
 * 当前使用测试模式: 每页填充 CHR bank 中的 tile 作为预览。
 */
interface OpeningPage {
  /** 页面编号 (0-3) */
  id: number;
  /** 该页使用的背景 CHR Bank */
  chrBankBg: number;
  /** 该页使用的精灵 CHR Bank */
  chrBankSpr: number;
  /** 该页持续时间 (帧数, ROM: Sub1+Sub2+Sub3+Sub4 ≈ 225 帧) */
  duration: number;
  /** 调色板渐变延迟帧数 (Sub 3 中每步 $10 帧) */
  paletteDelayFrames: number;
}

const OPENING_PAGES: OpeningPage[] = [
  // Page 0: 标题 Logo + 字幕文字 (CHR Bank 00+09)
  // ROM $D05E[0] → $D068 RLE 数据
  {
    id: 0,
    chrBankBg: 0x00,
    chrBankSpr: 0x09,
    duration: 225,
    paletteDelayFrames: 32,
  },
  // Page 1: 字幕继续 (CHR Bank 00+09)
  // ROM $D05E[1] → $D07F RLE 数据
  {
    id: 1,
    chrBankBg: 0x00,
    chrBankSpr: 0x09,
    duration: 225,
    paletteDelayFrames: 32,
  },
  // Page 2: 转场/角色 (CHR Bank 0D+00)
  // ROM $D05E[2] → $D093 RLE 数据
  {
    id: 2,
    chrBankBg: 0x0D,
    chrBankSpr: 0x00,
    duration: 225,
    paletteDelayFrames: 32,
  },
  // Page 3: 角色特写 (CHR Bank 0D+0E)
  // ROM $D05E[3] → $D0A5 RLE 数据
  {
    id: 3,
    chrBankBg: 0x0D,
    chrBankSpr: 0x0E,
    duration: 225,
    paletteDelayFrames: 32,
  },
];

// ============================================================
// OpeningScenePlayer
// ============================================================

export class OpeningScenePlayer {
  private data: DataCache;
  private banks: BankManager;
  private renderer: Renderer;
  private oam: OamCache;
  private audio: AudioEngine | null;

  /** 内部子状态 (对应 ROM ram_03CB): 0=init, 1-4=页面循环, 5-6=额外场景, 7=exit */
  private subState: number = 0;
  /** 上一帧的子状态 (用于检测场景切换) */
  private lastSubState: number = -1;
  /** 分镜帧计数器 */
  private frameCounter: number = 0;
  /** 页面索引 (对应 ROM ram_007A): 0-3 = 4 页循环, 4=循环结束 */
  private pageIndex: number = 0;
  /** 子状态内的等待计时器 (对应 ROM ram_0079) */
  private waitTimer: number = 0;
  /** 子状态阶段 (Sub 3 的 palette 动画步骤 0-4) */
  private subPhase: number = 0;
  /** 是否开始播放 */
  private started: boolean = false;
  /** 是否所有分镜已完成 */
  private completed: boolean = false;
  /** 调色板是否已设置 */
  private paletteLoaded: boolean = false;
  /** 额外场景索引 */
  private postSceneIndex: number = 0;

  constructor(
    data: DataCache, banks: BankManager, renderer: Renderer,
    oam: OamCache, audio: AudioEngine | null,
  ) {
    this.data = data;
    this.banks = banks;
    this.renderer = renderer;
    this.oam = oam;
    this.audio = audio;
  }

  // ============================================================
  // 公共接口
  // ============================================================

  /** 初始化开场动画 (ROM Sub 0: $805B) */
  init(): void {
    console.log('[Opening] Player initialized — 4-page cycle + post scenes');
    this.subState = 0;
    this.frameCounter = 0;
    this.pageIndex = 0;
    this.waitTimer = 0;
    this.subPhase = 0;
    this.started = false;
    this.completed = false;
    this.paletteLoaded = false;
    this.postSceneIndex = 0;
    this.data.write(0x03CB, 0);
    this.data.zpWrite(0x7A, 0);  // ram_007A = 0

    // Sub 0: CHR Bank 初始化 (对应 ROM $805F-$8069)
    this.applyChrBanks(0x1F, 0x1E);  // CHR Bank 1F (sprite) + 1E (background)

    // PPU 初始化
    this.data.ppuCtrl = 0x90;
    this.data.ppuMask = 0x0E;
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    this.oam.clear();
    this.clearNametable();

    // 设置默认调色板
    this.loadOpeningPalette();

    // 下一帧进入 Sub 1
    this.subState = 1;
    this.data.write(0x03CB, 1);
    this.started = true;
    console.log('[Opening] → Sub 1: Page 0 loading');
  }

  /** 每帧更新, 返回 true 表示开场动画完成 */
  update(): boolean {
    if (!this.started) return false;

    this.lastSubState = this.subState;
    this.subState = this.data.read(0x03CB);

    // 子状态变化时重置帧计数器
    if (this.subState !== this.lastSubState) {
      this.frameCounter = 0;
      this.waitTimer = 0;
      this.subPhase = 0;
    } else {
      this.frameCounter++;
    }

    switch (this.subState) {
      case 0: return this.updateSub0();
      case 1: return this.updateSub1();
      case 2: return this.updateSub2();
      case 3: return this.updateSub3();
      case 4: return this.updateSub4();
      case 5: return this.updateSub5();
      case 6: return this.updateSub6();
      case 7: return this.updateSub7();
      default: return false;
    }
  }

  // ============================================================
  // Sub 0: 初始化 (首帧)
  // ============================================================

  private updateSub0(): boolean {
    this.data.write(0x03CB, 1);
    return false;
  }

  // ============================================================
  // Sub 1: 加载当前页面数据 (ROM $8070-$80A6)
  //
  // ROM 行为:
  //   JSR $8014 / JSR $801D — PPU 控制设置
  //   LDA ram_007A → JSR $C2C2 — RLE 解码当前页 nametable
  //   JSR $C36C — 加载调色板
  //   JSR $8014 / JSR $803B — PPU 传输设置
  //   循环 palette 动画: ram_0079 += $10, JSR $C383 直到 $40
  //   ram_0079 = $20 (Sub 2 计时器)
  //   ram_001D = $80 (PPU 传输标志)
  //   INC ram_03CB → Sub 2
  // ============================================================

  private updateSub1(): boolean {
    const isFirstFrame = (this.subState !== this.lastSubState);

    if (isFirstFrame) {
      const page = this.pageIndex;
      const pageData = OPENING_PAGES[page];
      console.log(`[Opening] Sub 1: Loading page ${page}/3 → CHR BG=${pageData.chrBankBg.toString(16)} SPR=${pageData.chrBankSpr.toString(16)}`);

      // 切换 CHR Bank
      this.applyChrBanks(pageData.chrBankSpr, pageData.chrBankBg);

      // Phase B 占位: 这里应该调用 ROM RLE 解码器加载真实 nametable
      // 当前写入测试填充以便画面可见
      this.fillNametableForPage(page);

      // 调色板已在 init() 中设置

      // Sub 1 内联 palette 动画 (ROM: 循环 ram_0079 += $10 到 $40)
      // 我们的实现: Sub 1 持续 1 帧, palette 动画在 Sub 3 中处理
      this.data.zpWrite(0x1D, 0x80); // ram_001D = $80, PPU 传输标志
      this.data.zpWrite(0x1E, page); // ram_001E = page (保存页面索引)
    }

    // Sub 1 单帧完成 → Sub 2
    this.data.write(0x03CB, 2);
    return false;
  }

  // ============================================================
  // Sub 2: 等待计时器 + PPU 传输 (ROM $80A7-$80BD)
  //
  // ROM 行为:
  //   DEC ram_0079, 不为零 → 等待
  //   为零时:
  //     LDA ram_001D, 非零 → JSR $C3CE (PPU 传输) → 继续等待
  //     为零 → ram_0079 = $80, INC ram_03CB → Sub 3
  // ============================================================

  private updateSub2(): boolean {
    // ROM: ram_0079 从 $20 (32帧) 开始倒数
    const SUB2_WAIT_FRAMES = 32;

    if (this.waitTimer < SUB2_WAIT_FRAMES) {
      this.waitTimer++;
      return false;
    }

    // 等待完成 → 设置 Sub 3 计时器 $80 (128帧) → Sub 3
    console.log(`[Opening] Sub 2 complete (waited ${this.waitTimer}f) → Sub 3 palette anim`);
    this.data.write(0x03CB, 3);
    return false;
  }

  // ============================================================
  // Sub 3: 调色板动画 + 过渡 (ROM $80BE-$80EC)
  //
  // ROM 行为:
  //   DEC ram_0079, 不为零 → 等待
  //   为零时:
  //     ram_007B = (ram_007A == 4) ? 1 : 0
  //     循环: ram_0079 = $20, JSR $C383, ram_0079 -= $10, BPL 循环
  //     JSR $C36C (重新加载调色板)
  //     JSR $803B (PPU 设置)
  //     ram_0079 = $40, INC ram_03CB → Sub 4
  // ============================================================

  private updateSub3(): boolean {
    // ROM: ram_0079 从 $80 (128帧) 开始倒数
    const SUB3_WAIT_FRAMES = 128;

    // Palette 渐变动画: Sub 3 的第二阶段 (ROM: 循环 ram_0079=$20→0 共 2 步)
    if (this.waitTimer >= SUB3_WAIT_FRAMES) {
      // Palette 渐变动画阶段
      const PALETTE_ANIM_STEPS = 3; // ROM: ram_0079 $20→$10→$00 (3 步)
      const PALETTE_ANIM_DELAY = 16; // 每步 $10 帧

      this.subPhase++;
      if (this.subPhase <= PALETTE_ANIM_STEPS) {
        // 调色板渐变步骤: 每步轻微调整调色板亮度
        this.doPaletteAnimStep(this.subPhase, PALETTE_ANIM_STEPS);
        this.waitTimer = SUB3_WAIT_FRAMES + this.subPhase * PALETTE_ANIM_DELAY;
        return false;
      }

      // 动画完成 → PPU 设置 + Sub 4 计时器 $40 (64帧) → Sub 4
      console.log(`[Opening] Sub 3 complete → Sub 4 (page advance check)`);
      this.data.write(0x03CB, 4);
      return false;
    }

    this.waitTimer++;
    return false;
  }

  // ============================================================
  // Sub 4: 翻页判断 (ROM $80ED-$8105)
  //
  // ROM 行为:
  //   DEC ram_0079, 不为零 → 等待
  //   为零时:
  //     INC ram_007A (pageIndex++)
  //     CMP #$05:
  //       不等 → LDA #$01, STA ram_03CB → 回 Sub 1 (下一页)
  //       相等 → INC ram_03CB → Sub 5 (4页完成)
  // ============================================================

  private updateSub4(): boolean {
    // ROM: ram_0079 从 $40 (64帧) 开始倒数
    const SUB4_WAIT_FRAMES = 64;

    if (this.waitTimer < SUB4_WAIT_FRAMES) {
      this.waitTimer++;
      return false;
    }

    // 翻页
    this.pageIndex++;
    this.data.zpWrite(0x7A, this.pageIndex);

    if (this.pageIndex < 4) {
      // 回 Sub 1: 加载下一页
      console.log(`[Opening] Sub 4: → Page ${this.pageIndex}/3`);
      this.data.write(0x03CB, 1);
    } else {
      // 4 页全部完成 → 进入额外场景 Sub 5
      console.log('[Opening] Sub 4: All 4 pages done → Sub 5 (post scenes)');
      this.data.write(0x03CB, 5);
    }
    return false;
  }

  // ============================================================
  // Sub 5: 额外场景 5 — 大空翼立绘 (ROM $8106+)
  // ============================================================

  private updateSub5(): boolean {
    const scene = POST_PAGE_SCENES[0]; // CHR Bank 0E+0F
    if (this.subState !== this.lastSubState) {
      console.log('[Opening] Sub 5: Post scene — Tsubasa portrait');
      this.applyScene(scene);
      this.fillNametableForPostScene(0);
    }

    if (this.frameCounter >= scene.duration) {
      console.log('[Opening] Sub 5 complete → Sub 6');
      this.data.write(0x03CB, 6);
      return false;
    }
    return false;
  }

  // ============================================================
  // Sub 6: 额外场景 6 — 收尾 (ROM $C181+)
  // ============================================================

  private updateSub6(): boolean {
    const scene = POST_PAGE_SCENES[1]; // CHR Bank 00+0D
    if (this.subState !== this.lastSubState) {
      console.log('[Opening] Sub 6: Post scene — ending');
      this.applyScene(scene);
      this.fillNametableForPostScene(1);
    }

    if (this.frameCounter >= scene.duration) {
      console.log('[Opening] Sub 6 complete → Sub 7 (exit)');
      this.data.write(0x03CB, 7);
      return false;
    }
    return false;
  }

  // ============================================================
  // Sub 7: 过渡到标题画面
  // ============================================================

  private updateSub7(): boolean {
    this.completed = true;
    console.log('[Opening] All scenes complete → Title Screen');
    return true;
  }

  // ============================================================
  // 场景辅助方法
  // ============================================================

  /** 应用额外场景配置 */
  private applyScene(scene: OpeningScene): void {
    this.applyChrBanks(scene.chrBankSpr, scene.chrBankBg);
    this.data.ppuCtrl = scene.ppuCtrl;
    this.data.ppuMask = scene.ppuMask;

    if (scene.palette) {
      for (let i = 0; i < 32; i++) {
        this.renderer.writeVram(0x3F00 + i, scene.palette[i]);
      }
    }
  }

  /** 加载默认调色板 */
  private loadOpeningPalette(): void {
    if (this.paletteLoaded) return;
    for (let i = 0; i < 32; i++) {
      this.renderer.writeVram(0x3F00 + i, OPENING_PALETTE[i]);
    }
    this.paletteLoaded = true;
    console.log('[Opening] Default palette loaded (32 bytes)');
  }

  /** Palette 动画步骤 (模拟 ROM $C383 + $C36C 调色板渐变) */
  private doPaletteAnimStep(step: number, totalSteps: number): void {
    // 简单的亮度调整: 在 BG Palette 1 (索引 4-7) 上做渐变
    // ROM 实际行为更复杂, Phase B 完成后替换
    const brightnessOffset = Math.floor((step / totalSteps) * 0x10);
    const basePalette = [...OPENING_PALETTE];

    // 调整 BG 1 的亮度
    for (let i = 4; i < 8; i++) {
      const val = basePalette[i];
      if (val < 0x0D) continue; // 跳过黑色
      const newVal = Math.min(0x3F, val + brightnessOffset);
      this.renderer.writeVram(0x3F00 + i, newVal);
    }
  }

  // ============================================================
  // Nametable 填充 — 使用 ROM 真实 RLE 数据 (Phase B 完成)
  //
  // 数据来源: ROM Bank 2 $D05E 指针表 → RLE 解码 nametable
  // 存储在 OpeningRleData.ts 的 OPENING_PAGES 数组中
  // ============================================================

  /** 清空名称表 */
  private clearNametable(): void {
    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }
    for (let i = 0; i < 64; i++) {
      this.renderer.writeVram(0x23C0 + i, 0x00);
    }
  }

  /**
   * 为页面填充 ROM 真实 RLE nametable 数据
   *
   * 使用从 ROM Bank 2 $D05E 指针表提取并 RLE 解码的真实数据。
   * 每页 ~800-890 个非零 tile, 构成完整的开场动画画面。
   */
  private fillNametableForPage(page: number): void {
    // 先清空
    this.clearNametable();

    // 从 ROM 提取的真实数据
    if (page < ROM_OPENING_DATA.length) {
      const pageData = ROM_OPENING_DATA[page];
      const tiles = pageData.tiles;
      let nonZero = 0;

      // ROM RLE 解码器写入 VRAM 起始地址 = $20A8 (offset 0xA8)
      // Python 解码的 tiles[] 从第一个 RLE 字节开始, tiles[0] → VRAM $20A8
      // 写入时需映射: tiles[i] → VRAM $2000 + (i + 0xA8) % 960
      const NT_OFFSET = 0xA8;
      for (let i = 0; i < tiles.length && i < 960; i++) {
        const vramOffset = (i + NT_OFFSET) % 960;
        this.renderer.writeVram(0x2000 + vramOffset, tiles[i]);
        if (tiles[i] !== 0) nonZero++;
      }

      console.log(`[Opening] Page ${page}: ${nonZero}/${tiles.length} tiles from ROM RLE data (VRAM offset=$20A8)`);
    } else {
      // 回退: 没有数据时填充中央区域
      console.warn(`[Opening] Page ${page}: No ROM data, using fallback`);
      this.fillCenterBlockFallback(page);
    }
  }

  /** 为额外场景填充 nametable (使用 ROM 数据作为基础) */
  private fillNametableForPostScene(sceneIdx: number): void {
    this.clearNametable();
    // 额外场景使用 CHR Bank 0E/0F (立绘), 没有对应的 RLE 数据
    // 清空 nametable 后由精灵层渲染角色立绘
    console.log(`[Opening] Post scene ${sceneIdx}: nametable cleared (sprite-based)`);
  }

  /**
   * 回退填充: 在屏幕中央填充 CHR bank tiles (仅在没有 ROM 数据时使用)
   */
  private fillCenterBlockFallback(page: number): void {
    const tileBase = page * 32;
    const NT_WIDTH = 32;
    for (let r = 4; r < 14; r++) {
      for (let c = 6; c < 16; c++) {
        const tile = tileBase + (r * 10 + c) % 128;
        this.renderer.writeVram(0x2000 + r * NT_WIDTH + c, tile);
      }
    }
  }

  // ============================================================
  // 底层工具
  // ============================================================

  /** 切换 CHR Bank */
  private applyChrBanks(bankSpr: number, bankBg: number): void {
    this.banks.chrBank0 = bankSpr & 0x1F;  // 精灵 Bank ($0000-$0FFF)
    this.banks.chrBank1 = bankBg & 0x1F;   // 背景 Bank ($1000-$1FFF)
    this.data.mmcBankReg0 = bankSpr & 0x1F;
    this.data.mmcBankReg1 = bankBg & 0x1F;
  }

  // ============================================================
  // 属性访问器
  // ============================================================

  get isActive(): boolean { return this.started && !this.completed; }
  get currentSubState(): number { return this.subState; }
  get currentPage(): number { return this.pageIndex; }
}
