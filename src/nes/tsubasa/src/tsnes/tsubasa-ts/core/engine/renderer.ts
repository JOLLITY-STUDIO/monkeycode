/**
 * ============================================================================
 * renderer — Canvas 渲染器
 *
 * 帧级 blit:
 *   直接从 ppu.vram 读 nametable → MMC3 解 CHR bank → drawImage 到 canvas
 *
 * CHR sheet 格式: 256×128 PNG (32-wide × 16-tall), 每 tile 8×8
 * ============================================================================
 */

import { mapChrAddr } from './mapper-mmc3.ts';

// ═══════════════ 常量 ═══════════════

export const SCREEN_W = 256;
export const SCREEN_H = 240;
export const TILE = 8;
export const NT_COLS = 32;
export const VISIBLE_COLS = 33;
export const VISIBLE_ROWS = 30;
export const SHEET_COLS = 32;
/** 每个 8KB bank = 2 × 4KB vrom, tile 索引偏移 */
export const VROM_TILES = 256;

// ═══════════════ VRAM 偏移常量 ═══════════════

/** 每个 nametable 1024 字节(960 tiles + 64 attrs) */
const NT_BYTES = 1024;
const ATTR_OFF = 960;

// ═══════════════ 类型 ═══════════════

/** 单个 tile 在 sheet 中的像素位置 */
interface TileSrc {
  img: HTMLImageElement;
  sx: number;
  sy: number;
}

// ═══════════════ Renderer 类 ═══════════════

export class Renderer {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  /** 16 张 CHR bank sheet (bank 0-15), 每张 256×128 */
  chrImgs: (HTMLImageElement | null)[] = new Array(16).fill(null);
  loaded = false;

  /** 载入的 bank 数 */
  loadedCount = 0;

  // ═══════════════ 初始化 ═══════════════

  /**
   * @param canvas     目标画布 (2D context)
   * @param chrBasePath CHR 路径模板, 例 "assets/chr/chr_bank_{n}.png"
   */
  async init(canvas: HTMLCanvasElement, chrBasePath: string): Promise<void> {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;

    const loads: Promise<void>[] = [];
    for (let i = 0; i < 16; i++) {
      const idx = String(i).padStart(2, '0');
      const url = chrBasePath.replace('{n}', idx);
      loads.push(
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => { this.chrImgs[i] = img; resolve(); };
          img.onerror = () => {
            console.warn('[renderer] load fail: %s', url);
            reject(new Error('chr load fail ' + idx));
          };
          img.src = url;
        })
      );
    }
    const results = await Promise.allSettled(loads);
    this.loadedCount = results.filter(r => r.status === 'fulfilled').length;
    console.log('[renderer] banks loaded: %d/16', this.loadedCount);
    this.loaded = this.loadedCount > 0;
  }

  // ═══════════════ 辅助 — VRAM 读取 ═══════════════

  /** 从 VRAM 读指定 nametable 的 tile 索引 */
  private readNT(vram: number[], ntIdx: number, tx: number, ty: number): number {
    const base = (ntIdx % 4) * NT_BYTES;
    return vram[base + ty * NT_COLS + tx] ?? 0;
  }

  /** 从 VRAM 读 attribute (调色板索引 0-3) */
  private readAttr(vram: number[], ntIdx: number, tx: number, ty: number): number {
    const base = (ntIdx % 4) * NT_BYTES;
    const ax = Math.floor((tx % NT_COLS) / 4);
    const ay = Math.floor((ty % 30) / 4);
    const attrIdx = base + ATTR_OFF + ay * 8 + ax;
    const attrByte = vram[attrIdx] ?? 0;

    const qx = Math.floor(tx / 2) % 2;
    const qy = Math.floor(ty / 2) % 2;
    const shift = (qy * 4 + qx * 2);
    return (attrByte >> shift) & 3;
  }

  // ═══════════════ MMC3 → tile 定位 ═══════════════

  /**
   * PPU 图案地址 → 实际 VROM bank + tile 偏移 → sheet 像素坐标
   */
  private resolveTile(mmc3: any, ppuAddr: number): TileSrc | null {
    if (ppuAddr >= 0x2000) return null; // 非图案表地址

    const m = mapChrAddr(mmc3, ppuAddr) as { bankIndex: number; offset: number } | null;
    if (!m) {
      // fallback: 假定 bank 0 直映射
      const tileIdx = Math.floor(ppuAddr / 16);
      return this.bankTile(0, tileIdx);
    }

    const tileIdx = Math.floor(m.offset / 16);
    return this.bankTile(m.bankIndex, tileIdx);
  }

  /**
   * VROM bank 索引 + tile 内偏移 → sheet (sx, sy)
   * VROM bank 0-31, 每 2 个对应一张 8KB sheet
   */
  private bankTile(vromBank: number, tileInBank: number): TileSrc | null {
    const chr8k = Math.floor(vromBank / 2);
    const img = this.chrImgs[chr8k];
    if (!img) return null;

    const half = vromBank % 2; // 0=上半 4KB, 1=下半
    const global = half * VROM_TILES + tileInBank;
    return {
      img,
      sx: (global % SHEET_COLS) * TILE,
      sy: Math.floor(global / SHEET_COLS) * TILE,
    };
  }

  // ═══════════════ 帧渲染 ═══════════════

  /**
   * 渲染一整帧
   *
   * @param ppu   PPU 状态 — 需要 vram, scrollX/Y, ctrl, mask, oam, palette
   * @param mmc3  MMC3 状态 — CHR bank 映射
   */
  renderFrame(ppu: any, mmc3: any): void {
    if (!this.loaded) return;

    const ctx = this.ctx;
    const W = SCREEN_W;
    const H = SCREEN_H;
    const vram = ppu.vram;

    // 更新调色板
    if (ppu.palette) {
      this.ppuColors = ppu.palette.slice(0, 32);
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // --- 背景显示 ---
    if (ppu.mask?.bgShow) {
      this._renderBg(ctx, ppu, vram, mmc3);
    }

    // --- 精灵显示 ---
    if (ppu.mask?.sprShow && ppu.oam) {
      this._renderSprites(ctx, ppu, mmc3);
    }
  }

  // ═══════════════ BG 层 ═══════════════

  private _renderBg(
    ctx: CanvasRenderingContext2D,
    ppu: any,
    vram: number[],
    mmc3: any
  ): void {
    const scrollX = ppu.scrollX || 0;
    const scrollY = ppu.scrollY || 0;
    const fineX = ppu.fineX || 0;
    const ntBase = ppu.ctrl?.nametable ?? 0;
    const bgTblBase = ppu.ctrl?.bgTbl ?? 0; // 0=$0000, 4096=$1000

    // 像素起始偏移 (含 fine X)
    const offX = -(scrollX % 8) - fineX;
    const offY = -(scrollY % 8);

    // tile 偏移
    const tileBaseX = Math.floor(scrollX / 8);
    const tileBaseY = Math.floor(scrollY / 8);

    for (let ty = 0; ty <= VISIBLE_ROWS; ty++) {
      for (let tx = 0; tx < VISIBLE_COLS; tx++) {
        const globalX = tileBaseX + tx;
        const globalY = tileBaseY + ty;

        // 计算属于哪个 nametable (水平镜像: 0↔1)
        const ntIdx = (globalX < NT_COLS)
          ? (ntBase & 0xFFFE)       // 同名表 (0 或 2)
          : ((ntBase & 0xFFFE) ^ 1); // 相邻表 (1 或 3)
        const localX = globalX & (NT_COLS - 1);
        const localY = (globalY % 30 + 30) % 30;

        // 读 tile 索引
        const tileIdx = this.readNT(vram, ntIdx, localX, localY);
        if (tileIdx === 0) continue;

        // PPU 图案地址
        const ppuAddr = bgTblBase + tileIdx * 16;

        const src = this.resolveTile(mmc3, ppuAddr);
        if (!src) continue;

        const dx = offX + tx * TILE;
        const dy = offY + ty * TILE;

        // 裁剪
        if (dx + TILE <= -TILE || dx >= SCREEN_W + TILE) continue;
        if (dy + TILE <= -TILE || dy >= SCREEN_H + TILE) continue;

        ctx.drawImage(src.img, src.sx, src.sy, TILE, TILE, Math.round(dx), Math.round(dy), TILE, TILE);
      }
    }
  }

  // ═══════════════ 精灵层 ═══════════════

  private _renderSprites(ctx: CanvasRenderingContext2D, ppu: any, mmc3: any): void {
    const oam = ppu.oam;
    const sprSize = ppu.ctrl?.sprSize || 8;
    const sprTbl = ppu.ctrl?.sprTbl || 0; // 0=$0000, 4096=$1000

    const W = SCREEN_W;

    // 精灵绘制: 后进先出 (OAM index 0 在上层)
    for (let i = 0; i < 64; i++) {
      const base = i * 4;
      let sprY = oam[base];
      const tileIdx = oam[base + 1];
      const attr = oam[base + 2];
      let sprX = oam[base + 3];

      // 超出屏幕边界 → 跳过
      if (sprY >= 0xEF || tileIdx === 0) continue;

      // sprite 坐标偏移 (-1)
      sprY = sprY + 1;

      const ppuAddr = (sprSize === 16)
        ? (tileIdx & 1) * 4096 + (tileIdx & 0xFE) * 16
        : sprTbl + tileIdx * 16;

      const src = this.resolveTile(mmc3, ppuAddr);
      if (!src) continue;

      const flipH = (attr & 0x40) !== 0;
      const flipV = (attr & 0x80) !== 0;

      // 水平翻转补偿 (精灵 X 左 overflow → 右端)
      if (sprX >= W - TILE) sprX -= 256;

      if (flipH || flipV) {
        ctx.save();
        ctx.translate(
          sprX + (flipH ? TILE : 0),
          sprY + (flipV ? TILE : 0)
        );
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        ctx.drawImage(src.img, src.sx, src.sy, TILE, TILE, 0, 0, TILE, TILE);
        ctx.restore();
      } else {
        ctx.drawImage(src.img, src.sx, src.sy, TILE, TILE, sprX, sprY, TILE, TILE);
      }
    }
  }

  // ═══════════════ 公开实用方法 ═══════════════

  /**
   * 直接画一个 tile (供外部使用, 例如 UI 调试)
   */
  drawTile(vromBank: number, tileInBank: number, dx: number, dy: number): void {
    const src = this.bankTile(vromBank, tileInBank);
    if (!src) return;
    this.ctx.drawImage(src.img, src.sx, src.sy, TILE, TILE, dx, dy, TILE, TILE);
  }

  /** PPU 调色板缓存 (从 ppu.palette 更新) */
  ppuColors: number[] = new Array(32).fill(0);
}
