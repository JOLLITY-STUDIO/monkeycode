import { fromJSON, toJSON } from "../utils";
import ChannelDM from "./channel-dm";
import ChannelNoise from "./channel-noise";
import ChannelSquare from "./channel-square";
import ChannelTriangle from "./channel-triangle";

const CPU_FREQ_NTSC = 1789772.5;
const FRAME_STEPS_4 = [7457, 14913, 22371, 29828, 29829];
const FRAME_STEPS_5 = [7457, 14913, 22371, 29829, 37281];
const FRAME_PERIOD_4 = 29830;
const FRAME_PERIOD_5 = 37282;

class PAPU {
  static JSON_PROPERTIES = [
    "channelEnableValue","sampleRate","frameIrqEnabled","frameIrqActive",
    "frameIrqClearPending","apuCycleParity","startedPlaying","recordOutput",
    "frameCycleCounter","frameStep","countSequence","sampleTimer",
    "sampleTimerMax","sampleCount","triValue","smpSquare1","smpSquare2",
    "smpTriangle","smpDmc","accCount","prevSampleL","prevSampleR",
    "smpAccumL","smpAccumR","masterVolume","stereoPosLSquare1",
    "stereoPosLSquare2","stereoPosLTriangle","stereoPosLNoise",
    "stereoPosLDMC","stereoPosRSquare1","stereoPosRSquare2",
    "stereoPosRTriangle","stereoPosRNoise","stereoPosRDMC",
    "extraCycles","maxSample","minSample","panning",
  ];

  nes: any;
  square1: ChannelSquare;
  square2: ChannelSquare;
  triangle: ChannelTriangle;
  noise: ChannelNoise;
  dmc: ChannelDM;
  regValues: Uint8Array;
  startedPlaying: boolean;
  recordOutput: boolean;
  triValue: number;
  prevSampleL: number;
  prevSampleR: number;
  smpAccumL: number;
  smpAccumR: number;
  dacRange: number;
  dcValue: number;
  masterVolume: number;
  panning: number[];
  lengthLookup!: number[];
  dmcFreqLookup!: number[];
  noiseWavelengthLookup!: number[];
  square_table!: number[];
  tnd_table!: number[];
  sampleRate: number;
  sampleTimerMax: number;
  sampleTimer: number;
  channelEnableValue: number;
  frameCycleCounter: number;
  frameStep: number;
  countSequence: number;
  sampleCount: number;
  frameIrqEnabled: boolean;
  frameIrqActive: boolean;
  frameIrqClearPending: boolean;
  apuCycleParity: number;
  accCount: number;
  smpSquare1: number;
  smpSquare2: number;
  smpTriangle: number;
  smpDmc: number;
  extraCycles: number;
  maxSample: number;
  minSample: number;
  stereoPosLSquare1!: number;
  stereoPosLSquare2!: number;
  stereoPosLTriangle!: number;
  stereoPosLNoise!: number;
  stereoPosLDMC!: number;
  stereoPosRSquare1!: number;
  stereoPosRSquare2!: number;
  stereoPosRTriangle!: number;
  stereoPosRNoise!: number;
  stereoPosRDMC!: number;

  constructor(nes: any) {
    this.nes = nes;
    this.square1 = new ChannelSquare(this, true);
    this.square2 = new ChannelSquare(this, false);
    this.triangle = new ChannelTriangle(this);
    this.noise = new ChannelNoise(this);
    this.dmc = new ChannelDM(this);
    this.regValues = new Uint8Array(0x18);
    this.startedPlaying = false;
    this.recordOutput = false;
    this.triValue = 0;
    this.prevSampleL = 0; this.prevSampleR = 0;
    this.smpAccumL = 0; this.smpAccumR = 0;
    this.dacRange = 0; this.dcValue = 0;
    this.masterVolume = 256;
    this.panning = [80, 170, 100, 150, 128];
    this.setPanning(this.panning);
    this.initLengthLookup();
    this.initDmcFrequencyLookup();
    this.initNoiseWavelengthLookup();
    this.initDACtables();
    for (let i = 0; i < 0x14; i++) {
      if (i === 0x10) this.writeReg(0x4010, 0x10);
      else this.writeReg(0x4000 + i, 0);
    }
    this.sampleRate = this.nes.opts.sampleRate;
    this.sampleTimerMax = Math.floor((1024.0 * CPU_FREQ_NTSC) / this.sampleRate);
    this.sampleTimer = 0;
    this.updateChannelEnable(0);
    this.frameCycleCounter = 0;
    this.frameStep = 0;
    this.countSequence = 0;
    this.sampleCount = 0;
    this.frameIrqEnabled = false;
    this.frameIrqActive = false;
    this.frameIrqClearPending = false;
    this.apuCycleParity = 0;
    this.accCount = 0;
    this.smpSquare1 = 0; this.smpSquare2 = 0;
    this.smpTriangle = 0; this.smpDmc = 0;
    this.channelEnableValue = 0xff;
    this.extraCycles = 0;
    this.maxSample = -500000; this.minSample = 500000;
  }

  readReg(address: number): number {
    let tmp = 0;
    tmp |= this.square1.getLengthStatus();
    tmp |= this.square2.getLengthStatus() << 1;
    tmp |= this.triangle.getLengthStatus() << 2;
    tmp |= this.noise.getLengthStatus() << 3;
    tmp |= this.dmc.getLengthStatus() << 4;
    tmp |= this.nes.cpu.dataBus & 0x20;
    tmp |= (this.frameIrqActive ? 1 : 0) << 6;
    tmp |= this.dmc.getIrqStatus() << 7;
    if (this.frameIrqActive) this.frameIrqClearPending = true;
    return tmp & 0xff;
  }

  writeReg(address: number, value: number): void {
    if (address >= 0x4000 && address <= 0x4017) {
      this.regValues[address - 0x4000] = value & 0xff;
    }
    if (address >= 0x4000 && address < 0x4004) {
      this.square1.writeReg(address, value);
    } else if (address >= 0x4004 && address < 0x4008) {
      this.square2.writeReg(address, value);
    } else if (address >= 0x4008 && address < 0x400c) {
      this.triangle.writeReg(address, value);
    } else if (address >= 0x400c && address <= 0x400f) {
      this.noise.writeReg(address, value);
    } else if (address === 0x4010) {
      this.dmc.writeReg(address, value);
    } else if (address === 0x4011) {
      this.dmc.writeReg(address, value);
    } else if (address === 0x4012) {
      this.dmc.writeReg(address, value);
    } else if (address === 0x4013) {
      this.dmc.writeReg(address, value);
    } else if (address === 0x4015) {
      this.updateChannelEnable(value);
      this.dmc.writeReg(address, value);
    } else if (address === 0x4017) {
      this.countSequence = (value >> 7) & 1;
      let cpu = this.nes.cpu;
      let pendingCycles = cpu.instrBusCycles + 1 - cpu.apuCatchupCycles;
      let writeParity = (this.apuCycleParity + pendingCycles) & 1;
      this.frameCycleCounter = -7 + writeParity;
      this.frameStep = 0;
      if (value & 0x40) { this.frameIrqEnabled = false; this.frameIrqActive = false; this.frameIrqClearPending = false; }
      else { this.frameIrqEnabled = true; }
      if (this.countSequence === 1) { this.clockQuarterFrame(); this.clockHalfFrame(); }
    }
  }

  updateChannelEnable(value: number): void {
    this.channelEnableValue = value & 0xffff;
    this.square1.setEnabled((value & 1) !== 0);
    this.square2.setEnabled((value & 2) !== 0);
    this.triangle.setEnabled((value & 4) !== 0);
    this.noise.setEnabled((value & 8) !== 0);
    this.dmc.setEnabled((value & 16) !== 0);
  }

  clockFrameCounter(nCycles: number, frameCounterAlreadyAdvanced?: number): void {
    let frameCounterCycles = nCycles - (frameCounterAlreadyAdvanced || 0);
    this.processFrameIrqClear(frameCounterCycles);
    this.apuCycleParity = (this.apuCycleParity + frameCounterCycles) & 1;
    nCycles += this.extraCycles;
    let maxCycles = this.sampleTimerMax - this.sampleTimer;
    if (nCycles << 10 > maxCycles) {
      this.extraCycles = ((nCycles << 10) - maxCycles) >> 10;
      nCycles -= this.extraCycles;
    } else { this.extraCycles = 0; }
    let dmc = this.dmc, triangle = this.triangle;
    let square1 = this.square1, square2 = this.square2, noise = this.noise;

    if (dmc.isEnabled) {
      dmc.shiftCounter -= nCycles << 3;
      while (dmc.shiftCounter <= 0 && dmc.dmaFrequency > 0) {
        dmc.shiftCounter += dmc.dmaFrequency;
        dmc.clockDmc();
      }
    }

    if (triangle.progTimerMax > 0) {
      triangle.progTimerCount -= nCycles;
      while (triangle.progTimerCount <= 0) {
        triangle.progTimerCount += triangle.progTimerMax + 1;
        if (triangle.linearCounter > 0 && triangle.lengthCounter > 0) {
          triangle.triangleCounter++; triangle.triangleCounter &= 0x1f;
          if (triangle.isEnabled) {
            if (triangle.triangleCounter >= 0x10) triangle.sampleValue = triangle.triangleCounter & 0xf;
            else triangle.sampleValue = 0xf - (triangle.triangleCounter & 0xf);
            triangle.sampleValue <<= 4;
          }
        }
      }
    }

    square1.progTimerCount -= nCycles;
    if (square1.progTimerCount <= 0) {
      square1.progTimerCount += (square1.progTimerMax + 1) << 1;
      square1.squareCounter++; square1.squareCounter &= 0x7;
      square1.updateSampleValue();
    }

    square2.progTimerCount -= nCycles;
    if (square2.progTimerCount <= 0) {
      square2.progTimerCount += (square2.progTimerMax + 1) << 1;
      square2.squareCounter++; square2.squareCounter &= 0x7;
      square2.updateSampleValue();
    }

    let acc_c = nCycles;
    if (noise.progTimerCount - acc_c > 0) {
      noise.progTimerCount -= acc_c;
      noise.accCount += acc_c;
      noise.accValue += acc_c * noise.sampleValue;
    } else {
      while (acc_c-- > 0) {
        if (--noise.progTimerCount <= 0 && noise.progTimerMax > 0) {
          noise.shiftReg <<= 1;
          noise.tmp = ((noise.shiftReg << (noise.randomMode === 0 ? 1 : 6)) ^ noise.shiftReg) & 0x8000;
          if (noise.tmp !== 0) { noise.shiftReg |= 0x01; noise.randomBit = 0; noise.sampleValue = 0; }
          else { noise.randomBit = 1; if (noise.isEnabled && noise.lengthCounter > 0) noise.sampleValue = noise.masterVolume; else noise.sampleValue = 0; }
          noise.progTimerCount += noise.progTimerMax;
        }
        noise.accValue += noise.sampleValue;
        noise.accCount++;
      }
    }

    if (this.frameIrqEnabled && this.frameIrqActive) {
      this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL);
    }
    this._advanceFrameSteps(frameCounterCycles);
    this.accSample(nCycles);
    this.sampleTimer += nCycles << 10;
    while (this.sampleTimer >= this.sampleTimerMax) { this.sample(); this.sampleTimer -= this.sampleTimerMax; }
  }

  processFrameIrqClear(nCycles: number): void {
    if (!this.frameIrqClearPending || nCycles <= 0) return;
    let cyclesToNextGet = (this.apuCycleParity & 1) === 0 ? 1 : 2;
    if (nCycles >= cyclesToNextGet) { this.frameIrqActive = false; this.frameIrqClearPending = false; }
  }

  advanceFrameCounter(nCycles: number): void {
    this.processFrameIrqClear(nCycles);
    this.apuCycleParity = (this.apuCycleParity + nCycles) & 1;
    this._advanceFrameSteps(nCycles);
  }

  _advanceFrameSteps(frameCounterCycles: number): void {
    this.frameCycleCounter += frameCounterCycles;
    let steps = this.countSequence === 0 ? FRAME_STEPS_4 : FRAME_STEPS_5;
    let period = this.countSequence === 0 ? FRAME_PERIOD_4 : FRAME_PERIOD_5;
    for (;;) {
      if (this.frameStep < steps.length && this.frameCycleCounter >= steps[this.frameStep]) {
        this.fireFrameStep(this.frameStep);
        this.frameStep++;
      } else if (this.frameStep >= steps.length && this.frameCycleCounter >= period) {
        this.frameStep = 0;
        this.frameCycleCounter -= period;
        if (this.countSequence === 0) { this.frameIrqActive = this.frameIrqEnabled; this.frameIrqClearPending = false; }
      } else { break; }
    }
  }

  accSample(cycles: number): void {
    if (this.triangle.sampleCondition) {
      this.triValue = Math.floor((this.triangle.progTimerCount << 4) / (this.triangle.progTimerMax + 1));
      if (this.triValue > 16) this.triValue = 16;
      if (this.triangle.triangleCounter >= 16) this.triValue = 16 - this.triValue;
      this.triValue += this.triangle.sampleValue;
    }
    if (cycles === 2) { this.smpTriangle += this.triValue << 1; this.smpDmc += this.dmc.sample << 1; this.smpSquare1 += this.square1.sampleValue << 1; this.smpSquare2 += this.square2.sampleValue << 1; this.accCount += 2; }
    else if (cycles === 4) { this.smpTriangle += this.triValue << 2; this.smpDmc += this.dmc.sample << 2; this.smpSquare1 += this.square1.sampleValue << 2; this.smpSquare2 += this.square2.sampleValue << 2; this.accCount += 4; }
    else { this.smpTriangle += cycles * this.triValue; this.smpDmc += cycles * this.dmc.sample; this.smpSquare1 += cycles * this.square1.sampleValue; this.smpSquare2 += cycles * this.square2.sampleValue; this.accCount += cycles; }
  }

  fireFrameStep(step: number): void {
    if (this.countSequence === 0) {
      switch (step) {
        case 0: this.clockQuarterFrame(); break;
        case 1: this.clockQuarterFrame(); this.clockHalfFrame(); break;
        case 2: this.clockQuarterFrame(); break;
        case 3: this.frameIrqActive = true; this.frameIrqClearPending = false; break;
        case 4: this.clockQuarterFrame(); this.clockHalfFrame(); this.frameIrqActive = true; this.frameIrqClearPending = false; break;
      }
    } else {
      switch (step) {
        case 0: this.clockQuarterFrame(); break;
        case 1: this.clockQuarterFrame(); this.clockHalfFrame(); break;
        case 2: this.clockQuarterFrame(); break;
        case 3: break;
        case 4: this.clockQuarterFrame(); this.clockHalfFrame(); break;
      }
    }
  }

  clockQuarterFrame(): void { this.square1.clockEnvDecay(); this.square2.clockEnvDecay(); this.noise.clockEnvDecay(); this.triangle.clockLinearCounter(); }
  clockHalfFrame(): void { this.triangle.clockLengthCounter(); this.square1.clockLengthCounter(); this.square2.clockLengthCounter(); this.noise.clockLengthCounter(); this.square1.clockSweep(); this.square2.clockSweep(); }

  sample(): void {
    let sq_index: number, tnd_index: number;
    if (this.accCount > 0) {
      this.smpSquare1 <<= 4; this.smpSquare1 = Math.floor(this.smpSquare1 / this.accCount);
      this.smpSquare2 <<= 4; this.smpSquare2 = Math.floor(this.smpSquare2 / this.accCount);
      this.smpTriangle = Math.floor(this.smpTriangle / this.accCount);
      this.smpDmc <<= 4; this.smpDmc = Math.floor(this.smpDmc / this.accCount);
      this.accCount = 0;
    } else {
      this.smpSquare1 = this.square1.sampleValue << 4;
      this.smpSquare2 = this.square2.sampleValue << 4;
      this.smpTriangle = this.triangle.sampleValue;
      this.smpDmc = this.dmc.sample << 4;
    }
    let smpNoise = Math.floor((this.noise.accValue << 4) / this.noise.accCount);
    this.noise.accValue = smpNoise >> 4; this.noise.accCount = 1;

    sq_index = (this.smpSquare1 * this.stereoPosLSquare1 + this.smpSquare2 * this.stereoPosLSquare2) >> 8;
    tnd_index = (3 * this.smpTriangle * this.stereoPosLTriangle + (smpNoise << 1) * this.stereoPosLNoise + this.smpDmc * this.stereoPosLDMC) >> 8;
    if (sq_index >= this.square_table.length) sq_index = this.square_table.length - 1;
    if (tnd_index >= this.tnd_table.length) tnd_index = this.tnd_table.length - 1;
    let sampleValueL = this.square_table[sq_index] + this.tnd_table[tnd_index] - this.dcValue;

    sq_index = (this.smpSquare1 * this.stereoPosRSquare1 + this.smpSquare2 * this.stereoPosRSquare2) >> 8;
    tnd_index = (3 * this.smpTriangle * this.stereoPosRTriangle + (smpNoise << 1) * this.stereoPosRNoise + this.smpDmc * this.stereoPosRDMC) >> 8;
    if (sq_index >= this.square_table.length) sq_index = this.square_table.length - 1;
    if (tnd_index >= this.tnd_table.length) tnd_index = this.tnd_table.length - 1;
    let sampleValueR = this.square_table[sq_index] + this.tnd_table[tnd_index] - this.dcValue;

    let smpDiffL = sampleValueL - this.prevSampleL; this.prevSampleL += smpDiffL; this.smpAccumL += smpDiffL - (this.smpAccumL >> 10); sampleValueL = this.smpAccumL;
    let smpDiffR = sampleValueR - this.prevSampleR; this.prevSampleR += smpDiffR; this.smpAccumR += smpDiffR - (this.smpAccumR >> 10); sampleValueR = this.smpAccumR;
    if (sampleValueL > this.maxSample) this.maxSample = sampleValueL;
    if (sampleValueL < this.minSample) this.minSample = sampleValueL;

    if (this.nes.opts.onAudioSample) {
      this.nes.opts.onAudioSample(sampleValueL / 32768, sampleValueR / 32768);
    }
    this.smpSquare1 = 0; this.smpSquare2 = 0; this.smpTriangle = 0; this.smpDmc = 0;
  }

  getLengthMax(value: number): number { return this.lengthLookup[value >> 3]; }
  getDmcFrequency(value: number): number { return (value >= 0 && value < 0x10) ? this.dmcFreqLookup[value] : 0; }
  getNoiseWaveLength(value: number): number { return (value >= 0 && value < 0x10) ? this.noiseWavelengthLookup[value] : 0; }

  setFrameRate(rate: number): void { this.sampleTimerMax = Math.floor((1024.0 * CPU_FREQ_NTSC * rate) / (this.sampleRate * 60.0)); }

  setPanning(pos: number[]): void { for (let i = 0; i < 5; i++) this.panning[i] = pos[i]; this.updateStereoPos(); }

  setMasterVolume(value: number): void { if (value < 0) value = 0; if (value > 256) value = 256; this.masterVolume = value; this.updateStereoPos(); }

  updateStereoPos(): void {
    this.stereoPosLSquare1 = (this.panning[0] * this.masterVolume) >> 8;
    this.stereoPosLSquare2 = (this.panning[1] * this.masterVolume) >> 8;
    this.stereoPosLTriangle = (this.panning[2] * this.masterVolume) >> 8;
    this.stereoPosLNoise = (this.panning[3] * this.masterVolume) >> 8;
    this.stereoPosLDMC = (this.panning[4] * this.masterVolume) >> 8;
    this.stereoPosRSquare1 = this.masterVolume - this.stereoPosLSquare1;
    this.stereoPosRSquare2 = this.masterVolume - this.stereoPosLSquare2;
    this.stereoPosRTriangle = this.masterVolume - this.stereoPosLTriangle;
    this.stereoPosRNoise = this.masterVolume - this.stereoPosLNoise;
    this.stereoPosRDMC = this.masterVolume - this.stereoPosLDMC;
  }

  initLengthLookup(): void {
    this.lengthLookup = [0x0A,0xFE, 0x14,0x02, 0x28,0x04, 0x50,0x06, 0xA0,0x08, 0x3C,0x0A, 0x0E,0x0C, 0x1A,0x0E, 0x0C,0x10, 0x18,0x12, 0x30,0x14, 0x60,0x16, 0xC0,0x18, 0x48,0x1A, 0x10,0x1C, 0x20,0x1E];
  }

  initDmcFrequencyLookup(): void {
    this.dmcFreqLookup = new Array(16);
    this.dmcFreqLookup[0]=0xd60; this.dmcFreqLookup[1]=0xbe0;
    this.dmcFreqLookup[2]=0xaa0; this.dmcFreqLookup[3]=0xa00;
    this.dmcFreqLookup[4]=0x8f0; this.dmcFreqLookup[5]=0x7f0;
    this.dmcFreqLookup[6]=0x710; this.dmcFreqLookup[7]=0x6b0;
    this.dmcFreqLookup[8]=0x5f0; this.dmcFreqLookup[9]=0x500;
    this.dmcFreqLookup[0xa]=0x470; this.dmcFreqLookup[0xb]=0x400;
    this.dmcFreqLookup[0xc]=0x350; this.dmcFreqLookup[0xd]=0x2a0;
    this.dmcFreqLookup[0xe]=0x240; this.dmcFreqLookup[0xf]=0x1b0;
  }

  initNoiseWavelengthLookup(): void {
    this.noiseWavelengthLookup = new Array(16);
    this.noiseWavelengthLookup[0]=0x004; this.noiseWavelengthLookup[1]=0x008;
    this.noiseWavelengthLookup[2]=0x010; this.noiseWavelengthLookup[3]=0x020;
    this.noiseWavelengthLookup[4]=0x040; this.noiseWavelengthLookup[5]=0x060;
    this.noiseWavelengthLookup[6]=0x080; this.noiseWavelengthLookup[7]=0x0a0;
    this.noiseWavelengthLookup[8]=0x0ca; this.noiseWavelengthLookup[9]=0x0fe;
    this.noiseWavelengthLookup[0xa]=0x17c; this.noiseWavelengthLookup[0xb]=0x1fc;
    this.noiseWavelengthLookup[0xc]=0x2fa; this.noiseWavelengthLookup[0xd]=0x3f8;
    this.noiseWavelengthLookup[0xe]=0x7f2; this.noiseWavelengthLookup[0xf]=0xfe4;
  }

  initDACtables(): void {
    let value: number, ival: number, i: number;
    let max_sqr = 0, max_tnd = 0;
    this.square_table = new Array(32 * 16);
    this.tnd_table = new Array(204 * 16);
    for (i = 0; i < 32 * 16; i++) {
      value = 95.52 / (8128.0 / (i / 16.0) + 100.0);
      value *= 0.98411; value *= 50000.0;
      ival = Math.floor(value);
      this.square_table[i] = ival;
      if (ival > max_sqr) max_sqr = ival;
    }
    for (i = 0; i < 204 * 16; i++) {
      value = 163.67 / (24329.0 / (i / 16.0) + 100.0);
      value *= 0.98411; value *= 50000.0;
      ival = Math.floor(value);
      this.tnd_table[i] = ival;
      if (ival > max_tnd) max_tnd = ival;
    }
    this.dacRange = max_sqr + max_tnd;
    this.dcValue = this.dacRange / 2;
  }

  toJSON(): any {
    let obj = toJSON(this);
    obj.dmc = this.dmc.toJSON(); obj.noise = this.noise.toJSON();
    obj.square1 = this.square1.toJSON(); obj.square2 = this.square2.toJSON();
    obj.triangle = this.triangle.toJSON();
    return obj;
  }

  fromJSON(s: any): void {
    fromJSON(this, s);
    this.dmc.fromJSON(s.dmc); this.noise.fromJSON(s.noise);
    this.square1.fromJSON(s.square1); this.square2.fromJSON(s.square2);
    this.triangle.fromJSON(s.triangle);
  }
}

export default PAPU;
