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

import { GameLoop } from './GameLoop';
import { DataStore } from '../data/DataStore';
import { Renderer } from './engine/render/Renderer';
import { Bank00Service } from '../game/bank00_core.service';
import { Bank02Service } from '../game/bank02_scene.service';
import { Bank30Service } from '../game/bank30_init.service';
import { Bank12AudioService } from '../game/bank12_audio.service';
import { BootService } from '../game/boot';
import { DataQueryService } from '../game/bank01_data-query.service';
import { MatchEngineService } from '../game/bank26_match.service';
import { InterruptService } from '../game/bank31_interrupt.service';
import { BUTTON, NES_WIDTH, NES_HEIGHT } from './types';
import type { Tsubasa2Config, DebugInfo, GameState } from './types';
import { GameState as GS } from './types';
import { SceneRoot } from '../data/scene/index';

// CHR Bank 数据 (直接 import，无需 MMC3)
import _chr00 from '../../../rom-data/chr-bank-00';
import _chr01 from '../../../rom-data/chr-bank-01';
import _chr02 from '../../../rom-data/chr-bank-02';
import _chr03 from '../../../rom-data/chr-bank-03';
import _chr04 from '../../../rom-data/chr-bank-04';
import _chr05 from '../../../rom-data/chr-bank-05';
import _chr06 from '../../../rom-data/chr-bank-06';
import _chr07 from '../../../rom-data/chr-bank-07';
import _chr08 from '../../../rom-data/chr-bank-08';
import _chr09 from '../../../rom-data/chr-bank-09';
import _chr10 from '../../../rom-data/chr-bank-10';
import _chr11 from '../../../rom-data/chr-bank-11';
import _chr12 from '../../../rom-data/chr-bank-12';
import _chr13 from '../../../rom-data/chr-bank-13';
import _chr14 from '../../../rom-data/chr-bank-14';
import _chr15 from '../../../rom-data/chr-bank-15';

// PRG Bank 15 (音频数据) + Bank 12 (SE 音序数据)
import _prg15 from '../../../rom-data/prg-bank-15';
import _prg12 from '../../../rom-data/prg-bank-12';

export class Tsubasa2 {
  /** Canvas 2d 上下文 */
  private _ctx: CanvasRenderingContext2D | null = null;

  /** 游戏主循环 */
  private _loop: GameLoop;

  /** 当前状态 */
  private _state: GameState = GS.INIT;

  /** 配置 */
  private _config: Tsubasa2Config;

  /** 按键状态 bitmask */
  private _buttons = 0;

  // ── Bank 服务层 (MVC: Control) ──

  /** 数据中心 (Model) */
  private _store: DataStore;

  /** Bank 00: 核心系统服务 (PPU Buffer, NT, 调色板, 场景) */
  private _bank00!: Bank00Service;

  /** Bank 02: 场景控制器 (RESET 入口, 场景流转) */
  private _bank02!: Bank02Service;

  /** Bank 30: 硬件初始化 */
  private _bank30!: Bank30Service;

  /** Bank 01: 数据查询 (球员/队伍数据 + 选项屏幕) */
  private _dataQuery!: DataQueryService;

  /** Bank 26: 比赛引擎 */
  private _matchEngine!: MatchEngineService;

  /** Bank 31: 中断/向量服务 */
  private _interrupt!: InterruptService;

  /** 场景路由器 (BOOT/TITLE/MEETING/MATCH/RESULT) */
  private _boot!: BootService;

  /** 渲染器 (View) — 消费 NT+OAM 真实绘制 CHR tile */
  private _renderer!: Renderer;

  /** Bank 12: 音频引擎 (PAPU + PapuOutput，含 BGM/SFX 数据) */
  private _audioService!: Bank12AudioService;

  /** 上一次按键值 (用于上升沿检测) */
  private _lastButtons = 0;

  // ✂️ ── 构造与生命周期 ──
  // ------------------------------------------------------------

  constructor(ctx?: CanvasRenderingContext2D | null, config?: Tsubasa2Config) {
    this._ctx = ctx ?? null;
    this._config = config ?? {};
    this._loop = new GameLoop();
    this._store = new DataStore();

    // 构造 Bank 服务链 — 依赖注入，不模拟 MMC3
    this._bank00 = new Bank00Service(this._store);
    this._bank02 = new Bank02Service(this._store, this._bank00);
    this._bank30 = new Bank30Service(this._store, this._bank00, this._bank02);
    this._dataQuery = new DataQueryService(this._store);
    this._matchEngine = new MatchEngineService(this._store);
    this._interrupt = new InterruptService(this._store);

    // 音频链路: Bank12AudioService (内部使用 PapuOutput + PAPU 完整模拟 NES APU)
    this._audioService = new Bank12AudioService(this._store);

    // 场景路由器 — 持有 DataQuery/MatchEngine 引用以委派场景
    this._boot = new BootService(this._store, this._dataQuery, this._matchEngine);

    // 渲染器 — 消费 DataStore NT/OAM + CHR 数据
    this._renderer = new Renderer(this._store);

    // 注册全部 16 个 CHR Bank (直接从 rom-data import)
    this._registerAllChrBanks();

    this._loop.onFrame = this._onFrame.bind(this);
    this._loop.onRender = this._onRender.bind(this);
  }

  /** 启动游戏（需要传 canvas 节点供 requestAnimationFrame 使用） */
  start(canvas?: any): void {
    if (this._state !== GS.INIT) {
      console.warn('[Tsubasa2] 已启动，忽略重复 start()');
      return;
    }

    // 渲染器挂载主 Canvas Context
    if (this._ctx) {
      this._renderer.setupCanvas(this._ctx);
    }

    // 注入 Bank15 BGM 数据 + Bank12 SE 数据 (替代 MMC3 R7/R6 映射)
    this._audioService.setBankData({
      bank12: [..._prg12],
      bank15: [..._prg15],
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

    this._setState(GS.OPENING);
    this._loop.start(canvas);
  }

  /** 暂停 */
  pause(): void {
    this._loop.pause();
  }

  /** 恢复 */
  resume(): void {
    this._loop.resume();
  }

  /** 彻底停止并销毁循环 */
  stop(): void {
    this._loop.stop();
  }

  // ── 资源加载 ──

  /** 加载 PRG Bank 数据 (游戏逻辑) — 已通过 rom-data import，保留用于运行时注入场景 */
  loadPrgBank(_bankId: number, _data: Uint8Array): void {
    // Bank 服务数据已内联 import，此接口保留用于未来动态加载场景
  }

  /** 加载 CHR Bank 数据 (图形资源) */
  loadChrBank(bankId: number, data: Uint8Array): void {
    this._renderer.registerChrBank(bankId, data);
  }

  /** 注册全部 16 个 CHR Bank 到渲染器 */
  private _registerAllChrBanks(): void {
    const chrBanks: Array<readonly number[]> = [
      _chr00, _chr01, _chr02, _chr03, _chr04, _chr05, _chr06, _chr07,
      _chr08, _chr09, _chr10, _chr11, _chr12, _chr13, _chr14, _chr15,
    ];
    for (let i = 0; i < chrBanks.length; i++) {
      this._renderer.registerChrBank(i, new Uint8Array(chrBanks[i]));
    }
    console.log(`[Tsubasa2] 注册 ${chrBanks.length} 个 CHR Bank`);
  }

  // ── 输入接口 ──

  /** 按下一个按键 */
  pressButton(button: keyof typeof BUTTON): void {
    const mask = BUTTON[button] as number;
    if (typeof mask === 'number') this._buttons |= mask;
  }

  /** 释放一个按键 */
  releaseButton(button: keyof typeof BUTTON): void {
    const mask = BUTTON[button] as number;
    if (typeof mask === 'number') this._buttons &= ~mask;
  }

  /** 直接设置按键位掩码 */
  setButtons(mask: number): void {
    this._buttons = mask;
  }

  /** 读取当前按键 */
  getButtons(): number {
    return this._buttons;
  }

  // ── 调试接口 ──

  /** 获取调试信息快照 */
  getDebugInfo(): DebugInfo {
    return {
      frame: (this._loop as any)._frameCount ?? 0,
      gameStateName: this._state,
      fps: this._loop.fps,
    };
  }

  /** 切换 AI 模式 */
  enableAi(): void {
    this._config.aiMode = true;
  }

  disableAi(): void {
    this._config.aiMode = false;
  }

  // ✂️ ── 内部 ──
  // ------------------------------------------------------------

  private _setState(next: GameState): void {
    const prev = this._state;
    this._state = next;
    this._loop.callbacks?.onStateChange?.(prev, next);
  }

  /** 每帧逻辑更新 — 场景路由器分发 */
  private _onFrame(_dt: number): void {
    // Bank00 主循环 (帧循环核心: PPU Buffer/场景初始化链)
    if (this._bank00.isRunning) {
      this._bank00.update(this._buttons);
    }

    // 场景路由器: 按 SceneRoot 分发到对应服务
    this._boot.update(this._buttons, this._bank00.frameCount);

    // 音频引擎更新 (每帧处理请求队列 + 通道状态机 + APU 输出)
    try {
      this._audioService.update();
    } catch (_) {
      // 音频更新失败不中断游戏逻辑
    }

    this._lastButtons = this._buttons;
  }

  /** 每帧渲染 — 全部走 View 层 */
  private _onRender(_dt: number): void {
    if (!this._ctx) return;

    const root = this._store.read('boot_root') as SceneRoot;

    // BOOT/TITLE 阶段: 开场控制器提供显示状态 → Renderer.renderOpening (临时过渡)
    // 真实 NT 数据翻译完成后 (T2/T3) 统一走 renderer.render()
    if (root === SceneRoot.BOOT || root === SceneRoot.TITLE) {
      const ds = this._boot.getOpeningDisplayState();
      if (ds) {
        this._renderer.renderOpening(this._ctx, ds);
        return;
      }
    }

    // 其他场景: 使用真实 Renderer 绘制 NT + OAM → CHR tile
    this._renderer.render(this._ctx);
  }
}
