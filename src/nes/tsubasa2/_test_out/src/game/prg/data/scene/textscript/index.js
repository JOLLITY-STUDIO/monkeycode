"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PALETTE_SPR_06 = exports.PALETTE_BG_06 = exports.SCRIPT_BANK_06_BYTES = exports.SCRIPTS_BANK_06 = exports.SCRIPT_BANK_05_BYTES = exports.SCRIPTS_BANK_05 = exports.SCRIPT_BANK_04_BYTES = exports.SCRIPTS_BANK_04 = exports.SCRIPT_BANK_03_BYTES = exports.SCRIPTS_BANK_03 = void 0;
exports.getScriptScenes = getScriptScenes;
/**
 * textscript/index.ts — bank03-06 剧情脚本数据汇总出口
 *
 * 4 个 bank 全部按场景段拆分格式: SCRIPTS_BANK_0X (场景段数组的数组) + SCRIPT_BANK_0X_BYTES (原始字节)。
 * bank06 额外导出调色板 (PALETTE_BG_06 / PALETTE_SPR_06), 因 bank06 是混合 bank (脚本+调色板)。
 *
 * 脚本 id 区间: <0x10→bank3 (16个) / <0x20→bank4 (16个) / <0x60→bank5 (64个) / <0x66→bank6 (6个)。
 * 注意: bank06 只有 6 个脚本 (id 0x60-0x65), 不是 0x60-0xFE。
 */
var scripts_bank_03_1 = require("./scripts-bank-03");
Object.defineProperty(exports, "SCRIPTS_BANK_03", { enumerable: true, get: function () { return scripts_bank_03_1.SCRIPTS_BANK_03; } });
Object.defineProperty(exports, "SCRIPT_BANK_03_BYTES", { enumerable: true, get: function () { return scripts_bank_03_1.SCRIPT_BANK_03_BYTES; } });
var scripts_bank_04_1 = require("./scripts-bank-04");
Object.defineProperty(exports, "SCRIPTS_BANK_04", { enumerable: true, get: function () { return scripts_bank_04_1.SCRIPTS_BANK_04; } });
Object.defineProperty(exports, "SCRIPT_BANK_04_BYTES", { enumerable: true, get: function () { return scripts_bank_04_1.SCRIPT_BANK_04_BYTES; } });
var scripts_bank_05_1 = require("./scripts-bank-05");
Object.defineProperty(exports, "SCRIPTS_BANK_05", { enumerable: true, get: function () { return scripts_bank_05_1.SCRIPTS_BANK_05; } });
Object.defineProperty(exports, "SCRIPT_BANK_05_BYTES", { enumerable: true, get: function () { return scripts_bank_05_1.SCRIPT_BANK_05_BYTES; } });
var scripts_bank_06_1 = require("./scripts-bank-06");
Object.defineProperty(exports, "SCRIPTS_BANK_06", { enumerable: true, get: function () { return scripts_bank_06_1.SCRIPTS_BANK_06; } });
Object.defineProperty(exports, "SCRIPT_BANK_06_BYTES", { enumerable: true, get: function () { return scripts_bank_06_1.SCRIPT_BANK_06_BYTES; } });
Object.defineProperty(exports, "PALETTE_BG_06", { enumerable: true, get: function () { return scripts_bank_06_1.PALETTE_BG_06; } });
Object.defineProperty(exports, "PALETTE_SPR_06", { enumerable: true, get: function () { return scripts_bank_06_1.PALETTE_SPR_06; } });
const scripts_bank_03_2 = require("./scripts-bank-03");
const scripts_bank_04_2 = require("./scripts-bank-04");
const scripts_bank_05_2 = require("./scripts-bank-05");
const scripts_bank_06_2 = require("./scripts-bank-06");
/** bank 编号 → 该 bank 的场景段数组 */
function bankScripts(bank) {
    switch (bank) {
        case 3: return scripts_bank_03_2.SCRIPTS_BANK_03;
        case 4: return scripts_bank_04_2.SCRIPTS_BANK_04;
        case 5: return scripts_bank_05_2.SCRIPTS_BANK_05;
        case 6: return scripts_bank_06_2.SCRIPTS_BANK_06;
        default: return [];
    }
}
/**
 * 按脚本 id 查询场景段列表 (0x00-0x65)。
 * 返回 readonly (readonly number[])[] = 该脚本的场景段数组, 每段一个 readonly number[]。
 * 规则: <0x10→bank3 / <0x20→bank4 / <0x60→bank5 / <0x66→bank6。
 */
function getScriptScenes(id) {
    const sid = id & 0xff;
    let bank, offset;
    if (sid < 0x10) {
        bank = 3;
        offset = sid;
    }
    else if (sid < 0x20) {
        bank = 4;
        offset = sid - 0x10;
    }
    else if (sid < 0x60) {
        bank = 5;
        offset = sid - 0x20;
    }
    else if (sid < 0x66) {
        bank = 6;
        offset = sid - 0x60;
    }
    else
        return undefined;
    const scripts = bankScripts(bank);
    return scripts[offset];
}
