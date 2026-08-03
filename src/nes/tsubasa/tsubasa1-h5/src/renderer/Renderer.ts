/**
 * 渲染器 - 平台无关的 Canvas 2D 渲染
 *
 * 直接渲染到主 Canvas，无离屏中间层。
 * 通过 IPlatform 接口适配微信小程序。
 *
 * CHR 渲染说明:
 *   - 每个 CHR Bank PNG 为 128×128 像素, 包含 256 个 tile (16×16 网格)
 *   - MMC1 4KB 模式: chrBank0 选 $0000-$0FFF, chrBank1 选 $1000-$1FFF
 *   - bank 寄存器值 n → 图片索引 = floor(n/2), tile偏移 = (n%2)*128
 */
import { SCREEN_W, SCREEN_H } from '../core/Constants';
import { NES_PALETTE, TILE_SIZE } from '../core/types';
import type { DataCache } from '../cache/DataCache';
import type { OamCache } from '../cache/OamCache';
import type { BankManager } from '../cache/BankManager';
import type { IPlatform, ICanvasContext, ICanvasImageSource } from '../platform/IPlatform';

/** CHR 精灵表尺寸 */
const CHR_SHEET_TILES_PER_ROW = 16;

/** VRAM 模拟 */
interface VramState {
  nametables: Uint8Array[];
  attributes: Uint8Array[];
  palette: number[];
}

export class Renderer {
  /** 平台适配器（用于加载图片等平台调用） */
  private platform: IPlatform;

  /** 主 canvas 上下文（平台提供，直接渲染目标） */
  private ctx: ICanvasContext;

  /** VRAM 状态 */
  private vram: VramState;

  /** CHR 图案表缓存 (bankIndex → Image 对象) */
  private chrImages: Map<number, ICanvasImageSource>;

  /** Bank 管理器引用 */
  private bankManager: BankManager | null = null;

  /** 缩放倍数 (tile 8px → 屏幕 8*scale px) */
  private scale: number = 2;

  /** 是否正在使用 CHR 图片渲染 (false = 色块占位模式) */
  private useChrImages: boolean = false;

  /** 渲染帧计数 (诊断用) */
  private renderFrameCount: number = 0;

  /** Debug 文字叠加 (非null时在画面顶层绘制) */
  debugText: string | null = null;
  /** Debug 文字颜色 */
  debugTextColor: string = '#ffffff';
  /** Debug 文字大小 (px, 未缩放) */
  debugTextSize: number = 16;

  constructor(platform: IPlatform, ctx: ICanvasContext) {
    this.platform = platform;
    this.ctx = ctx;
    this.chrImages = new Map();

    this.vram = {
      nametables: [new Uint8Array(960), new Uint8Array(960), new Uint8Array(960), new Uint8Array(960)],
      attributes: [new Uint8Array(64), new Uint8Array(64), new Uint8Array(64), new Uint8Array(64)],
      palette: new Array(32).fill(0),
    };

    this.initDefaultPalette();

    // 设置主 canvas 尺寸（web 环境通过 ctx.canvas；小程序由外部预先设置好）
    const canvas = ctx.canvas;
    if (canvas) {
      if (!canvas.width || canvas.width < SCREEN_W) {
        canvas.width = SCREEN_W * this.scale;
      }
      if (!canvas.height || canvas.height < SCREEN_H) {
        canvas.height = SCREEN_H * this.scale;
      }
    }
    ctx.imageSmoothingEnabled = false;
  }

  private initDefaultPalette(): void {
    for (let i = 0; i < 16; i++) this.vram.palette[i] = i;
    for (let i = 16; i < 32; i++) this.vram.palette[i] = i - 16;
    this.vram.palette[0x00] = 0x0F;
  }

  setBankManager(bm: BankManager): void {
    this.bankManager = bm;
  }

  /** 加载单个 CHR bank 图片 */
  async loadChrBank(bankIndex: number, imagePath: string): Promise<void> {
    const img = await this.platform.loadImage(imagePath);
    this.chrImages.set(bankIndex, img);
  }

  /** 批量加载所有 16 个 CHR bank */
  async loadAllChrBanks(basePath: string = '/sprites/'): Promise<void> {
    const banks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF];
    let loaded = 0;
    let firstError: string | null = null;

    for (const bank of banks) {
      const path = `${basePath}chr_bank_${bank.toString(16).padStart(2, '0').toUpperCase()}.png`;
      try {
        await this.loadChrBank(bank, path);
        loaded++;
      } catch (err: any) {
        if (!firstError) {
          firstError = `Bank ${bank.toString(16).padStart(2, '0')}: ${err?.message || err}`;
        }
      }
    }

    this.useChrImages = loaded > 0;
    if (loaded > 0) {
      console.log(`[Renderer] Loaded ${loaded}/16 CHR bank images from ${basePath}`);
    } else {
      console.warn(`[Renderer] Failed to load any CHR bank images. First error: ${firstError}`);
      console.warn(`[Renderer] Using fallback color block rendering`);
    }
  }

  /**
   * 从 MMC1 CHR bank 寄存器值获取图片索引和tile基址
   * 寄存器值 n: 4KB half-page → 图片索引=floor(n/2), tile偏移=(n%2)*128
   */
  private getChrSource(bankReg: number): { imageIndex: number; tileBase: number } {
    return {
      imageIndex: bankReg >> 1,
      tileBase: (bankReg & 1) * 128,
    };
  }

  /** 获取 tile 在 CHR 精灵表中的源矩形 */
  private getTileSrcRect(tileIndex: number): { sx: number; sy: number } {
    const t = tileIndex % 256;
    return {
      sx: (t % CHR_SHEET_TILES_PER_ROW) * TILE_SIZE,
      sy: Math.floor(t / CHR_SHEET_TILES_PER_ROW) * TILE_SIZE,
    };
  }

  /** 获取当前有效的 CHR 图片 (回退到bank 0) */
  private getChrImage(bankReg: number): ICanvasImageSource | null {
    const { imageIndex } = this.getChrSource(bankReg);
    return this.chrImages.get(imageIndex) ?? this.chrImages.get(0) ?? null;
  }

  writeVram(addr: number, value: number): void {
    addr &= 0x3FFF;
    if (addr >= 0x3F00) {
      const palIndex = (addr - 0x3F00) & 0x1F;
      const realIndex = (palIndex === 0x10 || palIndex === 0x14 || palIndex === 0x18 || palIndex === 0x1C)
        ? palIndex - 0x10 : palIndex;
      this.vram.palette[realIndex] = value & 0x3F;
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

  /** 渲染一帧 — 直接画到主 canvas，一次完成 */
  render(dataCache: DataCache, oamCache: OamCache): void {
    this.renderFrameCount++;
    const ctx = this.ctx;

    // 前3帧输出诊断日志
    if (this.renderFrameCount <= 3) {
      console.log(`[Renderer] render() frame #${this.renderFrameCount} called`, {
        canvasPixels: `${SCREEN_W * this.scale}x${SCREEN_H * this.scale}`,
        hasCtx: !!ctx,
        hasFillRect: typeof ctx.fillRect === 'function',
        palette0: this.vram.palette[0].toString(16),
        hasDebugText: !!this.debugText,
        useChrImages: this.useChrImages,
      });
    }

    // 清空
    const bgColorIdx = this.vram.palette[0] & 0x3F;
    const bgColor = NES_PALETTE[bgColorIdx];
    const fillColor = `#${bgColor.toString(16).padStart(6, '0')}`;

    if (this.renderFrameCount <= 3) {
      console.log(`[Renderer] bgColorIdx=0x${bgColorIdx.toString(16)} bgColor=0x${bgColor.toString(16)} fillColor=${fillColor}`);
    }

    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, SCREEN_W * this.scale, SCREEN_H * this.scale);

    // 渲染背景
    const ppuCtrl = dataCache.ppuCtrl;
    this.renderBackground(ctx, ppuCtrl, dataCache.scrollX, dataCache.scrollY);

    // 渲染精灵
    if (dataCache.ppuMask & 0x10) {
      this.renderSprites(ctx, oamCache, ppuCtrl);
    }

    // Debug 文字叠加 (顶层)
    if (this.debugText) {
      const fontSize = this.debugTextSize * this.scale;
      const x = 8 * this.scale;
      const y = 8 * this.scale;

      // 半透明背景块，确保文字在任何背景下都可见
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      const textWidth = this.debugText.length * (fontSize * 0.65);
      ctx.fillRect(x, y, textWidth + 16 * this.scale, fontSize + 10 * this.scale);

      // 文字 (使用 sans-serif 确保小程序兼容)
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = this.debugTextColor;
      ctx.fillText(this.debugText, x + 4 * this.scale, y + fontSize);

      if (this.renderFrameCount <= 3) {
        console.log(`[Renderer] debugText drawn: "${this.debugText}" at (${x},${y}) color=${this.debugTextColor} size=${fontSize}`);
      }
    }

    // 每60帧输出一次心跳
    if (this.renderFrameCount % 60 === 0) {
      console.log(`[Renderer] Frame ${this.renderFrameCount} rendered successfully`);
    }
  }

  private renderBackground(ctx: ICanvasContext, ppuCtrl: number, scrollX: number, scrollY: number): void {
    const baseNT = ppuCtrl & 0x03;
    const bgPatternBase = (ppuCtrl & 0x10) ? 0x1000 : 0x0000;

    const bgChrBank = (bgPatternBase === 0x0000)
      ? (this.bankManager?.chrBank0 ?? 0)
      : (this.bankManager?.chrBank1 ?? 0);

    const chrImg = this.getChrImage(bgChrBank);
    const { tileBase } = this.getChrSource(bgChrBank);

    const startTileX = Math.floor(scrollX / TILE_SIZE);
    const startTileY = Math.floor(scrollY / TILE_SIZE);
    const fineX = scrollX % TILE_SIZE;
    const fineY = scrollY % TILE_SIZE;

    const tilesWide = Math.ceil(SCREEN_W / TILE_SIZE) + 1;
    const tilesHigh = Math.ceil(SCREEN_H / TILE_SIZE) + 1;

    for (let ty = 0; ty < tilesHigh; ty++) {
      for (let tx = 0; tx < tilesWide; tx++) {
        const ntX = (startTileX + tx) % 32;
        const ntY = (startTileY + ty) % 30;
        const ntIndex = ((startTileX + tx) >= 32 || (startTileY + ty) >= 30)
          ? ((baseNT ^ 0x01) & 0x03) : baseNT;

        const tileIdx = this.vram.nametables[ntIndex][ntY * 32 + ntX];
        const attrByte = this.vram.attributes[ntIndex][Math.floor(ntY / 4) * 8 + Math.floor(ntX / 4)];
        const attrShift = ((ntX % 4) < 2 ? 0 : 2) + ((ntY % 4) < 2 ? 0 : 4);
        const paletteIdx = (attrByte >> attrShift) & 0x03;

        this.drawTile(ctx, tileIdx, paletteIdx,
          tx * TILE_SIZE - fineX, ty * TILE_SIZE - fineY,
          chrImg, tileBase);
      }
    }
  }

  private renderSprites(ctx: ICanvasContext, oamCache: OamCache, ppuCtrl: number): void {
    const sprPatternBase = (ppuCtrl & 0x08) ? 0x1000 : 0x0000;
    const sprChrBank = (sprPatternBase === 0x0000)
      ? (this.bankManager?.chrBank0 ?? 0)
      : (this.bankManager?.chrBank1 ?? 0);

    const chrImg = this.getChrImage(sprChrBank);
    const { tileBase } = this.getChrSource(sprChrBank);

    const sprites = oamCache.getVisibleSprites();
    for (let i = sprites.length - 1; i >= 0; i--) {
      const spr = sprites[i];
      const paletteIdx = (spr.attributes & 0x03) + 4;
      const flipH = (spr.attributes & 0x40) !== 0;
      const flipV = (spr.attributes & 0x80) !== 0;
      const behindBg = (spr.attributes & 0x20) !== 0;

      if (!behindBg) {
        this.drawSprite(ctx, spr.tileIndex, paletteIdx,
          spr.x, spr.y - 1, flipH, flipV, chrImg, tileBase);
      }
    }
  }

  private drawTile(
    ctx: ICanvasContext, tileIndex: number, _paletteIdx: number,
    x: number, y: number, chrImg: ICanvasImageSource | null, tileBase: number
  ): void {
    const s = this.scale;
    const ts = TILE_SIZE * s;
    const maxX = SCREEN_W * s;
    const maxY = SCREEN_H * s;

    if (x * s < -ts || x * s > maxX || y * s < -ts || y * s > maxY) return;

    if (chrImg && this.useChrImages) {
      const src = this.getTileSrcRect(tileBase + tileIndex);
      const rawImg = (chrImg as any).raw || chrImg;
      (ctx as any).drawImage(rawImg,
        src.sx, src.sy, TILE_SIZE, TILE_SIZE,
        x * s, y * s, ts, ts);
    } else {
      const colorIdx = this.vram.palette[(_paletteIdx) * 4 + 1] & 0x3F;
      const color = NES_PALETTE[colorIdx] || 0x7C7C7C;
      ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      ctx.fillRect(x * s, y * s, ts, ts);
    }
  }

  private drawSprite(
    ctx: ICanvasContext, tileIndex: number, _paletteIdx: number,
    x: number, y: number, flipH: boolean, flipV: boolean,
    chrImg: ICanvasImageSource | null, tileBase: number
  ): void {
    const s = this.scale;
    const ts = TILE_SIZE * s;
    const maxX = SCREEN_W * s;
    const maxY = SCREEN_H * s;

    if (x * s < -ts || x * s > maxX || y * s < -ts || y * s > maxY) return;

    if (chrImg && this.useChrImages) {
      const src = this.getTileSrcRect(tileBase + tileIndex);
      const rawImg = (chrImg as any).raw || chrImg;

      if (flipH || flipV) {
        ctx.save();
        const cx = x * s + ts / 2;
        const cy = y * s + ts / 2;
        ctx.translate(cx, cy);
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        (ctx as any).drawImage(rawImg,
          src.sx, src.sy, TILE_SIZE, TILE_SIZE,
          -ts / 2, -ts / 2, ts, ts);
        ctx.restore();
      } else {
        (ctx as any).drawImage(rawImg,
          src.sx, src.sy, TILE_SIZE, TILE_SIZE,
          x * s, y * s, ts, ts);
      }
    } else {
      const colorIdx = this.vram.palette[(_paletteIdx) * 4 + 1] & 0x3F;
      const color = NES_PALETTE[colorIdx] || 0x7C7C7C;
      ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      ctx.fillRect(x * s, y * s, ts, ts);
    }
  }
}
