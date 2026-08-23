/**
 * 天使之翼2 — game 层组合根（Tsubasa2 主类）
 *
 * MVC 结构：
 *   code/ = Service（业务逻辑）    data/ = Table（数据模型）
 *
 * 每帧流程（真实游戏行为）：
 *   1. InputService 注入 core 控制器状态
 *   2. InterruptService.nmi(frame) — NMI 语义：读手柄 → 场景逻辑推进
 *   3. AudioService.update() — bank12 音频引擎推进
 *   4. InterruptService.renderCommit(ppu) — 渲染提交：CTRL/MASK/滚动/$05E8 缓冲/OAM/调色板
 *   5. PPU 扫描线渲染（startFrame → advanceDots → renderFramePartially → endFrame）
 *
 * 无 CPU、无 MMC3 bank 切换、无 6502 指令：全部为高级语言直接翻译。
 */
import { HEADER, CONFIG, Mirroring } from './header';
import { NES_CHR_ROM, CHR_BANKS, CHR_BANK_SIZE, CHR_BANK_COUNT } from './chr/index';
import {
  DataStore,
  GameSystemService,
  BootRouter,
  SceneId,
  HardwareInitService,
  InterruptService,
  InputService,
  OpeningSceneController,
  TitleSceneController,
  PasswordSceneController,
  ResultSceneController,
  StorySceneController,
  ScriptEngine,
  ScriptLoader,
  CharMap,
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
} from './prg/index';
import type { FrameTarget } from './runtime/GameRuntime';

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
  readonly system: GameSystemService;
  readonly router: BootRouter;
  readonly interrupts: InterruptService;
  readonly input: InputService;
  readonly hardware: HardwareInitService;
  readonly skill: SkillService;
  readonly audio: AudioService;

  /** 帧计数（NMI 帧号） */
  protected _frame = 0;

  constructor() {
    this.store = new DataStore();
    this.input = new InputService(this.store);
    this.system = new GameSystemService(this.store);

    // 场景控制器
    const opening = new OpeningSceneController(this.store, this.input);
    const title = new TitleSceneController(this.store, this.input);
    const password = new PasswordSceneController(this.store, this.input);
    const result = new ResultSceneController(this.store, this.input);
    const story = new StorySceneController(this.store, this.input);

    // 剧情脚本（V0.4 接入）
    const scriptLoader = new ScriptLoader(this.store);
    const scriptEngine = new ScriptEngine(this.store, scriptLoader);
    const charMap = new CharMap();
    void scriptEngine;
    void charMap;

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
    const spriteAnim = new SpriteAnimationService(this.store);
    void sprite;
    void spriteAnim;
    this.audio = new AudioService(this.store);

    // 音频注入（场景 BGM/SE 播放）
    opening.attachAudio(this.audio);
    title.attachAudio(this.audio);

    // 路由：注册全部场景
    this.router = new BootRouter(this.store, opening);
    this.router.register(title);
    this.router.register(password);
    this.router.register(result);
    this.router.register(story);

    // 硬件初始化 + 中断管线
    this.hardware = new HardwareInitService(this.store);
    this.interrupts = new InterruptService(this.store, this.input);
    this.interrupts.attachRouter(this.router);
    void matchEngine;
  }

  /**
   * 启动：RESET（$C64E）→ RAM 初始化 → OAM 隐藏 → 场景调度（$CEFE/$C400 → $A200 场景 0）
   */
  boot(): void {
    this._frame = 0;
    this.hardware.reset();
    // 场景调度：场景号 0 = 开场（原版 Reset 末尾 LDA #$00; JMP $CEFE）
    this.router.changeScene(SceneId.Opening);
  }

  /**
   * 每帧：NMI 游戏逻辑 → 渲染提交 → PPU 扫描线渲染
   * @param target 结构化运行平台（控制器状态 + PPU 渲染目标；core NES 或 HeadlessRuntime 均可）
   */
  frame(target: FrameTarget): void {
    const store = this.store;
    // 1. 注入控制器状态（core Controller.state: 0x41=按下 0x40=松开）
    this.input.setControllerState(1, target.controllers[1].state);
    this.input.setControllerState(2, target.controllers[2].state);
    // 2. NMI 语义：读手柄 → 场景逻辑推进 → ram_001B bit7
    this.interrupts.nmi(this._frame);
    // 3. 音频引擎推进（bank12 语义）
    this.audio.update();
    // 4. 渲染提交（$C775 + bank02 $8000 语义）
    try {
      this.interrupts.renderCommit(target.ppu);
    } catch (e) {
      console.error('renderCommit error at frame ' + this._frame + ': ' + (e as Error).message);
      throw e;
    }
    // 5. PPU 扫描线渲染（H5 不跑 CPU，直接推进一帧）
    const ppu: any = target.ppu;
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
