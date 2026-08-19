"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputManager = exports.Renderer = exports.DataQueryService = exports.BootService = exports.Bank30Service = exports.Bank28MatchService = exports.Bank11Service = exports.Bank02Service = exports.Bank00Service = exports.createBlankPaletteTable = exports.BLANK_PALETTE = exports.SceneType = exports.MatchPhase = exports.FormationType = exports.PlayerPosition = exports.RAM_KEYS = exports.DataStore = exports.CONFIG = exports.Mirroring = exports.GameState = exports.BUTTON = exports.PRG_BANK_SIZE = exports.CHR_BANK_SIZE = exports.NT_ROWS = exports.NT_COLS = exports.TILE_PX = exports.NES_HEIGHT = exports.NES_WIDTH = exports.GameLoop = exports.Tsubasa2 = void 0;
/** 天使之翼2 — 公共导出 */
var Tsubasa2_1 = require("./core/Tsubasa2");
Object.defineProperty(exports, "Tsubasa2", { enumerable: true, get: function () { return Tsubasa2_1.Tsubasa2; } });
var GameLoop_1 = require("./core/GameLoop");
Object.defineProperty(exports, "GameLoop", { enumerable: true, get: function () { return GameLoop_1.GameLoop; } });
var types_1 = require("./core/types");
Object.defineProperty(exports, "NES_WIDTH", { enumerable: true, get: function () { return types_1.NES_WIDTH; } });
Object.defineProperty(exports, "NES_HEIGHT", { enumerable: true, get: function () { return types_1.NES_HEIGHT; } });
Object.defineProperty(exports, "TILE_PX", { enumerable: true, get: function () { return types_1.TILE_PX; } });
Object.defineProperty(exports, "NT_COLS", { enumerable: true, get: function () { return types_1.NT_COLS; } });
Object.defineProperty(exports, "NT_ROWS", { enumerable: true, get: function () { return types_1.NT_ROWS; } });
Object.defineProperty(exports, "CHR_BANK_SIZE", { enumerable: true, get: function () { return types_1.CHR_BANK_SIZE; } });
Object.defineProperty(exports, "PRG_BANK_SIZE", { enumerable: true, get: function () { return types_1.PRG_BANK_SIZE; } });
Object.defineProperty(exports, "BUTTON", { enumerable: true, get: function () { return types_1.BUTTON; } });
Object.defineProperty(exports, "GameState", { enumerable: true, get: function () { return types_1.GameState; } });
// 配置
var config_1 = require("./game/config");
Object.defineProperty(exports, "Mirroring", { enumerable: true, get: function () { return config_1.Mirroring; } });
Object.defineProperty(exports, "CONFIG", { enumerable: true, get: function () { return config_1.CONFIG; } });
// 数据中心
var DataStore_1 = require("./game/data/DataStore");
Object.defineProperty(exports, "DataStore", { enumerable: true, get: function () { return DataStore_1.DataStore; } });
Object.defineProperty(exports, "RAM_KEYS", { enumerable: true, get: function () { return DataStore_1.RAM_KEYS; } });
// 领域模型
var types_2 = require("./game/model/types");
Object.defineProperty(exports, "PlayerPosition", { enumerable: true, get: function () { return types_2.PlayerPosition; } });
Object.defineProperty(exports, "FormationType", { enumerable: true, get: function () { return types_2.FormationType; } });
Object.defineProperty(exports, "MatchPhase", { enumerable: true, get: function () { return types_2.MatchPhase; } });
Object.defineProperty(exports, "SceneType", { enumerable: true, get: function () { return types_2.SceneType; } });
Object.defineProperty(exports, "BLANK_PALETTE", { enumerable: true, get: function () { return types_2.BLANK_PALETTE; } });
Object.defineProperty(exports, "createBlankPaletteTable", { enumerable: true, get: function () { return types_2.createBlankPaletteTable; } });
// 服务 (Bank 翻译)
var index_1 = require("./game/index");
Object.defineProperty(exports, "Bank00Service", { enumerable: true, get: function () { return index_1.Bank00Service; } });
Object.defineProperty(exports, "Bank02Service", { enumerable: true, get: function () { return index_1.Bank02Service; } });
Object.defineProperty(exports, "Bank11Service", { enumerable: true, get: function () { return index_1.Bank11Service; } });
Object.defineProperty(exports, "Bank28MatchService", { enumerable: true, get: function () { return index_1.Bank28MatchService; } });
Object.defineProperty(exports, "Bank30Service", { enumerable: true, get: function () { return index_1.Bank30Service; } });
Object.defineProperty(exports, "BootService", { enumerable: true, get: function () { return index_1.BootService; } });
Object.defineProperty(exports, "DataQueryService", { enumerable: true, get: function () { return index_1.DataQueryService; } });
// 引擎
var Renderer_1 = require("./core/engine/render/Renderer");
Object.defineProperty(exports, "Renderer", { enumerable: true, get: function () { return Renderer_1.Renderer; } });
var InputManager_1 = require("./core/engine/InputManager");
Object.defineProperty(exports, "InputManager", { enumerable: true, get: function () { return InputManager_1.InputManager; } });
