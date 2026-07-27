/**
 * chr — CHR-ROM / VROM tile 数据访问工具函数
 */

import { CHR_VROM_SIZE, CHR_VROM_COUNT, TILE_SIZE, TILES_PER_VROM, CHR_BANK_META } from './bank';
import type { ChrBank } from './bank';

export { CHR_VROM_SIZE as VROM_SIZE, CHR_VROM_COUNT as VROM_COUNT, TILE_SIZE, TILES_PER_VROM, CHR_BANK_META };
export const TOTAL_TILES = CHR_VROM_COUNT * TILES_PER_VROM;

/** 按 bank + 偏移读取一个字节 */
export function readVromByte(vromBanks: ChrBank[], bankIdx: number, offset: number): number {
  const bank = vromBanks[bankIdx];
  if (!bank || !bank.data) return 0;
  return bank.data[offset & (CHR_VROM_SIZE - 1)] ?? 0;
}

/** 读一个 8×8 tile 的 16 字节数据 */
export function readTile(vromBanks: ChrBank[], bankIdx: number, tileIdx: number): number[] {
  const offset = (tileIdx & 255) * TILE_SIZE;
  const data: number[] = [];
  for (let i = 0; i < TILE_SIZE; i++) {
    data.push(readVromByte(vromBanks, bankIdx, offset + i));
  }
  return data;
}

/** 全局 tile 读取 (跨 bank) */
export function readGlobalTile(vromBanks: ChrBank[], globalTileIdx: number): number[] {
  const bankIdx = Math.floor(globalTileIdx / TILES_PER_VROM);
  const tileIdx = globalTileIdx % TILES_PER_VROM;
  return readTile(vromBanks, bankIdx, tileIdx);
}

/** 按 PPU pattern table 地址读取 */
export function readPatternTable(vromBanks: ChrBank[], ppuAddr: number): number {
  const vromIdx = Math.floor(ppuAddr / 1024);
  const offset  = ppuAddr % 1024;
  return readVromByte(vromBanks, vromIdx & (CHR_VROM_COUNT - 1), offset);
}

/** 解码 tile → 64 个像素值 (0-3) */
export function decodeTilePixels(tileData: number[]): number[] {
  const pixels = new Array(64).fill(0);
  for (let row = 0; row < 8; row++) {
    const plane0 = tileData[row]     || 0;
    const plane1 = tileData[row + 8] || 0;
    for (let col = 0; col < 8; col++) {
      const bit = 7 - col;
      const p0 = (plane0 >> bit) & 1;
      const p1 = (plane1 >> bit) & 1;
      pixels[row * 8 + col] = p0 | (p1 << 1);
    }
  }
  return pixels;
}

/** 校验 CHR 数据完整性 */
export function validateVromBanks(vromBanks: ChrBank[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!vromBanks || vromBanks.length !== CHR_VROM_COUNT) {
    errors.push(`expected ${CHR_VROM_COUNT} vrom banks, got ${vromBanks ? vromBanks.length : 0}`);
    return { valid: false, errors };
  }
  for (let i = 0; i < CHR_VROM_COUNT; i++) {
    const b = vromBanks[i];
    if (!b || !b.data) {
      errors.push(`vrom bank ${i}: missing data`);
    } else if (b.data.length !== CHR_VROM_SIZE) {
      errors.push(`vrom bank ${i}: expected ${CHR_VROM_SIZE} bytes, got ${b.data.length}`);
    }
  }
  return { valid: errors.length === 0, errors };
}
