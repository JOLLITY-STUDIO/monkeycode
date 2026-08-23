"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nes_1 = __importDefault(require("../nes"));
const screen_1 = __importDefault(require("./screen"));
const speakers_1 = __importDefault(require("./speakers"));
const frame_timer_1 = __importDefault(require("./frame-timer"));
const keyboard_1 = __importDefault(require("./keyboard"));
const gamepad_1 = __importDefault(require("./gamepad"));
// Debug logging, enabled via localStorage.jsnes_debug = 1
let debugEnabled = false;
try {
    debugEnabled = !!localStorage.getItem("jsnes_debug");
}
catch {
    // localStorage not available
}
function debug(...args) {
    if (debugEnabled)
        console.log(...args);
}
/**
 * Browser-based NES emulator that handles canvas rendering, audio output,
 * keyboard/gamepad input, and frame timing.
 */
class Browser {
    constructor(options = {}) {
        this._options = options;
        // Create screen (creates <canvas> inside container)
        this._screen = new screen_1.default(options.container, {
            onMouseDown: (x, y) => {
                this.nes.zapperMove(x, y);
                this.nes.zapperFireDown();
            },
            onMouseUp: () => {
                this.nes.zapperFireUp();
            },
        });
        this._screen.fitInParent();
        // Create speakers
        this._speakers = new speakers_1.default({
            onBufferUnderrun: () => {
                debug("Buffer underrun, running extra frames to catch up");
                this._frameTimer.generateFrame();
                this._frameTimer.generateFrame();
            },
        });
        // Create NES
        this.nes = new nes_1.default({
            onFrame: this._screen.setBuffer,
            onStatusUpdate: debug,
            onAudioSample: this._speakers.writeSample,
            onBatteryRamWrite: options.onBatteryRamWrite || (() => { }),
            sampleRate: this._speakers.getSampleRate(),
        });
        // Create frame timer
        this._frameTimer = new frame_timer_1.default({
            onGenerateFrame: () => {
                try {
                    this.nes.frame();
                    this._speakers.flush();
                }
                catch (e) {
                    this.stop();
                    if (this._options.onError) {
                        this._options.onError(e);
                    }
                }
            },
            onWriteFrame: this._screen.writeBuffer,
        });
        // Set up gamepad and keyboard
        this.gamepad = new gamepad_1.default({
            onButtonDown: this.nes.buttonDown,
            onButtonUp: this.nes.buttonUp,
        });
        this.gamepad.loadGamepadConfig();
        this._gamepadPolling = this.gamepad.startPolling();
        this.keyboard = new keyboard_1.default({
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
    start() {
        this._frameTimer.start();
        this._speakers.start();
        this._fpsInterval = window.setInterval(() => {
            debug(`FPS: ${this.nes.getFPS()}`);
        }, 1000);
    }
    stop() {
        this._frameTimer.stop();
        this._speakers.stop();
        clearInterval(this._fpsInterval);
    }
    loadROM(data) {
        this.stop();
        this.nes.loadROM(data);
        this.start();
    }
    fitInParent() {
        this._screen.fitInParent();
    }
    screenshot() {
        return this._screen.screenshot();
    }
    destroy() {
        this.stop();
        document.removeEventListener("keydown", this.keyboard.handleKeyDown);
        document.removeEventListener("keyup", this.keyboard.handleKeyUp);
        document.removeEventListener("keypress", this.keyboard.handleKeyPress);
        this._gamepadPolling.stop();
        this._screen.destroy();
    }
    static loadROMFromURL(url, callback) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.overrideMimeType("text/plain; charset=x-user-defined");
        req.onerror = () => callback(new Error(`Error loading ${url}: ${req.statusText}`));
        req.onload = function () {
            if (this.status === 200) {
                callback(null, this.responseText);
            }
            else if (this.status === 0) {
                // Aborted, ignore
            }
            else {
                req.onerror({});
            }
        };
        req.send();
        return req;
    }
}
exports.default = Browser;
