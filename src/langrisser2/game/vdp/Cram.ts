/**
 * CRAM — 128 字节调色板 RAM
 *
 * Genesis VDP 支持 4 组 × 16 色 = 64 色
 * 当前 CRAM 数据来自 game-old 的 TITLE_CRAM 预提取数据,
 * 其 16-bit word 格式为 (byte1<<8)|byte0:
 *   byte0 = B2 B1 B0 G2 G1 G0 R2 R1
 *   byte1 = R0 + 7位填充 (bit7 为 R2 的高位)
 * 因此:
 *   R = (word & 0x03) | ((word >> 13) & 0x04)
 *   G = (word >> 2) & 0x07
 *   B = (word >> 5) & 0x07
 *
 * CRAM 通过 VDP_CTRL 设置 CD=11 访问
 */

import type { RGBA } from '../core/types';

export class Cram {
  /** 64 个 16-bit 颜色值 (game-old 9-bit RGB 格式) */
  private colors: Uint16Array;

  /** VDP 内部地址 */
  private _address: number = 0;

  /** 背景色索引 (由 VDP reg $07 指定, 对应 CRAM 中的 0-63 位置) */
  private backgroundColorIndex: number = 0;

  constructor() {
    this.colors = new Uint16Array(64); // 64 色 = 4 palette × 16 colors
  }

  // ============================================================
  // 地址控制
  // ============================================================

  setAddress(addr: number): void {
    this._address = addr & 0x7F; // 128B → 64 words
  }

  get address(): number {
    return this._address;
  }

  // ============================================================
  // CRAM 读写 (VDP 端口)
  // ============================================================

  /** 读一个颜色 (16-bit game-old format) */
  readColor(): number {
    const color = this.colors[this._address];
    this._address = (this._address + 1) & 0x3F; // 64 words 回绕
    return color;
  }

  /** 写一个颜色 (16-bit game-old format) */
  writeColor(value: number): void {
    this.colors[this._address] = value & 0x80FF; // mask: game-old 格式 (byte0 全部 + byte1 bit7)
    this._address = (this._address + 1) & 0x3F;
  }

  // ============================================================
  // 直接访问
  // ============================================================

  /** 按索引读取颜色 (0-63) */
  getColor(index: number): number {
    return this.colors[index & 0x3F];
  }

  /** 按索引写入颜色 */
  setColor(index: number, value: number): void {
    this.colors[index & 0x3F] = value & 0x80FF; // mask: game-old 格式 (byte0 全部 + byte1 bit7)
  }

  /** 获取指定调色板 (0-3) 的指定颜色 (0-15) */
  getPaletteColor(palette: number, colorIndex: number): number {
    return this.colors[(palette * 16 + colorIndex) & 0x3F];
  }

  /** 获取调色板的所有 16 色 */
  getPalette(palette: number): Uint16Array {
    const offset = (palette & 0x03) * 16;
    return this.colors.slice(offset, offset + 16);
  }

  /** 设置背景色索引 */
  setBackgroundColorIndex(index: number): void {
    this.backgroundColorIndex = index & 0x3F;
  }

  /** 获取背景色索引 */
  getBackgroundColorIndex(): number {
    return this.backgroundColorIndex;
  }

  // ============================================================
  // 颜色转换: game-old 9-bit RGB → 32-bit RGBA
  // ============================================================

  /**
   * 将 game-old 9-bit 颜色转换到 32-bit RGBA
   *
   * game-old CRAM word 位布局 (来自预提取数据):
   *   byte0 = B2 B1 B0 G2 G1 G0 R2 R1
   *   byte1 = R0 + 7位填充 (bit7 为 R2 的高位)
   *   R = (word & 0x03) | ((word >> 13) & 0x04)
   *   G = (word >> 2) & 0x07
   *   B = (word >> 5) & 0x07
   *
   * 9-bit → 8-bit 扩展: 用 bit 重复填充 (0b000 → 0x00, 0b111 → 0xFF)
   *
   * BUG FIX #3: 之前错误按标准 Genesis 格式 (R bit0-2, G bit4-6, B bit8-10)
   * 提取颜色, 与 game-old 数据格式不一致, 导致颜色严重失真。
   */
  static toRGBA(genesisColor: number): RGBA {
    const r = ((genesisColor & 0x03) | ((genesisColor >> 13) & 0x04)) & 0x07;
    const g = (genesisColor >> 2) & 0x07;
    const b = (genesisColor >> 5) & 0x07;

    return {
      r: (r << 5) | (r << 2) | (r >> 1),
      g: (g << 5) | (g << 2) | (g >> 1),
      b: (b << 5) | (b << 2) | (b >> 1),
      a: 255,
    };
  }

  /**
   * 获取调色板中指定颜色索引的 32-bit RGBA
   * colorIndex 0 → 显示背景色 (VDP reg $07 指定的 CRAM 索引)
   *
   * BUG FIX #4: 之前错误使用 CRAM 端口地址指针 this._address 取背景色,
   * 并且只取 & 0x0E 部分位, 导致 Plane 的 color-0 像素全部错误渲染为黑色
   */
  getRGBA(palette: number, colorIndex: number): RGBA {
    if (colorIndex === 0) {
      const bg = this.colors[this.backgroundColorIndex & 0x3F];
      return Cram.toRGBA(bg);
    }
    const raw = this.getPaletteColor(palette, colorIndex);
    return Cram.toRGBA(raw);
  }

  // ============================================================
  // 批量操作
  // ============================================================

  /** 清空调色板 */
  clear(): void {
    this.colors.fill(0);
    this._address = 0;
  }

  /** 从数组加载全部颜色 */
  loadColors(colors: number[]): void {
    for (let i = 0; i < Math.min(colors.length, 64); i++) {
      this.colors[i] = colors[i] & 0x80FF; // mask: game-old 格式 (byte0 全部 + byte1 bit7)
    }
  }

  /** 导出为 32-bit RGBA 数组 (用于 Canvas ImageData) */
  exportPaletteAsRGBA(palette: number): Uint8ClampedArray {
    const rgba = new Uint8ClampedArray(64 * 4); // 16 colors × 4 bytes
    for (let i = 0; i < 16; i++) {
      const raw = this.getPaletteColor(palette, i);
      const color = Cram.toRGBA(raw);
      const off = i * 4;
      rgba[off]     = color.r;
      rgba[off + 1] = color.g;
      rgba[off + 2] = color.b;
      rgba[off + 3] = color.a;
    }
    return rgba;
  }
}
