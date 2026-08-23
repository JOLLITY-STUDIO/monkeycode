/**
 * Speakers (小程序版) — 音频输出
 *
 * 借鉴 core/browser/speakers.ts, 适配微信小程序:
 *   - 小程序无 AudioWorklet, 用 WebAudio (小程序基础库 2.19+ 支持) 或降级静音
 *   - 简化版: 用 ScriptProcessorNode (兼容性更好) 替代 AudioWorklet
 *
 * TODO: 后续可考虑用 wx.createWebAudioContext + AudioBufferSourceNode。
 * 当前先 stub 基本结构, 默认静音 (writeSample 为 no-op),
 * 等 H5 音频引擎 (Bank12AudioService) 接入后再补真实输出。
 */
const BATCH_SIZE = 128;

interface SpeakersOptions {
  onBufferUnderrun?: () => void;
}

export default class SpeakersMini {
  onBufferUnderrun?: () => void;
  audioCtx: any;
  node: any;
  batchL: Float32Array;
  batchR: Float32Array;
  batchPos: number;
  _started: boolean;

  constructor({ onBufferUnderrun }: SpeakersOptions = {}) {
    this.onBufferUnderrun = onBufferUnderrun;
    this.audioCtx = null;
    this.node = null;
    this.batchL = new Float32Array(BATCH_SIZE);
    this.batchR = new Float32Array(BATCH_SIZE);
    this.batchPos = 0;
    this._started = false;
  }

  getSampleRate(): number {
    if (this.audioCtx) return this.audioCtx.sampleRate;
    return 44100;
  }

  /**
   * 启动音频。
   * 小程序环境: 尝试 wx.createWebAudioContext (基础库 2.19+), 失败则静音。
   * TODO: 真实音频输出待 Bank12AudioService 接入后补全。
   */
  async start(): Promise<void> {
    try {
      const wxAny = (typeof wx !== 'undefined' ? (wx as any) : null);
      if (wxAny && typeof wxAny.createWebAudioContext === 'function') {
        this.audioCtx = wxAny.createWebAudioContext();
        // TODO: 创建 ScriptProcessorNode 或 AudioBufferSourceNode 输出
        // 当前先 stub, 音频暂不输出
        this._started = true;
      } else if (typeof AudioContext !== 'undefined') {
        this.audioCtx = new AudioContext();
        this._started = true;
      }
    } catch (e) {
      console.warn('[SpeakersMini] 音频启动失败, 降级静音:', e);
    }
  }

  stop(): void {
    if (this.node) {
      try { this.node.disconnect(); } catch (_) { /* */ }
      this.node = null;
    }
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch (_) { /* */ }
      this.audioCtx = null;
    }
    this.batchPos = 0;
    this._started = false;
  }

  /** 接收一个立体声样本 (与 browser 版接口一致)。当前 stub 为 no-op。 */
  writeSample = (left: number, right: number): void => {
    if (!this._started) return;
    this.batchL[this.batchPos] = left;
    this.batchR[this.batchPos] = right;
    this.batchPos++;
    if (this.batchPos >= BATCH_SIZE) {
      // TODO: 真实输出待补全
      this.batchPos = 0;
    }
  };

  flush(): void {
    this.batchPos = 0;
  }
}
