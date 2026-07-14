/**
 * YM2612 (OPN2) FM Sound Chip Emulator - Memory-Mapped Version
 * 
 * 基于 Z80 驱动反汇编结果实现，使用内存映射访问而非 IN/OUT 指令
 * 
 * Z80 驱动中的 YM2612 内存映射:
 *   $4000: Port 0 地址寄存器 (Channel 0-2)
 *   $4001: Port 0 数据寄存器
 *   $4002: Port 1 地址寄存器 (Channel 3-5)
 *   $4003: Port 1 数据寄存器
 * 
 * 写入流程:
 *   1. LD A, register_address
 *   2. LD ($4000), A      ; 设置地址
 *   3. LD A, data
 *   4. LD ($4001), A      ; 写入数据
 * 
 * 寄存器地址格式:
 *   Bit 11-8: 通道号 (0-2 for Port 0, 0-2 for Port 1 -> channel 3-5)
 *   Bit 7: 未使用
 *   Bit 6-4: 寄存器类型
 *   Bit 3-2: 操作器号 (0-3)
 *   Bit 1-0: 未使用
 */

export class YM2612 {
  static readonly CLOCK_FREQ = 7670454;
  static readonly FM_CHANNELS = 6;
  static readonly SSG_CHANNELS = 4;
  
  private regs = new Uint8Array(0x1000);
  
  private port0Addr = 0;
  private port1Addr = 0;
  
  private fmChannels = new Array<FMChannel>(YM2612.FM_CHANNELS);
  private ssgChannels = new Array<SSGChannel>(YM2612.SSG_CHANNELS);
  
  private lfo = new LFO();
  private pcm = new PCMChannel();
  
  private panReg = new Uint8Array(YM2612.FM_CHANNELS);
  private muteReg = 0;
  
  private sampleRate = 44100;
  private cycleAccum = 0;
  private cycleStep = YM2612.CLOCK_FREQ / 44100;
  
  private outputBuffer: Float32Array;
  private outputIdx = 0;
  
  constructor(sampleRate: number = 44100) {
    this.sampleRate = sampleRate;
    this.cycleStep = YM2612.CLOCK_FREQ / sampleRate;
    this.outputBuffer = new Float32Array(sampleRate * 2);
    
    for (let i = 0; i < YM2612.FM_CHANNELS; i++) {
      this.fmChannels[i] = new FMChannel(i);
    }
    for (let i = 0; i < YM2612.SSG_CHANNELS; i++) {
      this.ssgChannels[i] = new SSGChannel(i);
    }
  }
  
  write(addr: number, data: number): void {
    data = data & 0xFF;
    this.regs[addr & 0xFFF] = data;
    
    switch (addr & 0xFFFF) {
      case 0x4000:
        this.port0Addr = data;
        break;
        
      case 0x4001:
        this.writeFMData(0, this.port0Addr, data);
        break;
        
      case 0x4002:
        this.port1Addr = data;
        break;
        
      case 0x4003:
        this.writeFMData(1, this.port1Addr, data);
        break;
        
      case 0x4004:
        this.lfo.writeReg(0, data);
        break;
        
      case 0x4005:
        this.lfo.writeReg(1, data);
        break;
        
      case 0x4006:
        this.pcm.writeAddr(data);
        break;
        
      case 0x4007:
        this.pcm.writeData(data);
        break;
        
      case 0x400B:
        this.muteReg = data;
        for (let i = 0; i < YM2612.FM_CHANNELS; i++) {
          this.panReg[i] = (data >> (i * 2)) & 0x03;
        }
        break;
    }
  }
  
  read(addr: number): number {
    switch (addr & 0xFFFF) {
      case 0x4000: return this.port0Addr;
      case 0x4001: return 0;
      case 0x4002: return this.port1Addr;
      case 0x4003: return 0;
      default: return this.regs[addr & 0xFFF];
    }
  }
  
  private writeFMData(port: number, addr: number, data: number): void {
    const channelAddr = addr & 0x7F;
    
    if (channelAddr < 0x30) {
      this.writeSSGData(channelAddr, data);
      return;
    }
    
    const chanBase = port === 0 ? 0 : 3;
    const chan = chanBase + ((channelAddr >> 4) & 0x03);
    
    if (chan >= YM2612.FM_CHANNELS) return;
    
    const op = (channelAddr >> 2) & 0x03;
    const regType = (channelAddr >> 4) & 0x1F;
    
    const ch = this.fmChannels[chan];
    
    switch (regType) {
      case 0x03: ch.setMult(op, data); break;
      case 0x04: ch.setDetune(op, data); break;
      case 0x05: ch.setTotalLevel(op, data); break;
      case 0x06: ch.setRateScale(op, data); break;
      case 0x07: ch.setAttackRate(op, data); break;
      case 0x08: ch.setDecayRate(op, data); break;
      case 0x09: ch.setSustainRate(op, data); break;
      case 0x0A: ch.setReleaseRate(op, data); break;
      case 0x0B: ch.setSustainLevel(op, data); break;
      case 0x0C: ch.setWaveform(op, data); break;
      case 0x0D: ch.setFeedback(op, data); break;
      case 0x0E: ch.setAlgorithm(op, data); break;
      case 0x0F: ch.setLFO(op, data); break;
      case 0x10: ch.setPan(op, data); break;
      case 0x11: ch.keyOn(op, data); break;
    }
    
    if ((channelAddr >= 0x40 && channelAddr <= 0x5F)) {
      const opChannel = channelAddr & 0x0F;
      if ((opChannel & 0x01) === 0) {
        ch.setFNumberLow(opChannel >> 2, data);
      } else {
        ch.setFNumberHigh(opChannel >> 2, data);
        ch.setBlock(opChannel >> 2, data);
        const keyOn = (data >> 7) & 0x01;
        if (keyOn) {
          ch.keyOn(opChannel >> 2, 0x0F);
        } else {
          ch.keyOn(opChannel >> 2, 0xF0);
        }
      }
    }
  }
  
  private writeSSGData(addr: number, data: number): void {
    const ssgChan = (addr >> 3) & 0x03;
    const ssgReg = addr & 0x07;
    
    if (ssgChan >= YM2612.SSG_CHANNELS) return;
    
    const ch = this.ssgChannels[ssgChan];
    
    switch (ssgReg) {
      case 0:
      case 1:
      case 2:
      case 3:
        ch.freq = (ch.freq & 0xFF00) | data;
        ch.freq = this.ssgFreqToHz(ch.freq);
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        ch.freq = (ch.freq & 0x00FF) | ((data & 0x0F) << 8);
        ch.freq = this.ssgFreqToHz(ch.freq);
        break;
      case 8:
      case 9:
      case 10:
      case 11:
        ch.volume = data & 0x0F;
        ch.waveform = (data >> 4) & 0x03;
        break;
    }
  }
  
  private ssgFreqToHz(freq: number): number {
    return YM2612.CLOCK_FREQ / (32 * (freq + 1));
  }
  
  update(samples: number): Float32Array {
    if (samples > this.outputBuffer.length) {
      this.outputBuffer = new Float32Array(samples * 2);
    }
    
    this.outputIdx = 0;
    
    for (let i = 0; i < samples; i++) {
      this.cycleAccum += this.cycleStep;
      
      while (this.cycleAccum >= 1) {
        this.cycleAccum -= 1;
        this.tick();
      }
      
      let left = 0, right = 0;
      
      for (let ch = 0; ch < YM2612.FM_CHANNELS; ch++) {
        if (!(this.muteReg & (1 << ch))) {
          const sample = this.fmChannels[ch].getSample();
          const pan = this.panReg[ch];
          if (pan & 0x01) left += sample;
          if (pan & 0x02) right += sample;
        }
      }
      
      for (let ch = 0; ch < YM2612.SSG_CHANNELS; ch++) {
        const sample = this.ssgChannels[ch].getSample();
        left += sample * 0.3;
        right += sample * 0.3;
      }
      
      left += this.pcm.getSample() * 0.5;
      right += this.pcm.getSample() * 0.5;
      
      left = Math.max(-1, Math.min(1, left));
      right = Math.max(-1, Math.min(1, right));
      
      this.outputBuffer[this.outputIdx++] = left;
      this.outputBuffer[this.outputIdx++] = right;
    }
    
    return this.outputBuffer.subarray(0, samples * 2);
  }
  
  private tick(): void {
    this.lfo.tick();
    
    for (const ch of this.fmChannels) {
      ch.tick(this.lfo.getValue());
    }
    
    for (const ch of this.ssgChannels) {
      ch.tick();
    }
    
    this.pcm.tick();
  }
  
  reset(): void {
    this.regs.fill(0);
    this.port0Addr = 0;
    this.port1Addr = 0;
    this.cycleAccum = 0;
    this.outputIdx = 0;
    
    for (const ch of this.fmChannels) ch.reset();
    for (const ch of this.ssgChannels) ch.reset();
    this.lfo.reset();
    this.pcm.reset();
  }
}

class FMChannel {
  private operators = new Array<Operator>(4);
  private algorithm = 0;
  private feedback = 0;
  private lfoEnabled = false;
  private pan = 3;
  
  private phase = 0;
  private freq = 0;
  
  constructor(public readonly index: number) {
    for (let i = 0; i < 4; i++) {
      this.operators[i] = new Operator(i);
    }
  }
  
  setFNumberLow(op: number, data: number): void {
    if (op === 0) {
      this.operators[0].fNumber = (this.operators[0].fNumber & 0x100) | data;
      this.updateFreq();
    }
  }
  
  setFNumberHigh(op: number, data: number): void {
    if (op === 0) {
      this.operators[0].fNumber = (this.operators[0].fNumber & 0xFF) | ((data & 0x01) << 8);
      this.updateFreq();
    }
  }
  
  setBlock(op: number, data: number): void {
    if (op === 0) {
      this.operators[0].block = data & 0x07;
      this.updateFreq();
    }
  }
  
  setMult(op: number, data: number): void {
    this.operators[op].mult = data & 0x0F;
  }
  
  setDetune(op: number, data: number): void {
    this.operators[op].detune = (data >> 4) & 0x07;
  }
  
  setTotalLevel(op: number, data: number): void {
    this.operators[op].totalLevel = data;
  }
  
  setRateScale(op: number, data: number): void {
    this.operators[op].rateScale = data;
  }
  
  setAttackRate(op: number, data: number): void {
    this.operators[op].attackRate = data;
  }
  
  setDecayRate(op: number, data: number): void {
    this.operators[op].decayRate = data;
  }
  
  setSustainRate(op: number, data: number): void {
    this.operators[op].sustainRate = data;
  }
  
  setReleaseRate(op: number, data: number): void {
    this.operators[op].releaseRate = data;
  }
  
  setSustainLevel(op: number, data: number): void {
    this.operators[op].sustainLevel = data;
  }
  
  setWaveform(op: number, data: number): void {
    this.operators[op].waveform = data & 0x03;
  }
  
  setFeedback(op: number, data: number): void {
    if (op === 0) {
      this.feedback = data & 0x07;
    }
  }
  
  setAlgorithm(op: number, data: number): void {
    if (op === 0) {
      this.algorithm = data & 0x07;
    }
  }
  
  setLFO(op: number, data: number): void {
    if (op === 0) {
      this.lfoEnabled = (data & 0x80) !== 0;
    }
  }
  
  setPan(op: number, data: number): void {
    if (op === 0) {
      this.pan = data & 0x03;
    }
  }
  
  keyOn(op: number, data: number): void {
    if (data & 0x01) this.operators[0].keyOn();
    if (data & 0x02) this.operators[1].keyOn();
    if (data & 0x04) this.operators[2].keyOn();
    if (data & 0x08) this.operators[3].keyOn();
    if (data & 0x10) this.operators[0].keyOff();
    if (data & 0x20) this.operators[1].keyOff();
    if (data & 0x40) this.operators[2].keyOff();
    if (data & 0x80) this.operators[3].keyOff();
  }
  
  private updateFreq(): void {
    const op0 = this.operators[0];
    const fNumber = op0.fNumber;
    const block = op0.block;
    
    const baseFreq = (fNumber / 1024) * 440 * Math.pow(2, block - 7);
    this.freq = baseFreq;
  }
  
  tick(lfoValue: number): void {
    const modFreq = this.lfoEnabled ? this.freq * (1 + lfoValue * 0.01) : this.freq;
    
    for (let i = 0; i < 4; i++) {
      this.operators[i].freq = modFreq * (this.operators[i].mult + 1);
      this.operators[i].tick();
    }
    
    this.phase += modFreq / 44100;
    if (this.phase >= 1) this.phase -= 1;
  }
  
  getSample(): number {
    const opOut = new Float32Array(4);
    
    for (let i = 0; i < 4; i++) {
      opOut[i] = this.operators[i].getSample();
    }
    
    let feedback = 0;
    if (this.feedback > 0) {
      feedback = opOut[0] * (this.feedback / 7);
    }
    
    let result = 0;
    
    switch (this.algorithm) {
      case 0:
        result = opOut[3] * (opOut[2] * (opOut[1] * (opOut[0] + feedback) + opOut[0] + feedback) + opOut[1] * (opOut[0] + feedback));
        break;
      case 1:
        result = opOut[3] * (opOut[2] + opOut[1] * (opOut[0] + feedback));
        break;
      case 2:
        result = opOut[3] * (opOut[2] * (opOut[1] + opOut[0] + feedback));
        break;
      case 3:
        result = opOut[3] + opOut[2] * (opOut[1] * (opOut[0] + feedback));
        break;
      case 4:
        result = (opOut[3] + opOut[2]) * (opOut[1] * (opOut[0] + feedback));
        break;
      case 5:
        result = opOut[3] + opOut[2] + opOut[1] * (opOut[0] + feedback);
        break;
      case 6:
        result = opOut[3] + opOut[2] * (opOut[1] + opOut[0] + feedback);
        break;
      case 7:
        result = opOut[3] + opOut[2] + opOut[1] + opOut[0] + feedback;
        break;
    }
    
    return result * 0.125;
  }
  
  reset(): void {
    for (const op of this.operators) op.reset();
    this.algorithm = 0;
    this.feedback = 0;
    this.lfoEnabled = false;
    this.pan = 3;
    this.phase = 0;
    this.freq = 0;
  }
}

class Operator {
  fNumber = 0;
  block = 0;
  mult = 1;
  detune = 0;
  totalLevel = 0;
  rateScale = 0;
  attackRate = 0;
  decayRate = 0;
  sustainRate = 0;
  releaseRate = 0;
  sustainLevel = 0;
  waveform = 0;
  
  freq = 0;
  phase = 0;
  
  private envState = EnvelopeState.IDLE;
  private envLevel = 0;
  private envTick = 0;
  
  constructor(public readonly index: number) {}
  
  keyOn(): void {
    this.envState = EnvelopeState.ATTACK;
    this.envLevel = 0;
    this.envTick = 0;
  }
  
  keyOff(): void {
    if (this.envState !== EnvelopeState.IDLE) {
      this.envState = EnvelopeState.RELEASE;
    }
  }
  
  tick(): void {
    this.phase += this.freq / 44100;
    if (this.phase >= 1) this.phase -= 1;
    
    this.updateEnvelope();
  }
  
  private updateEnvelope(): void {
    this.envTick++;
    
    switch (this.envState) {
      case EnvelopeState.ATTACK:
        if (this.attackRate === 15) {
          this.envLevel = 1;
          this.envState = EnvelopeState.DECAY;
        } else {
          const inc = Math.pow(2, (15 - this.attackRate) / 2) / 44100;
          this.envLevel += inc;
          if (this.envLevel >= 1) {
            this.envLevel = 1;
            this.envState = EnvelopeState.DECAY;
          }
        }
        break;
        
      case EnvelopeState.DECAY:
        if (this.envLevel > this.sustainLevel / 15) {
          const dec = Math.pow(2, (15 - this.decayRate) / 2) / 44100;
          this.envLevel -= dec;
          if (this.envLevel < this.sustainLevel / 15) {
            this.envLevel = this.sustainLevel / 15;
          }
        }
        if (this.envLevel <= this.sustainLevel / 15) {
          this.envState = EnvelopeState.SUSTAIN;
        }
        break;
        
      case EnvelopeState.SUSTAIN:
        if (this.envLevel > 0) {
          const dec = Math.pow(2, (15 - this.sustainRate) / 2) / 44100;
          this.envLevel -= dec;
          if (this.envLevel < 0) this.envLevel = 0;
        }
        break;
        
      case EnvelopeState.RELEASE:
        if (this.releaseRate === 15) {
          this.envLevel = 0;
          this.envState = EnvelopeState.IDLE;
        } else {
          const dec = Math.pow(2, (15 - this.releaseRate) / 2) / 44100;
          this.envLevel -= dec;
          if (this.envLevel <= 0) {
            this.envLevel = 0;
            this.envState = EnvelopeState.IDLE;
          }
        }
        break;
    }
  }
  
  getSample(): number {
    let wave = 0;
    
    switch (this.waveform) {
      case 0:
        wave = Math.sin(this.phase * Math.PI * 2);
        break;
      case 1:
        wave = this.phase < 0.5 ? 1 : -1;
        break;
      case 2:
        wave = (this.phase * 2 - 1);
        break;
      case 3:
        wave = Math.random() * 2 - 1;
        break;
    }
    
    const level = (1 - this.totalLevel / 127) * this.envLevel;
    return wave * level;
  }
  
  reset(): void {
    this.fNumber = 0;
    this.block = 0;
    this.mult = 1;
    this.detune = 0;
    this.totalLevel = 0;
    this.rateScale = 0;
    this.attackRate = 0;
    this.decayRate = 0;
    this.sustainRate = 0;
    this.releaseRate = 0;
    this.sustainLevel = 0;
    this.waveform = 0;
    this.freq = 0;
    this.phase = 0;
    this.envState = EnvelopeState.IDLE;
    this.envLevel = 0;
    this.envTick = 0;
  }
}

const enum EnvelopeState {
  IDLE,
  ATTACK,
  DECAY,
  SUSTAIN,
  RELEASE,
}

class LFO {
  private freq = 0;
  private amp = 0;
  private enabled = false;
  private phase = 0;
  
  writeReg(reg: number, data: number): void {
    if (reg === 0) {
      this.freq = data & 0x0F;
      this.amp = (data >> 4) & 0x03;
    } else if (reg === 1) {
      this.enabled = (data & 0x80) !== 0;
    }
  }
  
  tick(): void {
    if (this.enabled) {
      const lfoFreq = 0.5 + this.freq * 0.5;
      this.phase += lfoFreq / 44100;
      if (this.phase >= 1) this.phase -= 1;
    }
  }
  
  getValue(): number {
    if (!this.enabled) return 0;
    return Math.sin(this.phase * Math.PI * 2) * this.amp * 0.5;
  }
  
  reset(): void {
    this.freq = 0;
    this.amp = 0;
    this.enabled = false;
    this.phase = 0;
  }
}

class PCMChannel {
  private addr = 0;
  private data = 0;
  private playing = false;
  private sample = 0;
  
  writeAddr(data: number): void {
    this.addr = (this.addr & 0xFF00) | (data & 0xFF);
  }
  
  writeData(data: number): void {
    this.addr = (this.addr & 0x00FF) | ((data & 0x0F) << 8);
    this.playing = (data & 0x80) !== 0;
    this.sample = 0;
  }
  
  tick(): void {
    if (this.playing) {
      this.sample += 0.01;
      if (this.sample >= 1) this.sample = 0;
    }
  }
  
  getSample(): number {
    if (!this.playing) return 0;
    return Math.sin(this.sample * Math.PI * 2) * 0.3;
  }
  
  reset(): void {
    this.addr = 0;
    this.data = 0;
    this.playing = false;
    this.sample = 0;
  }
}

class SSGChannel {
  private freq = 0;
  private phase = 0;
  private volume = 0;
  private waveform = 0;
  
  constructor(public readonly index: number) {}
  
  tick(): void {
    this.phase += this.freq / 44100;
    if (this.phase >= 1) this.phase -= 1;
  }
  
  getSample(): number {
    if (this.volume === 0) return 0;
    
    let wave = 0;
    switch (this.waveform) {
      case 0:
        wave = Math.sin(this.phase * Math.PI * 2);
        break;
      case 1:
        wave = this.phase < 0.5 ? 1 : -1;
        break;
      case 2:
        wave = (this.phase * 2 - 1);
        break;
    }
    
    return wave * (this.volume / 15);
  }
  
  reset(): void {
    this.freq = 0;
    this.phase = 0;
    this.volume = 0;
    this.waveform = 0;
  }
}