"use strict";
/**
 * WebAudioOutput — IAudioOutput 实现 (Web Audio API)
 *
 * 将 Bank12AudioService 的 APU 寄存器写入转换为实际音频输出。
 * 兼容微信小程序 WebAudio API（通过 AudioContext）。
 *
 * 架构:
 *   ApuWriteEvent[] → 通道状态缓存 (freq/vol/duty) → ScriptProcessor
 *   → 连续波形生成 → AudioContext.destination
 *
 * 通道对应:
 *   $4000-$4003 → Square 1
 *   $4004-$4007 → Square 2
 *   $4008-$400B → Triangle
 *   $400C-$400F → Noise (暂不实现)
 *   $4010-$4013 → DMC (暂不实现)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebAudioOutput = void 0;
// ════════════════════════════════════════════
// APU 寄存器常量
// ════════════════════════════════════════════
const APU_SQ1_CTRL = 0x4000; // Duty + Envelope
const APU_SQ1_SWEEP = 0x4001; // Sweep
const APU_SQ1_TIMER_LO = 0x4002;
const APU_SQ1_TIMER_HI = 0x4003;
const APU_SQ2_CTRL = 0x4004;
const APU_SQ2_SWEEP = 0x4005;
const APU_SQ2_TIMER_LO = 0x4006;
const APU_SQ2_TIMER_HI = 0x4007;
const APU_TRI_CTRL = 0x4008;
const APU_TRI_UNUSED = 0x4009; // Triangle has no sweep
const APU_TRI_TIMER_LO = 0x400A;
const APU_TRI_TIMER_HI = 0x400B;
const APU_NOISE_CTRL = 0x400C;
const APU_NOISE_PERIOD = 0x400E;
const APU_NOISE_LENGTH = 0x400F;
const APU_STATUS = 0x4015;
// ════════════════════════════════════════════
// 音频参数
// ════════════════════════════════════════════
const SAMPLE_RATE = 44100;
/** NES 方波 duty 表 */
const DUTY_TABLE = [
    [0, 1, 0, 0, 0, 0, 0, 0], // 12.5%
    [0, 1, 1, 0, 0, 0, 0, 0], // 25%
    [0, 1, 1, 1, 1, 0, 0, 0], // 50%
    [1, 0, 0, 1, 1, 1, 1, 1], // 75% (inverted 25%)
];
// ════════════════════════════════════════════
// WebAudioOutput
// ════════════════════════════════════════════
class WebAudioOutput {
    constructor() {
        this._ctx = null;
        this._node = null;
        this._started = false;
        /** NES CPU 频率 (NTSC) */
        this._cpuFreq = 1789773;
        /** frame counter ticks per second (~240Hz) */
        this._frameCounterHz = 240;
        // ──────────────────────────────────────────────
        // 内部: 音频生成 (ScriptProcessorNode callback)
        // ──────────────────────────────────────────────
        this._onAudioProcess = (event) => {
            const out = event.outputBuffer.getChannelData(0);
            const len = out.length;
            const sampleRate = this._ctx?.sampleRate ?? SAMPLE_RATE;
            // NES 每 CPU 周期 = 1 / cpuFrequency 秒
            // 每个采样点需要推进的 CPU 周期 = cpuFrequency / sampleRate
            // 但波形生成在 NES 定时器周期单位上：
            //   方波频率 = cpuFrequency / (16 * (timer + 1))
            //   timer 每 (timer + 1) * (16 for SQ, 32 for TRI) CPU 周期步进一次
            //   三角波步进 = cpuFrequency / (32 * (timer + 1))
            //
            // 简化：每个采样点计算一次波形值，phase 被视为连续相位
            //   方波：在一个 duty 周期内 phase 递增，phase / 8 = duty index
            //   三角波：phase 0-31 线性递增/递减
            for (let i = 0; i < len; i++) {
                out[i] = (this._genSquare(this._sq1, sampleRate)
                    + this._genSquare(this._sq2, sampleRate)
                    + this._genTriangle(this._tri, sampleRate)) * 0.15; // 衰减防止爆音
            }
        };
        this._sq1 = this._makeChan();
        this._sq2 = this._makeChan();
        this._tri = this._makeChan();
        this._noise = this._makeChan();
    }
    // ──────────────────────────────────────────────
    // IAudioOutput 实现
    // ──────────────────────────────────────────────
    writeApu(events) {
        if (!events.length)
            return;
        // 确保 AudioContext 已启动
        if (!this._started)
            this._ensureAudioStarted();
        for (const ev of events) {
            this._dispatchWrite(ev.addr, ev.value);
        }
    }
    setChannel(index, freq, volume, duty) {
        // 物理通道到 NES 通道映射: 0→SQ1, 1→SQ2, 2→TRI
        switch (index) {
            case 0:
                this._sq1.timer = freq > 0 ? this._freqToTimer(freq) : 0;
                this._sq1.volume = volume & 0x0F;
                this._sq1.duty = duty & 0x03;
                break;
            case 1:
                this._sq2.timer = freq > 0 ? this._freqToTimer(freq) : 0;
                this._sq2.volume = volume & 0x0F;
                this._sq2.duty = duty & 0x03;
                break;
            case 2:
                this._tri.timer = freq > 0 ? this._freqToTimer(freq) : 0;
                break;
        }
    }
    silenceAll() {
        this._sq1 = this._makeChan();
        this._sq2 = this._makeChan();
        this._tri = this._makeChan();
        this._noise = this._makeChan();
    }
    // ──────────────────────────────────────────────
    // 内部: APU 寄存器分发
    // ──────────────────────────────────────────────
    _dispatchWrite(addr, value) {
        // Square 1 ($4000-$4003)
        if (addr >= 0x4000 && addr <= 0x4003) {
            switch (addr & 0x03) {
                case 0: // $4000: Duty + Volume/Envelope
                    this._sq1.duty = (value >> 6) & 0x03;
                    // 简化: 直接使用音量高4位
                    this._sq1.volume = (value & 0x0F);
                    break;
                case 1: // $4001: Sweep
                    break;
                case 2: // $4002: Timer Low
                    this._sq1.timer = (this._sq1.timer & 0x700) | (value & 0xFF);
                    break;
                case 3: // $4003: Timer High + Length
                    this._sq1.timer = (this._sq1.timer & 0xFF) | ((value & 0x07) << 8);
                    break;
            }
        }
        // Square 2 ($4004-$4007)
        else if (addr >= 0x4004 && addr <= 0x4007) {
            switch (addr & 0x03) {
                case 0: // $4004: Duty + Volume
                    this._sq2.duty = (value >> 6) & 0x03;
                    this._sq2.volume = (value & 0x0F);
                    break;
                case 1: break; // sweep
                case 2: // Timer Low
                    this._sq2.timer = (this._sq2.timer & 0x700) | (value & 0xFF);
                    break;
                case 3: // Timer High
                    this._sq2.timer = (this._sq2.timer & 0xFF) | ((value & 0x07) << 8);
                    break;
            }
        }
        // Triangle ($4008-$400B)
        else if (addr >= 0x4008 && addr <= 0x400B) {
            switch (addr & 0x03) {
                case 0: break; // linear counter control
                case 1: break; // unused
                case 2: // Timer Low
                    this._tri.timer = (this._tri.timer & 0x700) | (value & 0xFF);
                    break;
                case 3: // Timer High
                    this._tri.timer = (this._tri.timer & 0xFF) | ((value & 0x07) << 8);
                    break;
            }
        }
        // Noise ($400C-$400F)
        else if (addr >= 0x400C && addr <= 0x400F) {
            switch (addr & 0x03) {
                case 0: // Volume/Envelope
                    this._noise.volume = (value & 0x0F);
                    break;
                case 2: // Period
                    this._noise.timer = value & 0x0F; // store period index
                    break;
                default: break;
            }
        }
        // Status ($4015)
        else if (addr === 0x4015) {
            this._sq1.enabled = !!(value & 0x01);
            this._sq2.enabled = !!(value & 0x02);
            this._tri.enabled = !!(value & 0x04);
            this._noise.enabled = !!(value & 0x08);
        }
    }
    // ──────────────────────────────────────────────
    // 内部: AudioContext 管理
    // ──────────────────────────────────────────────
    _ensureAudioStarted() {
        if (this._started)
            return;
        this._started = true;
        try {
            // 微信小程序兼容: wx.createWebAudioContext 或 window.AudioContext
            const win = (typeof wx !== 'undefined' && wx.createWebAudioContext)
                ? wx.createWebAudioContext()
                : null;
            this._ctx = win
                ? win
                : new (window.AudioContext || window.webkitAudioContext)({
                    sampleRate: SAMPLE_RATE,
                });
        }
        catch {
            console.warn('[WebAudioOutput] AudioContext 不可用，静音运行');
            return;
        }
        // 使用 ScriptProcessorNode (兼容性最好)
        try {
            this._node = this._ctx.createScriptProcessor(4096, 0, 1);
        }
        catch {
            this._node = this._ctx.createScriptProcessor(4096, 0, 1);
        }
        if (!this._node) {
            console.warn('[WebAudioOutput] createScriptProcessor 不可用');
            return;
        }
        this._node.onaudioprocess = this._onAudioProcess.bind(this);
        this._node.connect(this._ctx.destination);
        console.log('[WebAudioOutput] AudioContext 已启动, sampleRate=' + this._ctx.sampleRate);
    }
    /** 生成方波采样 (SQ1/SQ2) */
    _genSquare(chan, sampleRate) {
        if (!chan.enabled || chan.timer < 8 || chan.volume === 0)
            return 0;
        // NES 方波频率: f = cpuFreq / (16 * (timer + 1))
        const freq = this._cpuFreq / (16 * (chan.timer + 1));
        // 增量: 每采样点推进的 phase 值
        // phase 范围 0-7，每 8 步一个完整周期
        const incr = (8.0 * freq) / sampleRate;
        chan.phase += incr;
        if (chan.phase >= 8)
            chan.phase -= 8;
        // 查 duty table
        const dutyPattern = DUTY_TABLE[chan.duty];
        const sample = dutyPattern[Math.floor(chan.phase) % 8];
        // 音量缩放 (0-15 → 0.0-1.0)
        return sample ? (chan.volume / 15.0) : 0.0;
    }
    /** 生成三角波采样 */
    _genTriangle(chan, sampleRate) {
        if (!chan.enabled || chan.timer < 8)
            return 0;
        // NES 三角波频率: f = cpuFreq / (32 * (timer + 1))
        const freq = this._cpuFreq / (32 * (chan.timer + 1));
        // phase 范围 0-31，每个周期 32 步
        const incr = (32.0 * freq) / sampleRate;
        chan.phase += incr;
        if (chan.phase >= 32)
            chan.phase -= 32;
        // 三角波: 0-15 ramp up, 16-31 ramp down
        const step = Math.floor(chan.phase);
        const val = step < 16 ? step : (31 - step);
        return (val / 15.0 - 0.5) * 0.5; // 中心化 + 衰减
    }
    // ──────────────────────────────────────────────
    // 内部: 工具方法
    // ──────────────────────────────────────────────
    _makeChan() {
        return {
            enabled: false,
            timer: 0,
            volume: 0,
            duty: 0,
            phase: 0,
            sampleAcc: 0,
        };
    }
    /** 频率 (Hz) → NES 定时器周期值 */
    _freqToTimer(freq) {
        return Math.floor(this._cpuFreq / (16 * freq) - 1);
    }
    /** 清理资源 */
    destroy() {
        if (this._node) {
            this._node.disconnect();
            this._node = null;
        }
        if (this._ctx) {
            this._ctx.close().catch(() => { });
            this._ctx = null;
        }
        this._started = false;
    }
}
exports.WebAudioOutput = WebAudioOutput;
