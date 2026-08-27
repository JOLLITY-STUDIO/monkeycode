"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BANK6_SCRIPTS = void 0;
/**
 * bank06/scripts/index.ts — 6 段脚本聚合
 *
 * 每段对应 bank06 header 6 项指针（$A00C/$A01B/$A028/$A0E0/$A1A8/$A2F2）。
 */
const script_00_1 = require("./script-00");
const script_01_1 = require("./script-01");
const script_02_1 = require("./script-02");
const script_03_1 = require("./script-03");
const script_04_1 = require("./script-04");
const script_05_1 = require("./script-05");
exports.BANK6_SCRIPTS = [
    script_00_1.BANK6_SCRIPT_00,
    script_01_1.BANK6_SCRIPT_01,
    script_02_1.BANK6_SCRIPT_02,
    script_03_1.BANK6_SCRIPT_03,
    script_04_1.BANK6_SCRIPT_04,
    script_05_1.BANK6_SCRIPT_05,
];
