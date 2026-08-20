"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tsubasa2 = void 0;
/**
 * 天使之翼2 — 游戏主类 (game 层, 对外唯一入口)
 *
 * 对外: new Tsubasa2(ctx, config).start(canvas)
 *   - 内含 RAF 循环 (无 GameLoop 外部依赖)
 *   - 内含 PPU (替代 FrameCompositor, 直接渲染 NES 帧)
 *   - onFrame 回调给外部 (每帧通知)
 *
 * Reset 链 (按 asm 翻译, 不模拟 MMC3):
 *   RESET → DispatchService.init(0)
 *     → $C64E (硬件初始化: 清 RAM/NT/OAM, PPU 初始化)
 *     → $CEFE (MMC3+PPU 重置)
 *     → $C400 (分发器: A=任务索引 → bank2 $A200)
 *     → $A200 → Bank02Service.resetEntry(0) (场景入口)
 */
const ppu_1 = __importDefault(require("../core/ppu"));
const DataStore_1 = require("./data/prg/DataStore");
const dispatch_service_1 = require("./dispatch.service");
const bank00_core_service_1 = require("./service/bank00/bank00_core.service");
const bank02_scene_service_1 = require("./service/bank02_scene.service");
const bank30_init_service_1 = require("./service/bank30_init.service");
const bank12_audio_service_1 = require("./service/bank12_audio.service");
const bank16_skills_service_1 = require("./service/bank16_skills.service");
const bank18_story_service_1 = require("./service/bank18_story.service");
const bank19_auxiliary_service_1 = require("./service/bank19_auxiliary.service");
const bank20_match_aux_service_1 = require("./service/bank20_match-aux.service");
const bank26_showcase_executor_service_1 = require("./service/bank26_showcase-executor.service");
const bank26_match_service_1 = require("./service/bank26_match.service");
const bank01_data_query_service_1 = require("./service/bank01_data-query.service");
const bank28_match_service_1 = require("./service/bank28_match.service");
const bank31_interrupt_service_1 = require("./service/bank31_interrupt.service");
const levelup_service_1 = require("./service/levelup.service");
const bank24_hud_service_1 = require("./service/bank24_hud.service");
const bank29_roster_service_1 = require("./service/bank29_roster.service");
const PasswordView_1 = require("./view/PasswordView");
const MeetingView_1 = require("./view/MeetingView");
const LevelUpView_1 = require("./view/LevelUpView");
const OamView_1 = require("./view/OamView");
const ShowcaseView_1 = require("./view/ShowcaseView");
const types_1 = require("../core/types");
// CHR Bank 数据 (game 层, 直接 import)
const chr_bank_00_1 = __importDefault(require("./data/chr/chr-bank-00"));
const chr_bank_01_1 = __importDefault(require("./data/chr/chr-bank-01"));
const chr_bank_02_1 = __importDefault(require("./data/chr/chr-bank-02"));
const chr_bank_03_1 = __importDefault(require("./data/chr/chr-bank-03"));
const chr_bank_04_1 = __importDefault(require("./data/chr/chr-bank-04"));
const chr_bank_05_1 = __importDefault(require("./data/chr/chr-bank-05"));
const chr_bank_06_1 = __importDefault(require("./data/chr/chr-bank-06"));
const chr_bank_07_1 = __importDefault(require("./data/chr/chr-bank-07"));
const chr_bank_08_1 = __importDefault(require("./data/chr/chr-bank-08"));
const chr_bank_09_1 = __importDefault(require("./data/chr/chr-bank-09"));
const chr_bank_10_1 = __importDefault(require("./data/chr/chr-bank-10"));
const chr_bank_11_1 = __importDefault(require("./data/chr/chr-bank-11"));
const chr_bank_12_1 = __importDefault(require("./data/chr/chr-bank-12"));
const chr_bank_13_1 = __importDefault(require("./data/chr/chr-bank-13"));
const chr_bank_14_1 = __importDefault(require("./data/chr/chr-bank-14"));
const chr_bank_15_1 = __importDefault(require("./data/chr/chr-bank-15"));
/** NES 帧 RGBA 字节缓冲 (256*240*4, 供 putImageData) */
const FRAME_RGBA_SIZE = types_1.NES_WIDTH * types_1.NES_HEIGHT * 4;
class Tsubasa2 {
    constructor(ctx, config) {
        this._ctx = null;
        this._config = {};
        this._state = types_1.GameState.INIT;
        this._buttons = 0;
        this._frameIndex = 0;
        /** RAF 循环 ID (null=未运行) */
        this._rafId = null;
        /** 上一帧时间戳 (ms, 算 dt + fps) */
        this._lastTime = 0;
        /** FPS 统计 (帧计数/时间戳) */
        this._fpsFrameCount = 0;
        this._fpsLastTime = 0;
        this._fps = 0;
        /** 回调 */
        this._callbacks = {};
        /** RGBA 帧缓冲 (putImageData 用, PPU.buffer 是 Uint32 索引色, 需转 RGBA) */
        this._rgbaBuf = new Uint8ClampedArray(FRAME_RGBA_SIZE);
        /** ImageData 缓存 (避免每帧重建) */
        this._imageData = null;
        this._ctx = ctx ?? null;
        this._config = config ?? {};
        if (this._config.callbacks)
            this._callbacks = this._config.callbacks;
        // DataStore
        this._store = new DataStore_1.DataStore();
        // PPU (替代 FrameCompositor) — 传 nes 对象给 PPU (含 ui.writeFrame)
        // PPU 在 endFrame() 调用 nes.ui.writeFrame(buffer); 此处用 noop, 由本类接管渲染
        this._ppu = new ppu_1.default({ ui: { writeFrame: () => { } }, ppu: null, mmap: null, rom: null });
        // Bank 服务链 (依赖注入, 不模拟 MMC3)
        this._bank00 = new bank00_core_service_1.Bank00Service(this._store);
        this._bank02 = new bank02_scene_service_1.Bank02Service(this._store, this._bank00);
        this._bank16 = new bank16_skills_service_1.Bank16Service(this._store);
        this._bank30 = new bank30_init_service_1.Bank30Service(this._store, this._bank00, this._bank02, this._bank16);
        this._dataQuery = new bank01_data_query_service_1.DataQueryService(this._store);
        this._matchEngine = new bank26_match_service_1.MatchEngineService(this._store);
        this._interrupt = new bank31_interrupt_service_1.InterruptService(this._store);
        this._audio = new bank12_audio_service_1.Bank12AudioService(this._store);
        this._levelup = new levelup_service_1.LevelUpService(this._store);
        this._hud = new bank24_hud_service_1.Bank24HudService(this._store);
        this._bank19 = new bank19_auxiliary_service_1.Bank19Service(this._store);
        this._bank18 = new bank18_story_service_1.Bank18Service(this._store, this._bank19);
        this._bank20 = new bank20_match_aux_service_1.Bank20Service(this._store);
        this._bank28 = new bank28_match_service_1.Bank28MatchService(this._store);
        this._bank29 = new bank29_roster_service_1.Bank29RosterService(this._store);
        this._showcaseExec = new bank26_showcase_executor_service_1.Bank26ShowcaseExecutor(this._store);
        // DispatchService (真实 RESET 链, 替代已废弃的 boot.ts)
        this._dispatch = new dispatch_service_1.DispatchService(this._store, this._bank00, this._bank02);
        // Views
        this._passwordView = new PasswordView_1.PasswordView(this._store);
        this._meetingView = new MeetingView_1.MeetingView(this._store);
        this._levelupView = new LevelUpView_1.LevelUpView(this._store);
        this._oamView = new OamView_1.OamView(this._store);
        this._showcaseView = new ShowcaseView_1.ShowcaseView(this._store);
        // 注册 CHR Banks 到 PPU (pattern table)
        this._registerAllChrBanks();
    }
    // ══════════════════════════════════════════
    // 生命周期
    // ══════════════════════════════════════════
    /** 启动游戏 (需传 canvas 节点供 RAF) */
    start(canvas) {
        if (this._state !== types_1.GameState.INIT) {
            console.warn('[Tsubasa2] 已启动，忽略重复 start()');
            return;
        }
        // 真实 RESET 链: DispatchService.init(0)
        //   → $C64E (硬件初始化: 清 RAM/NT/OAM)
        //   → $CEFE (MMC3+PPU 重置)
        //   → $C400 (分发器 → bank2 $A200)
        //   → Bank02Service.resetEntry(0)
        this._interrupt.reset();
        this._dispatch.init(0);
        // 触发开场 BGM (TECMO Theater, id=0x31)
        try {
            this._audio.requestPlay(0x31);
        }
        catch (_) { /* */ }
        this._state = types_1.GameState.OPENING;
        this._loopStart(canvas);
    }
    pause() {
        // RAF 暂停 (置标志, 不取消 RAF, 便于 resume)
        this._state = types_1.GameState.PAUSED;
    }
    resume() {
        if (this._state === types_1.GameState.PAUSED) {
            this._state = types_1.GameState.MATCH; // FIXME: 恢复到暂停前状态, 简化为 MATCH
        }
    }
    stop() {
        this._loopStop();
        this._state = types_1.GameState.INIT;
    }
    // ══════════════════════════════════════════
    // 输入接口
    // ══════════════════════════════════════════
    pressButton(button) {
        const mask = types_1.BUTTON[button];
        if (typeof mask === 'number')
            this._buttons |= mask;
    }
    releaseButton(button) {
        const mask = types_1.BUTTON[button];
        if (typeof mask === 'number')
            this._buttons &= ~mask;
    }
    setButtons(mask) { this._buttons = mask; }
    getButtons() { return this._buttons; }
    // ══════════════════════════════════════════
    // 调试接口
    // ══════════════════════════════════════════
    getDebugInfo() {
        return { frame: this._frameIndex, gameStateName: this._state, fps: this._fps };
    }
    enableAi() { this._config.aiMode = true; }
    disableAi() { this._config.aiMode = false; }
    // ══════════════════════════════════════════
    // 无头接口 (录制/测试)
    // ══════════════════════════════════════════
    get store() { return this._store; }
    get ppu() { return this._ppu; }
    get levelup() { return this._levelup; }
    get hud() { return this._hud; }
    /** 无头初始化 (跳过 RAF, 供 stepFrame 逐帧推进) */
    prepare() {
        if (this._state !== types_1.GameState.INIT)
            return;
        this._interrupt.reset();
        this._dispatch.init(0);
        this._state = types_1.GameState.OPENING;
        console.log('[Tsubasa2] 无头初始化完成 (prepare)');
    }
    /** 无头推进一帧 (逻辑+渲染), 返回 PPU 帧缓冲 */
    stepFrame() {
        this._onFrame(16.67);
        this._onRender(16.67);
        this._frameIndex++;
        return this._ppu.buffer;
    }
    captureFrame() { return this._ppu.buffer; }
    // ══════════════════════════════════════════
    // 内部: RAF 循环 (替代 GameLoop)
    // ══════════════════════════════════════════
    _loopStart(canvas) {
        // 微信小程序用 canvas.requestAnimationFrame, 浏览器用 window.requestAnimationFrame
        const raf = (cb) => {
            if (canvas && typeof canvas.requestAnimationFrame === 'function') {
                return canvas.requestAnimationFrame(cb);
            }
            return (typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : null)?.(cb) ?? -1;
        };
        const tick = (time) => {
            if (this._state === types_1.GameState.PAUSED || this._state === types_1.GameState.INIT)
                return;
            const dt = this._lastTime ? (time - this._lastTime) : 16.67;
            this._lastTime = time;
            this._onFrame(dt);
            this._onRender(dt);
            this._frameIndex++;
            // FPS 统计
            this._fpsFrameCount++;
            if (time - this._fpsLastTime >= 500) {
                this._fps = Math.round(this._fpsFrameCount * 1000 / (time - this._fpsLastTime));
                this._fpsFrameCount = 0;
                this._fpsLastTime = time;
            }
            // 帧回调控
            this._callbacks.onFrame?.(this._frameIndex);
            this._rafId = raf(tick);
        };
        this._fpsLastTime = performance.now?.() ?? Date.now();
        this._rafId = raf(tick);
    }
    _loopStop() {
        if (this._rafId !== null) {
            // 微信小程序 canvas.cancelAnimationFrame / 浏览器 cancelAnimationFrame
            const caf = (id) => typeof cancelAnimationFrame !== 'undefined' && cancelAnimationFrame(id);
            try {
                caf(this._rafId);
            }
            catch (_) { /* */ }
            this._rafId = null;
        }
    }
    // ══════════════════════════════════════════
    // 内部: 每帧逻辑 + 渲染
    // ══════════════════════════════════════════
    _onFrame(_dt) {
        // Bank00 主循环 (帧循环核心: PPU Buffer/场景初始化链)
        if (this._bank00.isRunning) {
            this._bank00.update(this._buttons);
        }
        // DispatchService 帧更新 (委托 bank02 resetEntry 后的 mainLoop)
        this._dispatch.update(this._buttons, this._bank00.frameCount);
        // Bank26 演出执行器 tick (技能演出状态机推进)
        this._showcaseExec.tick();
        // 音频引擎更新 (每帧处理请求队列 + 通道状态机 + APU 输出)
        try {
            this._audio.update();
        }
        catch (_) { /* */ }
    }
    _onRender(_dt) {
        // 1. PPU startFrame (清 per-scanline sprite 评估数据, 设背景色)
        this._ppu.startFrame();
        // 2. 场景 View 层: 读 service DisplayState, 写 NT/OAM (对应 NES NMI 把场景数据写到 PPU)
        this._oamView.emit();
        // 3. PPU endFrame (渲染所有 scanline + 输出 buffer)
        this._ppu.endFrame();
        // 4. 呈现: ppu.buffer (Uint32 索引色) → putImageData
        if (this._ctx) {
            this._writeFrameToCtx(this._ppu.buffer);
        }
    }
    /** PPU Uint32 帧缓冲 → canvas putImageData */
    _writeFrameToCtx(buf) {
        if (!this._ctx)
            return;
        if (!this._imageData) {
            this._imageData = this._ctx.createImageData(types_1.NES_WIDTH, types_1.NES_HEIGHT);
        }
        const data = this._imageData.data;
        for (let i = 0; i < buf.length; i++) {
            const c = buf[i];
            // Uint32 ABGR (PPU 内部格式) → RGBA
            data[i * 4 + 0] = c & 0xFF; // R
            data[i * 4 + 1] = (c >> 8) & 0xFF; // G
            data[i * 4 + 2] = (c >> 16) & 0xFF; // B
            data[i * 4 + 3] = 0xFF; // A
        }
        this._ctx.putImageData(this._imageData, 0, 0);
    }
    // ══════════════════════════════════════════
    // CHR Bank 注册 (PPU pattern table)
    // ══════════════════════════════════════════
    _registerAllChrBanks() {
        const banks = [
            chr_bank_00_1.default, chr_bank_01_1.default, chr_bank_02_1.default, chr_bank_03_1.default, chr_bank_04_1.default, chr_bank_05_1.default, chr_bank_06_1.default, chr_bank_07_1.default,
            chr_bank_08_1.default, chr_bank_09_1.default, chr_bank_10_1.default, chr_bank_11_1.default, chr_bank_12_1.default, chr_bank_13_1.default, chr_bank_14_1.default, chr_bank_15_1.default,
        ];
        // PPU pattern table: tile.render(buffer,...) 用 chrMem
        // 每个 CHR Bank 8KB = 512 tiles, 前256是BG pattern, 后256是SPR pattern
        // TODO: 将 CHR Bank 数据写入 PPU 的 pattern table (ptTile)
        //       PPU 的 chrMem / ptTile 需要对接, 当前先占位
        console.log(`[Tsubasa2] 注册 ${banks.length} 个 CHR Bank (待对接 PPU pattern table)`);
    }
}
exports.Tsubasa2 = Tsubasa2;
