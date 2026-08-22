"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUTTON_RIGHT = exports.BUTTON_LEFT = exports.BUTTON_DOWN = exports.BUTTON_UP = exports.BUTTON_START = exports.BUTTON_SELECT = exports.BUTTON_B = exports.BUTTON_A = void 0;
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
const nes_1 = __importDefault(require("../nes"));
const rom_1 = require("../../game/rom");
const index_1 = require("../../game/index");
const screen_1 = __importDefault(require("./screen"));
const speakers_1 = __importDefault(require("./speakers"));
const frame_timer_1 = __importDefault(require("./frame-timer"));
const input_1 = __importStar(require("./input"));
Object.defineProperty(exports, "BUTTON_A", { enumerable: true, get: function () { return input_1.BUTTON_A; } });
Object.defineProperty(exports, "BUTTON_B", { enumerable: true, get: function () { return input_1.BUTTON_B; } });
Object.defineProperty(exports, "BUTTON_SELECT", { enumerable: true, get: function () { return input_1.BUTTON_SELECT; } });
Object.defineProperty(exports, "BUTTON_START", { enumerable: true, get: function () { return input_1.BUTTON_START; } });
Object.defineProperty(exports, "BUTTON_UP", { enumerable: true, get: function () { return input_1.BUTTON_UP; } });
Object.defineProperty(exports, "BUTTON_DOWN", { enumerable: true, get: function () { return input_1.BUTTON_DOWN; } });
Object.defineProperty(exports, "BUTTON_LEFT", { enumerable: true, get: function () { return input_1.BUTTON_LEFT; } });
Object.defineProperty(exports, "BUTTON_RIGHT", { enumerable: true, get: function () { return input_1.BUTTON_RIGHT; } });
class BrowserMini {
    constructor(options) {
        this._options = options;
        this._frameIndex = 0;
        this._fpsFrameCount = 0;
        this._fpsLastTime = Date.now();
        this._fps = 0;
        this._running = false;
        this._nes = null;
        this._tsubasa2 = null;
        this._buttons = 0;
        this._screen = new screen_1.default(options.canvas);
        this._speakers = new speakers_1.default({
            onBufferUnderrun: () => {
                this._frameTimer.generateFrame();
                this._frameTimer.generateFrame();
            },
        });
        this._input = new input_1.default({
            onButtonChange: (mask) => this._onButtonChange(mask),
        });
        this._frameTimer = new frame_timer_1.default({
            onGenerateFrame: () => this._generateFrame(),
            onWriteFrame: () => this._screen.writeBuffer(),
        }, options.canvas);
    }
    // ── 公开属性 ──
    get input() { return this._input; }
    get screen() { return this._screen; }
    get nes() { return this._nes; }
    get fps() { return this._fps; }
    get frameIndex() { return this._frameIndex; }
    /**
     * 启动游戏: new NES → loadTsROM(game ROM) → reset → 帧循环
     *
     * ROM 定义来自 src/game/index (HEADER + NES_CHR_ROM + PRG bank 类)。
     * NES.loadTsROM 内部调 reset() 触发 reset 向量, 进入游戏主循环。
     */
    async start() {
        if (this._running)
            return;
        this._running = true;
        // 构造 NES (去 CPU 化, 默认 bus)
        this._nes = new nes_1.default({
            onFrame: (buffer) => this._screen.setBuffer(buffer),
            onStatusUpdate: (status) => this._options.onStatus?.(status),
            onAudioSample: (l, r) => this._speakers.writeSample(l, r),
            emulateSound: true,
            sampleRate: this._speakers.getSampleRate(),
        });
        // 加载 ROM (header + prg + chr) → 内部 reset → mmap 装载 → reset 向量执行
        this._nes.loadTsROM({
            header: rom_1.HEADER,
            prg: rom_1.PRG,
            chr: rom_1.NES_CHR_ROM,
        });
        // 组合根: 实例化 Tsubasa2 主类 (DataStore + 各 Service) 并启动 BOOT 场景
        this._tsubasa2 = new index_1.Tsubasa2();
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
        }, 1000);
        this._options.onStatus?.('运行中');
    }
    stop() {
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
    _generateFrame() {
        if (!this._nes)
            return;
        try {
            // 写入按键到 NES controller 1
            const b = this._buttons;
            const set = (bit, name) => {
                if (b & (1 << bit))
                    this._nes.buttonDown(1, name);
                else
                    this._nes.buttonUp(1, name);
            };
            set(0, 'A');
            set(1, 'B');
            set(2, 'SELECT');
            set(3, 'START');
            set(4, 'UP');
            set(5, 'DOWN');
            set(6, 'LEFT');
            set(7, 'RIGHT');
            // 组合根每帧驱动: NMI 推进逻辑 → 直写 PPU 内存 → PPU 扫描线渲染
            this._tsubasa2?.frame(this._nes);
            this._speakers.flush();
            this._frameIndex++;
            this._fpsFrameCount++;
            this._options.onFrame?.(this._frameIndex);
        }
        catch (e) {
            this.stop();
            this._options.onError?.(e);
        }
    }
    _onButtonChange(mask) {
        this._buttons = mask & 0xFF;
    }
    fitInParent(containerW, containerH) {
        return this._screen.fitInParent(containerW, containerH);
    }
    destroy() {
        this.stop();
    }
}
exports.default = BrowserMini;
