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
import { DataStore } from '../game/data/DataStore';
import { Renderer } from './engine/render/Renderer';
import { FrameCompositor } from './engine/render/FrameCompositor';
import { PasswordView } from '../game/view/PasswordView';
import { MeetingView } from '../game/view/MeetingView';
import { LevelUpView } from '../game/view/LevelUpView';
import { OamView } from '../game/view/OamView';
import { ShowcaseView } from '../game/view/ShowcaseView';
import { Bank26ShowcaseExecutor } from '../game/service/bank26_showcase-executor.service';
import { Bank00Service } from '../game/service/bank00/bank00_core.service';
import { Bank02Service } from '../game/service/bank02_scene.service';
import { Bank30Service } from '../game/service/bank30_init.service';
import { Bank16Service } from '../game/service/bank16_skills.service';
import { Bank12AudioService } from '../game/service/bank12_audio.service';
import { BootService } from '../game/boot';
import { DataQueryService } from '../game/service/bank01_data-query.service';
import { MatchEngineService } from '../game/service/bank26_match.service';
import { Bank19Service } from '../game/service/bank19_auxiliary.service';
import { Bank18Service } from '../game/service/bank18_story.service';
import { Bank20Service } from '../game/service/bank20_match-aux.service';
import { InterruptService } from '../game/service/bank31_interrupt.service';
import { LevelUpService } from '../game/service/levelup.service';
import { BUTTON, NES_WIDTH, NES_HEIGHT } from './types';
import type { Tsubasa2Config, DebugInfo, GameState } from './types';
import { GameState as GS } from './types';

// CHR Bank 数据 (直接 import data 本地副本，无需 MMC3)
import _chr00 from '../game/data/ppu/tile/chr/chr-bank-00';
import _chr01 from '../game/data/ppu/tile/chr/chr-bank-01';
import _chr02 from '../game/data/ppu/tile/chr/chr-bank-02';
import _chr03 from '../game/data/ppu/tile/chr/chr-bank-03';
import _chr04 from '../game/data/ppu/tile/chr/chr-bank-04';
import _chr05 from '../game/data/ppu/tile/chr/chr-bank-05';
import _chr06 from '../game/data/ppu/tile/chr/chr-bank-06';
import _chr07 from '../game/data/ppu/tile/chr/chr-bank-07';
import _chr08 from '../game/data/ppu/tile/chr/chr-bank-08';
import _chr09 from '../game/data/ppu/tile/chr/chr-bank-09';
import _chr10 from '../game/data/ppu/tile/chr/chr-bank-10';
import _chr11 from '../game/data/ppu/tile/chr/chr-bank-11';
import _chr12 from '../game/data/ppu/tile/chr/chr-bank-12';
import _chr13 from '../game/data/ppu/tile/chr/chr-bank-13';
import _chr14 from '../game/data/ppu/tile/chr/chr-bank-14';
import _chr15 from '../game/data/ppu/tile/chr/chr-bank-15';

// PRG Bank 15 (音频数据) + Bank 12 (SE 音序数据) — data 本地副本
import _prg15 from '../game/data/prg-bank-15';
import _prg12 from '../game/data/prg-bank-12';

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

  /** Bank 16: 特殊技能/演出脚本解释器 (被 Bank30 演出链消费) */
  private _bank16!: Bank16Service;

  /** Bank 01: 数据查询 (球员/队伍数据 + 选项屏幕) */
  private _dataQuery!: DataQueryService;

  /** Bank 26: 比赛引擎 */
  private _matchEngine!: MatchEngineService;

  /** Bank 31: 中断/向量服务 */
  private _interrupt!: InterruptService;

  /** Bank 19: 剧情场景精灵/文字渲染库 (STORY 场景) */
  private _bank19!: Bank19Service;

  /** Bank 18: 剧情场景主控制器 (STORY 调度层) */
  private _bank18!: Bank18Service;

  /** Bank 20: 比赛辅助逻辑 (MATCH 场景辅助驱动) */
  private _bank20!: Bank20Service;

  /** 场景路由器 (BOOT/TITLE/MEETING/MATCH/RESULT) */
  private _boot!: BootService;

  /** 帧合成器 (PPU 层) — 消费 DataStore NT/OAM/调色板 + CHR → 帧缓冲 */
  private _compositor!: FrameCompositor;

  /** 渲染器 (View) — 对应模拟器 ui.writeFrame: 仅将帧缓冲 putImageData 到画布 */
  private _renderer!: Renderer;

  /** 场景 View 层 (渲染数据写入 NT/OAM) */
  private _passwordView!: PasswordView;

  /** MEETING 赛前会议 View (主菜单/子菜单/二级/三级 渲染) */
  private _meetingView!: MeetingView;

  /** LEVELUP 升级界面 View (选手经验/等级显示) */
  private _levelupView!: LevelUpView;

  /** OAM 桥接 View (ram_0468 影子 OAM → DataStore.sprites) */
  private _oamView!: OamView;

  /** Bank26 演出执行器 (技能演出状态机) */
  private _showcaseExecutor!: Bank26ShowcaseExecutor;

  /** 演出画面 View (球员射门特写 + Cyclone 特效) */
  private _showcaseView!: ShowcaseView;

  /** Bank 12: 音频引擎 (PAPU + PapuOutput，含 BGM/SFX 数据) */
  private _audioService!: Bank12AudioService;

  /** 球员升级服务 (经验值/等级/Guts RAM 读写) */
  private _levelup!: LevelUpService;

  /** 上一次按键值 (用于上升沿检测) */
  private _lastButtons = 0;

  /** 帧索引 (无头驱动/录制用) */
  private _frameIndex = 0;

  /** 最近一次合成帧 (无头 capture 缓存) */
  private _lastFrame: Uint32Array | null = null;

  /** 帧捕获 hook — 每帧渲染后回调 (无头录制/预览用) */
  onFrameCapture: ((buf: Uint32Array, w: number, h: number, index: number) => void) | null = null;

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
    this._bank16 = new Bank16Service(this._store);
    this._bank30 = new Bank30Service(this._store, this._bank00, this._bank02, this._bank16);
    this._dataQuery = new DataQueryService(this._store);
    this._matchEngine = new MatchEngineService(this._store);
    this._interrupt = new InterruptService(this._store);

    // 音频链路: Bank12AudioService (内部使用 PapuOutput + PAPU 完整模拟 NES APU)
    this._audioService = new Bank12AudioService(this._store);

    // 球员升级服务 (经验值/等级/Guts RAM 读写)
    this._levelup = new LevelUpService(this._store);

    // 场景路由器 — 持有 DataQuery/MatchEngine/Bank18/Bank19/Bank20/LevelUp 引用以委派场景
    this._bank19 = new Bank19Service(this._store);
    this._bank18 = new Bank18Service(this._store, this._bank19);
    this._bank20 = new Bank20Service(this._store);
    this._boot = new BootService(this._store, this._dataQuery, this._matchEngine, this._bank19, this._bank20, this._bank18, this._bank02, this._levelup);

    // 帧合成器 (PPU 层) — DataStore → 帧缓冲
    this._compositor = new FrameCompositor(this._store);

    // 渲染器 (View) — 帧缓冲 → 画布 (对应模拟器 ui.writeFrame)
    this._renderer = new Renderer();

    // 场景 View 层 (渲染数据写入 NT/OAM, 读 service DisplayState)
    this._passwordView = new PasswordView(this._store);
    this._meetingView = new MeetingView(this._store);
    this._levelupView = new LevelUpView(this._store);

    // Bank26 演出执行器 + 演出画面 View (球员射门特写/Cyclone)
    this._showcaseExecutor = new Bank26ShowcaseExecutor(this._store);
    this._showcaseView = new ShowcaseView(this._store);
    // 注入 Bank30 (供 $D792 Cyclone 链调用 $8021/$8036)
    this._bank30.setShowcaseExecutor(this._showcaseExecutor);

    // OAM 桥接 View — ram_0468 影子 OAM → store.sprites (每帧合成前 emit)
    this._oamView = new OamView(this._store);

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
    this._compositor.registerChrBank(bankId, data);
  }

  /** 注册全部 16 个 CHR Bank 到帧合成器 (PPU 层) */
  private _registerAllChrBanks(): void {
    const chrBanks: Array<readonly number[]> = [
      _chr00, _chr01, _chr02, _chr03, _chr04, _chr05, _chr06, _chr07,
      _chr08, _chr09, _chr10, _chr11, _chr12, _chr13, _chr14, _chr15,
    ];
    for (let i = 0; i < chrBanks.length; i++) {
      this._compositor.registerChrBank(i, new Uint8Array(chrBanks[i]));
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

  // ── 演示 / 录制接口 (无头可用) ──

  /** 数据中心 (Model) — 供外部读写演出状态 */
  get store(): DataStore {
    return this._store;
  }

  /** Bank30 服务 — 演出链入口 (requestShowcase / entry_D67C / entry_D792 …) */
  get bank30(): Bank30Service {
    return this._bank30;
  }

  /** Bank16 服务 — 演出脚本解释器 */
  get bank16(): Bank16Service {
    return this._bank16;
  }

  /** 帧合成器 — 消费 DataStore → Uint32Array 帧缓冲 */
  get compositor(): FrameCompositor {
    return this._compositor;
  }

  /** 球员升级服务 (经验值/等级/Guts 读写 + maxOut 满级) */
  get levelup(): LevelUpService {
    return this._levelup;
  }

  /**
   * 无头初始化 — 等价 start() 的初始化链但跳过循环/渲染器/音频：
   *   RESET → Bank30 init → Bank02 resetEntry(0) → Boot 根场景
   * 供录制脚本 / 无头测试使用。
   */
  prepare(): void {
    if (this._state !== GS.INIT) {
      console.warn('[Tsubasa2] prepare() 已执行过，忽略');
      return;
    }
    this._interrupt.reset();
    this._bank30.init();
    this._boot.init();
    this._setState(GS.OPENING);
    console.log('[Tsubasa2] 无头初始化完成 (prepare)');
  }

  /**
   * 触发并驱动演出 (043C 演出链演示入口)。
   * @param showId 演出 ID: 0x3D 特写 / 0x46 Cyclone / 0x38 等; 省略则走完整 $D67C 链
   */
  demoShowcase(showId?: number): void {
    if (showId !== undefined) {
      this._bank30.triggerShowcase(showId);
    } else {
      this._bank30.entry_D67C();
    }
    this._frameIndex = 0;
  }

  /**
   * 推进一帧逻辑 + 渲染 (无头可用)，返回合成帧缓冲。
   * 与 onFrameCapture 配合实现逐帧录制。
   */
  stepFrame(): Uint32Array | null {
    this._onFrame(16.67);
    this._onRender(16.67);
    this._frameIndex++;
    return this._lastFrame;
  }

  /** 合成当前一帧 (不推进逻辑) */
  captureFrame(): Uint32Array {
    return this._compositor.compose();
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

    // Bank26 演出执行器 tick (技能演出状态机推进)
    this._showcaseExecutor.tick();

    // 音频引擎更新 (每帧处理请求队列 + 通道状态机 + APU 输出)
    try {
      this._audioService.update();
    } catch (_) {
      // 音频更新失败不中断游戏逻辑
    }

    this._lastButtons = this._buttons;
  }

  /** 每帧渲染 — PPU 层合成帧缓冲, View 层呈现 (对应模拟器 PPU.endFrame → ui.writeFrame) */
  private _onRender(_dt: number): void {
    // 0. 场景 View 层: 读 service DisplayState, 写 NT/OAM (对应 NES NMI 把场景数据写到 PPU)
    const pwState = this._boot.getPasswordDisplayState();
    if (pwState) this._passwordView.render(pwState);

    // 0.1 MEETING 赛前会议 View: 主菜单/子菜单/二级/三级 渲染
    const mtgState = this._boot.getMeetingDisplayState();
    if (mtgState) this._meetingView.render(mtgState);

    // 0.2 LEVELUP 升级界面 View: 选手经验/等级显示
    const lvlSvc = this._boot.getLevelUpService();
    if (lvlSvc) this._levelupView.render(lvlSvc);

    // 0.4 演出画面 View: 球员射门特写 + Cyclone (读 Bank26 executor DisplayState)
    this._showcaseView.render(this._showcaseExecutor.getDisplayState());

    // 0.5 OAM 桥接: ram_0468 影子 OAM → DataStore.sprites (对应 NES NMI OAM DMA)
    this._oamView.emit();

    // 1. 合成: DataStore (NT/OAM/调色板) + CHR → Uint32Array 帧缓冲 (无头可用)
    const buf = this._compositor.compose();
    this._lastFrame = buf;

    // 2. 帧捕获 hook (无头录制/预览)
    if (this.onFrameCapture) {
      this.onFrameCapture(buf, NES_WIDTH, NES_HEIGHT, this._frameIndex);
    }

    // 3. 呈现: 帧缓冲 → putImageData (有 canvas 时)
    if (this._ctx) {
      this._renderer.writeFrame(buf);
    }
  }
}
