"use strict";
/**
 * ROM 数据聚合导出（本地副本）
 *
 * 替代已移除的外部 `rom-data` 目录：使用 src/game/data 下已内联的
 * PRG/CHR bank 副本拼装出完整的 NES_PRG_ROM / NES_CHR_ROM。
 *
 * 仅用于 bankpage 调试页浏览原始 ROM；游戏引擎本身直接 import
 * 各 bank 的本地副本，无需此聚合。
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_ROM_SIZE = exports.PRG_ROM_SIZE = exports.NES_CHR_ROM = exports.NES_PRG_ROM = exports.CHR_BANK_SIZE = exports.PRG_BANK_SIZE = void 0;
// ── PRG Banks (全部 32 个本地副本, 已与 ROM 逐字节校验一致) ──
const prg_bank_00_1 = __importDefault(require("../prg-bank-00"));
const prg_bank_01_1 = __importDefault(require("../prg-bank-01"));
const prg_bank_02_1 = __importDefault(require("../prg-bank-02"));
// bank03-06 已删除（纯脚本数据，翻译产物在 scene/textscript/，不再用原始 PRG 字节）
const prg_bank_07_1 = __importDefault(require("../prg-bank-07"));
const prg_bank_08_1 = __importDefault(require("../prg-bank-08"));
const prg_bank_09_1 = __importDefault(require("../prg-bank-09"));
const prg_bank_10_1 = __importDefault(require("../prg-bank-10"));
const prg_bank_11_1 = __importDefault(require("../prg-bank-11"));
const prg_bank_12_1 = __importDefault(require("../prg-bank-12"));
const prg_bank_13_1 = __importDefault(require("../prg-bank-13"));
const prg_bank_14_1 = __importDefault(require("../prg-bank-14"));
const prg_bank_15_1 = __importDefault(require("../prg-bank-15"));
const prg_bank_16_1 = __importDefault(require("../prg-bank-16"));
const prg_bank_17_1 = __importDefault(require("../prg-bank-17"));
const prg_bank_18_1 = __importDefault(require("../prg-bank-18"));
const prg_bank_19_1 = __importDefault(require("../prg-bank-19"));
const prg_bank_20_1 = __importDefault(require("../prg-bank-20"));
const prg_bank_21_1 = __importDefault(require("../prg-bank-21"));
const prg_bank_22_1 = __importDefault(require("../prg-bank-22"));
const prg_bank_23_1 = __importDefault(require("../prg-bank-23"));
const prg_bank_24_1 = __importDefault(require("../prg-bank-24"));
const prg_bank_25_1 = __importDefault(require("../prg-bank-25"));
const prg_bank_26_1 = __importDefault(require("../prg-bank-26"));
const prg_bank_27_1 = __importDefault(require("../prg-bank-27"));
const prg_bank_28_1 = __importDefault(require("../prg-bank-28"));
const prg_bank_29_1 = __importDefault(require("../prg-bank-29"));
const prg_bank_30_1 = __importDefault(require("../prg-bank-30"));
const prg_bank_31_1 = __importDefault(require("../prg-bank-31"));
// ── CHR Banks (全部 16 个本地副本) ──
const chr_bank_00_1 = __importDefault(require("../chr/chr-bank-00"));
const chr_bank_01_1 = __importDefault(require("../chr/chr-bank-01"));
const chr_bank_02_1 = __importDefault(require("../chr/chr-bank-02"));
const chr_bank_03_1 = __importDefault(require("../chr/chr-bank-03"));
const chr_bank_04_1 = __importDefault(require("../chr/chr-bank-04"));
const chr_bank_05_1 = __importDefault(require("../chr/chr-bank-05"));
const chr_bank_06_1 = __importDefault(require("../chr/chr-bank-06"));
const chr_bank_07_1 = __importDefault(require("../chr/chr-bank-07"));
const chr_bank_08_1 = __importDefault(require("../chr/chr-bank-08"));
const chr_bank_09_1 = __importDefault(require("../chr/chr-bank-09"));
const chr_bank_10_1 = __importDefault(require("../chr/chr-bank-10"));
const chr_bank_11_1 = __importDefault(require("../chr/chr-bank-11"));
const chr_bank_12_1 = __importDefault(require("../chr/chr-bank-12"));
const chr_bank_13_1 = __importDefault(require("../chr/chr-bank-13"));
const chr_bank_14_1 = __importDefault(require("../chr/chr-bank-14"));
const chr_bank_15_1 = __importDefault(require("../chr/chr-bank-15"));
exports.PRG_BANK_SIZE = 0x2000; // 8192
exports.CHR_BANK_SIZE = 0x2000; // 8192
/** 本地 PRG bank 副本表（bank 数据为 readonly number[]，拼装时转 number[]） */
const PRG_COPIES = {
    0: [...prg_bank_00_1.default], 1: [...prg_bank_01_1.default], 2: [...prg_bank_02_1.default],
    // bank 3-6 已删除（脚本数据翻译到 scene/textscript/，不再聚合到 NES_PRG_ROM）
    7: [...prg_bank_07_1.default],
    8: [...prg_bank_08_1.default], 9: [...prg_bank_09_1.default], 10: [...prg_bank_10_1.default], 11: [...prg_bank_11_1.default],
    12: [...prg_bank_12_1.default], 13: [...prg_bank_13_1.default], 14: [...prg_bank_14_1.default], 15: [...prg_bank_15_1.default],
    16: [...prg_bank_16_1.default], 17: [...prg_bank_17_1.default], 18: [...prg_bank_18_1.default], 19: [...prg_bank_19_1.default],
    20: [...prg_bank_20_1.default], 21: [...prg_bank_21_1.default], 22: [...prg_bank_22_1.default], 23: [...prg_bank_23_1.default],
    24: [...prg_bank_24_1.default], 25: [...prg_bank_25_1.default], 26: [...prg_bank_26_1.default], 27: [...prg_bank_27_1.default],
    28: [...prg_bank_28_1.default], 29: [...prg_bank_29_1.default], 30: [...prg_bank_30_1.default], 31: [...prg_bank_31_1.default],
};
/** CHR bank 副本表（16 个全量） */
const CHR_COPIES = [
    [...chr_bank_00_1.default], [...chr_bank_01_1.default], [...chr_bank_02_1.default], [...chr_bank_03_1.default], [...chr_bank_04_1.default], [...chr_bank_05_1.default], [...chr_bank_06_1.default], [...chr_bank_07_1.default],
    [...chr_bank_08_1.default], [...chr_bank_09_1.default], [...chr_bank_10_1.default], [...chr_bank_11_1.default], [...chr_bank_12_1.default], [...chr_bank_13_1.default], [...chr_bank_14_1.default], [...chr_bank_15_1.default],
];
/**
 * 拼装完整 PRG ROM (32 × 8192 = 256KB)。全部 32 个 bank 均有本地副本。
 */
exports.NES_PRG_ROM = (() => {
    const rom = new Array(32 * exports.PRG_BANK_SIZE).fill(0xFF);
    for (const idStr of Object.keys(PRG_COPIES)) {
        const id = Number(idStr);
        const bank = PRG_COPIES[id];
        for (let i = 0; i < exports.PRG_BANK_SIZE && i < bank.length; i++) {
            rom[id * exports.PRG_BANK_SIZE + i] = bank[i];
        }
    }
    return rom;
})();
/** 拼装完整 CHR ROM (16 × 8192 = 128KB) */
exports.NES_CHR_ROM = (() => {
    const rom = new Array(16 * exports.CHR_BANK_SIZE).fill(0xFF);
    for (let id = 0; id < 16; id++) {
        const bank = CHR_COPIES[id];
        if (!bank)
            continue;
        for (let i = 0; i < exports.CHR_BANK_SIZE && i < bank.length; i++) {
            rom[id * exports.CHR_BANK_SIZE + i] = bank[i];
        }
    }
    return rom;
})();
exports.PRG_ROM_SIZE = exports.NES_PRG_ROM.length; // 262144
exports.CHR_ROM_SIZE = exports.NES_CHR_ROM.length; // 131072
