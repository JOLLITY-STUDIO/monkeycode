/**
 * 开场动画场景 - 全屏帧动画播放器
 *
 * 数据来源:
 *   - VRAM dump: Langrisser II (Japan)_VRAM-openNING-ANIATION-{2,SOMETIMES}.ram
 *   - CRAM: 复用标题画面调色板 (开场 CRAM dump 全零)
 *
 * 渲染参数:
 *   - R2 = 0x28 → Plane A nametable @ VRAM 0xA000
 *   - R5 = 0x78 → Sprite attribute table @ VRAM 0xF000
 *   - R12 = 0x81 → H40 模式 (320px 宽)
 *   - 全部低优先级
 *
 * 动画机制:
 *   - 全屏帧动画: 每帧重新加载 tile pattern + nametable + sprite 表
 *   - 不是滚动或局部更新, 而是整屏画面切换
 *   - 两帧之间 93% tile 数据不同, 66% nametable 不同
 *
 * ROM 调用链 (参考):
 *   0xC9A0 → 0x9EC4 (场景加载) → 0xCC4E (帧初始化) → taskFuncPtr=0xCA00
 *   0xC7EC → 写 R17=0x94, R18=0x9E (Window 位置)
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { invalidateTileCache } from '../hw/vdp/plane.js';
import { invalidateSpriteTileCache } from '../hw/vdp/sprite.js';
import {
  OPENING_CRAM,
  OPENING_FRAMES,
  OPENING_FRAME_COUNT,
  OPENING_PLANE_A_BASE,
  OPENING_DISPLAY_WIDTH,
  OPENING_DISPLAY_HEIGHT,
  type OpeningFrame,
} from '../data/OpeningAnimationData.js';

// ============================================================
// 常量
// ============================================================

/** VDP 寄存器配置 (开场动画) */
const OPENING_VDP_REGS = {
  R2_PLANE_A: 0x28,    // Plane A nametable @ 0xA000
  R5_SPRITE: 0x78,     // Sprite table @ 0xF000
  R12_MODE: 0x81,      // H40 模式 (320px)
} as const;

/** 默认帧间隔 (ms) — 约 16FPS, 模拟原版动画速度 */
const DEFAULT_FRAME_INTERVAL_MS = 60;

/** sprite 表写入地址 (与 R5 计算结果一致) */
const SPRITE_TABLE_ADDR = 0xF000;

// ============================================================
// OpeningAnimation 场景
// ============================================================

export class OpeningAnimation implements Scene {
  readonly name = 'OpeningAnimation';

  private vdp: VDP;

  /** 当前帧索引 (0-based) */
  private _currentFrame: number = 0;
  /** 累计时间 (ms) */
  private _elapsed: number = 0;
  /** 帧间隔 (ms) */
  private readonly _frameInterval: number;
  /** 是否循环播放 */
  private _loop: boolean;
  /** 动画完成回调 */
  private _onComplete?: () => void;
  /** 是否已完成 */
  private _finished: boolean = false;

  constructor(
    vdp: VDP,
    options: {
      frameInterval?: number;
      loop?: boolean;
      onComplete?: () => void;
    } = {},
  ) {
    this.vdp = vdp;
    this._frameInterval = options.frameInterval ?? DEFAULT_FRAME_INTERVAL_MS;
    this._loop = options.loop ?? false;
    this._onComplete = options.onComplete;
  }

  // ============================================================
  // 生命周期
  // ============================================================

  init(): void {
    this.configureVDPRegisters();
    this.loadCRAM();
    this.loadFrame(0);
    this.vdp.displayEnabled = true;
    console.log(`[OpeningAnimation] 初始化完成, 共 ${OPENING_FRAME_COUNT} 帧, 间隔 ${this._frameInterval}ms`);
  }

  update(dt: number = 16): void {
    if (this._finished) return;

    this._elapsed += dt;
    if (this._elapsed < this._frameInterval) return;

    this._elapsed = 0;
    this._currentFrame++;

    if (this._currentFrame >= OPENING_FRAME_COUNT) {
      if (this._loop) {
        this._currentFrame = 0;
      } else {
        this._finished = true;
        console.log('[OpeningAnimation] 播放完成');
        this._onComplete?.();
        return;
      }
    }

    this.loadFrame(this._currentFrame);
  }

  destroy(): void {
    this._onComplete = undefined;
  }

  // ============================================================
  // 内部方法
  // ============================================================

  /** 配置 VDP 寄存器 (开场动画专用) */
  private configureVDPRegisters(): void {
    this.vdp.writeRegister(2, OPENING_VDP_REGS.R2_PLANE_A);
    this.vdp.writeRegister(5, OPENING_VDP_REGS.R5_SPRITE);
    this.vdp.writeRegister(12, OPENING_VDP_REGS.R12_MODE);
    this.vdp.writeRegister(7, 0x00); // 背景色 = 调色板0 索引0
  }

  /** 加载共用 CRAM 调色板 */
  private loadCRAM(): void {
    for (let i = 0; i < OPENING_CRAM.length; i++) {
      this.vdp.cram[i] = OPENING_CRAM[i];
    }
    console.log(`[OpeningAnimation] CRAM: ${OPENING_CRAM.length}B 已加载`);
  }

  /** 加载指定帧的数据到 VRAM */
  private loadFrame(frameIndex: number): void {
    const frame: OpeningFrame = OPENING_FRAMES[frameIndex];

    // 1. 加载 tile pattern 数据 (从 VRAM 0x0000 开始)
    for (let i = 0; i < frame.tiles.length; i++) {
      this.vdp.writeVRAM(i, frame.tiles[i]);
    }

    // 2. 加载 Plane A nametable (@ 0xA000)
    for (let i = 0; i < frame.nametable.length; i++) {
      this.vdp.writeVRAM(OPENING_PLANE_A_BASE + i, frame.nametable[i]);
    }

    // 3. 加载 sprite 表 (@ 0xF000)
    for (let i = 0; i < frame.sprites.length; i++) {
      this.vdp.writeVRAM(SPRITE_TABLE_ADDR + i, frame.sprites[i]);
    }

    // 4. 清空 tile 缓存 (新帧数据需要重新解码)
    invalidateTileCache();
    invalidateSpriteTileCache();

    console.log(`[OpeningAnimation] 帧 ${frameIndex + 1}/${OPENING_FRAME_COUNT} 已加载 (tile=${frame.tiles.length}B, nt=${frame.nametable.length}B, spr=${frame.sprites.length}B)`);
  }

  // ============================================================
  // 公共 API
  // ============================================================

  /** 当前帧索引 */
  get currentFrame(): number {
    return this._currentFrame;
  }

  /** 总帧数 */
  get frameCount(): number {
    return OPENING_FRAME_COUNT;
  }

  /** 是否已完成 */
  get finished(): boolean {
    return this._finished;
  }

  /** 跳转到指定帧 */
  seekTo(frameIndex: number): void {
    if (frameIndex < 0 || frameIndex >= OPENING_FRAME_COUNT) return;
    this._currentFrame = frameIndex;
    this._elapsed = 0;
    this._finished = false;
    this.loadFrame(frameIndex);
  }

  /** 重新开始播放 */
  restart(): void {
    this._currentFrame = 0;
    this._elapsed = 0;
    this._finished = false;
    this.loadFrame(0);
  }

  /** 设置播放完成回调 (用于循环复用场景实例) */
  setOnComplete(cb: () => void): void {
    this._onComplete = cb;
  }
}

// ============================================================
// 工厂函数
// ============================================================

/**
 * 创建开场动画场景
 *
 * @param vdp VDP 实例
 * @param options 配置选项
 *   - frameInterval: 帧间隔 ms (默认 60ms ≈ 16FPS)
 *   - loop: 是否循环 (默认 false)
 *   - onComplete: 播放完成回调
 */
export function setupOpeningAnimation(
  vdp: VDP,
  options?: {
    frameInterval?: number;
    loop?: boolean;
    onComplete?: () => void;
  },
): OpeningAnimation {
  const anim = new OpeningAnimation(vdp, options);
  anim.init();
  return anim;
}
