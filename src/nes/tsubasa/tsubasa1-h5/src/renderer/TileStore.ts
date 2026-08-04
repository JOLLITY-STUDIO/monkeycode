/**
 * TileStore - CHR tile 数据存储与像素查询
 *
 * 直接从 hex 数组 (CHR_BANK_RAW) 解码 2BPP 数据，不再使用 base64。
 * 每个 MMC1 sub-bank = 4KB (256 tiles × 16 bytes/tile)。
 * 每个 tile = 16 字节 (plane0 8字节 + plane1 8字节) → 8×8 像素，每个像素值 0/1/2/3。
 *
 * 预解码策略：初始化时将所有 tile 解码为扁平像素数组。
 * 每 bank 16KB (256 tiles × 64 bytes)，32 banks = 512KB。
 * 现代设备上完全可接受，渲染时 O(1) 像素查询。
 */
import { CHR_BANK_RAW, CHR_BANK_SIZE, CHR_BANK_COUNT } from '../data/ChrData';

/** 每个 bank 的 tile 数 */
const TILES_PER_BANK = 256;
/** tile 宽高 (像素) */
const TILE_PX = 8;
/** 每个 tile 的像素数 */
const TILE_PX_COUNT = TILE_PX * TILE_PX;  // 64
/** 每个 bank 预解码后的字节数 */
const DECODED_BANK_SIZE = TILES_PER_BANK * TILE_PX_COUNT;  // 16384

/**
 * 预解码后的 CHR tile 像素数据
 * 每个元素是 0-3 的调色板索引
 * 访问: pixels[tileIndex * 64 + y * 8 + x]
 */
type DecodedBank = Uint8Array;

export class TileStore {
  /** 预解码的 CHR banks (bankIndex → Uint8Array) */
  private banks: DecodedBank[];

  /** 是否已初始化 */
  private _ready: boolean = false;

  constructor() {
    this.banks = new Array(CHR_BANK_COUNT);
  }

  /**
   * 初始化：解码所有 CHR bank 的 hex 数据
   * 同步操作，因为数据已内嵌在代码中
   */
  init(): void {
    if (this._ready) return;

    const startTime = Date.now();
    let decoded = 0;

    for (let bi = 0; bi < CHR_BANK_COUNT; bi++) {
      // 直接使用 hex 数组 → Uint8Array (4096 bytes)
      const raw = new Uint8Array(CHR_BANK_RAW[bi]);
      // 2BPP 解码 → 扁平像素数组
      this.banks[bi] = this.decodeBank(raw);
      decoded++;
    }

    this._ready = true;
    const elapsed = Date.now() - startTime;
    console.log(`[TileStore] Decoded ${decoded} CHR banks in ${elapsed}ms (${(decoded * CHR_BANK_SIZE / 1024).toFixed(0)}KB raw → ${(decoded * DECODED_BANK_SIZE / 1024).toFixed(0)}KB decoded)`);
  }

  /** 是否已就绪 */
  get ready(): boolean { return this._ready; }

  /** bank 数量 */
  get bankCount(): number { return CHR_BANK_COUNT; }

  /**
   * 查询单个像素的调色板索引 (0-3)
   * @param bankIdx CHR bank 索引 (0-31)
   * @param tileIndex tile 索引 (0-255)
   * @param px 像素 X (0-7)
   * @param py 像素 Y (0-7)
   */
  getPixel(bankIdx: number, tileIndex: number, px: number, py: number): number {
    const bank = this.banks[bankIdx & (CHR_BANK_COUNT - 1)];
    const offset = (tileIndex & 0xFF) * TILE_PX_COUNT + (py & 0x07) * TILE_PX + (px & 0x07);
    return bank[offset];
  }

  /**
   * 获取 tile 的一整行像素 (8 个值)
   * 比逐个 getPixel 调用更高效
   */
  getTileRow(bankIdx: number, tileIndex: number, py: number): Uint8Array {
    const bank = this.banks[bankIdx & (CHR_BANK_COUNT - 1)];
    const offset = (tileIndex & 0xFF) * TILE_PX_COUNT + (py & 0x07) * TILE_PX;
    return bank.subarray(offset, offset + TILE_PX);
  }

  /**
   * 获取整个 tile 的 64 像素视图
   */
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
