/**
 * 天使之翼2 — game 层组合根（Tsubasa2 主类）
 *
 * MVC 结构：
 *   code/ = Service（业务逻辑）    data/ = Table（数据模型）
 *
 * 每帧流程（真实游戏行为）：
 *   1. InputService 注入 core 控制器状态
 *   2. InterruptService.nmi(frame) — 语义：读手柄 → 场景逻辑推进
 *   3. AudioService.update() — 音频引擎推进
 *   4. InterruptService.renderCommit(ppu) — 渲染提交：CTRL/MASK/滚动/渲染缓冲/OAM/调色板
 *   5. PPU 扫描线渲染（startFrame → advanceDots → renderFramePartially → endFrame）
 *
 * 翻译原则：全部为高级语言直接翻译，无 CPU、无 bank 切换仿真。
 */
import { HEADER, CONFIG, Mirroring } from './header';
import { NES_CHR_ROM, CHR_BANKS, CHR_BANK_SIZE, CHR_BANK_COUNT } from './chr/index';
import {
  DataStore,
  BootRouter,
  SceneId,
  HardwareInitService,
  InterruptService,
  InputService,
  Bank00SchedulerService,
  Bank00MainLoopService,
  PpuTransferService,
  NtStreamLoaderService,
  SceneStateMachine,
  Scene0Controller,
  ScriptEngine,
  ScriptLoader,
  MeetingSceneController,
  MEETING_SCENE_ID,
  CharMap,
  setScriptRuntime,
  PlayerQueryService,
  TeamRosterService,
  MatchEngineService,
  MatchTurnService,
  MatchAuxService,
  MatchHudService,
  MatchConfigService,
  SkillService,
  SpriteService,
  SpriteAnimationService,
  AudioService,
  OpeningSceneController,
} from './prg/index';
import type { FrameTarget } from './runtime/GameRuntime';

// PAPU（完整 NES APU 模拟器）
// @ts-ignore — tsnes 移植代码，松散类型
import PAPU from '../core/papu/index';

export { HEADER, CONFIG, Mirroring };
export { NES_CHR_ROM, CHR_BANKS, CHR_BANK_SIZE, CHR_BANK_COUNT };
export { DataStore };

/**
 * Tsubasa2 — 组合根（即插即用）
 *
 * 用法：
 *   const game = new Tsubasa2();
 *   game.boot();             // Reset → 场景调度（开场）
 *   game.frame(nes);         // 每帧（由外层 60fps 循环调用）
 */
export class Tsubasa2 {
  readonly store: DataStore;
  readonly router: BootRouter;
  readonly interrupts: InterruptService;
  readonly input: InputService;
  readonly hardware: HardwareInitService;
  readonly skill: SkillService;
  readonly audio: AudioService;
  readonly sprite: SpriteService;
  // bank00 Service (组合根实例化)
  // 注: MainRouterService 由 Bank00MainLoopService 内部持有 (Tsubasa2 不暴露, 避免外部滥用)
  // bank00 vs bank02 职责清晰切分:
  //   - bank00MainLoop (PRG $8000) = Bank00MainLoopService (新)
  //   - bank02 路由  (PRG $A000)  = BootRouter
  readonly bank00Scheduler: Bank00SchedulerService;
  readonly bank00MainLoop: Bank00MainLoopService;
  readonly ppuTransfer: PpuTransferService;
  readonly ntStreamLoader: NtStreamLoaderService;
  readonly sceneStateMachine: SceneStateMachine;
  /** 剧情脚本 VM（MeetingScene 链路终点注入用） */
  readonly scriptEngine: ScriptEngine;

  /** 帧计数（NMI 帧号） */
  protected _frame = 0;
  /** PAPU 实例（NES APU 模拟器） */
  protected _papu: any = null;
  /** WebAudio 上下文（小程序 wx.createWebAudioContext） */
  protected _webAudio: any = null;
  /** 音频采样缓冲 */
  protected _audioSamples: number[] = [];
  /** 采样写入位置 */
  protected _sampleOffset = 0;

  constructor() {
    this.store = new DataStore();
    this.input = new InputService(this.store);

    // bank00 翻译服务（组合根实例化）
    // PRG $9EEF-$9FA8 scheduler tail / $9FA8 push trampoline / $9085 tick entry
    this.bank00Scheduler = new Bank00SchedulerService(this.store);
    // PRG $8464 cfg loader（多 bank 装载） — 注意 PpuTransferService 需要 PPU target，
    // 此时 target 还未 attach（boot() 时按需 attach），可选 null
    this.ppuTransfer = new PpuTransferService(this.store, null);
    // PRG $82ED NT stream loader
    this.ntStreamLoader = new NtStreamLoaderService(this.store, this.ppuTransfer);
    // PRG $8AF7 scene handler loader + $8E15 NT copy/tile decoder
    this.sceneStateMachine = new SceneStateMachine(this.store, this.ppuTransfer);
    // 注: TileBuilderService 由 Scene0/Scene18 内部自建（Tsubasa2 不暴露）

    // 场景控制器（BootRouter 自动统一 register Scene0-23；BootRouter 内部持有 MainRouterService）

    // 剧情脚本（V0.4 接入）— meeting 第一段剧情
    const scriptLoader = new ScriptLoader(this.store);
    const scriptEngine = new ScriptEngine(this.store, scriptLoader);
    const charMap = new CharMap();
    this.scriptEngine = scriptEngine;
    // CharMap 注入脚本运行时：0x94/0x95 浊音符等映射供 ScriptOpcode.TextChar 使用
    // NT cursor: $05E7 单字节 (mod 0x40 = 64 cells wrap), NT 起点 $2000 (32x30 NT)
    // writeTextChar: PRG $9AA2 NT cell writer 翻译 - 查 CharMap tile 后写 NT 当前 cursor 位置
    const NT_BASE = 0x2000;
    const NT_CURSOR_KEY = 0x05e7;
    setScriptRuntime({
      charMap,
      readRam: (addr: number) => this.store.readByte(addr),
      writeRam: (addr: number, value: number) => this.store.writeByte(addr, value),
      writeTextChar: (tile: number) => {
        const cursor = this.store.readByte(NT_CURSOR_KEY) & 0x3f;
        // 写 tile 到 NT (VRAM 写透由 setVramTarget 触发, 直接落到 PPU)
        this.store.writeByte(NT_BASE + cursor, tile & 0xff);
        // 推进 cursor (mod 64 wrap)
        this.store.writeByte(NT_CURSOR_KEY, (cursor + 1) & 0x3f);
      },
      // playBgm(0x0A): 委托 AudioService 播放 BGM
      playBgm: (id: number) => this.audio.playBgm(id & 0xff),
      // playSe(0x0B): 委托 AudioService 播放 SE
      playSe: (id: number) => this.audio.playSe(id & 0xff),
      // setPalette(0x08): PRG $96A5 palette alloc 翻译
      //   调 store.palette.bg/spr index 装载, 后续 renderCommit 推 PPU
      setPalette: (bgIdx: number, sprIdx: number) => {
        // 简化: 写 palette index 到 store.scene.flags 给后续 render 用
        this.store.writeByte(0x0090, bgIdx & 0xff);
        this.store.writeByte(0x0091, sprIdx & 0xff);
      },
      // loadSprite(0x09): 委托 SpriteService 装载 OAM 精灵
      //   签名: putSprite(slot, tile, x, y, attr?) — slot 用 id 当 slot; tile 用 id 当 tile 索引
      loadSprite: (id: number, x: number, y: number, attr: number) => {
        this.sprite.putSprite(id & 0x3f, id & 0xff, x & 0xff, y & 0xff, attr & 0xff);
      },
    });

    // 比赛（V0.5 接入）
    const matchEngine = new MatchEngineService(this.store);
    const matchTurn = new MatchTurnService(this.store);
    const matchAux = new MatchAuxService(this.store);
    const matchHud = new MatchHudService(this.store);
    const matchConfig = new MatchConfigService(this.store);
    void matchTurn;
    void matchAux;
    void matchHud;
    void matchConfig;

    // 数据查询（V0.2 接入）
    const playerQuery = new PlayerQueryService(this.store);
    const teamRoster = new TeamRosterService(this.store);
    void playerQuery;
    void teamRoster;

    // 精灵 / 技能 / 音频
    this.skill = new SkillService(this.store);
    const sprite = new SpriteService(this.store);
    this.sprite = sprite;
    const spriteAnim = new SpriteAnimationService(this.store);
    void sprite;
    void spriteAnim;
    this.audio = new AudioService(this.store);

    // 音频输出：创建 PAPU + WebAudio（小程序 wx.createWebAudioContext）
    this._initAudio();

    // ── 路由组件: bank00 vs bank02 职责清晰切分 ──
    //   1) Bank00MainLoopService = bank00 翻译 (PRG $8000 入口: 5-mode dispatch + scheduler tail + boot + audio req)
    //   2) BootRouter            = bank02 翻译 (PRG $A000 入口: scene0+ 路由 + changeScene + 当前 scene 调度)
    //   3) PpuTransferService   = PRG $8464 cfg loader (bank00 + bank02 共享)
    this.bank00MainLoop = new Bank00MainLoopService(this.store, this.bank00Scheduler, this.ppuTransfer);

    // 路由: 场景表驱动注册 Scene0-23 (构造器循环 register)
    this.router = new BootRouter(this.store, this.input);

    // 注入 bank00 PRG $8464 cfg loader 到 BootRouter,
    // changeScene() 自动装 cfg (替代 GameSystemService.sceneLoad 硬编码 stub 表)
    this.router.attachPpuTransfer(this.ppuTransfer);

    // 注入 bank00 scheduler 到所有 Scene0-23 (PRG $9FA8 pushState 翻译)
    // 替代各 Scene 自己写的 this.wait/counter 自减模式
    this.router.attachScheduler(this.bank00Scheduler);

    // 音频注入 (场景 0 BGM/SE 播放 — BootRouter 默认已注册 Scene0Controller 实例)
    (this.router.getController(SceneId.Scene0) as Scene0Controller).attachAudio(this.audio);
    // 片头序列（OpeningScene）音频注入（首屏 tecmo_logo 播 BGM 0x01）
    (this.router.getController(SceneId.Opening) as OpeningSceneController).attachAudio(this.audio);

    // 第一关 meeting 页面（Scene14-23 chain 链路终点）注入 ScriptEngine 跑剧情第一段
    (this.router.getController(MEETING_SCENE_ID) as MeetingSceneController).attachScriptEngine(this.scriptEngine);

    // bank00 scene state machine + NT stream loader 注入 Scene0
    // (PRG $8AF7 scene handler loader + $82ED NT stream loader)
    (this.router.getController(SceneId.Scene0) as Scene0Controller).attachNtStreamLoader(this.ntStreamLoader);
    (this.router.getController(SceneId.Scene0) as Scene0Controller).attachSceneStateMachine(this.sceneStateMachine);

    // 硬件初始化 + 中断管线
    this.hardware = new HardwareInitService(this.store);
    this.interrupts = new InterruptService(this.store, this.input);
    this.interrupts.attachRouter(this.router);
    this.interrupts.attachScheduler(this.bank00Scheduler);
    this.interrupts.attachBank00MainLoop(this.bank00MainLoop);

    // ── bank00 5-mode dispatcher 接入（$8000 主循环翻译）──
    // sceneMainLoopStep 设为 no-op（不要在这里再调 router.update():
    //   InterruptService.nmi() line 96 已经独立调 router.update() 一次，
    //   dispatcher 内部再调一次会让 SceneController.onUpdate() 跑两遍，counter 加倍）
    // sceneHandlerA20C/A006/A009/A015/A012/A018/A00C 暂不接 → no-op，
    //   避免 dispatcher 主动改 $0026 跟 router.changeScene 打架
    //   （待 Scene0-23 改造为 store 驱动后再接）
    // 启用 dispatcher 的实际意义：让 mode0/1/2/3/4 5-mode state machine 跑起来，
    //   写 $0027/$0026/$0700/$0028/$0029 等 store 字节，仿真 ROM 真实行为；
    //   Scene0-23 当前不读这些字节，所以副作用暂时不影响游戏流程。
    this.bank00MainLoop.attachHooks({
      sceneMainLoopStep: () => {},
    });
    this.bank00MainLoop.start();

    void matchEngine;
  }

  /**
   * 初始化音频：创建 PAPU + WebAudio 输出
   *
   * 小程序用 wx.createWebAudioContext() 创建 WebAudio API。
   * PAPU 的 onAudioSample 回调把采样推入缓冲，
   * 每帧用 ScriptProcessorNode 或 AudioWorklet 播放。
   */
  protected _initAudio(): void {
    try {
      // 创建 WebAudio 上下文
      const wac: any = (typeof wx !== 'undefined' && wx.createWebAudioContext)
        ? wx.createWebAudioContext()
        : (typeof AudioContext !== 'undefined' ? new AudioContext() : null);
      if (!wac) {
        console.log('[tsubasa] WebAudio 不可用，音频静音');
        return;
      }
      this._webAudio = wac;

      // 创建 PAPU（nes 适配对象）
      const nes = {
        opts: {
          sampleRate: 44100,
          onAudioSample: (l: number, r: number) => {
            this._audioSamples.push((l + r) / 2);
          },
        },
      };
      this._papu = new PAPU(nes);

      // 注入到 AudioService
      this.audio.attachPapu(this._papu);

      // 创建 ScriptProcessorNode 用于实时播放
      // 缓冲区 4096 采样，单声道
      const sampleRate = 44100;
      const processor = wac.createScriptProcessor(4096, 0, 1);
      const buffer = new Float32Array(4096);
      processor.onaudioprocess = (e: any) => {
        const out = e.outputBuffer.getChannelData(0);
        const n = Math.min(this._audioSamples.length - this._sampleOffset, out.length);
        for (let i = 0; i < n; i++) {
          out[i] = this._audioSamples[this._sampleOffset + i];
        }
        // 填充剩余为静音
        for (let i = n; i < out.length; i++) out[i] = 0;
        this._sampleOffset += n;
        // 清理已消费的采样
        if (this._sampleOffset > 44100) {
          this._audioSamples = this._audioSamples.slice(this._sampleOffset);
          this._sampleOffset = 0;
        }
      };
      processor.connect(wac.destination);

      console.log('[tsubasa] 音频初始化完成: PAPU + WebAudio');
    } catch (e) {
      console.log('[tsubasa] 音频初始化失败:', (e as Error).message);
    }
  }

  /**
   * 启动：RESET（$C64E）→ RAM 初始化 → OAM 隐藏 → 场景调度（$CEFE/$C400 → $A200 场景 0）
   *
   * @param target 可选 FrameTarget — 提供时立即:
   *   1. 装载 boot 期 CHR bank 终态到 PPU ptTile (WBS_FRAME13 F6)
   *   2. 装载 boot palette + Tecmo logo OAM 到 PPU 寄存器 (F4+F5)
   *   否则只跑游戏逻辑初始化 (外部用 lazy runtime 模式)
   */
  boot(target?: FrameTarget): void {
    this._frame = 0;
    this.hardware.reset();
    // 场景调度：先进入 OpeningScene（片头序列 NES f10-f3599：Tecmo logo → NTV
    // → 10 屏字幕动画 → story_cup），播完内部 changeScene(Scene0)——
    // Scene0 从真实窗口 f3600 起（BgFadeOut 渐隐 story_cup → Drift30 → 标题菜单）。
    // 原 boot logo 装载（PRG $8053-$8090 的 H5 等价）由 OpeningSceneController 首屏
    // （tecmo_logo，NES f10-280）按 GT 数据表驱动，不再单独 _mountBootLogo。
    this.router.changeScene(SceneId.Opening);

    // WBS_FRAME13 F4+F5+F6: 若有 target, 立即把 boot 状态 prime 到 PPU
    if (target) {
      // F6: CHR bank 终态装载 (frame 0)
      const runtimeAny = target as unknown as { bootInitialChrBanks?: () => void };
      if (typeof runtimeAny.bootInitialChrBanks === 'function') {
        runtimeAny.bootInitialChrBanks();
      }
      // F4+F5: 调色板 + shadow OAM 推到 PPU
      this.interrupts.primeBootState(target.ppu);
    }
  }

  /**
   * 每帧：NMI 游戏逻辑 → 渲染提交 → PPU 扫描线渲染
   * @param target 结构化运行平台（控制器状态 + PPU 渲染目标；core NES 或 HeadlessRuntime 均可）
   */
  frame(target: FrameTarget): void {
    const store = this.store;
    // 0. 注入 VRAM 写透目标（$2006/$2007 直写语义；目标可每帧变化）
    store.setVramTarget(target.ppu);
    // 1. 注入控制器状态（core Controller.state: 0x41=按下 0x40=松开）
    this.input.setControllerState(1, target.controllers[1].state);
    this.input.setControllerState(2, target.controllers[2].state);
    // 2. NMI 语义：读手柄 → 场景逻辑推进 → ram_001B bit7
    this.interrupts.nmi(this._frame);
    // 2.5 bank30 $CA97 主循环任务调度 tick
    this.hardware.tick();
    // 3. 音频引擎推进（bank12 语义）
    this.audio.update();
    // 4. 渲染提交（$C775 + bank02 $8000 语义）
    try {
      this.interrupts.renderCommit(target.ppu, this._frame);
    } catch (e) {
      console.error('renderCommit error at frame ' + this._frame + ': ' + (e as Error).message);
      throw e;
    }
    // 4.5 OpeningScene 逐帧 GT 驱动：per-scanline CHR 计划 + 直接写 NT 到 PPU
    const ppu: any = target.ppu;
    if ((store.scene.currentSceneId & 0xff) === SceneId.Opening) {
      const opening = this.router.getController(SceneId.Opening) as OpeningSceneController;
      const plan = opening.getChrPlan();
      if (plan.length > 0 && typeof (target as any).setPerScanlineChrPlan === 'function') {
        (target as any).setPerScanlineChrPlan(plan);
      }
      opening.applyNtToPpu(target.ppu);
    }
    // 5. PPU 扫描线渲染（H5 不跑 CPU，直接推进一帧）
    try {
      ppu.startFrame();
      ppu.advanceDots(262 * 341);
      ppu.renderFramePartially(0, 240);
      ppu.endFrame();
    } catch (e) {
      console.error('PPU render error at frame ' + this._frame + ': ' + (e as Error).message);
      throw e;
    }
    this._frame++;
    // 调试日志：每 60 帧输出关键 RAM 状态
    if (this._frame % 60 === 0) {
      const buf = ppu.buffer as Uint32Array;
      let nz = 0;
      for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) nz++;
      console.log(
        `[Tsubasa2] frame=${this._frame} scene=${store.readByte(0x00ed)}` +
          ` ram_001B=${store.readByte(0x001b).toString(16)}` +
          ` ram_0628=${store.readByte(0x0628).toString(16)}` +
          ` bufNonZero=${nz}`,
      );
    }
  }
}

export default Tsubasa2;
