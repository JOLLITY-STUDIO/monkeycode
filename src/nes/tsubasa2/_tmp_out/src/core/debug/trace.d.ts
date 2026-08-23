/** 单条 trace 输出 */
export declare function trace(tag: string, message: string, ...args: unknown[]): void;
/** 条件 trace (满足条件才输出) */
export declare function traceIf(tag: string, cond: boolean, message: string, ...args: unknown[]): void;
