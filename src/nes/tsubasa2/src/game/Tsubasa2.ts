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
import PPU from '../core/ppu';
import { DataStore } from './data/prg/DataStore';
import { DispatchService } from './dispatch.service';
import { Bank00Service } from './service/bank00/bank00_core.service';
import { Bank02Service } from './service/bank02_scene.service';
import { Bank30Service } from './service/bank30_init.service';
import { Bank12AudioService } from './service/bank12_audio.service';
import { Bank16Service } from './service/bank16_skills.service';
import { Bank18Service } from './service/bank18_story.service';
import { Bank19Service } from './service/bank19_auxiliary.service';
import { Bank20Service } from './service/bank20_match-aux.service';
import { Bank26ShowcaseExecutor } from './service/bank26_showcase-executor.service';
import { MatchEngineService } from './service/bank26_match.service';
import { DataQueryService } from './service/bank01_data-query.service';
import { Bank28MatchService } from './service/bank28_match.service';
import { InterruptService } from './service/bank31_interrupt.service';
import { LevelUpService } from './service/levelup.service';
import { Bank24HudService } from './service/bank24_hud.service';
import { Bank29RosterService } from './service/bank29_roster.service';
import { PasswordView } from './view/PasswordView';
import { MeetingView } from './view/MeetingView';
import { LevelUpView } from './view/LevelUpView';
import { OamView } from './view/OamView';
import { ShowcaseView } from './view/ShowcaseView';
import { BUTTON, GameState, NES_WIDTH, NES_HEIGHT, type Tsubasa2Config, type DebugInfo, type GameCallbacks } from '../core/types';

// CHR Bank 数据 (game 层, 直接 import)
import chrBank00 from './data/chr/chr-bank-00';
import chrBank01 from './data/chr/chr-bank-01';
import chrBank02 from './data/chr/chr-bank-02';
import chrBank03 from './data/chr/chr-bank-03';
import chrBank04 from './data/chr/chr-bank-04';
import chrBank05 from './data/chr/chr-bank-05';
import chrBank06 from './data/chr/chr-bank-06';
import chrBank07 from './data/chr/chr-bank-07';
import chrBank08 from './data/chr/chr-bank-08';
import chrBank09 from './data/chr/chr-bank-09';
import chrBank10 from './data/chr/chr-bank-10';
import chrBank11 from './data/chr/chr-bank-11';
import chrBank12 from './data/chr/chr-bank-12';
import chrBank13 from './data/chr/chr-bank-13';
import chrBank14 from './data/chr/chr-bank-14';
import chrBank15 from './data/chr/chr-bank-15';

/** NES 帧 RGBA 字节缓冲 (256*240*4, 供 putImageData) */
const FRAME_RGBA_SIZE = NES_WIDTH * NES_HEIGHT * 4;

export class Tsubasa2 {
  private _ctx: CanvasRenderingContext2D | null = null;
  private _config: Tsubasa2Config = {};
  private _state: GameState = GameState.INIT;
  private _buttons = 0;
  private _frameIndex = 0;

  /** RAF 循环 ID (null=未运行) */
  private _rafId: number | null = null;
  /** 上一帧时间戳 (ms, 算 dt + fps) */
  private _lastTime = 0;
  /** FPS 统计 (帧计数/时间戳) */
  private _fpsFrameCount = 0;
  private _fpsLastTime = 0;
  private _fps = 0;

  /** 回调 */
  private _callbacks: GameCallbacks = {};

  /** 核心: PPU (替代 FrameCompositor) */
  private _ppu: PPU;
  /** DataStore (内存/KV 数据中心) */
  private _store: DataStore;

  /** Bank 服务 */
  private _bank00: Bank00Service;
  private _bank02: Bank02Service;
  private _bank30: Bank30Service;
  private _dispatch: DispatchService;
  private _audio: Bank12AudioService;
  private _bank16: Bank16Service;
  private _bank18: Bank18Service;
  private _bank19: Bank19Service;
  private _bank20: Bank20Service;
  private _dataQuery: DataQueryService;
  private _matchEngine: MatchEngineService;
  private _bank28: Bank28MatchService;
  private _interrupt: InterruptService;
  private _levelup: LevelUpService;
  private _hud: Bank24HudService;
  private _bank29: Bank29RosterService;
  private _showcaseExec: Bank26ShowcaseExecutor;

  /** Views (写 NT/OAM) */
  private _passwordView: PasswordView;
  private _meetingView: MeetingView;
  private _levelupView: LevelUpView;
  private _oamView: OamView;
  private _showcaseView: ShowcaseView;

  /** RGBA 帧缓冲 (putImageData 用, PPU.buffer 是 Uint32 索引色, 需转 RGBA) */
  private _rgbaBuf: Uint8ClampedArray = new Uint8ClampedArray(FRAME_RGBA_SIZE);
  /** ImageData 缓存 (避免每帧重建) */
  private _imageData: ImageData | null = null;

  constructor(ctx?: CanvasRenderingContext2D | null, config?: Tsubasa2Config) {
    this._ctx = ctx ?? null;
    this._config = config ?? {};
    if (this._config.callbacks) this._callbacks = this._config.callbacks;

    // DataStore
    this._store = new DataStore();

    // PPU (替代 FrameCompositor) — 传 nes 对象给 PPU (含 ui.writeFrame)
    // PPU 在 endFrame() 调用 nes.ui.writeFrame(buffer); 此处用 noop, 由本类接管渲染
    this._ppu = new PPU({ ui: { writeFrame: () => {} }, ppu: null, mmap: null, rom: null } as any);

    // Bank 服务链 (依赖注入, 不模拟 MMC3)
    this._bank00 = new Bank00Service(this._store);
    this._bank02 = new Bank02Service(this._store, this._bank00);
    this._bank16 = new Bank16Service(this._store);
    this._bank30 = new Bank30Service(this._store, this._bank00, this._bank02, this._bank16);
    this._dataQuery = new DataQueryService(this._store);
    this._matchEngine = new MatchEngineService(this._store);
    this._interrupt = new InterruptService(this._store);
    this._audio = new Bank12AudioService(this._store);
    this._levelup = new LevelUpService(this._store);
    this._hud = new Bank24HudService(this._store);
    this._bank19 = new Bank19Service(this._store);
    this._bank18 = new Bank18Service(this._store, this._bank19);
    this._bank20 = new Bank20Service(this._store);
    this._bank28 = new Bank28MatchService(this._store);
    this._bank29 = new Bank29RosterService(this._store);
    this._showcaseExec = new Bank26ShowcaseExecutor(this._store);

    // DispatchService (真实 RESET 链, 替代已废弃的 boot.ts)
    this._dispatch = new DispatchService(this._store, this._bank00, this._bank02);

    // Views
    this._passwordView = new PasswordView(this._store);
    this._meetingView = new MeetingView(this._store);
    this._levelupView = new LevelUpView(this._store);
    this._oamView = new OamView(this._store);
    this._showcaseView = new ShowcaseView(this._store);

    // 注册 CHR Banks 到 PPU (pattern table)
    this._registerAllChrBanks();
  }

  // ══════════════════════════════════════════
  // 生命周期
  // ══════════════════════════════════════════

  /** 启动游戏 (需传 canvas 节点供 RAF) */
  start(canvas?: any): void {
    if (this._state !== GameState.INIT) {
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
    try { this._audio.requestPlay(0x31); } catch (_) { /* */ }

    this._state = GameState.OPENING;
    this._loopStart(canvas);
  }

  pause(): void {
    // RAF 暂停 (置标志, 不取消 RAF, 便于 resume)
    this._state = GameState.PAUSED;
  }

  resume(): void {
    if (this._state === GameState.PAUSED) {
      this._state = GameState.MATCH; // FIXME: 恢复到暂停前状态, 简化为 MATCH
    }
  }

  stop(): void {
    this._loopStop();
    this._state = GameState.INIT;
  }

  // ══════════════════════════════════════════
  // 输入接口
  // ══════════════════════════════════════════

  pressButton(button: keyof typeof BUTTON): void {
    const mask = BUTTON[button];
    if (typeof mask === 'number') this._buttons |= mask;
  }

  releaseButton(button: keyof typeof BUTTON): void {
    const mask = BUTTON[button];
    if (typeof mask === 'number') this._buttons &= ~mask;
  }

  setButtons(mask: number): void { this._buttons = mask; }
  getButtons(): number { return this._buttons; }

  // ══════════════════════════════════════════
  // 调试接口
  // ══════════════════════════════════════════

  getDebugInfo(): DebugInfo {
    return { frame: this._frameIndex, gameStateName: this._state, fps: this._fps };
  }

  enableAi(): void { this._config.aiMode = true; }
  disableAi(): void { this._config.aiMode = false; }

  // ══════════════════════════════════════════
  // 无头接口 (录制/测试)
  // ══════════════════════════════════════════

  get store(): DataStore { return this._store; }
  get ppu(): PPU { return this._ppu; }
  get levelup(): LevelUpService { return this._levelup; }
  get hud(): Bank24HudService { return this._hud; }

  /** 无头初始化 (跳过 RAF, 供 stepFrame 逐帧推进) */
  prepare(): void {
    if (this._state !== GameState.INIT) return;
    this._interrupt.reset();
    this._dispatch.init(0);
    this._state = GameState.OPENING;
    console.log('[Tsubasa2] 无头初始化完成 (prepare)');
  }

  /** 无头推进一帧 (逻辑+渲染), 返回 PPU 帧缓冲 */
  stepFrame(): Uint32Array {
    this._onFrame(16.67);
    this._onRender(16.67);
    this._frameIndex++;
    return (this._ppu as any).buffer as Uint32Array;
  }

  captureFrame(): Uint32Array { return (this._ppu as any).buffer as Uint32Array; }

  // ══════════════════════════════════════════
  // 内部: RAF 循环 (替代 GameLoop)
  // ══════════════════════════════════════════

  private _loopStart(canvas?: any): void {
    // 微信小程序用 canvas.requestAnimationFrame, 浏览器用 window.requestAnimationFrame
    const raf = (cb: FrameRequestCallback) => {
      if (canvas && typeof canvas.requestAnimationFrame === 'function') {
        return canvas.requestAnimationFrame(cb) as number;
      }
      return (typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : null)?.(cb) ?? -1;
    };
    const tick = (time: number) => {
      if (this._state === GameState.PAUSED || this._state === GameState.INIT) return;
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

  private _loopStop(): void {
    if (this._rafId !== null) {
      // 微信小程序 canvas.cancelAnimationFrame / 浏览器 cancelAnimationFrame
      const caf = (id: number) => typeof cancelAnimationFrame !== 'undefined' && cancelAnimationFrame(id);
      try { caf(this._rafId); } catch (_) { /* */ }
      this._rafId = null;
    }
  }

  // ══════════════════════════════════════════
  // 内部: 每帧逻辑 + 渲染
  // ══════════════════════════════════════════

  private _onFrame(_dt: number): void {
    // Bank00 主循环 (帧循环核心: PPU Buffer/场景初始化链)
    if (this._bank00.isRunning) {
      this._bank00.update(this._buttons);
    }
    // DispatchService 帧更新 (委托 bank02 resetEntry 后的 mainLoop)
    this._dispatch.update(this._buttons, this._bank00.frameCount);
    // Bank26 演出执行器 tick (技能演出状态机推进)
    this._showcaseExec.tick();
    // 音频引擎更新 (每帧处理请求队列 + 通道状态机 + APU 输出)
    try { this._audio.update(); } catch (_) { /* */ }
  }

  private _onRender(_dt: number): void {
    // 1. PPU startFrame (清 per-scanline sprite 评估数据, 设背景色)
    this._ppu.startFrame();

    // 2. 场景 View 层: 读 service DisplayState, 写 NT/OAM (对应 NES NMI 把场景数据写到 PPU)
    this._oamView.emit();

    // 3. PPU endFrame (渲染所有 scanline + 输出 buffer)
    this._ppu.endFrame();

    // 4. 呈现: ppu.buffer (Uint32 索引色) → putImageData
    if (this._ctx) {
      this._writeFrameToCtx((this._ppu as any).buffer as Uint32Array);
    }
  }

  /** PPU Uint32 帧缓冲 → canvas putImageData */
  private _writeFrameToCtx(buf: Uint32Array): void {
    if (!this._ctx) return;
    if (!this._imageData) {
      this._imageData = this._ctx.createImageData(NES_WIDTH, NES_HEIGHT);
    }
    const data = this._imageData.data;
    for (let i = 0; i < buf.length; i++) {
      const c = buf[i];
      // Uint32 ABGR (PPU 内部格式) → RGBA
      data[i * 4 + 0] = c & 0xFF;         // R
      data[i * 4 + 1] = (c >> 8) & 0xFF;  // G
      data[i * 4 + 2] = (c >> 16) & 0xFF; // B
      data[i * 4 + 3] = 0xFF;             // A
    }
    this._ctx.putImageData(this._imageData, 0, 0);
  }

  // ══════════════════════════════════════════
  // CHR Bank 注册 (PPU pattern table)
  // ══════════════════════════════════════════

  private _registerAllChrBanks(): void {
    const banks = [
      chrBank00, chrBank01, chrBank02, chrBank03, chrBank04, chrBank05, chrBank06, chrBank07,
      chrBank08, chrBank09, chrBank10, chrBank11, chrBank12, chrBank13, chrBank14, chrBank15,
    ];
    // PPU pattern table: tile.render(buffer,...) 用 chrMem
    // 每个 CHR Bank 8KB = 512 tiles, 前256是BG pattern, 后256是SPR pattern
    // TODO: 将 CHR Bank 数据写入 PPU 的 pattern table (ptTile)
    //       PPU 的 chrMem / ptTile 需要对接, 当前先占位
    console.log(`[Tsubasa2] 注册 ${banks.length} 个 CHR Bank (待对接 PPU pattern table)`);
  }
}
