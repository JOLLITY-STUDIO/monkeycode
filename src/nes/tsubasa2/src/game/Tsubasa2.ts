/**
 * 天使之翼2 — NES 主板入口 (纯入口, 不含游戏逻辑)
 *
 * 职责 (像 NES 主板):
 *   1. 加电 → 加载 ROM (实例化 PPU / DataStore / InterruptService / ServiceLoader)
 *   2. RESET 链 (interrupt.reset → bank30.init 硬件初始化 + 首场景)
 *   3. RAF 主循环 (≈ NMI 时序: interrupt.nmi(buttons) → bank00.mainLoop)
 *   4. PPU 渲染输出 (ppu.startFrame → endFrame → putImageData)
 *
 * 对外: new Tsubasa2(ctx, config).start(canvas)
 * 无头: new Tsubasa2(null).prepare(); stepFrame();
 *
 * 游戏逻辑 (bank00 主循环、场景路由、音频、view 渲染分发)
 * 全在各 bank service 内部, Tsubasa2 只通过 InterruptService 的两个向量接入:
 *   - interrupt.reset()  → $FFF0 RESET 向量 → bank30.init()
 *   - interrupt.nmi(b)    → $FFFA NMI 向量   → bank00.mainLoop(b)
 */
import PPU from '../core/ppu';
import { DataStore } from './data/prg/DataStore';
import { InterruptService } from './service/bank31_interrupt.service';
import { ServiceLoader } from './ServiceLoader';
import {
  BUTTON, GameState, NES_WIDTH, NES_HEIGHT,
} from '../core/types';
import type { Tsubasa2Config, DebugInfo, GameCallbacks } from '../core/types';

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

  // ── NES 主板芯片: PPU + DataStore + InterruptService ──
  private _ppu: PPU;
  private _store: DataStore;
  private _interrupt: InterruptService;
  /** 游戏内核装配器 (实例化所有 bank + 接入 interrupt 向量) */
  private _loader: ServiceLoader;

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

    // InterruptService — $FFF0/$FFFA 向量入口
    this._interrupt = new InterruptService(this._store);

    // ServiceLoader — 实例化所有 bank service + 接入 interrupt 向量
    // (对应 PRG ROM 加载: 各 bank 装入 CPU 可访问空间)
    this._loader = new ServiceLoader(this._store, this._interrupt);

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
   *   $FFF0 (bank31 向量) → bank30 $C503 (硬件初始化)
   *   → $C64E (清 RAM/NT/OAM) → $CEFE → $C400 → bank02 $A200 (首场景)
   *
   * H5: interrupt.reset() 委托 bank30.init() 执行完整链。
   *
   * @param canvas 供 RAF 使用 (微信小程序 canvas 节点 / 浏览器 canvas)
   */
  start(canvas?: any): void {
    if (this._state !== GameState.INIT) {
      console.warn('[Tsubasa2] 已启动，忽略重复 start()');
      return;
    }

    // RESET 链: interrupt.reset → bank30.init (硬件初始化 + 首场景)
    this._interrupt.reset();

    this._state = GameState.OPENING;
    this._loopStart(canvas);
  }

  pause(): void {
    this._state = GameState.PAUSED;
  }

  resume(): void {
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
  get loader(): ServiceLoader { return this._loader; }

  /**
   * 无头初始化 (跳过 RAF, 供 stepFrame 逐帧推进)。
   * 对应: 加电 → RESET 链 (不启动 RAF)。
   */
  prepare(): void {
    if (this._state !== GameState.INIT) return;
    this._interrupt.reset();
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
   * 每帧逻辑 — NMI 向量触发 (≈ 真实 NMI 时序)。
   * interrupt.nmi(buttons) → bank00.mainLoop(buttons) 推进一帧游戏逻辑。
   */
  private _onFrame(_dt: number): void {
    // $FFFA NMI 向量 → bank00 $9EED 主循环一帧 (含场景路由/NMI 渲染/帧调度)
    this._interrupt.nmi(this._buttons);

    // 音频引擎每帧更新 (NMI 之外, 由主板 RAF 同步驱动)
    this._loader.tickAudio();
  }

  /**
   * 每帧渲染 — PPU 渲染一帧。
   * ppu.startFrame → (bank00 NMI 已写 NT/OAM 到 DataStore) → ppu.endFrame → putImageData
   */
  private _onRender(_dt: number): void {
    this._ppu.startFrame();
    this._ppu.endFrame();

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
