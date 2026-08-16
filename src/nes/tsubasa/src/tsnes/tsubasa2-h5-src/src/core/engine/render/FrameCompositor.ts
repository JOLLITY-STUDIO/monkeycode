/**
 * 帧合成器 (PPU 层) — 对应模拟器 PPU 的渲染职责
 *
 * 消费 DataStore (NT/OAM/调色板) + CHR 数据，合成一帧 256×240 像素缓冲
 * (Uint32Array, 每像素 0xRRGGBB)，交给 Renderer.writeFrame() 呈现。
 *
 * 模拟器对应关系:
 *   PPU.renderBgScanline + renderSpritesPartially → this.buffer
 *   → endFrame() → nes.ui.writeFrame(buffer)
 */
import { DataStore } from '../../../game/data/DataStore';
import { NES_WIDTH, NES_HEIGHT, TILE_PX } from '../../types';
import { type PaletteTable, type PaletteEntry } from '../../../game/model/types';

/** 帧缓冲像素数 (256×240) */
const BUFFER_PIXELS = NES_WIDTH * NES_HEIGHT;

/** 调色板颜色 → 0xRRGGBB */
function colorToUint32(c: { r: number; g: number; b: number }): number {
  return ((c.r & 0xff) << 16) | ((c.g & 0xff) << 8) | (c.b & 0xff);
}

export class FrameCompositor {
  private _store: DataStore;

  /** CHR 原始数据 [bankId] → Uint8Array */
  private _chrBanks: (Uint8Array | null)[] = [];

  /** 调色板表 (每帧从 DataStore 同步) */
  private _paletteTable: PaletteTable | null = null;

  /** 上次同步的调色板 hash (避免无谓重建) */
  private _palHash = '';

  /** 复用帧缓冲对象 (避免每帧分配) */
  private _buffer: Uint32Array = new Uint32Array(BUFFER_PIXELS);

  constructor(store: DataStore) {
    this._store = store;
  }

  // ── CHR 管理 ──

  registerChrBank(bankId: number, data: Uint8Array): void {
    this._chrBanks[bankId] = data;
  }

  getChrBank(bankId: number): Uint8Array | null {
    return this._chrBanks[bankId] ?? null;
  }

  setPaletteTable(table: PaletteTable): void {
    this._paletteTable = {
      bgPalettes: table.bgPalettes.map(e => ({ colors: [...e.colors] })) as typeof table.bgPalettes,
      sprPalettes: table.sprPalettes.map(e => ({ colors: [...e.colors] })) as typeof table.sprPalettes,
    };
  }

  // ── 主入口 ──

  /**
   * 合成一帧。
   * 仅消费 DataStore NT/OAM/调色板 + CHR，不绘制任何外部 overlay。
   */
  compose(): Uint32Array {
    const buf = this._buffer;

    this._syncPalette();

    // 1. 清屏 (backdrop 色 = BG palette 0 的 index0)
    buf.fill(this._backdropColor());

    // 2. 背景 (NameTable)
    this._drawNametable(buf);

    // 3. 精灵 (OAM)
    this._drawSprites(buf);

    return buf;
  }

  // ── 内部: 调色板同步 ──

  private _syncPalette(): void {
    const tbl = this._store.paletteTable;
    const hash = JSON.stringify(tbl);
    if (hash === this._palHash) return;
    this._palHash = hash;
    this._paletteTable = {
      bgPalettes: tbl.bgPalettes.map(e => ({ colors: e.colors.map(c => ({ ...c })) })) as typeof tbl.bgPalettes,
      sprPalettes: tbl.sprPalettes.map(e => ({ colors: e.colors.map(c => ({ ...c })) })) as typeof tbl.sprPalettes,
    };
  }

  private _backdropColor(): number {
    const pal = this._paletteTable?.bgPalettes[0];
    const c = pal?.colors[0];
    return c ? colorToUint32(c) : 0;
  }

  // ── 内部: BG 渲染 ──

  /** 绘制 NameTable 背景 (viewport 采样) */
  private _drawNametable(buf: Uint32Array): void {
    this._store.eachVisibleTile((screenX, screenY, entry) => {
      this._drawTileToBuffer(buf, entry.bank, entry.tile, entry.palette, screenX, screenY, entry.flipH, entry.flipV);
    });
  }

  // ── 内部: 精灵渲染 ──

  /** 绘制精灵 (OAM) */
  private _drawSprites(buf: Uint32Array): void {
    for (const spr of this._store.sprites) {
      if (!spr.active) continue;
      // TODO(真实 OAM): 精灵 palette 为 4-7 组; 背面/优先级未处理, 保持原 Renderer 行为
      const pal = spr.palette >= 4 ? spr.palette : spr.palette + 4;
      this._drawTileToBuffer(buf, spr.bank, spr.tile, pal, spr.x, spr.y, spr.flipH, spr.flipV, true);
    }
  }

  // ── 内部: Tile 解码 → 帧缓冲 ──

  /**
   * 将单个 CHR tile 解码并写入帧缓冲 (覆盖式)。
   * @param sprite true=精灵 (colorIdx0 透明跳过), false=背景 (colorIdx0 用该组 index0)
   */
  private _drawTileToBuffer(
    buf: Uint32Array,
    bankId: number,
    tileId: number,
    palIdx: number,
    x: number,
    y: number,
    flipH: boolean,
    flipV: boolean,
    sprite = false,
  ): void {
    const chr = this._chrBanks[bankId];
    if (!chr) return;

    const off = tileId * 16;
    if (off + 16 > chr.length) return;

    const palTable = this._paletteTable;
    if (!palTable) return;
    const palEntry: PaletteEntry | undefined = palIdx < 4
      ? palTable.bgPalettes[palIdx]
      : palTable.sprPalettes[palIdx - 4];
    if (!palEntry) return;

    for (let row = 0; row < TILE_PX; row++) {
      const srcRow = flipV ? TILE_PX - 1 - row : row;
      const byte0 = chr[off + srcRow];
      const byte1 = chr[off + srcRow + 8];
      for (let col = 0; col < TILE_PX; col++) {
        const srcCol = flipH ? TILE_PX - 1 - col : col;
        const mask = 0x80 >> srcCol;
        const colorIdx = ((byte1 & mask) ? 2 : 0) | ((byte0 & mask) ? 1 : 0);
        if (colorIdx === 0) {
          if (sprite) continue; // 精灵透明
          // 背景: 用该调色板组 index0 (backdrop) 覆盖
        }
        const pal = palEntry.colors[colorIdx] ?? palEntry.colors[0];
        const sx = x + col;
        const sy = y + row;
        if (sx < 0 || sx >= NES_WIDTH || sy < 0 || sy >= NES_HEIGHT) continue;
        buf[sy * NES_WIDTH + sx] = colorToUint32(pal);
      }
    }
  }

}
