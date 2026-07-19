/**
 * 微信小程序平台实现
 *
 * 适配微信 Canvas 2D API:
 * - Canvas type="2d" 模式下使用标准 Canvas API
 * - ROM 从云存储/网络加载
 * - 存档用 wx.setStorage/wx.getStorage
 * - 输入: 虚拟手柄映射到手柄位
 */

import { IPlatform, TouchEvent, TouchEventType, KeyEvent } from './IPlatform';
import { ROM_BASE64 } from '../roms/romData';

// 微信小程序声明 (避免 TS 报错)
declare const wx: any;
declare function getCurrentPages(): any[];

export class WechatPlatform implements IPlatform {
  private _canvas: any;
  private _ctx: CanvasRenderingContext2D;
  private _displayWidth: number;
  private _displayHeight: number;

  private touchCallbacks: Map<TouchEventType, (e: TouchEvent[]) => void> = new Map();
  private keyCallbacks: ((e: KeyEvent) => void)[] = [];

  constructor(canvas: any, ctx: CanvasRenderingContext2D) {
    this._canvas = canvas;
    this._ctx = ctx;
    this._displayWidth = canvas.width;
    this._displayHeight = canvas.height;
  }

  get canvas(): { getContext(type: '2d'): CanvasRenderingContext2D | null; width: number; height: number } {
    return this._canvas;
  }

  get ctx(): CanvasRenderingContext2D {
    return this._ctx;
  }

  get displayWidth(): number {
    return this._displayWidth;
  }

  get displayHeight(): number {
    return this._displayHeight;
  }

  // ============================================================
  // 帧循环
  // ============================================================

  requestFrame(callback: () => void): number {
    // 小程序: 使用 canvas.requestAnimationFrame
    if (this._canvas && typeof this._canvas.requestAnimationFrame === 'function') {
      return this._canvas.requestAnimationFrame(callback);
    }
    // Fallback: setTimeout
    return window.setTimeout(callback, 16) as unknown as number;
  }

  cancelFrame(id: number): void {
    if (this._canvas && typeof this._canvas.cancelAnimationFrame === 'function') {
      this._canvas.cancelAnimationFrame(id);
    } else {
      window.clearTimeout(id);
    }
  }

  // ============================================================
  // 触摸事件
  // ============================================================

  onTouch(type: TouchEventType, callback: (e: TouchEvent[]) => void): void {
    this.touchCallbacks.set(type, callback);
  }

  /** 小程序页面调用: 转发触摸事件 */
  handleTouch(type: TouchEventType, touches: TouchEvent[]): void {
    const cb = this.touchCallbacks.get(type);
    if (cb) cb(touches);
  }

  // ============================================================
  // 键盘/手柄
  // ============================================================

  onKey(callback: (e: KeyEvent) => void): void {
    this.keyCallbacks.push(callback);
  }

  /** 虚拟手柄发送按键 */
  sendKey(key: string, pressed: boolean): void {
    for (const cb of this.keyCallbacks) {
      cb({ key, pressed });
    }
  }

  // ============================================================
  // ROM 加载
  // ============================================================

  async loadRomBinary(): Promise<ArrayBuffer> {
    try {
      // 微信 base64 解码 API
      if (typeof wx !== 'undefined' && wx.base64ToArrayBuffer) {
        return wx.base64ToArrayBuffer(ROM_BASE64);
      }
      // Fallback: 手动解码
      const binary = atob(ROM_BASE64);
      const buffer = new ArrayBuffer(binary.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < binary.length; i++) {
        view[i] = binary.charCodeAt(i);
      }
      return buffer;
    } catch (e) {
      console.error('[WechatPlatform] ROM base64 解码失败:', e);
      throw new Error('ROM 数据解码失败');
    }
  }

  // ============================================================
  // 存档
  // ============================================================

  async saveData(key: string, data: Uint8Array): Promise<void> {
    return new Promise((resolve, reject) => {
      const base64 = this.arrayToBase64(data);
      wx.setStorage({
        key: `sram_${key}`,
        data: base64,
        success: () => resolve(),
        fail: (e: any) => reject(e),
      });
    });
  }

  async loadData(key: string): Promise<Uint8Array | null> {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: `sram_${key}`,
        success: (res: any) => {
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

  createAudioContext(): any {
    // 微信: wx.createInnerAudioContext() 或 WebAudio
    // 对于 YM2612 合成, 需要 Web Audio API
    // 返回: AudioContext 对象 (如果可用)
    try {
      return new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }

  // ============================================================
  // 工具
  // ============================================================

  private arrayToBase64(bytes: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private base64ToArray(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
}
