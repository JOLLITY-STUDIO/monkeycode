// ============================================================================
// input.ts — 手柄输入 (纯 TS, 无 NES 依赖)
//
// NES 标准手柄: 8 按钮
//   bit 0: A
//   bit 1: B
//   bit 2: Select
//   bit 3: Start
//   bit 4: Up
//   bit 5: Down
//   bit 6: Left
//   bit 7: Right
// ============================================================================

/** 键盘 → NES 按钮映射 (默认) */
const DEFAULT_KEY_MAP: Record<string, number> = {
  'KeyZ':    1,   // A
  'KeyX':    2,   // B
  'ShiftRight': 4, // Select
  'Enter':   8,   // Start
  'ArrowUp':     16,
  'ArrowDown':   32,
  'ArrowLeft':   64,
  'ArrowRight':  128,
};

/** 手柄状态 */
export interface JoypadState {
  /** 当前按下的按钮掩码 */
  mask: number;
  /** strobe 模式下读取到的索引 */
  readIdx: number;
  /** 是否在 strobe 模式 */
  strobe: boolean;
}

/** 创建手柄状态 */
export function createJoypad(): JoypadState {
  return { mask: 0, readIdx: 0, strobe: false };
}

/**
 * 读 16406 (手柄 1 数据)
 * 标准 NES 手柄: 每次读返回 1 bit (加上 bit 6=1 表示标准手柄)
 */
export function readJoy1(jp: JoypadState): number {
  if (jp.strobe) {
    // strobe 模式下持续报告 A 按钮状态
    return ((jp.mask & 1) ? 1 : 0) | 64;
  }
  if (jp.readIdx < 8) {
    const bit = (jp.mask >> jp.readIdx) & 1;
    jp.readIdx++;
    return bit | 64;
  }
  return 65; // 全部读完后返回 1
}

/**
 * 写 16406 (strobe)
 */
export function writeJoyStrobe(jp: JoypadState, val: number): void {
  jp.strobe = (val & 1) !== 0;
  if (jp.strobe) {
    jp.readIdx = 0;
  }
}

/**
 * 设置手柄掩码 (外部调用)
 */
export function setJoyMask(jp: JoypadState, mask: number): void {
  jp.mask = mask;
}

/**
 * 从键盘事件更新手柄掩码
 */
export function updateFromKeyboard(jp: JoypadState): void {
  jp.mask = 0;
  // 浏览器下用 navigator 检测按键
  // 小程序下由外部传入
}

/**
 * 绑定键盘事件 (浏览器)
 * @returns 解绑函数
 */
export function bindKeyboard(jp: JoypadState): () => void {
  const onKey = (e: KeyboardEvent, down: boolean) => {
    const bit = DEFAULT_KEY_MAP[e.code];
    if (bit !== undefined) {
      if (down) jp.mask |= bit;
      else jp.mask &= ~bit;
      e.preventDefault();
    }
  };

  const onDown = (e: KeyboardEvent) => onKey(e, true);
  const onUp = (e: KeyboardEvent) => onKey(e, false);

  window.addEventListener('keydown', onDown);
  window.addEventListener('keyup', onUp);

  return () => {
    window.removeEventListener('keydown', onDown);
    window.removeEventListener('keyup', onUp);
  };
}
