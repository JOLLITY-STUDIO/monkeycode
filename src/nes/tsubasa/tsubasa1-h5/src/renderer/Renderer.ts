/**
 * 渲染器 - Canvas 2D 渲染
 * 负责将 PPU 状态渲染到 Canvas
 *
 * 渲染顺序:
 *   1. 填充背景色
 *   2. 绘制背景层 (名称表 + 图案表)
 *   3. 绘制精灵层
 *   4. 应用滚动偏移
 */

import { SCREEN_W, SCREEN_H, TILE_SIZE } from '../core/Constants';
import { NES_PALETTE } from '../core/types';
import type { DataCache } from '../cache/DataCache';
import type { OamCache } from '../cache/OamCache';
import type { BankManager } from '../cache/BankManager';

/** VRAM 模拟 (名称表 + 属性表) */
interface VramState {
  nametables: Uint8Array[];   // 4个名称表，每个960字节
  attributes: Uint8Array[];   // 4个属性表，每个64字节
  palette: number[];          // 32字节调色板 (背景16 + 精灵16)
}

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private offscreen: OffscreenCanvas | HTMLCanvasElement;
  private offCtx: CanvasRenderingContext2D;

  /** VRAM 状态 */
  private vram: VramState;

  /** CHR 图案表缓存 (从PNG加载的ImageData) */
  private chrTiles: Map<number, ImageData>;

  /** 当前银行管理器引用 */
  private bankManager: BankManager | null = null;

  /** 缩放倍数 */
  private scale: number = 2;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;

    // 创建离屏canvas
    this.offscreen = typeof OffscreenCanvas !== 'undefined'
      ? new OffscreenCanvas(SCREEN_W, SCREEN_H)
      : (() => { const c = document.createElement('canvas'); c.width = SCREEN_W; c.height = SCREEN_H; return c; })();
    const offCtx = this.offscreen.getContext('2d');
    if (!offCtx) throw new Error('Cannot get 2d context');
    this.offCtx = offCtx;

    this.chrTiles = new Map();

    // 初始化VRAM
    this.vram = {
      nametables: [
        new Uint8Array(960),
        new Uint8Array(960),
        new Uint8Array(960),
        new Uint8Array(960),
      ],
      attributes: [
        new Uint8Array(64),
        new Uint8Array(64),
        new Uint8Array(64),
        new Uint8Array(64),
      ],
      palette: new Array(32).fill(0),
    };

    // 设置默认调色板
    this.initDefaultPalette();

    // 设置canvas缩放
    this.canvas.width = SCREEN_W * this.scale;
    this.canvas.height = SCREEN_H * this.scale;
    this.ctx.imageSmoothingEnabled = false;
  }

  /** 初始化默认NES调色板 */
  private initDefaultPalette(): void {
    // 背景调色板 (4组×4色)
    for (let i = 0; i < 16; i++) {
      this.vram.palette[i] = i; // 使用标准NES调色板索引
    }
    // 精灵调色板 (4组×4色)
    for (let i = 16; i < 32; i++) {
      this.vram.palette[i] = i - 16;
    }
    // $3F00, $3F10, $3F04, $3F08, $3F0C 是镜像
    this.vram.palette[0x00] = 0x0F; // 通用背景色
  }

  /** 设置Bank Manager引用 */
  setBankManager(bm: BankManager): void {
    this.bankManager = bm;
  }

  /** 加载CHR图案表PNG */
  async loadChrBank(bankIndex: number, imagePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const offCtx = this.offscreen.getContext('2d')!;
        // 先用离屏canvas解码
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 128;
        tempCanvas.height = 128;
        const tempCtx = tempCanvas.getContext('2d')!;
        tempCtx.drawImage(img, 0, 0);
        const imageData = tempCtx.getImageData(0, 0, 128, 128);
        this.chrTiles.set(bankIndex, imageData);
        resolve();
      };
      img.onerror = () => reject(new Error(`Failed to load CHR bank ${bankIndex}: ${imagePath}`));
      img.src = imagePath;
    });
  }

  /** 批量加载所有CHR bank */
  async loadAllChrBanks(basePath: string = '/sprites/'): Promise<void> {
    const banks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    for (const bank of banks) {
      const path = `${basePath}chr_bank_${bank.toString(16).padStart(2, '0').toUpperCase()}.png`;
      await this.loadChrBank(bank, path);
    }
  }

  /** 写入VRAM */
  writeVram(addr: number, value: number): void {
    addr &= 0x3FFF;

    if (addr >= 0x3F00) {
      // 调色板
      const palIndex = (addr - 0x3F00) & 0x1F;
      // 镜像处理
      const realIndex = (palIndex === 0x10 || palIndex === 0x14 || palIndex === 0x18 || palIndex === 0x1C)
        ? palIndex - 0x10 : palIndex;
      this.vram.palette[realIndex] = value & 0x3F;
    } else if (addr >= 0x2000) {
      // 名称表 & 属性表
      const ntIndex = (addr >> 10) & 0x03;
      const offset = addr & 0x03FF;

      if (offset < 0x3C0) {
        // 名称表
        this.vram.nametables[ntIndex][offset] = value;
      } else {
        // 属性表
        const attrOffset = offset - 0x3C0;
        this.vram.attributes[ntIndex][attrOffset] = value;
      }
    }
  }

  /** 渲染一帧 */
  render(dataCache: DataCache, oamCache: OamCache): void {
    const offCtx = this.offCtx;

    // 1. 清空
    const bgColorIdx = this.vram.palette[0] & 0x3F;
    const bgColor = NES_PALETTE[bgColorIdx];
    offCtx.fillStyle = `#${bgColor.toString(16).padStart(6, '0')}`;
    offCtx.fillRect(0, 0, SCREEN_W, SCREEN_H);

    // 2. 渲染背景
    const ppuCtrl = dataCache.ppuCtrl;
    const scrollX = dataCache.scrollX;
    const scrollY = dataCache.scrollY;
    this.renderBackground(offCtx, ppuCtrl, scrollX, scrollY);

    // 3. 渲染精灵
    const ppuMask = dataCache.ppuMask;
    if (ppuMask & 0x10) { // 显示精灵
      this.renderSprites(offCtx, oamCache);
    }

    // 4. 缩放到主canvas
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(this.offscreen, 0, 0, SCREEN_W * this.scale, SCREEN_H * this.scale);
  }

  /** 渲染背景层 */
  private renderBackground(ctx: CanvasRenderingContext2D, ppuCtrl: number, scrollX: number, scrollY: number): void {
    const baseNT = ppuCtrl & 0x03; // 基础名称表
    const bgPatternBase = (ppuCtrl & 0x10) ? 0x1000 : 0x0000; // 背景图案表基址

    // 简化渲染: 只绘制可见区域
    // 实际需要处理名称表切换和滚动
    const startTileX = Math.floor(scrollX / TILE_SIZE);
    const startTileY = Math.floor(scrollY / TILE_SIZE);
    const fineX = scrollX % TILE_SIZE;
    const fineY = scrollY % TILE_SIZE;

    // 需要绘制 33×30 个tile (覆盖256×240 + 滚动偏移)
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

        this.drawTile(ctx,
          tileIdx,
          paletteIdx,
          tx * TILE_SIZE - fineX,
          ty * TILE_SIZE - fineY,
          bgPatternBase
        );
      }
    }
  }

  /** 渲染精灵层 */
  private renderSprites(ctx: CanvasRenderingContext2D, oamCache: OamCache): void {
    const sprites = oamCache.getVisibleSprites();

    // NES精灵从高索引到低索引绘制 (0号精灵最优先)
    for (let i = sprites.length - 1; i >= 0; i--) {
      const spr = sprites[i];
      const paletteIdx = (spr.attributes & 0x03) + 4; // 精灵使用调色板4-7
      const flipH = (spr.attributes & 0x40) !== 0;
      const flipV = (spr.attributes & 0x80) !== 0;
      const behindBg = (spr.attributes & 0x20) !== 0;

      if (!behindBg) {
        this.drawSprite(ctx, spr.tileIndex, paletteIdx, spr.x, spr.y - 1, flipH, flipV);
      }
    }
  }

  /** 绘制单个背景tile */
  private drawTile(
    ctx: CanvasRenderingContext2D,
    tileIndex: number,
    paletteIdx: number,
    x: number, y: number,
    patternBase: number
  ): void {
    // TODO: 从CHR图案表读取实际像素
    // 当前用色块占位
    const colors = [0x0F, 0x00, 0x10, 0x20]; // 使用默认调色板颜色
    const color = NES_PALETTE[this.vram.palette[paletteIdx * 4 + 1] || colors[1]];
    ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  }

  /** 绘制单个精灵 */
  private drawSprite(
    ctx: CanvasRenderingContext2D,
    tileIndex: number,
    paletteIdx: number,
    x: number, y: number,
    flipH: boolean, flipV: boolean
  ): void {
    const color = NES_PALETTE[this.vram.palette[paletteIdx * 4 + 1] || 0x10];
    ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
    // TODO: 实际绘制CHR图案
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  }
}
