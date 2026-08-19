"use strict";
/**
 * 音频数据统一出口
 *
 * BGM 数据 = mini-audio/bgm-data/bgm-sid (43 SID 轨道)
 * SE 数据  = mini-audio/se-data (SE0-SE15 通道)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SE_COUNT = exports.SE_CHANNELS = exports.BGM_TOTAL_COUNT = exports.ALL_BGM_LIST = exports.BGM_BY_TYPE = exports.BGM_BY_BANK = exports.BGM_SID_LIST = exports.apuBuffer = void 0;
// APU 寄存器缓存 $4000-$401F
var audioCache_1 = require("./audioCache");
Object.defineProperty(exports, "apuBuffer", { enumerable: true, get: function () { return audioCache_1.apuBuffer; } });
// ── BGM / SID ──
var Index_1 = require("./bgm/Index");
Object.defineProperty(exports, "BGM_SID_LIST", { enumerable: true, get: function () { return Index_1.BGM_SID_LIST; } });
Object.defineProperty(exports, "BGM_BY_BANK", { enumerable: true, get: function () { return Index_1.BGM_BY_BANK; } });
Object.defineProperty(exports, "BGM_BY_TYPE", { enumerable: true, get: function () { return Index_1.BGM_BY_TYPE; } });
Object.defineProperty(exports, "ALL_BGM_LIST", { enumerable: true, get: function () { return Index_1.ALL_BGM_LIST; } });
Object.defineProperty(exports, "BGM_TOTAL_COUNT", { enumerable: true, get: function () { return Index_1.BGM_TOTAL_COUNT; } });
// ── SE 通道数据 (Bank 12 指针表 $8BDA) ──
var index_1 = require("./se/index");
Object.defineProperty(exports, "SE_CHANNELS", { enumerable: true, get: function () { return index_1.SE_CHANNELS; } });
Object.defineProperty(exports, "SE_COUNT", { enumerable: true, get: function () { return index_1.SE_COUNT; } });
