"use strict";
/**
 * 天使之翼2 — 核心类型定义
 *
 * 所有游戏模块共享的基础类型与枚举。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = exports.BUTTON = exports.PRG_BANK_SIZE = exports.CHR_BANK_SIZE = exports.TILE_PX = exports.NT_ROWS = exports.NT_COLS = exports.NES_HEIGHT = exports.NES_WIDTH = void 0;
/** NES 原始分辨率 */
exports.NES_WIDTH = 256;
exports.NES_HEIGHT = 240;
/** PPU NameTable 尺寸 */
exports.NT_COLS = 32;
exports.NT_ROWS = 30;
/** CHR tile 像素尺寸 */
exports.TILE_PX = 8;
/** 一个 CHR Bank = 8KB = 512 tiles */
exports.CHR_BANK_SIZE = 0x2000;
/** 一个 PRG Bank = 8KB */
exports.PRG_BANK_SIZE = 0x2000;
/** 按键位掩码 */
var BUTTON;
(function (BUTTON) {
    BUTTON[BUTTON["A"] = 1] = "A";
    BUTTON[BUTTON["B"] = 2] = "B";
    BUTTON[BUTTON["SELECT"] = 4] = "SELECT";
    BUTTON[BUTTON["START"] = 8] = "START";
    BUTTON[BUTTON["UP"] = 16] = "UP";
    BUTTON[BUTTON["DOWN"] = 32] = "DOWN";
    BUTTON[BUTTON["LEFT"] = 64] = "LEFT";
    BUTTON[BUTTON["RIGHT"] = 128] = "RIGHT";
})(BUTTON || (exports.BUTTON = BUTTON = {}));
/** 游戏全局状态 */
var GameState;
(function (GameState) {
    GameState["INIT"] = "INIT";
    GameState["TITLE"] = "TITLE";
    GameState["OPENING"] = "OPENING";
    GameState["MENU"] = "MENU";
    GameState["MATCH"] = "MATCH";
    GameState["ENDING"] = "ENDING";
    GameState["GAME_OVER"] = "GAME_OVER";
    GameState["PAUSED"] = "PAUSED";
})(GameState || (exports.GameState = GameState = {}));
