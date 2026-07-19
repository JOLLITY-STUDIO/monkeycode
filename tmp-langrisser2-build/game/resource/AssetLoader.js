"use strict";
/**
 * ROM 资源统一加载器
 *
 * 对应 ROM 函数: FUN_000099b2 ($99B2), FUN_00009a0e ($9A0E), FUN_000099fa ($99FA)
 *
 * 加载流程 (ROM 原始逻辑):
 *   游戏场景 → 设置资源 ID
 *   → FUN_000099b2: 通用加载 + DMA
 *     → FUN_00009a0e: 资源指针表查找 (ROM $0B0000)
 *     → FUN_000099fa: 类型分发:
 *         Type 0x01: Nibble RLE → ROM→RAM buffer→DMA→VRAM
 *         Type 0x02: Bitplane   → ROM→RAM buffer→DMA→VRAM
 *         Type 0x03: LZSS       → ROM→RAM buffer→DMA→VRAM
 *     → DMA (0xFFF9 命令码): RAM buffer → VRAM 目标地址
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetLoader = void 0;
const NibbleRle_1 = require("./NibbleRle");
const Lzss_1 = require("./Lzss");
const Bitplane_1 = require("./Bitplane");
const types_1 = require("../core/types");
class AssetLoader {
    rom;
    ram;
    vram;
    constructor(rom, ram, vram) {
        this.rom = rom;
        this.ram = ram;
        this.vram = vram;
    }
    /**
     * 根据资源 ID 加载并 DMA 到 VRAM
     *
     * 对应 ROM 函数: FUN_000099b2 ($99B2)
     *
     * @param resourceId — 资源 ID (如 0x8001=字体)
     */
    loadResource(resourceId) {
        const entry = this.lookupResource(resourceId);
        if (!entry) {
            console.warn(`[AssetLoader] 资源 ${resourceId.toString(16)} 未找到`);
            return;
        }
        this.decompressAndDma(entry);
    }
    /**
     * 查找资源指针表 (ROM $0B0000)
     *
     * 对应 ROM 函数: FUN_00009a0e ($9A0E)
     *
     * 资源指针表格式:
     * - 每项 4 bytes (或更多, 需要读取 ROM 确认)
     * - 前 2 bytes: ROM offset (相对于 $0B0000 的偏移)
     * - 实际资源地址 = $0B0000 + offset
     */
    lookupResource(resourceId) {
        const ptrTableBase = types_1.RESOURCES.POINTER_TABLE_ROM;
        // 从指针表获取 ROM 地址
        const ptrOffset = resourceId * 2; // 2 bytes per pointer
        const ptrAddr = ptrTableBase + ptrOffset;
        const romOffset = this.rom.read16(ptrAddr);
        if (romOffset === 0 || romOffset >= types_1.ROM_REGIONS.resourcePtr.end) {
            return null;
        }
        const resourceAddr = ptrTableBase + romOffset;
        // TODO: 从资源头部读取压缩类型和目标大小
        // 资源头部格式 (ROM specific):
        // byte 0: compress type
        // bytes 1-2: decompressed size (大端序)
        // bytes 3-4: VRAM destination address (大端序)
        // byte 5+: compressed data
        const compressType = this.rom.read8(resourceAddr);
        const decompSize = this.rom.read16(resourceAddr + 1);
        // VRAM 目标: 跟在压缩类型和大小后面 (offset 3-4)
        const vramDest = this.rom.read16(resourceAddr + 3);
        return {
            romAddr: resourceAddr + 5, // 跳过 5-byte header
            compressType,
            decompressedSize: decompSize,
            vramDest,
        };
    }
    /**
     * 解压并 DMA 到 VRAM
     *
     * 对应 ROM 函数: FUN_000099fa ($99FA) — 类型分发
     *
     * 工作流程:
     *   1. 解压到 RAM buffer ($FF1000)
     *   2. DMA: RAM buffer → VRAM ($FFF9 命令)
     */
    decompressAndDma(entry) {
        const ramBuffer = types_1.RESOURCES.DECOMPRESS_RAM;
        // 确保 RAM buffer 足够大
        // (ROM 实际 buffer size 约 0x1000)
        const bufferSize = 0x1000;
        switch (entry.compressType) {
            case types_1.CompressType.NIBBLE_RLE:
                // Nibble RLE: ROM → RAM buffer
                NibbleRle_1.NibbleRle.decompress(this.rom, entry.romAddr, this.ram['data'], // FIXME: access internal data
                ramBuffer);
                break;
            case types_1.CompressType.BITPLANE:
                // Bitplane: ROM → RAM buffer
                Bitplane_1.Bitplane.decompress(this.rom, entry.romAddr, this.ram['data'], ramBuffer, 4);
                break;
            case types_1.CompressType.LZSS:
                // LZSS: ROM → RAM buffer
                // ★ BUG FIX: LZSS 压缩流不包含自己的 size 头, 从 5-byte header 获取
                Lzss_1.Lzss.decompress(this.rom, entry.romAddr, // stream starts at resourceAddr+5 (compressed data only)
                this.ram['data'], ramBuffer, entry.decompressedSize);
                break;
            default:
                console.warn(`[AssetLoader] 未知压缩类型: ${entry.compressType}`);
                return;
        }
        // DMA: RAM buffer → VRAM
        this.dmaToVram(ramBuffer, entry.vramDest, entry.decompressedSize);
    }
    /**
     * DMA 传输: RAM → VRAM
     *
     * DMA 命令码: 0xFFF9 (标准传输)
     * 格式: word[0]=0xFFF9 word[1]=dest addr word[2]=src addr word[3]=length
     */
    dmaToVram(srcAddr, dstVram, length) {
        // 设置 VRAM 写地址
        // VDP_CTRL = (dstVram & 0x3FFF) | (0x40000000)  → CD=01 (VRAM write)
        const ctrlHi = 0x4000 | (dstVram & 0x3FFF); // CD=01, A0-A13
        const ctrlLo = (dstVram >> 14) & 0x03; // A14-A15
        this.vram['setAddress'](ctrlHi, ctrlLo); // FIXME: publicize setAddress
        // 从 RAM 读 words 并写入 VRAM
        for (let i = 0; i < length; i += 2) {
            const word = this.ram.read16(srcAddr + i);
            this.vram.writeData(word);
        }
    }
}
exports.AssetLoader = AssetLoader;
