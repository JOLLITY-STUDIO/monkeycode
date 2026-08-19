/**
 * BGM 模块 —— WebAudio 多轨合成循环曲目（NDS 风格 PSG 音源）
 * 背景：ROM 的 Sound/PR.sdat 为加密自定义格式（G1 探测：非标准 SDAT、XOR 全 key
 *       可读率 ≤0.59，静态不可解）。原版 NDS 音乐本身即 PSG/PCM 音源合成，
 *       故以方波/三角波/噪声多轨合成循环曲目，贴合原版 Picross DS 明快曲风。
 * 平台：
 *   - 微信小程序：wx.createWebAudioContext()（基础库 2.19.0+）
 *   - HTML 测试：window.AudioContext / webkitAudioContext
 *   - 不支持环境：静默降级
 */
export type BgmKind = "game" | "title";

const NOTE = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

/** 4/4 拍、8 小节 × 16 步 = 128 步，16 分音符步进 */
const BARS = 8;
const STEPS = BARS * 16;

/** 旋律（triangle）：轻快上行下行，C 大调 */
const MELODY: number[] = [
  76, 79, 81, 79, 76, 72, 74, 76, 76, 79, 81, 79, 76, 72, 74, 0,
  77, 81, 79, 76, 74, 72, 74, 0, 76, 79, 81, 84, 81, 79, 76, 79,
  77, 81, 79, 76, 74, 72, 74, 0, 76, 79, 81, 84, 81, 79, 76, 0,
  74, 77, 76, 74, 72, 0, 74, 0, 72, 74, 72, 0, 0, 0, 0, 0,
  76, 79, 81, 79, 76, 72, 74, 76, 76, 79, 81, 79, 76, 72, 74, 0,
  77, 81, 79, 76, 74, 72, 74, 0, 76, 79, 81, 84, 81, 79, 76, 79,
  77, 81, 79, 76, 74, 72, 74, 0, 76, 79, 81, 84, 81, 79, 76, 0,
  74, 77, 76, 74, 72, 0, 74, 0, 60, 64, 67, 72, 0, 0, 0, 0,
];

/** 贝斯（square 低八度）：C Am F G 根音进行，八分音符 */
const BASS: number[] = (() => {
  const roots = [48, 45, 41, 43, 48, 41, 43, 48]; // C Am F G C F G C
  const a: number[] = [];
  for (let b = 0; b < BARS; b++) {
    for (let s = 0; s < 16; s++) {
      a.push(s % 2 === 0 ? roots[b] : 0);
    }
  }
  return a;
})();

/** 鼓：每拍底鼓 + 16 分音符踩镲（噪声） */
const KICK = Array.from({ length: STEPS }, (_, i) => (i % 4 === 0 ? 1 : 0));
const HAT = Array.from({ length: STEPS }, (_, i) => (i % 2 === 0 ? 1 : 0));

export class Bgm {
  private ctx: any = null;
  private master: any = null;
  private muted = false;
  private playing = false;
  private timer: any = null;
  private step = 0;
  private nextT = 0;
  private bpm = 112;

  /** 惰性创建 AudioContext（首次用户手势后可 resume） */
  ensure(): boolean {
    if (this.ctx) return true;
    try {
      const g: any = typeof wx !== "undefined" ? wx : null;
      if (g && typeof g.createWebAudioContext === "function") {
        this.ctx = g.createWebAudioContext();
      } else if (typeof window !== "undefined") {
        const w: any = window;
        const AC = w.AudioContext || w.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
    } catch (e) {
      this.ctx = null;
    }
    if (this.ctx) {
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.5;
      this.master.connect(this.ctx.destination);
    }
    return !!this.ctx;
  }

  setMuted(m: boolean): void {
    this.muted = m;
    if (this.master) this.master.gain.value = m ? 0 : 0.5;
  }

  /** 播放循环 BGM（幂等） */
  start(_kind: BgmKind = "game"): void {
    if (!this.ensure() || this.playing) return;
    const ctx = this.ctx;
    if (ctx.state === "suspended" && ctx.resume) ctx.resume();
    this.playing = true;
    this.step = 0;
    this.nextT = ctx.currentTime + 0.1;
    const stepDur = 60 / this.bpm / 4;
    const lookahead = 0.25;
    const tick = () => {
      if (!this.playing) return;
      while (this.nextT < ctx.currentTime + lookahead) {
        this.playStep(this.step, this.nextT, stepDur);
        this.step = (this.step + 1) % STEPS;
        this.nextT += stepDur;
      }
    };
    tick();
    this.timer = setInterval(tick, 40);
  }

  stop(): void {
    this.playing = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /** 播放第 s 步（t 为绝对时间） */
  private playStep(s: number, t: number, stepDur: number): void {
    const m = MELODY[s];
    if (m) this.tone(m, t, stepDur * 1.8, "triangle", 0.16);
    const b = BASS[s];
    if (b) this.tone(b - 12, t, stepDur * 1.6, "square", 0.1);
    if (KICK[s]) this.kick(t, stepDur);
    if (HAT[s]) this.hat(t, s % 4 === 0 ? 0.05 : 0.025);
  }

  private tone(midi: number, start: number, dur: number, type: OscillatorType, vol: number): void {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = NOTE(midi);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(vol, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  /** 底鼓：低频正弦快速衰减 */
  private kick(start: number, stepDur: number): void {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, start);
    osc.frequency.exponentialRampToValueAtTime(45, start + stepDur * 2);
    gain.gain.setValueAtTime(0.5, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + stepDur * 2.5);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(start);
    osc.stop(start + stepDur * 3);
  }

  /** 踩镲：高通噪声短音 */
  private hat(start: number, vol: number): void {
    const ctx = this.ctx;
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 7000;
    const gain = ctx.createGain();
    gain.gain.value = vol;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start(start);
  }
}

/** 全局单例 */
export const bgm = new Bgm();
