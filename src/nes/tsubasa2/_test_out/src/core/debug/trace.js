"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trace = trace;
exports.traceIf = traceIf;
/**
 * Trace Log 工具 — 统一入口跟踪日志
 *
 * 用于跟踪游戏入口流程 (构造/启动/场景切换/RESET 链等),
 * 不用于 RAF 循环每帧 tick (避免刷屏)。
 *
 * 日志格式: [TRACE][tag] message
 * 开关: 设置 TRACE_ENABLED = false 可全局关闭
 */
const TRACE_ENABLED = true;
/** trace 标签颜色映射 (浏览器 console 着色) */
const TAG_COLORS = {
    Tsubasa2: '#4CAF50',
    ServiceLoader: '#2196F3',
    Interrupt: '#FF9800',
    Bank00: '#9C27B0',
    Bank30: '#E91E63',
    Bank02: '#00BCD4',
    Audio: '#FFC107',
};
/** 单条 trace 输出 */
function trace(tag, message, ...args) {
    if (!TRACE_ENABLED)
        return;
    const color = TAG_COLORS[tag] ?? '#607D8B';
    // 浏览器/微信小程序 console.log 支持 %c 着色
    // 无头环境 (node) 无 color, 自动降级为纯文本
    try {
        // eslint-disable-next-line no-console
        console.log(`%c[TRACE][${tag}]%c ${message}`, `color:${color};font-weight:bold`, 'color:inherit', ...args);
    }
    catch (_) {
        // 降级: 无 color 支持
        // eslint-disable-next-line no-console
        console.log(`[TRACE][${tag}] ${message}`, ...args);
    }
}
/** 条件 trace (满足条件才输出) */
function traceIf(tag, cond, message, ...args) {
    if (cond)
        trace(tag, message, ...args);
}
