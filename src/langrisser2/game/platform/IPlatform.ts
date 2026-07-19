/**
 * 跨平台抽象接口
 *
 * 将平台相关的 Canvas/音频/存储/输入 抽离，
 * 小程序和 Web 各自实现。
 */

/** 触摸/输入事件抽象 */
export interface TouchEvent {
  x: number;
  y: number;
  identifier: number;
}

export type TouchEventType = 'start' | 'move' | 'end' | 'cancel';

/** 键盘/手柄 输入抽象 */
export interface KeyEvent {
  key: string;
  pressed: boolean;
}

/** 平台接口 */
export interface IPlatform {
  /** Canvas 对象 (用于 putImageData) */
  readonly canvas: {
    getContext(contextType: '2d'): CanvasRenderingContext2D | null;
    width: number;
    height: number;
  };

  /** Canvas 2D 上下文 */
  readonly ctx: CanvasRenderingContext2D;

  /** Canvas 显示宽度 (CSS 像素) */
  readonly displayWidth: number;

  /** Canvas 显示高度 (CSS 像素) */
  readonly displayHeight: number;

  /** 帧回调 (requestAnimationFrame) */
  requestFrame(callback: () => void): number;

  /** 取消帧回调 */
  cancelFrame(id: number): void;

  /** 触摸事件回调注册 */
  onTouch(type: TouchEventType, callback: (e: TouchEvent[]) => void): void;

  /** 键盘/手柄事件回调 */
  onKey(callback: (e: KeyEvent) => void): void;

  /** 加载 ROM 二进制 */
  loadRomBinary(): Promise<ArrayBuffer>;

  /** 存储 (对应 SRAM 16KB 存档) */
  saveData(key: string, data: Uint8Array): Promise<void>;
  loadData(key: string): Promise<Uint8Array | null>;

  /** 音频输出 (Web Audio API 桥接) */
  createAudioContext(): any; // AudioContext 或等效
}
