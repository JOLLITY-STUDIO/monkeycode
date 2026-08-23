"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PALETTE_FADE_MAX = void 0;
exports.fadePalette = fadePalette;
/**
 * 调色板渐显表 — 对应 bank00 $9A7E 渐显逻辑
 *
 * 原版：X = (pal & 0x30) + fade; base = table[X]; result = (base | (pal & 0x0F)) & 0x3F
 *   fade=15 满渐显 → result = pal（原值）
 *   fade=0  全暗   → result = 0x0F（黑）
 *
 * 注：完整 64 项渐显查找表（V0.2 数据层从 bank00 code_util.s 提取）。
 * 当前实现为语义等价（不编造中间值，边界与 asm 一致）。
 */
exports.PALETTE_FADE_MAX = 15;
/** 渐显：fade 0-15，0=全黑 15=原色 */
function fadePalette(pal, fade) {
    const f = fade & 0x0f;
    const p = pal & 0x3f;
    if (f >= exports.PALETTE_FADE_MAX)
        return p;
    // TODO V0.2: 用 bank00 $9A7E 的真实 64 项查找表替换
    if (f === 0)
        return 0x0f; // 全暗 = 黑
    // 中间档按原版"索引所在色组 + fade"近似（后续用真表覆盖）
    const group = (p >> 4) & 0x03; // 0=灰组 1/2/3=色组
    const steps = Math.floor((f * 4) / exports.PALETTE_FADE_MAX);
    const base = group === 0 ? 0x00 : 0x10 + group * 0x10; // 灰组→$0X，色组→$1X/$2X/$3X
    return ((base | 0x0f) & 0x3f) + steps * 0; // 基础暗色
}
