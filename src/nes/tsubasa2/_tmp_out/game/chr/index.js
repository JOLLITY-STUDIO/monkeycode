"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NES_CHR_ROM = exports.CHR_BANKS = exports.CHR_BANK_COUNT = exports.CHR_BANK_SIZE = void 0;
/** CHR-ROM 聚合 — 16 × 8KB = 128KB (真实 ROM 字节) */
const chr_bank_00_1 = __importDefault(require("./chr-bank-00"));
const chr_bank_01_1 = __importDefault(require("./chr-bank-01"));
const chr_bank_02_1 = __importDefault(require("./chr-bank-02"));
const chr_bank_03_1 = __importDefault(require("./chr-bank-03"));
const chr_bank_04_1 = __importDefault(require("./chr-bank-04"));
const chr_bank_05_1 = __importDefault(require("./chr-bank-05"));
const chr_bank_06_1 = __importDefault(require("./chr-bank-06"));
const chr_bank_07_1 = __importDefault(require("./chr-bank-07"));
const chr_bank_08_1 = __importDefault(require("./chr-bank-08"));
const chr_bank_09_1 = __importDefault(require("./chr-bank-09"));
const chr_bank_10_1 = __importDefault(require("./chr-bank-10"));
const chr_bank_11_1 = __importDefault(require("./chr-bank-11"));
const chr_bank_12_1 = __importDefault(require("./chr-bank-12"));
const chr_bank_13_1 = __importDefault(require("./chr-bank-13"));
const chr_bank_14_1 = __importDefault(require("./chr-bank-14"));
const chr_bank_15_1 = __importDefault(require("./chr-bank-15"));
exports.CHR_BANK_SIZE = 0x2000; // 8192
exports.CHR_BANK_COUNT = 16;
/** CHR bank 表 (每个 8KB) */
exports.CHR_BANKS = [
    chr_bank_00_1.default, chr_bank_01_1.default, chr_bank_02_1.default, chr_bank_03_1.default,
    chr_bank_04_1.default, chr_bank_05_1.default, chr_bank_06_1.default, chr_bank_07_1.default,
    chr_bank_08_1.default, chr_bank_09_1.default, chr_bank_10_1.default, chr_bank_11_1.default,
    chr_bank_12_1.default, chr_bank_13_1.default, chr_bank_14_1.default, chr_bank_15_1.default,
];
/** 完整 CHR ROM (128KB Uint8Array, 供 core ROM.loadTs 直接加载) */
exports.NES_CHR_ROM = (() => {
    var _a;
    const rom = new Uint8Array(exports.CHR_BANK_COUNT * exports.CHR_BANK_SIZE);
    for (let b = 0; b < exports.CHR_BANK_COUNT; b++) {
        const bank = exports.CHR_BANKS[b];
        for (let i = 0; i < exports.CHR_BANK_SIZE; i++) {
            rom[b * exports.CHR_BANK_SIZE + i] = (_a = bank[i]) !== null && _a !== void 0 ? _a : 0xff;
        }
    }
    return rom;
})();
