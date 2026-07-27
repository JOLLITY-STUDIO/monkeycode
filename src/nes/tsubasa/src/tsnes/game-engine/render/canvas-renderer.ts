/**
 * ============================================================================
 * Canvas Renderer — replaces the NES PPU (Picture Processing Unit)
 * 
 * The original PPU processed:
 *   - Background tiles from nametables (32×30 tiles, scrolled)
 *   - Sprites from OAM (Object Attribute Memory, 64 entries)
 *   - Palette lookup from 32-byte palette RAM
 *   - CHR pattern tables (8KB tiles, via MMC3 bank switching)
 * 
 * In H5, we render directly to a Canvas 2D context each frame.
 * Tiles are pre-rendered from CHR data into offscreen canvases.
 * ============================================================================
 */

import { GameState } from '../core/game-state';
import { EngineConfig, TileData } from '../core/types';
import { ChrTileStore, getDefaultTileStore } from '../data/chr-tiles';

const SCREEN_TILE_W = 32;
const SCREEN_TILE_H = 30;
const TILE_PX = 8;
const SCREEN_W = SCREEN_TILE_W * TILE_PX;  // 256
const SCREEN_H = SCREEN_TILE_H * TILE_PX;  // 240

/** NES palette — classic 64-color palette mapped to RGB */
const NES_PALETTE: [number, number, number][] = [
  [0x7C,0x7C,0x7C], [0x00,0x00,0xFC], [0x00,0x00,0xC4], [0x3C,0x28,0xFC],
  [0x7C,0x00,0xE0], [0xA4,0x00,0xA0], [0xC0,0x00,0x60], [0xC4,0x00,0x00],
  [0xC4,0x20,0x00], [0xA0,0x40,0x00], [0x6C,0x54,0x00], [0x1C,0x64,0x00],
  [0x00,0x6C,0x00], [0x00,0x68,0x18], [0x00,0x5C,0x40], [0x00,0x00,0x00],
  [0xBC,0xBC,0xBC], [0x1C,0x74,0xFC], [0x3C,0x84,0xFC], [0x70,0x58,0xFC],
  [0xA8,0x54,0xFC], [0xD0,0x50,0xF0], [0xE8,0x50,0xB0], [0xEC,0x50,0x58],
  [0xEC,0x74,0x14], [0xD8,0x88,0x00], [0xA4,0xA4,0x00], [0x58,0xB0,0x00],
  [0x14,0xB8,0x14], [0x1C,0xB4,0x60], [0x1C,0xA8,0xA4], [0x00,0x00,0x00],
  [0xFC,0xFC,0xFC], [0x70,0xC0,0xFC], [0x90,0xD0,0xFC], [0xBC,0xAC,0xFC],
  [0xE4,0xA8,0xFC], [0xFC,0xA4,0xF8], [0xFC,0xA4,0xD8], [0xFC,0xA4,0xA8],
  [0xFC,0xBC,0x74], [0xF4,0xD0,0x40], [0xD8,0xE4,0x40], [0xAC,0xEC,0x5C],
  [0x74,0xF4,0x74], [0x74,0xF0,0xAC], [0x74,0xEC,0xDC], [0x00,0x00,0x00],
  [0xFC,0xFC,0xFC], [0xC8,0xE4,0xFC], [0xD4,0xEC,0xFC], [0xE0,0xDC,0xFC],
  [0xEC,0xD8,0xFC], [0xFC,0xD4,0xFC], [0xFC,0xD4,0xEC], [0xFC,0xD4,0xD8],
  [0xFC,0xDC,0xC4], [0xF8,0xE4,0xAC], [0xEC,0xF0,0xAC], [0xDC,0xF8,0xBC],
  [0xC8,0xFC,0xC8], [0xC8,0xF8,0xD4], [0xC8,0xF4,0xE4], [0x00,0x00,0x00],
];

export class CanvasRenderer {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _imageData: ImageData;
  private _buf: Uint8ClampedArray;
  private _config: EngineConfig;
  private _tileStore: ChrTileStore;

  /** Pre-rendered CHR tile canvases (tile index → ImageData) */
  private _tileCache: Map<number, ImageData> = new Map();

  /** Current CHR bank index for background tiles (MMC3 R2) */
  private _currentBgBank: number = 0;
  /** Current CHR bank index for sprite tiles (MMC3 R4) */
  private _currentSprBank: number = 0;

  constructor(canvas: HTMLCanvasElement, config: EngineConfig, tileStore?: ChrTileStore) {
    this._canvas = canvas;
    this._canvas.width = config.canvasWidth;
    this._canvas.height = config.canvasHeight;
    this._ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    this._ctx.imageSmoothingEnabled = false; // Pixel-perfect rendering

    this._imageData = this._ctx.createImageData(SCREEN_W, SCREEN_H);
    this._buf = this._imageData.data;
    this._config = config;
    this._tileStore = tileStore || getDefaultTileStore();
  }

  /**
   * Render a full frame from the current game state.
   * Called every frame by the game loop.
   */
  render(state: GameState): void {
    // Sync CHR bank mappings from MMC3 state
    this.syncChrBanks(state);

    // Clear buffer to backdrop color (palette index 0)
    const bgColor = NES_PALETTE[state.paletteBuffer[0] & 0x3F];
    this._clearBuffer(bgColor[0], bgColor[1], bgColor[2]);

    this._renderBackground(state);
    this._renderSprites(state);

    // Draw pixel buffer to canvas, scaled to fit
    this._ctx.putImageData(this._imageData, 0, 0);
    this._ctx.drawImage(
      this._canvas,
      0, 0, SCREEN_W, SCREEN_H,
      0, 0, this._config.canvasWidth, this._config.canvasHeight,
    );
  }

  /** Clear the pixel buffer to a solid color */
  private _clearBuffer(r: number, g: number, b: number): void {
    const buf = this._buf;
    const len = SCREEN_W * SCREEN_H;
    for (let i = 0; i < len; i++) {
      const p = i * 4;
      buf[p]     = r;
      buf[p + 1] = g;
      buf[p + 2] = b;
      buf[p + 3] = 255;
    }
  }

  /**
   * Render background tiles from nametables.
   * Uses scrollX/scrollY for scrolling.
   */
  private _renderBackground(state: GameState): void {
    const buf = this._buf;
    const scrollX = state.scrollX;
    const scrollY = state.scrollY;
    const ntSelect = (state.ppuCtrl & 0x01) ? 1 : 0; // Nametable select
    const nt = ntSelect === 0 ? state.nametable0 : state.nametable1;

    for (let tileY = 0; tileY < SCREEN_TILE_H + 1; tileY++) {
      // Handle vertical scrolling with nametable wrap
      const realY = (tileY + (scrollY >> 3)) % (SCREEN_TILE_H * 2);
      const screenTable = realY < SCREEN_TILE_H ? 0 : 1;
      const ntY = realY % SCREEN_TILE_H;

      for (let tileX = 0; tileX < SCREEN_TILE_W + 1; tileX++) {
        const realX = (tileX + (scrollX >> 3)) % (SCREEN_TILE_W * 2);
        const crossTable = realX < SCREEN_TILE_W ? 0 : 1;
        const ntX = realX % SCREEN_TILE_W;

        // Get the actual nametable to read from
        const actualNt = (screenTable ^ crossTable)
          ? (ntSelect ^ 1)
          : ntSelect;
        const sourceNt = actualNt === 0 ? state.nametable0 : state.nametable1;
        const tileIndex = sourceNt[ntY * SCREEN_TILE_W + ntX];

        // Calculate pixel position
        const px = tileX * TILE_PX - (scrollX & 7);
        const py = tileY * TILE_PX - (scrollY & 7);

        this._drawTile(tileIndex, px, py, state, buf);
      }
    }
  }

  /**
   * Render sprites from OAM shadow.
   * Sprites are 8×8 or 8×16 depending on PPUCTRL bit5.
   */
  private _renderSprites(state: GameState): void {
    const buf = this._buf;
    const spriteSize = (state.ppuCtrl & 0x20) ? 16 : 8; // 8×16 mode?
    const oam = state.oamShadow;

    // Sprites are drawn in reverse order (priority: first = front)
    for (let i = 63; i >= 0; i--) {
      const offset = i * 4;
      const y = oam[offset];
      const tileIndex = oam[offset + 1];
      const attr = oam[offset + 2];
      const x = oam[offset + 3];

      // Skip hidden sprites (Y >= 0xF0)
      if (y >= 0xF0) continue;

      // Check if sprite is behind background (bit5 of attr)
      const behindBg = (attr & 0x20) !== 0;

      // Flip H/V
      const flipH = (attr & 0x40) !== 0;
      const flipV = (attr & 0x80) !== 0;

      const realY = y + 1; // NES sprites have +1 offset

      // In 8×16 mode, bottom bit of tile is ignored for tile index
      const effectiveTile = (spriteSize === 16)
        ? tileIndex & 0xFE
        : tileIndex & 0xFF;

      for (let row = 0; row < spriteSize; row++) {
        const drawY = realY + (flipV ? spriteSize - 1 - row : row);
        if (drawY < 0 || drawY >= SCREEN_H) continue;

        const tileRow = flipV
          ? (spriteSize - 1 - row) & 7
          : row & 7;
        const currentTile = (row < 8) ? effectiveTile : effectiveTile + 1;

        for (let col = 0; col < 8; col++) {
          const drawX = x + (flipH ? 7 - col : col);
          if (drawX < 0 || drawX >= SCREEN_W) continue;

          const pixel = this._getSpriteTilePixel(currentTile, tileRow, flipH ? 7 - col : col);
          if (pixel === 0) continue; // Transparent

          // Palette for sprites uses $3F11-$3F1F
          const paletteIndex = (attr & 0x03) + 4; // Sprite palettes 4-7
          const colorIndex = state.paletteBuffer[paletteIndex * 4 + pixel];
          const [r, g, b] = NES_PALETTE[colorIndex & 0x3F];

          const p = (drawY * SCREEN_W + drawX) * 4;
          buf[p]     = r;
          buf[p + 1] = g;
          buf[p + 2] = b;
          buf[p + 3] = 255;
        }
      }
    }
  }

  /**
   * Draw a single background tile at pixel position (px, py).
   */
  private _drawTile(
    tileIndex: number, px: number, py: number,
    state: GameState, buf: Uint8ClampedArray,
  ): void {
    const attrX = Math.floor(px / 16) % 16;
    const attrY = Math.floor(py / 16) % 15;
    // Background palette lookup from attribute table
    const attrByte = state.attribute0[attrY * 8 + attrX] || 0;
    const quadShift = ((py & 16) ? 4 : 0) | ((px & 16) ? 2 : 0);
    const paletteIdx = ((attrByte >> (quadShift + 2)) & 0x03);

    for (let row = 0; row < 8; row++) {
      const drawY = py + row;
      if (drawY < 0 || drawY >= SCREEN_H) continue;

      for (let col = 0; col < 8; col++) {
        const drawX = px + col;
        if (drawX < 0 || drawX >= SCREEN_W) continue;

        const pixel = this._getTilePixel(tileIndex, row, col);
        if (pixel === 0) {
          // Use background color ($3F00)
          const bgColor = NES_PALETTE[state.paletteBuffer[0] & 0x3F];
          const p = (drawY * SCREEN_W + drawX) * 4;
          buf[p] = bgColor[0];
          buf[p + 1] = bgColor[1];
          buf[p + 2] = bgColor[2];
          buf[p + 3] = 255;
        } else {
          const colorIndex = state.paletteBuffer[paletteIdx * 4 + pixel];
          const [r, g, b] = NES_PALETTE[colorIndex & 0x3F];
          const p = (drawY * SCREEN_W + drawX) * 4;
          buf[p]     = r;
          buf[p + 1] = g;
          buf[p + 2] = b;
          buf[p + 3] = 255;
        }
      }
    }
  }

  /**
   * Get a pixel from a CHR tile (0=transparent, 1-3=color).
   * 
   * Reads pre-decoded tile pixels from the ChrTileStore.
   * Tile indexing depends on the MMC3 CHR bank configuration:
   *   - Bank 2 ($1000-$13FF): background tiles 0-255
   *   - Bank 3 ($1400-$17FF): background tiles 0-255 (in 8×16 sprite mode: sprite tiles 0-127)
   *   - Bank 4 ($1800-$1BFF): sprite tiles 0-255
   *   - Bank 5 ($1C00-$1FFF): sprite tiles 0-255
   * 
   * For background tiles (tileIndex 0-255), we read from bank 2 or bank 3.
   * For sprites (tileIndex 0-255), we read from bank 4 or bank 5.
   */
  private _getTilePixel(tileIndex: number, row: number, col: number): number {
    // Background tile: mapped to MMC3 R2 CHR bank
    // For simplicity, we always use bank 0 for BG and bank 0 for sprites
    // In full implementation, this respects MMC3 register state
    const decoded = this._tileStore.getDecodedTile(this._currentBgBank, tileIndex & 0x1FF);
    return decoded[row * 8 + col];
  }

  /**
   * Get a sprite tile pixel — uses sprite CHR banks (MMC3 R4/R5)
   */
  private _getSpriteTilePixel(tileIndex: number, row: number, col: number): number {
    const decoded = this._tileStore.getDecodedTile(this._currentSprBank, tileIndex & 0x1FF);
    return decoded[row * 8 + col];
  }

  /** Update CHR bank mapping from game state (MMC3 registers) */
  syncChrBanks(state: GameState): void {
    // MMC3 R2: background pattern table 0 ($1000-$13FF)
    this._currentBgBank = state.chrBank2;
    // MMC3 R4: sprite pattern table 0 ($1800-$1BFF)
    this._currentSprBank = state.chrBank4;
  }

  /** Clear the entire screen to the background color */
  clear(): void {
    this._ctx.fillStyle = '#000000';
    this._ctx.fillRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);
  }
}
