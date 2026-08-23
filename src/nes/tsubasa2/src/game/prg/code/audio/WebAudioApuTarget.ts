/**
 * WebAudioApuTarget — 用 WebAudio API 合成 NES APU 音频
 *
 * 对接 AudioService 的 APU 寄存器写，合成 4 个通道：
 *   - Pulse1/Pulse2: OscillatorNode（square 波）+ GainNode（音量/包络）
 *   - Triangle: OscillatorNode（triangle 波）+ GainNode
 *   - Noise: 白噪声 BufferSource + 滤波器
 *   - DPCM: 预录制采样回放（V0.6 暂用静音，需提取 PCM 数据）
 *
 * 使用方式：
 *   const apu = new WebAudioApuTarget();
 *   await apu.init();  // 用户交互后调用（浏览器音频策略限制）
 *   audioService.attachApu(apu);
 *
 * 注意：微信小程序环境无 AudioContext，需用 wx.createInnerAudioContext 替代
 *       本实现面向 HTML 测试台（index.html）
 */
import type { ApuTarget } from './ApuTarget';

/** Pulse/Triangle 通道频率表（NES APU 频率值 → Hz） */
function apuFreqToHz(freq: number): number {
  // NES APU: freq = (cpuClock / 32) / (register + 1)
  // CPU clock = 1789773 Hz
  if (freq === 0) return 0;
  return 1789773 / (16 * (freq + 1));
}

interface PulseChannel {
  oscillator: OscillatorNode;
  gain: GainNode;
  freq: number;
  volume: number;
  duty: number;
}

export class WebAudioApuTarget implements ApuTarget {
  private ctx: AudioContext | null = null;
  private pulse1: PulseChannel | null = null;
  private pulse2: PulseChannel | null = null;
  private triangle: PulseChannel | null = null;
  private noiseSrc: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private enabled = 0x00;

  /** 初始化（必须在用户交互后调用） */
  async init(): Promise<void> {
    const Ctor = (globalThis as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext
      ?? (globalThis as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) {
      console.warn('[WebAudioApuTarget] AudioContext 不可用，音频将静音');
      return;
    }
    this.ctx = new Ctor();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.1; // 总音量（避免过大）
    this.masterGain.connect(this.ctx.destination);

    // Pulse1
    this.pulse1 = this.createPulseChannel();
    // Pulse2
    this.pulse2 = this.createPulseChannel();
    // Triangle
    this.triangle = this.createPulseChannel();
    this.triangle.oscillator.type = 'triangle';

    // Noise（白噪声）
    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.value = 0;
    this.noiseGain.connect(this.masterGain);
    this.noiseSrc = this.createNoiseSource();
    this.noiseSrc.connect(this.noiseGain);
    this.noiseSrc.start();
  }

  private createPulseChannel(): PulseChannel {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = 440;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start();
    return { oscillator: osc, gain, freq: 0, volume: 0, duty: 0 };
  }

  private createNoiseSource(): AudioBufferSourceNode {
    const ctx = this.ctx!;
    const bufferSize = ctx.sampleRate * 0.5; // 0.5s 白噪声
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    return src;
  }

  /** 写 APU 寄存器 */
  writeRegister(addr: number, value: number): void {
    if (!this.ctx) return;
    switch (addr) {
      case 0x4000: this.writePulseControl(this.pulse1, value); break;
      case 0x4001: this.writePulseSweep(this.pulse1, value); break;
      case 0x4002: this.writePulseFreqLo(this.pulse1, value); break;
      case 0x4003: this.writePulseFreqHi(this.pulse1, value); break;
      case 0x4004: this.writePulseControl(this.pulse2, value); break;
      case 0x4005: this.writePulseSweep(this.pulse2, value); break;
      case 0x4006: this.writePulseFreqLo(this.pulse2, value); break;
      case 0x4007: this.writePulseFreqHi(this.pulse2, value); break;
      case 0x4008: this.writeTriangleControl(value); break;
      case 0x400A: this.writePulseFreqLo(this.triangle, value); break;
      case 0x400B: this.writePulseFreqHi(this.triangle, value); break;
      case 0x400C: this.writeNoiseControl(value); break;
      case 0x400E: this.writeNoiseFreq(value); break;
      case 0x4010: /* DPCM 控制 */ break;
      case 0x4012: /* DPCM 地址 */ break;
      case 0x4013: /* DPCM 长度 */ break;
      case 0x4015: this.writeStatus(value); break;
    }
  }

  private writePulseControl(ch: PulseChannel | null, value: number): void {
    if (!ch) return;
    // bit 0-3: 音量/包络；bit 4: 包络标志；bit 5-6: 占空比；bit 7: 长度计数器
    const vol = (value & 0x0F) / 15;
    ch.volume = vol;
    ch.duty = (value >> 6) & 0x03;
    if (value & 0x10) {
      // 使用包络（简化：固定音量）
      ch.gain.gain.value = vol;
    } else {
      ch.gain.gain.value = vol;
    }
  }

  private writePulseSweep(_ch: PulseChannel | null, _value: number): void {
    // 扫描单元（简化：未实现）
  }

  private writePulseFreqLo(ch: PulseChannel | null, value: number): void {
    if (!ch) return;
    ch.freq = (ch.freq & 0xFF00) | value;
    this.updatePulseFreq(ch);
  }

  private writePulseFreqHi(ch: PulseChannel | null, value: number): void {
    if (!ch) return;
    ch.freq = (ch.freq & 0x00FF) | ((value & 0x07) << 8);
    this.updatePulseFreq(ch);
  }

  private updatePulseFreq(ch: PulseChannel): void {
    const hz = apuFreqToHz(ch.freq);
    if (hz > 0 && hz < 20000) {
      ch.oscillator.frequency.value = hz;
    }
  }

  private writeTriangleControl(value: number): void {
    if (!this.triangle) return;
    // Triangle 通道：bit 0-7 控制音量/长度
    const vol = (value & 0x7F) / 127;
    this.triangle.gain.gain.value = vol * 0.5; // Triangle 音量较低
  }

  private writeNoiseControl(value: number): void {
    if (!this.noiseGain) return;
    const vol = (value & 0x0F) / 15;
    this.noiseGain.gain.value = vol * 0.3;
  }

  private writeNoiseFreq(value: number): void {
    // Noise 频率（简化：未实现频率变化）
    void value;
  }

  private writeStatus(value: number): void {
    this.enabled = value;
    // 通道使能/禁用
    if (this.pulse1) this.pulse1.gain.gain.value = (value & 0x01) ? this.pulse1.volume : 0;
    if (this.pulse2) this.pulse2.gain.gain.value = (value & 0x02) ? this.pulse2.volume : 0;
    if (this.triangle) this.triangle.gain.gain.value = (value & 0x04) ? this.triangle.volume * 0.5 : 0;
    if (this.noiseGain) this.noiseGain.gain.value = (value & 0x08) ? this.noiseGain.gain.value : 0;
  }

  /** 暂停音频 */
  suspend(): void {
    this.ctx?.suspend();
  }

  /** 恢复音频 */
  async resume(): Promise<void> {
    await this.ctx?.resume();
  }

  /** 销毁 */
  dispose(): void {
    this.pulse1?.oscillator.stop();
    this.pulse2?.oscillator.stop();
    this.triangle?.oscillator.stop();
    this.noiseSrc?.stop();
    this.ctx?.close();
    this.ctx = null;
  }
}
