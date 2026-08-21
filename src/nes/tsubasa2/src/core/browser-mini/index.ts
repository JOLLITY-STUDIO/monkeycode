/**
 * BrowserMini — 微信小程序版 NES/H5 主板外壳
 *
 * 借鉴 core/browser/index.ts, 适配微信小程序:
 *   - 不用 document, 改为接收 page 传入的 canvas 节点
 *   - 触摸输入替代 keyboard/gamepad
 *   - 音频降级 (SpeakersMini stub)
 *
 * 两种使用模式:
 *   1. NES 模式 (传统模拟器): 内部持有 NES 实例, 每帧 nes.frame()
 *   2. H5 模式 (去 CPU 化): 内部持有 Tsubasa2 实例, 每帧 tsubasa2._onFrame+render
 *
 * 当前 H5 项目走模式 2 (Tsubasa2 主板), NES 实例仅作 PPU/PAPU 容器。
 * 本类对外屏蔽差异, page 只需:
 *   const bm = new BrowserMini({ canvas, mode: 'h5' });
 *   bm.start();
 *   bm.input.press(BUTTON_A);
 */
import ScreenMini from './screen';
import SpeakersMini from './speakers';
import FrameTimerMini from './frame-timer';
import InputMini, { BUTTON_A, BUTTON_B, BUTTON_SELECT, BUTTON_START, BUTTON_UP, BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT } from './input';

export { BUTTON_A, BUTTON_B, BUTTON_SELECT, BUTTON_START, BUTTON_UP, BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT };
export type { ButtonId } from './input';

export interface BrowserMiniOptions {
  /** 小程序 Canvas 2D 节点 (wx.createSelectorQuery 获取的 node) */
  canvas: any;
  /**
   * 模式: 'nes' = 传统模拟器 (NES.frame), 'h5' = 去 CPU 化 (外部注入游戏实例)
   *
   * H5 模式下, 游戏主类 (Tsubasa2 等) 由外部创建后通过 setGame() 注入,
   * BrowserMini 不 import 游戏类, 避免循环依赖 + 适配主类迁移期。
   */
  mode?: 'nes' | 'h5';
  /** 帧回调 (调试/统计用) */
  onFrame?: (frameIndex: number) => void;
  /** 错误回调 */
  onError?: (e: Error) => void;
  /** 状态回调 */
  onStatus?: (status: string) => void;
}

/** 游戏实例接口 (H5 模式下外部注入的游戏主类需满足此接口) */
export interface GameInstance {
  start(canvas?: any): void;
  stop(): void;
  setButtons(mask: number): void;
  pressButton?(button: string): void;
  releaseButton?(button: string): void;
  getDebugInfo?(): { frame: number; gameStateName: string; fps: number };
  enableAi?(): void;
  disableAi?(): void;
}

export default class BrowserMini {
  _options: BrowserMiniOptions;
  _screen: ScreenMini;
  _speakers: SpeakersMini;
  _frameTimer: FrameTimerMini;
  _input: InputMini;
  _fpsInterval?: number;
  _frameIndex: number;
  _fpsFrameCount: number;
  _fpsLastTime: number;
  _fps: number;
  _running: boolean;

  /** H5 模式下外部注入的游戏实例 */
  _game: GameInstance | null;

  constructor(options: BrowserMiniOptions) {
    this._options = options;
    this._frameIndex = 0;
    this._fpsFrameCount = 0;
    this._fpsLastTime = Date.now();
    this._fps = 0;
    this._running = false;
    this._game = null;

    // Screen
    this._screen = new ScreenMini(options.canvas);

    // Speakers (stub, 静音)
    this._speakers = new SpeakersMini({
      onBufferUnderrun: () => {
        this._frameTimer.generateFrame();
        this._frameTimer.generateFrame();
      },
    });

    // Input
    this._input = new InputMini({
      onButtonChange: (mask) => this._onButtonChange(mask),
    });

    // FrameTimer (传入 canvas 供 requestAnimationFrame)
    this._frameTimer = new FrameTimerMini({
      onGenerateFrame: () => this._generateFrame(),
      onWriteFrame: () => this._screen.writeBuffer(),
    }, options.canvas);
  }

  // ── 公开属性 ──
  get input(): InputMini { return this._input; }
  get screen(): ScreenMini { return this._screen; }
  get game(): GameInstance | null { return this._game; }
  get fps(): number { return this._fps; }
  get frameIndex(): number { return this._frameIndex; }

  /**
   * 注入游戏实例 (H5 模式)。
   * 外部创建游戏主类后调用此方法, BrowserMini 接管输入转发 + FPS 统计。
   * 游戏主类自行管理 RAF 帧循环 + 渲染。
   */
  setGame(game: GameInstance): void {
    this._game = game;
  }

  // ── 生命周期 ──

  /**
   * 启动外壳 (帧定时器 + 音频 + FPS 统计)。
   * H5 模式: 游戏实例应已通过 setGame() 注入并 start()。
   * NES 模式: TODO (当前未实现)
   */
  async start(): Promise<void> {
    if (this._running) return;
    this._running = true;

    const mode = this._options.mode ?? 'h5';
    if (mode === 'nes') {
      // TODO: NES 模式 (传统模拟器) 待补
      throw new Error('BrowserMini: NES 模式未实现, 当前仅支持 h5 模式');
    }

    // 启动帧定时器 + 音频
    this._frameTimer.start();
    this._speakers.start();

    // FPS 统计
    this._fpsInterval = setInterval(() => {
      const now = Date.now();
      if (now - this._fpsLastTime > 0) {
        this._fps = Math.round(this._fpsFrameCount * 1000 / (now - this._fpsLastTime));
      }
      this._fpsFrameCount = 0;
      this._fpsLastTime = now;
    }, 1000) as unknown as number;

    this._options.onStatus?.('运行中');
  }

  /** 停止外壳 */
  stop(): void {
    this._running = false;
    this._frameTimer.stop();
    this._speakers.stop();
    if (this._fpsInterval) {
      clearInterval(this._fpsInterval);
      this._fpsInterval = undefined;
    }
    if (this._game && typeof this._game.stop === 'function') {
      this._game.stop();
    }
    this._options.onStatus?.('已停止');
  }

  // ── 帧生成 ──

  /**
   * 每帧生成 (由 FrameTimer 调用)。
   * H5 模式: 游戏实例自跑 RAF, 这里仅做 FPS 统计 + 输入已通过 _onButtonChange 转发。
   * NES 模式 (TODO): 调 nes.frame() + speakers.flush()。
   */
  private _generateFrame(): void {
    try {
      this._frameIndex++;
      this._fpsFrameCount++;
      this._options.onFrame?.(this._frameIndex);

      if (this._options.mode === 'nes') {
        // TODO: this._nes.frame();
        // this._speakers.flush();
      }
    } catch (e) {
      this.stop();
      this._options.onError?.(e as Error);
    }
  }

  // ── 输入转发 ──

  /** 输入变化时转发到游戏实例 */
  private _onButtonChange(mask: number): void {
    if (this._game && typeof this._game.setButtons === 'function') {
      this._game.setButtons(mask);
    }
  }

  // ── Canvas 缩放 ──

  /**
   * 根据容器尺寸自适应 Canvas 显示尺寸 (转发到 ScreenMini.fitInParent)。
   * ScreenMini 内部按 NES 256:240 宽高比等比缩放, 设置 canvas.style.width/height。
   *
   * @returns 应用后的显示尺寸 {w, h}
   */
  fitInParent(containerW: number, containerH: number): { w: number; h: number } {
    return this._screen.fitInParent(containerW, containerH);
  }

  /** 销毁 */
  destroy(): void {
    this.stop();
  }
}
