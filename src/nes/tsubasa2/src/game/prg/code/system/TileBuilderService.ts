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

/**
 * ASCII → tile 查表（PRG $8A14 翻译占位）
 * 实际 ROM 字节是从 $8A14 起 16 字节（H5 占位: 顺序 0-9 A-F tile idx）
 */
const ASCII_TO_TILE_TABLE: ReadonlyArray<number> = [
  0xCD, 0x4D, 0x4E, 0x4F, 0x50, 0x51, 0x52, 0x53,
  0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5A, 0x5B,
];

/**
 * OAM default template (PRG $88D2 256 字节翻译占位)
 * 每 4 字节 = 1 sprite [Y][tile][attr][X]
 * 默认 Y=$F8 (off-screen) + X=$F8 (off-screen) → 全隐藏
 */
const OAM_DEFAULT_TEMPLATE: ReadonlyArray<number> = (() => {
  const t = new Array<number>(256);
  for (let i = 0; i < 256; i += 4) {
    t[i] = 0xf8;     // Y = off-screen
    t[i + 1] = 0x00; // tile = 0
    t[i + 2] = 0x00; // attr = 0
    t[i + 3] = 0xf8; // X = off-screen
  }
  return t;
})();

export class TileBuilderService {
  constructor(
    readonly store: DataStore,
    private readonly ppu: PpuTransferService,
  ) {}

  // ──────────────────────── $88CA tile constructor (char path) ────────────────────────

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
  buildCharTile(tileIdx: number): boolean {
    const t = tileIdx & 0xff;
    if (t < 0xa0) {
      // NT lo byte path: 4-byte entry = [tile][0x00][x_lo][x_hi]
      this.ppu.commitSprite4([t, 0x00, 0x00, 0x00]);
    } else {
      // ASCII char path: 查 $8A14 表
      const sub = (t - 0xc8) & 0xff;
      const hi = ((0x94 + (sub >> 0)) & 0xff); // 简化: hi 直接是 0x94 或 0x95
      const idxInTable = sub & 0x0f;
      const lo = ASCII_TO_TILE_TABLE[idxInTable] ?? 0;
      this.ppu.commitSprite4([hi, lo, 0x00, 0x00]);
    }
    this.ppu.finalizeBufferWrite();
    return true;
  }

  // ──────────────────────── $8A91 4-byte tile constructor ────────────────────────

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
  buildTile4(bytes: ReadonlyArray<number>): boolean {
    if (bytes.length < 4) return false;
    this.ppu.commitSprite4(bytes);
    this.ppu.finalizeBufferWrite();
    return true;
  }

  // ──────────────────────── $88FB palette xor (sprite attr flip) ────────────────────────

  /**
   * Sprite attr palette XOR（PRG $88FB-$890B 翻译）。
   *
   * ROM 行为：iterate 64 sprite，每 4 字节 attr ^= 0x20
   *
   * H5 语义：直接修改 store.shadowOam attr 字段
   */
  flipAllSpritePalettes(): void {
    const oam = this.store.shadowOam;
    for (let i = 0; i < 64; i++) {
      const attr = oam[i * 4 + 2];
      oam[i * 4 + 2] = (attr ^ 0x20) & 0xff;
    }
  }

  // ──────────────────────── $890C accumulator (sprite Y) ────────────────────────

  /**
   * Sprite Y 累加器（PRG $890C-$891F 翻译）。
   *
   * ROM 行为：所有 sprite Y += value
   *
   * H5 语义：直接修改 store.shadowOam Y 字段
   *
   * @param value 加的 delta（可负）
   */
  shiftAllSpriteY(value: number): void {
    const oam = this.store.shadowOam;
    const dv = value & 0xff;
    for (let i = 0; i < 64; i++) {
      const y = oam[i * 4];
      oam[i * 4] = (y + dv) & 0xff;
    }
  }

  // ──────────────────────── $8920 OAM/PPU dump ────────────────────────

  /**
   * OAM → PPU transfer（PRG $8920-$895C 翻译占位）。
   *
   * ROM 行为：从 store.shadowOam → ppu.spriteMem via DMA
   *
   * H5 语义：占位 — 实际由 InterruptService.oamDma 接管
   *
   * @param pcid PPU target（提供 spriteRam 写入能力）
   */
  oamDump(): void {
    // 占位：实际在 InterruptService.oamDma() 调用
    // 此处仅设置 mark OAM 已准备好
    this.store.writeByte(0x0079, 0x01);
  }

  // ──────────────────────── $89A3 main loop inner (init OAM) ────────────────────────

  /**
   * 主循环内层（PRG $89A3-$89CD 翻译占位）。
   *
   * ROM 行为：
   *   1. Y=$FC → copy 256 字节从 $88D2 到 $0468 (Y loop)
   *   2. LDX #$F8 / LDY #$00 / LDA #$01 / JSR $9FA8
   *
   * H5 语义：初始化所有 sprite to default template，然后 push state
   */
  initOamFromTemplate(): void {
    const oam = this.store.shadowOam;
    for (let i = 0; i < 256; i++) {
      oam[i] = OAM_DEFAULT_TEMPLATE[i] ?? 0xf8;
    }
    this.store.writeByte(0x0564, 0xf8); // LDX #$F8
    this.store.writeByte(0x0700, 0x01);  // scheduler start marker
  }

  // ──────────────────────── ASCII tile 查表 ────────────────────────

  /** ASCII char → tile idx（PRG $8A14 占位查表） */
  asciiToTile(asciiCode: number): number {
    const code = asciiCode & 0x7f;
    if (code < 0x20) return 0;
    return ASCII_TO_TILE_TABLE[(code - 0x20) & 0x0f] ?? 0;
  }
}
