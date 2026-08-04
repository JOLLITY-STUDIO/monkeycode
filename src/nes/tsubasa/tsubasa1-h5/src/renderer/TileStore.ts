/**
 * TileStore - CHR tile 数据存储与像素查询
 *
 * 从 base64 嵌入字符串解码 CHR ROM 原始 2BPP 数据并解码为扁平像素数组。
 * 每个 MMC1 sub-bank = 4KB (256 tiles × 16 bytes/tile)。
 * 每个 tile = 16 字节 (plane0 8字节 + plane1 8字节) → 8×8 像素，每个像素值 0/1/2/3。
 *
 * 预解码策略：初始化时将所有 tile 解码为扁平像素数组。
 * 每 bank 16KB (256 tiles × 64 bytes)，32 banks = 512KB。
 *
 * v1.2.0: 使用 base64 嵌入字符串替代 JSON require，
 * 解决微信小程序不支持 require() 加载 JSON 的问题 (BUG-016)。
 */

import { CHR_BASE64, CHR_RAW_SIZE, CHR_BANK_COUNT as _CHR_BC, CHR_BANK_SIZE as _CHR_BS } from '../data/chrBinary';

/** 每个 MMC1 CHR sub-bank 的字节数 (4KB) */
export const CHR_BANK_SIZE = _CHR_BS; // 4096

/** MMC1 CHR sub-bank 总数 */
export const CHR_BANK_COUNT = _CHR_BC; // 32

/** 每个 bank 的 tile 数 */
const TILES_PER_BANK = 256;
/** tile 宽高 (像素) */
const TILE_PX = 8;
/** 每个 tile 的像素数 */
const TILE_PX_COUNT = TILE_PX * TILE_PX;  // 64
/** 每个 bank 预解码后的字节数 */
const DECODED_BANK_SIZE = TILES_PER_BANK * TILE_PX_COUNT;  // 16384

/** 预解码后的 CHR tile 像素数据: 每个元素是 0-3 的调色板索引 */
type DecodedBank = Uint8Array;

/**
 * Base64 字符串 → Uint8Array 解码器
 * 兼容微信小程序和浏览器环境（使用全局 atob）
 */
function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * 从 base64 嵌入字符串加载 CHR ROM 原始数据
 * 返回 32 个 bank，每个 bank 4096 字节
 */
function loadChrRaw(): Uint8Array[] {
  const packed = base64ToBytes(CHR_BASE64);
  if (packed.length !== CHR_RAW_SIZE) {
    throw new Error(
      `[TileStore] Invalid CHR data: expected ${CHR_RAW_SIZE} bytes, got ${packed.length}`
    );
  }

  const banks: Uint8Array[] = [];
  for (let bi = 0; bi < CHR_BANK_COUNT; bi++) {
    const start = bi * CHR_BANK_SIZE;
    banks.push(packed.slice(start, start + CHR_BANK_SIZE));
  }
  return banks;
}

export class TileStore {
  /** 预解码的 CHR banks (bankIndex → Uint8Array) */
  private banks: DecodedBank[];

  /** 是否已初始化 */
  private _ready: boolean = false;

  constructor() {
    this.banks = new Array(CHR_BANK_COUNT);
  }

  /**
   * 初始化：从 base64 嵌入字符串解码 CHR ROM 数据，预解码所有 bank
   */
  init(): void {
    if (this._ready) return;

    const startTime = Date.now();
    let decoded = 0;

    // 从 base64 嵌入字符串加载 CHR 原始数据
    console.log('[TileStore] Decoding CHR from base64 embedded data...');
    const chrBanks = loadChrRaw();

    for (let bi = 0; bi < CHR_BANK_COUNT; bi++) {
      // 2BPP 解码 → 扁平像素数组
      this.banks[bi] = this.decodeBank(chrBanks[bi]);
      decoded++;
    }

    this._ready = true;
    const elapsed = Date.now() - startTime;
    console.log(
      `[TileStore] Decoded ${decoded} CHR banks in ${elapsed}ms ` +
      `(${(decoded * CHR_BANK_SIZE / 1024).toFixed(0)}KB raw → ${(decoded * DECODED_BANK_SIZE / 1024).toFixed(0)}KB decoded)`
    );
  }

  /** 是否已就绪 */
  get ready(): boolean { return this._ready; }

  /** bank 数量 */
  get bankCount(): number { return CHR_BANK_COUNT; }

  /**
   * 查询单个像素的调色板索引 (0-3)
   */
  getPixel(bankIdx: number, tileIndex: number, px: number, py: number): number {
    const bank = this.banks[bankIdx & (CHR_BANK_COUNT - 1)];
    const offset = (tileIndex & 0xFF) * TILE_PX_COUNT + (py & 0x07) * TILE_PX + (px & 0x07);
    return bank[offset];
  }

  /** 获取 tile 的一整行像素 (8 个值) */
  getTileRow(bankIdx: number, tileIndex: number, py: number): Uint8Array {
    const bank = this.banks[bankIdx & (CHR_BANK_COUNT - 1)];
    const offset = (tileIndex & 0xFF) * TILE_PX_COUNT + (py & 0x07) * TILE_PX;
    return bank.subarray(offset, offset + TILE_PX);
  }

  /** 获取整个 tile 的 64 像素视图 */
  getTileView(bankIdx: number, tileIndex: number): Uint8Array {
    const bank = this.banks[bankIdx & (CHR_BANK_COUNT - 1)];
    const offset = (tileIndex & 0xFF) * TILE_PX_COUNT;
    return bank.subarray(offset, offset + TILE_PX_COUNT);
  }

  // ============================================================
  // 私有方法
  // ============================================================

  /**
   * 2BPP 解码：将 4096 字节原始数据 → 16384 字节扁平像素数组
   * 每个 tile 16 字节 (plane0 8字节 + plane1 8字节) → 64 像素
   */
  private decodeBank(raw: Uint8Array): Uint8Array {
    const decoded = new Uint8Array(DECODED_BANK_SIZE);

    for (let ti = 0; ti < TILES_PER_BANK; ti++) {
      const tileOff = ti * 16;
      const outOff = ti * TILE_PX_COUNT;

      for (let row = 0; row < 8; row++) {
        const plane0 = raw[tileOff + row];       // bitplane 0
        const plane1 = raw[tileOff + row + 8];   // bitplane 1
        const rowOff = outOff + row * 8;

        // 从高位到低位解码 (NES tile 行左边是 MSB)
        for (let col = 0; col < 8; col++) {
          const shift = 7 - col;
          const p0 = (plane0 >> shift) & 1;
          const p1 = (plane1 >> shift) & 1;
          decoded[rowOff + col] = p0 | (p1 << 1);  // 0-3
        }
      }
    }

    return decoded;
  }
}
