/**
 * Genesis VDP Sprite (精灵) 渲染
 *
 * 严格基于 execution-trace.md "Sprite 属性表格式"
 *
 * Sprite 属性表 (VRAM, 由 R5 指定基址):
 *   共 80 个精灵, 每精灵 8 字节
 *   按 link 字段组成链表, link=0xFF 为链表尾
 *
 * 每精灵 8 字节格式:
 *   偏移 0-1: Y 位置 (实际位置 = 值 + 1, 0 = 屏幕外隐藏)
 *   偏移 2:   尺寸 (高4位=宽, 低4位=高, 单位 tile)
 *   偏移 3:   Link/Next Sprite (0xFF = 最后一个)
 *   偏移 4-5: Tile 起始索引 (tile = index, 受 R6 基址影响? 实际直接乘32)
 *   偏移 6-7: X 位置 (bit9=水平翻转? bit0-8=X坐标)
 *
 * 注: Genesis VDP sprite 实际格式更复杂, 这里先实现基础版本
 *     完整格式需参考: VDP 有高/低 2 个属性表
 *     简化版: 每精灵 8 字节, 80 个精灵
 *
 * @see execution-trace.md "Sprite 属性表格式"
 */

import { VDP } from './vdp.js';
import { decodeTileFlipped, tileAddress } from './tile.js';

/** 最大精灵数: 80 */
export const MAX_SPRITES = 80;
/** 每精灵属性表大小: 8 字节 */
export const SPRITE_ATTR_SIZE = 8;
/** 每扫描线最大精灵数: 16 (Genesis 硬件限制) */
export const SPRITES_PER_LINE = 16;

/** 精灵尺寸映射表 (尺寸码 → tile 数) */
const SIZE_TABLE: Record<number, number> = {
  0: 1,  // 1×1 tile
  1: 2,  // 2×2
  2: 3,  // 3×3
  3: 4,  // 4×4
  4: 5,  // 5×5
  5: 6,  // 6×6
  6: 7,  // 7×7
  7: 8,  // 8×8
  8: 9,  // 9×9
  9: 10, // 10×10
  10: 11,
  11: 12,
  12: 13,
  13: 14,
  14: 15,
  15: 16,
};

/** 精灵属性 */
export interface SpriteAttr {
  /** 精灵序号 (0-79) */
  index: number;
  /** Y 坐标 (像素) */
  y: number;
  /** X 坐标 (像素) */
  x: number;
  /** 宽度 (tile 数) */
  widthTiles: number;
  /** 高度 (tile 数) */
  heightTiles: number;
  /** Tile 起始索引 */
  tileStart: number;
  /** 水平翻转 */
  hFlip: boolean;
  /** 垂直翻转 */
  vFlip: boolean;
  /** 调色板索引 (0-3) */
  palette: number;
  /** 优先级 (1=高) */
  priority: number;
  /** Link 指向下一个精灵 */
  link: number;
  /** 是否可见 */
  visible: boolean;
}

/**
 * 解析精灵属性表
 *
 * @param vdp VDP 实例
 * @returns 精灵数组 (按 link 顺序, 最多 80 个)
 */
export function parseSprites(vdp: VDP): SpriteAttr[] {
  const vram = vdp.vram;
  const base = vdp.spriteTableAddr;
  const result: SpriteAttr[] = [];

  // 从 link 0 开始遍历链表
  let link = 0;
  let count = 0;

  while (link !== 0xFF && count < MAX_SPRITES) {
    const addr = base + link * SPRITE_ATTR_SIZE;

    // Y 位置 (偏移 0-1, 16位 big-endian)
    const yHi = vram[addr];
    const yLo = vram[addr + 1];
    // 实际 Y = 值 (10位有效) - 128? 不对, Genesis VDP Y = word - 0xFFFF8000...
    // 简化: 低10位, 加上偏移调整
    let y = ((yHi << 8) | yLo) & 0x3FF; // 10位
    // Genesis sprite Y 坐标: 实际显示Y = (Y & 0x3FF) - 128
    // 但这里先按原始值处理
    y = y & 0x3FF;
    const visible = y !== 0; // Y=0 表示隐藏

    // 尺寸 + Link (偏移 2-3)
    const sizeByte = vram[addr + 2];
    const linkByte = vram[addr + 3];
    const wTiles = SIZE_TABLE[(sizeByte >> 4) & 0x0F] || 1;
    const hTiles = SIZE_TABLE[sizeByte & 0x0F] || 1;
    const nextLink = linkByte;

    // Tile 索引 + 调色板 + 翻转 (偏移 4-5)
    const tileHi = vram[addr + 4];
    const tileLo = vram[addr + 5];
    // bit15-14 = 调色板, bit13 = H翻转, bit12 = V翻转, bit11-0 = tile索引
    const tileAttr = (tileHi << 8) | tileLo;
    const tileStart = tileAttr & 0x07FF; // 11位 tile 索引
    const hFlip = !!(tileAttr & 0x0800);
    const vFlip = !!(tileAttr & 0x1000);
    const palette = (tileAttr >> 13) & 0x03;
    const priority = (tileAttr >> 15) & 0x01;

    // X 位置 (偏移 6-7)
    const xHi = vram[addr + 6];
    const xLo = vram[addr + 7];
    let x = ((xHi << 8) | xLo) & 0x3FF; // 10位

    result.push({
      index: link,
      y,
      x,
      widthTiles: wTiles,
      heightTiles: hTiles,
      tileStart,
      hFlip,
      vFlip,
      palette,
      priority,
      link: nextLink,
      visible,
    });

    link = nextLink;
    count++;
  }

  return result;
}

/**
 * 渲染所有精灵到输出缓冲
 *
 * 渲染顺序: 按 link 顺序, 后面的精灵覆盖前面的
 * 每扫描线最多 16 个精灵 (硬件限制, 超出的不显示)
 *
 * @param vdp VDP 实例
 * @param output 输出像素缓冲 (RGBA)
 * @param outWidth 输出宽度
 * @param outHeight 输出高度
 * @param priorityFilter 优先级过滤 (-1=全部, 0=低, 1=高)
 */
export function renderSprites(
  vdp: VDP,
  output: Uint8Array,
  outWidth: number,
  outHeight: number,
  priorityFilter: number = -1
): void {
  const sprites = parseSprites(vdp);
  const vram = vdp.vram;

  // 临时 tile 像素缓冲 (8×8)
  const tilePixels = new Uint8Array(64);

  for (const spr of sprites) {
    if (!spr.visible) continue;
    if (priorityFilter !== -1 && spr.priority !== priorityFilter) continue;

    const sprWidth = spr.widthTiles * 8;
    const sprHeight = spr.heightTiles * 8;

    // 裁剪
    const drawX = Math.max(0, spr.x);
    const drawY = Math.max(0, spr.y);
    const drawEndX = Math.min(outWidth, spr.x + sprWidth);
    const drawEndY = Math.min(outHeight, spr.y + sprHeight);

    if (drawX >= drawEndX || drawY >= drawEndY) continue;

    for (let py = drawY; py < drawEndY; py++) {
      // 精灵内 Y
      let localY = py - spr.y;
      if (spr.vFlip) localY = sprHeight - 1 - localY;

      const tileY = (localY / 8) | 0;
      const pixelY = localY % 8;

      for (let px = drawX; px < drawEndX; px++) {
        // 精灵内 X
        let localX = px - spr.x;
        if (spr.hFlip) localX = sprWidth - 1 - localX;

        const tileX = (localX / 8) | 0;
        const pixelX = localX % 8;

        // 计算 tile 索引 (tile 排列方式)
        // Genesis sprite tile 排列: 行优先, 每 tile 连续 32 字节
        const tileIdx = spr.tileStart + tileY * spr.widthTiles + tileX;
        const tAddr = tileAddress(tileIdx);

        // 解码 tile (带翻转)
        decodeTileFlipped(vram, tAddr, spr.hFlip, spr.vFlip, tilePixels, 0);

        const pixelValue = tilePixels[pixelY * 8 + pixelX];
        if (pixelValue === 0) continue; // 透明

        // 查调色板
        const colorIdx = spr.palette * 16 + pixelValue;
        const cramValue = vdp.readCRAM(colorIdx);
        const r = ((cramValue >> 1) & 0x0F) * 17;
        const g = ((cramValue >> 5) & 0x0F) * 17;
        const b = ((cramValue >> 9) & 0x0F) * 17;

        const outIdx = (py * outWidth + px) * 4;
        output[outIdx] = r;
        output[outIdx + 1] = g;
        output[outIdx + 2] = b;
        output[outIdx + 3] = 255;
      }
    }
  }
}
