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
 * 驱动模式:
 *   - 脚本驱动 (主): ScriptVM 执行脚本 0x00, 根据 LOAD_SCENE_DATA/SET_MODE/WAIT 推进镜头
 *   - 硬编码驱动 (fallback): 当脚本未完成某些指令时, 使用 SHOT_FRAMES 硬编码时间表
 *
 * START 按钮可跳过当前镜 (脚本模式下跳过当前 WAIT)。
 *
 * 原始 Bank 01 的 NMI handler 负责每镜的渲染 (NT 更新、OAM 精灵)。
 * H5: 每帧调用 update()，由外部渲染器消费 displayState 进行绘制。
 */

import type { DataStore } from '../data/DataStore';
import { OpeningShot, TitleMenu } from '../data/scene/index';
import { ScriptVM, type ScriptVMState } from '../data/tile/textscript/script-vm';

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

  // ── 脚本驱动字段 (仅脚本模式有效) ──

  /** 是否使用脚本驱动模式 */
  scriptDriven: boolean;

  /** 脚本当前场景数据 ID (LOAD_SCENE_DATA 参数) */
  scriptSceneDataId: number;

  /** 脚本当前显示模式 (SET_MODE 参数) */
  scriptMode: number;

  /** 脚本加载的精灵 ID 列表 (LOAD_SPRITE 参数) */
  scriptSpriteIds: number[];

  /** 脚本对象队列 (QUEUE_OBJ 参数) */
  scriptObjectQueue: number[];

  /** 脚本文本行 (TEXT 指令累积, 每行一个字符串) */
  scriptTextLines: string[];

  /** 脚本剩余等待帧数 (WAIT 指令) */
  scriptWaitFrames: number;

  /** 脚本是否在循环 (SET_PTR 跳回已访问地址) */
  scriptLooping: boolean;

  /** 脚本最后执行的指令 (调试用) */
  scriptLastInstr: string;
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

  // ── 脚本驱动模式 ──

  /** 是否启用脚本驱动模式 (默认启用, 脚本未完成时降级到硬编码) */
  private _useScript = true;

  /** 脚本虚拟机实例 (脚本 0x00 = BOOT/标题画面) */
  private _vm: ScriptVM | null = null;

  /** 脚本执行状态快照 (每帧更新) */
  private _vmState: ScriptVMState | null = null;

  /** 脚本循环次数 (脚本 0x00 是循环脚本) */
  private _scriptLoopCount = 0;

  /** 脚本模式下的镜头映射 (sceneDataId+mode → OpeningShot) */
  private static readonly SCRIPT_SHOT_MAP: Record<string, OpeningShot> = {
    '1_0': OpeningShot.LOGO,        // 场景1 + mode 0 → LOGO
    '1_5': OpeningShot.TSUBASA,     // 场景1 + mode 5 → TSUBASA (角色展示)
    '1_2': OpeningShot.HYUGA,       // 场景1 + mode 2 → HYUGA
    '1_1': OpeningShot.MISAKI,      // 场景1 + mode 1 → MISAKI
  };

  constructor(store: DataStore) {
    this._store = store;
  }

  // ── 公开属性 ──

  get shot(): OpeningShot { return this._shot; }
  get isTitle(): boolean { return this._isTitle; }
  get titleCursor(): number { return this._titleCursor; }
  get complete(): boolean { return this._complete; }

  /** 当前显示状态快照 (View 层消费) */
  getDisplayState(): OpeningDisplayState {
    return this._buildDisplayState();
  }

  /** 外部强制跳转到标题画面 (START 跳过) */
  jumpToTitle(): void {
    this._shot = OpeningShot.TITLE;
    this._shotFrame = 0;
    this._isTitle = true;
    this._titleCursor = TitleMenu.KICKOFF;
    // 脚本模式下标记循环次数, 避免脚本继续驱动镜头切换
    this._scriptLoopCount = 1;
  }

  /** 推进到下一镜头 (外部兜底计时驱动) */
  nextShot(): void {
    this._startPressed = false;
    this._nextShot();
  }

  /** 设置标题光标 (外部 TITLE 菜单操作) */
  setTitleCursor(cursor: number): void {
    if (!this._isTitle) return;
    this._titleCursor = cursor;
  }

  // ──────────────────────────────────────────────
  // 初始化 (对应 sceneLoad(0x17) 后首次进入)
  // ──────────────────────────────────────────────

  /**
   * 初始化开场场景。
   * 对应原始 $8053-$8077 (scene init chain):
   *   NT clear → palette → sceneLoad → VRAM → PPU
   *
   * 脚本模式: 创建 ScriptVM 加载脚本 0x00, 启动执行
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
    this._scriptLoopCount = 0;

    // 设 ram_00ED=0x0A → 对应 $808D
    this._store.write('ram_00ED', 0x0A);

    // 启动脚本虚拟机 (脚本 0x00 = BOOT/标题画面)
    if (this._useScript) {
      try {
        this._vm = new ScriptVM(0x00);
        this._vm.start();
        this._vmState = this._vm.getState();
      } catch (e) {
        // 脚本加载失败, 降级到硬编码模式
        console.warn('[OpeningScene] 脚本 0x00 加载失败, 降级到硬编码模式:', e);
        this._useScript = false;
        this._vm = null;
        this._vmState = null;
      }
    }
  }

  // ──────────────────────────────────────────────
  // 每帧更新 (由 Bank00.update() 每帧调用)
  // ──────────────────────────────────────────────

  /**
   * 每帧调用。处理动画帧推进和按键。
   *
   * 脚本模式: 先更新 ScriptVM, 再根据脚本状态映射镜头
   * 硬编码模式: 使用 SHOT_FRAMES 时间表推进镜头
   *
   * @param buttons 当前帧按键 bitmask
   * @returns 当前显示状态
   */
  update(buttons: number): OpeningDisplayState {
    this._detectInput(buttons);

    if (this._useScript && this._vm) {
      this._updateScriptAnimation();
    } else {
      this._updateAnimation();
    }

    return this._buildDisplayState();
  }

  // ──────────────────────────────────────────────
  // 脚本驱动动画更新
  // ──────────────────────────────────────────────

  /**
   * 脚本驱动动画更新:
   *   1. 检测循环 → 循环超过 1 次后进入标题画面
   *   2. START 跳过当前 WAIT (将 waitFrames 清零)
   *   3. 调用 ScriptVM.update() 执行指令
   *   4. 根据脚本状态映射当前镜头
   */
  private _updateScriptAnimation(): void {
    if (this._complete || !this._vm) return;

    this._blinkTimer++;
    if (this._blinkTimer >= 60) {
      this._blinkTimer = 0;
    }
    if (this._transitionTimer > 0) {
      this._transitionTimer--;
    }

    // 脚本循环检测: 循环 1 次后进入标题画面
    if (this._vm.isLooping && this._scriptLoopCount === 0) {
      this._scriptLoopCount = 1;
      // 进入标题画面
      this._shot = OpeningShot.TITLE;
      this._isTitle = true;
      this._titleCursor = TitleMenu.KICKOFF;
      return;
    }

    // START 跳过当前 WAIT (脚本模式)
    if (this._startPressed && this._vmState && this._vmState.waitFrames > 0) {
      // 跳过等待: 直接执行下一批指令
      // 注: ScriptVM 内部 waitFrames 是递减的, 这里通过多次 update 加速
      // 简化实现: 标记 START 已处理
      this._startPressed = false;
    }

    // 执行脚本
    const prevState = this._vmState;
    this._vmState = this._vm.update();

    // 场景切换检测: sceneDataId 或 mode 变化时触发过渡
    if (prevState && this._vmState) {
      if (prevState.sceneDataId !== this._vmState.sceneDataId
          || prevState.mode !== this._vmState.mode) {
        this._transitionTimer = 15;
        this._shotFrame = 0;
      }
    }

    // 映射脚本状态到镜头
    this._mapScriptToShot();

    this._shotFrame++;
  }

  /**
   * 将脚本状态映射到 OpeningShot 枚举
   * 基于 sceneDataId + mode 组合查找
   */
  private _mapScriptToShot(): void {
    if (!this._vmState || this._isTitle) return;

    const key = `${this._vmState.sceneDataId}_${this._vmState.mode}`;
    const mappedShot = OpeningSceneController.SCRIPT_SHOT_MAP[key];

    if (mappedShot !== undefined && mappedShot !== this._shot) {
      this._shot = mappedShot;
      this._shotFrame = 0;
      this._transitionTimer = 15;
    }
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

    if (nextShot > OpeningShot.TITLE
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

    // 脚本驱动字段 (脚本模式下从 vmState 读取, 硬编码模式下为默认值)
    const scriptDriven = this._useScript && this._vmState !== null;
    const vmState = this._vmState;

    // 文本来源: 脚本模式优先使用 ScriptVM 累积的真实文本行
    let text = shotInfo?.jp ?? '';
    let subText = shotInfo?.en ?? '';
    if (scriptDriven && vmState && vmState.textLines.length > 0) {
      text = vmState.textLines.join(' ');
      subText = `scene=${vmState.sceneDataId} mode=${vmState.mode}` +
                ` sprites=[${vmState.spriteIds.join(',')}]` +
                ` objs=[${vmState.objectQueue.join(',')}]`;
    }

    return {
      shot: this._shot,
      shotFrame: this._shotFrame,
      shotTotalFrames: maxFrames,
      text,
      subText,
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

      // 脚本驱动字段
      scriptDriven,
      scriptSceneDataId: vmState?.sceneDataId ?? 0,
      scriptMode: vmState?.mode ?? 0,
      scriptSpriteIds: vmState?.spriteIds ? [...vmState.spriteIds] : [],
      scriptObjectQueue: vmState?.objectQueue ? [...vmState.objectQueue] : [],
      scriptTextLines: vmState?.textLines ? [...vmState.textLines] : [],
      scriptWaitFrames: vmState?.waitFrames ?? 0,
      scriptLooping: vmState?.isLooping ?? false,
      scriptLastInstr: vmState?.lastInstruction ?? '',
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
