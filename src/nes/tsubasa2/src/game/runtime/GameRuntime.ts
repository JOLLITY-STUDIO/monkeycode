/**
 * GameRuntime — 运行平台抽象（外部只需提供渲染目标 + 控制器）
 *
 * 即插即用约定：外部搭建 Canvas 上下文和操作功能，无需了解游戏内核。
 *  - ppu：渲染目标（core PPU headless 实例，或自定义实现 PpuTarget 的渲染器）
 *  - controllers：两套控制器状态（state[i]=0x41 按下 / 0x40 松开，与 core Controller 一致）
 */
import type { PpuTarget } from '../prg/code/system/InterruptService';

/** PPU 渲染目标扩展（扫描线渲染 + 帧缓冲） */
export interface PpuRenderTarget extends PpuTarget {
  /** 256×240 像素帧缓冲（Uint32，0xRRGGBB） */
  buffer: Uint32Array;
  startFrame(): void;
  advanceDots(dots: number): void;
  renderFramePartially(startScan: number, scanCount: number): void;
  endFrame(): void;
}

/** 控制器状态（state 数组 8 元素：A/B/Sel/Start/上/下/左/右） */
export interface RuntimeController {
  readonly state: number[];
}

export interface GameRuntime {
  readonly ppu: PpuRenderTarget;
  readonly controllers: {
    1: RuntimeController;
    2: RuntimeController;
  };
}

/**
 * FrameTarget — Tsubasa2.frame() 每帧入参（结构化最小契约）
 *
 * 外部运行平台只需满足：
 *  - controllers：两套控制器状态（state[i] 0x41=按下 / 0x40=松开）
 *  - ppu：PPU 渲染目标（含扫描线渲染 + 帧缓冲）
 *
 * 与 core NES 结构兼容（NES.ppu/controllers 可自然满足），即插即用。
 */
export interface FrameTarget {
  readonly controllers: {
    1: RuntimeController;
    2: RuntimeController;
  };
  readonly ppu: PpuRenderTarget;
}