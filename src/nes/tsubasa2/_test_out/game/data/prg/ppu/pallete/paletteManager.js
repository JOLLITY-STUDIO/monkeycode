"use strict";
/**
 * 调色板读写管理器
 * - 读取 nes.pal (NES 64 色系统调色板)
 * - 读写 paletteRAM (PPU $3F00-$3F1F, 32 字节)
 * - NES 颜色索引 → RGBA 转换
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.palRead = palRead;
exports.palWrite = palWrite;
exports.nesColorToRGBA = nesColorToRGBA;
exports.bgPalRead = bgPalRead;
exports.bgPalWrite = bgPalWrite;
exports.sprPalRead = sprPalRead;
exports.sprPalWrite = sprPalWrite;
exports.palWriteAll = palWriteAll;
exports.palExportRGBA = palExportRGBA;
exports.palReset = palReset;
exports.writeAddr = writeAddr;
const palleteCache_1 = require("./palleteCache");
const nes_pallete_table_1 = require("./nes-pallete-table");
// ── PPU 调色板 RAM 布局 ──
// $3F00-$3F0F: BG 调色板 0-3 (每组 4 字节)
// $3F10-$3F1F: 精灵调色板 0-3 (每组 4 字节)
// $3F04/$3F08/$3F0C 镜像 $3F00 的通用背景色
const BG_OFFSETS = [0x00, 0x04, 0x08, 0x0C];
const SPR_OFFSETS = [0x10, 0x14, 0x18, 0x1C];
// ── 基础读写 ──
/** 读 paletteRAM 指定偏移 */
function palRead(offset) {
    return palleteCache_1.paletteRAM[offset & 0x1F];
}
/** 写 paletteRAM 指定偏移 */
function palWrite(offset, value) {
    palleteCache_1.paletteRAM[offset & 0x1F] = value & 0x3F; // NES 仅用低 6 位
}
// ── NES 颜色索引 → RGBA ──
/** NES 颜色索引 (0-63) → {r,g,b,a} */
function nesColorToRGBA(index) {
    const i = (index & 0x3F) * 3;
    return {
        r: nes_pallete_table_1.NES_PALETTE[i],
        g: nes_pallete_table_1.NES_PALETTE[i + 1],
        b: nes_pallete_table_1.NES_PALETTE[i + 2],
        a: 255,
    };
}
// ── 按组读写 ──
/** 读 BG 调色板某组某颜色 → NES 索引 */
function bgPalRead(palIdx, colorIdx) {
    return palleteCache_1.paletteRAM[BG_OFFSETS[palIdx] + colorIdx] & 0x3F;
}
/** 写 BG 调色板某组某颜色 (NES 索引 0-63) */
function bgPalWrite(palIdx, colorIdx, nesColor) {
    palleteCache_1.paletteRAM[BG_OFFSETS[palIdx] + colorIdx] = nesColor & 0x3F;
}
/** 读精灵调色板某组某颜色 → NES 索引 */
function sprPalRead(palIdx, colorIdx) {
    return palleteCache_1.paletteRAM[SPR_OFFSETS[palIdx] + colorIdx] & 0x3F;
}
/** 写精灵调色板某组某颜色 (NES 索引 0-63) */
function sprPalWrite(palIdx, colorIdx, nesColor) {
    palleteCache_1.paletteRAM[SPR_OFFSETS[palIdx] + colorIdx] = nesColor & 0x3F;
}
// ── 全表操作 ──
/** 从原始 ROM 数据批量写入 32 字节调色板 */
function palWriteAll(data) {
    for (let i = 0; i < Math.min(data.length, 32); i++) {
        palleteCache_1.paletteRAM[i] = data[i] & 0x3F;
    }
}
/** 导出 8×4 RGBA 数组供渲染：bg[0..3] → spr[0..3]，每组 4 色 [r,g,b,a] */
function palExportRGBA() {
    const result = [];
    // BG 0-3
    for (const off of BG_OFFSETS) {
        for (let c = 0; c < 4; c++) {
            const idx = palleteCache_1.paletteRAM[off + c] & 0x3F;
            const rgb = nesColorToRGBA(idx);
            result.push([rgb.r, rgb.g, rgb.b, rgb.a]);
        }
    }
    // SPR 0-3
    for (const off of SPR_OFFSETS) {
        for (let c = 0; c < 4; c++) {
            const idx = palleteCache_1.paletteRAM[off + c] & 0x3F;
            if (c === 0) {
                result.push([0, 0, 0, 0]); // 精灵 color[0] 强制透明
            }
            else {
                const rgb = nesColorToRGBA(idx);
                result.push([rgb.r, rgb.g, rgb.b, rgb.a]);
            }
        }
    }
    return result;
}
/** 重置 paletteRAM 为全 0x0F (黑色) */
function palReset() {
    palleteCache_1.paletteRAM.fill(0x0F);
}
// ── 单点写入按地址（$3F00-$3F1F） ──
/** 写 $3Fxx 地址（模拟原始 ROM 写 PPU 的方式） */
function writeAddr(addr, value) {
    palleteCache_1.paletteRAM[addr & 0x1F] = value & 0x3F;
}
