import NES from "../nes";
import Screen from "./screen";
import Speakers from "./speakers";
import FrameTimer from "./frame-timer";
import KeyboardController from "./keyboard";
import GamepadController from "./gamepad";

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
  nes!: NES;
  gamepad!: GamepadController;
  keyboard!: KeyboardController;

  constructor(options: BrowserOptions = {}) {
    this._options = options;

    // Create screen (creates <canvas> inside container)
    this._screen = new Screen(options.container, {
      onMouseDown: (x: number, y: number) => {
        this.nes.zapperMove(x, y);
        this.nes.zapperFireDown();
      },
      onMouseUp: () => {
        this.nes.zapperFireUp();
      },
    });
    this._screen.fitInParent();

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

  screenshot(): HTMLImageElement {
    return this._screen.screenshot();
  }

  destroy(): void {
    this.stop();
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
