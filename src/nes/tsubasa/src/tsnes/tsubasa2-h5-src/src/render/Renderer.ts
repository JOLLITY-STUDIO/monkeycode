/**
 * 渲染器 (View 层)
 *
 * 职责:
 *   1. 消费 DataStore → 绘制 Canvas
 *   2. 持有全量 CHR tile 解码缓存
 *   3. 渲染 BG (NameTable) + 精灵 (OAM)
 *
 * 不包含任何业务逻辑，纯渲染。
 */
import { DataStore, type NameTableEntry } from '../data/DataStore';
import { NES_WIDTH, NES_HEIGHT, TILE_PX, CHR_BANK_SIZE } from '../core/types';
import { type PaletteTable, type PaletteEntry } from '../model/types';

const TILE_PX2 = TILE_PX * TILE_PX;

export class Renderer {
  private _store: DataStore;

  /** 用于创建 ImageData 的 canvas 引用 (小程序兼容) */
  private _canvasRef: any = null;

  /** CHR 原始数据 [bankId] → Uint8Array */
  private _chrBanks: (Uint8Array | null)[] = [];

  /** 调色板表 (每帧从 DataStore 同步) */
  private _paletteTable: PaletteTable = {
    bgPalettes: [{ colors: [{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 }] },{ colors: [{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 }] },{ colors: [{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 }] },{ colors: [{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 }] }] as any,
    sprPalettes: [{ colors: [{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 }] },{ colors: [{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 }] },{ colors: [{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 }] },{ colors: [{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 },{ r:0,g:0,b:0,a:255 }] }] as any,
  };

  /** Tile 解码缓存: key="${bankId}:${tileId}:${palGrp}" → ImageData */
  private _tileCache: Map<string, ImageData> = new Map();

  /** 上次同步的调色板 hash (避免无谓重建 tile 缓存) */
  private _palHash = '';

  // ── 构造 ──

  constructor(store: DataStore) {
    this._store = store;
  }

  // ── CHR 管理 ──

  /** 注册 CHR Bank 数据 */
  registerChrBank(bankId: number, data: Uint8Array): void {
    this._chrBanks[bankId] = data;
  }

  /** 获取 CHR Bank 原始数据 */
  getChrBank(bankId: number): Uint8Array | null {
    return this._chrBanks[bankId] ?? null;
  }

  // ── Canvas 设置 ──

  /** 挂载主 Canvas Context (同时保存 canvas 引用用于创建 ImageData) */
  setupCanvas(ctx: CanvasRenderingContext2D): void {
    this._canvasRef = (ctx as any).canvas || ctx;
  }

  /**
   * 创建 ImageData，兼容微信小程序 Canvas 2D
   */
  private _createImageData(w: number, h: number): ImageData {
    // 优先用 canvas.createImageData (微信小程序兼容路径)
    if (this._canvasRef?.createImageData) {
      return this._canvasRef.createImageData(w, h) as ImageData;
    }
    // fallback: DOM 环境 new ImageData
    return new (ImageData as any)(w, h) as ImageData;
  }

  // ── 渲染主入口 ──

  /**
   * 绘制完整一帧。
   * @param ctx 目标 Canvas 2D 上下文
   */
  render(ctx: CanvasRenderingContext2D): void {
    // 同步调色板
    this._syncPalette();

    // 清屏
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, NES_WIDTH, NES_HEIGHT);

    // 绘制 BG (NameTable)
    this._drawNametable(ctx);

    // 绘制精灵
    this._drawSprites(ctx);
  }

  // ── 内部: 调色板同步 ──

  private _syncPalette(): void {
    const tbl = this._store.paletteTable;
    // 简单序列化判断是否变化
    const hash = JSON.stringify(tbl);
    if (hash === this._palHash) return;
    this._palHash = hash;

    // 深拷贝
    this._paletteTable = {
      bgPalettes: tbl.bgPalettes.map(e => ({ colors: e.colors.map(c => ({ ...c })) })) as typeof tbl.bgPalettes,
      sprPalettes: tbl.sprPalettes.map(e => ({ colors: e.colors.map(c => ({ ...c })) })) as typeof tbl.sprPalettes,
    };

    // 调色板变化 → 清空 tile 缓存 (颜色变了需要重新解码)
    this._tileCache.clear();
  }

  // ── 内部: BG 渲染 ──

  /** 绘制 NameTable 背景（viewport 采样） */
  private _drawNametable(ctx: CanvasRenderingContext2D): void {
    this._store.eachVisibleTile((screenX, screenY, entry) => {
      const img = this._getOrDecodeTile(entry);
      if (img) {
        ctx.putImageData(img, screenX, screenY);
      }
    });
  }

  // ── 内部: 精灵渲染 ──

  /** 绘制精灵 */
  private _drawSprites(ctx: CanvasRenderingContext2D): void {
    for (const spr of this._store.sprites) {
      if (!spr.active) continue;
      const img = this._getOrDecodeTile(spr);
      if (img) {
        ctx.putImageData(img, spr.x, spr.y);
      }
    }
  }

  // ── 内部: Tile 解码 ──

  /**
   * 按缓存查找 tile → 无则解码并缓存。
   * 缓存 key: `${bankId}:${tileId}:${palGrp}`
   */
  private _getOrDecodeTile(entry: NameTableEntry): ImageData | null {
    const key = `${entry.bank}:${entry.tile}:${entry.palette}`;
    let cached = this._tileCache.get(key);
    if (cached) return cached;

    const chr = this._chrBanks[entry.bank];
    if (!chr) return null;

    const off = entry.tile * 16;
    if (off + 16 > chr.length) return null;

    const img = this._createImageData(TILE_PX, TILE_PX) as ImageData;
    const pixels = img.data;

    // 取对应调色板组
    const palEntry: PaletteEntry | undefined =
      entry.palette < 4
        ? this._paletteTable.bgPalettes[entry.palette]
        : this._paletteTable.sprPalettes[entry.palette - 4];

    if (!palEntry) {
      this._tileCache.set(key, img);
      return img;
    }

    for (let row = 0; row < TILE_PX; row++) {
      const byte0 = chr[off + row];
      const byte1 = chr[off + row + 8];
      for (let col = 0; col < TILE_PX; col++) {
        const mask = 0x80 >> col;
        const bit0 = (byte0 & mask) ? 1 : 0;
        const bit1 = (byte1 & mask) ? 1 : 0;
        const colorIdx = (bit1 << 1) | bit0;

        const p = (row * TILE_PX + col) * 4;
        if (colorIdx === 0) {
          // 透明 — 显示为黑色 (key color)
          pixels[p] = 0;
          pixels[p + 1] = 0;
          pixels[p + 2] = 0;
          pixels[p + 3] = 255;
        } else {
          const pal = palEntry.colors[colorIdx] ?? palEntry.colors[0];
          pixels[p] = pal.r;
          pixels[p + 1] = pal.g;
          pixels[p + 2] = pal.b;
          pixels[p + 3] = pal.a || 255;
        }
      }
    }

    this._tileCache.set(key, img);
    return img;
  }

  // ── 调色板设置 (向后兼容) ──

  /** 设置调色板表 */
  setPaletteTable(table: PaletteTable): void {
    this._paletteTable = {
      bgPalettes: table.bgPalettes.map(e => ({ colors: [...e.colors] })) as typeof table.bgPalettes,
      sprPalettes: table.sprPalettes.map(e => ({ colors: [...e.colors] })) as typeof table.sprPalettes,
    };
    this._tileCache.clear();
  }

  /** @deprecated 使用 setPaletteTable 代替 */
  setPalettes(_bgPalettes: number[][], _sprPalettes: number[][]): void {
    // 保留向后兼容，实际已不再使用此路径
  }

  // ── 调试 ──

  /** 获取解码 tile 缓存大小 */
  get cacheSize(): number { return this._tileCache.size; }
}
