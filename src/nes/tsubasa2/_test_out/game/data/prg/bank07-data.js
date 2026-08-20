"use strict";
/**
 * Bank 07 数据模型 (Data/Model 层) — 场景/场地数据 bank
 *
 * 来源: rom-data/prg-bank-07.ts (自动生成, 原始字节)
 * 数据已直接 import，CPU 地址 $8000-$9FFF 作索引 (bank offset = cpuAddr - 0x8000)
 * PRG offset: 0x00E010-0x01000F (bank #7, 8KB)
 *
 * bank07 是纯数据 bank (CDL 无代码行), 布局:
 *   0x0000-0x00D3  场景指针表 (106 × 16-bit LE CPU 地址指针, 值 = $A000 + bank offset)
 *   0x00D4-0x1FFF  场景 header 数据区 (各场景按指针连续排布, 由 $8AF7 sceneLoad 索引)
 *
 * 场景 header 机制 ($8AF7 sceneLoad, bank00):
 *   sceneId → 指针表 ($A000 + sceneId*2) → header 地址
 *   header[0..1] = 场景类型字节对 (7C 7E / 3C 3E / 5C 5E / 3A 00 / 64 66 ...)
 *   header[2] & 0x3F = BG 调色板组号 → ram_0048 (调色板数据在 bank06 $1000 + grp*16)
 *   SPR 组号由场景 setup 指令 (0x80+ 操作码) 设置 → ram_0049 (默认 0)
 *   场景数据体 = metatile 索引流, 由 $8E15 渲染:
 *     $8EF0: 索引 → 表地址 = $A000 + idx*17 (切 bank08, b=0)
 *     每条 metatile = 16 tile 字节 (4×4) + 1 属性字节
 *     已解码产物见 ppu/nametable/cut/cut_0x17_nt.ts (scene 0x17)
 *   header 常以 00 A0 (=$A000 表基址?) 结尾, 相邻场景 header 连续排布
 *
 * 已验证:
 *   - 106 项指针解析正确 (offset 0xD4-0x1FD9)
 *   - 已知 24 项场景 BG 组号与 scene-palette-group.ts SCENE_BG_GRP 全吻合
 *   - scene 0x17 header[2]=0x81 → grp 1, 与 cut_0x17_nt.ts CUT_0x17_BG_GRP=1 一致
 *
 * TODO:
 *   - 场景 header 字节码语义逐字节解码 (3C/3D/3E/3F 行命令、00 A0 终止、00 BF/3F 08 标记)
 *   - bank08 metatile 表数据建模 (17B/条, 供渲染器使用)
 *   - 场地 tile 数据区 (part02-05: 0x03E4/0x07CC 起) 与 header 的引用关系
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.B7_SCENE_BG_GRP = exports.B7_SCENE_POINTERS = exports.B7_SCENE_DATA_OFFSET = exports.B7_SCENE_COUNT = exports.B7_PTR_TABLE_OFFSET = exports.B7_SIZE = exports.B7_PTR_BASE = exports.B7_CPU_BASE = void 0;
exports.readB7 = readB7;
exports.readB7U16 = readB7U16;
exports.getScenePtr = getScenePtr;
exports.getSceneOffset = getSceneOffset;
exports.getSceneHeader = getSceneHeader;
exports.getSceneBgGrp = getSceneBgGrp;
const prg_bank_07_1 = __importDefault(require("./prg-bank-07"));
/** bank07 CPU 窗口基址 ($8000-$9FFF) */
exports.B7_CPU_BASE = 0x8000;
/** 场景指针基准地址 (指针值 = $A000 + bank offset) */
exports.B7_PTR_BASE = 0xa000;
/** bank07 长度 (8KB) */
exports.B7_SIZE = 0x2000;
/** 场景指针表 CPU 起始地址 ($8000) */
exports.B7_PTR_TABLE_OFFSET = 0x8000;
/** 场景指针表项数 */
exports.B7_SCENE_COUNT = 106;
/** 首个场景 header 的 bank offset */
exports.B7_SCENE_DATA_OFFSET = 0x00d4;
/** 读 bank07 原始字节 (CPU 地址 $8000-$9FFF, 越界返回 $FF) */
function readB7(cpuAddr) {
    const off = cpuAddr - exports.B7_CPU_BASE;
    return off >= 0 && off < prg_bank_07_1.default.length ? prg_bank_07_1.default[off] : 0xff;
}
/** 读 bank07 16bit LE (CPU 地址) */
function readB7U16(cpuAddr) {
    return readB7(cpuAddr) | (readB7(cpuAddr + 1) << 8);
}
/** 场景指针表 (CPU 地址 $A000+offset, 106 项) — 由原始字节解析 */
exports.B7_SCENE_POINTERS = (() => {
    const out = [];
    for (let i = 0; i < exports.B7_SCENE_COUNT; i++) {
        out.push(readB7U16(exports.B7_PTR_TABLE_OFFSET + i * 2));
    }
    return out;
})();
/** 获取场景 header 指针 (CPU 地址), 越界返回 0 */
function getScenePtr(sceneId) {
    if (sceneId < 0 || sceneId >= exports.B7_SCENE_COUNT)
        return 0;
    return exports.B7_SCENE_POINTERS[sceneId];
}
/** 场景 header 的 bank offset (= 指针 - $A000), 越界返回 -1 */
function getSceneOffset(sceneId) {
    const ptr = getScenePtr(sceneId);
    return ptr === 0 ? -1 : ptr - exports.B7_PTR_BASE;
}
/**
 * 获取场景 header 字节流 (从本场景指针到下一场景指针, 末场景到 bank 尾)。
 * 读不到时返回空数组。
 */
function getSceneHeader(sceneId) {
    const start = getSceneOffset(sceneId);
    if (start < 0)
        return [];
    const end = sceneId + 1 < exports.B7_SCENE_COUNT
        ? getSceneOffset(sceneId + 1)
        : prg_bank_07_1.default.length;
    const out = [];
    for (let off = start; off < end; off++) {
        out.push(prg_bank_07_1.default[off]);
    }
    return out;
}
/**
 * 场景 BG 调色板组号 (header[2] & 0x3F), 越界返回 0。
 * 语义: $8AF7 sceneLoad → ram_0048 → $9A35 paletteLoad → bank06 $1000 + grp*16
 */
function getSceneBgGrp(sceneId) {
    const start = getSceneOffset(sceneId);
    if (start < 0 || start + 2 >= prg_bank_07_1.default.length)
        return 0;
    return prg_bank_07_1.default[start + 2] & 0x3f;
}
/**
 * 全部场景 BG 组号表 (106 项, 由 header 实时解析)。
 * 前 24 项 (0x00-0x17) 与 scene-palette-group.ts SCENE_BG_GRP 已核对一致。
 */
exports.B7_SCENE_BG_GRP = (() => {
    const out = [];
    for (let i = 0; i < exports.B7_SCENE_COUNT; i++)
        out.push(getSceneBgGrp(i));
    return out;
})();
