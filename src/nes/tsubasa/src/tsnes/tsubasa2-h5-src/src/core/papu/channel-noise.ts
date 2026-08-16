import { fromJSON, toJSON } from "../utils";

class ChannelNoise {
  papu: any;

  progTimerCount: number;
  progTimerMax: number;
  isEnabled: boolean;
  lengthCounter: number;
  lengthCounterEnable: boolean;
  envDecayDisable: boolean;
  envDecayLoopEnable: boolean;
  envReset: boolean;
  shiftNow: boolean;
  envDecayRate: number;
  envDecayCounter: number;
  envVolume: number;
  masterVolume: number;
  shiftReg: number;
  randomBit: number;
  randomMode: number;
  sampleValue: number;
  tmp: number;
  accValue: number;
  accCount: number;

  static JSON_PROPERTIES = [
    "isEnabled",
    "envDecayDisable",
    "envDecayLoopEnable",
    "lengthCounterEnable",
    "envReset",
    "shiftNow",
    "lengthCounter",
    "progTimerCount",
    "progTimerMax",
    "envDecayRate",
    "envDecayCounter",
    "envVolume",
    "masterVolume",
    "shiftReg",
    "randomBit",
    "randomMode",
    "sampleValue",
    "accValue",
    "accCount",
    "tmp",
  ];

  constructor(papu: any) {
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

  clockLengthCounter(): void {
    if (this.lengthCounterEnable && this.lengthCounter > 0) {
      this.lengthCounter--;
      if (this.lengthCounter === 0) {
        this.updateSampleValue();
      }
    }
  }

  clockEnvDecay(): void {
    if (this.envReset) {
      // Reset envelope:
      this.envReset = false;
      this.envDecayCounter = this.envDecayRate + 1;
      this.envVolume = 0xf;
    } else if (--this.envDecayCounter <= 0) {
      // Normal handling:
      this.envDecayCounter = this.envDecayRate + 1;
      if (this.envVolume > 0) {
        this.envVolume--;
      } else {
        this.envVolume = this.envDecayLoopEnable ? 0xf : 0;
      }
    }
    if (this.envDecayDisable) {
      this.masterVolume = this.envDecayRate;
    } else {
      this.masterVolume = this.envVolume;
    }
    this.updateSampleValue();
  }

  updateSampleValue(): void {
    if (this.isEnabled && this.lengthCounter > 0) {
      this.sampleValue = this.randomBit * this.masterVolume;
    }
  }

  writeReg(address: number, value: number): void {
    if (address === 0x400c) {
      // Volume/Envelope decay:
      this.envDecayDisable = (value & 0x10) !== 0;
      this.envDecayRate = value & 0xf;
      this.envDecayLoopEnable = (value & 0x20) !== 0;
      this.lengthCounterEnable = (value & 0x20) === 0;
      if (this.envDecayDisable) {
        this.masterVolume = this.envDecayRate;
      } else {
        this.masterVolume = this.envVolume;
      }
    } else if (address === 0x400e) {
      // Programmable timer:
      this.progTimerMax = this.papu.getNoiseWaveLength(value & 0xf);
      this.randomMode = value >> 7;
    } else if (address === 0x400f) {
      // Length counter — only loaded when the channel is enabled via $4015.
      // Writing this register while disabled has no effect on the length counter.
      // See https://www.nesdev.org/wiki/APU#Status_($4015)
      if (this.isEnabled) {
        this.lengthCounter = this.papu.getLengthMax(value & 248);
      }
      this.envReset = true;
    }
    // Update:
    //updateSampleValue();
  }

  setEnabled(value: boolean): void {
    this.isEnabled = value;
    if (!value) {
      this.lengthCounter = 0;
    }
    this.updateSampleValue();
  }

  getLengthStatus(): number {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }

  toJSON(): any {
    return toJSON(this);
  }

  fromJSON(s: any): void {
    fromJSON(this, s);
  }
}

export default ChannelNoise;
