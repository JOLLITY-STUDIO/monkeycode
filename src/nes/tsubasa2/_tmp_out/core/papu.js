"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAPU = exports.default = void 0;
/** PAPU re-export 桥接 (供微信小程序 require('core/papu') 解析) */
var index_1 = require("./papu/index");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(index_1).default; } });
var index_2 = require("./papu/index");
Object.defineProperty(exports, "PAPU", { enumerable: true, get: function () { return __importDefault(index_2).default; } });
