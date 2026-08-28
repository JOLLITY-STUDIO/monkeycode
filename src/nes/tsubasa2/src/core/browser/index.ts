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
  type VideoConfig,
} from "../../option";
import { getScaler } from "./scalers";

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
  /** 启用触屏控制器 (mobile/触屏设备). 默认 false */
  touchEnabled?: boolean;
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
    // 默认不启用, 仅当 touchEnabled=true 时装载.
    if (options.touchEnabled) {
      // ... 由 Browser 子类化或 config-on 创建, 此处留接口位
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
