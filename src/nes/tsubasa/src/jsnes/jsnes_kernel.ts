/**
 * ============================================================================
 * jsnes 内核适配器 — 用于双 canvas 对比调试
 *
 * 直接加载原始 .nes ROM 文件，喂给 jsnes 完整 NES 仿真器。
 * 每帧输出 PPU 帧缓冲到 canvas，与手写 TS 版本并排对比。
 * ============================================================================
 */

// @ts-ignore — jsnes 是 .js 模块
import NES from './src/nes';

import { BUTTON } from '../types';

// ============================================================================
// ROM 文件路径
// ============================================================================

/** 尝试加载的路径列表 (按优先级) */
const ROM_PATHS = [
  'rom.nes',
  'src/legacy/romdata/Captain Tsubasa II - Super Striker (Japan).nes',
];

// ============================================================================
// jsnes 内核类
// ============================================================================

const SCREEN_W = 256;
const SCREEN_H = 240;

export class JsnesKernel {
  nes: any;
  canvas: any;
  running = false;

  /** PPU 帧缓冲快照 (Uint32Array, NES BGR 格式) */
  frameBuffer: Uint32Array | null = null;

  /** ImageData 用于 Canvas 绘制 */
  private imageData: ImageData | null = null;

  /** Canvas 2D context */
  private ctx: CanvasRenderingContext2D | null = null;

  constructor(canvas: any) {
    this.canvas = canvas;
    // 初始化 canvas
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) {
      throw new Error('[jsnes] Cannot get 2d context');
    }
    canvas.width = SCREEN_W;
    canvas.height = SCREEN_H;
    this.ctx = ctx;
    this.imageData = ctx.createImageData(SCREEN_W, SCREEN_H);

    // 创建 NES 实例 (先创建，ROM 在 start() 中加载)
    this.nes = new NES({
      onFrame: (buffer: Uint32Array) => {
        this.frameBuffer = buffer;
      },
      onStatusUpdate: (msg: string) => {
        console.log('[jsnes]', msg);
      },
      onAudioSample: null, // 不需要音频
      emulateSound: false,
    });
  }

  /** 直接加载原始 .nes ROM 文件并启动 */
  start(): void {
    const fs = wx.getFileSystemManager();

    for (const path of ROM_PATHS) {
      try {
        const data = fs.readFileSync(path);
        console.log('[jsnes] ROM read OK from:', path);

        // jsnes 接受 Uint8Array / ArrayBuffer
        const romData = data instanceof ArrayBuffer
          ? new Uint8Array(data)
          : data;

        // 打印 iNES 头诊断
        if (romData.length >= 16 && romData[0] === 0x4E) {
          const prg16k = romData[4];
          const chr8k = romData[5];
          const mapper = ((romData[6] >> 4) | (romData[7] & 0xF0));
          console.log('[jsnes] iNES: PRG=%d×16KB, CHR=%d×8KB, mapper=%d, flags6=0x%s flags7=0x%s size=%d',
            prg16k, chr8k, mapper,
            romData[6].toString(16), romData[7].toString(16), romData.length);
        }

        this.nes.loadROM(romData);
        this.running = true;
        console.log('[jsnes] ROM loaded, CPU running');
        return;
      } catch (e: any) {
        console.warn('[jsnes] Path not found:', path, e.message || e);
      }
    }

    console.error('[jsnes] All ROM paths failed:', ROM_PATHS);
  }

  /** 停止 */
  stop(): void {
    this.running = false;
  }

  /** 重启 */
  reset(): void {
    console.log('[jsnes] Reset');
    this.nes.reset();
    this.frameBuffer = null;
  }

  /** 执行一帧 */
  frame(): void {
    if (!this.running) return;
    try {
      this.nes.frame();
    } catch (e) {
      console.error('[jsnes] frame error:', e);
      this.running = false;
    }
  }

  /** 渲染当前帧缓冲到 Canvas */
  renderToCanvas(): void {
    if (!this.frameBuffer || !this.ctx || !this.imageData) return;

    // jsnes PPU 输出 BGR 格式 (0x00BBGGRR)
    // Canvas ImageData 格式是 RGBA
    // 转换: swap R<->B
    const buf32 = new Uint32Array(this.imageData.data.buffer);
    const fb = this.frameBuffer;
    for (let i = 0; i < SCREEN_W * SCREEN_H; i++) {
      const bgr = fb[i];
      if (bgr === 0) {
        buf32[i] = 0xFF000000; // black with alpha
      } else {
        const r = (bgr >> 16) & 0xFF;
        const g = (bgr >> 8) & 0xFF;
        const b = bgr & 0xFF;
        // Canvas: 0xAABBGGRR in Uint32 little-endian → bytes [R, G, B, A]
        buf32[i] = 0xFF000000 | (b << 16) | (g << 8) | r;
      }
    }

    this.ctx.putImageData(this.imageData, 0, 0);
  }

  /**
   * 设置手柄输入
   * @param controller 1号手柄
   * @param mask BUTTON 位掩码 (jsnes 的 buttonDown/buttonUp 逐个触发)
   */
  private prevButtons = 0;
  setInput(mask: number): void {
    // 用 jsnes 的 buttonDown/buttonUp API
    const btnMap: [number, number][] = [
      [BUTTON.A, 0],      // jsnes button 0 = A
      [BUTTON.B, 1],      // jsnes button 1 = B
      [BUTTON.SELECT, 2], // jsnes button 2 = Select
      [BUTTON.START, 3],  // jsnes button 3 = Start
      [BUTTON.UP, 4],     // jsnes button 4 = Up
      [BUTTON.DOWN, 5],   // jsnes button 5 = Down
      [BUTTON.LEFT, 6],   // jsnes button 6 = Left
      [BUTTON.RIGHT, 7],  // jsnes button 7 = Right
    ];

    for (const [tsBtn, jsnesBtn] of btnMap) {
      const wasPressed = (this.prevButtons & tsBtn) !== 0;
      const isPressed = (mask & tsBtn) !== 0;

      if (isPressed && !wasPressed) {
        this.nes.buttonDown(1, jsnesBtn);
      } else if (!isPressed && wasPressed) {
        this.nes.buttonUp(1, jsnesBtn);
      }
    }
    this.prevButtons = mask;
  }
}
