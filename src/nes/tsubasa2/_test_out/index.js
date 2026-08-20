"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.PAPU = exports.PPU = exports.DataQueryService = exports.BootService = exports.Bank30Service = exports.Bank28MatchService = exports.Bank11Service = exports.Bank02Service = exports.Bank00Service = exports.createBlankPaletteTable = exports.BLANK_PALETTE = exports.SceneType = exports.MatchPhase = exports.FormationType = exports.PlayerPosition = exports.RAM_KEYS = exports.DataStore = exports.CONFIG = exports.Mirroring = exports.GameState = exports.BUTTON = exports.PRG_BANK_SIZE = exports.CHR_BANK_SIZE = exports.NT_ROWS = exports.NT_COLS = exports.TILE_PX = exports.NES_HEIGHT = exports.NES_WIDTH = void 0;
/** 天使之翼2 — 公共导出 */
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
var header_1 = require("./game/header");
Object.defineProperty(exports, "Mirroring", { enumerable: true, get: function () { return header_1.Mirroring; } });
Object.defineProperty(exports, "CONFIG", { enumerable: true, get: function () { return header_1.CONFIG; } });
// 数据中心
var DataStore_1 = require("./game/data/prg/DataStore");
Object.defineProperty(exports, "DataStore", { enumerable: true, get: function () { return DataStore_1.DataStore; } });
Object.defineProperty(exports, "RAM_KEYS", { enumerable: true, get: function () { return DataStore_1.RAM_KEYS; } });
// 领域模型
var model_types_1 = require("./game/data/prg/model-types");
Object.defineProperty(exports, "PlayerPosition", { enumerable: true, get: function () { return model_types_1.PlayerPosition; } });
Object.defineProperty(exports, "FormationType", { enumerable: true, get: function () { return model_types_1.FormationType; } });
Object.defineProperty(exports, "MatchPhase", { enumerable: true, get: function () { return model_types_1.MatchPhase; } });
Object.defineProperty(exports, "SceneType", { enumerable: true, get: function () { return model_types_1.SceneType; } });
Object.defineProperty(exports, "BLANK_PALETTE", { enumerable: true, get: function () { return model_types_1.BLANK_PALETTE; } });
Object.defineProperty(exports, "createBlankPaletteTable", { enumerable: true, get: function () { return model_types_1.createBlankPaletteTable; } });
// 服务 (Bank 翻译)
var index_1 = require("./game/index");
Object.defineProperty(exports, "Bank00Service", { enumerable: true, get: function () { return index_1.Bank00Service; } });
Object.defineProperty(exports, "Bank02Service", { enumerable: true, get: function () { return index_1.Bank02Service; } });
Object.defineProperty(exports, "Bank11Service", { enumerable: true, get: function () { return index_1.Bank11Service; } });
Object.defineProperty(exports, "Bank28MatchService", { enumerable: true, get: function () { return index_1.Bank28MatchService; } });
Object.defineProperty(exports, "Bank30Service", { enumerable: true, get: function () { return index_1.Bank30Service; } });
Object.defineProperty(exports, "BootService", { enumerable: true, get: function () { return index_1.BootService; } });
Object.defineProperty(exports, "DataQueryService", { enumerable: true, get: function () { return index_1.DataQueryService; } });
// 硬件核心 (tsnes 原结构)
var ppu_1 = require("./core/ppu");
Object.defineProperty(exports, "PPU", { enumerable: true, get: function () { return __importDefault(ppu_1).default; } });
var papu_1 = require("./core/papu");
Object.defineProperty(exports, "PAPU", { enumerable: true, get: function () { return __importDefault(papu_1).default; } });
var controller_1 = require("./core/controller");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return __importDefault(controller_1).default; } });
