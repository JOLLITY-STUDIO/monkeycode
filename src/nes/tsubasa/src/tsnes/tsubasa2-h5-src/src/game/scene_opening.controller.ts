/**
 * 开场场景控制器 — TECMO Theater (Scene 0x17)
 *
 * 对应原始 ROM 场景 0x17：开场动画序列。
 *
 * 动画序列 (对应 OpeningShot enum):
 *   0. LOGO       — TECMO 商标
 *   1. TSUBASA    — 大空翼 肖像 + 文字
 *   2. HYUGA      — 日向小次郎 肖像 + 文字
 *   3. MISAKI     — 岬太郎 肖像 + 文字
 *   4. WAKABAYASHI — 若林源三 肖像 + 文字
 *   5. WORLD_CUP  — 世界杯 标题
 *   6. TITLE      — 标题画面 KICK OFF / CONTINUE
 *
 * 每镜持续 ~120-180 帧 (约 2-3 秒)。
 * START 按钮可跳过当前镜。
 *
 * 原始 Bank 01 的 NMI handler 负责每镜的渲染 (NT 更新、OAM 精灵)。
 * H5: 每帧调用 update()，由外部渲染器消费 displayState 进行绘制。
 */

import type { DataStore } from '../data/DataStore';
import { OpeningShot, TitleMenu } from '../data/scene/index';

// ── 动画序列每镜帧数 ──

/** 各镜默认帧数 (60fps 基准) */
const SHOT_FRAMES: Record<number, number> = {
  [OpeningShot.LOGO]: 180,         // TECMO logo: ~3s
  [OpeningShot.TSUBASA]: 150,      // 翼: ~2.5s
  [OpeningShot.HYUGA]: 150,        // 日向: ~2.5s
  [OpeningShot.MISAKI]: 150,       // 岬: ~2.5s
  [OpeningShot.WAKABAYASHI]: 150,  // 若林: ~2.5s
  [OpeningShot.WORLD_CUP]: 120,    // 世界杯: ~2s
  [OpeningShot.TITLE]: 0,          // 标题: 无限等待
};

// ── 每镜显示文本 ──

const SHOT_TEXT: Record<number, { jp: string; en: string }> = {
  [OpeningShot.LOGO]: { jp: 'TECMO', en: 'TECMO' },
  [OpeningShot.TSUBASA]: { jp: '大空 翼', en: 'TSUBASA OZORA' },
  [OpeningShot.HYUGA]: { jp: '日向 小次郎', en: 'KOJIRO HYUGA' },
  [OpeningShot.MISAKI]: { jp: '岬 太郎', en: 'TARO MISAKI' },
  [OpeningShot.WAKABAYASHI]: { jp: '若林 源三', en: 'GENZO WAKABAYASHI' },
  [OpeningShot.WORLD_CUP]: { jp: 'ワールドカップ', en: 'WORLD CUP' },
};

// ── 标题菜单项 ──

const TITLE_ITEMS = [
  { label: 'KICK OFF', jp: 'キックオフ' },
  { label: 'CONTINUE', jp: 'コンティニュー' },
];

// ═══════════════════════════════════════════════════════════════
// 显示状态 (消费型 — 每帧由 Render 消费后重置)
// ═══════════════════════════════════════════════════════════════

export interface OpeningDisplayState {
  /** 当前镜头索引 */
  shot: OpeningShot;

  /** 当前镜头已过帧数 */
  shotFrame: number;

  /** 当前镜头总帧数 */
  shotTotalFrames: number;

  /** 显示文本 */
  text: string;

  /** 文本副标题 */
  subText: string;

  /** 是否在标题画面 */
  isTitle: boolean;

  /** 标题光标位置 */
  titleCursor: number;

  /** 标题菜单项 */
  titleItems: Array<{ label: string; jp: string }>;

  /** 是否显示 Logo */
  showLogo: boolean;

  /** 是否显示人物肖像 */
  showPortrait: boolean;

  /** 镜头切换过渡 (0-1) */
  transitionAlpha: number;

  /** 当前镜头是否完成 */
  shotComplete: boolean;

  /** 背景颜色索引 */
  bgColor: number;

  /** 文本闪烁标志 (每30帧切换) */
  textBlink: boolean;
}

// ═══════════════════════════════════════════════════════════════
// 开场场景控制器
// ═══════════════════════════════════════════════════════════════

export class OpeningSceneController {
  private _store: DataStore;

  /** 当前镜头 */
  private _shot: OpeningShot = OpeningShot.LOGO;

  /** 当前镜头帧计数 */
  private _shotFrame = 0;

  /** 是否已进入标题画面 */
  private _isTitle = false;

  /** 标题光标 */
  private _titleCursor = 0;

  /** 是否完成全部开场 */
  private _complete = false;

  /** 上次按键值 (上升沿检测) */
  private _lastButtons = 0;

  /** 文本闪烁计时 */
  private _blinkTimer = 0;

  /** 过渡计时 */
  private _transitionTimer = 0;

  /** START 被按下 (当前帧) */
  private _startPressed = false;

  constructor(store: DataStore) {
    this._store = store;
  }

  // ── 公开属性 ──

  get shot(): OpeningShot { return this._shot; }
  get isTitle(): boolean { return this._isTitle; }
  get titleCursor(): number { return this._titleCursor; }
  get complete(): boolean { return this._complete; }

  // ──────────────────────────────────────────────
  // 初始化 (对应 sceneLoad(0x17) 后首次进入)
  // ──────────────────────────────────────────────

  /**
   * 初始化开场场景。
   * 对应原始 $8053-$8077 (scene init chain):
   *   NT clear → palette → sceneLoad → VRAM → PPU
   */
  init(): void {
    this._shot = OpeningShot.LOGO;
    this._shotFrame = 0;
    this._isTitle = false;
    this._titleCursor = 0;
    this._complete = false;
    this._blinkTimer = 0;
    this._transitionTimer = 0;
    this._startPressed = false;

    // 设 ram_00ED=0x0A → 对应 $808D
    this._store.write('ram_00ED', 0x0A);
  }

  // ──────────────────────────────────────────────
  // 每帧更新 (由 Bank00.update() 每帧调用)
  // ──────────────────────────────────────────────

  /**
   * 每帧调用。处理动画帧推进和按键。
   *
   * @param buttons 当前帧按键 bitmask
   * @returns 当前显示状态
   */
  update(buttons: number): OpeningDisplayState {
    this._detectInput(buttons);
    this._updateAnimation();

    return this._buildDisplayState();
  }

  // ──────────────────────────────────────────────
  // 输入处理
  // ──────────────────────────────────────────────

  private _detectInput(buttons: number): void {
    // START 上升沿检测
    const startMask = 0x10; // BUTTON.START
    const startEdge = (buttons & startMask) && !(this._lastButtons & startMask);
    this._startPressed = !!startEdge;

    this._lastButtons = buttons;
  }

  // ──────────────────────────────────────────────
  // 动画推进
  // ──────────────────────────────────────────────

  private _updateAnimation(): void {
    if (this._complete) return;

    this._shotFrame++;
    this._blinkTimer++;

    // 文本闪烁: 每 30 帧切换
    if (this._blinkTimer >= 60) {
      this._blinkTimer = 0;
    }

    // 过渡效果: 前 15 帧 fade in, 后 15 帧 fade out
    if (this._transitionTimer > 0) {
      this._transitionTimer--;
    }

    const maxFrames = SHOT_FRAMES[this._shot] ?? 180;

    // START 跳过当前镜 或 帧数到达 → 下一镜
    if (this._startPressed || this._shotFrame >= maxFrames) {
      this._startPressed = false;

      if (this._isTitle) {
        // 标题画面: 选择菜单项
        if (this._titleCursor === TitleMenu.KICKOFF) {
          this._complete = true; // → 进入比赛流程
        } else {
          // CONTINUE — 密码输入 (TODO)
        }
        return;
      }

      this._nextShot();
    }
  }

  /**
   * 推进到下一镜头。
   */
  private _nextShot(): void {
    const nextShot = this._shot + 1;

    if (nextShot > OpeningShot[OpeningShot.TITLE]
        || OpeningShot[nextShot] === undefined) {
      this._complete = true;
      return;
    }

    this._shot = nextShot;
    this._shotFrame = 0;
    this._transitionTimer = 15; // fade transition

    // 检测是否进入标题画面
    if (this._shot === OpeningShot.TITLE) {
      this._isTitle = true;
      this._titleCursor = TitleMenu.KICKOFF;
    }
  }

  // ──────────────────────────────────────────────
  // 构建显示状态 (供渲染器消费)
  // ──────────────────────────────────────────────

  private _buildDisplayState(): OpeningDisplayState {
    const shotInfo = SHOT_TEXT[this._shot];
    const maxFrames = SHOT_FRAMES[this._shot] ?? 180;

    // 过渡透明度计算
    let alpha = 1.0;
    if (this._transitionTimer > 10) {
      alpha = (15 - this._transitionTimer) / 5; // 0→1 in first 5 frames
    }

    return {
      shot: this._shot,
      shotFrame: this._shotFrame,
      shotTotalFrames: maxFrames,
      text: shotInfo?.jp ?? '',
      subText: shotInfo?.en ?? '',
      isTitle: this._isTitle,
      titleCursor: this._titleCursor,
      titleItems: TITLE_ITEMS,
      showLogo: this._shot === OpeningShot.LOGO,
      showPortrait: this._shot >= OpeningShot.TSUBASA
        && this._shot <= OpeningShot.WAKABAYASHI,
      transitionAlpha: Math.min(alpha, 1.0),
      shotComplete: this._shotFrame >= maxFrames,
      bgColor: this._getBgColor(),
      textBlink: this._blinkTimer < 30,
    };
  }

  /**
   * 每镜背景颜色 (简化: 用 NES 调色板索引)
   */
  private _getBgColor(): number {
    switch (this._shot) {
    case OpeningShot.LOGO: return 0x0F; // 黑
    case OpeningShot.TSUBASA: return 0x12; // 深蓝
    case OpeningShot.HYUGA: return 0x06; // 深红
    case OpeningShot.MISAKI: return 0x1A; // 绿
    case OpeningShot.WAKABAYASHI: return 0x05; // 深黄
    case OpeningShot.WORLD_CUP: return 0x0F; // 黑
    case OpeningShot.TITLE: return 0x0F; // 黑
    default: return 0x0F;
    }
  }

  // ──────────────────────────────────────────────
  // 标题菜单操作
  // ──────────────────────────────────────────────

  /** 光标上移 */
  cursorUp(): void {
    if (!this._isTitle) return;
    this._titleCursor = Math.max(0, this._titleCursor - 1);
  }

  /** 光标下移 */
  cursorDown(): void {
    if (!this._isTitle) return;
    this._titleCursor = Math.min(TITLE_ITEMS.length - 1, this._titleCursor + 1);
  }

  /** 标题菜单确认 */
  confirmSelection(): OpeningShot {
    if (!this._isTitle) return this._shot;

    if (this._titleCursor === 0) {
      // KICK OFF → 进入赛前会议流程
      this._complete = true;
    }
    // CONTINUE → 密码输入 (TODO)

    return this._shot;
  }

  // ──────────────────────────────────────────────
  // 获取当前场景对应的 RAM 数据
  // ──────────────────────────────────────────────

  /**
   * 获取开场场景的原始 ROM 数据偏移
   * (供后续 NT/sprite 渲染使用)
   */
  getRomDataOffset(): number {
    // Scene 0x17 data is in Bank 07 referenced by Bank02 pointer table
    // The scene pointer table is at Bank02 $A092 area
    // For now return 0 — actual scene data to be extracted from ROM
    return 0;
  }
}
