"use strict";
/** 天使之翼2 — 对外入口: core(模拟器) + game(ROM 定义) */
// 小程序编译器对 `export { X } from '...'` re-export 支持有限,
// 改为先 import 再 export, 确保模块注册正确
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tsubasa2 = exports.BUTTON_RIGHT = exports.BUTTON_LEFT = exports.BUTTON_DOWN = exports.BUTTON_UP = exports.BUTTON_START = exports.BUTTON_SELECT = exports.BUTTON_B = exports.BUTTON_A = exports.InputMini = exports.BrowserMini = exports.NT_ROWS = exports.NT_COLS = exports.TILE_PX = exports.NES_HEIGHT = exports.NES_WIDTH = void 0;
const types_1 = require("./core/types");
Object.defineProperty(exports, "NES_WIDTH", { enumerable: true, get: function () { return types_1.NES_WIDTH; } });
Object.defineProperty(exports, "NES_HEIGHT", { enumerable: true, get: function () { return types_1.NES_HEIGHT; } });
Object.defineProperty(exports, "TILE_PX", { enumerable: true, get: function () { return types_1.TILE_PX; } });
Object.defineProperty(exports, "NT_COLS", { enumerable: true, get: function () { return types_1.NT_COLS; } });
Object.defineProperty(exports, "NT_ROWS", { enumerable: true, get: function () { return types_1.NT_ROWS; } });
const index_1 = __importDefault(require("./core/browser-mini/index"));
exports.BrowserMini = index_1.default;
const input_1 = __importDefault(require("./core/browser-mini/input"));
exports.InputMini = input_1.default;
const input_2 = require("./core/browser-mini/input");
Object.defineProperty(exports, "BUTTON_A", { enumerable: true, get: function () { return input_2.BUTTON_A; } });
Object.defineProperty(exports, "BUTTON_B", { enumerable: true, get: function () { return input_2.BUTTON_B; } });
Object.defineProperty(exports, "BUTTON_SELECT", { enumerable: true, get: function () { return input_2.BUTTON_SELECT; } });
Object.defineProperty(exports, "BUTTON_START", { enumerable: true, get: function () { return input_2.BUTTON_START; } });
Object.defineProperty(exports, "BUTTON_UP", { enumerable: true, get: function () { return input_2.BUTTON_UP; } });
Object.defineProperty(exports, "BUTTON_DOWN", { enumerable: true, get: function () { return input_2.BUTTON_DOWN; } });
Object.defineProperty(exports, "BUTTON_LEFT", { enumerable: true, get: function () { return input_2.BUTTON_LEFT; } });
Object.defineProperty(exports, "BUTTON_RIGHT", { enumerable: true, get: function () { return input_2.BUTTON_RIGHT; } });
const index_2 = require("./game/index");
Object.defineProperty(exports, "Tsubasa2", { enumerable: true, get: function () { return index_2.Tsubasa2; } });
