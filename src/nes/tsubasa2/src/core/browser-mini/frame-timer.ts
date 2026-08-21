/**
 * FrameTimer (小程序版) — 帧时序控制
 *
 * 借鉴 core/browser/frame-timer.ts, 适配微信小程序:
 *   - 不用 window.requestAnimationFrame, 改用 canvas.requestAnimationFrame
 *   - 60.098 FPS 目标, 与原版一致
 *
 * 调用方需传入 canvas 节点 (小程序 Canvas 2D 节点支持 requestAnimationFrame)。
 */
const FPS = 60.098;

interface FrameTimerProps {
  onGenerateFrame: () => void;
  onWriteFrame: () => void;
}

export default class FrameTimerMini {
  onGenerateFrame: () => void;
  onWriteFrame: () => void;
  running: boolean;
  interval: number;
  lastFrameTime: number | false;
  _requestID?: number;
  _canvas: any;

  constructor(props: FrameTimerProps, canvas?: any) {
    this.onGenerateFrame = props.onGenerateFrame;
    this.onWriteFrame = props.onWriteFrame;
    this.running = true;
    this.interval = 1e3 / FPS;
    this.lastFrameTime = false;
    this._canvas = canvas;
  }

  /** 注入 canvas 节点 (供 requestAnimationFrame 使用) */
  setCanvas(canvas: any): void {
    this._canvas = canvas;
  }

  start(): void {
    this.running = true;
    this.requestAnimationFrame();
  }

  stop(): void {
    this.running = false;
    this.lastFrameTime = false;
  }

  requestAnimationFrame(): void {
    const cb = this.onAnimationFrame;
    if (this._canvas && typeof this._canvas.requestAnimationFrame === 'function') {
      this._requestID = this._canvas.requestAnimationFrame(cb);
    } else if (typeof requestAnimationFrame !== 'undefined') {
      this._requestID = requestAnimationFrame(cb);
    }
  }

  generateFrame(): void {
    this.onGenerateFrame();
    this.lastFrameTime = (this.lastFrameTime as number) + this.interval;
  }

  onAnimationFrame = (time: number): void => {
    if (!this.running) return;
    this.requestAnimationFrame();
    let excess = time % this.interval;
    let newFrameTime = time - excess;

    if (!this.lastFrameTime) {
      this.lastFrameTime = newFrameTime;
      return;
    }

    let numFrames = Math.round(
      (newFrameTime - (this.lastFrameTime as number)) / this.interval,
    );

    if (numFrames === 0) return;

    this.generateFrame();
    this.onWriteFrame();

    // 多帧追赶 (与 browser 版一致, 用 setTimeout)
    let timeToNextFrame = this.interval - excess;
    for (let i = 1; i < numFrames; i++) {
      setTimeout(
        () => { this.generateFrame(); },
        (i * timeToNextFrame) / numFrames,
      );
    }
  };
}
