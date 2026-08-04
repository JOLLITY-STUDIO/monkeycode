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
 *   - CHR PNG 使用灰度格式: 像素值 0/85/170/255 → NES 颜色索引 0/1/2/3
 *   - 渲染时先通过 getImageData 将灰度像素映射为 NES 调色板颜色
 */
import { SCREEN_W, SCREEN_H } from '../core/Constants';
import { NES_PALETTE, TILE_SIZE } from '../core/types';
import type { DataCache } from '../cache/DataCache';
import type { OamCache } from '../cache/OamCache';
import type { BankManager } from '../cache/BankManager';
import type { IPlatform, ICanvasContext, ICanvasImageSource } from '../platform/IPlatform';

/** CHR 精灵表尺寸 */
const CHR_SHEET_TILES_PER_ROW = 16;
/** CHR sheet 总尺寸 (128×128 像素) */
const CHR_SHEET_SIZE = 128;
/** 灰度 → NES 索引映射除数 */
const GRAY_TO_NES_DIV = 85;

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

  /**
   * 调色板着色纹理缓存
   * key: `${bankIndex}_${palGroup}` → 调色板着色后的离屏 Canvas
   * bankIndex: 图片索引 (0-15)
   * palGroup: 0-3 (BG调色板), 4-7 (Sprite调色板)
   */
  private tintedCache: Map<string, ICanvas>;

  /** 调色板是否已脏，需要重新生成着色纹理 */
  private paletteDirty: boolean = true;

  /** Bank 管理器引用 */
  private bankManager: BankManager | null = null;

  /** 缩放倍数 — 始终为 1，前端 CSS 负责视觉缩放 */
  private scale: number = 1;

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

  /** 从外部控制是否跳过 Canvas 绘制 (诊断模式) */
  skipCanvasDraw: boolean = false;

  constructor(platform: IPlatform, ctx: ICanvasContext) {
    this.platform = platform;
    this.ctx = ctx;
    this.chrImages = new Map();
    this.tintedCache = new Map();

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
      this.paletteDirty = true;
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
      this.paletteDirty = true;  // 调色板修改 → 标记脏
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

  // ================================================================
  // 调色板着色纹理生成
  // ================================================================

  /**
   * 处理脏调色板: 为所有已加载 CHR bank × 所有调色板组重新生成着色纹理
   * 着色流程: 将灰度 CHR PNG (像素值 0/85/170/255 → NES索引 0/1/2/3)
   *           映射到 NES_PALETTE[palette[palGroup*4+nesIdx]]
   */
  private updateTintedTextures(): void {
    if (!this.paletteDirty) return;
    this.paletteDirty = false;

    if (!this.useChrImages || this.chrImages.size === 0) return;

    const tintStart = performance.now();
    let tinted = 0;

    for (const [bankIdx, chrImg] of this.chrImages) {
      // 为每个 bank，生成 8 个着色纹理 (4 BG + 4 SPR)
      for (let palGroup = 0; palGroup < 8; palGroup++) {
        const key = `${bankIdx}_${palGroup}`;
        const tintedCanvas = this.tintChrSheet(chrImg, palGroup);
        if (tintedCanvas) {
          this.tintedCache.set(key, tintedCanvas);
          tinted++;
        }
      }
    }

    const elapsed = (performance.now() - tintStart).toFixed(1);
    if (tinted > 0 && this.renderFrameCount <= 3) {
      console.log(`[Renderer] Tinted ${tinted} textures (${this.chrImages.size} banks × 8 palGroups) in ${elapsed}ms`);
    }
  }

  /**
   * 对整张 CHR 精灵表进行调色板着色
   * 返回离屏 Canvas（已着色），失败返回 null
   */
  private tintChrSheet(
    chrImg: ICanvasImageSource, palGroup: number
  ): ICanvas | null {
    try {
      // 创建离屏 canvas
      const offCanvas = this.platform.createOffscreenCanvas(CHR_SHEET_SIZE, CHR_SHEET_SIZE);
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return null;
      offCtx.imageSmoothingEnabled = false;

      // 将灰度 CHR 图像绘制到离屏 canvas
      const rawImg = (chrImg as any).raw || chrImg;
      (offCtx as any).drawImage(rawImg, 0, 0);

      // 获取像素数据
      const imgData = offCtx.getImageData(0, 0, CHR_SHEET_SIZE, CHR_SHEET_SIZE);
      const pixels = imgData.data;

      // 调色板基础索引
      const palBase = palGroup * 4;

      // 预取 4 个调色板颜色 (RGBA)
      const colors: number[] = [];
      for (let ci = 0; ci < 4; ci++) {
        const nesIdx = this.vram.palette[palBase + ci] & 0x3F;
        const rgb = NES_PALETTE[nesIdx] || 0;
        // NES_PALETTE 存储为 0xRRGGBB
        colors[ci * 4 + 0] = (rgb >> 16) & 0xFF; // R
        colors[ci * 4 + 1] = (rgb >> 8) & 0xFF;  // G
        colors[ci * 4 + 2] = rgb & 0xFF;         // B
        colors[ci * 4 + 3] = 255;                 // A
      }

      // NES 颜色索引 0: 背景色/透明 → Alpha = 0 表示透明
      colors[3] = 0; // palBase+0 → transparent

      // 逐像素重映射: 灰度值 → NES索引 → 调色板颜色
      for (let i = 0; i < pixels.length; i += 4) {
        // R == G == B 因为灰度图
        const gray = pixels[i];
        const nesIdx = Math.min(3, Math.round(gray / GRAY_TO_NES_DIV));
        const offset = nesIdx * 4;
        pixels[i + 0] = colors[offset + 0];
        pixels[i + 1] = colors[offset + 1];
        pixels[i + 2] = colors[offset + 2];
        pixels[i + 3] = colors[offset + 3];
      }

      // 写回着色像素
      offCtx.putImageData(imgData, 0, 0);

      return offCanvas;
    } catch (e: any) {
      if (this.renderFrameCount <= 1) {
        console.warn(`[Renderer] tintChrSheet failed for palGroup ${palGroup}: ${e?.message || e}`);
      }
      return null;
    }
  }

  /**
   * 获取着色后的 CHR 精灵表 (离屏 Canvas)
   * 如果当前没有着色纹理或调色板已脏，回退到原始灰度图像
   */
  private getTintedSheet(bankReg: number, palGroup: number): ICanvasImageSource | null {
    const { imageIndex } = this.getChrSource(bankReg);
    const key = `${imageIndex}_${palGroup}`;
    const tinted = this.tintedCache.get(key);
    if (tinted) return tinted as any as ICanvasImageSource;
    // 回退到原始灰度图像
    return this.chrImages.get(imageIndex) ?? this.chrImages.get(0) ?? null;
  }

  // ================================================================
  // 诊断接口
  // ================================================================

  /** 获取原始 VRAM 名称表 (960 bytes) */
  getNametable(ntIndex: number): Uint8Array {
    return this.vram.nametables[ntIndex & 0x03];
  }

  /** 获取原始 VRAM 属性表 (64 bytes) */
  getAttributes(ntIndex: number): Uint8Array {
    return this.vram.attributes[ntIndex & 0x03];
  }

  /** 获取完整 32 字节调色板 */
  getPalette(): number[] {
    return [...this.vram.palette];
  }

  /** 获取当前渲染的 CHR bank 配置信息 */
  getChrBankInfo(): { chrBank0: number; chrBank1: number; useChrImages: boolean } {
    return {
      chrBank0: this.bankManager?.chrBank0 ?? 0,
      chrBank1: this.bankManager?.chrBank1 ?? 0,
      useChrImages: this.useChrImages,
    };
  }

  // ================================================================
  // 帧渲染
  // ================================================================

  /** 渲染一帧 — 直接画到主 canvas，一次完成 */
  render(dataCache: DataCache, oamCache: OamCache): void {
    this.renderFrameCount++;
    const ctx = this.ctx;

    // 诊断模式: 跳过 canvas 绘制
    if (this.skipCanvasDraw) return;

    // 调色板着色纹理更新（仅在调色板变化时执行）
    this.updateTintedTextures();

    // 前3帧输出诊断日志
    if (this.renderFrameCount <= 3) {
      console.log(`[Renderer] render() frame #${this.renderFrameCount} called`, {
        canvasPixels: `${SCREEN_W * this.scale}x${SCREEN_H * this.scale}`,
        hasCtx: !!ctx,
        hasFillRect: typeof ctx.fillRect === 'function',
        palette0: this.vram.palette[0].toString(16),
        hasDebugText: !!this.debugText,
        useChrImages: this.useChrImages,
        tintedCached: this.tintedCache.size,
      });
    }

    // 清空
    const bgColorIdx = this.vram.palette[0] & 0x3F;
    const bgColor = NES_PALETTE[bgColorIdx];
    const fillColor = `#${bgColor.toString(16).padStart(6, '0')}`;

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
    }

    // 每60帧输出一次心跳
    if (this.renderFrameCount % 60 === 0) {
      console.log(`[Renderer] Frame ${this.renderFrameCount} rendered successfully (paletteDirty=${this.paletteDirty})`);
    }
  }

  // ================================================================
  // 背景 / 精灵渲染
  // ================================================================

  private renderBackground(ctx: ICanvasContext, ppuCtrl: number, scrollX: number, scrollY: number): void {
    const baseNT = ppuCtrl & 0x03;
    const bgPatternBase = (ppuCtrl & 0x10) ? 0x1000 : 0x0000;

    const bgChrBank = (bgPatternBase === 0x0000)
      ? (this.bankManager?.chrBank0 ?? 0)
      : (this.bankManager?.chrBank1 ?? 0);

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
          bgChrBank, tileBase);
      }
    }
  }

  private renderSprites(ctx: ICanvasContext, oamCache: OamCache, ppuCtrl: number): void {
    const sprPatternBase = (ppuCtrl & 0x08) ? 0x1000 : 0x0000;
    const sprChrBank = (sprPatternBase === 0x0000)
      ? (this.bankManager?.chrBank0 ?? 0)
      : (this.bankManager?.chrBank1 ?? 0);

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
          spr.x, spr.y - 1, flipH, flipV, sprChrBank, tileBase);
      }
    }
  }

  // ================================================================
  // Tile / Sprite 绘制
  // ================================================================

  /**
   * 绘制单个 tile
   * 使用着色后的 CHR 纹理（灰度像素 → 调色板颜色映射）
   */
  private drawTile(
    ctx: ICanvasContext, tileIndex: number, palGroup: number,
    x: number, y: number, chrBank: number, tileBase: number
  ): void {
    const s = this.scale;
    const ts = TILE_SIZE * s;
    const maxX = SCREEN_W * s;
    const maxY = SCREEN_H * s;

    if (x * s < -ts || x * s > maxX || y * s < -ts || y * s > maxY) return;

    if (this.useChrImages) {
      // 使用着色纹理
      const tinted = this.getTintedSheet(chrBank, palGroup);
      const src = this.getTileSrcRect(tileBase + tileIndex);
      if (tinted) {
        const rawImg = (tinted as any).raw || tinted;
        (ctx as any).drawImage(rawImg,
          src.sx, src.sy, TILE_SIZE, TILE_SIZE,
          x * s, y * s, ts, ts);
      }
    } else {
      // 回退: 纯色块
      const colorIdx = this.vram.palette[palGroup * 4 + 1] & 0x3F;
      const color = NES_PALETTE[colorIdx] || 0x757575;
      ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      ctx.fillRect(x * s, y * s, ts, ts);
    }
  }

  /**
   * 绘制单个精灵 tile
   * 使用着色后的 CHR 纹理，支持水平/垂直翻转
   */
  private drawSprite(
    ctx: ICanvasContext, tileIndex: number, palGroup: number,
    x: number, y: number, flipH: boolean, flipV: boolean,
    chrBank: number, tileBase: number
  ): void {
    const s = this.scale;
    const ts = TILE_SIZE * s;
    const maxX = SCREEN_W * s;
    const maxY = SCREEN_H * s;

    if (x * s < -ts || x * s > maxX || y * s < -ts || y * s > maxY) return;

    if (this.useChrImages) {
      const tinted = this.getTintedSheet(chrBank, palGroup);
      const src = this.getTileSrcRect(tileBase + tileIndex);
      if (tinted) {
        const rawImg = (tinted as any).raw || tinted;
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
      }
    } else {
      const colorIdx = this.vram.palette[palGroup * 4 + 1] & 0x3F;
      const color = NES_PALETTE[colorIdx] || 0x757575;
      ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      ctx.fillRect(x * s, y * s, ts, ts);
    }
  }
}
