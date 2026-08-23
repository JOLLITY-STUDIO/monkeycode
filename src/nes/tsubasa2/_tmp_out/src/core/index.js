"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUTTON_RIGHT = exports.BUTTON_LEFT = exports.BUTTON_DOWN = exports.BUTTON_UP = exports.BUTTON_START = exports.BUTTON_SELECT = exports.BUTTON_B = exports.BUTTON_A = exports.BrowserMini = exports.NT_ROWS = exports.NT_COLS = exports.TILE_PX = exports.NES_HEIGHT = exports.NES_WIDTH = exports.createRamStore = exports.RamStore = exports.NES = exports.GameGenie = exports.Controller = exports.Browser = void 0;
// @ts-nocheck — tsnes 移植代码, JS 风格未声明字段, 保持与模拟器 1:1, 不做类型检查
const index_1 = __importDefault(require("./browser/index"));
exports.Browser = index_1.default;
const controller_1 = __importDefault(require("./controller"));
exports.Controller = controller_1.default;
const gamegenie_1 = __importDefault(require("./gamegenie"));
exports.GameGenie = gamegenie_1.default;
const nes_1 = __importDefault(require("./nes"));
exports.NES = nes_1.default;
const ram_1 = require("./ram");
Object.defineProperty(exports, "RamStore", { enumerable: true, get: function () { return ram_1.RamStore; } });
Object.defineProperty(exports, "createRamStore", { enumerable: true, get: function () { return ram_1.createRamStore; } });
const types_1 = require("./types");
Object.defineProperty(exports, "NES_WIDTH", { enumerable: true, get: function () { return types_1.NES_WIDTH; } });
Object.defineProperty(exports, "NES_HEIGHT", { enumerable: true, get: function () { return types_1.NES_HEIGHT; } });
Object.defineProperty(exports, "TILE_PX", { enumerable: true, get: function () { return types_1.TILE_PX; } });
Object.defineProperty(exports, "NT_COLS", { enumerable: true, get: function () { return types_1.NT_COLS; } });
Object.defineProperty(exports, "NT_ROWS", { enumerable: true, get: function () { return types_1.NT_ROWS; } });
// 小程序版主板外壳 (借鉴 browser, 适配微信小程序 Canvas/触摸/音频)
var browser_mini_1 = require("./browser-mini");
Object.defineProperty(exports, "BrowserMini", { enumerable: true, get: function () { return __importDefault(browser_mini_1).default; } });
var browser_mini_2 = require("./browser-mini");
Object.defineProperty(exports, "BUTTON_A", { enumerable: true, get: function () { return browser_mini_2.BUTTON_A; } });
Object.defineProperty(exports, "BUTTON_B", { enumerable: true, get: function () { return browser_mini_2.BUTTON_B; } });
Object.defineProperty(exports, "BUTTON_SELECT", { enumerable: true, get: function () { return browser_mini_2.BUTTON_SELECT; } });
Object.defineProperty(exports, "BUTTON_START", { enumerable: true, get: function () { return browser_mini_2.BUTTON_START; } });
Object.defineProperty(exports, "BUTTON_UP", { enumerable: true, get: function () { return browser_mini_2.BUTTON_UP; } });
Object.defineProperty(exports, "BUTTON_DOWN", { enumerable: true, get: function () { return browser_mini_2.BUTTON_DOWN; } });
Object.defineProperty(exports, "BUTTON_LEFT", { enumerable: true, get: function () { return browser_mini_2.BUTTON_LEFT; } });
Object.defineProperty(exports, "BUTTON_RIGHT", { enumerable: true, get: function () { return browser_mini_2.BUTTON_RIGHT; } });
