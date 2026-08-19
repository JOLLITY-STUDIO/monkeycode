"use strict";
/**
 * PapuOutput — PAPU + AudioContext 桥接适配层
 *
 * 每帧流程:
 *   Bank12 writeReg(addr,val) → papu.writeReg(addr,val) → 写入 apuBuffer
 *   Bank12.update() 末尾 → papu.clockFramePerFrame() → 生成采样 → 环形缓冲
 *   ScriptProcessor.onaudioprocess → 从环形缓冲取采样 → AudioContext.destination
 *
 * 数据模块注入:
 *   直接引用 data/audio 导出的 apuBuffer (Uint8Array 32B)。
 *   PAPU 的 regValues 指向该 buffer，所有 APU 寄存器读写共享同一块内存。
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PapuOutput = void 0;
const index_1 = __importDefault(require("./papu/index"));
const audioCache_1 = require("../../../game/data/audio/audioCache");
// ════════════════════════════════════════════
// 音频参数
// ════════════════════════════════════════════
const SAMPLE_RATE = 44100;
/** ScriptProcessor 缓冲区大小 (采样数) */
const NODE_BUF_SIZE = 4096;
/** 环形缓冲大小: ~1秒 */
const RING_BUF_SIZE = SAMPLE_RATE * 2;
// ════════════════════════════════════════════
// PapuOutput
// ════════════════════════════════════════════
class PapuOutput {
    constructor() {
        this._ctx = null;
        this._node = null;
        this._started = false;
        /** 环形采样缓冲: float32 stereo interleaved */
        this._ring = new Float32Array(RING_BUF_SIZE * 2);
        this._ringWrite = 0;
        this._ringRead = 0;
        // ════════════════════════════════════════════
        // 内部: 从环形缓冲取采样 → ScriptProcessor
        // ════════════════════════════════════════════
        this._onAudioProcess = (event) => {
            const out = event.outputBuffer.getChannelData(0);
            const len = out.length;
            const sz = RING_BUF_SIZE * 2;
            for (let i = 0; i < len; i++) {
                if (this._ringRead !== this._ringWrite) {
                    // 读一个采样 (单声道: 平均左右)
                    out[i] = (this._ring[this._ringRead] + this._ring[this._ringRead + 1]) * 0.5;
                    this._ringRead = (this._ringRead + 2) % sz;
                }
                else {
                    // buffer underrun → 静音
                    out[i] = 0;
                }
            }
        };
        // PAPU 直连 apuBuffer，不再内部分配
        this.papu = new index_1.default(SAMPLE_RATE, audioCache_1.apuBuffer);
        // 采样回调: 写入环形缓冲
        this.papu.setSampleCallback((left, right) => {
            const sz = RING_BUF_SIZE * 2;
            // 空间检查: 如果写满则丢帧（不会阻塞）
            if ((this._ringWrite + 2) % sz !== this._ringRead) {
                this._ring[this._ringWrite] = left;
                this._ring[this._ringWrite + 1] = right;
                this._ringWrite = (this._ringWrite + 2) % sz;
            }
        });
    }
    // ── 寄存器接口 (供 Bank12AudioService 直接写入) ──
    writeReg(addr, value) {
        this.papu.writeReg(addr, value);
    }
    readReg(addr) {
        return this.papu.readReg(addr);
    }
    // ── 帧推进 ──
    /** 每帧调用: 推进 PAPU 帧计数器、生成采样 */
    clockFrame() {
        this._ensureAudioStarted();
        this.papu.clockFramePerFrame();
    }
    // ── 生命周期 ──
    /** 重置所有通道 (静音) */
    silence() {
        this.papu.writeReg(0x4015, 0);
        this._ring.fill(0);
        this._ringWrite = 0;
        this._ringRead = 0;
    }
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
    // ════════════════════════════════════════════
    // 内部: AudioContext 管理
    // ════════════════════════════════════════════
    _ensureAudioStarted() {
        if (this._started)
            return;
        this._started = true;
        try {
            // 微信小程序兼容: wx.createWebAudioContext
            const win = (typeof wx !== 'undefined' && wx.createWebAudioContext)
                ? wx.createWebAudioContext()
                : null;
            this._ctx = win
                ? win
                : new (window.AudioContext || window.webkitAudioContext)({ sampleRate: SAMPLE_RATE });
        }
        catch {
            console.warn('[PapuOutput] AudioContext 不可用');
            return;
        }
        try {
            this._node = this._ctx.createScriptProcessor
                ? this._ctx.createScriptProcessor(NODE_BUF_SIZE, 0, 1)
                : (this._ctx.createScriptProcessor(NODE_BUF_SIZE, 0, 1));
        }
        catch {
            console.warn('[PapuOutput] createScriptProcessor 不可用');
            return;
        }
        if (!this._node)
            return;
        this._node.onaudioprocess = this._onAudioProcess.bind(this);
        this._node.connect(this._ctx.destination);
        console.log('[PapuOutput] AudioContext 就绪, sampleRate=' + this._ctx.sampleRate);
    }
}
exports.PapuOutput = PapuOutput;
exports.default = PapuOutput;
