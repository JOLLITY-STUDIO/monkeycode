/**
 * InputSystem.ts — 键盘/触摸 → Sega Genesis 6-btn 控制器映射
 *
 * 将浏览器输入事件映射为 Genesis 控制器的位掩码状态
 *
 * Sega Genesis 控制器 (读取 $A10003 → $FFFF8178/79):
 *   bit0 = ↑ (UP)
 *   bit1 = ↓ (DOWN)
 *   bit2 = ← (LEFT)
 *   bit3 = → (RIGHT)
 *   bit4 = B     — 游戏中主要用途: 取消/返回
 *   bit5 = C     — 游戏中主要用途: 回合结束/模式切换
 *   bit6 = A     — 游戏中主要用途: 确认/选择
 *   bit7 = START — 游戏中主要用途: 机能菜单/跳过动画
 *
 * 按键历史 (秘籍检测用, ROM 逻辑:
 *   $FFFF8188: 31 字节环形缓冲区, 记录每次按键状态变更
 *   $FFFF81A7: 上一帧按键状态
 *   VBlank 全局 → FUN_00009498 → 秘籍序列匹配 (execution-trace.md §II)
 *
 * 资料来源:
 *   execution-trace.md §第四部分 §按键映射
 *   rom.asm §按键检测逻辑
 *   CheatSystem.ts §秘籍序列定义
 */

// ============================================================================
// Genesis 按钮位定义
// ============================================================================

/** Sega Genesis 6-btn 控制器按钮位 */
export const enum Button {
  UP    = 0x01,  // bit0
  DOWN  = 0x02,  // bit1
  LEFT  = 0x04,  // bit2
  RIGHT = 0x08,  // bit3
  B     = 0x10,  // bit4 — 取消/返回
  C     = 0x20,  // bit5 — 回合结束/模式切换
  A     = 0x40,  // bit6 — 确认/选择
  START = 0x80,  // bit7 — 机能菜单/跳过
}

/** D-pad 方向组合掩码 */
export const DPAD_MASK = Button.UP | Button.DOWN | Button.LEFT | Button.RIGHT;

// ============================================================================
// 键盘映射 (PC 键盘 → Genesis 按钮)
// ============================================================================

export interface KeyMapping {
  up: string[];
  down: string[];
  left: string[];
  right: string[];
  a: string[];
  b: string[];
  c: string[];
  start: string[];
}

/** 默认键盘布局 — 左手 WASD + 右手 ZXC/Enter */
export const DEFAULT_KEYS: KeyMapping = {
  up:    ['ArrowUp', 'KeyW'],
  down:  ['ArrowDown', 'KeyS'],
  left:  ['ArrowLeft', 'KeyA'],
  right: ['ArrowRight', 'KeyD'],
  a:     ['KeyZ', 'KeyJ'],      // 确认
  b:     ['KeyX', 'KeyK'],      // 取消
  c:     ['KeyC', 'KeyL'],      // 回合结束
  start: ['Enter', 'Space'],    // 菜单/跳过
};

// ============================================================================
// 输入状态
// ============================================================================

export interface InputState {
  /** 当前帧按钮状态 (对应 $FFFF8178) */
  current: number;
  /** 上一帧按钮状态 (对应 $FFFF81A7) */
  previous: number;
  /** 按钮历史缓冲区 (对应 $FFFF8188, 31-byte sliding window) */
  history: number[];
  /** 历史缓冲区最大长度 */
  historySize: number;
}

/**
 * 创建输入状态对象
 * @param historySize 历史缓冲区长度 (默认 31, 匹配 ROM)
 */
export function createInputState(historySize: number = 31): InputState {
  return {
    current: 0,
    previous: 0,
    history: new Array(historySize).fill(0),
    historySize,
  };
}

// ============================================================================
// Mapper — 输入映射器 (核心类)
// ============================================================================

export class Mapper {
  private mapping: KeyMapping;
  /** 当前按下的键盘按键集合 (KeyboardEvent.code) */
  private pressedKeys: Set<string> = new Set();
  /** 输入状态 (current/previous/history) */
  private state: InputState;

  /**
   * 创建输入映射器
   * @param mapping 自定义键位映射 (合并到 DEFAULT_KEYS)
   */
  constructor(mapping?: Partial<KeyMapping>) {
    this.mapping = { ...DEFAULT_KEYS, ...mapping };
    this.state = createInputState();
  }

  /**
   * 绑定键盘事件到 DOM
   * @param el 目标元素 (默认 document)
   */
  attach(el: Document | HTMLElement = globalThis.document): void {
    el.addEventListener('keydown', this._onKeyDown);
    el.addEventListener('keyup', this._onKeyUp);
    el.addEventListener('blur', this._onBlur);  // 窗口失焦时清空按键状态
  }

  /**
   * 解绑键盘事件
   */
  detach(el: Document | HTMLElement = globalThis.document): void {
    el.removeEventListener('keydown', this._onKeyDown);
    el.removeEventListener('keyup', this._onKeyUp);
    el.removeEventListener('blur', this._onBlur);
  }

  // ============================================================================
  // 每帧轮询 (必须每帧调用一次)
  // ============================================================================

  /**
   * 轮询当前按钮状态 — 必须在 gameLoop 每帧开头调用一次
   *
   * 原理:
   *   1. 检查所有映射按键, 构建位掩码
   *   2. 移位 previous → current
   *   3. 如果状态变更, 追加到 history 滑动窗口 (秘籍检测用)
   *
   * @returns 当前帧按钮位掩码 (0x00-0xFF)
   */
  poll(): number {
    let buttons = 0;

    // 逐位检测键盘按键 → 构建 Genesis 控制器位掩码
    if (this._isPressed(this.mapping.up))     buttons |= Button.UP;
    if (this._isPressed(this.mapping.down))   buttons |= Button.DOWN;
    if (this._isPressed(this.mapping.left))   buttons |= Button.LEFT;
    if (this._isPressed(this.mapping.right))  buttons |= Button.RIGHT;
    if (this._isPressed(this.mapping.a))      buttons |= Button.A;
    if (this._isPressed(this.mapping.b))      buttons |= Button.B;
    if (this._isPressed(this.mapping.c))      buttons |= Button.C;
    if (this._isPressed(this.mapping.start))  buttons |= Button.START;

    // 移位: 当前帧 → 上一帧
    this.state.previous = this.state.current;
    this.state.current = buttons;

    // 更新历史缓冲区 (ROM 逻辑: 仅状态变更时记录, 左移滑动窗口)
    // 对应 ROM $00885E 逻辑
    if (buttons !== this.state.previous) {
      for (let i = 0; i < this.state.historySize - 1; i++) {
        this.state.history[i] = this.state.history[i + 1];
      }
      this.state.history[this.state.historySize - 1] = buttons;
    }

    return buttons;
  }

  /** 获取当前完整的输入状态 (含历史, 供秘籍检测使用) */
  getState(): InputState {
    return this.state;
  }

  // ============================================================================
  // 按钮检测 API (场景 update() 中调用)
  // ============================================================================

  /**
   * 检测按钮是否**持续按下** (每帧都触发)
   * 用途: 方向键移动光标、蓄力操作
   */
  isDown(button: Button): boolean {
    return (this.state.current & button) !== 0;
  }

  /**
   * 检测按钮是否**刚按下 (本帧首次)** (上升沿)
   * 用途: 菜单确认、触发一次性动作
   */
  justPressed(button: Button): boolean {
    return (this.state.current & button) !== 0
        && (this.state.previous & button) === 0;
  }

  /**
   * 检测按钮是否**刚松开 (本帧释放)** (下降沿)
   * 用途: 松开确认、触发结束动作
   */
  justReleased(button: Button): boolean {
    return (this.state.current & button) === 0
        && (this.state.previous & button) !== 0;
  }

  /**
   * 获取方向向量 {x, y}
   * @returns x: -1(左)/0/+1(右), y: -1(上)/0/+1(下)
   */
  getDirection(): { x: number; y: number } {
    let x = 0, y = 0;
    if (this.state.current & Button.LEFT)  x -= 1;
    if (this.state.current & Button.RIGHT) x += 1;
    if (this.state.current & Button.UP)    y -= 1;
    if (this.state.current & Button.DOWN)  y += 1;
    return { x, y };
  }

  /** 检测是否有任意按钮被按下 (本帧首次) — 用途: 跳过动画 */
  isAnyJustPressed(): boolean {
    return this.state.current !== 0 && this.state.previous === 0;
  }

  /** 设置自定义键位 */
  setMapping(mapping: Partial<KeyMapping>): void {
    this.mapping = { ...this.mapping, ...mapping };
  }

  // ============================================================================
  // Private: DOM 事件处理
  // ============================================================================

  /** 检查任一映射按键是否被按下 */
  private _isPressed(keys: string[]): boolean {
    return keys.some(k => this.pressedKeys.has(k));
  }

  private _onKeyDown = (e: KeyboardEvent): void => {
    this.pressedKeys.add(e.code);
    e.preventDefault();  // 阻止浏览器默认行为 (如 Space 滚动页面)
  };

  private _onKeyUp = (e: KeyboardEvent): void => {
    this.pressedKeys.delete(e.code);
  };

  /** 窗口失焦 → 清空所有按键 (避免"按住" bug) */
  private _onBlur = (): void => {
    this.pressedKeys.clear();
    this.state.current = 0;
  };
}

// ============================================================================
// 按钮名称显示工具
// ============================================================================

const BUTTON_NAMES: Record<number, string> = {
  0x01: '↑', 0x02: '↓', 0x04: '←', 0x08: '→',
  0x10: 'B', 0x20: 'C', 0x40: 'A', 0x80: 'START',
};

/** 单个按钮位 → 显示字符串 (如 Button.UP → '↑') */
export function buttonToString(code: number): string {
  return BUTTON_NAMES[code] || `0x${code.toString(16)}`;
}

/** 按钮位掩码 → 可读的按钮组合字符串 (如 0x41 → '↑ A') */
export function buttonsToString(buttons: number): string {
  const parts: string[] = [];
  for (const [bit, name] of Object.entries(BUTTON_NAMES)) {
    if (buttons & parseInt(bit)) parts.push(name);
  }
  return parts.length > 0 ? parts.join(' ') : '-';
}
