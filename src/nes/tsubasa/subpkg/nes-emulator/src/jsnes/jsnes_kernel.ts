/**
 * jsnes 内核适配器 — 可移植分包版本
 *
 * 加载原始 .nes ROM 文件，运行 jsnes 完整 NES 仿真器。
 * 每帧输出 PPU 帧缓冲到 canvas。
 * 不含 TS 反汇编/调试/追踪功能。
 */

// @ts-ignore — jsnes 是 .js 模块
import NES from './src/nes';

import { BUTTON } from '../types';
import { romUint8Array } from '../rom_data';

// ============================================================================
// jsnes 内核类
// ============================================================================

const SCREEN_W = 256;
const SCREEN_H = 240;
const SAMPLE_RATE = 48000;
/** ScriptProcessorNode buffer size 采样数 (越小延迟越低) */
const SCRIPT_BUF = 2048;

export class JsnesKernel {
  nes: any;
  canvas: any;
  running = false;

  /** PPU 帧缓冲快照 (Uint32Array, NES BGR 格式) */
  frameBuffer: Uint32Array | null = null;

  /** ImageData 复用 */
  private imageData: ImageData | null = null;
  /** Canvas 2D context (主画布) */
  private ctx: CanvasRenderingContext2D | null = null;

  // ====== 音频: ring buffer → WebAudioContext → ScriptProcessorNode → speaker ======
  /** 环形缓冲 (立体声交错: L,R,L,R,...) */
  private _ring: Float32Array;
  private _ringCap: number;
  private _ringW = 0;   // 写入位置
  private _ringR = 0;   // 读取位置 (ScriptProcessor 消费)
  private _audioCtx: any = null;
  private _audioNode: any = null;

  constructor(canvas: any) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) throw new Error('[jsnes] Cannot get 2d context');
    this.ctx = ctx;
    // 像素画关平滑
    ctx.imageSmoothingEnabled = false;
    this.imageData = ctx.createImageData(SCREEN_W, SCREEN_H);

    // ~200ms 立体声缓冲
    this._ringCap = SAMPLE_RATE >> 2 << 2; // 48000 → 48000 samples × 2 channels
    this._ring = new Float32Array(this._ringCap);

    const self = this;
    this.nes = new NES({
      onFrame: (buffer: Uint32Array) => {
        self.frameBuffer = buffer;
      },
      onStatusUpdate: (msg: string) => {
        console.log('[jsnes]', msg);
      },
      onAudioSample: (left: number, right: number) => {
        self._onAudioSample(left, right);
      },
      emulateSound: true,
      sampleRate: SAMPLE_RATE,
    });
  }

  // ---- 音频管线 ----

  /** jsnes APU 采样 → 环形缓冲 */
  private _onAudioSample(left: number, right: number): void {
    const cap = this._ringCap;
    const next = (this._ringW + 2) % cap;
    if (next === this._ringR) {
      // 缓冲满了，丢掉最旧的保持实时
      this._ringR = (this._ringR + 2) % cap;
    }
    this._ring[this._ringW] = left;
    this._ring[this._ringW + 1] = right;
    this._ringW = next;
  }

  /** 启动 WebAudioContext → ScriptProcessorNode → speaker */
  private _startAudio(): void {
    if (this._audioCtx) return;
    try {
      const ctx = wx.createWebAudioContext();
      // createScriptProcessor(缓冲区大小, 输入通道数, 输出通道数)
      const node = ctx.createScriptProcessor(SCRIPT_BUF, 0, 2);
      const self = this;

      node.onaudioprocess = (e: any) => {
        const outL = e.outputBuffer.getChannelData(0);
        const outR = e.outputBuffer.getChannelData(1);
        const len = outL.length;
        const cap = self._ringCap;

        let r = self._ringR;
        let w = self._ringW;

        for (let i = 0; i < len; i++) {
          if (r === w) {
            // 缓冲空 → 填充静音
            outL[i] = 0;
            outR[i] = 0;
          } else {
            outL[i] = self._ring[r];
            outR[i] = self._ring[r + 1];
            r = (r + 2) % cap;
          }
        }
        self._ringR = r;
      };

      node.connect(ctx.destination);
      this._audioCtx = ctx;
      this._audioNode = node;
      console.log('[jsnes] audio started via WebAudioContext');
    } catch (e: any) {
      console.warn('[jsnes] WebAudioContext unavailable:', e.message);
    }
  }

  /** 停止音频 */
  private _stopAudio(): void {
    if (this._audioNode) {
      try {
        this._audioNode.disconnect();
        this._audioNode.onaudioprocess = null;
      } catch (_) { /* ignore */ }
      this._audioNode = null;
    }
    if (this._audioCtx) {
      try { this._audioCtx.close(); } catch (_) { /* ignore */ }
      this._audioCtx = null;
    }
    this._ringW = 0;
    this._ringR = 0;
  }

  /** 直接加载原始 .nes ROM 数据并启动 */
  start(): void {
    try {
      const romData = romUint8Array();
      console.log('[jsnes] ROM decoded: %d bytes', romData.length);

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
      this._startAudio();
      this.running = true;
      console.log('[jsnes] ROM loaded, CPU running');
    } catch (e: any) {
      console.error('[jsnes] ROM load failed:', e.message || e);
      throw e;
    }
  }

  /** 停止 */
  stop(): void {
    this.running = false;
    this._stopAudio();
  }

  /** 重启 */
  reset(): void {
    console.log('[jsnes] Reset');
    this.nes.reset();
    this.frameBuffer = null;
  }

  /** 暂停 — 保留完整状态，仅停止帧循环 */
  pause(): void {
    this.running = false;
  }

  /** 恢复 — 重新激活帧循环 */
  resume(): void {
    this.running = true;
  }

  /** 序列化 emulator 完整状态 (存档) */
  saveState(): object {
    return this.nes.toJSON();
  }

  /** 从存档恢复 emulator 完整状态 */
  loadState(state: object): void {
    this.nes.fromJSON(state);
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

  /** 拉伸/全屏时调用: 修改主 canvas 像素尺寸, drawImage 会自动 GPU 放大 */
  resizeCanvas(w: number, h: number): void {
    if (!this.canvas) return;
    this.canvas.width = w;
    this.canvas.height = h;
    if (this.ctx) {
      this.ctx.imageSmoothingEnabled = false;
    }
  }

  /** 渲染当前帧缓冲到 Canvas (同步 putImageData) */
  renderToCanvas(): void {
    if (!this.frameBuffer || !this.ctx || !this.imageData) return;

    // jsnes PPU 输出 BGR 格式 (Uint32 = 0x00BBGGRR)
    // 转为 RGBA: 只需把 alpha 置为 0xFF
    const buf32 = new Uint32Array(this.imageData.data.buffer);
    const fb = this.frameBuffer;
    for (let i = 0; i < SCREEN_W * SCREEN_H; i++) {
      buf32[i] = fb[i] | 0xFF000000;
    }

    this.ctx.putImageData(this.imageData, 0, 0);
  }

  /**
   * 设置手柄输入
   * @param mask BUTTON 位掩码
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
