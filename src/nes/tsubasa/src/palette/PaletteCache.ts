/**
 * ============================================================================
 * PaletteCache — 调色板输出缓存
 *
 * ROM $B000-$BFFF 的原始调色板数据通过 MMC3 bankA000 访问。
 * $9EA2 lookup 表固定在 bank_00。
 *
 * 缓存 (key=$48,$49,$4A,$4B → Uint8Array[32]) 避免每帧重复查 ROM。
 * 数据流: ROM[bankA000:$B000+$48*16] → raw bytes
 *        → attr = (raw & 0x30) + brightness
 *        → lookup = ROM[bank_00:$9EA2 + attr]
 *        → out = (raw & 0x0F) | lookup
 * ============================================================================
 */

/**
 * 调色板缓存键 = ($48,$49,$4A,$4B) 字符串
 */
function strKey($48: number, $49: number, $4A: number, $4B: number): string {
  return `${$48},${$49},${$4A},${$4B}`;
}

/** ROM bank_00 的 Uint8Array (含 $9EA2 lookup 表) */
let _bank00: Uint8Array | null = null;
/** $9EA2 lookup table 缓存 (64 条目, 地址 $9EA2 即 ROM offset 0x1EA2) */
let _lookupTable: Uint8Array | null = null;

/**
 * 初始化: 接收 bank_00 ROM 数据用于 lookup 表
 */
export function initPaletteCache(bank00Rom: Uint8Array): void {
  _bank00 = bank00Rom;
  const base = 0x9EA2 - 0x8000;
  _lookupTable = new Uint8Array(64);
  for (let i = 0; i < 64; i++) {
    _lookupTable[i] = _bank00[base + i] ?? 0;
  }
}

/** 缓存 */
const _cache = new Map<string, Uint8Array>();

/**
 * 调色板数据读取接口 (适配 RomReader.u8)
 */
export interface PaletteRomReader {
  u8(addr: number): number;
}

/**
 * 计算 32-byte PPU palette 输出 (带缓存)
 * @param rom   RomReader 实例 (用于读取 $B000 区域，通过 MMC3 bankA000)
 */
export function computePalette(
  $48: number, $49: number, $4A: number, $4B: number,
  rom: PaletteRomReader,
): Uint8Array {
  const key = strKey($48, $49, $4A, $4B);
  let cached = _cache.get(key);
  if (cached) return cached;

  if (!_lookupTable) {
    // lookup 表未初始化 → 全黑
    const out = new Uint8Array(32);
    out.fill(0x0F);
    _cache.set(key, out);
    return out;
  }

  const out = new Uint8Array(32);

  // 前 16 bytes: ROM[$B000 + $48*16], brightness=$4A
  const addrA = 0xB000 + ($48 << 4);
  for (let i = 0; i < 16; i++) {
    const raw = rom.u8(addrA + i);
    const attr = ((raw & 0x30) + $4A) & 0x3F;
    const lookupVal = _lookupTable[attr];
    out[i] = (raw & 0x0F) | lookupVal;
  }

  // 后 16 bytes: ROM[$B000 + $49*16], brightness=$4B
  const addrB = 0xB000 + ($49 << 4);
  for (let i = 0; i < 16; i++) {
    const raw = rom.u8(addrB + i);
    const attr = ((raw & 0x30) + $4B) & 0x3F;
    const lookupVal = _lookupTable[attr];
    out[i + 16] = (raw & 0x0F) | lookupVal;
  }

  _cache.set(key, out);
  return out;
}

/** 缓存统计 */
export function getCacheStats(): { size: number } {
  return { size: _cache.size };
}
