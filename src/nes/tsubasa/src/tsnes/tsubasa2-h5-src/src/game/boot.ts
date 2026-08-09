/**
 * Boot & Init Service
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
 *   init() → 清零 DataStore → 设置初始状态 → 推进 OpeningShot 序列
 */

import { DataStore } from '../data/DataStore';
import { SceneRoot, OpeningShot, TitleMenu } from '../data/scene/index';
import { BUTTON } from '../core/types';
import { palReset } from '../data/pallete/paletteManager';

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

  constructor(private _store: DataStore) {}

  // ── 公开接口 ──

  /** 完整初始化（对应 RESET 向量执行的逻辑） */
  init(): void {
    // 1. 对应 $FFF0: 复位 MMC3 — H5 无需硬件，只清数据中心
    this._store.reset();

    // 2. 对应 Bank 30 硬件初始化 — 设定 RAM 默认值
    this._initRamDefaults();

    // 3. 对应 Bank 30 PPU 初始化 — paletteRAM 加载默认调色板
    palReset();

    // 4. 进入 BOOT 场景，开始开场动画第一帧
    this._writeRoot(SceneRoot.BOOT);
    this._writeShot(OpeningShot.LOGO);
    this._shotFrame = 0;

    // 标题默认光标
    this._store.write(BOOT_KEYS.TITLE_CURSOR, TitleMenu.KICKOFF);
  }

  /** 每帧更新 */
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

    default:
      return true; // 其他场景由对应 Service 处理
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

    const curShot = this.getShot();

    // START 键跳过整个开场动画 → 直接进标题
    if (buttons & BUTTON.START) {
      this._writeRoot(SceneRoot.TITLE);
      return false;
    }

    // 镜头计时
    if (this._shotFrame < BootService.SHOT_DURATION) {
      return false; // 当前镜头继续
    }

    // 推进到下个镜头
    const nextShot = curShot + 1 as OpeningShot;

    if (nextShot > OpeningShot.TITLE) {
      // 开场动画完 → 进入标题场景
      this._writeRoot(SceneRoot.TITLE);
      return false;
    }

    this._writeShot(nextShot);
    this._shotFrame = 0;
    return false;
  }

  // ── Title 场景更新 ──

  private _updateTitle(buttons: number): boolean {
    let cursor = this.getTitleCursor();

    // 上下切换
    if (buttons & BUTTON.UP && cursor !== TitleMenu.KICKOFF) {
      cursor = Math.max(TitleMenu.KICKOFF, cursor - 1) as TitleMenu;
    }
    if (buttons & BUTTON.DOWN && cursor !== TitleMenu.CONTINUE) { // DOWN
      cursor = Math.min(TitleMenu.CONTINUE, cursor + 1) as TitleMenu;
    }
    this._store.write(BOOT_KEYS.TITLE_CURSOR, cursor);

    // START 确认
    if (buttons & BUTTON.START) {
      if (cursor === TitleMenu.KICKOFF) {
        // 新游戏 → MEETING
        this._writeRoot(SceneRoot.MEETING);
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
