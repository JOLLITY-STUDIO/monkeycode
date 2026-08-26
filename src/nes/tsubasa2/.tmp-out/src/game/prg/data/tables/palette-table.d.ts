/**
 * 调色板数据表（89 项）
 *
 * 每项 12 字节 = 4 组×3 色。装载时强制每组首色为 $0F（背景/透明）。
 * 装载后 $046C=$20（队列流长度标记）。
 */
export declare const PALETTE_TABLE: ReadonlyArray<ReadonlyArray<number>>;
/** 调色板装载：index → 12 字节，X&3==0 置 $0F；返回 16 字节调色板 */
export declare function loadPalette(index: number): ReadonlyArray<number>;
