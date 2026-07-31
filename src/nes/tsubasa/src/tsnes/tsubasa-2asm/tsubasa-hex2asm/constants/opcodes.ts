/**
 * ============================================================================
 * 天使之翼 II — 字节码操作码定义
 *
 * 脚本引擎 ($82ED) 解释的操作码定义。
 * 字节码用于驱动对话场景、文字输出、屏幕特效和场景过渡。
 *
 * 编码规则:
 *   $00-$D7: 直接字符输出 (字面量)
 *   $D8-$FF: 控制码
 * ============================================================================
 */

// ============================================================
// §1 控制码分类范围
// ============================================================

/** 字符直接输出范围 */
export const BC_CHAR_MIN = 0x00;
export const BC_CHAR_MAX = 0xD7;

/** 调色板/亮度控制范围 */
export const BC_PALETTE_MIN = 0xD8;
export const BC_PALETTE_MAX = 0xDF;

/** 列控制范围 */
export const BC_COLUMN_MIN = 0xE0;
export const BC_COLUMN_MAX = 0xE7;

/** 场景控制范围 */
export const BC_SCENE_MIN = 0xE8;
export const BC_SCENE_MAX = 0xFA;

// ============================================================
// §2 具体操作码
// ============================================================

/** $D8-$DF: 调色板/亮度控制 (参数 = (val - 0xD8) 决定操作) */
export const BC_PALETTE_CTRL  = 0xD8;

/** $E0-$E7: 列控制 (参数 = (val - 0xE0) 决定列数) */
export const BC_COLUMN_CTRL   = 0xE0;

/** $E8: 场景过渡 (切换到指定场景) */
export const BC_SCENE_TRANS   = 0xE8;

/** $E9: 亮度淡入/淡出 */
export const BC_BRIGHT_FADE   = 0xE9;

/** $EA: 清屏 */
export const BC_CLEAR_SCREEN  = 0xEA;

/** $EB: PPU 模式设置 */
export const BC_PPU_MODE_SET  = 0xEB;

/** $EC: 文本设置 (行数/位置等) */
export const BC_TEXT_SETUP    = 0xEC;

/** $ED: 槽位存储 */
export const BC_SLOT_STORE    = 0xED;

/** $EE: 矩形填充显示区 */
export const BC_FILL_DISP     = 0xEE;

/** $EF: 旗标切换 */
export const BC_TOGGLE_FLAG   = 0xEF;

/** $F0: 光标定位 */
export const BC_CURSOR_SET    = 0xF0;

/** $F1: 跨 bank 数据加载 */
export const BC_BANK_LOAD     = 0xF1;

/** $F2: 最大行数设置 */
export const BC_LINE_MAX      = 0xF2;

/** $F3: 调色板操作 */
export const BC_PALETTE_OP    = 0xF3;

/** $F4: 子控制码 */
export const BC_SUB_CTRL      = 0xF4;

/** $F5: 显示控制 */
export const BC_DISP_CTRL     = 0xF5;

/** $F6: 清除 + 延迟 */
export const BC_CLEAR_DELAY   = 0xF6;

/** $F7: 方向切换 */
export const BC_TOGGLE_DIR    = 0xF7;

/** $F8: 跨 bank 函数调用 */
export const BC_CROSS_BANK    = 0xF8;

/** $F9: 场景淡出 */
export const BC_FADE_SCENE    = 0xF9;

/** $FA: 淡入设置 */
export const BC_FADE_SETUP    = 0xFA;

/** 列表终止符 */
export const BC_TERMINATOR    = 0xFF;
