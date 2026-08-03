/**
 * 游戏主状态机跳转表
 * 
 * 对应原始 ROM 中 Bank 00 的跳转表：
 * - 状态变量: RAM $03CA (GAME_STATE)
 * - 分发器:   $81F7-$81FC + $834D-$8363
 * - 跳转表:   $81FD-$820E (9 个 WORD 指针, 小端序)
 * 
 * $834D 分发器逻辑:
 *   ASL A           ; 状态值 * 2
 *   TAY             ; Y = 偏移
 *   PLA / STA $14   ; 弹出返回地址低字节
 *   PLA / STA $15   ; 弹出返回地址高字节
 *   INY             ; 先读高字节
 *   LDA ($14),Y / PHA
 *   INY
 *   LDA ($14),Y / STA $15  ; 读低字节到 $15
 *   PLA / STA $14           ; 高字节到 $14
 *   JMP ($0014)             ; 间接跳转
 * 
 * 跳转表原始数据 ($81FD-$820E):
 *   81FD: A1 82  → $82A1 (状态 0)
 *   81FF: A7 82  → $82A7 (状态 1)
 *   8201: 76 82  → $8276 (状态 2)
 *   8203: CD 85  → $85CD (状态 3)
 *   8205: B9 87  → $87B9 (状态 4)
 *   8207: 0D 82  → $820D (状态 5)
 *   8209: 64 82  → $8264 (状态 6)
 *   820B: 70 82  → $8270 (状态 7)
 */

/** 游戏状态枚举 - 对应 RAM $03CA 的值 */
export enum GameState {
  /** 状态 0: 初始化/标题画面设置 ($82A1) */
  INIT_TITLE       = 0,
  /** 状态 1: 标题画面主循环 ($82A7) */
  TITLE_LOOP       = 1,
  /** 状态 2: 菜单/模式选择 ($8276) */
  MENU_SELECT      = 2,
  /** 状态 3: 队伍选择/剧情 ($85CD) */
  TEAM_SELECT      = 3,
  /** 状态 4: 比赛主循环 ($87B9) */
  MATCH_MAIN       = 4,
  /** 状态 5: 比赛事件/过场 ($820D) */
  MATCH_EVENT      = 5,
  /** 状态 6: 半场/比赛结束过渡 ($8264) */
  MATCH_TRANSITION = 6,
  /** 状态 7: 结算/结果画面 ($8270) */
  RESULT_SCREEN    = 7,
}

/** 状态跳转表 - 每个状态对应的处理函数入口地址 */
export const GAME_STATE_TABLE: Record<GameState, number> = {
  [GameState.INIT_TITLE]:       0x82A1,
  [GameState.TITLE_LOOP]:       0x82A7,
  [GameState.MENU_SELECT]:      0x8276,
  [GameState.TEAM_SELECT]:      0x85CD,
  [GameState.MATCH_MAIN]:       0x87B9,
  [GameState.MATCH_EVENT]:      0x820D,
  [GameState.MATCH_TRANSITION]: 0x8264,
  [GameState.RESULT_SCREEN]:    0x8270,
};

/** 状态名称映射（调试用） */
export const GAME_STATE_NAMES: Record<GameState, string> = {
  [GameState.INIT_TITLE]:       '初始化/标题设置',
  [GameState.TITLE_LOOP]:       '标题画面',
  [GameState.MENU_SELECT]:      '菜单选择',
  [GameState.TEAM_SELECT]:      '队伍/剧情选择',
  [GameState.MATCH_MAIN]:       '比赛主循环',
  [GameState.MATCH_EVENT]:      '比赛事件/过场',
  [GameState.MATCH_TRANSITION]: '半场/过渡',
  [GameState.RESULT_SCREEN]:    '结算画面',
};

/**
 * 状态转换规则
 * 
 * 原始代码中状态推进/回退逻辑 ($820D-$8263):
 * 
 * 推进 (INC $03CA):
 *   - $8259: 当 $03E5 计数器递减到特定值时
 *   - $825C: 当比分/状态条件满足时
 * 
 * 回退 (DEC $03CA):
 *   - $8260: 当某些取消/返回条件满足时
 */
export const STATE_TRANSITIONS = {
  /** 可以递增到下一个状态的条件状态 */
  ADVANCE_STATES: new Set<GameState>([
    GameState.INIT_TITLE,
    GameState.TITLE_LOOP,
    GameState.MENU_SELECT,
    GameState.TEAM_SELECT,
    GameState.MATCH_EVENT,
    GameState.MATCH_TRANSITION,
  ]),
  /** 可以回退到上一个状态的条件状态 */
  RETREAT_STATES: new Set<GameState>([
    GameState.MATCH_MAIN,
  ]),
} as const;

/** 最大有效状态值 */
export const MAX_GAME_STATE = 7;
