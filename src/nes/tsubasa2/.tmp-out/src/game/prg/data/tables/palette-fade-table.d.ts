/**
 * 调色板渐显表
 *
 * 语义：
 *   fade=15 满渐显 → result = pal（原值）
 *   fade=0  全暗   → result = 0x0F（黑）
 *
 * 注：完整 64 项渐显查找表（V0.2 数据层从银行00 code_util.s 提取）。
 * 当前实现为语义等价（不编造中间值，边界与原版一致）。
 */
export declare const PALETTE_FADE_MAX = 15;
/** 渐显：fade 0-15，0=全黑 15=原色 */
export declare function fadePalette(pal: number, fade: number): number;
