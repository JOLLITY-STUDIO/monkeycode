export type RenderMode = 'tile' | 'fillText';

export interface FontTile {
  pixels: Uint8Array;
  width: number;
  height: number;
}

export interface FontConfig {
  tiles: FontTile[];
  charMap: Map<string, number>;
  defaultTile: number;
  tileWidth: number;
  tileHeight: number;
}

export class FontRenderer {
  private config: FontConfig;
  private renderMode: RenderMode;
  private imageCache: Map<number, HTMLImageElement | null> = new Map();

  constructor(config: FontConfig, mode: RenderMode = 'tile') {
    this.config = config;
    this.renderMode = mode;
  }

  setMode(mode: RenderMode): void {
    this.renderMode = mode;
  }

  getMode(): RenderMode {
    return this.renderMode;
  }

  private getTileIndex(char: string): number {
    return this.config.charMap.get(char) ?? this.config.defaultTile;
  }

  private getTile(idx: number): FontTile | null {
    return this.config.tiles[idx] ?? null;
  }

  private renderTile(
    ctx: CanvasRenderingContext2D,
    tile: FontTile,
    x: number,
    y: number,
    palette: ((idx: number) => [number, number, number]) | null,
  ): void {
    const img = this.getOrCreateImage(tile);
    if (!img) return;

    if (palette) {
      ctx.save();
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = tile.width;
      tempCanvas.height = tile.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(img, 0, 0);
        const imageData = tempCtx.getImageData(0, 0, tile.width, tile.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const pxIdx = data[i];
          const color = palette(pxIdx);
          data[i] = color[0];
          data[i + 1] = color[1];
          data[i + 2] = color[2];
          data[i + 3] = pxIdx === 0 ? 0 : 255;
        }
        tempCtx.putImageData(imageData, 0, 0);
        ctx.drawImage(tempCanvas, x, y);
      }
      ctx.restore();
    } else {
      ctx.drawImage(img, x, y);
    }
  }

  private getOrCreateImage(tile: FontTile): HTMLImageElement | null {
    const hash = this.tileHash(tile);
    if (this.imageCache.has(hash)) {
      return this.imageCache.get(hash) ?? null;
    }

    try {
      const canvas = document.createElement('canvas');
      canvas.width = tile.width;
      canvas.height = tile.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        this.imageCache.set(hash, null);
        return null;
      }

      const imgData = ctx.createImageData(tile.width, tile.height);
      const data = imgData.data;
      for (let py = 0; py < tile.height; py++) {
        for (let px = 0; px < tile.width; px++) {
          const idx = py * tile.width + px;
          const pxIdx = tile.pixels[idx];
          const i = idx * 4;
          data[i] = pxIdx;
          data[i + 1] = pxIdx;
          data[i + 2] = pxIdx;
          data[i + 3] = pxIdx === 0 ? 0 : 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);

      const img = new Image();
      img.src = canvas.toDataURL();
      this.imageCache.set(hash, img);
      return img;
    } catch {
      this.imageCache.set(hash, null);
      return null;
    }
  }

  private tileHash(tile: FontTile): number {
    let hash = 0;
    for (let i = 0; i < tile.pixels.length; i++) {
      hash = ((hash << 5) - hash) + tile.pixels[i];
    }
    return hash;
  }

  renderText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    opts?: {
      fontSize?: number;
      fontFamily?: string;
      color?: string;
      palette?: ((idx: number) => [number, number, number]);
      letterSpacing?: number;
    },
  ): number {
    if (this.renderMode === 'fillText') {
      return this.renderFillText(ctx, text, x, y, opts);
    }
    return this.renderTileText(ctx, text, x, y, opts);
  }

  private renderFillText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    opts?: {
      fontSize?: number;
      fontFamily?: string;
      color?: string;
    },
  ): number {
    const fs = opts?.fontSize ?? 11;
    const ff = opts?.fontFamily ?? '"Noto Sans JP", sans-serif';
    const color = opts?.color ?? '#fff';

    ctx.font = `${fs}px ${ff}`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';
    ctx.fillText(text, x, y);

    return ctx.measureText(text).width;
  }

  private renderTileText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    opts?: {
      fontSize?: number;
      palette?: ((idx: number) => [number, number, number]);
      letterSpacing?: number;
    },
  ): number {
    const scale = opts?.fontSize ? opts.fontSize / this.config.tileHeight : 1;
    const spacing = opts?.letterSpacing ?? 0;
    const palette = opts?.palette ?? null;

    let currentX = x;

    for (const char of text) {
      const tileIdx = this.getTileIndex(char);
      const tile = this.getTile(tileIdx);

      if (tile) {
        const w = tile.width * scale;
        const h = tile.height * scale;

        ctx.save();
        ctx.scale(scale, scale);
        this.renderTile(ctx, tile, currentX / scale, y / scale, palette);
        ctx.restore();

        currentX += w + spacing;
      }
    }

    return currentX - x;
  }

  renderTextLines(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    lines: { text: string; color?: string }[],
    opts?: {
      fontSize?: number;
      fontFamily?: string;
      lineHeight?: number;
      palette?: ((idx: number) => [number, number, number]);
    },
  ): number {
    const fs = opts?.fontSize ?? 11;
    const lh = opts?.lineHeight ?? (this.renderMode === 'tile' ? fs : 14);

    let currentY = y;

    for (const line of lines) {
      this.renderText(ctx, line.text, x, currentY, {
        fontSize: fs,
        fontFamily: opts?.fontFamily,
        color: line.color,
        palette: opts?.palette,
      });
      currentY += lh;
    }

    return currentY - y;
  }

  measureText(text: string, fontSize?: number): { width: number; height: number } {
    if (this.renderMode === 'fillText') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return { width: 0, height: fontSize ?? 11 };

      const fs = fontSize ?? 11;
      ctx.font = `${fs}px "Noto Sans JP", sans-serif`;
      return {
        width: ctx.measureText(text).width,
        height: fs,
      };
    }

    const scale = fontSize ? fontSize / this.config.tileHeight : 1;
    let width = 0;

    for (const char of text) {
      const tileIdx = this.getTileIndex(char);
      const tile = this.getTile(tileIdx);
      if (tile) {
        width += tile.width * scale;
      }
    }

    return {
      width,
      height: (this.config.tileHeight * scale),
    };
  }

  getTileWidth(fontSize?: number): number {
    const scale = fontSize ? fontSize / this.config.tileHeight : 1;
    return this.config.tileWidth * scale;
  }

  getTileHeight(fontSize?: number): number {
    const scale = fontSize ? fontSize / this.config.tileHeight : 1;
    return this.config.tileHeight * scale;
  }
}

export function createDefaultFontConfig(): FontConfig {
  const tiles: FontTile[] = [];
  const charMap = new Map<string, number>();

  const defaultTile: FontTile = {
    pixels: new Uint8Array(64).fill(0),
    width: 8,
    height: 8,
  };
  tiles.push(defaultTile);

  const asciiTiles: { char: string; pixels: number[] }[] = [
    { char: ' ', pixels: [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0] },
    { char: '0', pixels: [0,3,3,3,3,3,3,0, 0,3,1,1,1,1,3,0, 0,3,1,1,1,1,3,0, 0,3,1,1,1,1,3,0, 0,3,1,1,1,1,3,0, 0,3,1,1,1,1,3,0, 0,3,3,3,3,3,3,0, 0,0,0,0,0,0,0,0] },
    { char: '1', pixels: [0,0,0,2,2,0,0,0, 0,0,2,2,2,0,0,0, 0,2,2,2,2,0,0,0, 0,0,0,2,2,0,0,0, 0,0,0,2,2,0,0,0, 0,0,0,2,2,0,0,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: '2', pixels: [0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,0,0,0,0,0,2,0, 0,0,0,0,0,2,2,0, 0,0,0,0,2,2,0,0, 0,0,0,2,2,0,0,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: '3', pixels: [0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,0,0,0,0,0,2,0, 0,0,0,2,2,2,2,0, 0,0,0,0,0,0,2,0, 0,2,1,1,1,1,1,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: '4', pixels: [0,0,0,0,0,2,2,0, 0,0,0,0,2,2,2,0, 0,0,0,2,2,2,0,0, 0,0,2,2,2,2,0,0, 0,2,2,2,2,2,0,0, 0,2,1,1,1,1,2,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,2,2,0] },
    { char: '5', pixels: [0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,2,0, 0,0,0,0,0,0,2,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: '6', pixels: [0,0,0,0,0,2,2,0, 0,0,0,0,2,2,0,0, 0,0,0,2,2,0,0,0, 0,0,2,2,2,2,0,0, 0,2,2,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: '7', pixels: [0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,0,0,0,0,0,2,0, 0,0,0,0,0,2,0,0, 0,0,0,0,2,0,0,0, 0,0,0,2,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,0,0,0,0,0,0] },
    { char: '8', pixels: [0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: '9', pixels: [0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,2,0, 0,0,0,0,0,2,0,0, 0,2,2,2,2,0,0,0, 0,0,0,0,0,0,0,0] },
    { char: 'A', pixels: [0,0,2,2,2,2,0,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,2,2,2,2,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'B', pixels: [0,2,2,2,2,2,0,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,2,2,2,2,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'C', pixels: [0,0,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,0,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'D', pixels: [0,2,2,2,2,2,0,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'E', pixels: [0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,0,0,0,0,0,0,0] },
    { char: 'F', pixels: [0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,0,0,0,0,0,0,0] },
    { char: 'G', pixels: [0,0,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,0,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'H', pixels: [0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,2,2,2,2,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'I', pixels: [0,0,0,0,0,0,0,0, 0,0,0,2,2,0,0,0, 0,0,0,2,2,0,0,0, 0,0,0,2,2,0,0,0, 0,0,0,2,2,0,0,0, 0,0,0,2,2,0,0,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'J', pixels: [0,0,0,0,0,2,2,0, 0,0,0,0,0,2,2,0, 0,0,0,0,0,2,2,0, 0,0,0,0,0,2,2,0, 0,2,1,1,1,2,2,0, 0,2,1,1,1,1,2,0, 0,0,2,2,2,2,0,0, 0,0,0,0,0,0,0,0] },
    { char: 'K', pixels: [0,2,1,1,1,1,2,0, 0,2,1,1,1,2,0,0, 0,2,1,1,2,0,0,0, 0,2,2,2,2,2,0,0, 0,2,1,1,2,0,0,0, 0,2,1,1,1,2,0,0, 0,2,1,1,1,1,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'L', pixels: [0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'M', pixels: [0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,2,1,1,2,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'N', pixels: [0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,2,1,1,1,2,0, 0,2,1,2,1,1,2,0, 0,2,1,1,2,1,2,0, 0,2,1,1,1,2,2,0, 0,2,1,1,1,1,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'O', pixels: [0,0,2,2,2,2,0,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,0,2,2,2,2,0,0, 0,0,0,0,0,0,0,0] },
    { char: 'P', pixels: [0,2,2,2,2,2,0,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,0,0,0,0,0,0,0] },
    { char: 'Q', pixels: [0,0,2,2,2,2,0,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,2,1,1,2,0, 0,2,1,1,2,1,2,0, 0,0,2,2,2,2,0,0, 0,0,0,0,0,2,0,0] },
    { char: 'R', pixels: [0,2,2,2,2,2,0,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,2,2,2,2,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,0,0,0,0,2,0,0] },
    { char: 'S', pixels: [0,0,2,2,2,2,2,0, 0,2,1,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,0,2,2,2,2,2,0, 0,0,0,0,0,0,2,0, 0,2,1,1,1,1,1,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
    { char: 'T', pixels: [0,2,2,2,2,2,2,0, 0,0,2,1,1,2,0,0, 0,0,2,1,1,2,0,0, 0,0,2,1,1,2,0,0, 0,0,2,1,1,2,0,0, 0,0,2,1,1,2,0,0, 0,0,2,2,2,2,0,0, 0,0,0,0,0,0,0,0] },
    { char: 'U', pixels: [0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,0,2,2,2,2,0,0, 0,0,0,0,0,0,0,0] },
    { char: 'V', pixels: [0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,0,2,1,1,2,0,0, 0,0,2,1,1,2,0,0, 0,0,0,2,2,0,0,0, 0,0,0,2,2,0,0,0, 0,0,0,0,0,0,0,0] },
    { char: 'W', pixels: [0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,2,2,1,1,2,2,0, 0,0,2,1,1,2,0,0, 0,0,0,0,0,0,0,0] },
    { char: 'X', pixels: [0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,0,2,1,1,2,0,0, 0,0,2,1,1,2,0,0, 0,0,2,1,1,2,0,0, 0,0,2,1,1,2,0,0, 0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0] },
    { char: 'Y', pixels: [0,2,1,1,1,1,2,0, 0,2,1,1,1,1,2,0, 0,0,2,1,1,2,0,0, 0,0,2,1,1,2,0,0, 0,0,2,1,1,2,0,0, 0,0,2,1,1,2,0,0, 0,0,0,2,2,0,0,0, 0,0,0,0,0,0,0,0] },
    { char: 'Z', pixels: [0,2,2,2,2,2,2,0, 0,0,0,0,0,2,1,0, 0,0,0,0,2,1,1,0, 0,0,0,2,1,1,1,0, 0,0,2,1,1,1,1,0, 0,2,1,1,1,1,1,0, 0,2,2,2,2,2,2,0, 0,0,0,0,0,0,0,0] },
  ];

  asciiTiles.forEach((item, index) => {
    tiles.push({
      pixels: new Uint8Array(item.pixels),
      width: 8,
      height: 8,
    });
    charMap.set(item.char, index + 1);
  });

  for (let i = 0; i < 26; i++) {
    const lower = String.fromCharCode(97 + i);
    const upper = String.fromCharCode(65 + i);
    const upperIdx = charMap.get(upper);
    if (upperIdx !== undefined) {
      charMap.set(lower, upperIdx);
    }
  }

  return {
    tiles,
    charMap,
    defaultTile: 0,
    tileWidth: 8,
    tileHeight: 8,
  };
}

import { FontTiles8001, FontData8001 } from '../data/FontData8001.js';

export function createRomFontConfig(): FontConfig {
  const tiles: FontTile[] = [...FontTiles8001];
  
  const charMap = new Map<string, number>();
  FontData8001.charMapping.forEach(entry => {
    charMap.set(entry.char, entry.tileIdx);
  });

  for (let i = 0; i < 26; i++) {
    const lower = String.fromCharCode(97 + i);
    const upper = String.fromCharCode(65 + i);
    const upperIdx = charMap.get(upper);
    if (upperIdx !== undefined) {
      charMap.set(lower, upperIdx);
    }
  }

  return {
    tiles,
    charMap,
    defaultTile: 0,
    tileWidth: FontData8001.tileWidth,
    tileHeight: FontData8001.tileHeight,
  };
}

export const DEFAULT_PALETTE = (idx: number): [number, number, number] => {
  const colors: [number, number, number][] = [
    [0, 0, 0],
    [255, 255, 255],
    [255, 255, 0],
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 0, 255],
    [0, 255, 255],
    [128, 128, 128],
    [192, 192, 192],
    [128, 128, 0],
    [128, 0, 0],
    [0, 128, 0],
    [0, 0, 128],
    [128, 0, 128],
    [0, 128, 128],
  ];
  return colors[idx] ?? [255, 0, 255];
};
