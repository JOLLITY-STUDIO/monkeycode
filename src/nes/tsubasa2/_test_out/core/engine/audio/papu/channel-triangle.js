"use strict";
/**
 * ChannelTriangle — NES APU Triangle Wave Channel
 * Adapted from src/papu/channel-triangle.ts
 * Stripped of 'utils' dependency & JSON serialization for H5.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ChannelTriangle {
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
        this.sampleValue = 0xf;
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
        }
        else if (this.linearCounter > 0) {
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
        if (address === 0x4008) {
            this.lcControl = (value & 0x80) !== 0;
            this.lcLoadValue = value & 0x7f;
            this.lengthCounterEnable = !this.lcControl;
        }
        else if (address === 0x400a) {
            this.progTimerMax &= 0x700;
            this.progTimerMax |= value;
        }
        else if (address === 0x400b) {
            this.progTimerMax &= 0xff;
            this.progTimerMax |= (value & 0x07) << 8;
            if (this.isEnabled) {
                this.lengthCounter = this.papu.getLengthMax(value & 0xf8);
            }
            this.lcHalt = true;
        }
        this.updateSampleCondition();
    }
    clockProgrammableTimer(nCycles) {
        if (this.progTimerMax > 0) {
            this.progTimerCount += nCycles;
            while (this.progTimerMax > 0 &&
                this.progTimerCount >= this.progTimerMax) {
                this.progTimerCount -= this.progTimerMax;
                if (this.isEnabled &&
                    this.lengthCounter > 0 &&
                    this.linearCounter > 0) {
                    this.clockTriangleGenerator();
                }
            }
        }
    }
    clockTriangleGenerator() {
        this.triangleCounter++;
        this.triangleCounter &= 0x1f;
    }
    setEnabled(value) {
        this.isEnabled = value;
        if (!value) {
            this.lengthCounter = 0;
        }
        this.updateSampleCondition();
    }
    updateSampleCondition() {
        this.sampleCondition =
            this.isEnabled &&
                this.progTimerMax > 7 &&
                this.linearCounter > 0 &&
                this.lengthCounter > 0;
    }
}
exports.default = ChannelTriangle;
