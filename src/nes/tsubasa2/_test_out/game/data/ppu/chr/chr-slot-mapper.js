"use strict";
/**
 * MMC3 CHR 1KB slot → H5 8KB bank/tile 参考映射器
 *
 * ⚠️ 仅作参考/校验用，H5 不启用硬件模拟。H5 直接 import 全部 CHR bank 数据
 * (16 × 8KB = 128KB, 与 ROM CHR 完全一致), 无需 MMC3 bank 切换。
 *
 * 当场景数据给出原始 MMC3 chrBanks (8 个 1KB slot) + OAM/NT tile 时,
 * 用本工具把 (slot, tile) 翻译成 H5 渲染所需的 (8KB bank, tile):
 *
 *   模拟器语义 (tsnes mapper0.load1kVromBank, 已验证):
 *     slot 0-3   → PPU $0000-$0FFF (BG pattern table 0)
 *     slot 4-7   → PPU $1000-$1FFF (SPR pattern table 1)
 *     1KB chunk C = chrBanks[slot]
 *     bank4k     = floor(C / 4) % vromCount (vromCount = 32 个 4KB 块)
 *     tile 偏移   = (bank4k % 2) * 128 + (C % 4) * 64 + (tile & 0x3F)
 *
 *   H5 8KB bank = bank4k >> 1 (0-15)。
 *
 * 已验证 (2026-08-20, _tmp_chr_verify.cjs):
 *   BOOT chrBanks [00,01,02,03,FC,71,52,53] 下 62/62 tile 字节一致:
 *     NT tile (pattern 0)      → H5 bank 0,  tile 原样
 *     SPR tile 0x40-0x7F        → H5 bank 14 (slot5 = 0x71)
 *     SPR tile 0x80-0xBF        → H5 bank 10 (slot6 = 0x52)
 *     SPR tile 0xC0-0xFF        → H5 bank 10 (slot7 = 0x53)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapChrSlotToH5 = mapChrSlotToH5;
exports.spriteAttrToPalette = spriteAttrToPalette;
/** H5 注册的 8KB CHR bank 总数 */
const H5_CHR_BANK_COUNT = 16;
/** 模拟器 vromCount (4KB 块数) */
const VROM_4K_COUNT = 32;
/**
 * 把 (chrBanks, patternTable, tile) 翻译成 H5 (8KB bank, tile)。
 * @param chrBanks MMC3 8 个 1KB slot 值
 * @param tile     原始 OAM/NT tile 索引 (0-255)
 * @param patternTable 0 = BG ($0000-$0FFF), 1 = SPR ($1000-$1FFF)
 */
function mapChrSlotToH5(chrBanks, tile, patternTable) {
    if (chrBanks.length < 8)
        return null;
    const slot = (patternTable === 0 ? 0 : 4) + ((tile & 0xFF) >> 6);
    const chunk = chrBanks[slot] & 0xFF;
    const bank4k = Math.floor(chunk / 4) % VROM_4K_COUNT;
    const bank = Math.floor(bank4k / 2);
    if (bank >= H5_CHR_BANK_COUNT) {
        return { bank: null, tile: 0, chunk, slot };
    }
    const h5Tile = ((bank4k % 2) * 128 + (chunk % 4) * 64 + (tile & 0x3F)) & 0xFF;
    return { bank, tile: h5Tile, chunk, slot };
}
/**
 * 批量翻译 BOOT 阶段精灵: 返回 H5 DataStore SpriteEntry 需要的 (bank, tile)。
 * attr → sprite palette 组映射 (NES attr 2bit → H5 sprPalettes 0-3 → palette 4-7):
 *   attr 0 → 4, attr 1 → 5, attr 2 → 6, attr 3 → 7
 */
function spriteAttrToPalette(attr) {
    return ((attr & 0x03) + 4) & 0x07;
}
