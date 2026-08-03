/**
 * 输入管理器
 * 映射键盘 → NES 手柄按键
 * 模拟 $4016/$4017 读取协议
 */

/** NES 手柄按键 */
export enum Button {
  A      = 0,
  B      = 1,
  SELECT = 2,
  START  = 3,
  UP     = 4,
  DOWN   = 5,
  LEFT   = 6,
  RIGHT  = 7,
}

/** 按键位掩码 */
const BUTTON_MASK: Record<Button, number> = {
  [Button.A]:      0x01,
  [Button.B]:      0x02,
  [Button.SELECT]: 0x04,
  [Button.START]:  0x08,
  [Button.UP]:     0x10,
  [Button.DOWN]:   0x20,
  [Button.LEFT]:   0x40,
  [Button.RIGHT]:  0x80,
};

/** 默认键盘映射 */
const DEFAULT_KEY_MAP: Record<string, Button> = {
  // 玩家1
  'ArrowUp':    Button.UP,
  'ArrowDown':  Button.DOWN,
  'ArrowLeft':  Button.LEFT,
  'ArrowRight': Button.RIGHT,
  'KeyZ':       Button.A,
  'KeyX':       Button.B,
  'Enter':      Button.START,
  'ShiftRight': Button.SELECT,
};

export class InputManager {
  /** 当前帧按键状态 (每个 bit 对应一个按键) */
  currentState: number = 0;

  /** 前一帧按键状态 */
  previousState: number = 0;

  /** 键盘按键状态 */
  private keysDown: Set<string> = new Set();

  /** 键盘映射 */
  private keyMap: Record<string, Button>;

  /** 已绑定的事件处理器 (用于解绑) */
  private onKeyDown: (e: KeyboardEvent) => void;
  private onKeyUp: (e: KeyboardEvent) => void;

  constructor(keyMap?: Record<string, Button>) {
    this.keyMap = keyMap ?? { ...DEFAULT_KEY_MAP };

    this.onKeyDown = (e: KeyboardEvent) => {
      this.keysDown.add(e.code);
      e.preventDefault();
    };

    this.onKeyUp = (e: KeyboardEvent) => {
      this.keysDown.delete(e.code);
      e.preventDefault();
    };
  }

  /** 绑定键盘事件 */
  attach(): void {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  /** 解绑键盘事件 */
  detach(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  /**
   * 更新一帧输入
   * 对应 NES 中 $81B9 的手柄读取逻辑
   */
  update(): void {
    // 保存上一帧状态
    this.previousState = this.currentState;

    // 读取当前键盘状态
    this.currentState = 0;
    for (const [code, button] of Object.entries(this.keyMap)) {
      if (this.keysDown.has(code)) {
        this.currentState |= BUTTON_MASK[button];
      }
    }
  }

  /** 检测按键是否在本帧刚按下 (上升沿) */
  isPressed(button: Button): boolean {
    const mask = BUTTON_MASK[button];
    return (this.currentState & mask) !== 0 &&
           (this.previousState & mask) === 0;
  }

  /** 检测按键是否按住 */
  isHeld(button: Button): boolean {
    const mask = BUTTON_MASK[button];
    return (this.currentState & mask) !== 0;
  }

  /** 检测按键是否在本帧刚释放 (下降沿) */
  isReleased(button: Button): boolean {
    const mask = BUTTON_MASK[button];
    return (this.currentState & mask) === 0 &&
           (this.previousState & mask) !== 0;
  }

  /** 检测任意方向键是否按下 */
  isAnyDirection(): boolean {
    return this.isHeld(Button.UP) ||
           this.isHeld(Button.DOWN) ||
           this.isHeld(Button.LEFT) ||
           this.isHeld(Button.RIGHT);
  }

  /** 获取当前帧手柄状态值 (用于写入 $0301) */
  getStateByte(): number {
    return this.currentState;
  }

  /** 获取上一帧手柄状态值 (用于写入 $0302) */
  getPreviousStateByte(): number {
    return this.previousState;
  }
}
