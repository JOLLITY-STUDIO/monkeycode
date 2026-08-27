"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPENING_TILE_STREAMS = exports.BANK7_TILE_STREAMS = void 0;
/**
 * bank7-streams — 兼容旧导入路径的 re-export
 *
 * 实际数据见 ./bank7/streams.ts（BANK7_TILE_STREAMS / OPENING_TILE_STREAMS）。
 */
var streams_1 = require("./bank7/streams");
Object.defineProperty(exports, "BANK7_TILE_STREAMS", { enumerable: true, get: function () { return streams_1.BANK7_TILE_STREAMS; } });
Object.defineProperty(exports, "OPENING_TILE_STREAMS", { enumerable: true, get: function () { return streams_1.OPENING_TILE_STREAMS; } });
