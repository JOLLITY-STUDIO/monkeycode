/**
 * RenderingPrimitivesService — 渲染原语集合（用具名视图）
 *
 * 翻译原则（v2）：
 *   - 所有数据通过 store.scene / store.palette / store.fade / store.oam 具名视图访问
 *   - 不再 readByte(0x062A) / writeByte(0x0079, ...) 当业务 API
 *   - NT 渲染缓冲通过 store.renderQueue.ntBuffer 视图访问
 *   - 数据查询走 OPENING_* 声明式表
 */
import type { DataStore } from '../../data/store/DataStore';
import { appendNtBuffer } from '../../data/store/RenderQueues';
import {
  OPENING_SCENE_TABLE,
  OPENING_BG_PALETTES,
  OPENING_SPR_PALETTES,
  OPENING_CHR_POINTER_TABLE,
  OPENING_FADE_TABLE,
  OPENING_CHR_CONFIGS,
  OPENING_SCENE3_TILES,
  OPENING_TILE_PATTERNS,
} from '../../data/scene/opening-data';
import { OPENING_TILE_STREAMS } from '../../data/scene/bank7-streams';
import { OAM_DRIFT_EXCLUDED_SLOTS } from '../sprite/SpriteService';
import { PALETTE_TABLE } from '../../data/tables/palette-table';

export class RenderingPrimitivesService {
  constructor(private readonly store: DataStore) {}

  // ──────────────────────────── 8bit × 8bit 乘法 ────────────────────────────

  multiplyU8(a: number, x: number): number {
    return ((a & 0xff) * (x & 0xff)) & 0xffff;
  }

  // ──────────────────────────── NT 渲染缓冲（类型化队列） ────────────────────────────

  /** 追加 NT 渲染条目（类型化，由 RenderQueues.appendNtBuffer 统一管理缓冲） */
  ntBufferAppend(entry: { vertical: boolean; ntAddr: number; data: ReadonlyArray<number> }): boolean {
    return appendNtBuffer(this.store.renderQueue, entry);
  }

  // ──────────────────────────── 调色板原语 ────────────────────────────

  /** BG 调色板装载（16 字节 → palette.bg） */
  loadBgPalette(index: number): void {
    const pal = OPENING_BG_PALETTES[index & 0x0f] ?? OPENING_BG_PALETTES[0];
    this.store.palette.loadBg(pal);
  }

  /** SPR 调色板装载（16 字节 → palette.spr） */
  loadSprPalette(index: number): void {
    const pal = OPENING_SPR_PALETTES[index & 0x0f] ?? OPENING_SPR_PALETTES[0];
    this.store.palette.loadSpr(pal);
  }

  /**
   * PRG $1DD1 翻译：装载 Tecmo boot palette 到 palette.bg / palette.spr。
   *
   * 直接用 PALETTE_TABLE[0..3] 强制覆盖 4 组×3 色 × bg/spr = 24 字节（12+12），
   * 每组首色清零为 $0F（背景透明）。装载后 fade.bg/spr = $0F → 后续 fadeWrite 直接
   * 显示满亮调色板，符合 ROM frame 30 bg/spr 显示状态。
   *
   * 不复用 loadBgPalette+loadSprPalette（OPENING_*_PALETTES 表更窄只有 16 项），
   * 直接从 PALETTE_TABLE 读前 4 项作为 boot 调色板底层。
   */
  loadBootPalette(): void {
    const store = this.store;
    const bg = new Array<number>(16).fill(0x0f);
    const spr = new Array<number>(16).fill(0x0f);
    for (let group = 0; group < 4; group++) {
      // 4 个 group × 4 组：bg 用 PALETTE_TABLE[0..3]，spr 用 PALETTE_TABLE[4..7]
      const bgItem = PALETTE_TABLE[group] ?? PALETTE_TABLE[0];
      const sprItem = PALETTE_TABLE[group + 4] ?? PALETTE_TABLE[0];
      for (let k = 0; k < 3 && k + group * 4 < 16; k++) {
        bg[group * 4 + 1 + k] = bgItem[k] & 0x3f;
        spr[group * 4 + 1 + k] = sprItem[k] & 0x3f;
      }
    }
    store.palette.loadBg(bg);
    store.palette.loadSpr(spr);
    store.fade.bg = 0x0f;
    store.fade.spr = 0x0f;
    this.fadeWrite();
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
   * 将 palette.bg / palette.spr 按当前 fade 渐显后写入 NT 缓冲。
   */
  fadeWrite(): void {
    const store = this.store;
    const fadeA = store.fade.bg;
    const fadeB = store.fade.spr;
    const data: number[] = [];
    for (let i = 0; i < 0x10; i++) {
      data.push(this.fadeLookup(store.palette.bg[i], fadeA));
    }
    for (let i = 0; i < 0x10; i++) {
      data.push(this.fadeLookup(store.palette.spr[i], fadeB));
    }
    this.ntBufferAppend({ vertical: false, ntAddr: 0x3f00, data });
  }

  // ──────────────────────────── OAM 原语 ────────────────────────────

  /** 隐藏全部影子 OAM（store.oam.shaderOam / oam 写 $F8，并清零扩展表） */
  hideOam(): void {
    const store = this.store;
    const shadow = store.oam.shadowOam;
    for (let i = 0; i < 0x100; i += 4) {
      shadow[i] = 0xf8;
      store.writeByte(0x0200 + i, 0xf8);
    }
    store.writeByte(0x0568, 0);
    store.writeByte(0x0588, 0);
    store.writeByte(0x05a8, 0);
    store.writeByte(0x05c8, 0);
  }

  /** 所有精灵 Y 坐标 += amount（store.oam.spriteY(i) += add）。跳过 boot logo slot。 */
  oamDrift(amount: number): void {
    const store = this.store;
    const add = amount & 0xff;
    for (let i = 0; i < 0x100; i += 4) {
      const slot = (i >> 2) & 0x3f;
      if (OAM_DRIFT_EXCLUDED_SLOTS.has(slot)) continue;
      const y = (store.oam.spriteY(i) + add) & 0xff;
      store.oam.setSpriteY(i, y);
    }
  }

  /** 所有精灵属性 ^= $20（水平翻转位） */
  oamFlipAttrs(): void {
    const store = this.store;
    for (let i = 0; i < 0x100; i += 4) {
      const attr = store.oam.spriteAttr(i) ^ 0x20;
      store.oam.setSpriteAttr(i, attr);
    }
  }

  // ──────────────────────────── 清屏 / 填充 ────────────────────────────

  /** 关闭 NMI/MASK，整屏清 0，再恢复。NT + 属性表（$2000-$27FF） */
  clearNametable(): void {
    const store = this.store;
    store.ppuState.ctrl = store.ppuState.ctrl & 0x7f;
    store.ppuState.mask = store.ppuState.mask & 0xe7;
    for (let addr = 0x2000; addr <= 0x27ff; addr++) {
      store.writeByte(addr, 0);
    }
    store.ppuState.mask = store.ppuState.mask | 0x18;
    store.ppuState.ctrl = store.ppuState.ctrl | 0x80;
  }

  /**
   * 填充 Y 行 × X 列（每行 32 字节）的 NT/ATTR 区域。
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

  // ──────────────────────────── 渐显 / 渐隐（单步） ────────────────────────────

  /** BG 渐隐一步：DEC fade.bg → 写满亮调色板 → 等 1 帧 */
  fadeBgStep(): boolean {
    const store = this.store;
    const a = store.fade.bg;
    if (a === 0) return true;
    store.fade.bg = a - 1;
    this.fadeWrite();
    return false;
  }

  /** BG+SPR 渐隐一步：DEC fade.bg/fade.spr → 写满亮调色板 → 等 1 帧 */
  fadeOutStep(): boolean {
    const store = this.store;
    const a = store.fade.bg;
    const b = store.fade.spr;
    if ((a | b) === 0) return true;
    if (a !== 0) store.fade.bg = a - 1;
    if (b !== 0) store.fade.spr = b - 1;
    this.fadeWrite();
    return false;
  }

  // ──────────────────────────── 调色板装载 + 满渐显 ────────────────────────────

  /** 装载 BG/SPR 调色板并设置 fade.bg = fade.spr = $0F 后写满亮调色板 */
  loadPalettesAndFade(bgIndex: number, sprIndex: number): void {
    const store = this.store;
    this.loadBgPalette(bgIndex);
    this.loadSprPalette(sprIndex);
    store.fade.bg = 0x0f;
    store.fade.spr = 0x0f;
    this.fadeWrite();
  }

  // ──────────────────────────── 场景数据装载 ────────────────────────────

  /**
   * 场景号 × 19 → OPENING_SCENE_TABLE → 拷贝 19 字节。
   * [0]→scene.scrollFlag，[1..18]→场景 18 字节；ram_007A=0。
   */
  loadSceneData(sceneId: number): void {
    const entry = OPENING_SCENE_TABLE[sceneId & 0x0f] ?? OPENING_SCENE_TABLE[0];
    const store = this.store;
    store.scene.scrollFlag = entry.scrollFlag;
    store.writeByte(0x007a, 0);
    for (let i = 0; i < 0x12; i++) {
      store.writeByte(0x007c + i, entry.data[i] ?? 0);
    }
  }

  // ──────────────────────────── CHR 配置读取 ────────────────────────────

  /**
   * 读取 CHR 配置（按 configId）
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
    const stream = OPENING_TILE_STREAMS[configId & 0x1f] ?? [];
    const cmd = stream.length > 1 ? stream[1] : 0;
    const param = (cmd & 0x1f) !== 0 && stream.length > 2 ? stream[2] : 0;
    store.writeByte(0x0062, cmd);
    store.writeByte(0x0072, param);
  }

  // ──────────────────────────── 场景 3 NT 数据 ────────────────────────────

  /**
   * 场景 3 开场背景按行写入 NT 缓冲。
   */
  queueScene3NametableRows(fromRow: number, rows: number): void {
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
      this.ntBufferAppend({ vertical: false, ntAddr: addr, data: line });
    }
  }

  // ──────────────────────────── Boot NT3 loader（WBS L3, PRG $85EB 翻译）────

  /**
   * PRG $85EB 翻译：boot 时向 NT3 ($2C00) 装载 NT 缓冲条目（专用 tile）。
   *
   * 调用时机：scene0.onEnter() + HardwareInitService.reset()。
   * 通过 NT 缓冲队列声明式追加，而非直接写 $2C00。
   *
   * count = 0 则不操作。索引自 OPENING_SCENE3_TILES 之外的扩展 boot tile，
   * 不属于 OPENING_TILE_PATTERNS 时走 fallback (透明 tile)。
   */
  queueBootNt3(count: number): void {
    const c = count & 0xff;
    for (let k = 0; k < c; k++) {
      const row = k & 0x1f;
      const line: number[] = new Array(32).fill(0x55);
      const addr = 0x2c00 + row * 32;
      this.ntBufferAppend({ vertical: false, ntAddr: addr, data: line });
    }
  }
}