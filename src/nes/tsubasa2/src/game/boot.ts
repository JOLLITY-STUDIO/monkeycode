/**
 * Boot & Init Service — 场景路由器 (Control 层)
 *
 * 对应 Bank 31 RESET 向量 ($FFF0) 及 Bank 30/00 初始化链。
 *
 * 原始 RESET 流程：
 *   Bank 31 $FFF0: LDA #$00; STA $8000  (复位 MMC3)
 *                  JMP $C503            (跳 Bank 30 启动)
 *   Bank 30 $C503: 硬件初始化 → bank 映射 → JMP Bank 00/02
 *   Bank 00:       场景/PPU 初始化 → 主循环 → 开场动画
 *
 * H5 不再需要 MMC3 / bank 切换，直接：
 *   init() → 清零 DataStore → 设置初始状态 → 按 SceneRoot 分发到各服务。
 *
 * 路由表 (SceneRoot → Service):
 *   BOOT     → 开场动画 (OpeningSceneController)
 *   TITLE    → 标题菜单 (KICK OFF / CONTINUE)
 *   PASSWORD → 密码输入 (TODO: Bank 02 entryC 密码逻辑)
 *   MEETING  → DataQueryService (Bank 01 选项屏幕)
 *   STORY    → 剧情 (TODO: Bank 18/19)
 *   MATCH    → MatchEngineService (Bank 26)
 *   RESULT   → 赛果 (TODO)
 */

import { DataStore } from './data/DataStore';
import { SceneRoot, OpeningShot, TitleMenu } from './data/scene/index';
import { OpeningSceneController, type OpeningDisplayState } from './service/bank00/scene_opening.controller';
import { TitleSceneController, type TitleDisplayState } from './service/bank00/title_scene.controller';
import { DataQueryService } from './service/bank01_data-query.service';
import { MatchEngineService } from './service/bank26_match.service';
import { BUTTON } from '../core/types';
import { palReset } from './data/ppu/pallete/paletteManager';

/** 游戏根状态（存 DataStore.ram 中） */
export const BOOT_KEYS = {
  /** 当前顶层场景 */
  ROOT:        'boot_root',
  /** 开场镜头 */
  SHOT:        'boot_shot',
  /** 标题光标 */
  TITLE_CURSOR: 'boot_title_cursor',
} as const;

export class BootService {
  /** 开场每镜头持续帧数 */
  private static readonly SHOT_DURATION = 120; // ~2 秒

  /** 当前镜头已过帧数 */
  private _shotFrame = 0;

  /** 上一帧按键（边沿检测，防止按键穿透场景） */
  private _prevButtons = 0;

  /** 开场场景控制器 (BOOT 阶段: TECMO 字母占位, 真正开场数据待提取) */
  private _opening!: OpeningSceneController;

  /** 标题场景控制器 (TITLE 阶段: KICK OFF / CONTINUE 菜单) */
  private _title!: TitleSceneController;

  constructor(
    private _store: DataStore,
    private _dataQuery: DataQueryService,
    private _matchEngine: MatchEngineService,
  ) {}

  // ── 公开接口 ──

  /**
   * 完整初始化（对应 RESET 向量执行的逻辑）。
   *
   * 注意: 硬件初始化 (RAM 清零/NT 清零/OAM 清零/PPU 配置) 由
   * Bank30Service.init() 完成，此处只设置场景路由状态。
   */
  init(): void {
    // 1. 对应 Bank 30 硬件初始化 — 设定 RAM 默认值
    this._initRamDefaults();

    // 2. 对应 Bank 30 PPU 初始化 — paletteRAM 加载默认调色板
    palReset();

    // 3. 创建控制器
    this._title = new TitleSceneController();
    this._opening = new OpeningSceneController(this._store);

    // 4. 进入 BOOT 场景 — 开场占位 (TECMO 字母模式块; 真正 TECMO Theater 开场数据待提取)
    this._opening.initBoot();
    this._writeRoot(SceneRoot.BOOT);
    this._writeShot(OpeningShot.LOGO);
    this._shotFrame = 0;

    // 标题默认光标
    this._store.write(BOOT_KEYS.TITLE_CURSOR, TitleMenu.KICKOFF);
  }

  /** 每帧更新 — 场景路由分发 */
  update(buttons: number, _frameCount: number): boolean {
    // 上升沿检测：只响应本帧新按下的按键
    const pressed = buttons & ~this._prevButtons;
    this._prevButtons = buttons;

    const root = this._readRoot();

    switch (root) {
    case SceneRoot.BOOT:
      return this._updateBoot(pressed);

    case SceneRoot.TITLE:
      return this._updateTitle(pressed);

    case SceneRoot.MEETING:
      // Bank 01 选项屏幕 (赛前会议/队伍选择)
      this._dataQuery.update(pressed, _frameCount);
      return false;

    case SceneRoot.MATCH:
      // Bank 26 比赛引擎
      this._matchEngine.mainLoop();
      return false;

    default:
      // PASSWORD/STORY/RESULT/CREDITS — TODO 场景翻译完成后接入
      return true;
    }
  }

  /** 读取根场景 */
  getRoot(): SceneRoot {
    const v = this._store.read(BOOT_KEYS.ROOT);
    return v as SceneRoot;
  }

  /** 读取当前开场镜头 */
  getShot(): OpeningShot {
    const v = this._store.read(BOOT_KEYS.SHOT);
    return v as OpeningShot;
  }

  /** 获取标题光标 */
  getTitleCursor(): TitleMenu {
    const v = this._store.read(BOOT_KEYS.TITLE_CURSOR);
    return v as TitleMenu;
  }

  /** 获取标题菜单显示状态 (View 层消费) */
  getTitleDisplayState(): TitleDisplayState | null {
    if (!this._title) return null;
    return this._title.getDisplayState();
  }

  /** 获取开场显示状态 (View 层消费) */
  getOpeningDisplayState(): OpeningDisplayState | null {
    if (!this._opening) return null;
    return this._opening.getDisplayState();
  }

  // ── 内部 ──

  /** 初始化默认 RAM 值（对应 Bank 30 硬件初始化部分） */
  private _initRamDefaults(): void {
    const s = this._store;

    // 比赛状态初始值
    s.write('gameState',    0);       // $062B
    s.write('timerLo',      0);       // timer low
    s.write('timerHi',      0x18);    // timer high → 1800秒 = 30分钟
    s.write('scoreA',       0);
    s.write('scoreB',       0);
    s.write('ballOwner',    0);
    s.write('ballX',        0);
    s.write('ballY',        0);

    // Bank 31 核心 RAM 默认值（从 bank31_analysis 提取）
    s.write('nearCount',    0);       // $0600
    s.write('roundCount',   0);       // $0613
    s.write('actionClock',  0x0A);    // $0614
    s.write('bpmCounter',   0);       // $0618

    // 控制器默认值
    s.write('ctrlStatus',   0);       // $0516
    s.write('scrollDir',    0);       // $0517
    s.write('animLock',     0);       // $0515
    s.write('zoneFlag',     0xFF);    // $062A

    // 暂停/清场标志
    s.write('pauseFlag',    0);       // $062D

    // ZP 零页全部清零（对应 Bank 30 init 中 A2 00 循环）
    this._store.zp.fill(0);
  }

  // ── Boot 场景更新 ──

  private _updateBoot(buttons: number): boolean {
    this._shotFrame++;

    // BOOT 占位: 简短过渡 (真正 TECMO Theater 开场动画待提取),
    // START 或超时 → 进入标题场景 (灌入 Cut 0x17 标题菜单背景)
    if ((buttons & BUTTON.START) || this._shotFrame >= BootService.SHOT_DURATION) {
      this._enterTitle();
    }

    return false;
  }

  /** 从 BOOT 进入 TITLE — 灌入 Cut 0x17 标题菜单背景 + 初始化菜单 */
  private _enterTitle(): void {
    // 标题菜单背景 (Cut 0x17: 大标题 + 菜单框 + 奖杯 + 版权信息)
    this._opening.init();
    // 标题菜单逻辑 (KICK OFF / CONTINUE)
    this._title.init();
    this._writeRoot(SceneRoot.TITLE);
  }

  // ── Title 场景更新 ──

  private _updateTitle(buttons: number): boolean {
    const selected = this._title.update(buttons);

    // 同步光标到数据中心 (对外 API getTitleCursor 兼容)
    this._store.write(BOOT_KEYS.TITLE_CURSOR, this._title.cursor);

    if (selected !== null) {
      if (selected === TitleMenu.KICKOFF) {
        // 新游戏 → MEETING (赛前会议, Bank 01 选项屏幕)
        this._writeRoot(SceneRoot.MEETING);
        this._dataQuery.initOptionScreen();
      } else {
        // 续关 → PASSWORD
        this._writeRoot(SceneRoot.PASSWORD);
      }
      return true; // 状态已变更
    }

    return false;
  }

  // ── 读写辅助 ──

  private _readRoot(): SceneRoot {
    return this._store.read(BOOT_KEYS.ROOT) as SceneRoot;
  }

  private _writeRoot(root: SceneRoot): void {
    this._store.write(BOOT_KEYS.ROOT, root);
  }

  private _writeShot(shot: OpeningShot): void {
    this._store.write(BOOT_KEYS.SHOT, shot);
  }
}
