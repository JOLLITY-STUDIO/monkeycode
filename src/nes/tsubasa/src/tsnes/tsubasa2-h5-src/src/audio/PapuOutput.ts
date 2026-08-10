/**
 * PapuOutput — PAPU + AudioContext 桥接适配层
 *
 * 每帧流程:
 *   Bank12 writeReg(addr,val) → papu.writeReg(addr,val) → 写入 apuBuffer
 *   Bank12.update() 末尾 → papu.clockFramePerFrame() → 生成采样 → 环形缓冲
 *   ScriptProcessor.onaudioprocess → 从环形缓冲取采样 → AudioContext.destination
 *
 * 数据模块注入:
 *   直接引用 data/audio 导出的 apuBuffer (Uint8Array 32B)。
 *   PAPU 的 regValues 指向该 buffer，所有 APU 寄存器读写共享同一块内存。
 */

import PAPU from './papu/index';
import { apuBuffer } from '../data/audio/audioCache';

// ════════════════════════════════════════════
// 音频参数
// ════════════════════════════════════════════

const SAMPLE_RATE = 44100;
/** ScriptProcessor 缓冲区大小 (采样数) */
const NODE_BUF_SIZE = 4096;
/** 环形缓冲大小: ~1秒 */
const RING_BUF_SIZE = SAMPLE_RATE * 2;

// ════════════════════════════════════════════
// PapuOutput
// ════════════════════════════════════════════

export class PapuOutput {
  /** NES APU 引擎 (regValues → apuBuffer) */
  readonly papu: PAPU;

  private _ctx: AudioContext | null = null;
  private _node: ScriptProcessorNode | null = null;
  private _started = false;

  /** 环形采样缓冲: float32 stereo interleaved */
  private _ring = new Float32Array(RING_BUF_SIZE * 2);
  private _ringWrite = 0;
  private _ringRead = 0;

  constructor() {
    // PAPU 直连 apuBuffer，不再内部分配
    this.papu = new PAPU(SAMPLE_RATE, apuBuffer);

    // 采样回调: 写入环形缓冲
    this.papu.setSampleCallback((left, right) => {
      const sz = RING_BUF_SIZE * 2;
      // 空间检查: 如果写满则丢帧（不会阻塞）
      if ((this._ringWrite + 2) % sz !== this._ringRead) {
        this._ring[this._ringWrite] = left;
        this._ring[this._ringWrite + 1] = right;
        this._ringWrite = (this._ringWrite + 2) % sz;
      }
    });
  }

  // ── 寄存器接口 (供 Bank12AudioService 直接写入) ──

  writeReg(addr: number, value: number): void {
    this.papu.writeReg(addr, value);
  }

  readReg(addr: number): number {
    return this.papu.readReg(addr);
  }

  // ── 帧推进 ──

  /** 每帧调用: 推进 PAPU 帧计数器、生成采样 */
  clockFrame(): void {
    this._ensureAudioStarted();
    this.papu.clockFramePerFrame();
  }

  // ── 生命周期 ──

  /** 重置所有通道 (静音) */
  silence(): void {
    this.papu.writeReg(0x4015, 0);
    this._ring.fill(0);
    this._ringWrite = 0;
    this._ringRead = 0;
  }

  destroy(): void {
    if (this._node) {
      this._node.disconnect();
      this._node = null;
    }
    if (this._ctx) {
      this._ctx.close().catch(() => {});
      this._ctx = null;
    }
    this._started = false;
  }

  // ════════════════════════════════════════════
  // 内部: AudioContext 管理
  // ════════════════════════════════════════════

  private _ensureAudioStarted(): void {
    if (this._started) return;
    this._started = true;

    try {
      // 微信小程序兼容: wx.createWebAudioContext
      const win = (typeof wx !== 'undefined' && (wx as any).createWebAudioContext)
        ? (wx as any).createWebAudioContext()
        : null;
      this._ctx = win
        ? (win as AudioContext)
        : new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: SAMPLE_RATE });
    } catch {
      console.warn('[PapuOutput] AudioContext 不可用');
      return;
    }

    try {
      this._node = this._ctx.createScriptProcessor
        ? this._ctx.createScriptProcessor(NODE_BUF_SIZE, 0, 1)
        : ((this._ctx as any).createScriptProcessor(NODE_BUF_SIZE, 0, 1));
    } catch {
      console.warn('[PapuOutput] createScriptProcessor 不可用');
      return;
    }

    if (!this._node) return;

    this._node.onaudioprocess = this._onAudioProcess.bind(this);
    this._node.connect(this._ctx.destination);

    console.log('[PapuOutput] AudioContext 就绪, sampleRate=' + this._ctx.sampleRate);
  }

  // ════════════════════════════════════════════
  // 内部: 从环形缓冲取采样 → ScriptProcessor
  // ════════════════════════════════════════════

  private _onAudioProcess = (event: AudioProcessingEvent): void => {
    const out = event.outputBuffer.getChannelData(0);
    const len = out.length;
    const sz = RING_BUF_SIZE * 2;

    for (let i = 0; i < len; i++) {
      if (this._ringRead !== this._ringWrite) {
        // 读一个采样 (单声道: 平均左右)
        out[i] = (this._ring[this._ringRead] + this._ring[this._ringRead + 1]) * 0.5;
        this._ringRead = (this._ringRead + 2) % sz;
      } else {
        // buffer underrun → 静音
        out[i] = 0;
      }
    }
  };
}

export default PapuOutput;
