/**
 * ============================================================================
 * CHR Tile Decoder — loads NES 2bpp tile data and pre-decodes into RGBA pixels
 * 
 * NES tile format: 16 bytes per tile
 *   - bytes 0-7:   plane 0 (bit 0 of each pixel, 8 rows × 8 cols)
 *   - bytes 8-15:  plane 1 (bit 1 of each pixel, 8 rows × 8 cols)
 * 
 * Pixel = ((plane1[row] >> (7-col)) & 1) << 1 | ((plane0[row] >> (7-col)) & 1)
 * Result: 0=transparent/bg, 1-3=palette index
 * 
 * Sources from the existing CHR-ROM data extracted from the original ROM.
 * ============================================================================
 */

import { CHR_ROM_BANKS } from '../../tsubasa-WITHOUT6502CPU/chr_rom_data';

const TILE_BYTES = 16;
const TILES_PER_BANK = 512;
const TILE_W = 8;
const TILE_H = 8;

/** Pre-decoded tile: 64 pixels as palette indices (0-3) */
export type DecodedTile = Uint8Array; // length 64, row-major

/**
 * Tile decoder that reads from the pre-extracted CHR-ROM banks.
 * Maintains an LRU cache of decoded tiles for performance.
 */
export class ChrTileStore {
  /** All CHR-ROM 8KB banks (readonly) */
  readonly banks: readonly Uint8Array[] = CHR_ROM_BANKS;

  /** Cache of decoded tiles: key = bankIndex * 512 + tileIndex */
  private _cache: Map<number, DecodedTile> = new Map();
  private _maxCacheSize: number;

  constructor(maxCacheSize: number = 1024) {
    this._maxCacheSize = maxCacheSize;
  }

  /**
   * Get a decoded 8×8 tile from a CHR bank.
   * @param bankIndex 0-15 for 8KB banks, 16-47 for 4KB vrom banks (offset by +16)
   * @param tileIndex 0-511 (8KB) or 0-255 (4KB vrom)
   */
  getDecodedTile(bankIndex: number, tileIndex: number): DecodedTile {
    const key = (bankIndex << 9) | (tileIndex & 0x1FF);
    let cached = this._cache.get(key);
    if (cached) return cached;

    // Read raw tile data from the bank
    const raw = this._getRawTile(bankIndex, tileIndex);
    const decoded = this._decodeNesTile(raw);

    // Evict if cache full
    if (this._cache.size >= this._maxCacheSize) {
      const firstKey = this._cache.keys().next().value;
      if (firstKey !== undefined) this._cache.delete(firstKey);
    }
    this._cache.set(key, decoded);
    return decoded;
  }

  /**
   * Read raw 16 bytes of tile data from the CHR ROM.
   */
  private _getRawTile(bankIndex: number, tileIndex: number): Uint8Array {
    // 8KB banks (0-15) hold 512 tiles each
    if (bankIndex < 16) {
      const bank = this.banks[bankIndex];
      const offset = tileIndex * TILE_BYTES;
      return bank.slice(offset, offset + TILE_BYTES);
    }
    // VROM 4KB banks (16-47) hold 256 tiles each — read from raw bank data
    // For simplicity, return empty tile for now
    return new Uint8Array(TILE_BYTES);
  }

  /**
   * Decode a raw NES 2bpp tile into 64 palette indices.
   * Standard NES tile format: plane0[0..7] then plane1[0..7].
   */
  private _decodeNesTile(raw: Uint8Array): DecodedTile {
    const pixels = new Uint8Array(64);
    for (let row = 0; row < TILE_H; row++) {
      const p0 = raw[row];
      const p1 = raw[row + 8];
      for (let col = 0; col < TILE_W; col++) {
        const shift = 7 - col;
        const bit0 = (p0 >> shift) & 1;
        const bit1 = (p1 >> shift) & 1;
        pixels[row * TILE_W + col] = (bit1 << 1) | bit0;
      }
    }
    return pixels;
  }

  /** Total number of banks available */
  get bankCount(): number { return this.banks.length; }

  /** Clear the cache */
  clearCache(): void { this._cache.clear(); }
}

/**
 * Static default tile store — initialized once and shared.
 * Use `getDefaultTileStore()` to access.
 */
let _defaultStore: ChrTileStore | null = null;
export function getDefaultTileStore(): ChrTileStore {
  if (!_defaultStore) {
    _defaultStore = new ChrTileStore(2048);
  }
  return _defaultStore;
}
