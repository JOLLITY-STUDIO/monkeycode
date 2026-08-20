"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/papu/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/core/papu/channel-square.ts
var ChannelSquare = class {
  constructor(papu, square1) {
    this.papu = papu;
    this.dutyLookup = [
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      1,
      1
    ];
    this.impLookup = [
      1,
      -1,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      -1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      0,
      -1,
      0,
      1,
      0,
      0,
      0,
      0,
      0
    ];
    this.sqr1 = square1;
    this.progTimerCount = 0;
    this.progTimerMax = 0;
    this.lengthCounter = 0;
    this.squareCounter = 0;
    this.sweepCounter = 0;
    this.sweepCounterMax = 0;
    this.sweepMode = 0;
    this.sweepShiftAmount = 0;
    this.envDecayRate = 0;
    this.envDecayCounter = 0;
    this.envVolume = 0;
    this.masterVolume = 0;
    this.dutyMode = 0;
    this.vol = 0;
    this.isEnabled = false;
    this.lengthCounterEnable = false;
    this.sweepActive = false;
    this.sweepCarry = false;
    this.envDecayDisable = false;
    this.envDecayLoopEnable = false;
    this.envReset = false;
    this.updateSweepPeriod = false;
    this.sweepResult = 0;
    this.sampleValue = 0;
  }
  clockLengthCounter() {
    if (this.lengthCounterEnable && this.lengthCounter > 0) {
      this.lengthCounter--;
      if (this.lengthCounter === 0) {
        this.updateSampleValue();
      }
    }
  }
  clockEnvDecay() {
    if (this.envReset) {
      this.envReset = false;
      this.envDecayCounter = this.envDecayRate + 1;
      this.envVolume = 15;
    } else if (--this.envDecayCounter <= 0) {
      this.envDecayCounter = this.envDecayRate + 1;
      if (this.envVolume > 0) {
        this.envVolume--;
      } else {
        this.envVolume = this.envDecayLoopEnable ? 15 : 0;
      }
    }
    if (this.envDecayDisable) {
      this.masterVolume = this.envDecayRate;
    } else {
      this.masterVolume = this.envVolume;
    }
    this.updateSampleValue();
  }
  clockSweep() {
    if (--this.sweepCounter <= 0) {
      this.sweepCounter = this.sweepCounterMax + 1;
      if (this.sweepActive && this.sweepShiftAmount > 0 && this.progTimerMax > 7) {
        this.sweepCarry = false;
        if (this.sweepMode === 0) {
          this.progTimerMax += this.progTimerMax >> this.sweepShiftAmount;
          if (this.progTimerMax > 2047) {
            this.progTimerMax = 4095;
            this.sweepCarry = true;
          }
        } else {
          this.progTimerMax = this.progTimerMax - ((this.progTimerMax >> this.sweepShiftAmount) + (this.sqr1 ? 1 : 0));
        }
      }
    }
    if (this.updateSweepPeriod) {
      this.updateSweepPeriod = false;
      this.sweepCounter = this.sweepCounterMax + 1;
    }
  }
  updateSampleValue() {
    if (this.isEnabled && this.lengthCounter > 0 && this.progTimerMax > 7) {
      if (this.sweepMode === 0 && this.progTimerMax + (this.progTimerMax >> this.sweepShiftAmount) > 2047) {
        this.sampleValue = 0;
      } else {
        this.sampleValue = this.masterVolume * this.dutyLookup[(this.dutyMode << 3) + this.squareCounter];
      }
    } else {
      this.sampleValue = 0;
    }
  }
  writeReg(address, value) {
    let addrAdd = this.sqr1 ? 0 : 4;
    if (address === 16384 + addrAdd) {
      this.envDecayDisable = (value & 16) !== 0;
      this.envDecayRate = value & 15;
      this.envDecayLoopEnable = (value & 32) !== 0;
      this.dutyMode = value >> 6 & 3;
      this.lengthCounterEnable = (value & 32) === 0;
      if (this.envDecayDisable) {
        this.masterVolume = this.envDecayRate;
      } else {
        this.masterVolume = this.envVolume;
      }
      this.updateSampleValue();
    } else if (address === 16385 + addrAdd) {
      this.sweepActive = (value & 128) !== 0;
      this.sweepCounterMax = value >> 4 & 7;
      this.sweepMode = value >> 3 & 1;
      this.sweepShiftAmount = value & 7;
      this.updateSweepPeriod = true;
    } else if (address === 16386 + addrAdd) {
      this.progTimerMax &= 1792;
      this.progTimerMax |= value;
    } else if (address === 16387 + addrAdd) {
      this.progTimerMax &= 255;
      this.progTimerMax |= (value & 7) << 8;
      if (this.isEnabled) {
        this.lengthCounter = this.papu.getLengthMax(value & 248);
      }
      this.envReset = true;
    }
  }
  setEnabled(value) {
    this.isEnabled = value;
    if (!value) {
      this.lengthCounter = 0;
    }
    this.updateSampleValue();
  }
  getLengthStatus() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
};
var channel_square_default = ChannelSquare;

// src/core/papu/channel-triangle.ts
var ChannelTriangle = class {
  constructor(papu) {
    this.papu = papu;
    this.progTimerCount = 0;
    this.progTimerMax = 0;
    this.triangleCounter = 0;
    this.isEnabled = false;
    this.sampleCondition = false;
    this.lengthCounter = 0;
    this.lengthCounterEnable = false;
    this.linearCounter = 0;
    this.lcLoadValue = 0;
    this.lcHalt = true;
    this.lcControl = false;
    this.tmp = 0;
    this.sampleValue = 15;
  }
  clockLengthCounter() {
    if (this.lengthCounterEnable && this.lengthCounter > 0) {
      this.lengthCounter--;
      if (this.lengthCounter === 0) {
        this.updateSampleCondition();
      }
    }
  }
  clockLinearCounter() {
    if (this.lcHalt) {
      this.linearCounter = this.lcLoadValue;
      this.updateSampleCondition();
    } else if (this.linearCounter > 0) {
      this.linearCounter--;
      this.updateSampleCondition();
    }
    if (!this.lcControl) {
      this.lcHalt = false;
    }
  }
  getLengthStatus() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
  writeReg(address, value) {
    if (address === 16392) {
      this.lcControl = (value & 128) !== 0;
      this.lcLoadValue = value & 127;
      this.lengthCounterEnable = !this.lcControl;
    } else if (address === 16394) {
      this.progTimerMax &= 1792;
      this.progTimerMax |= value;
    } else if (address === 16395) {
      this.progTimerMax &= 255;
      this.progTimerMax |= (value & 7) << 8;
      if (this.isEnabled) {
        this.lengthCounter = this.papu.getLengthMax(value & 248);
      }
      this.lcHalt = true;
    }
    this.updateSampleCondition();
  }
  clockProgrammableTimer(nCycles) {
    if (this.progTimerMax > 0) {
      this.progTimerCount += nCycles;
      while (this.progTimerMax > 0 && this.progTimerCount >= this.progTimerMax) {
        this.progTimerCount -= this.progTimerMax;
        if (this.isEnabled && this.lengthCounter > 0 && this.linearCounter > 0) {
          this.clockTriangleGenerator();
        }
      }
    }
  }
  clockTriangleGenerator() {
    this.triangleCounter++;
    this.triangleCounter &= 31;
  }
  setEnabled(value) {
    this.isEnabled = value;
    if (!value) {
      this.lengthCounter = 0;
    }
    this.updateSampleCondition();
  }
  updateSampleCondition() {
    this.sampleCondition = this.isEnabled && this.progTimerMax > 7 && this.linearCounter > 0 && this.lengthCounter > 0;
  }
};
var channel_triangle_default = ChannelTriangle;

// src/core/papu/channel-noise.ts
var ChannelNoise = class {
  constructor(papu) {
    this.papu = papu;
    this.progTimerCount = 0;
    this.progTimerMax = 0;
    this.isEnabled = false;
    this.lengthCounter = 0;
    this.lengthCounterEnable = false;
    this.envDecayDisable = false;
    this.envDecayLoopEnable = false;
    this.envReset = false;
    this.shiftNow = false;
    this.envDecayRate = 0;
    this.envDecayCounter = 0;
    this.envVolume = 0;
    this.masterVolume = 0;
    this.shiftReg = 1;
    this.randomBit = 0;
    this.randomMode = 0;
    this.sampleValue = 0;
    this.tmp = 0;
    this.accValue = 0;
    this.accCount = 1;
  }
  clockLengthCounter() {
    if (this.lengthCounterEnable && this.lengthCounter > 0) {
      this.lengthCounter--;
      if (this.lengthCounter === 0) {
        this.updateSampleValue();
      }
    }
  }
  clockEnvDecay() {
    if (this.envReset) {
      this.envReset = false;
      this.envDecayCounter = this.envDecayRate + 1;
      this.envVolume = 15;
    } else if (--this.envDecayCounter <= 0) {
      this.envDecayCounter = this.envDecayRate + 1;
      if (this.envVolume > 0) {
        this.envVolume--;
      } else {
        this.envVolume = this.envDecayLoopEnable ? 15 : 0;
      }
    }
    if (this.envDecayDisable) {
      this.masterVolume = this.envDecayRate;
    } else {
      this.masterVolume = this.envVolume;
    }
    this.updateSampleValue();
  }
  updateSampleValue() {
    if (this.isEnabled && this.lengthCounter > 0) {
      this.sampleValue = this.randomBit * this.masterVolume;
    }
  }
  writeReg(address, value) {
    if (address === 16396) {
      this.envDecayDisable = (value & 16) !== 0;
      this.envDecayRate = value & 15;
      this.envDecayLoopEnable = (value & 32) !== 0;
      this.lengthCounterEnable = (value & 32) === 0;
      if (this.envDecayDisable) {
        this.masterVolume = this.envDecayRate;
      } else {
        this.masterVolume = this.envVolume;
      }
    } else if (address === 16398) {
      this.progTimerMax = this.papu.getNoiseWaveLength(value & 15);
      this.randomMode = value >> 7;
    } else if (address === 16399) {
      if (this.isEnabled) {
        this.lengthCounter = this.papu.getLengthMax(value & 248);
      }
      this.envReset = true;
    }
  }
  setEnabled(value) {
    this.isEnabled = value;
    if (!value) {
      this.lengthCounter = 0;
    }
    this.updateSampleValue();
  }
  getLengthStatus() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
};
var channel_noise_default = ChannelNoise;

// src/core/papu/channel-dm.ts
var ChannelDM = class _ChannelDM {
  constructor(papu) {
    /** Sample data provider (替代 papu.nes.mmap.load) */
    this._sampleProvider = null;
    this.papu = papu;
    this.isEnabled = false;
    this.hasSample = false;
    this.irqGenerated = false;
    this.playMode = _ChannelDM.MODE_NORMAL;
    this.dmaFrequency = 0;
    this.dmaCounter = 0;
    this.deltaCounter = 0;
    this.playStartAddress = 0;
    this.playAddress = 0;
    this.playLength = 0;
    this.playLengthCounter = 0;
    this.sample = 0;
    this.dacLsb = 0;
    this.shiftCounter = 0;
    this.reg4012 = 0;
    this.reg4013 = 0;
    this.data = 0;
  }
  static {
    this.MODE_NORMAL = 0;
  }
  static {
    this.MODE_LOOP = 1;
  }
  static {
    this.MODE_IRQ = 2;
  }
  /** 设置 DMC 采样数据提供函数 (替代原 Mapper 的 load) */
  setSampleProvider(fn) {
    this._sampleProvider = fn;
  }
  clockDmc() {
    if (this.hasSample) {
      if ((this.data & 1) === 0) {
        if (this.deltaCounter > 0) {
          this.deltaCounter--;
        }
      } else {
        if (this.deltaCounter < 63) {
          this.deltaCounter++;
        }
      }
      this.sample = this.isEnabled ? (this.deltaCounter << 1) + this.dacLsb : 0;
      this.data >>= 1;
    }
    this.dmaCounter--;
    if (this.dmaCounter <= 0) {
      this.hasSample = false;
      this.endOfSample();
      this.dmaCounter = 8;
    }
    if (this.irqGenerated) {
    }
  }
  endOfSample() {
    if (this.playLengthCounter === 0 && this.playMode === _ChannelDM.MODE_LOOP) {
      this.playAddress = this.playStartAddress;
      this.playLengthCounter = this.playLength;
    }
    if (this.playLengthCounter > 0) {
      this.nextSample();
      if (this.playLengthCounter === 0) {
        if (this.playMode === _ChannelDM.MODE_IRQ) {
          this.irqGenerated = true;
        }
      }
    }
  }
  nextSample() {
    if (!this._sampleProvider) {
      this.data = 0;
    } else {
      const b = this._sampleProvider(this.playAddress);
      this.data = b !== null ? b : 0;
    }
    this.playLengthCounter--;
    this.playAddress++;
    if (this.playAddress > 65535) {
      this.playAddress = 32768;
    }
    this.hasSample = true;
  }
  writeReg(address, value) {
    if (address === 16400) {
      if (value >> 6 === 0) {
        this.playMode = _ChannelDM.MODE_NORMAL;
      } else if ((value >> 6 & 1) === 1) {
        this.playMode = _ChannelDM.MODE_LOOP;
      } else if (value >> 6 === 2) {
        this.playMode = _ChannelDM.MODE_IRQ;
      }
      if ((value & 128) === 0) {
        this.irqGenerated = false;
      }
      this.dmaFrequency = this.papu.getDmcFrequency(value & 15);
    } else if (address === 16401) {
      this.deltaCounter = value >> 1 & 63;
      this.dacLsb = value & 1;
      this.sample = (this.deltaCounter << 1) + this.dacLsb;
    } else if (address === 16402) {
      this.playStartAddress = value << 6 | 49152;
      this.reg4012 = value;
    } else if (address === 16403) {
      this.playLength = (value << 4) + 1;
      this.reg4013 = value;
    } else if (address === 16405) {
      this.irqGenerated = false;
      if ((value >> 4 & 1) === 0) {
        this.playLengthCounter = 0;
      } else {
        if (this.playLengthCounter === 0) {
          this.playAddress = this.playStartAddress;
          this.playLengthCounter = this.playLength;
          if (!this.hasSample && this.playLengthCounter > 0) {
            this.nextSample();
            this.dmaCounter = 8;
            this.shiftCounter = this.dmaFrequency;
            if (this.playLengthCounter === 0 && this.playMode === _ChannelDM.MODE_IRQ) {
              this.irqGenerated = true;
            }
          }
        }
      }
    }
  }
  setEnabled(value) {
    this.isEnabled = value;
  }
  getLengthStatus() {
    return this.playLengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
  getIrqStatus() {
    return this.irqGenerated ? 1 : 0;
  }
};
var channel_dm_default = ChannelDM;

// src/core/papu/index.ts
var CPU_FREQ_NTSC = 17897725e-1;
var FRAME_STEPS_4 = [7457, 14913, 22371, 29828, 29829];
var FRAME_STEPS_5 = [7457, 14913, 22371, 29829, 37281];
var FRAME_PERIOD_4 = 29830;
var FRAME_PERIOD_5 = 37282;
var PAPU = class {
  /**
   * @param sampleRate 输出采样率
   * @param regBuffer 外部 APU 寄存器缓存 (0x4000-0x4017, 24B)
   *                  传 null 则内部分配。推荐传入 data/audio apuBuffer。
   */
  constructor(sampleRate = 44100, regBuffer) {
    /** Audio sample callback — 外部 Web Audio 输出 */
    this._onSample = null;
    this.square1 = new channel_square_default(this, true);
    this.square2 = new channel_square_default(this, false);
    this.triangle = new channel_triangle_default(this);
    this.noise = new channel_noise_default(this);
    this.dmc = new channel_dm_default(this);
    this.regValues = regBuffer ?? new Uint8Array(24);
    this.startedPlaying = false;
    this.recordOutput = false;
    this.triValue = 0;
    this.prevSampleL = 0;
    this.prevSampleR = 0;
    this.smpAccumL = 0;
    this.smpAccumR = 0;
    this.dacRange = 0;
    this.dcValue = 0;
    this.masterVolume = 256;
    this.panning = [80, 170, 100, 150, 128];
    this.setPanning(this.panning);
    this.initLengthLookup();
    this.initDmcFrequencyLookup();
    this.initNoiseWavelengthLookup();
    this.initDACtables();
    for (let i = 0; i < 20; i++) {
      if (i === 16) {
        this.writeReg(16400, 16);
      } else {
        this.writeReg(16384 + i, 0);
      }
    }
    this.sampleRate = sampleRate;
    this.sampleTimerMax = Math.floor(
      1024 * CPU_FREQ_NTSC / this.sampleRate
    );
    this.sampleTimer = 0;
    this.updateChannelEnable(0);
    this.frameCycleCounter = 0;
    this.frameStep = 0;
    this.countSequence = 0;
    this.sampleCount = 0;
    this.apuCycleParity = 0;
    this.accCount = 0;
    this.smpSquare1 = 0;
    this.smpSquare2 = 0;
    this.smpTriangle = 0;
    this.smpDmc = 0;
    this.channelEnableValue = 255;
    this.extraCycles = 0;
    this.maxSample = -5e5;
    this.minSample = 5e5;
  }
  /** 设置音频输出回调 */
  setSampleCallback(cb) {
    this._onSample = cb;
  }
  // ═══════════════════════════════════════════════════════════════
  // 寄存器读写
  // ═══════════════════════════════════════════════════════════════
  /**
   * 0x4015 读取: APU 状态寄存器。
   * 在 h5-src 中：Bank12AudioService 写入 $4015 后如需读回状态，调此方法。
   * 与 CPU 交互的差异：bit5 (dataBus) 直接返回 0，无 CPU 开放总线。
   */
  readReg(address) {
    if (address !== 16405) return 0;
    let tmp = 0;
    tmp |= this.square1.getLengthStatus();
    tmp |= this.square2.getLengthStatus() << 1;
    tmp |= this.triangle.getLengthStatus() << 2;
    tmp |= this.noise.getLengthStatus() << 3;
    tmp |= this.dmc.getLengthStatus() << 4;
    tmp |= this.dmc.getIrqStatus() << 7;
    return tmp & 255;
  }
  writeReg(address, value) {
    if (address >= 16384 && address <= 16407) {
      this.regValues[address - 16384] = value & 255;
    }
    if (address >= 16384 && address < 16388) {
      this.square1.writeReg(address, value);
    } else if (address >= 16388 && address < 16392) {
      this.square2.writeReg(address, value);
    } else if (address >= 16392 && address < 16396) {
      this.triangle.writeReg(address, value);
    } else if (address >= 16396 && address <= 16399) {
      this.noise.writeReg(address, value);
    } else if (address === 16400) {
      this.dmc.writeReg(address, value);
    } else if (address === 16401) {
      this.dmc.writeReg(address, value);
    } else if (address === 16402) {
      this.dmc.writeReg(address, value);
    } else if (address === 16403) {
      this.dmc.writeReg(address, value);
    } else if (address === 16405) {
      this.updateChannelEnable(value);
      this.dmc.writeReg(address, value);
    } else if (address === 16407) {
      this.countSequence = value >> 7 & 1;
      this.frameCycleCounter = 0;
      this.frameStep = 0;
      if (this.countSequence === 1) {
        this.clockQuarterFrame();
        this.clockHalfFrame();
      }
    }
  }
  // ═══════════════════════════════════════════════════════════════
  // 通道使能
  // ═══════════════════════════════════════════════════════════════
  updateChannelEnable(value) {
    this.channelEnableValue = value & 255;
    this.square1.setEnabled((value & 1) !== 0);
    this.square2.setEnabled((value & 2) !== 0);
    this.triangle.setEnabled((value & 4) !== 0);
    this.noise.setEnabled((value & 8) !== 0);
    this.dmc.setEnabled((value & 16) !== 0);
  }
  // ═══════════════════════════════════════════════════════════════
  // 帧计数器 — 驱动 envelope / sweep / length counter
  // ═══════════════════════════════════════════════════════════════
  /**
   * 每帧调用: 推进一帧 (~29780 cycles at 60fps)。
   * 原始代码中由 CPU 在每条指令执行后调用 clockFrameCounter。
   * H5 简化: 每帧调用一次，传入整帧的 cycle 数。
   */
  clockFramePerFrame() {
    this.clockFrameCounter(29830);
  }
  clockFrameCounter(nCycles, frameCounterAlreadyAdvanced) {
    let frameCounterCycles = nCycles - (frameCounterAlreadyAdvanced || 0);
    this.apuCycleParity = this.apuCycleParity + frameCounterCycles & 1;
    nCycles += this.extraCycles;
    let maxCycles = this.sampleTimerMax - this.sampleTimer;
    if (nCycles << 10 > maxCycles) {
      this.extraCycles = (nCycles << 10) - maxCycles >> 10;
      nCycles -= this.extraCycles;
    } else {
      this.extraCycles = 0;
    }
    let dmc = this.dmc;
    let triangle = this.triangle;
    let square1 = this.square1;
    let square2 = this.square2;
    let noise = this.noise;
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
          triangle.triangleCounter++;
          triangle.triangleCounter &= 31;
          if (triangle.isEnabled) {
            if (triangle.triangleCounter >= 16) {
              triangle.sampleValue = triangle.triangleCounter & 15;
            } else {
              triangle.sampleValue = 15 - (triangle.triangleCounter & 15);
            }
            triangle.sampleValue <<= 4;
          }
        }
      }
    }
    square1.progTimerCount -= nCycles;
    if (square1.progTimerCount <= 0) {
      square1.progTimerCount += square1.progTimerMax + 1 << 1;
      square1.squareCounter++;
      square1.squareCounter &= 7;
      square1.updateSampleValue();
    }
    square2.progTimerCount -= nCycles;
    if (square2.progTimerCount <= 0) {
      square2.progTimerCount += square2.progTimerMax + 1 << 1;
      square2.squareCounter++;
      square2.squareCounter &= 7;
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
          noise.tmp = (noise.shiftReg << (noise.randomMode === 0 ? 1 : 6) ^ noise.shiftReg) & 32768;
          if (noise.tmp !== 0) {
            noise.shiftReg |= 1;
            noise.randomBit = 0;
            noise.sampleValue = 0;
          } else {
            noise.randomBit = 1;
            if (noise.isEnabled && noise.lengthCounter > 0) {
              noise.sampleValue = noise.masterVolume;
            } else {
              noise.sampleValue = 0;
            }
          }
          noise.progTimerCount += noise.progTimerMax;
        }
        noise.accValue += noise.sampleValue;
        noise.accCount++;
      }
    }
    this._advanceFrameSteps(frameCounterCycles);
    this.accSample(nCycles);
    this.sampleTimer += nCycles << 10;
    if (this.sampleTimer >= this.sampleTimerMax) {
      this.sample();
      this.sampleTimer -= this.sampleTimerMax;
    }
  }
  /**
   * advanceFrameCounter — 轻量版，仅推进帧 step（不触发音频采样）。
   * 对应 CPU 在 0x4015 读之前调用的 advanceFrameCounter。
   */
  advanceFrameCounter(nCycles) {
    this.apuCycleParity = this.apuCycleParity + nCycles & 1;
    this._advanceFrameSteps(nCycles);
  }
  /** 仅推进帧 steps（envelope / length counter / sweep） */
  endFrame() {
    this.advanceFrameCounter(29830);
  }
  // ═══════════════════════════════════════════════════════════════
  // 帧 step 调度
  // ═══════════════════════════════════════════════════════════════
  _advanceFrameSteps(frameCounterCycles) {
    this.frameCycleCounter += frameCounterCycles;
    let steps = this.countSequence === 0 ? FRAME_STEPS_4 : FRAME_STEPS_5;
    let period = this.countSequence === 0 ? FRAME_PERIOD_4 : FRAME_PERIOD_5;
    for (; ; ) {
      if (this.frameStep < steps.length && this.frameCycleCounter >= steps[this.frameStep]) {
        this.fireFrameStep(this.frameStep);
        this.frameStep++;
      } else if (this.frameStep >= steps.length && this.frameCycleCounter >= period) {
        this.frameStep = 0;
        this.frameCycleCounter -= period;
      } else {
        break;
      }
    }
  }
  accSample(cycles) {
    if (this.triangle.sampleCondition) {
      this.triValue = Math.floor(
        (this.triangle.progTimerCount << 4) / (this.triangle.progTimerMax + 1)
      );
      if (this.triValue > 16) {
        this.triValue = 16;
      }
      if (this.triangle.triangleCounter >= 16) {
        this.triValue = 16 - this.triValue;
      }
      this.triValue += this.triangle.sampleValue;
    }
    if (cycles === 2) {
      this.smpTriangle += this.triValue << 1;
      this.smpDmc += this.dmc.sample << 1;
      this.smpSquare1 += this.square1.sampleValue << 1;
      this.smpSquare2 += this.square2.sampleValue << 1;
      this.accCount += 2;
    } else if (cycles === 4) {
      this.smpTriangle += this.triValue << 2;
      this.smpDmc += this.dmc.sample << 2;
      this.smpSquare1 += this.square1.sampleValue << 2;
      this.smpSquare2 += this.square2.sampleValue << 2;
      this.accCount += 4;
    } else {
      this.smpTriangle += cycles * this.triValue;
      this.smpDmc += cycles * this.dmc.sample;
      this.smpSquare1 += cycles * this.square1.sampleValue;
      this.smpSquare2 += cycles * this.square2.sampleValue;
      this.accCount += cycles;
    }
  }
  fireFrameStep(step) {
    if (this.countSequence === 0) {
      switch (step) {
        case 0:
          this.clockQuarterFrame();
          break;
        case 1:
          this.clockQuarterFrame();
          this.clockHalfFrame();
          break;
        case 2:
          this.clockQuarterFrame();
          break;
        case 3:
          break;
        case 4:
          this.clockQuarterFrame();
          this.clockHalfFrame();
          break;
      }
    } else {
      switch (step) {
        case 0:
          this.clockQuarterFrame();
          break;
        case 1:
          this.clockQuarterFrame();
          this.clockHalfFrame();
          break;
        case 2:
          this.clockQuarterFrame();
          break;
        case 3:
          break;
        case 4:
          this.clockQuarterFrame();
          this.clockHalfFrame();
          break;
      }
    }
  }
  clockQuarterFrame() {
    this.square1.clockEnvDecay();
    this.square2.clockEnvDecay();
    this.noise.clockEnvDecay();
    this.triangle.clockLinearCounter();
  }
  clockHalfFrame() {
    this.triangle.clockLengthCounter();
    this.square1.clockLengthCounter();
    this.square2.clockLengthCounter();
    this.noise.clockLengthCounter();
    this.square1.clockSweep();
    this.square2.clockSweep();
  }
  // ═══════════════════════════════════════════════════════════════
  // 音频输出
  // ═══════════════════════════════════════════════════════════════
  sample() {
    let sq_index, tnd_index;
    if (this.accCount > 0) {
      this.smpSquare1 <<= 4;
      this.smpSquare1 = Math.floor(this.smpSquare1 / this.accCount);
      this.smpSquare2 <<= 4;
      this.smpSquare2 = Math.floor(this.smpSquare2 / this.accCount);
      this.smpTriangle = Math.floor(this.smpTriangle / this.accCount);
      this.smpDmc <<= 4;
      this.smpDmc = Math.floor(this.smpDmc / this.accCount);
      this.accCount = 0;
    } else {
      this.smpSquare1 = this.square1.sampleValue << 4;
      this.smpSquare2 = this.square2.sampleValue << 4;
      this.smpTriangle = this.triangle.sampleValue;
      this.smpDmc = this.dmc.sample << 4;
    }
    let smpNoise = Math.floor((this.noise.accValue << 4) / this.noise.accCount);
    this.noise.accValue = smpNoise >> 4;
    this.noise.accCount = 1;
    sq_index = this.smpSquare1 * this.stereoPosLSquare1 + this.smpSquare2 * this.stereoPosLSquare2 >> 8;
    tnd_index = 3 * this.smpTriangle * this.stereoPosLTriangle + (smpNoise << 1) * this.stereoPosLNoise + this.smpDmc * this.stereoPosLDMC >> 8;
    if (sq_index >= this.square_table.length) {
      sq_index = this.square_table.length - 1;
    }
    if (tnd_index >= this.tnd_table.length) {
      tnd_index = this.tnd_table.length - 1;
    }
    let sampleValueL = this.square_table[sq_index] + this.tnd_table[tnd_index] - this.dcValue;
    sq_index = this.smpSquare1 * this.stereoPosRSquare1 + this.smpSquare2 * this.stereoPosRSquare2 >> 8;
    tnd_index = 3 * this.smpTriangle * this.stereoPosRTriangle + (smpNoise << 1) * this.stereoPosRNoise + this.smpDmc * this.stereoPosRDMC >> 8;
    if (sq_index >= this.square_table.length) {
      sq_index = this.square_table.length - 1;
    }
    if (tnd_index >= this.tnd_table.length) {
      tnd_index = this.tnd_table.length - 1;
    }
    let sampleValueR = this.square_table[sq_index] + this.tnd_table[tnd_index] - this.dcValue;
    let smpDiffL = sampleValueL - this.prevSampleL;
    this.prevSampleL += smpDiffL;
    this.smpAccumL += smpDiffL - (this.smpAccumL >> 10);
    sampleValueL = this.smpAccumL;
    let smpDiffR = sampleValueR - this.prevSampleR;
    this.prevSampleR += smpDiffR;
    this.smpAccumR += smpDiffR - (this.smpAccumR >> 10);
    sampleValueR = this.smpAccumR;
    if (sampleValueL > this.maxSample) {
      this.maxSample = sampleValueL;
    }
    if (sampleValueL < this.minSample) {
      this.minSample = sampleValueL;
    }
    if (this._onSample) {
      this._onSample(sampleValueL / 32768, sampleValueR / 32768);
    }
    this.smpSquare1 = 0;
    this.smpSquare2 = 0;
    this.smpTriangle = 0;
    this.smpDmc = 0;
  }
  // ═══════════════════════════════════════════════════════════════
  // 查找表访问 (供 channel 使用)
  // ═══════════════════════════════════════════════════════════════
  getLengthMax(value) {
    return this.lengthLookup[value >> 3];
  }
  getDmcFrequency(value) {
    if (value >= 0 && value < 16) {
      return this.dmcFreqLookup[value];
    }
    return 0;
  }
  getNoiseWaveLength(value) {
    if (value >= 0 && value < 16) {
      return this.noiseWavelengthLookup[value];
    }
    return 0;
  }
  // ═══════════════════════════════════════════════════════════════
  // 参数设置
  // ═══════════════════════════════════════════════════════════════
  setFrameRate(rate) {
    this.sampleTimerMax = Math.floor(
      1024 * CPU_FREQ_NTSC * rate / (this.sampleRate * 60)
    );
  }
  setPanning(pos) {
    for (let i = 0; i < 5; i++) {
      this.panning[i] = pos[i];
    }
    this.updateStereoPos();
  }
  setMasterVolume(value) {
    if (value < 0) value = 0;
    if (value > 256) value = 256;
    this.masterVolume = value;
    this.updateStereoPos();
  }
  updateStereoPos() {
    this.stereoPosLSquare1 = this.panning[0] * this.masterVolume >> 8;
    this.stereoPosLSquare2 = this.panning[1] * this.masterVolume >> 8;
    this.stereoPosLTriangle = this.panning[2] * this.masterVolume >> 8;
    this.stereoPosLNoise = this.panning[3] * this.masterVolume >> 8;
    this.stereoPosLDMC = this.panning[4] * this.masterVolume >> 8;
    this.stereoPosRSquare1 = this.masterVolume - this.stereoPosLSquare1;
    this.stereoPosRSquare2 = this.masterVolume - this.stereoPosLSquare2;
    this.stereoPosRTriangle = this.masterVolume - this.stereoPosLTriangle;
    this.stereoPosRNoise = this.masterVolume - this.stereoPosLNoise;
    this.stereoPosRDMC = this.masterVolume - this.stereoPosLDMC;
  }
  // ═══════════════════════════════════════════════════════════════
  // 查找表初始化
  // ═══════════════════════════════════════════════════════════════
  initLengthLookup() {
    this.lengthLookup = [
      10,
      254,
      20,
      2,
      40,
      4,
      80,
      6,
      160,
      8,
      60,
      10,
      14,
      12,
      26,
      14,
      12,
      16,
      24,
      18,
      48,
      20,
      96,
      22,
      192,
      24,
      72,
      26,
      16,
      28,
      32,
      30
    ];
  }
  initDmcFrequencyLookup() {
    this.dmcFreqLookup = new Array(16);
    const freqs = [
      3424,
      3040,
      2720,
      2560,
      2288,
      2032,
      1808,
      1712,
      1520,
      1280,
      1136,
      1024,
      848,
      672,
      576,
      432
    ];
    for (let i = 0; i < 16; i++) this.dmcFreqLookup[i] = freqs[i];
  }
  initNoiseWavelengthLookup() {
    this.noiseWavelengthLookup = new Array(16);
    const waves = [
      4,
      8,
      16,
      32,
      64,
      96,
      128,
      160,
      202,
      254,
      380,
      508,
      762,
      1016,
      2034,
      4068
    ];
    for (let i = 0; i < 16; i++) this.noiseWavelengthLookup[i] = waves[i];
  }
  initDACtables() {
    let value, ival, i;
    let max_sqr = 0;
    let max_tnd = 0;
    this.square_table = new Array(32 * 16);
    this.tnd_table = new Array(204 * 16);
    for (i = 0; i < 32 * 16; i++) {
      value = 95.52 / (8128 / (i / 16) + 100);
      value *= 0.98411;
      value *= 5e4;
      ival = Math.floor(value);
      this.square_table[i] = ival;
      if (ival > max_sqr) max_sqr = ival;
    }
    for (i = 0; i < 204 * 16; i++) {
      value = 163.67 / (24329 / (i / 16) + 100);
      value *= 0.98411;
      value *= 5e4;
      ival = Math.floor(value);
      this.tnd_table[i] = ival;
      if (ival > max_tnd) max_tnd = ival;
    }
    this.dacRange = max_sqr + max_tnd;
    this.dcValue = this.dacRange / 2;
  }
};
var index_default = PAPU;
