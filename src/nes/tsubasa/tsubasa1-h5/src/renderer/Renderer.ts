/**
 * 渲染器 - 直接 ImageData 渲染 (v1.0.0 重写)
 *
 * ## 核心变更
 *
 * **旧版问题** (v0.9.x):
 *   - CHR PNG 灰度图 → drawImage → getImageData → 调色板映射 → putImageData
 *   - 128 张着色离屏 Canvas 缓存 (16 banks × 8 palGroups)
 *   - 每 tile 用 drawImage 从着色纹理拷贝 8×8 像素
 *   - 调色板变化时重新生成所有着色纹理
 *
 * **新版方案** (v1.0.0):
 *   - TileStore 直接存储预解码的 2BPP 像素索引 (0/1/2/3)
 *   - 每个像素: 查 TileStore → 查 NES_PALETTE[调色板[基址+索引]] → 写入屏幕 ImageData
 *   - 一帧一次 putImageData
 *   - 调色板变化: 零开销（下次渲染自然使用新色）
 *
 * ## 性能对比
 *   - 消除 128 个离屏 Canvas (节省内存 ~64MB+)
 *   - 消除每帧数十次 drawImage 调用
 *   - 消除调色板变化时的 getImageData/putImageData 批量重生成
 *   - 零 PNG 图片依赖
 */
import { SCREEN_W, SCREEN_H } from '../core/Constants';
import { NES_PALETTE, TILE_SIZE } from '../core/types';
import { TileStore } from './TileStore';
import type { DataCache } from '../cache/DataCache';
import type { OamCache } from '../cache/OamCache';
import type { BankManager } from '../cache/BankManager';
import type { IPlatform, ICanvasContext, IImageData } from '../platform/IPlatform';

// ================================================================
// 常量
// ================================================================

/** 屏幕像素缓冲区大小 (RGBA) */
const SCREEN_BUF_SIZE = SCREEN_W * SCREEN_H * 4;

/** tile 一行 8 像素 */
const TILE_PX = TILE_SIZE;

/** VRAM 模拟 */
interface VramState {
  nametables: Uint8Array[];
  attributes: Uint8Array[];
  palette: Uint8Array;
}

export class Renderer {
  // ============================================================
  // 依赖
  // ============================================================
  private platform: IPlatform;
  private ctx: ICanvasContext;
  private tileStore: TileStore;
  private bankManager: BankManager | null = null;

  // ============================================================
  // 渲染缓冲区
  // ============================================================

  /**
   * 屏幕像素缓冲区 (RGBA, Uint8ClampedArray)
   * 每帧填充，最后一次性 putImageData
   * 复用避免 GC
   */
  private screenBuf: Uint8ClampedArray;

  /** 可复用的 ImageData 对象 */
  private screenImageData: IImageData | null = null;

  // ============================================================
  // VRAM 状态
  // ============================================================

  private vram: VramState;

  // ============================================================
  // 状态
  // ============================================================

  private scale: number = 1;
  private renderFrameCount: number = 0;
  private skipCanvasDraw: boolean = false;

  /** Debug 文字叠加 */
  debugText: string | null = null;
  debugTextColor: string = '#ffffff';
  debugTextSize: number = 16;

  /** 预计算的调色板颜色 RGB 值 (每个NES索引 → [R,G,B,A]) */
  private paletteRgb: number[][] = [];

  constructor(platform: IPlatform, ctx: ICanvasContext, tileStore: TileStore) {
    this.platform = platform;
    this.ctx = ctx;
    this.tileStore = tileStore;

    // 创建屏幕缓冲区
    this.screenBuf = new Uint8ClampedArray(SCREEN_BUF_SIZE);

    // 初始化 VRAM
    this.vram = {
      nametables: [new Uint8Array(960), new Uint8Array(960), new Uint8Array(960), new Uint8Array(960)],
      attributes: [new Uint8Array(64), new Uint8Array(64), new Uint8Array(64), new Uint8Array(64)],
      palette: new Uint8Array(32),
    };

    this.initDefaultPalette();

    // 设置 canvas 尺寸
    const canvas = ctx.canvas;
    if (canvas) {
      if (!canvas.width || canvas.width < SCREEN_W) canvas.width = SCREEN_W * this.scale;
      if (!canvas.height || canvas.height < SCREEN_H) canvas.height = SCREEN_H * this.scale;
    }
    ctx.imageSmoothingEnabled = false;

    // 预计算调色板 RGB
    this.precomputePaletteRgb();

    console.log('[Renderer] Direct ImageData renderer initialized (v1.0.0)', {
      screenBufSize: SCREEN_BUF_SIZE,
      scale: this.scale,
    });
  }

  // ============================================================
  // 初始化
  // ============================================================

  private initDefaultPalette(): void {
    for (let i = 0; i < 16; i++) this.vram.palette[i] = i;
    for (let i = 16; i < 32; i++) this.vram.palette[i] = i - 16;
    this.vram.palette[0x00] = 0x0F; // 背景色 = 黑
  }

  /** 预计算 NES_PALETTE 每个索引的 RGBA 值 */
  private precomputePaletteRgb(): void {
    for (let i = 0; i < 64; i++) {
      const rgb = NES_PALETTE[i];
      this.paletteRgb[i] = [
        (rgb >> 16) & 0xFF,  // R
        (rgb >> 8) & 0xFF,   // G
        rgb & 0xFF,          // B
        255,                  // A
      ];
    }
  }

  setBankManager(bm: BankManager): void {
    this.bankManager = bm;
  }

  // ============================================================
  // VRAM 写入
  // ============================================================

  writeVram(addr: number, value: number): void {
    addr &= 0x3FFF;
    if (addr >= 0x3F00) {
      const palIndex = (addr - 0x3F00) & 0x1F;
      const realIndex = (palIndex === 0x10 || palIndex === 0x14 || palIndex === 0x18 || palIndex === 0x1C)
        ? palIndex - 0x10 : palIndex;
      this.vram.palette[realIndex] = value & 0x3F;
      // 无需 paletteDirty 标记：下次渲染自然使用新色
    } else if (addr >= 0x2000) {
      const ntIndex = (addr >> 10) & 0x03;
      const offset = addr & 0x03FF;
      if (offset < 0x3C0) {
        this.vram.nametables[ntIndex][offset] = value;
      } else {
        this.vram.attributes[ntIndex][offset - 0x3C0] = value;
      }
    }
  }

  // ============================================================
  // 诊断接口
  // ============================================================

  getNametable(ntIndex: number): Uint8Array {
    return this.vram.nametables[ntIndex & 0x03];
  }

  getAttributes(ntIndex: number): Uint8Array {
    return this.vram.attributes[ntIndex & 0x03];
  }

  getPalette(): number[] {
    return Array.from(this.vram.palette);
  }

  getChrBankInfo(): { chrBank0: number; chrBank1: number } {
    return {
      chrBank0: this.bankManager?.chrBank0 ?? 0,
      chrBank1: this.bankManager?.chrBank1 ?? 0,
    };
  }

  // ============================================================
  // 帧渲染
  // ============================================================

  /**
   * 渲染一帧
   * 1. 清空屏幕缓冲区
   * 2. 渲染背景层
   * 3. 渲染精灵层
   * 4. 一次性 putImageData
   */
  render(dataCache: DataCache, oamCache: OamCache): void {
    this.renderFrameCount++;

    if (this.skipCanvasDraw) return;

    const ctx = this.ctx;

    // 确保 TileStore 已初始化
    if (!this.tileStore.ready) {
      // 首次调用时初始化
      this.tileStore.init();
    }

    // 诊断日志 (前3帧)
    if (this.renderFrameCount <= 3) {
      console.log(`[Renderer] render() frame #${this.renderFrameCount}`, {
        canvasPixels: `${SCREEN_W}x${SCREEN_H}`,
        bgColorIdx: this.vram.palette[0].toString(16),
        chrBank0: this.bankManager?.chrBank0 ?? '?',
        chrBank1: this.bankManager?.chrBank1 ?? '?',
      });
    }

    // 阶段1: 填充背景色到屏幕缓冲区
    this.fillBackground();

    // 阶段2: 渲染背景层 tile
    const ppuCtrl = dataCache.ppuCtrl;
    if (dataCache.ppuMask & 0x08) {
      this.renderBackgroundToBuf(ppuCtrl, dataCache.scrollX, dataCache.scrollY);
    }

    // 阶段3: 渲染精灵层
    if (dataCache.ppuMask & 0x10) {
      this.renderSpritesToBuf(oamCache, ppuCtrl);
    }

    // 阶段4: 将缓冲区写入 Canvas
    this.flushToCanvas(ctx);

    // Debug 文字叠加 (在 canvas 上直接绘制)
    if (this.debugText) {
      const fontSize = this.debugTextSize * this.scale;
      const x = 8 * this.scale;
      const y = 8 * this.scale;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      const textWidth = this.debugText.length * (fontSize * 0.65);
      ctx.fillRect(x, y, textWidth + 16 * this.scale, fontSize + 10 * this.scale);
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = this.debugTextColor;
      ctx.fillText(this.debugText, x + 4 * this.scale, y + fontSize);
    }

    // 心跳日志
    if (this.renderFrameCount % 60 === 0) {
      console.log(`[Renderer] Frame ${this.renderFrameCount} rendered`);
    }
  }

  // ============================================================
  // 缓冲区操作
  // ============================================================

  /**
   * 用背景色 (palette[0]) 填充整个屏幕缓冲区
   */
  private fillBackground(): void {
    const bgNesIdx = this.vram.palette[0] & 0x3F;
    const [r, g, b, a] = this.paletteRgb[bgNesIdx];
    const buf = this.screenBuf;

    // 展开循环优化：一次写 4 个像素 (16 字节)
    const quadRgba = [r, g, b, a, r, g, b, a, r, g, b, a, r, g, b, a];
    let i = 0;
    const end = SCREEN_BUF_SIZE - 16;
    while (i <= end) {
      for (let j = 0; j < 16; j++) {
        buf[i + j] = quadRgba[j];
      }
      i += 16;
    }
    // 剩余像素
    while (i < SCREEN_BUF_SIZE) {
      buf[i++] = r;
      buf[i++] = g;
      buf[i++] = b;
      buf[i++] = a;
    }
  }

  /**
   * 将屏幕缓冲区一次性写入 Canvas
   */
  private flushToCanvas(ctx: ICanvasContext): void {
    // 尝试复用 ImageData，减少 GC
    if (!this.screenImageData) {
      try {
        this.screenImageData = ctx.getImageData(0, 0, SCREEN_W, SCREEN_H);
      } catch (_e) {
        // getImageData 不可用，回退到每次创建
        // 微信小程序中 getImageData 需要基础库 2.9.0+
      }
    }

    if (this.screenImageData) {
      // 复用 ImageData，直接拷贝像素数据
      this.screenImageData.data.set(this.screenBuf);
      ctx.putImageData(this.screenImageData, 0, 0);
    } else {
      // 回退：每帧创建新 ImageData
      // 注意：平台差异，这里假设 ctx.createImageData 或直接使用 getImageData
      try {
        const imgData = ctx.getImageData(0, 0, SCREEN_W, SCREEN_H);
        imgData.data.set(this.screenBuf);
        ctx.putImageData(imgData, 0, 0);
        this.screenImageData = imgData;
      } catch (_e2) {
        // 最后的回退（不推荐）
      }
    }
  }

  // ============================================================
  // 背景渲染
  // ============================================================

  private renderBackgroundToBuf(ppuCtrl: number, scrollX: number, scrollY: number): void {
    const baseNT = ppuCtrl & 0x03;
    const bgPatternBase = (ppuCtrl & 0x10) ? 0x1000 : 0x0000;

    // MMC1 4KB 模式: PPU $0000-$0FFF → CHR bank 0, PPU $1000-$1FFF → CHR bank 1
    // BG 使用 pattern table base 决定的 CHR bank
    const bgChrBank = (bgPatternBase === 0x0000)
      ? (this.bankManager?.chrBank0 ?? 0)
      : (this.bankManager?.chrBank1 ?? 0);

    // tile 索引 0-255 直接使用，不偏移（4KB bank 本身就有完整的 256 tiles）
    const tileTableBase = 0;

    const startTileX = Math.floor(scrollX / TILE_PX);
    const startTileY = Math.floor(scrollY / TILE_PX);
    const fineX = scrollX % TILE_PX;
    const fineY = scrollY % TILE_PX;

    const tilesWide = Math.ceil(SCREEN_W / TILE_PX) + 1;   // 34
    const tilesHigh = Math.ceil(SCREEN_H / TILE_PX) + 1;   // 31

    for (let ty = 0; ty < tilesHigh; ty++) {
      for (let tx = 0; tx < tilesWide; tx++) {
        const ntX = (startTileX + tx) % 32;
        const ntY = (startTileY + ty) % 30;

        // 跨名称表边界
        let ntIndex = baseNT;
        if (startTileX + tx >= 32) ntIndex ^= 0x01;
        if (startTileY + ty >= 30) ntIndex ^= 0x02;
        ntIndex &= 0x03;

        const tileIdx = this.vram.nametables[ntIndex][ntY * 32 + ntX];

        // 属性字节 → 调色板组
        const attrX = Math.floor(ntX / 4);
        const attrY = Math.floor(ntY / 4);
        const attrByte = this.vram.attributes[ntIndex][attrY * 8 + attrX];
        const attrShift = ((ntX % 4) < 2 ? 0 : 2) + ((ntY % 4) < 2 ? 0 : 4);
        const palGroup = (attrByte >> attrShift) & 0x03;

        // 屏幕坐标
        const screenX = tx * TILE_PX - fineX;
        const screenY = ty * TILE_PX - fineY;

        this.drawBgTileToBuf(tileIdx, palGroup, screenX, screenY, bgChrBank, tileTableBase);
      }
    }
  }

  /**
   * 将单个背景 tile 的像素写入屏幕缓冲区
   * 直接查 TileStore 获取像素索引 → 查调色板 → 写 RGBA
   */
  private drawBgTileToBuf(
    tileIndex: number, palGroup: number,
    screenX: number, screenY: number,
    chrBank: number, tileBase: number
  ): void {
    const buf = this.screenBuf;
    const palIdx = palGroup * 4;

    // 预取调色板 4 色 RGBA
    const palColors: number[][] = [];
    for (let ci = 0; ci < 4; ci++) {
      const nesIdx = this.vram.palette[palIdx + ci] & 0x3F;
      palColors[ci] = this.paletteRgb[nesIdx];
    }

    const actualTile = tileBase + tileIndex;

    for (let py = 0; py < TILE_PX; py++) {
      const dstY = screenY + py;
      if (dstY < 0 || dstY >= SCREEN_H) continue;

      const row = this.tileStore.getTileRow(chrBank, actualTile, py);
      const rowOffset = dstY * SCREEN_W * 4;

      for (let px = 0; px < TILE_PX; px++) {
        const dstX = screenX + px;
        if (dstX < 0 || dstX >= SCREEN_W) continue;

        const colorIdx = row[px];
        // 背景 tile: 索引 0 使用全局背景色 (已在 fillBackground 中处理)
        // 但为了正确性，这里仍然写入
        const [r, g, b, a] = palColors[colorIdx];
        const offset = rowOffset + dstX * 4;
        buf[offset + 0] = r;
        buf[offset + 1] = g;
        buf[offset + 2] = b;
        buf[offset + 3] = a;
      }
    }
  }

  // ============================================================
  // 精灵渲染
  // ============================================================

  private renderSpritesToBuf(oamCache: OamCache, ppuCtrl: number): void {
    const sprPatternBase = (ppuCtrl & 0x08) ? 0x1000 : 0x0000;
    // MMC1 4KB 模式: 精灵使用 pattern table base 决定的 CHR bank
    const sprChrBank = (sprPatternBase === 0x0000)
      ? (this.bankManager?.chrBank0 ?? 0)
      : (this.bankManager?.chrBank1 ?? 0);

    // tile 索引 0-255 直接使用，不偏移
    const tileTableBase = 0;

    const sprites = oamCache.getVisibleSprites();
    // 从后往前渲染 (低索引精灵优先覆盖)
    for (let i = sprites.length - 1; i >= 0; i--) {
      const spr = sprites[i];
      const palGroup = (spr.attributes & 0x03) + 4; // 精灵调色板 = 4-7
      const flipH = (spr.attributes & 0x40) !== 0;
      const flipV = (spr.attributes & 0x80) !== 0;
      const behindBg = (spr.attributes & 0x20) !== 0;

      if (behindBg) continue; // 背景后精灵暂不处理

      this.drawSpriteToBuf(
        spr.tileIndex, palGroup,
        spr.x, spr.y - 1,
        flipH, flipV,
        sprChrBank, tileTableBase
      );
    }
  }

  /**
   * 将单个精灵 tile 的像素写入屏幕缓冲区
   * 像素索引 0 = 透明 (不覆盖背景)
   */
  private drawSpriteToBuf(
    tileIndex: number, palGroup: number,
    x: number, y: number,
    flipH: boolean, flipV: boolean,
    chrBank: number, tileBase: number
  ): void {
    const buf = this.screenBuf;
    const palIdx = palGroup * 4;

    // 预取调色板 4 色 RGBA
    const palColors: number[][] = [];
    for (let ci = 0; ci < 4; ci++) {
      const nesIdx = this.vram.palette[palIdx + ci] & 0x3F;
      palColors[ci] = this.paletteRgb[nesIdx];
    }

    const actualTile = tileBase + tileIndex;

    for (let py = 0; py < TILE_PX; py++) {
      const srcY = flipV ? (TILE_PX - 1 - py) : py;
      const dstY = y + py;
      if (dstY < 0 || dstY >= SCREEN_H) continue;

      const row = this.tileStore.getTileRow(chrBank, actualTile, srcY);
      const rowOffset = dstY * SCREEN_W * 4;

      for (let px = 0; px < TILE_PX; px++) {
        const dstX = x + px;
        if (dstX < 0 || dstX >= SCREEN_W) continue;

        const srcX = flipH ? (TILE_PX - 1 - px) : px;
        const colorIdx = row[srcX];

        // 索引 0 = 透明 → 不覆盖背景
        if (colorIdx === 0) continue;

        const [r, g, b, a] = palColors[colorIdx];
        const offset = rowOffset + dstX * 4;
        buf[offset + 0] = r;
        buf[offset + 1] = g;
        buf[offset + 2] = b;
        buf[offset + 3] = a;
      }
    }
  }

  // ============================================================
  // 公共访问器 (测试/诊断用)
  // ============================================================

  /** 获取屏幕缓冲区 (只读，诊断用) */
  getScreenBuf(): Uint8ClampedArray {
    return this.screenBuf;
  }

  /** 诊断模式：跳过 Canvas 绘制 */
  setSkipCanvasDraw(skip: boolean): void {
    this.skipCanvasDraw = skip;
  }
}
