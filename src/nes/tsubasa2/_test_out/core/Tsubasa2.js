"use strict";
/**
 * 天使之翼2 — 游戏主类
 *
 * 对外暴露的唯一入口。
 * 创建实例 → 传入 CanvasContext → start() → 即插即用。
 *
 * 架构分层 (MVC):
 *   Model   — DataStore (内存/KV 数据中心)
 *   View    — Renderer  (Canvas 渲染)
 *   Control — GameLoop + Bank 服务
 *
 * Reset 链 (不模拟 MMC3，直接对象调用):
 *   Bank31 $FFF0 → InterruptService.reset()   (H5: no-op，无需 MMC3)
 *   Bank30 $C64E → Bank30Service.init()       硬件初始化
 *   Bank30 $C400 → Bank02Service.resetEntry(0) 场景初始化
 *   Bank02 $A21B → Bank00Service (内部调用)    NT清零/调色板/场景
 *   Bank02 $A26D → Bank00Service.mainLoop()    主循环
 *   BootService (场景路由器) → BOOT/TITLE/MEETING/MATCH/RESULT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tsubasa2 = void 0;
const GameLoop_1 = require("./GameLoop");
const DataStore_1 = require("../game/data/DataStore");
const Renderer_1 = require("./engine/render/Renderer");
const FrameCompositor_1 = require("./engine/render/FrameCompositor");
const PasswordView_1 = require("../game/view/PasswordView");
const OamView_1 = require("../game/view/OamView");
const ShowcaseView_1 = require("../game/view/ShowcaseView");
const bank26_showcase_executor_service_1 = require("../game/service/bank26_showcase-executor.service");
const bank00_core_service_1 = require("../game/service/bank00/bank00_core.service");
const bank02_scene_service_1 = require("../game/service/bank02_scene.service");
const bank30_init_service_1 = require("../game/service/bank30_init.service");
const bank16_skills_service_1 = require("../game/service/bank16_skills.service");
const bank12_audio_service_1 = require("../game/service/bank12_audio.service");
const boot_1 = require("../game/boot");
const bank01_data_query_service_1 = require("../game/service/bank01_data-query.service");
const bank26_match_service_1 = require("../game/service/bank26_match.service");
const bank19_auxiliary_service_1 = require("../game/service/bank19_auxiliary.service");
const bank18_story_service_1 = require("../game/service/bank18_story.service");
const bank20_match_aux_service_1 = require("../game/service/bank20_match-aux.service");
const bank31_interrupt_service_1 = require("../game/service/bank31_interrupt.service");
const types_1 = require("./types");
const types_2 = require("./types");
// CHR Bank 数据 (直接 import data 本地副本，无需 MMC3)
const chr_bank_00_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-00"));
const chr_bank_01_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-01"));
const chr_bank_02_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-02"));
const chr_bank_03_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-03"));
const chr_bank_04_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-04"));
const chr_bank_05_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-05"));
const chr_bank_06_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-06"));
const chr_bank_07_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-07"));
const chr_bank_08_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-08"));
const chr_bank_09_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-09"));
const chr_bank_10_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-10"));
const chr_bank_11_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-11"));
const chr_bank_12_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-12"));
const chr_bank_13_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-13"));
const chr_bank_14_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-14"));
const chr_bank_15_1 = __importDefault(require("../game/data/ppu/tile/chr/chr-bank-15"));
// PRG Bank 15 (音频数据) + Bank 12 (SE 音序数据) — data 本地副本
const prg_bank_15_1 = __importDefault(require("../game/data/prg-bank-15"));
const prg_bank_12_1 = __importDefault(require("../game/data/prg-bank-12"));
class Tsubasa2 {
    // ✂️ ── 构造与生命周期 ──
    // ------------------------------------------------------------
    constructor(ctx, config) {
        /** Canvas 2d 上下文 */
        this._ctx = null;
        /** 当前状态 */
        this._state = types_2.GameState.INIT;
        /** 按键状态 bitmask */
        this._buttons = 0;
        /** 上一次按键值 (用于上升沿检测) */
        this._lastButtons = 0;
        /** 帧索引 (无头驱动/录制用) */
        this._frameIndex = 0;
        /** 最近一次合成帧 (无头 capture 缓存) */
        this._lastFrame = null;
        /** 帧捕获 hook — 每帧渲染后回调 (无头录制/预览用) */
        this.onFrameCapture = null;
        this._ctx = ctx ?? null;
        this._config = config ?? {};
        this._loop = new GameLoop_1.GameLoop();
        this._store = new DataStore_1.DataStore();
        // 构造 Bank 服务链 — 依赖注入，不模拟 MMC3
        this._bank00 = new bank00_core_service_1.Bank00Service(this._store);
        this._bank02 = new bank02_scene_service_1.Bank02Service(this._store, this._bank00);
        this._bank16 = new bank16_skills_service_1.Bank16Service(this._store);
        this._bank30 = new bank30_init_service_1.Bank30Service(this._store, this._bank00, this._bank02, this._bank16);
        this._dataQuery = new bank01_data_query_service_1.DataQueryService(this._store);
        this._matchEngine = new bank26_match_service_1.MatchEngineService(this._store);
        this._interrupt = new bank31_interrupt_service_1.InterruptService(this._store);
        // 音频链路: Bank12AudioService (内部使用 PapuOutput + PAPU 完整模拟 NES APU)
        this._audioService = new bank12_audio_service_1.Bank12AudioService(this._store);
        // 场景路由器 — 持有 DataQuery/MatchEngine/Bank18/Bank19/Bank20 引用以委派场景
        this._bank19 = new bank19_auxiliary_service_1.Bank19Service(this._store);
        this._bank18 = new bank18_story_service_1.Bank18Service(this._store, this._bank19);
        this._bank20 = new bank20_match_aux_service_1.Bank20Service(this._store);
        this._boot = new boot_1.BootService(this._store, this._dataQuery, this._matchEngine, this._bank19, this._bank20, this._bank18, this._bank02);
        // 帧合成器 (PPU 层) — DataStore → 帧缓冲
        this._compositor = new FrameCompositor_1.FrameCompositor(this._store);
        // 渲染器 (View) — 帧缓冲 → 画布 (对应模拟器 ui.writeFrame)
        this._renderer = new Renderer_1.Renderer();
        // 场景 View 层 (渲染数据写入 NT/OAM, 读 service DisplayState)
        this._passwordView = new PasswordView_1.PasswordView(this._store);
        // Bank26 演出执行器 + 演出画面 View (球员射门特写/Cyclone)
        this._showcaseExecutor = new bank26_showcase_executor_service_1.Bank26ShowcaseExecutor(this._store);
        this._showcaseView = new ShowcaseView_1.ShowcaseView(this._store);
        // 注入 Bank30 (供 $D792 Cyclone 链调用 $8021/$8036)
        this._bank30.setShowcaseExecutor(this._showcaseExecutor);
        // OAM 桥接 View — ram_0468 影子 OAM → store.sprites (每帧合成前 emit)
        this._oamView = new OamView_1.OamView(this._store);
        // 注册全部 16 个 CHR Bank (直接从 rom-data import)
        this._registerAllChrBanks();
        this._loop.onFrame = this._onFrame.bind(this);
        this._loop.onRender = this._onRender.bind(this);
    }
    /** 启动游戏（需要传 canvas 节点供 requestAnimationFrame 使用） */
    start(canvas) {
        if (this._state !== types_2.GameState.INIT) {
            console.warn('[Tsubasa2] 已启动，忽略重复 start()');
            return;
        }
        // 渲染器挂载主 Canvas Context
        if (this._ctx) {
            this._renderer.setupCanvas(this._ctx);
        }
        // 注入 Bank15 BGM 数据 + Bank12 SE 数据 (替代 MMC3 R7/R6 映射)
        this._audioService.setBankData({
            bank12: [...prg_bank_12_1.default],
            bank15: [...prg_bank_15_1.default],
        });
        // 对应原始 Reset 链
        //   Bank31 $FFF0 → no-op (H5 无需 MMC3)
        //   Bank30 init → Bank02 resetEntry(0) → Bank00 mainLoop
        this._interrupt.reset();
        this._bank30.init();
        // 场景路由器接管根场景 (BOOT)
        this._boot.init();
        // 触发开场 BGM (TECMO Theater, id=0x31)
        const queued = this._audioService.requestPlay(0x31);
        console.log(`[Tsubasa2] BGM 0x31 request queued: ${queued}`);
        this._setState(types_2.GameState.OPENING);
        this._loop.start(canvas);
    }
    /** 暂停 */
    pause() {
        this._loop.pause();
    }
    /** 恢复 */
    resume() {
        this._loop.resume();
    }
    /** 彻底停止并销毁循环 */
    stop() {
        this._loop.stop();
    }
    // ── 资源加载 ──
    /** 加载 PRG Bank 数据 (游戏逻辑) — 已通过 rom-data import，保留用于运行时注入场景 */
    loadPrgBank(_bankId, _data) {
        // Bank 服务数据已内联 import，此接口保留用于未来动态加载场景
    }
    /** 加载 CHR Bank 数据 (图形资源) */
    loadChrBank(bankId, data) {
        this._compositor.registerChrBank(bankId, data);
    }
    /** 注册全部 16 个 CHR Bank 到帧合成器 (PPU 层) */
    _registerAllChrBanks() {
        const chrBanks = [
            chr_bank_00_1.default, chr_bank_01_1.default, chr_bank_02_1.default, chr_bank_03_1.default, chr_bank_04_1.default, chr_bank_05_1.default, chr_bank_06_1.default, chr_bank_07_1.default,
            chr_bank_08_1.default, chr_bank_09_1.default, chr_bank_10_1.default, chr_bank_11_1.default, chr_bank_12_1.default, chr_bank_13_1.default, chr_bank_14_1.default, chr_bank_15_1.default,
        ];
        for (let i = 0; i < chrBanks.length; i++) {
            this._compositor.registerChrBank(i, new Uint8Array(chrBanks[i]));
        }
        console.log(`[Tsubasa2] 注册 ${chrBanks.length} 个 CHR Bank`);
    }
    // ── 输入接口 ──
    /** 按下一个按键 */
    pressButton(button) {
        const mask = types_1.BUTTON[button];
        if (typeof mask === 'number')
            this._buttons |= mask;
    }
    /** 释放一个按键 */
    releaseButton(button) {
        const mask = types_1.BUTTON[button];
        if (typeof mask === 'number')
            this._buttons &= ~mask;
    }
    /** 直接设置按键位掩码 */
    setButtons(mask) {
        this._buttons = mask;
    }
    /** 读取当前按键 */
    getButtons() {
        return this._buttons;
    }
    // ── 调试接口 ──
    /** 获取调试信息快照 */
    getDebugInfo() {
        return {
            frame: this._loop._frameCount ?? 0,
            gameStateName: this._state,
            fps: this._loop.fps,
        };
    }
    /** 切换 AI 模式 */
    enableAi() {
        this._config.aiMode = true;
    }
    disableAi() {
        this._config.aiMode = false;
    }
    // ── 演示 / 录制接口 (无头可用) ──
    /** 数据中心 (Model) — 供外部读写演出状态 */
    get store() {
        return this._store;
    }
    /** Bank30 服务 — 演出链入口 (requestShowcase / entry_D67C / entry_D792 …) */
    get bank30() {
        return this._bank30;
    }
    /** Bank16 服务 — 演出脚本解释器 */
    get bank16() {
        return this._bank16;
    }
    /** 帧合成器 — 消费 DataStore → Uint32Array 帧缓冲 */
    get compositor() {
        return this._compositor;
    }
    /**
     * 无头初始化 — 等价 start() 的初始化链但跳过循环/渲染器/音频：
     *   RESET → Bank30 init → Bank02 resetEntry(0) → Boot 根场景
     * 供录制脚本 / 无头测试使用。
     */
    prepare() {
        if (this._state !== types_2.GameState.INIT) {
            console.warn('[Tsubasa2] prepare() 已执行过，忽略');
            return;
        }
        this._interrupt.reset();
        this._bank30.init();
        this._boot.init();
        this._setState(types_2.GameState.OPENING);
        console.log('[Tsubasa2] 无头初始化完成 (prepare)');
    }
    /**
     * 触发并驱动演出 (043C 演出链演示入口)。
     * @param showId 演出 ID: 0x3D 特写 / 0x46 Cyclone / 0x38 等; 省略则走完整 $D67C 链
     */
    demoShowcase(showId) {
        if (showId !== undefined) {
            this._bank30.triggerShowcase(showId);
        }
        else {
            this._bank30.entry_D67C();
        }
        this._frameIndex = 0;
    }
    /**
     * 推进一帧逻辑 + 渲染 (无头可用)，返回合成帧缓冲。
     * 与 onFrameCapture 配合实现逐帧录制。
     */
    stepFrame() {
        this._onFrame(16.67);
        this._onRender(16.67);
        this._frameIndex++;
        return this._lastFrame;
    }
    /** 合成当前一帧 (不推进逻辑) */
    captureFrame() {
        return this._compositor.compose();
    }
    // ✂️ ── 内部 ──
    // ------------------------------------------------------------
    _setState(next) {
        const prev = this._state;
        this._state = next;
        this._loop.callbacks?.onStateChange?.(prev, next);
    }
    /** 每帧逻辑更新 — 场景路由器分发 */
    _onFrame(_dt) {
        // Bank00 主循环 (帧循环核心: PPU Buffer/场景初始化链)
        if (this._bank00.isRunning) {
            this._bank00.update(this._buttons);
        }
        // 场景路由器: 按 SceneRoot 分发到对应服务
        this._boot.update(this._buttons, this._bank00.frameCount);
        // Bank26 演出执行器 tick (技能演出状态机推进)
        this._showcaseExecutor.tick();
        // 音频引擎更新 (每帧处理请求队列 + 通道状态机 + APU 输出)
        try {
            this._audioService.update();
        }
        catch (_) {
            // 音频更新失败不中断游戏逻辑
        }
        this._lastButtons = this._buttons;
    }
    /** 每帧渲染 — PPU 层合成帧缓冲, View 层呈现 (对应模拟器 PPU.endFrame → ui.writeFrame) */
    _onRender(_dt) {
        // 0. 场景 View 层: 读 service DisplayState, 写 NT/OAM (对应 NES NMI 把场景数据写到 PPU)
        const pwState = this._boot.getPasswordDisplayState();
        if (pwState)
            this._passwordView.render(pwState);
        // 0.4 演出画面 View: 球员射门特写 + Cyclone (读 Bank26 executor DisplayState)
        this._showcaseView.render(this._showcaseExecutor.getDisplayState());
        // 0.5 OAM 桥接: ram_0468 影子 OAM → DataStore.sprites (对应 NES NMI OAM DMA)
        this._oamView.emit();
        // 1. 合成: DataStore (NT/OAM/调色板) + CHR → Uint32Array 帧缓冲 (无头可用)
        const buf = this._compositor.compose();
        this._lastFrame = buf;
        // 2. 帧捕获 hook (无头录制/预览)
        if (this.onFrameCapture) {
            this.onFrameCapture(buf, types_1.NES_WIDTH, types_1.NES_HEIGHT, this._frameIndex);
        }
        // 3. 呈现: 帧缓冲 → putImageData (有 canvas 时)
        if (this._ctx) {
            this._renderer.writeFrame(buf);
        }
    }
}
exports.Tsubasa2 = Tsubasa2;
