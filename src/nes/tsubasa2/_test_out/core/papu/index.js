"use strict";
/**
 * PAPU — NES APU (Audio Processing Unit) 纯逻辑实现
 * Adapted from src/papu/index.ts
 *
 * H5 适配要点:
 *   - 移除 nes/cpu 依赖，直接接受 sampleRate 参数
 *   - 移除 JSON 序列化 (toJSON/fromJSON)
 *   - 移除 CPU IRQ 处理 (无 CPU 中断)
 *   - DMC DMA 取指由外部通过 dmc.setSampleProvider 注入
 *   - 音频输出通过 onSample 回调
 *   - 帧计数器保持完整逻辑
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const channel_square_1 = __importDefault(require("./channel-square"));
const channel_triangle_1 = __importDefault(require("./channel-triangle"));
const channel_noise_1 = __importDefault(require("./channel-noise"));
const channel_dm_1 = __importDefault(require("./channel-dm"));
const CPU_FREQ_NTSC = 1789772.5;
// Frame counter step timing tables (in CPU cycles).
const FRAME_STEPS_4 = [7457, 14913, 22371, 29828, 29829];
const FRAME_STEPS_5 = [7457, 14913, 22371, 29829, 37281];
const FRAME_PERIOD_4 = 29830;
const FRAME_PERIOD_5 = 37282;
class PAPU {
    /**
     * @param sampleRate 输出采样率
     * @param regBuffer 外部 APU 寄存器缓存 (0x4000-0x4017, 24B)
     *                  传 null 则内部分配。推荐传入 data/audio apuBuffer。
     */
    constructor(sampleRate = 44100, regBuffer) {
        /** Audio sample callback — 外部 Web Audio 输出 */
        this._onSample = null;
        this.square1 = new channel_square_1.default(this, true);
        this.square2 = new channel_square_1.default(this, false);
        this.triangle = new channel_triangle_1.default(this);
        this.noise = new channel_noise_1.default(this);
        this.dmc = new channel_dm_1.default(this);
        this.regValues = regBuffer ?? new Uint8Array(0x18);
        this.startedPlaying = false;
        this.recordOutput = false;
        this.triValue = 0;
        // DC removal
        this.prevSampleL = 0;
        this.prevSampleR = 0;
        this.smpAccumL = 0;
        this.smpAccumR = 0;
        this.dacRange = 0;
        this.dcValue = 0;
        this.masterVolume = 256;
        // Default panning: [SQ1, SQ2, TRI, NOISE, DMC]
        this.panning = [80, 170, 100, 150, 128];
        this.setPanning(this.panning);
        // Initialize lookup tables
        this.initLengthLookup();
        this.initDmcFrequencyLookup();
        this.initNoiseWavelengthLookup();
        this.initDACtables();
        // Init sound registers
        for (let i = 0; i < 0x14; i++) {
            if (i === 0x10) {
                this.writeReg(0x4010, 0x10);
            }
            else {
                this.writeReg(0x4000 + i, 0);
            }
        }
        this.sampleRate = sampleRate;
        this.sampleTimerMax = Math.floor((1024.0 * CPU_FREQ_NTSC) / this.sampleRate);
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
        this.channelEnableValue = 0xff;
        this.extraCycles = 0;
        this.maxSample = -500000;
        this.minSample = 500000;
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
        if (address !== 0x4015)
            return 0;
        let tmp = 0;
        tmp |= this.square1.getLengthStatus();
        tmp |= this.square2.getLengthStatus() << 1;
        tmp |= this.triangle.getLengthStatus() << 2;
        tmp |= this.noise.getLengthStatus() << 3;
        tmp |= this.dmc.getLengthStatus() << 4;
        // bit5: no open bus → 0
        // bit6: no frame IRQ → 0
        tmp |= this.dmc.getIrqStatus() << 7;
        return tmp & 0xff;
    }
    writeReg(address, value) {
        // 记录最后写入的原始字节（供调试 UI 显示）
        if (address >= 0x4000 && address <= 0x4017) {
            this.regValues[address - 0x4000] = value & 0xff;
        }
        if (address >= 0x4000 && address < 0x4004) {
            this.square1.writeReg(address, value);
        }
        else if (address >= 0x4004 && address < 0x4008) {
            this.square2.writeReg(address, value);
        }
        else if (address >= 0x4008 && address < 0x400c) {
            this.triangle.writeReg(address, value);
        }
        else if (address >= 0x400c && address <= 0x400f) {
            this.noise.writeReg(address, value);
        }
        else if (address === 0x4010) {
            this.dmc.writeReg(address, value);
        }
        else if (address === 0x4011) {
            this.dmc.writeReg(address, value);
        }
        else if (address === 0x4012) {
            this.dmc.writeReg(address, value);
        }
        else if (address === 0x4013) {
            this.dmc.writeReg(address, value);
        }
        else if (address === 0x4015) {
            this.updateChannelEnable(value);
            this.dmc.writeReg(address, value);
        }
        else if (address === 0x4017) {
            this.countSequence = (value >> 7) & 1;
            // H5: 简化帧计数器重置 — 无 CPU cycle parity 依赖
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
        this.channelEnableValue = value & 0xff;
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
        // NES NTSC: ~29780.5 CPU cycles per frame
        this.clockFrameCounter(29830);
    }
    clockFrameCounter(nCycles, frameCounterAlreadyAdvanced) {
        let frameCounterCycles = nCycles - (frameCounterAlreadyAdvanced || 0);
        // H5: 无 frameIrqClear → 跳过
        this.apuCycleParity = (this.apuCycleParity + frameCounterCycles) & 1;
        nCycles += this.extraCycles;
        let maxCycles = this.sampleTimerMax - this.sampleTimer;
        if (nCycles << 10 > maxCycles) {
            this.extraCycles = ((nCycles << 10) - maxCycles) >> 10;
            nCycles -= this.extraCycles;
        }
        else {
            this.extraCycles = 0;
        }
        let dmc = this.dmc;
        let triangle = this.triangle;
        let square1 = this.square1;
        let square2 = this.square2;
        let noise = this.noise;
        // Clock DMC
        if (dmc.isEnabled) {
            dmc.shiftCounter -= nCycles << 3;
            while (dmc.shiftCounter <= 0 && dmc.dmaFrequency > 0) {
                dmc.shiftCounter += dmc.dmaFrequency;
                dmc.clockDmc();
            }
        }
        // Clock Triangle
        if (triangle.progTimerMax > 0) {
            triangle.progTimerCount -= nCycles;
            while (triangle.progTimerCount <= 0) {
                triangle.progTimerCount += triangle.progTimerMax + 1;
                if (triangle.linearCounter > 0 && triangle.lengthCounter > 0) {
                    triangle.triangleCounter++;
                    triangle.triangleCounter &= 0x1f;
                    if (triangle.isEnabled) {
                        if (triangle.triangleCounter >= 0x10) {
                            triangle.sampleValue = triangle.triangleCounter & 0xf;
                        }
                        else {
                            triangle.sampleValue = 0xf - (triangle.triangleCounter & 0xf);
                        }
                        triangle.sampleValue <<= 4;
                    }
                }
            }
        }
        // Clock Square1
        square1.progTimerCount -= nCycles;
        if (square1.progTimerCount <= 0) {
            square1.progTimerCount += (square1.progTimerMax + 1) << 1;
            square1.squareCounter++;
            square1.squareCounter &= 0x7;
            square1.updateSampleValue();
        }
        // Clock Square2
        square2.progTimerCount -= nCycles;
        if (square2.progTimerCount <= 0) {
            square2.progTimerCount += (square2.progTimerMax + 1) << 1;
            square2.squareCounter++;
            square2.squareCounter &= 0x7;
            square2.updateSampleValue();
        }
        // Clock Noise
        let acc_c = nCycles;
        if (noise.progTimerCount - acc_c > 0) {
            noise.progTimerCount -= acc_c;
            noise.accCount += acc_c;
            noise.accValue += acc_c * noise.sampleValue;
        }
        else {
            while (acc_c-- > 0) {
                if (--noise.progTimerCount <= 0 && noise.progTimerMax > 0) {
                    noise.shiftReg <<= 1;
                    noise.tmp =
                        ((noise.shiftReg << (noise.randomMode === 0 ? 1 : 6)) ^
                            noise.shiftReg) &
                            0x8000;
                    if (noise.tmp !== 0) {
                        noise.shiftReg |= 0x01;
                        noise.randomBit = 0;
                        noise.sampleValue = 0;
                    }
                    else {
                        noise.randomBit = 1;
                        if (noise.isEnabled && noise.lengthCounter > 0) {
                            noise.sampleValue = noise.masterVolume;
                        }
                        else {
                            noise.sampleValue = 0;
                        }
                    }
                    noise.progTimerCount += noise.progTimerMax;
                }
                noise.accValue += noise.sampleValue;
                noise.accCount++;
            }
        }
        // H5: 无 frame IRQ → 跳过 requestIrq
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
        // H5: 无 frameIrqClear → 跳过
        this.apuCycleParity = (this.apuCycleParity + nCycles) & 1;
        this._advanceFrameSteps(nCycles);
    }
    /** 仅推进帧 steps（envelope / length counter / sweep） */
    endFrame() {
        // 推进整帧 steps: ~29830 cycles
        this.advanceFrameCounter(29830);
    }
    // ═══════════════════════════════════════════════════════════════
    // 帧 step 调度
    // ═══════════════════════════════════════════════════════════════
    _advanceFrameSteps(frameCounterCycles) {
        this.frameCycleCounter += frameCounterCycles;
        let steps = this.countSequence === 0 ? FRAME_STEPS_4 : FRAME_STEPS_5;
        let period = this.countSequence === 0 ? FRAME_PERIOD_4 : FRAME_PERIOD_5;
        for (;;) {
            if (this.frameStep < steps.length &&
                this.frameCycleCounter >= steps[this.frameStep]) {
                this.fireFrameStep(this.frameStep);
                this.frameStep++;
            }
            else if (this.frameStep >= steps.length &&
                this.frameCycleCounter >= period) {
                this.frameStep = 0;
                this.frameCycleCounter -= period;
                // H5: 无 frame IRQ 标志
            }
            else {
                break;
            }
        }
    }
    accSample(cycles) {
        if (this.triangle.sampleCondition) {
            this.triValue = Math.floor((this.triangle.progTimerCount << 4) / (this.triangle.progTimerMax + 1));
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
        }
        else if (cycles === 4) {
            this.smpTriangle += this.triValue << 2;
            this.smpDmc += this.dmc.sample << 2;
            this.smpSquare1 += this.square1.sampleValue << 2;
            this.smpSquare2 += this.square2.sampleValue << 2;
            this.accCount += 4;
        }
        else {
            this.smpTriangle += cycles * this.triValue;
            this.smpDmc += cycles * this.dmc.sample;
            this.smpSquare1 += cycles * this.square1.sampleValue;
            this.smpSquare2 += cycles * this.square2.sampleValue;
            this.accCount += cycles;
        }
    }
    fireFrameStep(step) {
        if (this.countSequence === 0) {
            // 4-step mode
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
                case 3: /* IRQ only */ break;
                case 4:
                    this.clockQuarterFrame();
                    this.clockHalfFrame();
                    break;
            }
        }
        else {
            // 5-step mode
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
                case 3: break;
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
        }
        else {
            this.smpSquare1 = this.square1.sampleValue << 4;
            this.smpSquare2 = this.square2.sampleValue << 4;
            this.smpTriangle = this.triangle.sampleValue;
            this.smpDmc = this.dmc.sample << 4;
        }
        let smpNoise = Math.floor((this.noise.accValue << 4) / this.noise.accCount);
        this.noise.accValue = smpNoise >> 4;
        this.noise.accCount = 1;
        // Left channel
        sq_index =
            (this.smpSquare1 * this.stereoPosLSquare1 +
                this.smpSquare2 * this.stereoPosLSquare2) >> 8;
        tnd_index =
            (3 * this.smpTriangle * this.stereoPosLTriangle +
                (smpNoise << 1) * this.stereoPosLNoise +
                this.smpDmc * this.stereoPosLDMC) >> 8;
        if (sq_index >= this.square_table.length) {
            sq_index = this.square_table.length - 1;
        }
        if (tnd_index >= this.tnd_table.length) {
            tnd_index = this.tnd_table.length - 1;
        }
        let sampleValueL = this.square_table[sq_index] + this.tnd_table[tnd_index] - this.dcValue;
        // Right channel
        sq_index =
            (this.smpSquare1 * this.stereoPosRSquare1 +
                this.smpSquare2 * this.stereoPosRSquare2) >> 8;
        tnd_index =
            (3 * this.smpTriangle * this.stereoPosRTriangle +
                (smpNoise << 1) * this.stereoPosRNoise +
                this.smpDmc * this.stereoPosRDMC) >> 8;
        if (sq_index >= this.square_table.length) {
            sq_index = this.square_table.length - 1;
        }
        if (tnd_index >= this.tnd_table.length) {
            tnd_index = this.tnd_table.length - 1;
        }
        let sampleValueR = this.square_table[sq_index] + this.tnd_table[tnd_index] - this.dcValue;
        // DC removal — left
        let smpDiffL = sampleValueL - this.prevSampleL;
        this.prevSampleL += smpDiffL;
        this.smpAccumL += smpDiffL - (this.smpAccumL >> 10);
        sampleValueL = this.smpAccumL;
        // DC removal — right
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
        // 输出到回调
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
        if (value >= 0 && value < 0x10) {
            return this.dmcFreqLookup[value];
        }
        return 0;
    }
    getNoiseWaveLength(value) {
        if (value >= 0 && value < 0x10) {
            return this.noiseWavelengthLookup[value];
        }
        return 0;
    }
    // ═══════════════════════════════════════════════════════════════
    // 参数设置
    // ═══════════════════════════════════════════════════════════════
    setFrameRate(rate) {
        this.sampleTimerMax = Math.floor((1024.0 * CPU_FREQ_NTSC * rate) / (this.sampleRate * 60.0));
    }
    setPanning(pos) {
        for (let i = 0; i < 5; i++) {
            this.panning[i] = pos[i];
        }
        this.updateStereoPos();
    }
    setMasterVolume(value) {
        if (value < 0)
            value = 0;
        if (value > 256)
            value = 256;
        this.masterVolume = value;
        this.updateStereoPos();
    }
    updateStereoPos() {
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
    // ═══════════════════════════════════════════════════════════════
    // 查找表初始化
    // ═══════════════════════════════════════════════════════════════
    initLengthLookup() {
        // prettier-ignore
        this.lengthLookup = [
            0x0A, 0xFE, 0x14, 0x02, 0x28, 0x04, 0x50, 0x06,
            0xA0, 0x08, 0x3C, 0x0A, 0x0E, 0x0C, 0x1A, 0x0E,
            0x0C, 0x10, 0x18, 0x12, 0x30, 0x14, 0x60, 0x16,
            0xC0, 0x18, 0x48, 0x1A, 0x10, 0x1C, 0x20, 0x1E,
        ];
    }
    initDmcFrequencyLookup() {
        this.dmcFreqLookup = new Array(16);
        // prettier-ignore
        const freqs = [0xd60, 0xbe0, 0xaa0, 0xa00, 0x8f0, 0x7f0, 0x710, 0x6b0,
            0x5f0, 0x500, 0x470, 0x400, 0x350, 0x2a0, 0x240, 0x1b0];
        for (let i = 0; i < 16; i++)
            this.dmcFreqLookup[i] = freqs[i];
    }
    initNoiseWavelengthLookup() {
        this.noiseWavelengthLookup = new Array(16);
        // prettier-ignore
        const waves = [0x004, 0x008, 0x010, 0x020, 0x040, 0x060, 0x080, 0x0a0,
            0x0ca, 0x0fe, 0x17c, 0x1fc, 0x2fa, 0x3f8, 0x7f2, 0xfe4];
        for (let i = 0; i < 16; i++)
            this.noiseWavelengthLookup[i] = waves[i];
    }
    initDACtables() {
        let value, ival, i;
        let max_sqr = 0;
        let max_tnd = 0;
        this.square_table = new Array(32 * 16);
        this.tnd_table = new Array(204 * 16);
        for (i = 0; i < 32 * 16; i++) {
            value = 95.52 / (8128.0 / (i / 16.0) + 100.0);
            value *= 0.98411;
            value *= 50000.0;
            ival = Math.floor(value);
            this.square_table[i] = ival;
            if (ival > max_sqr)
                max_sqr = ival;
        }
        for (i = 0; i < 204 * 16; i++) {
            value = 163.67 / (24329.0 / (i / 16.0) + 100.0);
            value *= 0.98411;
            value *= 50000.0;
            ival = Math.floor(value);
            this.tnd_table[i] = ival;
            if (ival > max_tnd)
                max_tnd = ival;
        }
        this.dacRange = max_sqr + max_tnd;
        this.dcValue = this.dacRange / 2;
    }
}
exports.default = PAPU;
