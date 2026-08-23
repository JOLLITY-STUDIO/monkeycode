/**
 * 天使之翼2 — 核心类型定义
 *
 * 所有游戏模块共享的基础类型与枚举。
 */
/** NES 原始分辨率 */
export declare const NES_WIDTH = 256;
export declare const NES_HEIGHT = 240;
/** PPU NameTable 尺寸 */
export declare const NT_COLS = 32;
export declare const NT_ROWS = 30;
/** CHR tile 像素尺寸 */
export declare const TILE_PX = 8;
/** 一个 CHR Bank = 8KB = 512 tiles */
export declare const CHR_BANK_SIZE = 8192;
/** 一个 PRG Bank = 8KB */
export declare const PRG_BANK_SIZE = 8192;
/** 按键位掩码 */
export declare enum BUTTON {
    A = 1,
    B = 2,
    SELECT = 4,
    START = 8,
    UP = 16,
    DOWN = 32,
    LEFT = 64,
    RIGHT = 128
}
/** 游戏全局状态 */
export declare enum GameState {
    INIT = "INIT",
    TITLE = "TITLE",
    OPENING = "OPENING",
    MENU = "MENU",
    MATCH = "MATCH",
    ENDING = "ENDING",
    GAME_OVER = "GAME_OVER",
    PAUSED = "PAUSED"
}
/** 游戏循环回调 */
export interface GameCallbacks {
    onFrame?: (frame: number) => void;
    onStateChange?: (from: GameState, to: GameState) => void;
    onError?: (err: Error) => void;
}
/** 游戏启动配置 */
export interface Tsubasa2Config {
    /** Canvas 缩放倍率，0=自动填满容器 */
    scale?: number;
    /** 开启调试面板 */
    debug?: boolean;
    /** AI 自动操作 */
    aiMode?: boolean;
    /** 帧回调控 */
    callbacks?: GameCallbacks;
}
/** 调试信息快照 */
export interface DebugInfo {
    frame: number;
    gameStateName: string;
    fps: number;
}
