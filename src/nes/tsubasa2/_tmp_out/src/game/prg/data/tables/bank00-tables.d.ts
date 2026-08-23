/**
 * bank00 数据表 — 从 ROM bank0 ($8000-$9FFF) 提取的声明式数组。
 * @bank 00
 *
 * 说明: 这些表由 node 脚本从原始 .nes 提取 (ROM 偏移 = 16 + bank0*0x4000)。
 * 翻译版禁止 PRG_BANK_XX[addr] 裸地址随机访问, 一律使用本模块声明式数组。
 */
/** 等待帧表 $8AE6 — 脚本等待控制码 ($D8-$DF) 对应的帧延迟计数 */
export declare const WAIT_FRAME_TABLE: readonly number[];
/** 长指令表 $8545 — 24 个长指令处理器入口 (16-bit LE, opcode $E8-$FF) */
export declare const LONG_OPCODE_TABLE: readonly number[];
/** 调色板渐显辅助表 $9EA2 — $9A71 写调色板时的亮度/颜色偏移 */
export declare const PAL_HELPER_TABLE: readonly number[];
/** 帧等待表 $9EE2 — 输入方向/状态对应的精灵 Y 移动量 (11 字节, 索引 0-15) */
export declare const FRAME_WAIT_TABLE: readonly number[];
/** 场景跳转表 $8398 — 主流程各场景 → 下一场景 id */
export declare const SCENE_NEXT_8398: readonly number[];
/** 场景跳转表 $83BA */
export declare const SCENE_FLAG_83BA: readonly number[];
/** 场景跳转表 $83DC */
export declare const SCENE_SCRIPT_83DC: readonly number[];
/** 场景跳转表 $83FE */
export declare const SCENE_SCRIPT_83FE: readonly number[];
/** 场景跳转表 $8420 */
export declare const SCENE_SCRIPT_8420: readonly number[];
/** 场景跳转表 $8442 */
export declare const SCENE_SCRIPT_8442: readonly number[];
/** 文本 buffer 初始化模板 $978B (32 字节, 复制到场景文本数据区) */
export declare const TEXT_BUFFER_TEMPLATE_978B: readonly number[];
/** 小数据表 $87B3 (淡入淡出动画调色板序列) */
export declare const PALETTE_ANIM_87B3: readonly number[];
/** 精灵初始化数据 $88D2 (影子 OAM 填充模板) */
export declare const SPRITE_FILL_88D2: readonly number[];
