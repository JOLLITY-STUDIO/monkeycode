/**
 * CheatSystem.ts — Langrisser II 秘籍/隐藏功能系统 (TypeScript版)
 *
 * 基于 ROM dump 逆向工程, 逐一对应 68K ASM 源码:
 *   - 序列匹配器: loc_008A20 (ROM $008A20)
 *   - 秘籍映射表: ROM $00861C / $008630 / $008636 / $00864C / $00D7C6 / $02A232
 *   - 按键历史缓冲区: RAM $FFFF8188 (31 bytes)
 *   - 调用点: VBLANK ($0082B8)、LOAD画面 ($02A048)、地图画面 ($00D798)
 *
 * 数据来源:
 *   - rom.asm (sega2asm 反汇编, 19MB)
 *   - Langrisser II (Japan).md (原始 ROM, 2MB)
 *   - Langrisser专题站·梦幻模拟战Ⅱ·秘计偏方.html (粉丝整理)
 *
 * Sega Genesis 控制器按键位定义 (Joypad 1, 读取自 $A10003 后存放于 $FFFF8178/$FFFF8179):
 *   bit0 = ↑ (Up)
 *   bit1 = ↓ (Down)
 *   bit2 = ← (Left)
 *   bit3 = → (Right)
 *   bit4 = B
 *   bit5 = C
 *   bit6 = A
 *   bit7 = START
 */

// ============================================================================
// 1. 控制器按键位定义
// ============================================================================

export const enum Button {
  UP    = 0x01,
  DOWN  = 0x02,
  LEFT  = 0x04,
  RIGHT = 0x08,
  B     = 0x10,
  C     = 0x20,
  A     = 0x40,
  START = 0x80,
}

/** 按钮名称映射 */
export const BUTTON_NAMES: Record<number, string> = {
  0x01: '↑',  0x02: '↓',  0x04: '←',  0x08: '→',
  0x10: 'B',  0x20: 'C',  0x40: 'A',  0x80: 'START',
};

// ============================================================================
// 2. 秘籍序列定义 (ROM 原始数据 → 可读格式)
// ============================================================================

/**
 * 秘籍表条目结构 (对应 ROM 中序列匹配器的数据格式)
 *
 * ROM 格式: [word: byteCount] [count bytes: 交替按下/松开] [byte: postConditionMask]
 * - byteCount: 序列字节总数 (按下+松开交替, 每次按键变化占 1 byte)
 * - postCondition: 0=无额外条件, 非0=当前帧必须按住对应按键
 *
 * 注意: ROM 中原始数据包含"松开"(0x00)字节, 因为按键历史记录每次状态变更
 *       (按下和松开各产生一条记录)。但实际只需要连续按下按键即可触发。
 */
export interface CheatDefinition {
  /** ROM 表地址 */
  romAddr: number;
  /** 秘籍名称 */
  name: string;
  /** 描述 */
  description: string;
  /** 触发位置 */
  triggerContext: string;
  /** 按钮序列 (仅按下, 不含松开中间态) */
  sequence: number[];
  /** 序列字节数 (含松开, ROM 中 count 字段值) */
  byteCount: number;
  /** 最终条件: 需同时按住哪些按键 (0=无) */
  postCondition: number;
  /** 触发后的效果说明 */
  effect: string;
}

/**
 * ROM ROM_ADDR_CHEATS 中所有秘籍表
 *
 * 表格式: [word:长度] [长度 bytes: 按键历史序列] [byte: 最终按键条件]
 *
 * 按键历史序列中, 每个"按下"后跟一个"松开"(0x00),
 * 因为 $FFFF8188 记录每次按键状态变更。
 */
export const CHEAT_DEFINITIONS: CheatDefinition[] = [
  // --------------------------------------------------------------------------
  // 1. 隐藏商店 (Hidden Shop 1)
  // ROM: $008636 → 调用点: VBLANK handler ($0082B8, line 22485-22497)
  //
  // 按下序列 (不含松开): A B A B ↑ ↓ ← → START B
  // ROM 原始: 40 00 10 00 40 00 10 00 01 00 02 00 04 00 08 00 80 00 10
  // byteCount: 19 (0x13), postCondition: 00 (无)
  // 成功后: $FFFFA6DC = 1, $FFFFA6DA = $65
  // --------------------------------------------------------------------------
  {
    romAddr: 0x008636,
    name: '隐藏商店',
    description: '兵士配置画面输入 A B A B ↑ ↓ ← → START B',
    triggerContext: 'VBLANK 中断 (全局检测)',
    sequence: [Button.A, Button.B, Button.A, Button.B, Button.UP, Button.DOWN,
               Button.LEFT, Button.RIGHT, Button.START, Button.B],
    byteCount: 0x13,
    postCondition: 0x00,
    effect: '商店出售通常买不到的物品 (A6DC=1, shop ID=$65)',
  },

  // --------------------------------------------------------------------------
  // 2. 真·隐藏商店 (True Hidden Shop 2)
  // ROM: $00864C → 调用点: VBLANK handler ($0082B8, line 22500-22512)
  //
  // 按下序列: B START → ← ↓ ↑ B A B A ↑ ↓ ← → START (最后按住 START)
  // ROM 原始: 10 00 80 00 08 00 04 00 02 00 01 00 10 00 40 00 10 00 40 00 01 00 02 00 04 00 08 00 80
  // byteCount: 29 (0x1D), postCondition: 80 (START)
  // 成功后: $FFFFA6DC = 2, $FFFFA6DA = $5C
  // --------------------------------------------------------------------------
  {
    romAddr: 0x00864C,
    name: '真·隐藏商店',
    description: 'B START → ← ↓ ↑ B A B A ↑ ↓ ← → START (最后按住 START)',
    triggerContext: 'VBLANK 中断 (全局检测)',
    sequence: [Button.B, Button.START, Button.RIGHT, Button.LEFT, Button.DOWN,
               Button.UP, Button.B, Button.A, Button.B, Button.A, Button.UP,
               Button.DOWN, Button.LEFT, Button.RIGHT, Button.START],
    byteCount: 0x1D,
    postCondition: Button.START,
    effect: '商店出售更稀有的物品 (A6DC=2, shop ID=$5C)',
  },

  // --------------------------------------------------------------------------
  // 3. 剧本选择 (Scenario Select)
  // ROM: $02A232 → 调用点: LOAD画面 handler ($02A048, line 94068-94076)
  //
  // 按下序列: ← → START C
  // ROM 原始: 04 00 08 00 80 00 20
  // byteCount: 7 (0x07), postCondition: 00 (无)
  //
  // 成功后将 $FFFFA49C (当前场景号) 存入 $FFFFA612 (选关索引),
  // 然后进入场景选择 UI (↑/↓ 调整 1-31)
  // --------------------------------------------------------------------------
  {
    romAddr: 0x02A232,
    name: '剧本选择',
    description: 'LOAD画面输入 ← → START C',
    triggerContext: 'LOAD/存档画面处理器 ($02A048)',
    sequence: [Button.LEFT, Button.RIGHT, Button.START, Button.C],
    byteCount: 0x07,
    postCondition: 0x00,
    effect: '可自由选择任意已解锁的剧本 (关卡1-31)',
  },

  // --------------------------------------------------------------------------
  // 4. 调试模式 (Debug Mode)
  // ROM: $00D7C6 → 调用点: 地图画面处理器 ($00D798, line 34622-34636)
  //
  // 按下序列: ↑ ← ↑ → A ← ↓ B ↓ → A B ↓ → A (最后按住 A)
  // ROM 原始: 01 00 04 00 01 00 08 00 40 00 04 00 02 00 10 00 02 00 08 00 40 00 10 00 02 00 08 00 40
  // byteCount: 34 (0x22), postCondition: 40 (A)
  //
  // 成功后:
  //   1. eori.b #$C7, ($01FFFF).l — 翻转调试标志字节
  //   2. $FFFFA6DA = $46 — 播放确认音效
  //   3. 调用 loc_00FD7A — 初始化调试状态
  //
  // 效果: 无限制移动, 全魔法可用, 全召唤兽, MP无限
  // --------------------------------------------------------------------------
  {
    romAddr: 0x00D7C6,
    name: '调试模式',
    description: '地图画面输入 ↑ ← ↑ → A ← ↓ B ↓ → A B ↓ → A (最后按住 A)',
    triggerContext: '地图画面主处理器 ($00D798)',
    sequence: [Button.UP, Button.LEFT, Button.UP, Button.RIGHT, Button.A,
               Button.LEFT, Button.DOWN, Button.B, Button.DOWN, Button.RIGHT,
               Button.A, Button.B, Button.DOWN, Button.RIGHT, Button.A],
    byteCount: 0x22,
    postCondition: Button.A,
    effect: '调试模式: 无限制移动, 所有魔法可用, 全召唤兽, MP无限',
  },

  // --------------------------------------------------------------------------
  // 5. 音响测试 (Sound Test)
  // 非序列匹配器实现!
  // 检测逻辑: 地图画面上, 光标位于 (2,2) 且 B 键按住 2 秒以上
  // 这是定时器+位置+按键组合检测, 不走 loc_008A20 序列匹配器
  // TODO: 需确认具体 ROM 地址中的定时器和光标检查代码
  // --------------------------------------------------------------------------
  {
    romAddr: 0x000000, // 待定位
    name: '音响测试',
    description: '地图画面光标移至 (2,2), 按住 B 键 2 秒以上',
    triggerContext: '地图画面 (定时器+位置检查)',
    sequence: [], // 非序列检测, 是定时器方式
    byteCount: 0,
    postCondition: 0x00,
    effect: '进入音响测试画面, 可试听所有 BGM 和音效',
  },
];

// ============================================================================
// 3. 秘籍序列匹配器 (对应 ROM loc_008A20)
// ============================================================================

/**
 * 按钮输入历史缓冲区
 *
 * 对应 RAM $FFFF8188:
 * - 大小: 31 bytes
 * - 记录每次按键状态变更 (按下时存按键字节, 松开时存 0x00)
 * - 滑动窗口: 新数据从右侧插入, 左侧数据移出
 *
 * 当 $FFFF8178 (当前帧按键) != $FFFF81A7 (上一帧按键) 时,
 * 新状态写入缓冲区末尾并更新 $FFFF81A7。
 */
export interface ButtonHistory {
  /** 31-byte 环形缓冲区 */
  buffer: number[];
  /** 上一帧按键状态 (用于变更检测, 对应 RAM $FFFF81A7) */
  prevState: number;
  /** 缓冲区最大长度 */
  readonly maxSize: number;
}

export function createButtonHistory(maxSize: number = 31): ButtonHistory {
  return {
    buffer: new Array(maxSize).fill(0),
    prevState: 0,
    maxSize,
  };
}

/**
 * 记录按键状态变更到历史缓冲区
 *
 * 对应 VBLANK 中断中 $00885E-$00886C 的逻辑:
 * 1. 比较当前按键与上一帧按键
 * 2. 如果不同, 把缓冲区全部左移 1 字节
 * 3. 新状态写入缓冲区末尾
 * 4. 更新 prevState
 */
export function recordButtonChange(history: ButtonHistory, currentState: number): void {
  if (currentState === history.prevState) return;

  // 左移缓冲区 (模拟 68K 的 (a2)+,(a1)+ 循环)
  for (let i = 0; i < history.maxSize - 1; i++) {
    history.buffer[i] = history.buffer[i + 1];
  }
  history.buffer[history.maxSize - 1] = currentState;
  history.prevState = currentState;
}

/**
 * 序列匹配器 — 核心检测算法
 *
 * 对应 ROM loc_008A20 (line 23304-23347):
 *
 * 算法:
 *   1. 读取表头的 word 作为序列长度 L
 *   2. 定位到按键历史缓冲区中 [maxSize - L] 位置
 *   3. 从该位置开始, 逐字节比较缓冲区与表中序列
 *   4. 全部匹配后, 检查当前帧按键是否满足 postCondition
 *   5. 返回匹配结果
 *
 * 68K 伪代码:
 *   moveq #32,d0
 *   move.w (a0)+,d1        ; d1 = 表长度
 *   sub.w d1,d0             ; offset = 32 - length
 *   lea ($FFFF8188).w,a1
 *   adda.w d0,a1            ; 定位到缓冲区
 *   subq.w #1,d1
 *   LOOP:
 *     move.b (a1)+,d0
 *     cmp.b (a0)+,d0
 *     bne FAIL
 *     dbf d1,LOOP
 *   move.b (a0),d1          ; 读 postCondition
 *   beq SUCCESS
 *   move.b ($FFFF8179).w,d0 ; 当前按键状态
 *   and.w d1,d0
 *   beq FAIL
 *   SUCCESS: (Z=0)
 *
 * @param cheatTable ROM 中秘籍表数据 (Uint8Array)
 * @param tableAddr 表在 ROM 中的基址
 * @param history 按键历史缓冲区
 * @param currentButtons 当前帧按键状态 (对应 $FFFF8179)
 * @returns true 表示序列匹配成功
 */
export function matchCheatSequence(
  cheatTable: Uint8Array,
  tableAddr: number,
  history: ButtonHistory,
  currentButtons: number,
): boolean {
  // 读取 count word (大端)
  const count = ((cheatTable[tableAddr] << 8) | cheatTable[tableAddr + 1]) >>> 0;

  // 计算历史缓冲区中的起始偏移
  const offset = history.maxSize - count;

  // 逐字节比较
  for (let i = 0; i < count; i++) {
    if (history.buffer[offset + i] !== cheatTable[tableAddr + 2 + i]) {
      return false;
    }
  }

  // 检查最终条件
  const postCondition = cheatTable[tableAddr + 2 + count];
  if (postCondition !== 0) {
    if ((currentButtons & postCondition) === 0) {
      return false;
    }
  }

  return true;
}

// ============================================================================
// 4. 秘籍触发 — 高层检测函数
// ============================================================================

/**
 * 秘籍触发类型
 */
export type CheatTrigger =
  | { type: 'hidden_shop_1'; shopId: number }
  | { type: 'hidden_shop_2'; shopId: number }
  | { type: 'scenario_select'; currentScenario: number }
  | { type: 'debug_mode' }
  | { type: 'sound_test' };

/**
 * CheatResult 包含匹配到的秘籍及其效果
 */
export interface CheatResult {
  definition: CheatDefinition;
  trigger: CheatTrigger;
}

/**
 * VBLANK 秘籍检测 (对应 VBLANK handler $0082B8 中的 4 个序列检测)
 *
 * 检测顺序:
 *   1. $00861C → 切换 debug 层 1 标志 ($FFFF8174)
 *   2. 如果 $FFFF8174 已设置:
 *      a. $008630 → 切换 debug 层 2 标志 ($FFFF8176)
 *      b. 如果 $FFFF8176 已设置: 强制开启 A 按钮
 *   3. 如果 $FFFF8174 未设置:
 *      a. $008636 → 隐藏商店 1 (A6DC=1, shop $65)
 *      b. $00864C → 真隐藏商店 (A6DC=2, shop $5C)
 *
 * @param rom ROM buffer
 * @param history 按键历史
 * @param currentButtons 当前按键
 * @returns 匹配结果数组 (可能有 0 或多个匹配)
 */
export function checkVBlankCheats(
  rom: Uint8Array,
  history: ButtonHistory,
  currentButtons: number,
): CheatResult[] {
  const results: CheatResult[] = [];
  // 转换为 ROM 地址空间 (ROM 从 0 开始)
  const romView = new Uint8Array(rom);

  // 检测隐藏商店 1 ($008636)
  if (matchCheatSequence(romView, 0x008636, history, currentButtons)) {
    results.push({
      definition: CHEAT_DEFINITIONS[0],
      trigger: { type: 'hidden_shop_1', shopId: 0x65 },
    });
  }

  // 检测真隐藏商店 ($00864C)
  if (matchCheatSequence(romView, 0x00864C, history, currentButtons)) {
    results.push({
      definition: CHEAT_DEFINITIONS[1],
      trigger: { type: 'hidden_shop_2', shopId: 0x5C },
    });
  }

  return results;
}

/**
 * LOAD 画面秘籍检测 (Scenario Select)
 *
 * 对应 LOAD 画面 handler $02A048:
 *   lea ($02A232).l,a0
 *   jsr ($008A20).l
 *   成功后: $FFFFA612 = $FFFFA49C (当前场景号 → 选关索引)
 *
 * @param rom ROM buffer
 * @param history 按键历史
 * @param currentButtons 当前按键
 * @param currentScenario 当前场景号 (从 $FFFFA49C 读取)
 * @returns 匹配结果
 */
export function checkLoadScreenCheat(
  rom: Uint8Array,
  history: ButtonHistory,
  currentButtons: number,
  currentScenario: number,
): CheatResult | null {
  const romView = new Uint8Array(rom);

  if (matchCheatSequence(romView, 0x02A232, history, currentButtons)) {
    return {
      definition: CHEAT_DEFINITIONS[2],
      trigger: { type: 'scenario_select', currentScenario },
    };
  }
  return null;
}

/**
 * 地图画面秘籍检测 (Debug Mode)
 *
 * 对应地图画面函数 $00D798:
 *   lea ($00D7C6).l,a0
 *   jsr ($008A20).l
 *   成功后: 翻转调试标志 + 播放音效 $46
 *
 * @param rom ROM buffer
 * @param history 按键历史
 * @param currentButtons 当前按键
 * @returns 匹配结果
 */
export function checkMapScreenCheat(
  rom: Uint8Array,
  history: ButtonHistory,
  currentButtons: number,
): CheatResult | null {
  const romView = new Uint8Array(rom);

  if (matchCheatSequence(romView, 0x00D7C6, history, currentButtons)) {
    return {
      definition: CHEAT_DEFINITIONS[3],
      trigger: { type: 'debug_mode' },
    };
  }
  return null;
}

// ============================================================================
// 5. 音响测试检测 (Sound Test — 定时器+位置检测, 非序列匹配)
// ============================================================================

/**
 * 音响测试检测器状态
 *
 * 检测逻辑 (待 ROM 地址确认):
 *   - 地图画面上检查光标位置 (x=2, y=2)
 *   - B 键按住超过 120 帧 (约 2 秒)
 *   - 两者同时满足 → 进入音响测试
 *
 * 对应：
 *   - 光标 X: $FFFFA6DE / $FFFFA5B0
 *   - 光标 Y: $FFFFA6E0 / $FFFFA5B2
 *   - 帧计数器: $FFFF815C (每 VBLANK +1)
 */
export interface SoundTestDetector {
  /** B 键开始按下的帧计数 */
  bHoldStartFrame: number;
  /** B 键是否正在监控 */
  isMonitoring: boolean;
}

export function createSoundTestDetector(): SoundTestDetector {
  return { bHoldStartFrame: 0, isMonitoring: false };
}

/**
 * 每帧调用, 检测音响测试触发条件
 *
 * @param detector 检测器状态
 * @param cursorX 光标 X 位置
 * @param cursorY 光标 Y 位置
 * @param buttons 当前按键状态
 * @param frameCount 当前帧计数 (对应 $FFFF815C)
 * @returns true 表示触发音响测试
 */
export function checkSoundTest(
  detector: SoundTestDetector,
  cursorX: number,
  cursorY: number,
  buttons: number,
  frameCount: number,
): boolean {
  const B_HELD = (buttons & Button.B) !== 0;
  const AT_POSITION = cursorX === 2 && cursorY === 2;
  const HOLD_FRAMES = 120; // 约 2 秒 @ 60Hz

  if (AT_POSITION && B_HELD) {
    if (!detector.isMonitoring) {
      detector.isMonitoring = true;
      detector.bHoldStartFrame = frameCount;
    }
    return (frameCount - detector.bHoldStartFrame) >= HOLD_FRAMES;
  } else {
    detector.isMonitoring = false;
    return false;
  }
}

// ============================================================================
// 6. 秘籍状态管理
// ============================================================================

/**
 * 秘籍系统全局状态

 * 对应关键 RAM 地址:
 *   - $FFFFA6DC = shopMode: 0=正常, 1=隐藏商店, 2=真隐藏商店
 *   - $FFFFA6DA = soundId: 音效/商店ID
 *   - $FFFF8174 = debugLayer1: debug 模式层级 1
 *   - $FFFF8176 = debugLayer2: debug 模式层级 2
 *   - $FFFFA612 = scenarioSelectIndex: 选关索引 (1-31)
 *   - $FFFF8188 = buttonHistory: 按键历史缓冲区
 *   - $FFFF81A7 = prevButtons: 上一帧按键
 */
export interface CheatState {
  /** 商店模式 (RAM $FFFFA6DC) */
  shopMode: number;           // 0=正常, 1=隐藏, 2=真隐藏
  /** 商店 / 音效 ID (RAM $FFFFA6DA) */
  soundId: number;            // $65=隐藏商店1, $5C=真隐藏商店, $46=调试音效
  /** Debug 模式层 1 标志 (RAM $FFFF8174) */
  debugLayer1: boolean;
  /** Debug 模式层 2 标志 (RAM $FFFF8176) */
  debugLayer2: boolean;
  /** 选关索引 (RAM $FFFFA612), 1-31 */
  scenarioSelectIndex: number;
  /** 调试模式是否激活 (从 $00D7C6 秘籍触发) */
  debugModeActive: boolean;
  /** 按键历史 (对应 RAM $FFFF8188) */
  buttonHistory: ButtonHistory;
  /** 音响测试检测器 */
  soundTestDetector: SoundTestDetector;
}

export function createCheatState(): CheatState {
  return {
    shopMode: 0,
    soundId: 0,
    debugLayer1: false,
    debugLayer2: false,
    scenarioSelectIndex: 0,
    debugModeActive: false,
    buttonHistory: createButtonHistory(),
    soundTestDetector: createSoundTestDetector(),
  };
}

/**
 * 每帧处理秘籍检测 (在 VBLANK / LOAD / 地图画面中分别调用)
 *
 * 调用点:
 *   - VBLANK handler: checkVBlankCheats()
 *   - LOAD 画面: checkLoadScreenCheat()
 *   - 地图画面: checkMapScreenCheat() + checkSoundTest()
 */
export function processCheatTriggers(
  state: CheatState,
  currentButtons: number,
  currentScenario: number,
  cursorX: number,
  cursorY: number,
  frameCount: number,
  rom: Uint8Array,
  screenMode: 'vblank' | 'load' | 'map',
): CheatResult[] {
  const results: CheatResult[] = [];

  // 1. 更新按键历史 (所有模式)
  recordButtonChange(state.buttonHistory, currentButtons);

  // 2. 根据屏幕模式检测对应的秘籍
  switch (screenMode) {
    case 'vblank':
      // VBLANK 秘籍: 隐藏商店 1 + 真隐藏商店
      results.push(...checkVBlankCheats(rom, state.buttonHistory, currentButtons));
      break;

    case 'load':
      // LOAD 画面: 剧本选择
      const loadResult = checkLoadScreenCheat(rom, state.buttonHistory, currentButtons, currentScenario);
      if (loadResult) results.push(loadResult);
      break;

    case 'map':
      // 地图画面: 调试模式 + 音响测试
      const mapResult = checkMapScreenCheat(rom, state.buttonHistory, currentButtons);
      if (mapResult) results.push(mapResult);

      // 音响测试 (非序列匹配, 位置+定时器方式)
      if (checkSoundTest(state.soundTestDetector, cursorX, cursorY, currentButtons, frameCount)) {
        results.push({
          definition: CHEAT_DEFINITIONS[4],
          trigger: { type: 'sound_test' },
        });
      }
      break;
  }

  // 3. 应用触发的效果
  for (const result of results) {
    switch (result.trigger.type) {
      case 'hidden_shop_1':
        state.shopMode = 1;
        state.soundId = 0x65;
        break;
      case 'hidden_shop_2':
        state.shopMode = 2;
        state.soundId = 0x5C;
        break;
      case 'scenario_select':
        state.scenarioSelectIndex = result.trigger.currentScenario;
        break;
      case 'debug_mode':
        state.debugModeActive = !state.debugModeActive;
        state.soundId = 0x46;
        break;
      case 'sound_test':
        // 音响测试触发
        break;
    }
  }

  return results;
}

// ============================================================================
// 7. 按钮序列可视化工具
// ============================================================================

/**
 * 将按钮码转为可读字符串
 */
export function buttonsToString(buttons: number): string {
  return BUTTON_NAMES[buttons] || `?(${buttons.toString(16)})`;
}

/**
 * 将秘籍序列转为显示字符串 (e.g., "A B A B ↑ ↓ ← → START B")
 */
export function cheatToString(cheat: CheatDefinition): string {
  if (cheat.sequence.length === 0) return cheat.description;
  return cheat.sequence.map(buttonsToString).join(' ');
}

// ============================================================================
// 8. ROM 原始秘籍表导出 (用于测试和验证)
// ============================================================================

/**
 * 从 ROM 中读取秘籍表的原始字节
 */
export function readCheatTable(rom: Uint8Array, addr: number): { count: number; bytes: number[]; post: number } {
  const count = ((rom[addr] << 8) | rom[addr + 1]) >>> 0;
  const bytes: number[] = [];
  for (let i = 0; i < count; i++) {
    bytes.push(rom[addr + 2 + i]);
  }
  const post = rom[addr + 2 + count];
  return { count, bytes, post };
}

/**
 * 从 ROM 中读取并解析所有秘籍表 (用于验证逆向结果)
 */
export function dumpAllCheatTables(rom: Uint8Array): void {
  for (const def of CHEAT_DEFINITIONS) {
    if (def.romAddr === 0x000000) continue; // 跳过音响测试
    const table = readCheatTable(rom, def.romAddr);
    const readable = table.bytes
      .filter((_, i) => i % 2 === 0) // 只取按下字节, 跳过松开(0x00)
      .map(buttonsToString)
      .join(' ');
    console.log(`${def.name} @ ROM 0x${def.romAddr.toString(16).toUpperCase()}:`);
    console.log(`  Raw: ${table.bytes.map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
    console.log(`  Post: 0x${table.post.toString(16)}`);
    console.log(`  Readable: ${readable}`);
  }
}
