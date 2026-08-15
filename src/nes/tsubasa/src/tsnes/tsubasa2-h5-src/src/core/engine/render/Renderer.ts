/**
 * 渲染器 (View 层)
 *
 * 职责:
 *   1. 消费 DataStore → 绘制 Canvas
 *   2. 持有全量 CHR tile 解码缓存
 *   3. 渲染 BG (NameTable) + 精灵 (OAM)
 *
 * 不包含任何业务逻辑，纯渲染。
 *
 * ⚠ renderOpening(): 临时开场文字渲染。
 * 真实开场 (Scene 0x17 Tecmo Theater) 由 Bank01 NMI 写入 NT 数据，
 * 待 Bank01/T2 翻译完成写入真实 NT 后删除此方法。
 */
import { DataStore, type NameTableEntry } from '../../../data/DataStore';
import { NES_WIDTH, NES_HEIGHT, TILE_PX, CHR_BANK_SIZE } from '../../types';
import { type PaletteTable, type PaletteEntry } from '../../../model/types';
import type { OpeningDisplayState } from '../../../game/scene_opening.controller';

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
  private _getOrDecodeTile(entry: Pick<NameTableEntry, 'bank' | 'tile' | 'palette'>): ImageData | null {
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

  // ── 临时开场渲染 (View 层文字绘制) ──
  // TODO(T2): 真实开场 NT 数据翻译完成后移除，改用 render() 绘制真实 NT

  /**
   * 渲染开场动画 (Scene 0x17 Tecmo Theater 过渡方案)。
   * 消费 OpeningSceneController 的显示状态，绘制文字/色块。
   * 真实场景数据 (Bank07 NT 数据 + Bank01 NMI 渲染) 翻译完成后删除。
   */
  renderOpening(ctx: CanvasRenderingContext2D, ds: OpeningDisplayState): void {
    const W = NES_WIDTH;
    const H = NES_HEIGHT;

    // 背景 (按镜头的调色板索引)
    ctx.fillStyle = this._bgColorToCss(ds.bgColor);
    ctx.fillRect(0, 0, W, H);

    ctx.globalAlpha = Math.max(0, Math.min(1, ds.transitionAlpha));

    if (ds.isTitle) {
      this._renderTitleScreen(ctx, ds, W, H);
    } else if (ds.showLogo) {
      this._renderOpeningLogo(ctx, ds, W, H);
    } else if (ds.showPortrait) {
      this._renderOpeningPortrait(ctx, ds, W, H);
    } else if (ds.shot === 5) {
      // WORLD CUP
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(ds.text, W / 2, 115);
      ctx.textAlign = 'left';
    }

    ctx.globalAlpha = 1;

    // START 提示
    if (ds.textBlink && ds.shotFrame > 30) {
      ctx.fillStyle = '#664400';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('- PRESS START -', W / 2, H - 30);
      ctx.textAlign = 'left';
    }
  }

  /** NES 调色板索引 → CSS 颜色 (简化映射) */
  private _bgColorToCss(idx: number): string {
    switch (idx) {
    case 0x12: return '#102060'; // 深蓝
    case 0x06: return '#501010'; // 深红
    case 0x1A: return '#0a4010'; // 绿
    case 0x05: return '#505010'; // 深黄
    default:   return '#0a0a18'; // 黑
    }
  }

  /** TECMO logo 镜 */
  private _renderOpeningLogo(
    ctx: CanvasRenderingContext2D,
    ds: OpeningDisplayState,
    W: number, H: number,
  ): void {
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(ds.text, W / 2, 110);

    ctx.fillStyle = '#aaa';
    ctx.font = '10px monospace';
    ctx.fillText('CAPTAIN TSUBASA II', W / 2, 135);
    ctx.textAlign = 'left';
  }

  /** 人物肖像镜 (占位) */
  private _renderOpeningPortrait(
    ctx: CanvasRenderingContext2D,
    ds: OpeningDisplayState,
    W: number, H: number,
  ): void {
    const cx = W / 2;
    ctx.fillStyle = '#1a1a3a';
    ctx.fillRect(cx - 48, 60, 96, 96);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - 48, 60, 96, 96);

    ctx.fillStyle = '#ffe0a0';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(ds.text, cx, 190);

    ctx.fillStyle = '#888';
    ctx.font = '11px monospace';
    ctx.fillText(ds.subText, cx, 210);
    ctx.textAlign = 'left';
  }

  /** 标题画面 */
  private _renderTitleScreen(
    ctx: CanvasRenderingContext2D,
    ds: OpeningDisplayState,
    W: number, H: number,
  ): void {
    const cx = W / 2;

    // 优先显示脚本/控制层传入的标题文本, 无则使用默认标题
    const titleMain = ds.text && ds.text.length > 0 ? ds.text : 'CAPTAIN TSUBASA II';
    const titleSub = ds.subText && ds.subText.length > 0 ? ds.subText : 'SUPER STRIKER';

    ctx.fillStyle = '#ff6600';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(titleMain, cx, 80);

    ctx.fillStyle = '#888';
    ctx.font = '12px monospace';
    ctx.fillText(titleSub, cx, 100);

    const yBase = 145;
    const items = ds.titleItems;
    for (let i = 0; i < items.length; i++) {
      const y = yBase + i * 28;
      if (i === ds.titleCursor) {
        ctx.fillStyle = ds.textBlink ? '#ffff00' : '#aa8800';
        ctx.fillRect(cx - 80, y - 14, 160, 22);
        ctx.fillStyle = '#000';
      } else {
        ctx.fillStyle = '#888';
      }
      ctx.font = '14px monospace';
      ctx.fillText(items[i].label, cx, y);
    }

    ctx.fillStyle = '#444';
    ctx.font = '9px monospace';
    ctx.fillText('(c) 1990 TECMO', cx, H - 20);
    ctx.textAlign = 'left';
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
