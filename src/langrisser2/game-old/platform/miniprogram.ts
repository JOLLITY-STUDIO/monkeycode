/**
 * miniplatform.ts — 微信小程序平台实现
 *
 * Canvas 2D 适配: 基础库 3.17.0+ 支持标准 Canvas 2D API
 * 音频: 使用 wx.createWebAudioContext() (WebAudio 兼容)
 * 储存: wx.setStorageSync / getStorageSync
 * 帧循环: canvas.requestAnimationFrame
 * 输入: 触摸事件 → Genesis 按钮位掩码 (虚拟手柄)
 */

import {
  IPlatform, IAudioContext, IAudioNode, IAudioBuffer, IAudioSourceNode,
  VPadConfig, VPadButton, FrameCallback,
} from './Platform.js';

// ============================================================================
// 虚拟手柄布局
// ============================================================================

/** 默认虚拟手柄配置 (横屏, 16:9 手机) */
export const DEFAULT_VPAD_CONFIG: VPadConfig = {
  // 左侧 D-pad 区域
  dpad: { x: 0.02, y: 0.3, w: 0.25, h: 0.65 },
  // 右侧按钮区域
  buttons: { x: 0.55, y: 0.3, w: 0.43, h: 0.65 },
  displaySize: { w: 320, h: 224 },
};

/**
 * 触摸坐标 → Genesis 按钮位
 * @returns 当前帧按钮位掩码
 */
export function touchToButtons(
  touches: WechatMiniprogram.Touch[],
  config: VPadConfig,
): number {
  const BUTTON_BITS = [
    0x01, // UP
    0x02, // DOWN
    0x04, // LEFT
    0x08, // RIGHT
    0x40, // A
    0x10, // B
    0x20, // C
    0x80, // START
  ];

  let buttons = 0;
  const { dpad, buttons: btnArea, displaySize } = config;

  for (const touch of touches) {
    const tx = touch.x / displaySize.w;
    const ty = touch.y / displaySize.h;

    // --- D-pad 区域 ---
    if (tx >= dpad.x && tx <= dpad.x + dpad.w &&
        ty >= dpad.y && ty <= dpad.y + dpad.h) {
      const cx = dpad.x + dpad.w / 2;
      const cy = dpad.y + dpad.h / 2;
      const dx = tx - cx;
      const dy = ty - cy;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < -0.02) buttons |= BUTTON_BITS[VPadButton.LEFT];
        if (dx > 0.02) buttons |= BUTTON_BITS[VPadButton.RIGHT];
      } else {
        if (dy < -0.02) buttons |= BUTTON_BITS[VPadButton.UP];
        if (dy > 0.02) buttons |= BUTTON_BITS[VPadButton.DOWN];
      }
      continue;
    }

    // --- 右侧按钮区域 ---
    if (tx >= btnArea.x && tx <= btnArea.x + btnArea.w &&
        ty >= btnArea.y && ty <= btnArea.y + btnArea.h) {
      const bx = (tx - btnArea.x) / btnArea.w;
      const by = (ty - btnArea.y) / btnArea.h;

      // 4 按钮布局 (2×2 网格):
      //   A(top-left)   | B(top-right)
      //   C(bottom-left)| START(bottom-right)
      if (bx < 0.45 && by < 0.45) {
        buttons |= BUTTON_BITS[VPadButton.A];
      } else if (bx >= 0.55 && by < 0.45) {
        buttons |= BUTTON_BITS[VPadButton.B];
      } else if (bx < 0.45 && by >= 0.55) {
        buttons |= BUTTON_BITS[VPadButton.C];
      } else if (bx >= 0.55 && by >= 0.55) {
        buttons |= BUTTON_BITS[VPadButton.START];
      }
    }
  }

  return buttons;
}

// ============================================================================
// 小程序 AudioContext 适配 (WebAudio API)
// ============================================================================

class MPAudioContext implements IAudioContext {
  private ctx: WechatMiniprogram.WebAudioContext;

  constructor(ctx: WechatMiniprogram.WebAudioContext) {
    this.ctx = ctx;
  }

  get sampleRate(): number { return this.ctx.sampleRate; }
  get state(): string { return (this.ctx as any).state || 'running'; }

  get destination(): IAudioNode {
    return new MPAudioNode(this.ctx.destination);
  }

  async resume(): Promise<void> {
    if ((this.ctx as any).resume) {
      await (this.ctx as any).resume();
    }
  }

  createGain(): IAudioNode {
    return new MPAudioNode(this.ctx.createGain());
  }

  createBuffer(channels: number, length: number, sampleRate: number): IAudioBuffer {
    return new MPAudioBuffer(this.ctx.createBuffer(channels, length, sampleRate));
  }

  createBufferSource(): IAudioSourceNode {
    const src = this.ctx.createBufferSource();
    return new MPAudioSourceNode(src);
  }

  close(): void {
    try { (this.ctx as any).close?.(); } catch {}
  }
}

class MPAudioNode implements IAudioNode {
  protected node: any;
  constructor(node: any) { this.node = node; }
  connect(dest: IAudioNode): void { this.node.connect((dest as MPAudioNode).node); }
  disconnect(): void { this.node.disconnect(); }
}

class MPAudioBuffer implements IAudioBuffer {
  private buf: any;
  constructor(buf: any) { this.buf = buf; }
  get length(): number { return this.buf.length; }
  get numberOfChannels(): number { return this.buf.numberOfChannels; }
  getChannelData(channel: number): Float32Array {
    return this.buf.getChannelData(channel);
  }
}

class MPAudioSourceNode extends MPAudioNode implements IAudioSourceNode {
  get buffer(): IAudioBuffer | null {
    const b = (this.node as any).buffer;
    return b ? new MPAudioBuffer(b) : null;
  }
  set buffer(buf: IAudioBuffer | null) {
    (this.node as any).buffer = buf ? (buf as MPAudioBuffer)['buf'] : null;
  }
  start(when?: number): void { this.node.start(when); }
  get onended(): ((ev: any) => void) | null { return (this.node as any).onended; }
  set onended(fn: ((ev: any) => void) | null) { (this.node as any).onended = fn; }
}

// ============================================================================
// MiniProgramPlatform — 小程序平台适配器
// ============================================================================

export interface MiniProgramPlatformOptions {
  /** Canvas 组件实例 (页面 this) */
  page: WechatMiniprogram.Page.Instance<any, any>;
  /** Canvas ID (wxml 中 canvas 的 id) */
  canvasId: string;
  /** 虚拟手柄配置 */
  vpadConfig?: VPadConfig;
}

export class MiniProgramPlatform implements IPlatform {
  readonly name = 'miniprogram';

  readonly width: number;
  readonly height: number;

  private page: WechatMiniprogram.Page.Instance<any, any>;
  private canvasId: string;
  private _ctx2d: CanvasRenderingContext2D | null = null;
  private _canvas: any = null;

  /** Canvas 在屏幕上的实际显示尺寸 (px) — 用于触摸坐标映射 */
  private _displayW = 320;
  private _displayH = 224;

  private _animId = 0;
  private _frameCallbacks: Map<number, FrameCallback> = new Map();
  private _nextId = 1;

  private _currentButtons = 0;
  private _prevButtons = 0;
  private _vpadConfig: VPadConfig;

  /** 调试: 上次日志的按钮状态 */
  private _lastDebugButtons = -1;

  constructor(options: MiniProgramPlatformOptions) {
    this.page = options.page;
    this.canvasId = options.canvasId;
    this.width = 320;
    this.height = 224;
    this._vpadConfig = options.vpadConfig || DEFAULT_VPAD_CONFIG;
  }

  // ==========================================================================
  // Canvas
  // ==========================================================================

  getCanvas2D(): CanvasRenderingContext2D {
    return this._ctx2d!;
  }

  /** 初始化 Canvas 2D (必须在页面 onReady 后调用) */
  async initCanvas(): Promise<CanvasRenderingContext2D> {
    return new Promise((resolve, reject) => {
      const query = wx.createSelectorQuery();
      query.select(`#${this.canvasId}`)
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res || !res[0]) {
            reject(new Error('Canvas 节点未找到'));
            return;
          }

          const canvas = res[0].node;
          this._canvas = canvas;
          canvas.width = this.width;   // 320 (逻辑像素)
          canvas.height = this.height; // 224

          const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
          if (!ctx) {
            reject(new Error('无法获取 Canvas 2D 上下文'));
            return;
          }

          this._ctx2d = ctx;

          // 记录 Canvas 实际显示尺寸 (用于触摸坐标映射)
          // res[0].width/height 是 WXML style 中设置的显示尺寸
          this._displayW = res[0].width || this.width;
          this._displayH = res[0].height || this.height;

          console.log('[MiniProgramPlatform] Canvas 初始化完成', {
            logicalW: this.width, logicalH: this.height,
            displayW: this._displayW, displayH: this._displayH,
          });

          resolve(ctx);
        });
    });
  }

  // ==========================================================================
  // 帧循环
  // ==========================================================================

  requestAnimationFrame(cb: FrameCallback): number {
    const id = this._nextId++;
    this._animId = id;

    // 使用 Canvas requestAnimationFrame (小程序 Canvas 2D API)
    const loop = () => {
      if (this._animId !== id) return; // 已被取消
      cb();
      if (this._animId === id) {
        this._canvas?.requestAnimationFrame(loop);
      }
    };

    this._canvas?.requestAnimationFrame(loop);
    return id;
  }

  cancelAnimationFrame(id: number): void {
    if (this._animId === id) {
      this._animId = 0;
    }
  }

  // ==========================================================================
  // 储存
  // ==========================================================================

  setStorage(key: string, value: string): void {
    try {
      wx.setStorageSync(key, value);
    } catch (e) {
      console.error('[MiniProgramPlatform] 储存失败:', e);
    }
  }

  getStorage(key: string): string | null {
    try {
      return wx.getStorageSync(key) || null;
    } catch {
      return null;
    }
  }

  removeStorage(key: string): void {
    try {
      wx.removeStorageSync(key);
    } catch {}
  }

  // ==========================================================================
  // 音频
  // ==========================================================================

  async createAudioContext(): Promise<IAudioContext> {
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignore — 小程序 WebAudio API
        const ctx = wx.createWebAudioContext();
        const audioCtx = new MPAudioContext(ctx);

        // 音频需要用户手势激活
        if ((ctx as any).state === 'suspended') {
          (ctx as any).resume();
        }

        resolve(audioCtx);
      } catch (e) {
        console.error('[MiniProgramPlatform] WebAudio 创建失败:', e);
        reject(e);
      }
    });
  }

  // ==========================================================================
  // 状态栏
  // ==========================================================================

  setStatusText(text: string): void {
    this.page.setData({ statusText: text });
  }

  // ==========================================================================
  // 输入 — 虚拟手柄触摸事件 (由页面 WXML bindtouch* 转发)
  // ==========================================================================

  /** 获取当前帧按钮状态 (每帧开头调用) */
  pollButtons(): number {
    this._prevButtons = this._currentButtons;
    return this._currentButtons;
  }

  /** 获取上一帧按钮状态 */
  get prevButtons(): number { return this._prevButtons; }

  /**
   * 处理 WXML 触摸事件 (由 pages/index/index.ts 的 onCanvasTouch 转发)
   *
   * 小程序 Canvas 节点不支持 addEventListener，
   * 因此触摸事件绑定在 WXML view 上, 由页面方法转发到此处。
   *
   * 坐标映射:
   *   WXML touch.x/touch.y 是相对于绑定了事件的 view (canvas-wrapper)。
   *   canvas-wrapper 的尺寸 = Canvas 在屏幕上的显示尺寸 (_displayW × _displayH)。
   *   需要缩放到游戏逻辑空间 (320×224)。
   */
  handleTouch(e: WechatMiniprogram.TouchEvent): void {
    const rawTouches = e.touches || [];

    // 将触摸坐标从显示空间映射到 320×224 逻辑空间
    const sx = 320 / this._displayW;
    const sy = 224 / this._displayH;

    const mappedTouches: WechatMiniprogram.Touch[] = rawTouches.map((t: any) => ({
      x: t.x * sx,
      y: t.y * sy,
      identifier: t.identifier,
      force: t.force,
    }));

    // 所有手指松开 → 按键全清
    if (mappedTouches.length === 0) {
      this._currentButtons = 0;
    } else {
      // 多点触摸 → 累加所有活跃手指对应的按钮
      this._currentButtons = touchToButtons(mappedTouches, this._vpadConfig);
    }

    // 调试: 状态变化时输出日志
    if (this._currentButtons !== this._lastDebugButtons) {
      this._lastDebugButtons = this._currentButtons;
      const names: string[] = [];
      if (this._currentButtons & 0x01) names.push('UP');
      if (this._currentButtons & 0x02) names.push('DOWN');
      if (this._currentButtons & 0x04) names.push('LEFT');
      if (this._currentButtons & 0x08) names.push('RIGHT');
      if (this._currentButtons & 0x10) names.push('B');
      if (this._currentButtons & 0x20) names.push('C');
      if (this._currentButtons & 0x40) names.push('A');
      if (this._currentButtons & 0x80) names.push('START');
      console.log('[Touch] buttons=0x' + this._currentButtons.toString(16).toUpperCase().padStart(2, '0'),
        names.length > 0 ? '[' + names.join(',') + ']' : '[RELEASE]',
        '| touches:', rawTouches.length,
        '| scale:', sx.toFixed(2), 'x', sy.toFixed(2));
    }
  }

  /** 销毁平台适配器 */
  destroy(): void {
    this._animId = 0;
    this._ctx2d = null;
    this._canvas = null;
  }
}
