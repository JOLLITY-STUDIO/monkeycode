"use strict";
/**
 * Bank 25 数据模型 (Data/Model 层) — HUD 文本流数据 / 精灵配置表
 *
 * 来源: ./prg-bank-25 本地副本 (自动生成, 原始字节, 复制自 rom-data)
 * 数据已直接 import，cpuAddr (0xA000-0xBFFF) 仅作数据索引保留
 *           offset = cpuAddr - 0xA000
 *
 * Bank 25 是纯数据 bank (无代码)。Bank 24 (HUD service) 引用了本 bank 的
 * 指针表与文本流数据:
 *   - $AD6E  HUD 行1 指针表 (2B/条目, ≥12 条目, 数据区自 $ADF6 起)
 *   - $AD1C  HUD 行2 指针表 (2B/条目, 4 条目 $AD1C-$AD23, 数据区自 $AD24 起)
 *   - $AD54  HUD 行3 指针表 (2B/条目, 5 条目 $AD54-$AD5D, 数据区自 $AD5E 起)
 *   - $B3BD  精灵位段表 (入口 $8851: Y=A>>2 取 1 字节, 再按 A&3 取 2bit 段)
 *   - $B3CF  精灵数据指针表 (入口 $8851: X=A*2 取 2B 指针 → 精灵数据块)
 *
 * 当前阶段: 直接复制原始字节, 暂不结构化。待文本流/精灵数据块语义分析
 * 完成后, 再拆分为命名数据表。
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.B25_SEG = exports.B25_CPU_BASE = exports.B25_DATA = void 0;
exports.readB25 = readB25;
exports.readB25U16 = readB25U16;
exports.readHud1Ptr = readHud1Ptr;
exports.readHud2Ptr = readHud2Ptr;
exports.readHud3Ptr = readHud3Ptr;
exports.readSprPtr = readSprPtr;
exports.readSprBits = readSprBits;
const prg_bank_25_1 = __importDefault(require("./prg-bank-25"));
/** Bank 25 完整 8KB 原始字节 (本地副本, 不直接引用 rom-data) */
exports.B25_DATA = prg_bank_25_1.default;
/** bank25 CPU 基址 ($A000-$BFFF) */
exports.B25_CPU_BASE = 0xa000;
/** bank25 逻辑区段 (CPU 地址) */
exports.B25_SEG = {
    /** HUD 行1 指针表 */
    HUD1_PTR: 0xad6e,
    /** HUD 行2 指针表 (4 条目) */
    HUD2_PTR: 0xad1c,
    /** HUD 行3 指针表 (5 条目) */
    HUD3_PTR: 0xad54,
    /** 精灵位段表 */
    SPR_BITS: 0xb3bd,
    /** 精灵数据指针表 */
    SPR_PTR: 0xb3cf,
};
/** 读 bank25 原始字节 (CPU 地址 $A000-$BFFF) */
function readB25(cpuAddr) {
    const off = cpuAddr - exports.B25_CPU_BASE;
    return off >= 0 && off < exports.B25_DATA.length ? exports.B25_DATA[off] : 0;
}
/** 读 bank25 16bit LE (CPU 地址) */
function readB25U16(cpuAddr) {
    return readB25(cpuAddr) | (readB25(cpuAddr + 1) << 8);
}
// ═══════════════════════════════════════════════════════════════
// 便捷读取 (按汇编入口语义, 避免 service 直接拼地址)
// ═══════════════════════════════════════════════════════════════
/** HUD 行1 指针表: X = (ram_0532&0x7F)-1 (ASL 由调用方做) */
function readHud1Ptr(idx) {
    return readB25U16(exports.B25_SEG.HUD1_PTR + idx * 2);
}
/** HUD 行2 指针表: X = (ram_0534&0x7F)-1 (ASL 由调用方做) */
function readHud2Ptr(idx) {
    return readB25U16(exports.B25_SEG.HUD2_PTR + idx * 2);
}
/** HUD 行3 指针表: X = (ram_0536&0x7F)-1 (ASL 由调用方做) */
function readHud3Ptr(idx) {
    return readB25U16(exports.B25_SEG.HUD3_PTR + idx * 2);
}
/** 精灵数据指针表: X = A*2 → 2B 指针 (存入 ram_0050/0051) */
function readSprPtr(a) {
    return readB25U16(exports.B25_SEG.SPR_PTR + a * 2);
}
/**
 * 精灵位段表: Y = A>>2 取 1 字节; 再按 A&3 取 2bit 段。
 * 对应汇编 $8862-$886F: TYA; LSR; LSR; TAY; LDA $B3BD,Y; (A&3 次) LSR; LSR。
 */
function readSprBits(a) {
    let v = readB25(exports.B25_SEG.SPR_BITS + (a >> 2));
    const seg = a & 3;
    for (let i = 0; i < seg; i++)
        v >>= 2;
    return v & 3;
}
