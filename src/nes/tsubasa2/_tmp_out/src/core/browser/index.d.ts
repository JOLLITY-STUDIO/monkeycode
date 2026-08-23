import NES from "../nes";
import Screen from "./screen";
import Speakers from "./speakers";
import FrameTimer from "./frame-timer";
import KeyboardController from "./keyboard";
import GamepadController from "./gamepad";
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
    _frameTimer: FrameTimer;
    _gamepadPolling: {
        stop: () => void;
    };
    _fpsInterval?: number;
    nes: NES;
    gamepad: GamepadController;
    keyboard: KeyboardController;
    constructor(options?: BrowserOptions);
    start(): void;
    stop(): void;
    loadROM(data: string): void;
    fitInParent(): void;
    screenshot(): HTMLImageElement;
    destroy(): void;
    static loadROMFromURL(url: string, callback: (err: Error | null, data?: string) => void): XMLHttpRequest;
}
export {};
