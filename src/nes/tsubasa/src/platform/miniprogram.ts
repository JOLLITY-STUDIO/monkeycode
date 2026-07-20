/**
 * 天使之翼2 — 小程序平台适配层
 * 封装小程序 Canvas / 输入 / 帧循环
 */
import type { GamePlatform } from '../main';

export interface MiniGameHandle {
  /** 游戏平台适配器 */
  platform: GamePlatform;
  /** 设置触摸输入 */
  setInput(btnMask: number): void;
  /** 设置 canvas 节点 */
  setCanvasNode(node: any): void;
  /** 设置状态回调 */
  setStatusCb(cb: ((text: string) => void) | null): void;
  /** 设置输入获取器 */
  getInput(): number;
}

/**
 * 创建小程序平台适配器
 */
export function createMiniPlatform(): MiniGameHandle {
  let canvasNode: any = null;
  let inputMask = 0;
  let statusCb: ((text: string) => void) | null = null;

  const platform: GamePlatform = {
    get canvas() {
      return canvasNode;
    },
    getInput(): number {
      return inputMask;
    },
    requestFrame(callback: () => void): any {
      // setTimeout 替代 canvas.requestAnimationFrame，避免微信内部
      // __subPageFrameEndTime__ 崩溃
      return setTimeout(callback, 16) as any;
    },
    cancelFrame(id: any): void {
      if (typeof id === 'number') {
        clearTimeout(id);
      }
    },
    setStatus(text: string): void {
      statusCb?.(text);
    },
  };

  return {
    platform,
    setInput(btnMask: number) {
      inputMask = btnMask;
    },
    setCanvasNode(node: any) {
      canvasNode = node;
    },
    setStatusCb(cb: ((text: string) => void) | null) {
      statusCb = cb;
    },
    getInput(): number {
      return inputMask;
    },
  };
}
