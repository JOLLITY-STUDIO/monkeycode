/**
 * ServiceLoader — 游戏内核装配器
 *
 * 职责 (对应 NES 主板上的 "PRG ROM 芯片 + CPU 加载过程"):
 *   1. 实例化所有 bank service (对应 PRG 各 bank 被加载到 CPU 可访问空间)
 *   2. 注入依赖 (对应 bank 间通过 MMC3 窗口互相调用)
 *   3. 接入 InterruptService 向量入口 (对应 $FFF0 RESET / $FFFA NMI 向量)
 *
 * Tsubasa2 主板只持有 PPU + DataStore + InterruptService,
 * ServiceLoader 负责把"游戏内核"装配好并接入 interrupt 的两个向量:
 *   - interrupt.reset()  → bank30.init()  (RESET 硬件初始化链)
 *   - interrupt.nmi(b)   → bank00.mainLoop(b) (NMI 每帧推进主循环)
 *
 * 不含任何 DOM / RAF / Canvas 渲染逻辑 (那些在 Tsubasa2 主板)。
 */
import { DataStore } from './data/prg/DataStore';
import { InterruptService } from './service/bank31_interrupt.service';
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
import { LevelUpService } from './service/levelup.service';
import { Bank24HudService } from './service/bank24_hud.service';
import { Bank29RosterService } from './service/bank29_roster.service';

export class ServiceLoader {
  // 各 bank service 实例 (对应 PRG 各 bank)
  readonly bank00: Bank00Service;
  readonly bank02: Bank02Service;
  readonly bank30: Bank30Service;
  readonly audio: Bank12AudioService;
  readonly bank16: Bank16Service;
  readonly bank18: Bank18Service;
  readonly bank19: Bank19Service;
  readonly bank20: Bank20Service;
  readonly dataQuery: DataQueryService;
  readonly matchEngine: MatchEngineService;
  readonly bank28: Bank28MatchService;
  readonly levelup: LevelUpService;
  readonly hud: Bank24HudService;
  readonly bank29: Bank29RosterService;
  readonly showcaseExec: Bank26ShowcaseExecutor;

  constructor(
    private _store: DataStore,
    private _interrupt: InterruptService,
  ) {
    // ── 实例化所有 bank service + 注入依赖 ──
    // (对应 PRG ROM 加载: 各 bank 被装入 CPU 可访问空间, bank 间通过窗口互相调用)
    this.bank00 = new Bank00Service(_store);
    this.bank02 = new Bank02Service(_store, this.bank00);
    this.bank16 = new Bank16Service(_store);
    this.bank30 = new Bank30Service(_store, this.bank00, this.bank02, this.bank16);
    this.dataQuery = new DataQueryService(_store);
    this.matchEngine = new MatchEngineService(_store);
    this.audio = new Bank12AudioService(_store);
    this.levelup = new LevelUpService(_store);
    this.hud = new Bank24HudService(_store);
    this.bank19 = new Bank19Service(_store);
    this.bank18 = new Bank18Service(_store, this.bank19);
    this.bank20 = new Bank20Service(_store);
    this.bank28 = new Bank28MatchService(_store);
    this.bank29 = new Bank29RosterService(_store);
    this.showcaseExec = new Bank26ShowcaseExecutor(_store);

    // ── 接入 InterruptService 向量入口 ──
    // (对应 $FFF0 RESET → bank30.init, $FFFA NMI → bank00.mainLoop)
    _interrupt.setBank30(this.bank30);
    _interrupt.setBank00(this.bank00);
  }

  /** 音频引擎每帧更新 (NMI 之外, 由主板 RAF 同步驱动) */
  tickAudio(): void {
    try { this.audio.update(); } catch (_) { /* */ }
  }
}
