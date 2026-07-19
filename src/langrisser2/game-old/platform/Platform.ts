/**
 * Platform.ts — 跨平台抽象接口
 *
 * 将浏览器/小程序平台差异统一封装，游戏核心逻辑 (VDP/Scene/System)
 * 不依赖具体平台的 DOM/wx API。
 *
 * 实现:
 *   - BrowserPlatform  (game/platform/browser.ts)
 *   - MiniProgramPlatform (game/platform/miniprogram.ts)
 */

// ============================================================================
// 平台接口
// ============================================================================

/** 平台抽象接口 — 浏览器 / 微信小程序 */
export interface IPlatform {
  /** 获取 Canvas 2D 渲染上下文 */
  getCanvas2D(): CanvasRenderingContext2D;
  /** Canvas 逻辑宽度 */
  width: number;
  /** Canvas 逻辑高度 */
  height: number;

  /**
   * 帧回调注册 (每帧调用一次)
   * @param cb  帧回调函数
   * @returns   句柄，用于取消
   */
  requestAnimationFrame(cb: FrameCallback): number;
  /** 取消帧回调 */
  cancelAnimationFrame(id: number): void;

  /** 储存键值 */
  setStorage(key: string, value: string): void;
  /** 读取键值 */
  getStorage(key: string): string | null;
  /** 删除键值 */
  removeStorage(key: string): void;

  /** 创建音频上下文 */
  createAudioContext(): Promise<IAudioContext>;

  /** 设置状态栏文字 */
  setStatusText(text: string): void;

  /** 平台名称 */
  readonly name: string;
}

export type FrameCallback = () => void;

// ============================================================================
// 音频接口 (最小抽象)
// ============================================================================

export interface IAudioContext {
  /** 采样率 */
  readonly sampleRate: number;
  /** 当前状态: 'running' | 'suspended' | 'closed' */
  readonly state: string;

  /** 恢复音频 (用户交互后调用) */
  resume(): Promise<void>;
  /** 创建增益节点 */
  createGain(): IAudioNode;
  /** 创建音频缓冲 */
  createBuffer(channels: number, length: number, sampleRate: number): IAudioBuffer;
  /** 创建音频源 (播放缓冲) */
  createBufferSource(): IAudioSourceNode;

  /** 关闭音频上下文 */
  close(): void;

  /** 目标节点 */
  readonly destination: IAudioNode;
}

export interface IAudioNode {
  connect(dest: IAudioNode): void;
  disconnect(): void;
}

export interface IAudioBuffer {
  getChannelData(channel: number): Float32Array;
  readonly length: number;
  readonly numberOfChannels: number;
}

export interface IAudioSourceNode extends IAudioNode {
  buffer: IAudioBuffer | null;
  start(when?: number): void;
  onended: ((ev: any) => void) | null;
}

// ============================================================================
// 触摸输入 → Genesis 按钮位定义
// ============================================================================

/** 虚拟手柄按钮类型 */
export enum VPadButton {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
  A = 4,
  B = 5,
  C = 6,
  START = 7,
}

/** 虚拟手柄区域配置 */
export interface VPadConfig {
  /** D-pad 区域 (相对于 Canvas 的坐标比例, 0-1) */
  dpad: { x: number; y: number; w: number; h: number };
  /** 按钮区域 (A/B/C/START) */
  buttons: { x: number; y: number; w: number; h: number };
  /** Canvas 实际显示尺寸 (CSS px) */
  displaySize: { w: number; h: number };
}
