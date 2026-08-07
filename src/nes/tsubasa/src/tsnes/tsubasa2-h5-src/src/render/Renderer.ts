/**
 * 渲染器 (View 层)
 *
 * 职责:
 *   1. 消费 DataStore → 绘制 Canvas
 *   2. 持有全量 CHR tile 纹理缓存
 *   3. 渲染 BG (NameTable) + 精灵 (OAM)
 *
 * 不包含任何业务逻辑，纯渲染。
 */

import { DataStore, type NameTableEntry, type SpriteEntry } from '../data/DataStore';
import { NES_WIDTH, NES_HEIGHT, TILE_PX, CHR_BANK_SIZE } from '../core/types';
import { type PaletteTable, type PaletteColor } from '../model/types';

/** 一个 tile 的 RGBA 像素数据 */
export interface TileImage {
  data: ImageData | Uint8ClampedArray;
}

/** 配置 */
interface RendererConfig {
  /** 缩放倍率 */
  scale: number;
  /** 绘制网格(调试) */
  drawGrid: boolean;
}

const DEFAULT_CONFIG: RendererConfig = {
  scale: 2,
  drawGrid: false,
};

export class Renderer {
  private _ctx: CanvasRenderingContext2D;
  private _store: DataStore;
  private _config: RendererConfig;

  /** 离屏 Canvas (256×240) */
  private _offscreen: any = null;
  private _offscreenCtx: any = null;

  /** Tile 缓存: [bankId][tileId] → ImageBitmap */
  private _tileCache: Map<string, ImageBitmap | HTMLImageElement> = new Map();

  /** CHR 原始数据 [bankId] → Uint8Array */
  private _chrBanks: Uint8Array[] = [];

  /** 调色板表 */
  private _paletteTable: PaletteTable = {
    bgPalettes: [[], [], [], []] as any,
    sprPalettes: [[], [], [], []] as any,
  };

  // ── 构造 ──

  constructor(
    ctx: CanvasRenderingContext2D,
    store: DataStore,
    config?: Partial<RendererConfig>,
  ) {
    this._ctx = ctx;
    this._store = store;
    this._config = { ...DEFAULT_CONFIG, ...config };

    this._initOffscreen();
  }

  // ── CHR 管理 ──

  /** 注册 CHR Bank 数据 */
  registerChrBank(bankId: number, data: Uint8Array): void {
    this._chrBanks[bankId] = data;
  }

  /** 解码单个 tile → ImageData */
  decodeTile(bankId: number, tileId: number, paletteGroup: number): ImageData | null {
    const chr = this._chrBanks[bankId];
    if (!chr) return null;

    const off = tileId * 16;
    if (off + 16 > chr.length) return null;

    const img = new ImageData(TILE_PX, TILE_PX);
    const pixels = img.data;

    // 取对应调色板组: 0-3=BG, 4-7=SPR
    const entry = paletteGroup < 4
      ? this._paletteTable.bgPalettes[paletteGroup]
      : this._paletteTable.sprPalettes[paletteGroup - 4];

    for (let row = 0; row < TILE_PX; row++) {
      const byte0 = chr[off + row];          // bitplane 0
      const byte1 = chr[off + row + 8];      // bitplane 1
      for (let col = 0; col < TILE_PX; col++) {
        const mask = 0x80 >> col;
        const bit0 = (byte0 & mask) ? 1 : 0;
        const bit1 = (byte1 & mask) ? 1 : 0;
        const colorIdx = (bit1 << 1) | bit0;

        // 颜色索引 0 = 透明
        if (colorIdx === 0) {
          const p = (row * TILE_PX + col) * 4;
          pixels[p] = 0;
          pixels[p + 1] = 0;
          pixels[p + 2] = 0;
          pixels[p + 3] = 0;   // 透明
        } else if (entry) {
          const pal = entry.colors[colorIdx];
          const p = (row * TILE_PX + col) * 4;
          pixels[p] = pal.r;
          pixels[p + 1] = pal.g;
          pixels[p + 2] = pal.b;
          pixels[p + 3] = pal.a;
        }
      }
    }
    return img;
  }

  // ── 渲染主入口 ──

  /** 绘制完整一帧 */
  render(): void {
    const offCtx = this._offscreenCtx;
    if (!offCtx) return;

    // 清屏
    offCtx.fillStyle = '#000000';
    offCtx.fillRect(0, 0, NES_WIDTH, NES_HEIGHT);

    // 绘制 BG (NameTable)
    this._drawNametable(offCtx as any);

    // 绘制精灵
    this._drawSprites(offCtx as any);

    // 缩放到主 Canvas
    const scale = this._config.scale;
    if (scale !== 1 && this._offscreen) {
      this._ctx.imageSmoothingEnabled = false;
      this._ctx.drawImage(
        this._offscreen as any,
        0, 0,
        NES_WIDTH * scale,
        NES_HEIGHT * scale,
      );
    }
  }

  /** 设置离屏 Canvas 缩放目标尺寸 */
  setCanvasSize(w: number, h: number): void {
    (this._ctx as any).canvas.width = w;
    (this._ctx as any).canvas.height = h;
  }

  // ── 内部 ──

  private _initOffscreen(): void {
    const cvs = this._offscreenCtx?._canvas;
    if (!cvs) return;
  }

  /** 设置离屏 Canvas */
  setOffscreen(canvas: any): void {
    this._offscreen = canvas;
    canvas.width = NES_WIDTH;
    canvas.height = NES_HEIGHT;
    this._offscreenCtx = canvas.getContext('2d');
  }

  /** 绘制 NameTable 背景（viewport 采样） */
  private _drawNametable(ctx: CanvasRenderingContext2D): void {
    this._store.eachVisibleTile((screenX, screenY, entry) => {
      // 按 tile + palette + bank 查缓存 → 无缓存则解码
      // TODO: tile 缓存 ImageBitmap 后直接 drawImage
      // 占位：色块
      ctx.fillStyle = `hsl(${(entry.tile * 7) % 360}, 60%, 50%)`;
      ctx.fillRect(screenX, screenY, TILE_PX, TILE_PX);
    });
  }

  /** 绘制精灵 */
  private _drawSprites(ctx: CanvasRenderingContext2D): void {
    for (const spr of this._store.sprites) {
      if (!spr.active) continue;
      // TODO: 从 tile 缓存获取 ImageBitmap 并根据 flip 绘制
      ctx.fillStyle = `rgba(255,0,0,0.5)`;
      ctx.fillRect(spr.x, spr.y, TILE_PX, TILE_PX);
    }
  }

  /** 设置调色板表 */
  setPaletteTable(table: PaletteTable): void {
    this._paletteTable = table;
  }

  /** @deprecated 使用 setPaletteTable 代替 */
  setPalettes(bgPalettes: number[][], sprPalettes: number[][]): void {
    // 向后兼容：将原始 RGBA 数组转换为 PaletteTable
    for (let i = 0; i < 4; i++) {
      const bg = bgPalettes[i] as number[][];
      if (bg) {
        this._paletteTable.bgPalettes[i] = {
          colors: [
            { r: bg[0]?.[0] ?? 0, g: bg[0]?.[1] ?? 0, b: bg[0]?.[2] ?? 0, a: bg[0]?.[3] ?? 255 },
            { r: bg[1]?.[0] ?? 0, g: bg[1]?.[1] ?? 0, b: bg[1]?.[2] ?? 0, a: bg[1]?.[3] ?? 255 },
            { r: bg[2]?.[0] ?? 0, g: bg[2]?.[1] ?? 0, b: bg[2]?.[2] ?? 0, a: bg[2]?.[3] ?? 255 },
            { r: bg[3]?.[0] ?? 0, g: bg[3]?.[1] ?? 0, b: bg[3]?.[2] ?? 0, a: bg[3]?.[3] ?? 255 },
          ],
        };
      }
    }
    for (let i = 0; i < 4; i++) {
      const spr = sprPalettes[i] as number[][];
      if (spr) {
        this._paletteTable.sprPalettes[i] = {
          colors: [
            { r: spr[0]?.[0] ?? 0, g: spr[0]?.[1] ?? 0, b: spr[0]?.[2] ?? 0, a: spr[0]?.[3] ?? 255 },
            { r: spr[1]?.[0] ?? 0, g: spr[1]?.[1] ?? 0, b: spr[1]?.[2] ?? 0, a: spr[1]?.[3] ?? 255 },
            { r: spr[2]?.[0] ?? 0, g: spr[2]?.[1] ?? 0, b: spr[2]?.[2] ?? 0, a: spr[2]?.[3] ?? 255 },
            { r: spr[3]?.[0] ?? 0, g: spr[3]?.[1] ?? 0, b: spr[3]?.[2] ?? 0, a: spr[3]?.[3] ?? 255 },
          ],
        };
      }
    }
  }
}
