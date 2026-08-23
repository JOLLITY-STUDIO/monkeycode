/**
 * 测试工具集 — 日志 / 截图 / 进度
 *
 * - log(): 带时间戳与颜色的日志输出到页面日志面板
 * - screenshot(): 捕获游戏 canvas 当前帧，存入截图面板
 * - progress(): 更新进度条
 */
type LogLevel = 'info' | 'pass' | 'fail' | 'warn' | 'step';
/** 写日志 */
export declare function log(msg: string, level?: LogLevel): void;
/** 等待毫秒 */
export declare function sleep(ms: number): Promise<void>;
/**
 * 截图 — 捕获 canvas 当前帧
 * @param name 截图名称
 */
export declare function screenshot(name: string): string | null;
/** 设置进度 (0~100) */
export declare function progress(pct: number): void;
/** 获取所有截图记录（用于报告导出） */
export declare function getShots(): {
    name: string;
    dataUrl: string;
    ts: string;
}[];
/** 清空日志 */
export declare function clearLog(): void;
/** 简单断言 */
export declare function assert(cond: boolean, msg: string): boolean;
export {};
