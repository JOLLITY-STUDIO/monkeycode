/**
 * Sprite All 页面
 *
 * 展示 NES OAM (Object Attribute Memory) 的全部 64 个精灵槽位结构。
 * OAM 地址: $0200-$02FF (256 字节)
 * 每个精灵 4 字节: Y, Tile#, Attributes, X
 *
 * 这是静态数据结构展示。游戏运行时的 OAM 数据由 OamCache 管理。
 */
import { getGlobalTileStore, drawTile, nesColorToRgba } from '../../src/debug/DebugRenderer';

declare const wx: any;

/** 精灵调色板 (与 nametable 一致，精灵使用 palette 4-7) */
const SPR_PALETTES: number[][] = [
  [0x0F, 0x07, 0x17, 0x27], // Sprite palette 0
  [0x0F, 0x01, 0x11, 0x21], // Sprite palette 1
  [0x0F, 0x08, 0x18, 0x28], // Sprite palette 2
  [0x0F, 0x04, 0x14, 0x24], // Sprite palette 3
];

const SPRITE_COUNT = 64;
const TILE_PX = 8;

/** 模拟 OAM 数据（静态展示结构） */
function getDemoOamData(): Uint8Array {
  const data = new Uint8Array(256);
  // 前 16 个精灵: 一行排开
  for (let i = 0; i < 16; i++) {
    const off = i * 4;
    data[off + 0] = 100 + (i % 4) * 16; // Y
    data[off + 1] = i * 4;              // Tile index
    data[off + 2] = i & 3;              // Attributes (palette)
    data[off + 3] = 20 + i * 14;        // X
  }
  // 其余隐藏
  for (let i = 16; i < 64; i++) {
    data[i * 4 + 0] = 0xFF;
  }
  return data;
}

/** 解析精灵属性位 */
function decodeFlags(attr: number): string {
  const parts: string[] = [];
  if (attr & 0x80) parts.push('V');
  if (attr & 0x40) parts.push('H');
  if (attr & 0x20) parts.push('Prio');
  parts.push(`Pal${attr & 3}`);
  if (!(attr & 0xC0)) parts.push('Normal');
  return parts.join(' ');
}

Page({
  data: {
    chrBank: 0,
    tileScale: 2,
    tilePixelSize: TILE_PX * 2,
    sprites: [] as Array<{
      y: number; yHex: string;
      tile: number; tileHex: string;
      attr: number; attrHex: string;
      x: number; xHex: string;
      flags: string;
    }>,
  },

  _tileStore: null as any,

  onLoad() {
    this._tileStore = getGlobalTileStore();

    const oamData = getDemoOamData();
    const sprites: any[] = [];

    for (let i = 0; i < SPRITE_COUNT; i++) {
      const off = i * 4;
      const y = oamData[off + 0];
      sprites.push({
        y,
        yHex: '0x' + y.toString(16).toUpperCase().padStart(2, '0'),
        tile: oamData[off + 1],
        tileHex: '0x' + oamData[off + 1].toString(16).toUpperCase().padStart(2, '0'),
        attr: oamData[off + 2],
        attrHex: '0x' + oamData[off + 2].toString(16).toUpperCase().padStart(2, '0'),
        x: oamData[off + 3],
        xHex: '0x' + oamData[off + 3].toString(16).toUpperCase().padStart(2, '0'),
        flags: y === 0xFF ? 'HIDDEN' : decodeFlags(oamData[off + 2]),
      });
    }

    this.setData({ sprites });
  },

  onReady() {
    setTimeout(() => this.renderAllSprites(), 300);
  },

  renderAllSprites() {
    const sprites = this.data.sprites;
    for (let i = 0; i < SPRITE_COUNT; i++) {
      this.renderSprite(i, sprites[i]);
    }
  },

  renderSprite(index: number, sprite: any) {
    const query = wx.createSelectorQuery();
    query.select(`#spr-canvas-${index}`)
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0] || !res[0].node) return;

        const canvas = res[0].node;
        const size = TILE_PX * this.data.tileScale;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        // 背景
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, size, size);

        if (sprite.y === 0xFF) return; // 隐藏

        const palette = SPR_PALETTES[sprite.attr & 3] || SPR_PALETTES[0];
        drawTile(ctx, this._tileStore, this.data.chrBank, sprite.tile,
          0, 0, this.data.tileScale, palette);
      });
  },

  onChrBankInput(e: any) {
    const val = parseInt(e.detail.value) || 0;
    const bank = Math.max(0, Math.min(31, val));
    this.setData({ chrBank: bank });
    setTimeout(() => this.renderAllSprites(), 50);
  },

  onScaleChange(e: any) {
    const scale = e.detail.value;
    this.setData({
      tileScale: scale,
      tilePixelSize: TILE_PX * scale,
    });
    setTimeout(() => this.renderAllSprites(), 50);
  },
});
