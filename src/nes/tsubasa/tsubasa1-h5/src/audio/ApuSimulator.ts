/**
 * ApuSimulator - NES APU 模拟器 (Web Audio API)
 * 
 * 将 NES APU 5通道 (Pulse 1/2, Triangle, Noise, DMC) 
 * 映射到 Web Audio API 的 OscillatorNode + AudioBufferSourceNode
 * 
 * NES APU 寄存器映射:
 * Pulse 1: $4000(duty/vol/env) $4001(sweep) $4002(periodL) $4003(periodH+length)
 * Pulse 2: $4004-$4007 (同上)
 * Triangle: $4008(linear) $400A(periodL) $400B(periodH+length)
 * Noise:    $400C(vol/env) $400E(period+mode) $400F(length)
 * DMC:      $4010(irq/loop/freq) $4011(dac) $4012(addr) $4013(length)
 * Status:   $4015 (channel enable flags)
 * 
 * 对应 Bank 1 音频引擎 ($9B00-$9FFF)
 */

// APU 寄存器地址
export const APU_REG = {
  // Pulse 1
  PULSE1_DUTY:  0x4000,
  PULSE1_SWEEP: 0x4001,
  PULSE1_TIMER: 0x4002, // 低8位
  PULSE1_LENGTH:0x4003, // 高3位 + length counter
  // Pulse 2
  PULSE2_DUTY:  0x4004,
  PULSE2_SWEEP: 0x4005,
  PULSE2_TIMER: 0x4006,
  PULSE2_LENGTH:0x4007,
  // Triangle
  TRI_LINEAR:   0x4008,
  TRI_UNUSED:   0x4009, // 未使用
  TRI_TIMER:    0x400A,
  TRI_LENGTH:   0x400B,
  // Noise
  NOISE_VOL:    0x400C,
  NOISE_UNUSED: 0x400D, // 未使用
  NOISE_PERIOD: 0x400E,
  NOISE_LENGTH: 0x400F,
  // DMC
  DMC_FREQ:     0x4010,
  DMC_DAC:      0x4011,
  DMC_ADDR:     0x4012,
  DMC_LENGTH:   0x4013,
  // OAM DMA (非音频)
  OAM_DMA:      0x4014,
  // APU Status
  APU_STATUS:   0x4015,
  // Controller + Frame Counter
  JOY1:         0x4016,
  JOY2_FRAME:   0x4017,
} as const;

// APU_STATUS ($4015) 位标志
export const APU_STATUS_FLAGS = {
  PULSE1:    0x01,
  PULSE2:    0x02,
  TRIANGLE:  0x04,
  NOISE:     0x08,
  DMC:       0x10,
} as const;

// 通道类型
export enum ApuChannel {
  PULSE1 = 0,
  PULSE2 = 1,
  TRIANGLE = 2,
  NOISE = 3,
  DMC = 4,
}

// NES CPU 时钟频率
const CPU_CLOCK = 1789773; // NTSC

// 标准音高频率表 (A4=440Hz, 用于 NES period → Hz 转换)
// NES Pulse: f = CPU_CLOCK / (16 * (period + 1))
// NES Triangle: f = CPU_CLOCK / (32 * (period + 1))
// NES Noise: f = CPU_CLOCK / (period_table[period])

const NOISE_PERIOD_TABLE: number[] = [
  4, 8, 16, 32, 64, 96, 128, 160, 202, 254, 380, 508, 762, 1016, 2034, 4068,
];

// Duty cycle 波形表 (Pulse 通道)
// 0: 12.5%, 1: 25%, 2: 50%, 3: 75%
const DUTY_TABLE: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // 12.5% -> 反转
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 25%
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // 50%
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 75%
];

/** Web Audio API 抽象接口（兼容微信小程序） */
import type {
  IPlatformAudioContext as IAudioContext,
  IPlatformOscillatorNode as IOscillatorNode,
  IPlatformGainNode as IGainNode,
  IPlatformBufferSourceNode as IBufferSourceNode,
  IPlatformAudioBuffer as IAudioBuffer,
  IPlatformAudioNode as IAudioNode,
  IPlatformAudioDestination as IAudioDestination,
} from '../platform/IPlatform';

/** APU 通道状态 */
interface ChannelState {
  enabled: boolean;
  // Pulse 通道专用
  dutyCycle: number;     // $4000/$4004 bit6-7
  volume: number;        // $4000/$4004 bit0-3 (或 envelope 标志)
  envelope: boolean;     // $4000/$4004 bit4 (envelope disabled = constant volume)
  envelopePeriod: number; // $4000/$4004 bit0-3 (envelope period)
  lengthCounter: number; // $4003/$4007 bit3-7
  // Sweep (仅 Pulse 1/2)
  sweepEnabled: boolean;
  sweepPeriod: number;
  sweepNegate: boolean;
  sweepShift: number;
  // 频率
  period: number;        // 11-bit period (timer)
  frequency: number;     // 计算后的 Hz 值
  // Triangle 专用
  linearCounter: number;
  linearCounterReload: boolean;
  // Noise 专用
  noiseMode: boolean;    // $400E bit7 (0=long, 1=short)
  noisePeriod: number;   // $400E bit0-3
  // 内部状态
  envelopeValue: number;
  envelopeCounter: number;
  sweepCounter: number;
  oscillator: IOscillatorNode | null;
  bufferSource: IBufferSourceNode | null;
  gainNode: IGainNode | null;
}

/**
 * NES APU 模拟器
 * 使用 Web Audio API 模拟 NES 5通道音频
 */
export class ApuSimulator {
  private ctx: IAudioContext;
  private masterGain: IGainNode;
  private channels: ChannelState[] = [];
  private apuStatus: number = 0x00; // $4015
  private frameCounterMode: number = 0; // $4017 bit6-7

  // 4-step frame sequencer
  private frameStep: number = 0;
  private cpuCycles: number = 0;
  private cyclesPerFrame: number = Math.floor(CPU_CLOCK / 60); // ~29829

  // 噪声缓冲区
  private noiseBuffer: IAudioBuffer | null = null;
  private noiseData: Float32Array | null = null;

  constructor(ctx: IAudioContext) {
    this.ctx = ctx;
    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = 0.5; // 主音量
    this.masterGain.connect(ctx.destination);

    // 初始化 4 个通道 (不包括 DMC，DMC 暂不实现)
    for (let i = 0; i < 4; i++) {
      this.channels.push(this.createChannelState());
    }
  }

  /** 创建通道初始状态 */
  private createChannelState(): ChannelState {
    return {
      enabled: false,
      dutyCycle: 0,
      volume: 0,
      envelope: false,
      envelopePeriod: 0,
      lengthCounter: 0,
      sweepEnabled: false,
      sweepPeriod: 0,
      sweepNegate: false,
      sweepShift: 0,
      period: 0,
      frequency: 0,
      linearCounter: 0,
      linearCounterReload: false,
      noiseMode: false,
      noisePeriod: 0,
      envelopeValue: 0,
      envelopeCounter: 0,
      sweepCounter: 0,
      oscillator: null,
      bufferSource: null,
      gainNode: null,
    };
  }

  /** 写入 APU 寄存器 (对应 ASM $4000-$4013 STA) */
  writeRegister(address: number, value: number): void {
    switch (address) {
      // Pulse 1 ($4000-$4003)
      case APU_REG.PULSE1_DUTY:
        this.writePulseDuty(0, value);
        break;
      case APU_REG.PULSE1_SWEEP:
        this.writePulseSweep(0, value);
        break;
      case APU_REG.PULSE1_TIMER:
        this.writePulseTimerLow(0, value);
        break;
      case APU_REG.PULSE1_LENGTH:
        this.writePulseTimerHigh(0, value);
        break;

      // Pulse 2 ($4004-$4007)
      case APU_REG.PULSE2_DUTY:
        this.writePulseDuty(1, value);
        break;
      case APU_REG.PULSE2_SWEEP:
        this.writePulseSweep(1, value);
        break;
      case APU_REG.PULSE2_TIMER:
        this.writePulseTimerLow(1, value);
        break;
      case APU_REG.PULSE2_LENGTH:
        this.writePulseTimerHigh(1, value);
        break;

      // Triangle ($4008, $400A-$400B)
      case APU_REG.TRI_LINEAR:
        this.writeTriangleLinear(value);
        break;
      case APU_REG.TRI_TIMER:
        this.writeTriangleTimerLow(value);
        break;
      case APU_REG.TRI_LENGTH:
        this.writeTriangleTimerHigh(value);
        break;

      // Noise ($400C, $400E-$400F)
      case APU_REG.NOISE_VOL:
        this.writeNoiseVol(value);
        break;
      case APU_REG.NOISE_PERIOD:
        this.writeNoisePeriod(value);
        break;
      case APU_REG.NOISE_LENGTH:
        this.writeNoiseLength(value);
        break;

      // APU Status ($4015)
      case APU_REG.APU_STATUS:
        this.writeApuStatus(value);
        break;

      // Frame Counter ($4017)
      case APU_REG.JOY2_FRAME:
        this.writeFrameCounter(value);
        break;

      default:
        // DMC registers / unused - skip for now
        break;
    }
  }

  /** 读取 APU 寄存器值 (调试用) */
  readRegister(address: number): number {
    if (address === APU_REG.APU_STATUS) {
      // 返回各通道实际活跃状态
      let status = 0;
      if (this.channels[0].enabled) status |= APU_STATUS_FLAGS.PULSE1;
      if (this.channels[1].enabled) status |= APU_STATUS_FLAGS.PULSE2;
      if (this.channels[2].enabled) status |= APU_STATUS_FLAGS.TRIANGLE;
      if (this.channels[3].enabled) status |= APU_STATUS_FLAGS.NOISE;
      return status;
    }
    return 0;
  }

  // ========== Pulse 通道 (0/1) 写入 ==========

  /** $4000/$4004: Duty cycle + 音量/包络 */
  private writePulseDuty(ch: number, value: number): void {
    const cs = this.channels[ch];
    cs.dutyCycle = (value >> 6) & 0x03;
    cs.envelope = (value & 0x10) !== 0;
    cs.envelopePeriod = value & 0x0F;
    if (!cs.envelope) {
      cs.volume = value & 0x0F;
    }
  }

  /** $4001/$4005: Sweep */
  private writePulseSweep(ch: number, value: number): void {
    const cs = this.channels[ch];
    cs.sweepEnabled = (value & 0x80) !== 0;
    cs.sweepPeriod = ((value >> 4) & 0x07) + 1;
    cs.sweepNegate = (value & 0x08) !== 0;
    cs.sweepShift = value & 0x07;
  }

  /** $4002/$4006: Timer 低8位 */
  private writePulseTimerLow(ch: number, value: number): void {
    const cs = this.channels[ch];
    cs.period = (cs.period & 0x0700) | value;
    this.updatePulseFreq(ch);
  }

  /** $4003/$4007: Timer 高3位 + Length counter */
  private writePulseTimerHigh(ch: number, value: number): void {
    const cs = this.channels[ch];
    cs.period = (cs.period & 0x00FF) | ((value & 0x07) << 8);
    cs.lengthCounter = (value >> 3) & 0x1F;

    // 如果通道启用，重新触发
    if (this.apuStatus & (1 << ch)) {
      cs.enabled = true;
      this.ensureChannelActive(ch, 'square');
    }

    this.updatePulseFreq(ch);
  }

  /** 更新 Pulse 通道频率 */
  private updatePulseFreq(ch: number): void {
    const cs = this.channels[ch];
    if (cs.period > 0) {
      cs.frequency = CPU_CLOCK / (16 * (cs.period + 1));
    } else {
      cs.frequency = 0;
    }
    if (cs.oscillator) {
      cs.oscillator.frequency.setValueAtTime(
        Math.max(cs.frequency, 20),
        this.ctx.currentTime
      );
    }
  }

  // ========== Triangle 通道写入 ==========

  /** $4008: Linear counter */
  private writeTriangleLinear(value: number): void {
    const cs = this.channels[2];
    cs.linearCounterReload = (value & 0x80) !== 0;
    cs.linearCounter = value & 0x7F;
  }

  /** $400A: Timer 低8位 */
  private writeTriangleTimerLow(value: number): void {
    const cs = this.channels[2];
    cs.period = (cs.period & 0x0700) | value;
    this.updateTriangleFreq();
  }

  /** $400B: Timer 高3位 + Length counter */
  private writeTriangleTimerHigh(value: number): void {
    const cs = this.channels[2];
    cs.period = (cs.period & 0x00FF) | ((value & 0x07) << 8);
    cs.lengthCounter = (value >> 3) & 0x1F;

    if (this.apuStatus & APU_STATUS_FLAGS.TRIANGLE) {
      cs.enabled = true;
      this.ensureChannelActive(2, 'triangle');
    }

    this.updateTriangleFreq();
  }

  /** 更新 Triangle 通道频率 */
  private updateTriangleFreq(): void {
    const cs = this.channels[2];
    if (cs.period > 0) {
      cs.frequency = CPU_CLOCK / (32 * (cs.period + 1));
    } else {
      cs.frequency = 0;
    }
    if (cs.oscillator) {
      cs.oscillator.frequency.setValueAtTime(
        Math.max(cs.frequency, 20),
        this.ctx.currentTime
      );
    }
  }

  // ========== Noise 通道写入 ==========

  /** $400C: Volume/Envelope */
  private writeNoiseVol(value: number): void {
    const cs = this.channels[3];
    cs.envelope = (value & 0x10) !== 0;
    cs.envelopePeriod = value & 0x0F;
    if (!cs.envelope) {
      cs.volume = value & 0x0F;
    }
  }

  /** $400E: Period + Mode */
  private writeNoisePeriod(value: number): void {
    const cs = this.channels[3];
    cs.noiseMode = (value & 0x80) !== 0;
    cs.noisePeriod = value & 0x0F;
    // 噪声频率固定，只需确保通道活跃
    this.ensureNoiseActive();
  }

  /** $400F: Length counter */
  private writeNoiseLength(value: number): void {
    const cs = this.channels[3];
    cs.lengthCounter = (value >> 3) & 0x1F;

    if (this.apuStatus & APU_STATUS_FLAGS.NOISE) {
      cs.enabled = true;
      this.ensureNoiseActive();
    }
  }

  // ========== APU Status ($4015) ==========

  /** $4015: 通道启用/禁用 */
  private writeApuStatus(value: number): void {
    this.apuStatus = value;

    // Pulse 1
    this.setChannelEnabled(0, (value & APU_STATUS_FLAGS.PULSE1) !== 0, 'square');
    // Pulse 2
    this.setChannelEnabled(1, (value & APU_STATUS_FLAGS.PULSE2) !== 0, 'square');
    // Triangle
    this.setChannelEnabled(2, (value & APU_STATUS_FLAGS.TRIANGLE) !== 0, 'triangle');
    // Noise
    this.setChannelEnabled(3, (value & APU_STATUS_FLAGS.NOISE) !== 0, 'noise');
  }

  /** 设置通道启用状态 */
  private setChannelEnabled(ch: number, enabled: boolean, waveType: OscillatorType): void {
    const cs = this.channels[ch];
    if (enabled && !cs.enabled) {
      cs.enabled = true;
      this.ensureChannelActive(ch, waveType);
    } else if (!enabled && cs.enabled) {
      cs.enabled = false;
      this.stopChannel(ch);
    }
  }

  // ========== Frame Counter ($4017) ==========

  /** $4017: Frame counter 模式 */
  private writeFrameCounter(value: number): void {
    this.frameCounterMode = (value >> 6) & 0x03;
    this.frameStep = 0;
  }

  // ========== 通道管理 ==========

  /** 确保通道音频节点活跃 */
  private ensureChannelActive(ch: number, waveType: OscillatorType): void {
    const cs = this.channels[ch];
    if (cs.oscillator || cs.bufferSource) return; // 已活跃

    if (ch === 3) {
      // Noise 通道
      this.ensureNoiseActive();
    } else {
      // Pulse/Triangle 通道
      const osc = this.ctx.createOscillator();
      osc.type = waveType;
      osc.frequency.value = cs.frequency > 0 ? cs.frequency : 440;

      const gain = this.ctx.createGain();
      gain.gain.value = this.getChannelGain(ch);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();

      cs.oscillator = osc;
      cs.gainNode = gain;
    }
  }

  /** 确保噪声通道活跃 */
  private ensureNoiseActive(): void {
    const cs = this.channels[3];
    if (cs.bufferSource) return;

    // 创建噪声缓冲区 (1秒白噪声)
    if (!this.noiseBuffer) {
      const sampleRate = this.ctx.sampleRate;
      const length = sampleRate; // 1秒
      this.noiseBuffer = this.ctx.createBuffer(1, length, sampleRate);
      this.noiseData = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < length; i++) {
        this.noiseData[i] = Math.random() * 2 - 1;
      }
    }

    const source = this.ctx.createBufferSource();
    source.buffer = this.noiseBuffer;
    source.loop = true;

    const gain = this.ctx.createGain();
    gain.gain.value = this.getChannelGain(3);

    source.connect(gain);
    gain.connect(this.masterGain);
    source.start();

    cs.bufferSource = source;
    cs.gainNode = gain;
  }

  /** 停止通道 */
  private stopChannel(ch: number): void {
    const cs = this.channels[ch];
    if (cs.oscillator) {
      try { cs.oscillator.stop(); } catch (_) { /* 忽略已停止的错误 */ }
      cs.oscillator = null;
    }
    if (cs.bufferSource) {
      try { cs.bufferSource.stop(); } catch (_) { /* 忽略 */ }
      cs.bufferSource = null;
    }
    if (cs.gainNode) {
      cs.gainNode.disconnect();
      cs.gainNode = null;
    }
  }

  /** 获取通道当前增益值 */
  private getChannelGain(ch: number): number {
    const cs = this.channels[ch];
    if (cs.envelope) {
      // 使用包络值
      return cs.envelopeValue / 15 * 0.5;
    }
    // 使用恒定音量
    return cs.volume / 15 * 0.5;
  }

  /** 更新通道增益 */
  updateChannelGain(ch: number): void {
    const cs = this.channels[ch];
    if (cs.gainNode) {
      cs.gainNode.gain.value = this.getChannelGain(ch);
    }
  }

  // ========== 帧更新 (每帧调用一次，对应 $9B00) ==========

  /** 每帧更新 (对应 NES APU frame sequencer) */
  updateFrame(): void {
    // 模拟 4-step frame sequencer (~240Hz)
    // 在实际实现中，每帧(NMI)更新一次包络和长度计数器
    this.cpuCycles += this.cyclesPerFrame;
    const stepsPerFrame = 4;
    for (let s = 0; s < stepsPerFrame; s++) {
      this.frameStep = (this.frameStep + 1) % 4;
      this.stepEnvelopes();
      if (this.frameStep === 1 || this.frameStep === 3) {
        this.stepLengthCounters();
      }
    }
  }

  /** 步进包络 */
  private stepEnvelopes(): void {
    for (let ch = 0; ch < 4; ch++) {
      const cs = this.channels[ch];
      if (!cs.enabled) continue;
      if (cs.envelopePeriod === 0) continue;

      cs.envelopeCounter--;
      if (cs.envelopeCounter <= 0) {
        cs.envelopeCounter = cs.envelopePeriod;
        if (cs.envelopeValue > 0) {
          cs.envelopeValue--;
        } else if (cs.envelope) {
          // 包络循环: $4000 bit5 (length counter halt) 控制
          // 简化: 如果 length counter > 0 则重置
          if (cs.lengthCounter > 0) {
            cs.envelopeValue = 15;
          }
        }
        this.updateChannelGain(ch);
      }
    }
  }

  /** 步进长度计数器 */
  private stepLengthCounters(): void {
    for (let ch = 0; ch < 4; ch++) {
      const cs = this.channels[ch];
      if (!cs.enabled) continue;
      if (cs.lengthCounter > 0) {
        cs.lengthCounter--;
        if (cs.lengthCounter === 0) {
          cs.enabled = false;
          this.stopChannel(ch);
        }
      }
    }
  }

  // ========== 公共接口 ==========

  /** 主音量 (0.0-1.0) */
  setMasterVolume(vol: number): void {
    this.masterGain.gain.value = Math.max(0, Math.min(1, vol));
  }

  /** 静音 */
  mute(): void {
    this.masterGain.gain.value = 0;
  }

  /** 取消静音 */
  unmute(): void {
    this.masterGain.gain.value = 0.5;
  }

  /** 停止所有音频并清理资源 */
  destroy(): void {
    for (let ch = 0; ch < 4; ch++) {
      this.stopChannel(ch);
    }
    this.masterGain.disconnect();
    this.noiseBuffer = null;
    this.noiseData = null;
  }

  /** 获取 APU 状态 (调试) */
  getStatus(): { channels: Array<{ enabled: boolean; freq: number; volume: number }> } {
    return {
      channels: this.channels.map(cs => ({
        enabled: cs.enabled,
        freq: cs.frequency,
        volume: cs.envelope ? cs.envelopeValue / 15 : cs.volume / 15,
      })),
    };
  }
}
