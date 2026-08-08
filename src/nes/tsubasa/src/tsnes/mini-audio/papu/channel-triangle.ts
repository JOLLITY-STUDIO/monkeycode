import { fromJSON, toJSON } from "../utils";

class ChannelTriangle {
  papu: any;
  progTimerCount: number;
  progTimerMax: number;
  triangleCounter: number;
  isEnabled: boolean;
  sampleCondition: boolean;
  lengthCounter: number;
  lengthCounterEnable: boolean;
  linearCounter: number;
  lcLoadValue: number;
  lcHalt: boolean;
  lcControl: boolean;
  tmp: number;
  sampleValue: number;

  static JSON_PROPERTIES = [
    "isEnabled","sampleCondition","lengthCounterEnable","lcHalt","lcControl",
    "progTimerCount","progTimerMax","triangleCounter","lengthCounter",
    "linearCounter","lcLoadValue","sampleValue","tmp",
  ];

  constructor(papu: any) {
    this.papu = papu;
    this.progTimerCount = 0; this.progTimerMax = 0;
    this.triangleCounter = 0; this.isEnabled = false;
    this.sampleCondition = false; this.lengthCounter = 0;
    this.lengthCounterEnable = false; this.linearCounter = 0;
    this.lcLoadValue = 0; this.lcHalt = true;
    this.lcControl = false; this.tmp = 0; this.sampleValue = 0xf;
  }

  clockLengthCounter(): void {
    if (this.lengthCounterEnable && this.lengthCounter > 0) {
      this.lengthCounter--;
      if (this.lengthCounter === 0) this.updateSampleCondition();
    }
  }

  clockLinearCounter(): void {
    if (this.lcHalt) {
      this.linearCounter = this.lcLoadValue;
      this.updateSampleCondition();
    } else if (this.linearCounter > 0) {
      this.linearCounter--;
      this.updateSampleCondition();
    }
    if (!this.lcControl) this.lcHalt = false;
  }

  getLengthStatus(): number { return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1; }

  writeReg(address: number, value: number): void {
    if (address === 0x4008) {
      this.lcControl = (value & 0x80) !== 0;
      this.lcLoadValue = value & 0x7f;
      this.lengthCounterEnable = !this.lcControl;
    } else if (address === 0x400a) {
      this.progTimerMax &= 0x700; this.progTimerMax |= value;
    } else if (address === 0x400b) {
      this.progTimerMax &= 0xff; this.progTimerMax |= (value & 0x07) << 8;
      if (this.isEnabled) this.lengthCounter = this.papu.getLengthMax(value & 0xf8);
      this.lcHalt = true;
    }
    this.updateSampleCondition();
  }

  setEnabled(value: boolean): void {
    this.isEnabled = value;
    if (!value) this.lengthCounter = 0;
    this.updateSampleCondition();
  }

  updateSampleCondition(): void {
    this.sampleCondition = this.isEnabled && this.progTimerMax > 7 && this.linearCounter > 0 && this.lengthCounter > 0;
  }

  toJSON(): any { return toJSON(this); }
  fromJSON(s: any): void { fromJSON(this, s); }
}

export default ChannelTriangle;
