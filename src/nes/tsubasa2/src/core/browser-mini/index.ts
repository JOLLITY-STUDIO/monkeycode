/**
 * BrowserMini — 微信小程序版 NES 主板外壳
 *
 * 启动链路: BrowserMini → new NES → nes.loadTsROM(game/index ROM) → nes.reset()
 *   → 每帧 nes.frame() (PPU 扫描线渲染)
 *   → onFrame 回调输出 Uint32Array 帧缓冲 → ScreenMini 写 Canvas
 *
 * page 只需:
 *   const bm = new BrowserMini({ canvas });
 *   bm.start();
 *   bm.input.press(BUTTON_A);
 */
import NES from '../nes';
import { HEADER, NES_CHR_ROM, PRG } from '../../game/rom';
import { Tsubasa2 } from '../../game';
import ScreenMini from './screen';
import SpeakersMini from './speakers';
import FrameTimerMini from './frame-timer';
import InputMini, { BUTTON_A, BUTTON_B, BUTTON_SELECT, BUTTON_START, BUTTON_UP, BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT } from './input';

export { BUTTON_A, BUTTON_B, BUTTON_SELECT, BUTTON_START, BUTTON_UP, BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT };
export type { ButtonId } from './input';

export interface BrowserMiniOptions {
  /** 小程序 Canvas 2D 节点 (wx.createSelectorQuery 获取的 node) */
  canvas: any;
  /** 运行模式 (h5=纯浏览器 / mini=小程序) */
  mode?: 'h5' | 'mini';
  /** 帧回调 (调试/统计用) */
  onFrame?: (frameIndex: number) => void;
  /** 错误回调 */
  onError?: (e: Error) => void;
  /** 状态回调 */
  onStatus?: (status: string) => void;
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

  /** NES 主板实例 (去 CPU 化, 持有 PPU/PAPU/mmap/rom) */
  _nes: NES | null;
  /** 组合根 (Tsubasa2 主类, index 层): 每帧驱动游戏逻辑 + 直写 PPU 内存 */
  _tsubasa2: Tsubasa2 | null;
  /** 当前按键掩码 (每帧 nes.frame() 前写入 NES controllers) */
  _buttons: number;

  constructor(options: BrowserMiniOptions) {
    this._options = options;
    this._frameIndex = 0;
    this._fpsFrameCount = 0;
    this._fpsLastTime = Date.now();
    this._fps = 0;
    this._running = false;
    this._nes = null;
    this._tsubasa2 = null;
    this._buttons = 0;

    this._screen = new ScreenMini(options.canvas);
    this._speakers = new SpeakersMini({
      onBufferUnderrun: () => {
        this._frameTimer.generateFrame();
        this._frameTimer.generateFrame();
      },
    });
    this._input = new InputMini({
      onButtonChange: (mask) => this._onButtonChange(mask),
    });
    this._frameTimer = new FrameTimerMini({
      onGenerateFrame: () => this._generateFrame(),
      onWriteFrame: () => this._screen.writeBuffer(),
    }, options.canvas);
  }

  // ── 公开属性 ──
  get input(): InputMini { return this._input; }
  get screen(): ScreenMini { return this._screen; }
  get nes(): NES | null { return this._nes; }
  get fps(): number { return this._fps; }
  get frameIndex(): number { return this._frameIndex; }

  /**
   * 启动游戏: new NES → loadTsROM(game ROM) → reset → 帧循环
   *
   * ROM 定义来自 src/game/index (HEADER + NES_CHR_ROM + PRG bank 类)。
   * NES.loadTsROM 内部调 reset() 触发 reset 向量, 进入游戏主循环。
   */
  async start(): Promise<void> {
    if (this._running) return;
    this._running = true;

    // 构造 NES (去 CPU 化, 默认 bus)
    this._nes = new NES({
      onFrame: (buffer: Uint32Array) => this._screen.setBuffer(buffer),
      onStatusUpdate: (status: string) => this._options.onStatus?.(status),
      onAudioSample: (l: number, r: number) => this._speakers.writeSample(l, r),
      emulateSound: true,
      sampleRate: this._speakers.getSampleRate(),
    });

    // 加载 ROM (header + prg + chr) → 内部 reset → mmap 装载 → reset 向量执行
    this._nes.loadTsROM({
      header: HEADER,
      prg: PRG,
      chr: NES_CHR_ROM,
    });

    // 组合根: 实例化 Tsubasa2 主类 (DataStore + 各 Service) 并启动 BOOT 场景
    this._tsubasa2 = new Tsubasa2();
    this._tsubasa2.boot();

    this._options.onStatus?.('ROM 已加载, 启动帧循环');

    this._frameTimer.start();
    this._speakers.start();

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

  stop(): void {
    this._running = false;
    this._frameTimer.stop();
    this._speakers.stop();
    if (this._fpsInterval) {
      clearInterval(this._fpsInterval);
      this._fpsInterval = undefined;
    }
    this._nes = null;
    this._tsubasa2 = null;
    this._options.onStatus?.('已停止');
  }

  /**
   * 每帧生成 (由 FrameTimer 调用):
   * 1. 写入当前按键到 NES controllers
   * 2. nes.frame() (PPU 扫描线渲染, 内部触发 onFrame 回调)
   * 3. speakers.flush()
   */
  private _generateFrame(): void {
    if (!this._nes) return;
    try {
      // 写入按键到 NES controller 1
      const b = this._buttons;
      const set = (bit: number, name: string) => {
        if (b & (1 << bit)) this._nes!.buttonDown(1, name as any);
        else this._nes!.buttonUp(1, name as any);
      };
      set(0, 'A'); set(1, 'B'); set(2, 'SELECT'); set(3, 'START');
      set(4, 'UP'); set(5, 'DOWN'); set(6, 'LEFT'); set(7, 'RIGHT');

      // 组合根每帧驱动: NMI 推进逻辑 → 直写 PPU 内存 → PPU 扫描线渲染
      this._tsubasa2?.frame(this._nes);
      this._speakers.flush();

      this._frameIndex++;
      this._fpsFrameCount++;
      this._options.onFrame?.(this._frameIndex);
    } catch (e) {
      this.stop();
      this._options.onError?.(e as Error);
    }
  }

  private _onButtonChange(mask: number): void {
    this._buttons = mask & 0xFF;
  }

  fitInParent(containerW: number, containerH: number): { w: number; h: number } {
    return this._screen.fitInParent(containerW, containerH);
  }

  destroy(): void {
    this.stop();
  }
}
