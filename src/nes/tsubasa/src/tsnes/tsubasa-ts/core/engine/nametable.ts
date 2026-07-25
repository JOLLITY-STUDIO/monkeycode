/**
 * ============================================================================
 * nametable — Background 背景层 / Nametable 抽象
 *
 * PPU VRAM $2000-$2FFF: 4 个 nametables (32×30 = 960 tiles each)
 * 配合属性表 (64 bytes per NT) 和调色板
 * ============================================================================
 */

// ═══════════════ 常量 ═══════════════

/** Nametable 数量 (含镜像时为 2 或 4) */
export const NT_COUNT = 4;

/** Nametable 宽度 (tiles) */
export const NT_WIDTH  = 32;
/** Nametable 高度 (tiles) */
export const NT_HEIGHT = 30;

/** 每个 nametable 的 tile 数量 */
export const NT_TILES = NT_WIDTH * NT_HEIGHT; // 960

/** 每个 nametable 的字节数 (960 tiles + 64 attributes = 1024) */
export const NT_SIZE = 1024;

/** 属性表大小 (每 nametable) */
export const ATTR_SIZE = 64;

/** 透明 tile 索引 (通常用 $FF 或最低优先级) */
export const TILE_TRANSPARENT = 0;

/** 属性表位宽 (每字节控制 4×4 tile = 16 tiles) */
export const ATTR_BLOCK_W = 4;
export const ATTR_BLOCK_H = 4;

// ═══════════════ PPU 地址 ═══════════════

export const NT0_ADDR = 8192;   // $2000
export const NT1_ADDR = 8704;   // $2200
export const NT2_ADDR = 9216;   // $2400
export const NT3_ADDR = 9728;   // $2600

export const ATTR0_ADDR = 9152;  // $23C0
export const ATTR1_ADDR = 9664;  // $25C0
export const ATTR2_ADDR = 10176; // $27C0
export const ATTR3_ADDR = 10688; // $29C0

// ═══════════════ Nametable 结构 ═══════════════

/**
 * 创建单个 nametable
 * @returns { { tiles: number[], attrs: number[] } }
 */
export function createNametable() {
  return {
    /** tile 索引: 960 字节 (32 × 30) */
    tiles: new Array(NT_TILES).fill(0),
    /** 属性表: 64 字节 (8 × 8, 每字节 4 个 2-bit palette) */
    attrs: new Array(ATTR_SIZE).fill(0),
  };
}

/**
 * 创建 4 个 nametables + 镜像配置
 * @param {number} mirroring — 0=水平, 1=垂直
 * @returns {object}
 */
export function createNametableManager(mirroring = 0) {
  return {
    tables: [
      createNametable(),
      createNametable(),
      createNametable(),
      createNametable(),
    ],
    mirroring: mirroring,
  };
}

// ═══════════════ Nametable 操作 ═══════════════

/**
 * 将 PPU VRAM 地址解析为 (nametable 索引, 偏移)
 * @param {number} ppuAddr — $2000-$2FFF 范围
 * @param {number} mirroring
 * @returns {{ ntIndex: number, offset: number }}
 */
export function resolveAddr(ppuAddr, mirroring = 0) {
  const ntOffset = ppuAddr - 8192; // $2000 基址
  let ntIndex = Math.floor(ntOffset / NT_SIZE);
  const innerOffset = ntOffset % NT_SIZE;

  if (mirroring === 0) {
    // 水平镜象: NT 0/1 共享, 2/3 共享
    if (ntIndex === 2) ntIndex = 0;
    if (ntIndex === 3) ntIndex = 1;
  } else {
    // 垂直镜象: NT 0/2 共享, 1/3 共享
    if (ntIndex === 1) ntIndex = 0;
    if (ntIndex === 3) ntIndex = 2;
  }

  return { ntIndex: ntIndex & 3, offset: innerOffset & 1023 };
}

/**
 * 从 nametable 读取一个 tile 索引
 */
export function readTile(manager, ppuAddr) {
  const { ntIndex, offset } = resolveAddr(ppuAddr, manager.mirroring);
  const nt = manager.tables[ntIndex];
  if (offset < NT_TILES) {
    return nt.tiles[offset];
  }
  // 属性表区域
  const attrOff = offset - NT_TILES;
  return nt.attrs[attrOff & (ATTR_SIZE - 1)];
}

/**
 * 写入一个 tile 索引到 nametable
 * @param {object} manager
 * @param {number} ppuAddr
 * @param {number} tileIdx — 0-255
 */
export function writeTile(manager, ppuAddr, tileIdx) {
  const { ntIndex, offset } = resolveAddr(ppuAddr, manager.mirroring);
  const nt = manager.tables[ntIndex];
  if (offset < NT_TILES) {
    nt.tiles[offset] = tileIdx & 255;
  } else {
    // 属性表
    const attrOff = offset - NT_TILES;
    nt.attrs[attrOff & (ATTR_SIZE - 1)] = tileIdx & 255;
  }
}

/**
 * 矩形填充 (ROM $98EA 的语义等价)
 * 用同一个 tile 填充 nametable 的连续区域
 * @returns {{ startAddr: number, tile: number, count: number }}
 */
export function rectFill(manager, ppuAddr, tileIdx, rows, cols) {
  let addr = ppuAddr & 16383;
  const result = {
    startAddr: addr,
    tile: tileIdx & 255,
    count: rows * cols,
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      writeTile(manager, addr + c, tileIdx);
    }
    addr = addr + NT_WIDTH; // 下一行 (VRAM 增量在 nametable 区间是 32)
  }

  return result;
}

/**
 * 获取指定 tile 坐标的属性值
 * @returns {number} palette index (0-3)
 */
export function getAttr(manager, ntIndex, tileX, tileY) {
  const nt = manager.tables[ntIndex & 3];
  const attrX = Math.floor(tileX / ATTR_BLOCK_W);
  const attrY = Math.floor(tileY / ATTR_BLOCK_H);
  const attrIdx = attrY * 8 + attrX;
  const byte = nt.attrs[attrIdx];

  const quadX = Math.floor(tileX / 2) % 2;
  const quadY = Math.floor(tileY / 2) % 2;
  const shift = (quadY * 4 + quadX * 2);
  return (byte >> shift) & 3;
}

/**
 * 清空整个 nametable
 */
export function clearNametable(nt) {
  nt.tiles.fill(0);
  nt.attrs.fill(0);
}

/**
 * 清空所有 nametables
 */
export function clearAll(manager) {
  for (const nt of manager.tables) {
    clearNametable(nt);
  }
}
