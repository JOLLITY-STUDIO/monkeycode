/**
 * 开场动画场景 — ROM 搬運版
 *
 * 模拟 ROM 任务链:
 *   0xC92C → VDP初始化 + 加载字体(0x8001)
 *   0xC93A → 标题画面设置 + 调色板 + 音乐
 *   0xC9A0 → 多阶段动画播放 → 0xCC4E → 0xD4AE
 *
 * 动画阶段:
 *   Stage IDLE    (0): 等待 VDP ready
 *   Stage FADE_IN (1): CRAM 渐入 (全黑→正常色调)
 *   Stage FRAME_0 (2): 显示帧0 (LOGO动画-2), ~2s
 *   Stage FRAME_1 (3): 显示帧1 (LOGO动画-SOMETIMES), ~2s
 *   Stage FRAME_2 (4): 显示帧2 (标题画面稳定), ~3s
 *   Stage DONE     (5): 动画完成 → 回调 onComplete
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { invalidateTileCache } from '../hw/vdp/plane.js';
import { invalidateSpriteTileCache } from '../hw/vdp/sprite.js';
import {
  OPENING_FRAME_COUNT,
  OPENING_CRAM,
  OPENING_DISPLAY_WIDTH,
  OPENING_DISPLAY_HEIGHT,
  OPENING_PLANE_A_BASE,
  OPENING_SPRITE_BASE,
  OPENING_VDP_CONFIG,
  OpeningAnimationData,
  type OpeningFrame,
} from '../data/OpeningAnimationData.js';

// ============================================================
// 常量
// ============================================================

/** ROM 参考: 默认帧同步延迟 ~16ms (60fps) */
const ROM_VSYNC_MS = 16;

/** 各阶段持续时间 (ms), 模拟 ROM 的 MOVE.L #wait, d0 → JMP 0x0085EE */
const STAGE_SCHEDULE = [
  { frameIdx: 0, durationMs: 2000, label: 'LOGO 动画-1' },
  { frameIdx: 1, durationMs: 2000, label: 'LOGO 动画-2' },
  { frameIdx: 2, durationMs: 999999, label: '标题画面 (等待跳过)' },
];

/** 调色板渐入帧数 (全黑→目标 CRAM) */
const CRAM_FADE_FRAMES = 15;

/** 每帧渐变步长 */
const CRAM_FADE_INTERVAL_MS = 33; // ~30fps 渐变

// ============================================================
// OpeningAnimation 场景
// ============================================================

export class OpeningAnimation implements Scene {
  readonly name = 'OpeningAnimation';

  private vdp: VDP;

  /** 动画阶段 */
  private _stage: 'IDLE' | 'FADE_IN' | 'FRAME' | 'DONE' = 'IDLE';
  /** 当前帧在STAGE_SCHEDULE中的索引 */
  private _stageIndex: number = 0;
  /** 阶段内累计时间 (ms) */
  private _stageElapsed: number = 0;
  /** 渐变动画计数器 */
  private _fadeStep: number = 0;
  private _fadeElapsed: number = 0;

  /** 动画完成回调 */
  private _onComplete?: () => void;
  /** 是否已完成 */
  private _finished: boolean = false;
  /** 当前显示的帧索引 */
  private _currentFrameIdx: number = -1;
  /** 是否已经开始播放 (VDP 初始化后) */
  private _started: boolean = false;
  /** 过渡中: 当前CRAM渐变色 */
  private _fadeCram: Uint8Array | null = null;

  constructor(
    vdp: VDP,
    options: {
      onComplete?: () => void;
    } = {},
  ) {
    this.vdp = vdp;
    this._onComplete = options.onComplete;
  }

  // ============================================================
  // 生命周期
  // ============================================================

  init(): void {
    // ROM Stage 0xC92C: VDP 初始化
    this.configureVDPRegisters();
    this.loadCRAM();
    this._stage = 'FADE_IN';
    this._fadeStep = 0;
    this._fadeElapsed = 0;
    this._fadeCram = new Uint8Array(128).fill(0); // 全黑CRAM
    this._started = true;
    this.vdp.displayEnabled = true;
    console.log(`[OpeningAnimation] ROM 任务链启动 — ${OPENING_FRAME_COUNT} 帧动画, CRAM渐入 ${CRAM_FADE_FRAMES} 帧`);
  }

  update(dt: number = ROM_VSYNC_MS): void {
    if (this._finished || !this._started) return;

    switch (this._stage) {
      case 'FADE_IN':
        this._updateFadeIn(dt);
        break;
      case 'FRAME':
        this._updateFrameStage(dt);
        break;
      case 'DONE':
        break;
    }
  }

  destroy(): void {
    this._onComplete = undefined;
    this._fadeCram = null;
  }

  // ============================================================
  // 阶段处理
  // ============================================================

  /** Stage FADE_IN: CRAM 从全黑渐入到目标调色板 */
  private _updateFadeIn(dt: number): void {
    this._fadeElapsed += dt;

    while (this._fadeElapsed >= CRAM_FADE_INTERVAL_MS && this._fadeStep < CRAM_FADE_FRAMES) {
      this._fadeElapsed -= CRAM_FADE_INTERVAL_MS;
      this._fadeStep++;

      // 线性插值 CRAM
      const t = this._fadeStep / CRAM_FADE_FRAMES;
      for (let i = 0; i < 128; i++) {
        const target = OPENING_CRAM[i];
        const current = this._fadeCram![i];
        if (current !== target) {
          // Genesis CRAM 是 little-endian 16-bit 颜色对:
          // even byte 和 odd byte 组成一个颜色, 需成对更新
          if (i % 2 === 0) {
            const targetWord = target | (OPENING_CRAM[i + 1] << 8);
            const currentWord = current | (this._fadeCram![i + 1] << 8);
            const newWord = Math.round(currentWord + (targetWord - currentWord) * t);
            this._fadeCram![i] = newWord & 0xFF;
            this._fadeCram![i + 1] = (newWord >> 8) & 0xFF;
          }
        }
      }

      // 写入 VDP CRAM
      for (let i = 0; i < 128; i++) {
        this.vdp.cram[i] = this._fadeCram![i];
      }
    }

    // 渐入完成: 加载第一帧 → 进入 FRAME 阶段
    if (this._fadeStep >= CRAM_FADE_FRAMES) {
      this._fadeCram = null;
      this._loadTargetCRAM();
      this._stageIndex = 0;
      this._stageElapsed = 0;
      this._loadFrameSchedule(0);
      this._stage = 'FRAME';
      console.log('[OpeningAnimation] CRAM 渐入完成 → FRAME 阶段');
    } else if (this._fadeStep === 0) {
      // 第一帧: 用全黑CRAM + 帧0数据加载
      this._loadFrameSchedule(0);
    }
  }

  /** Stage FRAME: 按时间表切换帧 */
  private _updateFrameStage(dt: number): void {
    this._stageElapsed += dt;
    const schedule = STAGE_SCHEDULE[this._stageIndex];
    if (!schedule) {
      this._finish();
      return;
    }

    // 检查是否需要切换到下一帧
    if (this._stageElapsed >= schedule.durationMs) {
      this._stageIndex++;
      this._stageElapsed = 0;

      if (this._stageIndex >= STAGE_SCHEDULE.length) {
        this._finish();
        return;
      }
      this._loadFrameSchedule(this._stageIndex);
    }
  }

  /** 完成动画 */
  private _finish(): void {
    this._stage = 'DONE';
    this._finished = true;
    console.log('[OpeningAnimation] ROM 任务链完成 → 0xCC4E (进入标题画面)');
    this._onComplete?.();
  }

  // ============================================================
  // 内部: VDP / CRAM / 帧加载
  // ============================================================

  /** ROM Stage 0xC92C: VDP 寄存器配置 */
  private configureVDPRegisters(): void {
    this.vdp.writeRegister(2, OPENING_VDP_CONFIG.R2_PLANE_A);
    this.vdp.writeRegister(5, OPENING_VDP_CONFIG.R5_SPRITE);
    this.vdp.writeRegister(12, OPENING_VDP_CONFIG.R12_MODE);
    this.vdp.writeRegister(7, OPENING_VDP_CONFIG.R7_BGCOLOR);
    // ROM 也设 R4=0x07 (Plane B) 和 R0/R1
    this.vdp.writeRegister(0, 0x04);
    this.vdp.writeRegister(1, 0x14);
    this.vdp.writeRegister(4, 0x07);
    console.log('[OpeningAnimation] VDP 寄存器: R2→PlaneA@0xA000, R5→Sprite@0xF000, R12→H40');
  }

  /** 加载目标 CRAM 调色板 */
  private _loadTargetCRAM(): void {
    for (let i = 0; i < OPENING_CRAM.length; i++) {
      this.vdp.cram[i] = OPENING_CRAM[i];
    }
  }

  /** ROM Stage 0xC93A: 加载 CRAM */
  private loadCRAM(): void {
    // 先从全黑开始 (渐入用)
    for (let i = 0; i < 128; i++) {
      this.vdp.cram[i] = 0;
    }
  }

  /** 按时间表加载帧 */
  private _loadFrameSchedule(scheduleIdx: number): void {
    const schedule = STAGE_SCHEDULE[scheduleIdx];
    if (!schedule) return;
    this._loadFrame(schedule.frameIdx);
    console.log(`[OpeningAnimation] 阶段 ${scheduleIdx}: "${schedule.label}" (帧${schedule.frameIdx}, ${schedule.durationMs}ms)`);
  }

  /** 加载指定帧到 VRAM (ROM DMA 模拟) */
  private _loadFrame(frameIndex: number): void {
    if (frameIndex < 0 || frameIndex >= OPENING_FRAME_COUNT) return;
    if (frameIndex === this._currentFrameIdx) return;

    const frame: OpeningFrame = OpeningAnimationData.getFrame(frameIndex);

    // 1. 加载 tile pattern (从 VRAM 0x0000)
    // ROM: jsr 0x0099B2 → LZSS解压 → DMA到VRAM
    for (let i = 0; i < frame.tiles.length; i++) {
      this.vdp.writeVRAM(i, frame.tiles[i]);
    }

    // 2. 加载 Plane A nametable (到 0xA000)
    for (let i = 0; i < frame.nametable.length; i++) {
      this.vdp.writeVRAM(OPENING_PLANE_A_BASE + i, frame.nametable[i]);
    }

    // 3. 加载 sprite 表 (到 0xF000)
    for (let i = 0; i < frame.sprites.length; i++) {
      this.vdp.writeVRAM(OPENING_SPRITE_BASE + i, frame.sprites[i]);
    }

    // 4. 清空渲染缓存
    invalidateTileCache();
    invalidateSpriteTileCache();

    this._currentFrameIdx = frameIndex;
    console.log(`[OpeningAnimation] VRAM DMA 完成: 帧${frameIndex} (${frame.tileCount}t, nt=${frame.nametable.length}B, spr=${frame.sprites.length}B)`);
  }

  // ============================================================
  // 公共 API
  // ============================================================

  /** 当前阶段 */
  get stage(): string { return this._stage; }
  /** 当前帧索引 */
  get currentFrame(): number { return this._currentFrameIdx; }
  /** 总帧数 */
  get frameCount(): number { return OPENING_FRAME_COUNT; }
  /** 是否已完成 */
  get finished(): boolean { return this._finished; }

  /** 直接完成 (跳过剩余动画) */
  skip(): void {
    if (this._finished) return;
    this._fadeCram = null;
    this._loadTargetCRAM();
    this._finish();
  }

  /** 重新开始 */
  restart(): void {
    this._stage = 'FADE_IN';
    this._fadeStep = 0;
    this._fadeElapsed = 0;
    this._stageIndex = 0;
    this._stageElapsed = 0;
    this._currentFrameIdx = -1;
    this._finished = false;
    this._fadeCram = new Uint8Array(128).fill(0);
    this.loadCRAM();
    this._loadFrameSchedule(0);
  }

  /** 设置完成回调 */
  setOnComplete(cb: () => void): void { this._onComplete = cb; }
}
