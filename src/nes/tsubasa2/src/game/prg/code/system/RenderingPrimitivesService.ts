/**
 * RenderingPrimitivesService — bank00 渲染原语集合
 *
 * @bank 00 ($9B28/$9A71/$9AB8/$8920/$8AF7/$98EA/...)
 *
 * 将原版直接写 PPU 寄存器 / MMC3 切 bank 的行为，转写为操作 DataStore
 * 中的 ram 与 $05E8 渲染缓冲。所有 MMC3 寄存器写已省略（按 workspace 规则注释）。
 */
import type { DataStore } from '../../data/store/DataStore';
import {
  OPENING_SCENE_TABLE,
  OPENING_BG_PALETTES,
  OPENING_SPR_PALETTES,
  OPENING_CHR_POINTER_TABLE,
  OPENING_FADE_TABLE,
  OPENING_CHR_CONFIGS,
  OPENING_SCENE3_TILES,
  type ChrConfig,
} from '../../data/scene/opening-data';

export class RenderingPrimitivesService {
  constructor(private readonly store: DataStore) {}

  // ──────────────────────────── $9DEE 8bit × 8bit 乘法 ────────────────────────────

  /**
   * 对应原始 $9DEE: $00EC:$00ED = A * X（无符号 16-bit 结果）。
   */
  multiplyU8(a: number, x: number): number {
    return ((a & 0xff) * (x & 0xff)) & 0xffff;
  }

  // ──────────────────────────── $05E8 NT 渲染缓冲 ────────────────────────────

  /**
   * 对应原始 $9B28: 在 $05E8 缓冲写入一个条目。
   * @param count  字节数（≤ 0x3F，bit7 由调用方控制；普通行模式 bit7=0）
   * @param addrLo 目标地址低字节
   * @param addrHi 目标地址高字节
   * @returns 当前写入位置 x（下一条数据应写入 $05E8+x）
   */
  ntBufferEntry(count: number, addrLo: number, addrHi: number): number {
    const store = this.store;
    const pos = store.readByte(0x0628) & 0xff;
    if (pos + 3 + (count & 0x7f) > 0x3d) {
      // 容量不足：原版会等待 NMI 消费；H5 直接丢弃（理论上不应发生）
      return pos;
    }
    store.writeByte(0x05e8 + pos, count & 0xff);
    store.writeByte(0x05e9 + pos, addrLo & 0xff);
    store.writeByte(0x05ea + pos, addrHi & 0xff);
    store.writeByte(0x0629, (count & 0xff) | 0x40); // 忙标志（H5 中仅用于语义兼容）
    return pos + 3;
  }

  /** 在条目写入位置追加一个数据字节（调用方负责循环） */
  ntBufferDataByte(pos: number, value: number): void {
    this.store.writeByte(0x05e8 + pos, value & 0xff);
  }

  /**
   * 对应原始 $9B5E: 结束当前 $05E8 条目并更新指针。
   * @param pos 下一个空闲位置
   */
  ntBufferEnd(pos: number): void {
    this.store.writeByte(0x05e8 + pos, 0);
    this.store.writeByte(0x0628, pos & 0xff);
    this.store.writeByte(0x0629, 0);
  }

  /** 将 count 字节数据追加到缓冲区，返回新的 pos */
  ntBufferAppend(pos: number, data: ReadonlyArray<number>): number {
    for (const b of data) {
      this.store.writeByte(0x05e8 + pos, b & 0xff);
      pos++;
    }
    return pos;
  }

  // ──────────────────────────── 调色板原语 ────────────────────────────

  /**
   * 对应原始 $9AB8: BG 调色板装载。
   * $B000 + index*16 → ram_062A（16 字节）。
   */
  loadBgPalette(index: number): void {
    const pal = OPENING_BG_PALETTES[index & 0x0f] ?? OPENING_BG_PALETTES[0];
    for (let i = 0; i < 0x10; i++) {
      this.store.writeByte(0x062a + i, pal[i] & 0x3f);
    }
  }

  /**
   * 对应原始 $9ADA: SPR 调色板装载。
   * $B300 + index*16 → ram_063A（16 字节）。
   */
  loadSprPalette(index: number): void {
    const pal = OPENING_SPR_PALETTES[index & 0x0f] ?? OPENING_SPR_PALETTES[0];
    for (let i = 0; i < 0x10; i++) {
      this.store.writeByte(0x063a + i, pal[i] & 0x3f);
    }
  }

  /**
   * 对应原始 $9AA2: 查渐显表计算单个颜色。
   * new = $9EA2[(pal & $30) + fade] | (pal & $0F)
   */
  fadeLookup(pal: number, fade: number): number {
    const idx = ((pal & 0x30) + (fade & 0x0f)) & 0x3f;
    return (OPENING_FADE_TABLE[idx] | (pal & 0x0f)) & 0x3f;
  }

  /**
   * 对应原始 $9A71: 将 ram_062A/063A 按当前 $004A/$004B 渐显后写入 $05E8 缓冲（$3F00）。
   * @returns 新的缓冲位置 pos
   */
  fadeWrite(): number {
    const store = this.store;
    const fadeA = store.readByte(0x004a) & 0x0f;
    const fadeB = store.readByte(0x004b) & 0x0f;
    let pos = this.ntBufferEntry(0x20, 0x00, 0x3f); // 32 字节 → $3F00
    for (let i = 0; i < 0x10; i++) {
      const pal = store.readByte(0x062a + i);
      this.ntBufferDataByte(pos++, this.fadeLookup(pal, fadeA));
    }
    for (let i = 0; i < 0x10; i++) {
      const pal = store.readByte(0x063a + i);
      this.ntBufferDataByte(pos++, this.fadeLookup(pal, fadeB));
    }
    this.ntBufferEnd(pos);
    return pos;
  }

  // ──────────────────────────── OAM 原语 ────────────────────────────

  /**
   * 对应原始 $9B7F: 隐藏全部影子 OAM（$0468/$0200 写 $F8，并清零扩展表）。
   */
  hideOam(): void {
    const store = this.store;
    for (let i = 0; i < 0x100; i += 4) {
      store.writeByte(0x0468 + i, 0xf8);
      store.writeByte(0x0200 + i, 0xf8);
    }
    store.writeByte(0x0568, 0);
    store.writeByte(0x0588, 0);
    store.writeByte(0x05a8, 0);
    store.writeByte(0x05c8, 0);
  }

  /**
   * 对应原始 $890C: 所有精灵 Y 坐标 += amount（$0468+4i）。
   */
  oamDrift(amount: number): void {
    const store = this.store;
    const add = amount & 0xff;
    for (let i = 0; i < 0x100; i += 4) {
      const y = (store.readByte(0x0468 + i) + add) & 0xff;
      store.writeByte(0x0468 + i, y);
    }
  }

  /**
   * 对应原始 $88FB: 所有精灵属性 ^= $20（水平翻转位）。
   */
  oamFlipAttrs(): void {
    const store = this.store;
    for (let i = 0; i < 0x100; i += 4) {
      const attr = store.readByte(0x046a + i) ^ 0x20;
      store.writeByte(0x046a + i, attr);
    }
  }

  // ──────────────────────────── 清屏 / 填充 ────────────────────────────

  /**
   * 对应原始 $98A0: 关闭 NMI/MASK，整屏清 0，再恢复 MASK/NMI。
   * H5 语义：将 NT $2000-$23FF 与属性表 $23C0-$23FF 清零；CTRL/MASK 直接写 ram。
   */
  clearNametable(): void {
    const store = this.store;
    // 关 NMI（bit7 clear）
    store.writeByte(0x0020, store.readByte(0x0020) & 0x7f);
    // 关显示 MASK（bit3/4 clear）
    store.writeByte(0x0021, store.readByte(0x0021) & 0xe7);
    // 清 NT + 属性表（$2000-$23FF）
    for (let addr = 0x2000; addr <= 0x23ff; addr++) {
      store.writeByte(addr, 0);
    }
    // 恢复 MASK
    store.writeByte(0x0021, store.readByte(0x0021) | 0x18);
    // 恢复 NMI
    store.writeByte(0x0020, store.readByte(0x0020) | 0x80);
  }

  /**
   * 对应原始 $98EA: 填充 Y 行 × X 列（每行 32 字节）的 NT/ATTR 区域。
   * 直接写入 DataStore（原版 fade=0 时直接写 PPU；H5 统一走 ram 视图）。
   */
  fillNametableRows(addrLo: number, addrHi: number, rows: number, cols: number, value: number): void {
    const store = this.store;
    let addr = ((addrHi & 0xff) << 8) | (addrLo & 0xff);
    const v = value & 0xff;
    for (let r = 0; r < (rows & 0xff); r++) {
      for (let c = 0; c < (cols & 0xff); c++) {
        store.writeByte((addr + c) & 0x3fff, v);
      }
      addr = (addr + 0x20) & 0x3fff;
    }
  }

  // TODO: $9A35/$997A/$99D1 调色板载体
  // TODO: $9A0D/$99F0 渐隐/渐显循环
  // TODO: $8920 场景装载
  // TODO: $8AF7 CHR 配置读取（H5 简化版）
}
