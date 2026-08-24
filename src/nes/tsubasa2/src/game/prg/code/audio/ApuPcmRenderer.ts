/**
 * ApuPcmRenderer — NES APU PCM 波形合成器
 *
 * 把 ApuTarget 的寄存器写合成为 PCM 采样，用于 WAV 渲染。
 * 模拟 NES APU 的 4 个通道：
 *   Pulse1/Pulse2: 方波，频率 = 1789773 / (16 * (freq+1))
 *   Triangle: 三角波，频率 = 1789773 / (32 * (freq+1))
 *   Noise: 伪随机噪声
 *   DPCM: delta 调制采样（暂未实现）
 *
 * 每个 CPU 周期产生一个采样，60fps × 29780 周期/帧
 */
export interface ApuPcmRenderer {
  /** 处理一个 APU 寄存器写 */
  writeRegister(addr: number, value: number): void;
  /** 生成一帧（1/60 秒）的 PCM 采样 */
  renderFrame(): Float32Array;
}

/** NES CPU 时钟频率 */
const CPU_CLOCK = 1789773;
/** 每帧 CPU 周期数（NTSC） */
const CYCLES_PER_FRAME = 29780;
/** 采样率 */
const SAMPLE_RATE = 44100;

interface PulseChannel {
  enabled: boolean;
  duty: number;       // 0-3 占空比模式
  volume: number;     // 0-15
  envelopeMode: boolean;
  freq: number;       // 11-bit 频率值
  phase: number;      // 波形相位累加器
  sweepEnabled: boolean;
  sweepNegate: boolean;
  sweepShift: number;
  sweepPeriod: number;
  sweepTimer: number;
}

interface TriangleChannel {
  enabled: boolean;
  freq: number;
  phase: number;
  linearCounter: number;
}

interface NoiseChannel {
  enabled: boolean;
  volume: number;
  envelopeMode: boolean;
  period: number;     // 噪声周期索引
  shiftRegister: number;  // 15-bit LFSR
  timer: number;
}

const DUTY_TABLE = [
  [0, 1, 0, 0, 0, 0, 0, 0],  // 12.5%
  [0, 1, 1, 0, 0, 0, 0, 0],  // 25%
  [0, 1, 1, 1, 1, 0, 0, 0],  // 50%
  [1, 0, 0, 1, 1, 1, 1, 1],  // 25% negated
];

const NOISE_PERIOD_TABLE = [
  4, 8, 16, 32, 64, 96, 128, 160, 202, 254, 380, 508, 762, 1016, 2034, 4068,
];

export class ApuPcmRendererImpl implements ApuPcmRenderer {
  private pulse1: PulseChannel = this.createPulse();
  private pulse2: PulseChannel = this.createPulse();
  private triangle: TriangleChannel = { enabled: false, freq: 0, phase: 0, linearCounter: 0 };
  private noise: NoiseChannel = { enabled: false, volume: 0, envelopeMode: false, period: 0, shiftRegister: 1, timer: 0 };
  private statusReg = 0;

  private createPulse(): PulseChannel {
    return {
      enabled: false, duty: 0, volume: 0, envelopeMode: false,
      freq: 0, phase: 0, sweepEnabled: false, sweepNegate: false,
      sweepShift: 0, sweepPeriod: 0, sweepTimer: 0,
    };
  }

  writeRegister(addr: number, value: number): void {
    switch (addr) {
      case 0x4000: this.writePulseCtrl(this.pulse1, value); break;
      case 0x4001: this.writePulseSweep(this.pulse1, value); break;
      case 0x4002: this.pulse1.freq = (this.pulse1.freq & 0xFF00) | value; break;
      case 0x4003: this.pulse1.freq = (this.pulse1.freq & 0x00FF) | ((value & 0x07) << 8); break;
      case 0x4004: this.writePulseCtrl(this.pulse2, value); break;
      case 0x4005: this.writePulseSweep(this.pulse2, value); break;
      case 0x4006: this.pulse2.freq = (this.pulse2.freq & 0xFF00) | value; break;
      case 0x4007: this.pulse2.freq = (this.pulse2.freq & 0x00FF) | ((value & 0x07) << 8); break;
      case 0x4008:
        this.triangle.linearCounter = value & 0x7F;
        this.triangle.enabled = (value & 0x80) !== 0;
        break;
      case 0x400A: this.triangle.freq = (this.triangle.freq & 0xFF00) | value; break;
      case 0x400B: this.triangle.freq = (this.triangle.freq & 0x00FF) | ((value & 0x07) << 8); break;
      case 0x400C:
        this.noise.volume = value & 0x0F;
        this.noise.envelopeMode = (value & 0x10) !== 0;
        break;
      case 0x400E: this.noise.period = value & 0x0F; break;
      case 0x400F: break; // 长度计数器（暂不实现）
      case 0x4015:
        this.statusReg = value;
        this.pulse1.enabled = (value & 0x01) !== 0;
        this.pulse2.enabled = (value & 0x02) !== 0;
        this.triangle.enabled = (value & 0x04) !== 0;
        this.noise.enabled = (value & 0x08) !== 0;
        break;
    }
  }

  private writePulseCtrl(ch: PulseChannel, value: number): void {
    ch.duty = (value >> 6) & 0x03;
    ch.envelopeMode = (value & 0x10) !== 0;
    ch.volume = value & 0x0F;
  }

  private writePulseSweep(ch: PulseChannel, value: number): void {
    ch.sweepEnabled = (value & 0x80) !== 0;
    ch.sweepPeriod = (value >> 4) & 0x07;
    ch.sweepNegate = (value & 0x08) !== 0;
    ch.sweepShift = value & 0x07;
  }

  renderFrame(): Float32Array {
    const samples = new Float32Array(Math.floor(SAMPLE_RATE / 60));
    const cyclesPerSample = CYCLES_PER_FRAME / samples.length;

    let cycleAccum = 0;
    for (let s = 0; s < samples.length; s++) {
      // 每个采样对应 cyclesPerSample 个 CPU 周期
      const cycles = Math.floor(cycleAccum + cyclesPerSample) - Math.floor(cycleAccum);
      cycleAccum += cyclesPerSample;

      let sum = 0;

      // Pulse1
      if (this.pulse1.enabled && this.pulse1.freq > 0) {
        sum += this.renderPulse(this.pulse1, cycles);
      }
      // Pulse2
      if (this.pulse2.enabled && this.pulse2.freq > 0) {
        sum += this.renderPulse(this.pulse2, cycles);
      }
      // Triangle
      if (this.triangle.enabled && this.triangle.freq > 0) {
        sum += this.renderTriangle(cycles) * 0.5;
      }
      // Noise
      if (this.noise.enabled) {
        sum += this.renderNoise(cycles) * 0.3;
      }

      samples[s] = Math.max(-1, Math.min(1, sum));
    }
    return samples;
  }

  private renderPulse(ch: PulseChannel, cycles: number): number {
    if (ch.freq === 0) return 0;
    const period = 16 * (ch.freq + 1);
    ch.phase += cycles / period * 8;
    ch.phase %= 8;
    const wave = DUTY_TABLE[ch.duty][Math.floor(ch.phase)];
    const vol = ch.envelopeMode ? ch.volume / 15 : ch.volume / 15;
    return wave * vol * 0.3;
  }

  private renderTriangle(cycles: number): number {
    const period = 32 * (this.triangle.freq + 1);
    this.triangle.phase += cycles / period * 32;
    this.triangle.phase %= 32;
    const step = Math.floor(this.triangle.phase);
    // 三角波：0→15→0
    if (step < 16) return step / 15;
    return (31 - step) / 15;
  }

  private renderNoise(cycles: number): number {
    const period = NOISE_PERIOD_TABLE[this.noise.period] || 8;
    this.noise.timer += cycles;
    let sample = 0;
    while (this.noise.timer >= period) {
      this.noise.timer -= period;
      // LFSR: bit 0 = (bit 0 XOR bit 6) shifted in
      const bit = (this.noise.shiftRegister & 1) ^ ((this.noise.shiftRegister >> 6) & 1);
      this.noise.shiftRegister = (this.noise.shiftRegister >> 1) | (bit << 14);
    }
    const vol = this.noise.envelopeMode ? this.noise.volume / 15 : this.noise.volume / 15;
    sample = (this.noise.shiftRegister & 1) ? vol : -vol;
    return sample;
  }
}