/**
 * RenderingPrimitivesService — 渲染原语集合
 *
 * 行为翻译（去 CPU 化）：
 * - NT 渲染缓冲写入/结束/数据追加（[$05E8] 64 字节容量）
 * - BG/SPR 调色板装载
 * - 渐显/渐隐（单步，配合场景状态机）
 * - OAM 隐藏/Y 漂移/属性翻转
 * - 清屏/填充
 * - 场景数据装载（[$0079] 标志 + 18 字节）
 * - CHR 配置读取（配置副作用 + tile 网格展开）
 * - 场景 3 NT 数据按行写入渲染缓冲
 *
 * 所有数据通过 OPENING_* 声明式表（opening-data.ts / bank7-streams）查询，
 * 无 bank 切换寄存器写。
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
  OPENING_TILE_PATTERNS,
  type ChrConfig,
} from '../../data/scene/opening-data';
import { OPENING_TILE_STREAMS } from '../../data/scene/bank7-streams';

export class RenderingPrimitivesService {
  constructor(private readonly store: DataStore) {}

  // ──────────────────────────── 8bit × 8bit 乘法 ────────────────────────────

  /** 无符号 8bit × 8bit → 16bit 乘法（返回 A * X） */
  multiplyU8(a: number, x: number): number {
    return ((a & 0xff) * (x & 0xff)) & 0xffff;
  }

  // ──────────────────────────── NT 渲染缓冲 ────────────────────────────

  /**
   * 在 [$05E8] 缓冲写入一个条目：[count, addrLo, addrHi, ...data]。
   * @param count  字节数（≤ 0x3F；bit7 由调用方控制；普通行模式 bit7=0）
   * @param addrLo 目标地址低字节
   * @param addrHi 目标地址高字节
   * @returns 当前写入位置 x（下一条数据应写入 $05E8+x）
   */
  ntBufferEntry(count: number, addrLo: number, addrHi: number): number {
    const store = this.store;
    const pos = store.readByte(0x0628) & 0xff;
    if (pos + (count & 0x3f) >= 0x3d) {
      // 容量不足：调用方分帧写入保证不触发 busy-wait
      return pos;
    }
    store.writeByte(0x05e8 + pos, count & 0xff);
    store.writeByte(0x05e9 + pos, addrLo & 0xff);
    store.writeByte(0x05ea + pos, addrHi & 0xff);
    store.writeByte(0x0629, (count & 0xff) | 0x40);
    return pos + 3;
  }

  /** 在条目写入位置追加一个数据字节（调用方负责循环） */
  ntBufferDataByte(pos: number, value: number): void {
    this.store.writeByte(0x05e8 + pos, value & 0xff);
  }

  /**
   * 结束当前 [$05E8] 条目并更新指针。
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

  /** BG 调色板装载（index → 16 字节 → ram_062A） */
  loadBgPalette(index: number): void {
    const pal = OPENING_BG_PALETTES[index & 0x0f] ?? OPENING_BG_PALETTES[0];
    for (let i = 0; i < 0x10; i++) {
      this.store.writeByte(0x062a + i, pal[i] & 0x3f);
    }
  }

  /** SPR 调色板装载（index → 16 字节 → ram_063A） */
  loadSprPalette(index: number): void {
    const pal = OPENING_SPR_PALETTES[index & 0x0f] ?? OPENING_SPR_PALETTES[0];
    for (let i = 0; i < 0x10; i++) {
      this.store.writeByte(0x063a + i, pal[i] & 0x3f);
    }
  }

  /**
   * 查渐显表计算单个颜色。
   * new = OPENING_FADE_TABLE[(pal & $30) + fade] | (pal & $0F)
   */
  fadeLookup(pal: number, fade: number): number {
    const idx = ((pal & 0x30) + (fade & 0x0f)) & 0x3f;
    return (OPENING_FADE_TABLE[idx] | (pal & 0x0f)) & 0x3f;
  }

  /**
   * 将 ram_062A/063A 按当前 fade 渐显后写入渲染缓冲（$3F00）。
   * @returns 新的缓冲位置 pos
   */
  fadeWrite(): number {
    const store = this.store;
    const fadeA = store.readByte(0x004a) & 0x0f;
    const fadeB = store.readByte(0x004b) & 0x0f;
    let pos = this.ntBufferEntry(0x20, 0x00, 0x3f);
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

  /** 隐藏全部影子 OAM（$0468/$0200 写 $F8，并清零扩展表） */
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

  /** 所有精灵 Y 坐标 += amount（$0468+4i） */
  oamDrift(amount: number): void {
    const store = this.store;
    const add = amount & 0xff;
    for (let i = 0; i < 0x100; i += 4) {
      const y = (store.readByte(0x0468 + i) + add) & 0xff;
      store.writeByte(0x0468 + i, y);
    }
  }

  /** 所有精灵属性 ^= $20（水平翻转位） */
  oamFlipAttrs(): void {
    const store = this.store;
    for (let i = 0; i < 0x100; i += 4) {
      const attr = store.readByte(0x046a + i) ^ 0x20;
      store.writeByte(0x046a + i, attr);
    }
  }

  // ──────────────────────────── 清屏 / 填充 ────────────────────────────

  /**
   * 关闭 NMI/MASK，整屏清 0，再恢复 MASK/NMI。
   * 清 NT + 属性表（$2000-$27FF，NT0+NT1）。
   */
  clearNametable(): void {
    const store = this.store;
    store.writeByte(0x0020, store.readByte(0x0020) & 0x7f);
    store.writeByte(0x0021, store.readByte(0x0021) & 0xe7);
    for (let addr = 0x2000; addr <= 0x27ff; addr++) {
      store.writeByte(addr, 0);
    }
    store.writeByte(0x0021, store.readByte(0x0021) | 0x18);
    store.writeByte(0x0020, store.readByte(0x0020) | 0x80);
  }

  /**
   * 填充 Y 行 × X 列（每行 32 字节）的 NT/ATTR 区域。
   * 直接写入 DataStore。
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

  // ──────────────────────────── 渐显 / 渐隐（单步，配合场景状态机） ────────────────────────────

  /**
   * BG 渐隐一步：DEC fadeA → 写满亮调色板 → 等 1 帧。
   * fade=$0F 最亮 → fade=0 最暗（黑）。
   * @returns true 表示 fadeA 已为 0（循环结束）
   */
  fadeBgStep(): boolean {
    const store = this.store;
    const a = store.readByte(0x004a) & 0x0f;
    if (a === 0) return true;
    store.writeByte(0x004a, a - 1);
    this.fadeWrite();
    return false;
  }

  /**
   * BG+SPR 渐隐一步：DEC fadeA/fadeB → 写满亮调色板 → 等 1 帧。
   * @returns true 表示 fadeA|fadeB == 0（循环结束）
   */
  fadeOutStep(): boolean {
    const store = this.store;
    const a = store.readByte(0x004a) & 0x0f;
    const b = store.readByte(0x004b) & 0x0f;
    if ((a | b) === 0) return true;
    if (a !== 0) store.writeByte(0x004a, a - 1);
    if (b !== 0) store.writeByte(0x004b, b - 1);
    this.fadeWrite();
    return false;
  }

  // ──────────────────────────── 调色板装载 + 满渐显 ────────────────────────────

  /**
   * 装载 BG/SPR 调色板并设置 fade=$0F 后写满亮调色板。
   * @param bgIndex BG 组索引
   * @param sprIndex SPR 组索引
   */
  loadPalettesAndFade(bgIndex: number, sprIndex: number): void {
    const store = this.store;
    this.loadBgPalette(bgIndex);
    this.loadSprPalette(sprIndex);
    store.writeByte(0x004a, 0x0f);
    store.writeByte(0x004b, 0x0f);
    this.fadeWrite();
  }

  // ──────────────────────────── 场景数据装载 ────────────────────────────

  /**
   * 场景号 × 19 → 基表 → 拷贝 19 字节。
   * [0]→ram_0079（滚动标志），[1..18]→ram_007C..ram_008D；ram_007A=0。
   */
  loadSceneData(sceneId: number): void {
    const entry = OPENING_SCENE_TABLE[sceneId & 0x0f] ?? OPENING_SCENE_TABLE[0];
    const store = this.store;
    store.writeByte(0x0079, entry.scrollFlag);
    store.writeByte(0x007a, 0);
    for (let i = 0; i < 0x12; i++) {
      store.writeByte(0x007c + i, entry.data[i] ?? 0);
    }
  }

  // ──────────────────────────── CHR 配置读取（配置副作用） ────────────────────────────

  /**
   * 读取 CHR 配置（按 configId）：
   * - 清零 $0009/$000A/$000D/$000E；$005B bit7 清除
   * - $0077 = $0025（数据段选择）
   * - 清属性缓冲 $064A-$0651
   * - $0075/$0076 = cfg[0]/[1]（起始 tile/参数）
   * - $0048 = cfg[2] & 0x3F（BG 调色板索引）
   * - $005B bit7 = cfg[2] bit6（翻转标志）
   * - $005E/$005F = cfg[3]/[4]（宽/高）
   * - $005C/$005D = cfg[5] 编码的 nametable 基址
   * - $008E/$008F = cfg[0]/[1]
   * - ram_0063/0064 = CHR 指针表[configId]（指向 CHR 配置块）
   * - 清屏分支（width≥9 清 NT0+NT1；否则按 $005D bit2 清 NT1/NT0）
   * tile→NT 展开由场景渲染单独处理（queueScene3NametableRows）。
   */
  loadChrConfig(configId: number): void {
    const store = this.store;
    const cfg = OPENING_CHR_CONFIGS[configId & 0x1f] ?? OPENING_CHR_CONFIGS[0];
    store.writeByte(0x0009, 0);
    store.writeByte(0x000a, 0);
    store.writeByte(0x000d, 0);
    store.writeByte(0x000e, 0);
    store.writeByte(0x005b, store.readByte(0x005b) & 0x7f);
    store.writeByte(0x0077, store.readByte(0x0025));
    for (let i = 0; i < 8; i++) {
      store.writeByte(0x064a + i, 0);
    }
    store.writeByte(0x0075, cfg[0]);
    store.writeByte(0x0076, cfg[1]);
    store.writeByte(0x0048, cfg[2] & 0x3f);
    const flip = (cfg[2] >> 6) & 1;
    store.writeByte(0x005b, (store.readByte(0x005b) & 0x7f) | (flip << 7));
    store.writeByte(0x005e, cfg[3]);
    store.writeByte(0x005f, cfg[4]);
    let v = ((0x02 << 8) | (cfg[5] & 0xf8)) << 2;
    v = ((v & 0xff00) | ((v & 0xff) | (cfg[5] & 0x07))) << 2;
    store.writeByte(0x005c, v & 0xff);
    store.writeByte(0x005d, (v >> 8) & 0xff);
    store.writeByte(0x008e, cfg[0]);
    store.writeByte(0x008f, cfg[1]);
    const ptr = OPENING_CHR_POINTER_TABLE[configId & 0x1f] ?? OPENING_CHR_POINTER_TABLE[0];
    store.writeByte(0x0063, ptr & 0xFF);
    store.writeByte(0x0064, (ptr >> 8) & 0xFF);
    if ((store.readByte(0x005d) & 0x0c) === 0) {
      const adj = ((((store.readByte(0x007b) << 2) & 0xff) ^ store.readByte(0x005b)) & 0x04);
      store.writeByte(0x005d, (store.readByte(0x005d) | adj) & 0xff);
    }
    const width = store.readByte(0x005e);
    if (width >= 0x09) {
      this.fillNametableRows(0x00, 0x20, 0x10, 0x20, 0x00);
      this.fillNametableRows(0x00, 0x24, 0x10, 0x20, 0x00);
    } else if ((store.readByte(0x005d) & 0x04) !== 0) {
      this.fillNametableRows(0x00, 0x24, 0x10, 0x20, 0x00);
    } else {
      this.fillNametableRows(0x00, 0x20, 0x10, 0x20, 0x00);
    }
    // tile 渲染指令流已提取为 OPENING_TILE_STREAMS（不读 ROM）
    const stream = OPENING_TILE_STREAMS[configId & 0x1f] ?? [];
    const cmd = stream.length > 1 ? stream[1] : 0;
    const param = (cmd & 0x1f) !== 0 && stream.length > 2 ? stream[2] : 0;
    store.writeByte(0x0062, cmd);
    store.writeByte(0x0072, param);
    // 场景 3 的 tile 网格已提取为 OPENING_SCENE3_TILES/OPENING_TILE_PATTERNS，
    // 由 queueScene3NametableRows 按行写入渲染缓冲（场景控制器逐帧驱动）。
  }

  // ──────────────────────────── 场景 3 NT 数据（开场背景） ────────────────────────────

  /**
   * 场景 3 开场背景：OPENING_SCENE3_TILES（6×8 pattern）每个 pattern 按
   * OPENING_TILE_PATTERNS 展开为 4×4 tile（[1..16]，0xFF=跳过），共 24×32 tiles。
   * 从 $2000 起逐行写入渲染缓冲（renderCommit 消费后写 PPU）。
   * @param fromRow 起始行（0-31）
   * @param rows    本次写入行数
   */
  queueScene3NametableRows(fromRow: number, rows: number): void {
    const store = this.store;
    for (let r = 0; r < rows; r++) {
      const row = fromRow + r;
      if (row >= 32) break;
      const line: number[] = new Array(32).fill(0);
      for (let c = 0; c < 6; c++) {
        const patIdx = OPENING_SCENE3_TILES[Math.floor(row / 4) * 6 + c] ?? 0;
        const pattern = OPENING_TILE_PATTERNS[patIdx] ?? OPENING_TILE_PATTERNS[0];
        const pr = row % 4;
        for (let pc = 0; pc < 4; pc++) {
          const v = pattern[1 + pr * 4 + pc];
          if (v !== 0xff) line[c * 4 + pc] = v;
        }
      }
      const addr = 0x2000 + row * 32;
      let pos = this.ntBufferEntry(0x20, addr & 0xff, (addr >> 8) & 0xff);
      for (const b of line) this.ntBufferDataByte(pos++, b);
      this.ntBufferEnd(pos);
    }
    void store;
  }
}