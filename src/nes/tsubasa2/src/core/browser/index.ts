// @ts-nocheck  // tsnes 移植核心，非翻译层，跳过类型检查
import NES from "../nes";
import Screen from "./screen";
import Speakers from "./speakers";
import FrameTimer from "./frame-timer";
import KeyboardController from "./keyboard";
import GamepadController from "./gamepad";
import {
  VideoConfigStorage,
  LocalStorageAdapter,
  TouchConfigStorage,
  LocalTouchStorageAdapter,
  shouldEnableTouch,
  DEFAULT_TOUCH_CONFIG,
  type VideoConfig,
  type TouchConfig,
} from "../../option";
import { getScaler } from "./scalers";
import { TouchController } from "./touch-controller";
import { CanvasTouchOverlay } from "./touch-overlay";

// Debug logging, enabled via localStorage.jsnes_debug = 1
let debugEnabled = false;
try {
  debugEnabled = !!localStorage.getItem("jsnes_debug");
} catch {
  // localStorage not available
}
function debug(...args: any[]): void {
  if (debugEnabled) console.log(...args);
}

/** NES button ID → 短 label (用于 overlay 显示) */
const NES_BUTTON_LABEL: Record<number, string> = {
  0: "A",
  1: "B",
  2: "SEL",
  3: "START",
};

interface BrowserOptions {
  container: HTMLElement;
  romData?: string;
  onError?: (e: Error) => void;
  onBatteryRamWrite?: (addr: number, value: number) => void;
  /**
   * 视频配置 (HP3X scaler 等).
   *  - 传 VideoConfigStorage: 复用 caller 自己的 storage (用于跨实例 share config 或自定义持久化)
   *  - 传 VideoConfig object: 一帧直接配置, 不会被持久化
   *  - 不传: 默认 localStorage 持久化
   */
  videoConfig?: VideoConfig | VideoConfigStorage;
  /** Skip 自动 fitInParent (caller 自己控制 canvas 尺寸) */
  skipAutoFit?: boolean;
  /** 启用触屏控制器 (mobile/触屏设备).
   *  - true: 强制启用
   *  - false: 强制禁用
   *  - undefined: 自动检测 (navigator.maxTouchPoints > 0 && !pointer:fine)
   */
  touchEnabled?: boolean;
  /** 触屏配置 storage (用于自定义持久化). 不传则用 localStorage */
  touchConfig?: TouchConfig | TouchConfigStorage;
}

/**
 * Browser-based NES emulator that handles canvas rendering, audio output,
 * keyboard/gamepad input, and frame timing.
 */
export default class Browser {
  _options: BrowserOptions;
  _screen: Screen;
  _speakers: Speakers;
  _frameTimer!: FrameTimer;
  _gamepadPolling!: { stop: () => void };
  _fpsInterval?: number;
  /** 当前 video config storage */
  _videoConfigStorage!: VideoConfigStorage;
  /** unsubscribe handler for video config changes */
  _videoConfigUnsub?: () => void;
  /** ResizeObserver 监听父容器尺寸变化 (autoScaleOnResize 用) */
  _resizeObserver?: ResizeObserver;
  /** 触屏 controller (V0.8+) */
  _touchController?: TouchController;
  /** 触屏 overlay (canvas 浮层) */
  _touchOverlay?: CanvasTouchOverlay;
  /** 触屏 config storage */
  _touchConfigStorage!: TouchConfigStorage;
  /** 触屏 config 订阅 */
  _touchConfigUnsub?: () => void;
  nes!: NES;
  gamepad!: GamepadController;
  keyboard!: KeyboardController;

  constructor(options: BrowserOptions = {}) {
    this._options = options;

    // ─── 视频配置初始化 ───
    if (options.videoConfig instanceof VideoConfigStorage) {
      this._videoConfigStorage = options.videoConfig;
    } else if (options.videoConfig && typeof options.videoConfig === "object") {
      // 一次性 config, 用空 storage adapter
      this._videoConfigStorage = new VideoConfigStorage(
        { getItem() { return null; }, setItem() {}, removeItem() {} },
        options.videoConfig,
      );
    } else {
      // 默认 localStorage 持久化
      this._videoConfigStorage = new VideoConfigStorage(new LocalStorageAdapter());
    }
    if (!this._videoConfigStorage.loaded) {
      this._videoConfigStorage.load();
    }
    const initialConfig = this._videoConfigStorage.current;
    const initialScaler = getScaler(initialConfig.scaler);

    // ─── Screen (注入初始 scaler) ───
    this._screen = new Screen(options.container, {
      initialScaler,
      onMouseDown: (x: number, y: number) => {
        this.nes.zapperMove(x, y);
        this.nes.zapperFireDown();
      },
      onMouseUp: () => {
        this.nes.zapperFireUp();
      },
    });
    if (!options.skipAutoFit) {
      this._screen.fitInParent();
    }

    // Create speakers
    this._speakers = new Speakers({
      onBufferUnderrun: () => {
        debug("Buffer underrun, running extra frames to catch up");
        this._frameTimer.generateFrame();
        this._frameTimer.generateFrame();
      },
    });

    // Create NES
    this.nes = new NES({
      onFrame: this._screen.setBuffer,
      onStatusUpdate: debug,
      onAudioSample: this._speakers.writeSample,
      onBatteryRamWrite: options.onBatteryRamWrite || (() => {}),
      sampleRate: this._speakers.getSampleRate(),
    });

    // Create frame timer
    this._frameTimer = new FrameTimer({
      onGenerateFrame: () => {
        try {
          this.nes.frame();
          this._speakers.flush();
        } catch (e) {
          this.stop();
          if (this._options.onError) {
            this._options.onError(e as Error);
          }
        }
      },
      onWriteFrame: this._screen.writeBuffer,
    });

    // Set up gamepad and keyboard
    this.gamepad = new GamepadController({
      onButtonDown: this.nes.buttonDown,
      onButtonUp: this.nes.buttonUp,
    });
    this.gamepad.loadGamepadConfig();
    this._gamepadPolling = this.gamepad.startPolling();

    this.keyboard = new KeyboardController({
      onButtonDown: this.gamepad.disableIfGamepadEnabled(this.nes.buttonDown),
      onButtonUp: this.gamepad.disableIfGamepadEnabled(this.nes.buttonUp),
    });
    this.keyboard.loadKeys();

    // Bind keyboard events
    document.addEventListener("keydown", this.keyboard.handleKeyDown);
    document.addEventListener("keyup", this.keyboard.handleKeyUp);
    document.addEventListener("keypress", this.keyboard.handleKeyPress);

    // ─── 触屏控制器 (mobile 端) ───
    // 自动检测: undefined 时用 shouldEnableTouch()
    const touchOn = options.touchEnabled === undefined
      ? shouldEnableTouch()
      : options.touchEnabled;
    if (touchOn) {
      // 1. 加载 touch config (storage 持久化)
      if (options.touchConfig instanceof TouchConfigStorage) {
        this._touchConfigStorage = options.touchConfig;
      } else if (options.touchConfig && typeof options.touchConfig === "object") {
        this._touchConfigStorage = new TouchConfigStorage(
          { getItem() { return null; }, setItem() {}, removeItem() {} },
          options.touchConfig as TouchConfig,
        );
      } else {
        this._touchConfigStorage = new TouchConfigStorage(new LocalTouchStorageAdapter());
      }
      if (!this._touchConfigStorage.loaded) this._touchConfigStorage.load();
      const cfg = this._touchConfigStorage.current;

      // 2. 创建 overlay canvas (叠加在 game canvas 上, 不抢事件)
      const w = options.container.clientWidth;
      const h = options.container.clientHeight;
      this._touchOverlay = new CanvasTouchOverlay({ width: w, height: h });
      options.container.appendChild(this._touchOverlay.canvas);

      // 3. 创建 TouchController
      this._touchController = new TouchController({
        target: options.container,
        controller: 1,
        config: cfg,
        overlay: this._touchOverlay,
      }, {
        onButtonDown: (ctrl, b) => this.nes.buttonDown(ctrl, b),
        onButtonUp:   (ctrl, b) => this.nes.buttonUp(ctrl, b),
        onGesture: (type, x, y, button) => {
          if (!this._touchOverlay) return;
          const label = NES_BUTTON_LABEL[button] || "?";
          this._touchOverlay.paintAction({
            x, y, label,
            radius: 32,
            opacity: 1,
            state: type,
          });
        },
      });

      // 4. 监听 config 变化
      this._touchConfigUnsub = this._touchConfigStorage.onChange((newCfg) => {
        this._touchController?.applyConfig(newCfg);
      });

      // 5. Resize 时同步 overlay canvas 尺寸
      if (typeof ResizeObserver !== "undefined") {
        const ro = new ResizeObserver(() => {
          if (this._touchOverlay) {
            this._touchOverlay.resize(
              options.container.clientWidth,
              options.container.clientHeight,
            );
          }
        });
        ro.observe(options.container);
      }

      debug("[Browser] 触屏控制器已启用 (auto-detect=" + (options.touchEnabled === undefined) + ")");
    }

    // ─── 监听 video config 变化 → 实时切换 scaler + 应用尺寸策略 ───
    this._videoConfigUnsub = this._videoConfigStorage.onChange((cfg) => {
      const scaler = getScaler(cfg.scaler);
      this._screen.setScaler(scaler);
      if (!options.skipAutoFit) {
        this._screen.applyConfigSize(cfg);
      }
    });

    // ─── 父容器 resize → auto-fit (autoScaleOnResize 时) ───
    if (!options.skipAutoFit && typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver(() => {
        if (this._videoConfigStorage.current.autoScaleOnResize) {
          this._screen.fitInParent();
        } else {
          // 非 auto 模式也跟随最新 config 应用 (parent 尺寸变了的话)
          this._screen.applyConfigSize(this._videoConfigStorage.current);
        }
      });
      this._resizeObserver.observe(options.container);
    }

    // Load ROM and start if provided
    if (options.romData) {
      this.nes.loadROM(options.romData);
      this.start();
    }
  }

  start(): void {
    this._frameTimer.start();
    this._speakers.start();
    this._fpsInterval = window.setInterval(() => {
      debug(`FPS: ${this.nes.getFPS()}`);
    }, 1000);
  }

  stop(): void {
    this._frameTimer.stop();
    this._speakers.stop();
    clearInterval(this._fpsInterval);
  }

  loadROM(data: string): void {
    this.stop();
    this.nes.loadROM(data);
    this.start();
  }

  fitInParent(): void {
    this._screen.fitInParent();
  }

  /** Update video config (scaler 等) — 立即应用 + 持久化 */
  updateVideoConfig(patch: Partial<VideoConfig>): VideoConfig {
    return this._videoConfigStorage.update(patch);
  }

  /** 当前 video config (read-only 快照) */
  get videoConfig(): VideoConfig {
    return this._videoConfigStorage.current;
  }

  screenshot(): HTMLImageElement {
    return this._screen.screenshot();
  }

  destroy(): void {
    this.stop();
    if (this._videoConfigUnsub) this._videoConfigUnsub();
    if (this._resizeObserver) this._resizeObserver.disconnect();
    if (this._touchController) {
      this._touchController.destroy();
      this._touchController = undefined;
    }
    if (this._touchOverlay) {
      this._touchOverlay.destroy();
      this._touchOverlay = undefined;
    }
    if (this._touchConfigUnsub) this._touchConfigUnsub();
    document.removeEventListener("keydown", this.keyboard.handleKeyDown);
    document.removeEventListener("keyup", this.keyboard.handleKeyUp);
    document.removeEventListener("keypress", this.keyboard.handleKeyPress);
    this._gamepadPolling.stop();
    this._screen.destroy();
  }

  static loadROMFromURL(url: string, callback: (err: Error | null, data?: string) => void): XMLHttpRequest {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.overrideMimeType("text/plain; charset=x-user-defined");
    req.onerror = () =>
      callback(new Error(`Error loading ${url}: ${req.statusText}`));
    req.onload = function () {
      if (this.status === 200) {
        callback(null, this.responseText);
      } else if (this.status === 0) {
        // Aborted, ignore
      } else {
        req.onerror!({} as ProgressEvent);
      }
    };
    req.send();
    return req;
  }
}
