"use strict";
/**
 * Bank 18 数据 (Data/Model 层) — 原始提取, 未结构化
 *
 * 来源: rom-data/prg-bank-18.ts (自动生成, 原始字节, 自动提取)
 * 数据已直接 import, cpuAddr (0x8000-0x9FFF) 仅作数据索引保留
 * PRG offset: 0x024010-0x02600F
 *
 * ⚠ 本文件由脚本自动提取, 不结构化。service 仅通过 readB18/readB18U16
 *   访问本 bank 数据, 不直接引用 rom-data/prg-bank-18.ts。
 *
 * ⚠ 章节指针表说明: 本 bank 经完整反汇编确认是「渲染数据 Bank」——
 *   全部为背景 tile 图块 (bg tile 索引) / 精灵对数据, 数据值集中在
 *   $01/$0D/$1A/$50-$5F/$E8/$F0/$1E/$34/$3C/$41/$44/$80-$99 等 tile
 *   索引区间, 不含任何 .word 章节指针数组。章节→Bank19 数据流偏移映射
 *   由 Bank00/Bank02 代码跨 bank 维护, 不在本 bank。
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.B18_DATA = exports.B18_CPU_BASE = void 0;
exports.readB18 = readB18;
exports.readB18U16 = readB18U16;
exports.readB18TileRow = readB18TileRow;
exports.readB18Byte = readB18Byte;
const prg_bank_18_1 = __importDefault(require("./prg-bank-18"));
/** bank18 CPU 基址 */
exports.B18_CPU_BASE = 0x8000;
/** bank18 原始字节 (CPU $8000-$9FFF) */
exports.B18_DATA = prg_bank_18_1.default;
/**
 * 读 bank18 内 cpuAddr 处的原始字节。
 * bank18 无代码, 数据经 $8000-$9FFF (R6) 直接访问。
 */
function readB18(cpuAddr) {
    const off = cpuAddr - exports.B18_CPU_BASE;
    return off >= 0 && off < exports.B18_DATA.length ? exports.B18_DATA[off] : 0;
}
/** 读 bank18 16bit LE (CPU 地址) */
function readB18U16(cpuAddr) {
    return readB18(cpuAddr) | (readB18(cpuAddr + 1) << 8);
}
// ═══════════════════════════════════════════════════════════════
// 结构化数据访问
// ═══════════════════════════════════════════════════════════════
/**
 * 背景 tile 图块读取。
 * bank18 的数据大量以 16 字节一行的 4×4 tile 图块 (bg) 排布,
 * 每行对应一个 4×4=16 tile 的背景块。行基址 = $8000 + row*16。
 *
 * 偏移 (0-15) 按行列: 行 = off >> 2, 列 = off & 3。
 */
function readB18TileRow(row) {
    const base = row * 16;
    const out = [];
    for (let i = 0; i < 16; i++) {
        out.push(readB18(0x8000 + base + i));
    }
    return out;
}
/**
 * 精灵对读取 (tile 对)。
 * bank18 多处出现 $50/$51/$54/$55 + $52/$53/$56/$57 等 2×2 精灵对
 * (如路沿/装饰), 以 4 字节为一对连续索引。
 *
 * 注: 本 bank 无指针表, 各数据段的业务边界 (哪些行属于哪张场景地图)
 * 由 Bank00/Bank02 跨 bank 引用定位, 此处仅提供按偏移的基础读取。
 */
function readB18Byte(off) {
    return off >= 0 && off < exports.B18_DATA.length ? exports.B18_DATA[off] : 0;
}
