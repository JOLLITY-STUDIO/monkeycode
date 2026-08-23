"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebAudioApuTarget = void 0;
/** Pulse/Triangle 通道频率表（NES APU 频率值 → Hz） */
function apuFreqToHz(freq) {
    // NES APU: freq = (cpuClock / 32) / (register + 1)
    // CPU clock = 1789773 Hz
    if (freq === 0)
        return 0;
    return 1789773 / (16 * (freq + 1));
}
class WebAudioApuTarget {
    constructor() {
        this.ctx = null;
        this.pulse1 = null;
        this.pulse2 = null;
        this.triangle = null;
        this.noiseSrc = null;
        this.noiseGain = null;
        this.masterGain = null;
        this.enabled = 0x00;
    }
    /** 初始化（必须在用户交互后调用） */
    async init() {
        const Ctor = globalThis.AudioContext
            ?? globalThis.webkitAudioContext;
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
    createPulseChannel() {
        const ctx = this.ctx;
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.value = 440;
        const gain = ctx.createGain();
        gain.gain.value = 0;
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        return { oscillator: osc, gain, freq: 0, volume: 0, duty: 0 };
    }
    createNoiseSource() {
        const ctx = this.ctx;
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
    writeRegister(addr, value) {
        if (!this.ctx)
            return;
        switch (addr) {
            case 0x4000:
                this.writePulseControl(this.pulse1, value);
                break;
            case 0x4001:
                this.writePulseSweep(this.pulse1, value);
                break;
            case 0x4002:
                this.writePulseFreqLo(this.pulse1, value);
                break;
            case 0x4003:
                this.writePulseFreqHi(this.pulse1, value);
                break;
            case 0x4004:
                this.writePulseControl(this.pulse2, value);
                break;
            case 0x4005:
                this.writePulseSweep(this.pulse2, value);
                break;
            case 0x4006:
                this.writePulseFreqLo(this.pulse2, value);
                break;
            case 0x4007:
                this.writePulseFreqHi(this.pulse2, value);
                break;
            case 0x4008:
                this.writeTriangleControl(value);
                break;
            case 0x400A:
                this.writePulseFreqLo(this.triangle, value);
                break;
            case 0x400B:
                this.writePulseFreqHi(this.triangle, value);
                break;
            case 0x400C:
                this.writeNoiseControl(value);
                break;
            case 0x400E:
                this.writeNoiseFreq(value);
                break;
            case 0x4010: /* DPCM 控制 */ break;
            case 0x4012: /* DPCM 地址 */ break;
            case 0x4013: /* DPCM 长度 */ break;
            case 0x4015:
                this.writeStatus(value);
                break;
        }
    }
    writePulseControl(ch, value) {
        if (!ch)
            return;
        // bit 0-3: 音量/包络；bit 4: 包络标志；bit 5-6: 占空比；bit 7: 长度计数器
        const vol = (value & 0x0F) / 15;
        ch.volume = vol;
        ch.duty = (value >> 6) & 0x03;
        if (value & 0x10) {
            // 使用包络（简化：固定音量）
            ch.gain.gain.value = vol;
        }
        else {
            ch.gain.gain.value = vol;
        }
    }
    writePulseSweep(_ch, _value) {
        // 扫描单元（简化：未实现）
    }
    writePulseFreqLo(ch, value) {
        if (!ch)
            return;
        ch.freq = (ch.freq & 0xFF00) | value;
        this.updatePulseFreq(ch);
    }
    writePulseFreqHi(ch, value) {
        if (!ch)
            return;
        ch.freq = (ch.freq & 0x00FF) | ((value & 0x07) << 8);
        this.updatePulseFreq(ch);
    }
    updatePulseFreq(ch) {
        const hz = apuFreqToHz(ch.freq);
        if (hz > 0 && hz < 20000) {
            ch.oscillator.frequency.value = hz;
        }
    }
    writeTriangleControl(value) {
        if (!this.triangle)
            return;
        // Triangle 通道：bit 0-7 控制音量/长度
        const vol = (value & 0x7F) / 127;
        this.triangle.gain.gain.value = vol * 0.5; // Triangle 音量较低
    }
    writeNoiseControl(value) {
        if (!this.noiseGain)
            return;
        const vol = (value & 0x0F) / 15;
        this.noiseGain.gain.value = vol * 0.3;
    }
    writeNoiseFreq(value) {
        // Noise 频率（简化：未实现频率变化）
        void value;
    }
    writeStatus(value) {
        this.enabled = value;
        // 通道使能/禁用
        if (this.pulse1)
            this.pulse1.gain.gain.value = (value & 0x01) ? this.pulse1.volume : 0;
        if (this.pulse2)
            this.pulse2.gain.gain.value = (value & 0x02) ? this.pulse2.volume : 0;
        if (this.triangle)
            this.triangle.gain.gain.value = (value & 0x04) ? this.triangle.volume * 0.5 : 0;
        if (this.noiseGain)
            this.noiseGain.gain.value = (value & 0x08) ? this.noiseGain.gain.value : 0;
    }
    /** 暂停音频 */
    suspend() {
        this.ctx?.suspend();
    }
    /** 恢复音频 */
    async resume() {
        await this.ctx?.resume();
    }
    /** 销毁 */
    dispose() {
        this.pulse1?.oscillator.stop();
        this.pulse2?.oscillator.stop();
        this.triangle?.oscillator.stop();
        this.noiseSrc?.stop();
        this.ctx?.close();
        this.ctx = null;
    }
}
exports.WebAudioApuTarget = WebAudioApuTarget;
