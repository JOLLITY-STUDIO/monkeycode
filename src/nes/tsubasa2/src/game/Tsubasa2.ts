/**
 * 天使之翼2 — NES 主板入口 (纯入口, 不含游戏逻辑)
 *
 * 职责 (像 NES 主板):
 *   1. 加电 → 加载 ROM (实例化各 bank service + 注入 CHR/PRG 数据)
 *   2. 运行 CPU 主循环 (RAF → bank00.mainLoop(buttons))
 *   3. PPU 渲染输出 (ppu.startFrame → ppu.endFrame → putImageData)
 *
 * 对外: new Tsubasa2(ctx, config).start(canvas)
 * 无头: new Tsubasa2(null).prepare(); stepFrame();
 *
 * 游戏逻辑 (bank00 主循环、场景路由、音频、view 渲染分发)
 * 由各 bank service 自己处理, Tsubasa2 只做:
 *   - PPU / DataStore 初始化
 *   - CHR / PRG bank 注入
 *   - RAF 循环 + PPU 渲染输出
 *   - 每帧调用 bank00.mainLoop(buttons) (真实 ROM $9EED 主循环在 bank00)
 *
 * 注: bank00 正在由另一个 agent 重新翻译, 可能还没有 mainLoop(buttons) 方法。
 *     当前用可选调用兜底, 待 bank00 完成后切换。
 */

import PPU from '../core/ppu';
import { DataStore } from './data/prg/DataStore';
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
import {
  BUTTON, GameState, NES_WIDTH, NES_HEIGHT,
  type Tsubasa2Config, type DebugInfo, type GameCallbacks,
} from '../core/types';

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

// ════════════════════════════════════════════════════════════════
// Tsubasa2 — NES 主板入口
// ════════════════════════════════════════════════════════════════

export class Tsubasa2 {
  // ── Canvas / 配置 ──
  private _ctx: CanvasRenderingContext2D | null = null;
  private _config: Tsubasa2Config = {};
  private _state: GameState = GameState.INIT;
  private _buttons = 0;
  private _frameIndex = 0;

  // ── RAF 循环 ──
  private _rafId: number | null = null;
  private _lastTime = 0;
  private _fpsFrameCount = 0;
  private _fpsLastTime = 0;
  private _fps = 0;

  // ── 回调 ──
  private _callbacks: GameCallbacks = {};

  // ── 核心: PPU + DataStore (NES 主板芯片) ──
  private _ppu: PPU;
  private _store: DataStore;

  // ── Bank 服务 (构造函数依赖注入, 保留实例化) ──
  // 注: 场景路由/view 渲染分发已迁移到 bank00 主循环, Tsubasa2 不再直接调用。
  private _bank00: Bank00Service;
  private _bank02: Bank02Service;
  private _bank30: Bank30Service;
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

  // ── 渲染缓冲 ──
  private _imageData: ImageData | null = null;

  // ══════════════════════════════════════════════════════════════
  // 构造函数 — 加电 + 加载 ROM
  // ══════════════════════════════════════════════════════════════

  constructor(ctx?: CanvasRenderingContext2D | null, config?: Tsubasa2Config) {
    this._ctx = ctx ?? null;
    this._config = config ?? {};
    if (this._config.callbacks) this._callbacks = this._config.callbacks;

    // DataStore (内存/KV 数据中心)
    this._store = new DataStore();

    // PPU — NES 主板 PPU 芯片
    this._ppu = new PPU({
      ui: { writeFrame: () => {} },
      ppu: null,
      mmap: null,
      rom: null,
      cpu: {
        mem: new Uint8Array(0x10000),
        nmiRaised: false,
        nmiRaisedAtCycle: 0,
        instrBusCycles: 0,
        nmiDotsRemainingInStep: 0,
      },
    } as any);

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

    // 注册 CHR Banks 到 PPU (pattern table)
    this._registerAllChrBanks();
  }

  // ══════════════════════════════════════════════════════════════
  // 生命周期
  // ══════════════════════════════════════════════════════════════

  /**
   * 启动游戏 (加电 → RESET 链 → RAF 主循环)。
   *
   * RESET 链 (真实 ROM):
   *   RESET $FFF0 → $C503 → $C64E (硬件初始化) → $CEFE (MMC3+PPU 重置)
   *   → $C400 (分发器) → $A200 → bank02 $A21B → bank00 $9EED 主循环
   *
   * H5: 由 bank00 + interrupt + dispatch 代替, Tsubasa2 只调入口。
   *
   * @param canvas 供 RAF 使用 (微信小程序 canvas 节点 / 浏览器 canvas)
   */
  start(canvas?: any): void {
    if (this._state !== GameState.INIT) {
      console.warn('[Tsubasa2] 已启动，忽略重复 start()');
      return;
    }

    // RESET 链: 中断服务复位 → bank00 主循环启动
    this._doReset();

    this._state = GameState.OPENING;
    this._loopStart(canvas);
  }

  pause(): void {
    // TODO
    this._state = GameState.PAUSED;
  }

  resume(): void {
    // TODO
    if (this._state === GameState.PAUSED) {
      this._state = GameState.OPENING;
    }
  }

  stop(): void {
    this._loopStop();
    this._state = GameState.INIT;
  }

  // ══════════════════════════════════════════════════════════════
  // 输入接口
  // ══════════════════════════════════════════════════════════════

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

  // ══════════════════════════════════════════════════════════════
  // 调试接口
  // ══════════════════════════════════════════════════════════════

  getDebugInfo(): DebugInfo {
    return { frame: this._frameIndex, gameStateName: this._state, fps: this._fps };
  }

  enableAi(): void { this._config.aiMode = true; }
  disableAi(): void { this._config.aiMode = false; }

  // ══════════════════════════════════════════════════════════════
  // 无头接口 (录制/测试)
  // ══════════════════════════════════════════════════════════════

  get store(): DataStore { return this._store; }
  get ppu(): PPU { return this._ppu; }
  get levelup(): LevelUpService { return this._levelup; }
  get hud(): Bank24HudService { return this._hud; }

  /**
   * 无头初始化 (跳过 RAF, 供 stepFrame 逐帧推进)。
   * 对应: 加电 → RESET 链 (不启动 RAF)。
   */
  prepare(): void {
    if (this._state !== GameState.INIT) return;

    // RESET 链: 与 start() 相同的初始化但不启动 RAF
    this._doReset();

    this._state = GameState.OPENING;
  }

  /**
   * 无头推进一帧 (逻辑 + 渲染), 返回 PPU 帧缓冲。
   * 对应: CPU 主循环一帧 → PPU 渲染一帧。
   */
  stepFrame(): Uint32Array {
    this._onFrame(16.67);
    this._onRender(16.67);
    this._frameIndex++;
    return (this._ppu as any).buffer as Uint32Array;
  }

  captureFrame(): Uint32Array { return (this._ppu as any).buffer as Uint32Array; }

  // ══════════════════════════════════════════════════════════════
  // 内部: RESET 链
  // ══════════════════════════════════════════════════════════════

  /**
   * 执行 RESET 链 (真实 ROM: $C64E → $CEFE → $C400 → $A200 → $9EED)。
   * H5: 中断服务复位 + bank00 主循环启动 (首帧 buttons=0)。
   */
  private _doReset(): void {
    // 中断服务复位 (对应 $C64E 中 SEI/CLI + NMI 初始化)
    this._interrupt.reset();

    // bank00 主循环启动 (对应 $9EED: LDX #$02 → JSR $C4B9 → JMP $A203)
    // 首帧 buttons=0 (无输入), bank00.mainLoop 设 _running=true + 推进首帧
    this._bank00.mainLoop(0);
  }

  // ══════════════════════════════════════════════════════════════
  // 内部: RAF 循环
  // ══════════════════════════════════════════════════════════════

  private _loopStart(canvas?: any): void {
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
      const caf = (id: number) => typeof cancelAnimationFrame !== 'undefined' && cancelAnimationFrame(id);
      try { caf(this._rafId); } catch (_) { /* */ }
      this._rafId = null;
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 内部: 每帧逻辑 + 渲染
  // ══════════════════════════════════════════════════════════════

  /**
   * 每帧逻辑 — CPU 主循环一帧。
   * 真实 ROM: $9EED 主循环在 bank00, 每帧推进游戏逻辑。
   * Tsubasa2 只调用 bank00.mainLoop(buttons) 唯一入口。
   */
  private _onFrame(_dt: number): void {
    // bank00 主循环 (唯一逻辑入口, 含场景路由/NMI 写 NT/OAM/帧调度)
    this._bank00.mainLoop(this._buttons);

    // 音频引擎更新 (每帧处理请求队列 + 通道状态机 + APU 输出)
    try { this._audio.update(); } catch (_) { /* */ }
  }

  /**
   * 每帧渲染 — PPU 渲染一帧。
   * ppu.startFrame → (bank00/NMI 写 NT/OAM) → ppu.endFrame → putImageData
   */
  private _onRender(_dt: number): void {
    // 1. PPU startFrame (清 per-scanline sprite 评估数据, 设背景色)
    this._ppu.startFrame();

    // 2. PPU endFrame (渲染所有 scanline + 输出 buffer)
    //    注: bank00 主循环 (_onFrame) 中已通过 DataStore 写 NT/OAM/调色板,
    //        PPU endFrame 读取这些数据渲染。
    //    TODO: bank00 agent 完成后, NMI 写 NT/OAM 逻辑在 bank00.mainLoop 中完成,
    //          此处只需 startFrame/endFrame。当前 bank00.update 中的渲染委托
    //          Bank00RenderView 已写 DataStore, PPU 需从 DataStore 同步。
    this._ppu.endFrame();

    // 3. 呈现: ppu.buffer (Uint32 索引色) → putImageData
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
      data[i * 4 + 0] = c & 0xFF;
      data[i * 4 + 1] = (c >> 8) & 0xFF;
      data[i * 4 + 2] = (c >> 16) & 0xFF;
      data[i * 4 + 3] = 0xFF;
    }
    this._ctx.putImageData(this._imageData, 0, 0);
  }

  // ══════════════════════════════════════════════════════════════
  // CHR Bank 注册 (PPU pattern table)
  // ══════════════════════════════════════════════════════════════

  private _registerAllChrBanks(): void {
    const banks = [
      chrBank00, chrBank01, chrBank02, chrBank03, chrBank04, chrBank05, chrBank06, chrBank07,
      chrBank08, chrBank09, chrBank10, chrBank11, chrBank12, chrBank13, chrBank14, chrBank15,
    ];
    // TODO: 将 CHR Bank 数据写入 PPU 的 pattern table (chrMem / ptTile)
    console.log(`[Tsubasa2] 注册 ${banks.length} 个 CHR Bank (待对接 PPU pattern table)`);
  }
}
