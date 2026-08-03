/**
 * 渲染器 - 平台无关的 Canvas 2D 渲染
 *
 * 通过 IPlatform 接口适配 web / 微信小程序。
 * 负责将 PPU 状态渲染到 Canvas。
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
import type { IPlatform, ICanvas, ICanvasContext, ICanvasImageSource } from '../platform/IPlatform';

/** CHR 精灵表尺寸 */
const CHR_SHEET_WIDTH = 128;
const CHR_SHEET_TILES_PER_ROW = 16;

/** VRAM 模拟 */
interface VramState {
  nametables: Uint8Array[];
  attributes: Uint8Array[];
  palette: number[];
}

export class Renderer {
  private platform: IPlatform;

  /** 主 canvas 上下文（平台提供） */
  private ctx: ICanvasContext;

  /** 离屏渲染 canvas */
  private offscreen: ICanvas;
  private offCtx: ICanvasContext;

  /** VRAM 状态 */
  private vram: VramState;

  /** CHR 图案表缓存 (bankIndex → Image 对象) */
  private chrImages: Map<number, ICanvasImageSource>;

  /** Bank 管理器引用 */
  private bankManager: BankManager | null = null;

  /** 缩放 */
  private scale: number = 2;

  /** 是否正在使用 CHR 图片渲染 (false = 色块占位模式) */
  private useChrImages: boolean = false;

  constructor(platform: IPlatform, ctx: ICanvasContext) {
    this.platform = platform;
    this.ctx = ctx;

    // 创建离屏 canvas
    this.offscreen = platform.createOffscreenCanvas(SCREEN_W, SCREEN_H);
    const offCtx = this.offscreen.getContext('2d');
    if (!offCtx) throw new Error('Cannot get 2d context for offscreen canvas');
    this.offCtx = offCtx;

    this.chrImages = new Map();

    this.vram = {
      nametables: [new Uint8Array(960), new Uint8Array(960), new Uint8Array(960), new Uint8Array(960)],
      attributes: [new Uint8Array(64), new Uint8Array(64), new Uint8Array(64), new Uint8Array(64)],
      palette: new Array(32).fill(0),
    };

    this.initDefaultPalette();

    // 设置主 canvas 尺寸（仅当 canvas 尺寸未预设时）
    try {
      if (!ctx.canvas.width || ctx.canvas.width < SCREEN_W) {
        ctx.canvas.width = SCREEN_W * this.scale;
      }
      if (!ctx.canvas.height || ctx.canvas.height < SCREEN_H) {
        ctx.canvas.height = SCREEN_H * this.scale;
      }
    } catch (_e) {
      // 某些平台（如微信小程序）的 ctx.canvas 可能只读，忽略
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
        // 记录第一个错误用于调试
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
      imageIndex: bankReg >> 1,           // floor(bankReg / 2)
      tileBase: (bankReg & 1) * 128,       // 0 或 128
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

  /** 获取当前有效的 CHR 图片 (最差情况回退到bank 0) */
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

  /** 渲染一帧 */
  render(dataCache: DataCache, oamCache: OamCache): void {
    const offCtx = this.offCtx;

    // 清空
    const bgColorIdx = this.vram.palette[0] & 0x3F;
    const bgColor = NES_PALETTE[bgColorIdx];
    offCtx.fillStyle = `#${bgColor.toString(16).padStart(6, '0')}`;
    offCtx.fillRect(0, 0, SCREEN_W, SCREEN_H);

    // 渲染背景
    const ppuCtrl = dataCache.ppuCtrl;
    const scrollX = dataCache.scrollX;
    const scrollY = dataCache.scrollY;
    this.renderBackground(offCtx, ppuCtrl, scrollX, scrollY);

    // 渲染精灵
    const ppuMask = dataCache.ppuMask;
    if (ppuMask & 0x10) {
      this.renderSprites(offCtx, oamCache, ppuCtrl);
    }

    // 缩放到主 canvas
    this.ctx.imageSmoothingEnabled = false;
    const offRaw = (this.offscreen as any).raw || this.offscreen;
    (this.ctx as any).drawImage(offRaw,
      0, 0, SCREEN_W, SCREEN_H,
      0, 0, SCREEN_W * this.scale, SCREEN_H * this.scale);
  }

  private renderBackground(ctx: ICanvasContext, ppuCtrl: number, scrollX: number, scrollY: number): void {
    const baseNT = ppuCtrl & 0x03;
    const bgPatternBase = (ppuCtrl & 0x10) ? 0x1000 : 0x0000;

    // 选择 CHR bank: $0000 → chrBank0, $1000 → chrBank1
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
    // 精灵使用 PPU_CTRL bit 3: 0=$0000, 1=$1000
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
    ctx: ICanvasContext, tileIndex: number, paletteIdx: number,
    x: number, y: number, chrImg: ICanvasImageSource | null, tileBase: number
  ): void {
    // 超出屏幕范围裁剪优化
    if (x < -TILE_SIZE || x > SCREEN_W || y < -TILE_SIZE || y > SCREEN_H) return;

    if (chrImg && this.useChrImages) {
      const src = this.getTileSrcRect(tileBase + tileIndex);
      // 使用 any 传递原始图片对象（兼容 web Image 和 小程序 Image）
      (ctx as any).drawImage((chrImg as any).raw || chrImg,
        src.sx, src.sy, TILE_SIZE, TILE_SIZE, x, y, TILE_SIZE, TILE_SIZE);
    } else {
      // 回退: 色块占位显示
      const colorIdx = this.vram.palette[paletteIdx * 4 + 1] & 0x3F;
      const color = NES_PALETTE[colorIdx] || 0x7C7C7C;
      ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
  }

  private drawSprite(
    ctx: ICanvasContext, tileIndex: number, paletteIdx: number,
    x: number, y: number, flipH: boolean, flipV: boolean,
    chrImg: ICanvasImageSource | null, tileBase: number
  ): void {
    if (x < -TILE_SIZE || x > SCREEN_W || y < -TILE_SIZE || y > SCREEN_H) return;

    if (chrImg && this.useChrImages) {
      const src = this.getTileSrcRect(tileBase + tileIndex);
      const rawImg = (chrImg as any).raw || chrImg;

      if (flipH || flipV) {
        ctx.save();
        const cx = x + TILE_SIZE / 2;
        const cy = y + TILE_SIZE / 2;
        ctx.translate(cx, cy);
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        (ctx as any).drawImage(rawImg, src.sx, src.sy, TILE_SIZE, TILE_SIZE,
          -TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
        ctx.restore();
      } else {
        (ctx as any).drawImage(rawImg, src.sx, src.sy, TILE_SIZE, TILE_SIZE,
          x, y, TILE_SIZE, TILE_SIZE);
      }
    } else {
      const colorIdx = this.vram.palette[paletteIdx * 4 + 1] & 0x3F;
      const color = NES_PALETTE[colorIdx] || 0x7C7C7C;
      ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
  }
}
