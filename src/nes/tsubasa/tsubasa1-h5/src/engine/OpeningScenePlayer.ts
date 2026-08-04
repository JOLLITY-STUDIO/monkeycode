/**
 * OpeningScenePlayer — 开场动画播放器 (6 分镜)
 *
 * 对应 ROM Bank 1 的 ram_03CB 子状态 0-7:
 *   Sub 0: 初始化 CHR Bank
 *   Sub 1: 分镜1 — 标题 Logo 淡入 (CHR Bank 00+09)
 *   Sub 2: 分镜2 — 文字展示
 *   Sub 3: 分镜3 — 转场过渡
 *   Sub 4: 分镜4 — 角色特写 (CHR Bank 0D+0E)
 *   Sub 5: 分镜5 — 大空翼立绘 (CHR Bank 0E+0F)
 *   Sub 6: 分镜6 — 动画收尾
 *   Sub 7: 过渡 → 标题画面 (State 01)
 *
 * 每个分镜包含:
 *   - CHR Bank 配置 (背景 + 精灵)
 *   - 文字 Tile 逐帧打印
 *   - 调色板配置
 *   - 持续时间 (帧数)
 *
 * 开场 BGM 由 AudioEngine 在场景初始化时触发。
 */

import type { DataCache } from '../cache/DataCache';
import type { BankManager } from '../cache/BankManager';
import type { Renderer } from '../renderer/Renderer';
import type { OamCache } from '../cache/OamCache';
import type { AudioEngine } from '../audio/AudioEngine';

// ============================================================
// 分镜定义
// ============================================================

/** 单个分镜场景 */
interface OpeningScene {
  /** 分镜编号 (0-6) */
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
  /** 文字 tile 数据 (nametable 偏移 → tile 索引 数组) */
  textTiles?: Array<{ addr: number; tile: number; delay: number }>;
  /** 调色板数据 (32 字节) */
  palette?: number[];
}

/**
 * 6 个开场分镜的 CHR Bank 配置
 *
 * 基于 ROM Bank 1 $8015-$8033 分析:
 *   Sub 0: Bank 5 CHR D (Bank0=0x1F, Bank1=0x1E)
 *   Sub 1: Bank 0 (Title logo) + Bank 9 (Font)
 *   Sub 2: Bank 0 + Bank 9 (等待)
 *   Sub 3: Bank 0/0D (转场)
 *   Sub 4: Bank 0D + Bank 0E (角色特写)
 *   Sub 5: Bank 0E + Bank 0F (立绘)
 *   Sub 6: Bank 00/0D (收尾)
 *
 * CHR Bank 编号说明 (0-31):
 *   0x00 = Bank 00 (标题图形)
 *   0x09 = Bank 09 (日文字体)
 *   0x0D = Bank 0D (角色头像上部)
 *   0x0E = Bank 0E (大空翼立绘)
 *   0x0F = Bank 0F (角色头像下部)
 *   0x1E = Bank 1E (标题背景, Sub 0 使用)
 *   0x1F = Bank 1F (标题精灵, Sub 0 使用)
 */
const OPENING_SCENES: OpeningScene[] = [
  // Sub 1: 分镜1 — 标题 Logo 淡入
  {
    id: 1,
    chrBankBg: 0x00,   // 标题图形
    chrBankSpr: 0x09,  // 字体 tile
    ppuCtrl: 0x90,
    ppuMask: 0x0E,
    duration: 3,       // 快速切换 (原120帧)
  },
  // Sub 2: 分镜2 — 文字展示
  {
    id: 2,
    chrBankBg: 0x00,
    chrBankSpr: 0x09,
    ppuCtrl: 0x90,
    ppuMask: 0x0E,
    duration: 3,
  },
  // Sub 3: 分镜3 — 转场过渡
  {
    id: 3,
    chrBankBg: 0x0D,   // 角色头像
    chrBankSpr: 0x00,
    ppuCtrl: 0x90,
    ppuMask: 0x0E,
    duration: 3,
  },
  // Sub 4: 分镜4 — 角色特写 (翼)
  {
    id: 4,
    chrBankBg: 0x0D,   // 头像上部
    chrBankSpr: 0x0E,  // 翼立绘
    ppuCtrl: 0x90,
    ppuMask: 0x0E,
    duration: 3,
  },
  // Sub 5: 分镜5 — 动画继续
  {
    id: 5,
    chrBankBg: 0x0E,
    chrBankSpr: 0x0F,
    ppuCtrl: 0x90,
    ppuMask: 0x0E,
    duration: 3,
  },
  // Sub 6: 分镜6 — 收尾动画
  {
    id: 6,
    chrBankBg: 0x00,
    chrBankSpr: 0x0D,
    ppuCtrl: 0x90,
    ppuMask: 0x0E,
    duration: 3,
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

  /** 内部子状态 (对应 ROM ram_03CB) */
  private subState: number = 0;
  /** 上一帧的子状态 (用于检测场景切换) */
  private lastSubState: number = -1;
  /** 分镜帧计数器 */
  private frameCounter: number = 0;
  /** 文字打印队列 */
  private textQueue: Array<{ addr: number; tile: number; delay: number }> = [];
  /** 文字队列索引 */
  private textQueueIdx: number = 0;
  /** 文字帧延迟计数器 */
  private textDelay: number = 0;
  /** 是否开始播放 */
  private started: boolean = false;

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

  /** 初始化开场动画 (ROM Sub 0: $C05B) */
  init(): void {
    console.log('[Opening] Scene player initialized');
    this.subState = 0;
    this.frameCounter = 0;
    this.started = false;
    this.data.write(0x03CB, 0);

    // Sub 0: CHR Bank 初始化
    this.applyChrBanks(0x1F, 0x1E);  // CHR Bank 1F (sprite) + 1E (background)

    // PPU 初始化
    this.data.ppuCtrl = 0x90;
    this.data.ppuMask = 0x0E;
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    this.oam.clear();

    // 下一帧进入 Sub 1
    this.subState = 1;
    this.data.write(0x03CB, 1);
    this.started = true;
    console.log('[Opening] → Sub 1: Opening animation starting');
  }

  /** 每帧更新 */
  update(): boolean {
    if (!this.started) return false;

    this.lastSubState = this.subState;
    this.subState = this.data.read(0x03CB);

    // 子状态变化时重置帧计数器
    if (this.subState !== this.lastSubState) {
      this.frameCounter = 0;
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

  /** Sub 0: 初始化 (首帧) */
  private updateSub0(): boolean {
    this.data.write(0x03CB, 1);
    return false;
  }

  /** Sub 1: 分镜1 — 标题淡入 */
  private updateSub1(): boolean {
    const scene = OPENING_SCENES[0];
    if (!this.processScene(scene, 2)) return false;

    console.log('[Opening] Scene 1 complete → Scene 2');
    return false;
  }

  /** Sub 2: 分镜2 — 文字展示 */
  private updateSub2(): boolean {
    const scene = OPENING_SCENES[1];
    if (!this.processScene(scene, 3)) return false;

    console.log('[Opening] Scene 2 complete → Scene 3 (transition)');
    return false;
  }

  /** Sub 3: 分镜3 — 转场过渡 */
  private updateSub3(): boolean {
    const scene = OPENING_SCENES[2];
    if (!this.processScene(scene, 4)) return false;

    console.log('[Opening] Scene 3 complete → Scene 4 (character closeup)');
    return false;
  }

  /** Sub 4: 分镜4 — 角色特写 */
  private updateSub4(): boolean {
    const scene = OPENING_SCENES[3];
    if (!this.processScene(scene, 5)) return false;

    console.log('[Opening] Scene 4 complete → Scene 5');
    return false;
  }

  /** Sub 5: 分镜5 — 动画继续 */
  private updateSub5(): boolean {
    const scene = OPENING_SCENES[4];
    if (!this.processScene(scene, 6)) return false;

    console.log('[Opening] Scene 5 complete → Scene 6 (ending)');
    return false;
  }

  /** Sub 6: 分镜6 — 收尾 */
  private updateSub6(): boolean {
    const scene = OPENING_SCENES[5];
    if (!this.processScene(scene, 7)) return false;

    console.log('[Opening] Scene 6 complete → Transition to title');
    return false;
  }

  /** Sub 7: 过渡到标题画面 */
  private updateSub7(): boolean {
    // 开场动画完成，返回 true 通知调用方切换到 State 01
    console.log('[Opening] All scenes complete → Title Screen');
    return true;
  }

  /**
   * 处理单个分镜场景
   * 首帧: 切换 CHR Bank + 更新调色板
   * 后续帧: 文字逐帧打印
   * 末尾帧: 切换到下一个 sub state
   *
   * @returns true 如果场景结束需要前进
   */
  private processScene(scene: OpeningScene, nextSub: number): boolean {
    // 检测场景切换 (子状态变化)
    const isFirstFrame = (this.subState !== this.lastSubState);
    const elapsed = this.frameCounter;

    // 首帧: 应用场景配置
    if (isFirstFrame) {
      this.applyScene(scene);
    }

    // 文字逐帧打印
    if (scene.textTiles) {
      this.processTextPrint();
    }

    // 帧计数到达持续时间 → 前进
    if (scene.duration > 0 && elapsed >= scene.duration) {
      this.data.write(0x03CB, nextSub);
      this.frameCounter = 0;
      return true;
    }

    return false;
  }

  /** 应用场景配置 (CHR Bank + PPU + 调色板) */
  private applyScene(scene: OpeningScene): void {
    this.applyChrBanks(scene.chrBankSpr, scene.chrBankBg);
    this.data.ppuCtrl = scene.ppuCtrl;
    this.data.ppuMask = scene.ppuMask;

    if (scene.palette) {
      for (let i = 0; i < 32; i++) {
        this.renderer.writeVram(0x3F00 + i, scene.palette[i]);
      }
    }

    // 加载文字打印队列
    if (scene.textTiles) {
      this.textQueue = [...scene.textTiles];
      this.textQueueIdx = 0;
      this.textDelay = 0;
    }
  }

  /** 文字逐帧打印 */
  private processTextPrint(): void {
    if (this.textQueueIdx >= this.textQueue.length) return;

    this.textDelay++;
    const item = this.textQueue[this.textQueueIdx];

    if (this.textDelay >= item.delay) {
      this.renderer.writeVram(item.addr, item.tile);
      this.textQueueIdx++;
      this.textDelay = 0;
    }
  }

  /** 切换 CHR Bank */
  private applyChrBanks(bankSpr: number, bankBg: number): void {
    this.banks.chrBank0 = bankSpr & 0x1F;  // 精灵 Bank ($0000-$0FFF)
    this.banks.chrBank1 = bankBg & 0x1F;   // 背景 Bank ($1000-$1FFF)
    this.data.mmcBankReg0 = bankSpr & 0x1F;
    this.data.mmcBankReg1 = bankBg & 0x1F;
  }

  get isActive(): boolean { return this.started; }
  get currentSubState(): number { return this.subState; }
}
