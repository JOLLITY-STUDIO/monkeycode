"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPENING_TILE_STREAMS = exports.BANK7_TILE_STREAMS = exports.BANK7_CHR_CONFIGS = exports.BANK7_CHR_POINTERS = void 0;
/**
 * bank07/index.ts — bank07 数据出口契约
 *
 * 数据布局（CPU 地址）：
 *   $A000-$A0D3  CHR 指针表 106 项（BANK7_CHR_POINTERS）
 *   $A0D4-$BFFF  106 个 CHR config + tile streams（configs/*.ts + streams.ts）
 */
var pointer_table_1 = require("./pointer-table");
Object.defineProperty(exports, "BANK7_CHR_POINTERS", { enumerable: true, get: function () { return pointer_table_1.BANK7_CHR_POINTERS; } });
var index_1 = require("./configs/index");
Object.defineProperty(exports, "BANK7_CHR_CONFIGS", { enumerable: true, get: function () { return index_1.BANK7_CHR_CONFIGS; } });
var streams_1 = require("./streams");
Object.defineProperty(exports, "BANK7_TILE_STREAMS", { enumerable: true, get: function () { return streams_1.BANK7_TILE_STREAMS; } });
Object.defineProperty(exports, "OPENING_TILE_STREAMS", { enumerable: true, get: function () { return streams_1.OPENING_TILE_STREAMS; } });
