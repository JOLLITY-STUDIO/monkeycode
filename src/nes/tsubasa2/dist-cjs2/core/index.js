"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracer = exports.NES = exports.GameGenie = exports.Controller = exports.Browser = void 0;
const index_1 = __importDefault(require("./browser/index"));
exports.Browser = index_1.default;
const controller_1 = __importDefault(require("./controller"));
exports.Controller = controller_1.default;
const gamegenie_1 = __importDefault(require("./gamegenie"));
exports.GameGenie = gamegenie_1.default;
const nes_1 = __importDefault(require("./nes"));
exports.NES = nes_1.default;
const tracer_1 = require("./debug/tracer");
Object.defineProperty(exports, "Tracer", { enumerable: true, get: function () { return tracer_1.Tracer; } });
