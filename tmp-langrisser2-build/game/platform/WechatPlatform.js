"use strict";
/**
 * 微信小程序平台实现
 *
 * 适配微信 Canvas 2D API:
 * - Canvas type="2d" 模式下使用标准 Canvas API
 * - ROM 从云存储/网络加载
 * - 存档用 wx.setStorage/wx.getStorage
 * - 输入: 虚拟手柄映射到手柄位
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WechatPlatform = void 0;
const romData_1 = require("../roms/romData");
class WechatPlatform {
    _canvas;
    _ctx;
    _displayWidth;
    _displayHeight;
    touchCallbacks = new Map();
    keyCallbacks = [];
    constructor(canvas, ctx) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._displayWidth = canvas.width;
        this._displayHeight = canvas.height;
    }
    get canvas() {
        return this._canvas;
    }
    get ctx() {
        return this._ctx;
    }
    get displayWidth() {
        return this._displayWidth;
    }
    get displayHeight() {
        return this._displayHeight;
    }
    // ============================================================
    // 帧循环
    // ============================================================
    requestFrame(callback) {
        // 小程序: 使用 canvas.requestAnimationFrame
        if (this._canvas && typeof this._canvas.requestAnimationFrame === 'function') {
            return this._canvas.requestAnimationFrame(callback);
        }
        // Fallback: setTimeout
        return window.setTimeout(callback, 16);
    }
    cancelFrame(id) {
        if (this._canvas && typeof this._canvas.cancelAnimationFrame === 'function') {
            this._canvas.cancelAnimationFrame(id);
        }
        else {
            window.clearTimeout(id);
        }
    }
    // ============================================================
    // 触摸事件
    // ============================================================
    onTouch(type, callback) {
        this.touchCallbacks.set(type, callback);
    }
    /** 小程序页面调用: 转发触摸事件 */
    handleTouch(type, touches) {
        const cb = this.touchCallbacks.get(type);
        if (cb)
            cb(touches);
    }
    // ============================================================
    // 键盘/手柄
    // ============================================================
    onKey(callback) {
        this.keyCallbacks.push(callback);
    }
    /** 虚拟手柄发送按键 */
    sendKey(key, pressed) {
        for (const cb of this.keyCallbacks) {
            cb({ key, pressed });
        }
    }
    // ============================================================
    // ROM 加载
    // ============================================================
    async loadRomBinary() {
        try {
            // 微信 base64 解码 API
            if (typeof wx !== 'undefined' && wx.base64ToArrayBuffer) {
                return wx.base64ToArrayBuffer(romData_1.ROM_BASE64);
            }
            // Fallback: 手动解码
            const binary = atob(romData_1.ROM_BASE64);
            const buffer = new ArrayBuffer(binary.length);
            const view = new Uint8Array(buffer);
            for (let i = 0; i < binary.length; i++) {
                view[i] = binary.charCodeAt(i);
            }
            return buffer;
        }
        catch (e) {
            console.error('[WechatPlatform] ROM base64 解码失败:', e);
            throw new Error('ROM 数据解码失败');
        }
    }
    // ============================================================
    // 存档
    // ============================================================
    async saveData(key, data) {
        return new Promise((resolve, reject) => {
            const base64 = this.arrayToBase64(data);
            wx.setStorage({
                key: `sram_${key}`,
                data: base64,
                success: () => resolve(),
                fail: (e) => reject(e),
            });
        });
    }
    async loadData(key) {
        return new Promise((resolve, reject) => {
            wx.getStorage({
                key: `sram_${key}`,
                success: (res) => {
                    const bytes = this.base64ToArray(res.data);
                    resolve(bytes);
                },
                fail: () => resolve(null),
            });
        });
    }
    // ============================================================
    // 音频
    // ============================================================
    createAudioContext() {
        // 微信: wx.createInnerAudioContext() 或 WebAudio
        // 对于 YM2612 合成, 需要 Web Audio API
        // 返回: AudioContext 对象 (如果可用)
        try {
            return new (window.AudioContext || window.webkitAudioContext)();
        }
        catch {
            return null;
        }
    }
    // ============================================================
    // 工具
    // ============================================================
    arrayToBase64(bytes) {
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
    base64ToArray(base64) {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }
}
exports.WechatPlatform = WechatPlatform;
