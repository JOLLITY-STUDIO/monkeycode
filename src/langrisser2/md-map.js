/**
 * Langrisser II 关卡地图数据解析器
 * 基于 FUN_00009ec4 + PTR_LAB_00061cb0 系列表
 */

/** 关卡地图指针表 */
const LEVEL_MAP_TABLE  = 0x61CB0;  // PTR_LAB_00061cb0
const LEVEL_AUX1_TABLE = 0x61D2C;  // PTR_LAB_00061d2c
const LEVEL_AUX2_TABLE = 0x61D30;  // PTR_LAB_00061d30
const TILE_REMAP1_TABLE = 0x61E24; // PTR_LAB_00061e24
const TILE_REMAP2_TABLE = 0x61E28; // PTR_DAT_00061e28

const TILE_TYPES = {
  0x00: '平原', 0x01: '森林', 0x02: '山', 0x03: '水',
  0x04: '墙',   0x05: '房间', 0x06: '宝箱', 0x07: '城堡',
  0x08: '桥',   0x09: '沙漠', 0x0A: '沼泽', 0x0B: '教会',
  0x0C: '栅栏', 0x0D: '废墟', 0x0E: '深水', 0x0F: '天空',
};

function readU32(data, addr) {
  if (addr + 3 >= data.length) return 0;
  const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
  return dv.getUint32(addr, false) & 0xFFFFFF;
}

function readU16(data, addr) {
  if (addr + 1 >= data.length) return 0;
  const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
  return dv.getUint16(addr, false);
}

/**
 * 解析关卡列表 (最多 32 关)
 */
export function parseLevelList(data) {
  const levels = [];
  for (let i = 0; i < 32; i++) {
    const ptr = readU32(data, LEVEL_MAP_TABLE + i * 4);
    if (ptr < 0x200 || ptr > data.length) continue;

    const w = readU16(data, ptr);
    const h = readU16(data, ptr + 2);
    if (w === 0 || h === 0 || w > 128 || h > 128) continue;

    const unitCfgPtr = readU32(data, 0x18005E);
    const hasUnits = unitCfgPtr >= 0x200 && unitCfgPtr < data.length;

    levels.push({
      index: i,
      name: `关卡${i + 1}`,
      mapPtr: ptr,
      width: w,
      height: h,
      tileCount: w * h,
      hasUnits,
    });
  }
  return levels;
}

/**
 * 解析单关地图 tile 数据 (含重映射)
 */
export function parseLevelMap(data, levelIndex) {
  const ptr = readU32(data, LEVEL_MAP_TABLE + levelIndex * 4);
  if (ptr < 0x200) return null;

  const width  = readU16(data, ptr);
  const height = readU16(data, ptr + 2);
  if (width > 128 || height > 128 || width * height === 0) return null;

  const tileStart = ptr + 4;
  const tiles = [];
  for (let i = 0; i < width * height && tileStart + i < data.length; i++) {
    tiles.push(data[tileStart + i]);
  }

  const remap1Ptr = readU32(data, TILE_REMAP1_TABLE + levelIndex * 4);
  const remap2Ptr = readU32(data, TILE_REMAP2_TABLE + levelIndex * 4);

  const remap1 = [];
  const remap2 = [];
  for (let i = 0; i < 128 && remap1Ptr + i < data.length; i++) {
    remap1.push(data[remap1Ptr + i]);
    remap2.push(data[remap2Ptr + i]);
  }

  // Remapped tiles
  const remapped = tiles.map(t => {
    const lo = t & 0x0F;
    const hi = (t >> 4) & 0x0F;
    const rlo = remap1[lo] || lo;
    const rhi = remap2[hi] || hi;
    return { original: t, remapped: (rhi << 4) | rlo };
  });

  return { width, height, tiles, remapped, remap1, remap2, romAddr: ptr };
}

/**
 * 渲染地图为 ASCII 预览
 */
export function renderMapASCII(levelData) {
  const { width, height, remapped } = levelData;
  const tileChars = [
    '·', '#', '^', '~', '█', '□', '$', '▓',
    '=', '░', '≈', '♣', '+', '×', '≈', '☁',
  ];

  let result = `地图 (${width}×${height})\n`;
  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      const t = remapped[y * width + x];
      const c = t ? tileChars[t.remapped & 0xF] || '?' : ' ';
      line += c;
    }
    result += line + '\n';
  }
  return result;
}

/**
 * 渲染地图为 HTML Canvas 小图
 */
export function renderMapCanvas(canvas, levelData, palette) {
  const ctx = canvas.getContext('2d');
  const { width, height, remapped } = levelData;
  const tileSize = 8;
  canvas.width = width * tileSize;
  canvas.height = height * tileSize;

  const colors = palette || [
    '#228B22', '#006400', '#8B4513', '#4169E1',
    '#808080', '#D2B48C', '#FFD700', '#B8860B',
    '#A0522D', '#F4A460', '#2E8B57', '#9370DB',
    '#A9A9A9', '#696969', '#1E90FF', '#87CEEB',
  ];

  const img = ctx.createImageData(canvas.width, canvas.height);
  for (let py = 0; py < height * tileSize; py++) {
    for (let px = 0; px < width * tileSize; px++) {
      const tx = Math.floor(px / tileSize);
      const ty = Math.floor(py / tileSize);
      const t = remapped[ty * width + tx];
      const val = t ? t.remapped & 0xF : 0;
      const color = colors[val] || '#000';

      // Simple checkered overlay for tile boundaries (简单位块边界)
      const isBorder = (px % tileSize === 0 || py % tileSize === 0);
      const fillColor = isBorder ? darken(color) : color;
      const rgb = hexToRgb(fillColor);

      const idx = (py * canvas.width + px) * 4;
      img.data[idx]     = rgb.r;
      img.data[idx + 1] = rgb.g;
      img.data[idx + 2] = rgb.b;
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

function hexToRgb(hex) {
  const c = hex.replace('#', '');
  return {
    r: parseInt(c.substring(0, 2), 16),
    g: parseInt(c.substring(2, 4), 16),
    b: parseInt(c.substring(4, 6), 16),
  };
}

function darken(hex) {
  const rgb = hexToRgb(hex);
  return `#${Math.floor(rgb.r * 0.8).toString(16).padStart(2, '0')}${Math.floor(rgb.g * 0.8).toString(16).padStart(2, '0')}${Math.floor(rgb.b * 0.8).toString(16).padStart(2, '0')}`;
}

export { TILE_TYPES, LEVEL_MAP_TABLE, TILE_REMAP1_TABLE, TILE_REMAP2_TABLE };
