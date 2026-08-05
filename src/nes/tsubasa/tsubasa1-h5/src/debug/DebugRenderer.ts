/**
 * DebugRenderer - 调试页面共享渲染工具
 *
 * 提供将 CHR tile 数据渲染到 Canvas 的通用方法。
 * 所有调试页面（chr-all, pattern-table-all, nametable-all, sprite-all, palette-all）
 * 共用此模块的渲染函数。
 */

import { TileStore } from '../renderer/TileStore';
import { NES_PALETTE } from '../core/types';

/** 全局 TileStore 单例（所有调试页面共享） */
let _globalTileStore: TileStore | null = null;

/** 获取全局 TileStore 单例 */
export function getGlobalTileStore(): TileStore {
  if (!_globalTileStore) {
    _globalTileStore = new TileStore();
    _globalTileStore.init();
    console.log('[DebugRenderer] Global TileStore initialized');
  }
  return _globalTileStore;
}

/** 将 NES 调色板索引转为 RGBA 数组 [r, g, b, a] */
export function nesColorToRgba(nesIndex: number): [number, number, number, number] {
  const rgb = NES_PALETTE[nesIndex & 0x3F];
  return [
    (rgb >> 16) & 0xFF,  // R
    (rgb >> 8) & 0xFF,   // G
    rgb & 0xFF,          // B
    255,                  // A
  ];
}

/** NES 64 色调色板转换为 CSS 颜色字符串数组 */
export function getNesPaletteHex(): string[] {
  return NES_PALETTE.map((rgb, i) => {
    const r = (rgb >> 16) & 0xFF;
    const g = (rgb >> 8) & 0xFF;
    const b = rgb & 0xFF;
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  });
}

/**
 * 将单个 tile (8×8 像素) 渲染到 Canvas 指定位置
 *
 * @param ctx Canvas 2D 上下文
 * @param tileStore TileStore 实例
 * @param bankIdx CHR bank 索引 (0-31)
 * @param tileIdx Tile 索引 (0-255)
 * @param dstX 目标 X 坐标
 * @param dstY 目标 Y 坐标
 * @param scale 放大倍数 (默认 1 = 8×8 像素)
 * @param palette 调色板数组 (4个NES颜色索引: [c0, c1, c2, c3])
 */
export function drawTile(
  ctx: CanvasRenderingContext2D,
  tileStore: TileStore,
  bankIdx: number,
  tileIdx: number,
  dstX: number,
  dstY: number,
  scale: number = 1,
  palette: number[] = [0x0F, 0x00, 0x10, 0x20],
): void {
  const TILE_PX = 8;

  for (let py = 0; py < TILE_PX; py++) {
    const row = tileStore.getTileRow(bankIdx, tileIdx, py);
    for (let px = 0; px < TILE_PX; px++) {
      const colorIdx = row[px];
      const nesIdx = palette[colorIdx] & 0x3F;
      const [r, g, b, _a] = nesColorToRgba(nesIdx);

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(
        dstX + px * scale,
        dstY + py * scale,
        scale,
        scale,
      );
    }
  }
}

/**
 * 将整个 CHR bank (256 tiles) 渲染为 ImageData
 * 布局: 16 列 × 16 行, 每个 tile 8×8 像素 = 128×128 像素
 *
 * @param tileStore TileStore 实例
 * @param bankIdx CHR bank 索引 (0-31)
 * @param palette 调色板数组 (4色)
 * @param scale 放大倍数 (默认 1)
 * @param canvas 微信小程序 canvas 节点 (用于 createImageData，兼容性更好)
 * @returns ImageData 对象
 */
export function renderBankToImageData(
  tileStore: TileStore,
  bankIdx: number,
  palette: number[] = [0x0F, 0x00, 0x10, 0x20],
  scale: number = 1,
  canvas?: any,
): ImageData {
  const TILES_PER_ROW = 16;
  const TILE_PX = 8;
  const bankW = TILES_PER_ROW * TILE_PX * scale;
  const bankH = TILES_PER_ROW * TILE_PX * scale;

  // 微信小程序 Canvas 2D 不支持 new ImageData()，使用 canvas.createImageData()
  let imgData: ImageData;
  if (canvas && typeof canvas.createImageData === 'function') {
    imgData = canvas.createImageData(bankW, bankH);
  } else {
    imgData = new ImageData(bankW, bankH);
  }

  for (let tileY = 0; tileY < TILES_PER_ROW; tileY++) {
    for (let tileX = 0; tileX < TILES_PER_ROW; tileX++) {
      const tileIdx = tileY * TILES_PER_ROW + tileX;

      for (let py = 0; py < TILE_PX; py++) {
        const row = tileStore.getTileRow(bankIdx, tileIdx, py);
        for (let px = 0; px < TILE_PX; px++) {
          const colorIdx = row[px];
          const nesIdx = palette[colorIdx] & 0x3F;
          const [r, g, b, _a] = nesColorToRgba(nesIdx);

          // 填充缩放后的像素
          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              const dstX = tileX * TILE_PX * scale + px * scale + sx;
              const dstY = tileY * TILE_PX * scale + py * scale + sy;
              const offset = (dstY * bankW + dstX) * 4;
              imgData.data[offset + 0] = r;
              imgData.data[offset + 1] = g;
              imgData.data[offset + 2] = b;
              imgData.data[offset + 3] = 255;
            }
          }
        }
      }
    }
  }

  return imgData;
}

/**
 * 获取所有 CHR bank 的元信息
 */
export interface ChrBankInfo {
  index: number;
  /** bank 中非空 tile 数量 */
  nonEmptyTiles: number;
  /** bank 数据哈希（简单校验和） */
  checksum: number;
}

/** 获取所有 CHR bank 的元信息 */
export function getChrBankInfos(tileStore: TileStore): ChrBankInfo[] {
  const infos: ChrBankInfo[] = [];
  for (let bi = 0; bi < tileStore.bankCount; bi++) {
    let nonEmpty = 0;
    let checksum = 0;
    for (let ti = 0; ti < 256; ti++) {
      const view = tileStore.getTileView(bi, ti);
      let isEmpty = true;
      for (let i = 0; i < 64; i++) {
        checksum = (checksum * 31 + view[i]) & 0xFFFFFFFF;
        if (view[i] !== 0) isEmpty = false;
      }
      if (!isEmpty) nonEmpty++;
    }
    infos.push({ index: bi, nonEmptyTiles: nonEmpty, checksum });
  }
  return infos;
}

/**
 * 将 ImageData 渲染到 Canvas
 * 微信小程序: 需要用 putImageData
 */
export function putImageDataToCanvas(
  ctx: CanvasRenderingContext2D,
  imgData: ImageData,
  x: number,
  y: number,
): void {
  ctx.putImageData(imgData, x, y);
}
