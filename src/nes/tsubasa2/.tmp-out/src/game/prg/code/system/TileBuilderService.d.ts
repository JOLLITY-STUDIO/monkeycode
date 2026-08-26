/**
 * TileBuilderService — bank00 $88CA-$8AB2 tile constructor 翻译
 *
 * 翻译原则（v2）：
 *   - 不模拟 JSR $9B28 (sprite alloc) / STA $05E8,X (sprite buf write)
 *   - 用 PpuTransferService.commitSprite4 直接 append 到 renderQueue
 *   - $8A14 ASCII → tile 查表改为声明式 ASCII_TO_TILE_TABLE
 *
 * 对应 PRG 段（docs/BANK00_ANALYSIS.md §2.1）：
 *   $88CA: tile constructor (char / NT lo byte 双路径)
 *   $88ED: < $A0: NT lo byte path（NT 4-byte entry）
 *   $88D5: ≥ $A0: ASCII char path（查 $8A14 表）
 *   $88FB: palette xor (sprite attr flip)
 *   $890C: accumulator (sprite Y 累加)
 *   $8920: OAM/PPU dump (sprite OAM → PPU transfer)
 *   $8A14: ASCII → tile lookup table (16 bytes)
 *   $8A91: 4-byte tile constructor (从 ptr 读 4 字节)
 *
 * 数据表：
 *   $8A14: ASCII → tile (16 字节: 0-9 A-F 范围)
 *   $88D2: 256-byte OAM default template ($F8 init pattern)
 *
 * P2 重要：tile constructor 是 scene render 的基本单元
 */
import type { DataStore } from '../../data/store/DataStore';
import { PpuTransferService } from './PpuTransferService';
export declare class TileBuilderService {
    readonly store: DataStore;
    private readonly ppu;
    constructor(store: DataStore, ppu?: PpuTransferService | null);
    /**
     * Char tile constructor（PRG $88CA-$88EC 翻译）。
     *
     * ROM 行为：
     *   1. PHA 暂存 tile idx
     *   2. LDA #$82 / JSR $9B28 (sprite alloc)
     *   3. PLA 取回 tile idx
     *   4. CMP #$A0 / BCC $88ED (≤ $9F → NT lo byte path)
     *      else:
     *        - CMP #$C8 算 sub-offset
     *        - LDA #$94 / ADC #$00 = (C8 - $C8 + $94) = hi byte
     *        - STA $05E8,X (tile byte 1)
     *        - INX / PLA → TAY / LDA $8A14,Y (查表)
     *        - STA $05E8,X (tile byte 2)
     *        - INX / JSR $9B5E (commit)
     *   5. NT lo byte path: STA $05E9,X / LDA #$00 / STA $05E8,X / INX INX / JSR $9B5E
     *
     * H5 语义：commitSprite4 / commit 4-byte entry
     *
     * @param tileIdx tile 索引（0..255）
     * @returns 是否成功 commit
     */
    buildCharTile(tileIdx: number): boolean;
    /**
     * 4-byte tile constructor（PRG $8A91-$8AB2 翻译）。
     *
     * ROM 行为：
     *   1. LDA #$84 / JSR $9B28 (alloc)
     *   2. Y=0 起 LDA ($E8),Y → STA $05E8,X (4 次循环)
     *   3. JSR $9B5E (commit)
     *   4. $E8 += 4 (advance src ptr)
     *
     * H5 语义：commitSprite4 + 推 src ptr
     *
     * @param bytes 4 字节 tile descriptor [tile, attr, x_lo, x_hi]
     * @returns 是否成功 commit
     */
    buildTile4(bytes: ReadonlyArray<number>): boolean;
    /**
     * Sprite attr palette XOR（PRG $88FB-$890B 翻译）。
     *
     * ROM 行为：iterate 64 sprite，每 4 字节 attr ^= 0x20
     *
     * H5 语义：直接修改 store.shadowOam attr 字段
     */
    flipAllSpritePalettes(): void;
    /**
     * Sprite Y 累加器（PRG $890C-$891F 翻译）。
     *
     * ROM 行为：所有 sprite Y += value
     *
     * H5 语义：直接修改 store.shadowOam Y 字段
     *
     * @param value 加的 delta（可负）
     */
    shiftAllSpriteY(value: number): void;
    /**
     * OAM → PPU transfer（PRG $8920-$895C 翻译占位）。
     *
     * ROM 行为：从 store.shadowOam → ppu.spriteMem via DMA
     *
     * H5 语义：占位 — 实际由 InterruptService.oamDma 接管
     *
     * @param pcid PPU target（提供 spriteRam 写入能力）
     */
    oamDump(): void;
    /**
     * 主循环内层（PRG $89A3-$89CD 翻译占位）。
     *
     * ROM 行为：
     *   1. Y=$FC → copy 256 字节从 $88D2 到 $0468 (Y loop)
     *   2. LDX #$F8 / LDY #$00 / LDA #$01 / JSR $9FA8
     *
     * H5 语义：初始化所有 sprite to default template，然后 push state
     */
    initOamFromTemplate(): void;
    /** ASCII char → tile idx（PRG $8A14 占位查表） */
    asciiToTile(asciiCode: number): number;
}
