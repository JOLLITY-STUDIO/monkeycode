/**
 * Sprite 渲染器 — 80 个精灵的链表渲染
 *
 * Sprite Attribute Table (SAT) 在 VRAM 中 (VDP reg $05 → $D800)
 * 每精灵 8 字节:
 *   FEDCBA98 76543210
 *   ........ ........   Byte 0: Y 坐标 (低 8 bits)
 *   ........ ........   Byte 1: Y[8] (bit 0) + 未用 (bit 1-6) + VF=1(bit 7=link)
 *   ....HHVV ........   Byte 2: H (width in tiles), V (height in tiles)
 *   ........ ........   Byte 3: Link (下一精灵编号, $00-$7F)
 *   P..CCSHH VTTTTTTT   Byte 4-5: Priority(bit 15), Palette(13-14), VFlip(12), HFlip(11), Tile(10-0)
 *   ........ ........   Byte 6: X 坐标 (低 8 bits)
 *   ........ ........   Byte 7: X[8] (bit 0) + 未用 (bit 1-7)
 *
 * 精灵 Y 坐标: 0-511 → 实际 Y = Y - 128
 * 精灵 X 坐标: 0-511 → 实际 X = X - 128  (game-old bug: 没减 128!)
 * Y=0 → 精灵隐藏
 */

import { VdpChip } from './VdpChip';
import { Vram } from './Vram';
import { Cram } from './Cram';
import { TileDecoder } from './TileDecoder';
import { SPRITE, DISPLAY } from '../core/types';

export class Sprite {
  private vdp: VdpChip;
  private decoder: TileDecoder;

  constructor(vdp: VdpChip) {
    this.vdp = vdp;
    this.decoder = new TileDecoder(DISPLAY.WIDTH);
  }

  /**
   * 解析单精灵条目 (8 字节 SAT entry)
   */
  static parseEntry(bytes: Uint8Array): {
    y: number;
    width: number;
    height: number;
    link: number;
    tile: number;
    palette: number;
    priority: boolean;
    hFlip: boolean;
    vFlip: boolean;
    x: number;
  } | null {
    // Y 坐标 (bytes 0-1)
    const y = ((bytes[1] & 0x01) << 8) | bytes[0];
    if (y === 0) return null; // 精灵隐藏

    // 尺寸 (byte 2)
    const vSize = ((bytes[2] >> 4) & 0x03) + 1; // bits 4-5 → 1x,2x,3x,4x
    const hSize = ((bytes[2] >> 6) & 0x03) + 1; // bits 6-7 → 1x,2x,3x,4x

    // Link (byte 3)
    const link = bytes[3] & 0x7F;

    // Tile 属性 (bytes 4-5)
    const word = (bytes[4] << 8) | bytes[5];
    const tile    = word & 0x07FF;
    const hFlip   = (word & 0x0800) !== 0;
    const vFlip   = (word & 0x1000) !== 0;
    const palette = (word >> 13) & 0x03;
    const priority = (word & 0x8000) !== 0;

    // X 坐标 (bytes 6-7)
    const x = ((bytes[7] & 0x01) << 8) | bytes[6];

    // Genesis VDP: X = x - 128  (game-old bug fix!)
    // Y = y - 128

    return {
      y: y,
      width: hSize,
      height: vSize,
      link: link,
      tile: tile,
      palette: palette,
      priority: !priority, // bit 15=1 → 低优先级 (渲染在后面)
      hFlip: hFlip,
      vFlip: vFlip,
      x: x,
    };
  }

  /**
   * 渲染所有精灵到 ImageData
   *
   * 精灵渲染顺序: Link = $00 → 按链表顺序，后出现的覆盖前面的
   * 优先级: priority=false → 高优先级 (在前面)
   *
   * 注意: 精灵使用 color index 0 = 透明
   */
  renderSprites(
    dst: Uint8ClampedArray,
    vram: Vram,
    cram: Cram,
  ): void {
    const satBase = this.vdp.spriteTableAddr;

    // 收集所有可见精灵 (沿链表)
    const sprites: Array<ReturnType<typeof Sprite.parseEntry> & { id: number }> = [];
    let link = 0;
    const maxSprites = SPRITE.MAX_COUNT;

    for (let i = 0; i < maxSprites; i++) {
      const addr = satBase + link * 8;
      const bytes = vram.readSpriteEntry(link);
      const sprite = Sprite.parseEntry(bytes);
      if (!sprite) {
        link = (link + 1) % maxSprites;
        continue;
      }
      sprites.push({ ...sprite, id: link });
      link = sprite.link;
      if (link >= maxSprites || link === 0) break;
    }

    // 按优先级排序: 先渲染低优先级 (priority=false, 显示在后面)
    // 再渲染高优先级 (priority=true, 覆盖在前面)
    // 对于同优先级，按 SAT 顺序
    sprites.sort((a, b) => {
      // 高优先级 (priority=true) 先放 → 排前面
      if (a.priority !== b.priority) return a.priority ? -1 : 1;
      return a.id - b.id;
    });

    // 逐精灵渲染
    for (const sprite of sprites) {
      // 实际屏幕坐标: X - 128, Y - 128
      const sx = sprite.x - 128;
      const sy = sprite.y - 128;

      // 逐 tile 渲染
      for (let ty = 0; ty < sprite.height; ty++) {
        for (let tx = 0; tx < sprite.width; tx++) {
          // 计算 tile 编号
          // 根据翻转方向决定 tile 顺序
          const hTileIdx = sprite.hFlip ? (sprite.width - 1 - tx) : tx;
          const vTileIdx = sprite.vFlip ? (sprite.height - 1 - ty) : ty;

          // Genesis sprite tile mapping:
          // tiles are in VRAM at (sprite.tile + vTileIdx * sprite.width + hTileIdx) * 32
          // But wait, for Genesis VDP, sprite tiles are arranged as:
          // tile = base + vTileIdx * (width * height stride) + hTileIdx
          // Actually it's: tiles are stored in memory order based on height/width
          // tile = base + (vTileIdx * sprite.width + hTileIdx)
          const tileIdx = sprite.tile + vTileIdx * sprite.width + hTileIdx;
          const tileAddr = tileIdx * 32;
          const tileData = vram.readTileData(tileAddr);

          const dx = sx + tx * 8;
          const dy = sy + ty * 8;

          this.decoder.decodeToImageData(
            tileData,
            cram,
            sprite.palette ? 1 : 0, // FIXME: use sprite.palette directly
            true, // Sprite: color 0 = 透明
            dst,
            dx,
            dy,
            sprite.hFlip,
            sprite.vFlip,
          );
        }
      }
    }
  }
}
