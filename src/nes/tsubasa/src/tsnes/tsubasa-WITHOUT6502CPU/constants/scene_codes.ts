/**
 * ============================================================================
 * 天使之翼 II — 场景编号常量
 *
 * 所有游戏场景 (Scene ID = ZP $26 的值) 均以英文常量命名。
 * 同时包含场景状态机模式和分派索引常量。
 * ============================================================================
 */

// ============================================================
// §1 场景编号 (ZP_SCENE_ID values)
// ============================================================

/** 0x00: TECMO logo 开场动画 */
export const SCENE_TECMO_LOGO    = 0x00;

/** 0x02: 标题画面 */
export const SCENE_TITLE         = 0x02;

/** 0x03: 读取存档/密码输入 */
export const SCENE_LOAD_GAME     = 0x03;

/** 0x04: 主菜单 */
export const SCENE_MAIN_MENU     = 0x04;

/** 0x05: 故事序章开场 */
export const SCENE_STORY_INTRO   = 0x05;

/** 0x06: 巴西联赛开始 */
export const SCENE_BRAZIL_LEAGUE = 0x06;

/** 0x07: 巴西联赛对话/过场 */
export const SCENE_BRAZIL_DIALOG = 0x07;

/** 0x08: 巴西联赛结束 */
export const SCENE_BRAZIL_END    = 0x08;

/** 0x0C: 日本高中联赛开始 */
export const SCENE_HIGH_SCHOOL   = 0x0C;

/** 0x0D: 高中联赛对话 */
export const SCENE_HIGH_SCHOOL_DIALOG = 0x0D;

/** 0x0E: 高中联赛结束 */
export const SCENE_HIGH_SCHOOL_END = 0x0E;

/** 0x10: 日本杯开始 */
export const SCENE_JAPAN_CUP     = 0x10;

/** 0x11: 日本杯对话 */
export const SCENE_JAPAN_CUP_DIALOG = 0x11;

/** 0x12: 世青赛开始 */
export const SCENE_WORLD_YOUTH   = 0x12;

/** 0x13: 世青赛对话 */
export const SCENE_WORLD_YOUTH_DIALOG = 0x13;

/** 0x14: 世青赛结束 */
export const SCENE_WORLD_YOUTH_END = 0x14;

/** 0x1E: 结局 */
export const SCENE_ENDING        = 0x1E;

/** 0x20: 最终结局 */
export const SCENE_FINAL_ENDING  = 0x20;

// ============================================================
// §2 场景内子状态 (ZP_DISPATCH_INDEX values)
// ============================================================

export const SCENE_STATE_INIT    = 0;      // 初始化
export const SCENE_STATE_TITLE   = 1;      // 标题
export const SCENE_STATE_MODE_6  = 6;      // 模式 6
export const SCENE_STATE_MODE_12 = 12;     // 模式 12
export const SCENE_STATE_MODE_16 = 16;     // 模式 16
export const SCENE_STATE_RUNNING = 32;     // 运行中

// ============================================================
// §3 场景类型补全 / 模式偏移量
// ============================================================

export const MODE_OFFSET_6  = 16;          // 场景 $06 类型补全
export const MODE_OFFSET_12 = 26;          // 场景 $0C 类型补全
export const MODE_OFFSET_16 = 36;          // 场景 $10 类型补全

// ============================================================
// §4 比赛场景子状态
// ============================================================

/** 比赛状态: 准备/前奏 */
export const MATCH_STATE_PRELUDE   = 0;
/** 比赛状态: 上半场 */
export const MATCH_STATE_FIRST_HALF = 1;
/** 比赛状态: 中场休息 */
export const MATCH_STATE_HALFTIME  = 2;
/** 比赛状态: 下半场 */
export const MATCH_STATE_SECOND_HALF = 3;
/** 比赛状态: 结束/结算 */
export const MATCH_STATE_RESULT    = 4;

// ============================================================
// §5 主菜单选项
// ============================================================

export const MENU_START_GAME    = 0;       // 开始游戏
export const MENU_LOAD_GAME     = 1;       // 读取存档
export const MENU_PASSWORD      = 2;       // 密码输入
