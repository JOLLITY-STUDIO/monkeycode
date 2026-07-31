/**
 * 音频环形缓冲管理器 — 从 h5game.ts 抽离
 *
 * 管理微信 WebAudio 上下文的创建、环形缓冲写入/读出、生命周期。
 */

const SAMPLE_RATE = 48000;
const SCRIPT_BUF = 2048;

export class AudioManager {
  private ring: Float32Array | null = null;
  private ringCap = SAMPLE_RATE * 4;
  private ringW = 0;
  private ringR = 0;
  private audioCtx: any = null;
  private audioNode: any = null;

  init(): void {
    this.ring = new Float32Array(this.ringCap);
  }

  /** 推送一个音频采样 (stereo) */
  pushSample(left: number, right: number): void {
    const ring = this.ring;
    if (!ring) return;
    const cap = this.ringCap;
    const next = (this.ringW + 2) % cap;
    if (next === this.ringR) this.ringR = (this.ringR + 2) % cap;
    ring[this.ringW] = left;
    ring[this.ringW + 1] = right;
    this.ringW = next;
  }

  start(): void {
    if (this.audioCtx) return;
    try {
      const ctx = wx.createWebAudioContext();
      const node = ctx.createScriptProcessor(SCRIPT_BUF, 0, 2);
      const self = this;
      node.onaudioprocess = (e: any) => {
        const ring = self.ring;
        if (!ring) return;
        const outL = e.outputBuffer.getChannelData(0);
        const outR = e.outputBuffer.getChannelData(1);
        const len = outL.length;
        const cap = self.ringCap;
        let r = self.ringR;
        const w = self.ringW;
        for (let i = 0; i < len; i++) {
          if (r === w) {
            outL[i] = 0; outR[i] = 0;
          } else {
            outL[i] = ring[r];
            outR[i] = ring[r + 1];
            r = (r + 2) % cap;
          }
        }
        self.ringR = r;
      };
      node.connect(ctx.destination);
      this.audioCtx = ctx;
      this.audioNode = node;
    } catch (e: any) {
      console.warn('[audio] Audio unavailable:', e.message);
    }
  }

  stop(): void {
    if (this.audioNode) {
      try { this.audioNode.disconnect(); this.audioNode.onaudioprocess = null; } catch (_) {}
      this.audioNode = null;
    }
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch (_) {}
      this.audioCtx = null;
    }
    this.ringW = 0;
    this.ringR = 0;
  }
}
