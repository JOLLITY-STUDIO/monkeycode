/**
 * Zip (stored, no compression) + CRC32 utilities
 * 从 h5game.ts 抽离出来的纯工具函数，与游戏/页面逻辑无关
 */
/** String → UTF-8 Uint8Array */
export declare function strToUTF8(str: string): Uint8Array;
/**
 * 最小化 zip（stored 不压缩），输入 {filename: Uint8Array}
 */
export declare function makeZip(files: Record<string, Uint8Array>): Uint8Array;
