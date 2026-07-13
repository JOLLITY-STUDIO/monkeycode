/**
 * Langrisser II - 精灵拼凑逻辑模块
 * 
 * 完整实现 MD Genesis 精灵系统的 tile 解析、精灵组成、渲染与导出
 * 
 * 核心概念:
 *   1. VRAM 中 tile 数据 (4bpp, 32B/tile) 是 BG 和 Sprite 共享的
 *   2. Sprite Attribute Table (SAT, VRAM 0xD800) 定义每个精灵:
 *      - 位置 (x, y)
 *      - 尺寸 (宽度tile数, 高度tile数)
 *      - tile 起始索引 (指向 VRAM tile 区)
 *      - 调色板索引 (0-3, 指向 CRAM)
 *      - 水平/垂直翻转
 *      - 优先级
 *   3. 精灵 tile 按行优先排列: tileN = tileStart + y * widthTiles + x
 *   4. 场景脚本 (0x080328/0x080674) 逐 tile 加载精灵数据 → VRAM
 *   5. ROM 0x080CBC: 小精灵表 (192B/条目 = 6 tiles, 菜单头像/图标)
 *   6. 资源系统 (0x0B0000): 大精灵/背景 tile 的 LZSS/位平面压缩数据
 * 
 * 精灵类型:
 *   - 小头像 (0x080CBC): 6 tiles, 用于菜单/状态界面
 *   - 战斗单位: 通过场景脚本 + 资源系统加载, 大尺寸多帧
 *   - UI元素: 资源系统加载, 状态栏/面板/字体
 *   - 地图单位: 资源系统加载, 地图上的小图标
 */

// ============================================================
// 接口定义
// ============================================================

/** Genesis MD ROM 读取器 */
export interface RomReader {
  readonly rom: Uint8Array;
  readByte(addr: number): number;
  readWord(addr: number): number;
  readLong(addr: number): number;
  readBytes(addr: number, length: number): Uint8Array;
}

/** Genesis 4bpp tile (8×8 像素) */
export type TilePixels = Uint8Array; // 64 bytes, values 0-15

/** 精灵属性表条目 (VDP SAT, VRAM 0xD800) */
export interface SpriteAttribute {
  index: number;      // 精灵号 (0-79)
  y: number;          // Y坐标
  x: number;          // X坐标  
  widthTiles: number; // 宽 (tile数)
  heightTiles: number;// 高 (tile数)
  tileStart: number;  // tile起始索引
  hFlip: boolean;     // 水平翻转
  vFlip: boolean;     // 垂直翻转
  palette: number;    // 调色板 (0-3)
  priority: number;   // 优先级
  link: number;       // 链表
  visible: boolean;   // 是否可见
}

/** 精灵帧 (完整拼凑的精灵图) */
export interface SpriteFrame {
  tiles: TilePixels[];         // 排列好的 tile 像素数组
  widthTiles: number;          // 宽 (tile数)
  heightTiles: number;         // 高 (tile数)
  pixelWidth: number;          // 像素宽
  pixelHeight: number;         // 像素高
  mergedPixels: Uint8Array;    // 合并后的完整像素 (行优先, 4bpp索引)
  palette: number;             // 使用的调色板
  hFlip: boolean;
  vFlip: boolean;
}

/** 调色板 (16色) */
export type Palette = [number, number, number][]; // [[r,g,b] * 16]

/** CRAM 读取结果 */
export interface CRAMData {
  palettes: Palette[];  // 4组调色板
  raw: Uint8Array;      // 原始128字节
}

/** 精灵表条目 (ROM 0x080CBC, 192B) */
export interface SmallSpriteEntry {
  index: number;
  tiles: TilePixels[];  // 6 tiles
  romAddr: number;
}

/** 场景脚本精灵条目 */
export interface ScriptSpriteEntry {
  spriteId: number;
  tileData: Uint8Array;        // 32字节 (1 tile)
  vramAddress: number;         // VRAM 目标地址
  tileIndex: number;           // VRAM tile 索引
}

// ============================================================
// ROM 地址常量
// ============================================================

export const ROM_OFFSETS = {
  /** 精灵表 (小头像/图标, 0xC0B/条目) */
  SMALL_SPRITE_TABLE: 0x080CBC,
  SMALL_SPRITE_ENTRY_SIZE: 0xC0, // 192 bytes = 6 tiles
  
  /** 场景精灵脚本指针表 */
  SCRIPT_TABLE_TYPE0: 0x080328,
  SCRIPT_TABLE_TYPE1: 0x080674,
  
  /** 资源指针表 */
  RESOURCE_POINTER_TABLE: 0x0B0000,
  
  /** 资源 ID 基准 */
  RESOURCE_ID_BASE: 32768, // 0x8000
  
  /** VDP 精灵属性表 */
  SPRITE_ATTRIBUTE_TABLE: 0xD800,
  
  /** 精灵表条目大小 */
  SPRITE_ATTR_SIZE: 8,
  
  /** 角色能力表 */
  CHAR_INIT_TABLE: 0x05E64A,
  CHAR_ENTRY_SIZE: 0x0E,  // 14 bytes
  
  /** 职业数据表 */
  CLASS_DATA_TABLE: 0x05EDDC,
  CLASS_ENTRY_SIZE: 0x1C, // 28 bytes
  
  /** 角色修正表 */
  CHAR_MODIFIER_TABLE: 0x082A59,
} as const;

// ============================================================
// ROM 读取器
// ============================================================

export class ArrayBufferRomReader implements RomReader {
  constructor(public readonly rom: Uint8Array) {}
  
  readByte(addr: number): number { return this.rom[addr & 0xFFFFF] & 0xFF; }
  readWord(addr: number): number { return (this.readByte(addr) << 8) | this.readByte(addr + 1); }
  readLong(addr: number): number { return (this.readWord(addr) << 16) | this.readWord(addr + 2); }
  readBytes(addr: number, len: number): Uint8Array { 
    return this.rom.subarray(addr & 0xFFFFF, (addr & 0xFFFFF) + len); 
  }
}

// ============================================================
// Genesis 4bpp Tile 解码器
// ============================================================

export const TILE_SIZE = 8;
export const TILE_BYTES = 32; // 4 planes × 8 rows

/**
 * 解码单个 4bpp tile
 * 格式: 8行 × 4字节/行 (plane0/1/2/3, big-endian bit order)
 */
export function decodeTile(data: Uint8Array, offset: number): TilePixels {
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowBase = offset + y * 4;
    const p0 = data[rowBase], p1 = data[rowBase + 1];
    const p2 = data[rowBase + 2], p3 = data[rowBase + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] = ((p0 >> bit) & 1) | ((p1 >> bit) & 1) << 1 |
                          ((p2 >> bit) & 1) << 2 | ((p3 >> bit) & 1) << 3;
    }
  }
  return pixels;
}

/**
 * 批量解码 tiles
 */
export function decodeTiles(data: Uint8Array, offset: number, count: number): TilePixels[] {
  const tiles: TilePixels[] = [];
  for (let i = 0; i < count; i++) {
    tiles.push(decodeTile(data, offset + i * TILE_BYTES));
  }
  return tiles;
}

/**
 * tile索引 → VRAM地址
 */
export function tileAddress(index: number): number {
  return (index & 0x7FF) * TILE_BYTES;
}

// ============================================================
// CRAM 调色板解析
// ============================================================

/**
 * 从 CRAM 字节数组解析调色板
 * Genesis CRAM 格式: 64色 × 2字节, 9-bit BGR
 */
export function parseCRAM(cram: Uint8Array): CRAMData {
  const palettes: Palette[] = [];
  for (let p = 0; p < 4; p++) {
    const palette: Palette = [];
    for (let c = 0; c < 16; c++) {
      const offset = (p * 16 + c) * 2;
      const word = (cram[offset] << 8) | cram[offset + 1];
      palette.push([
        ((word >> 1) & 0x0F) * 17,   // R (4-bit → 8-bit)
        ((word >> 5) & 0x0F) * 17,   // G
        ((word >> 9) & 0x0F) * 17,   // B
      ]);
    }
    palettes.push(palette);
  }
  return { palettes, raw: cram };
}

/**
 * 4bpp 像素 + 调色板 → RGBA
 * 索引 0 = 透明
 */
export function pixelsToRGBA(
  pixels: Uint8Array,
  palette: Palette,
  width: number,
  height: number
): Uint8Array {
  const rgba = new Uint8Array(width * height * 4);
  for (let i = 0; i < pixels.length; i++) {
    const idx = pixels[i] & 0x0F;
    if (idx === 0) { rgba[i * 4 + 3] = 0; continue; }
    const color = palette[idx] || [0, 0, 0];
    rgba[i * 4] = color[0];
    rgba[i * 4 + 1] = color[1];
    rgba[i * 4 + 2] = color[2];
    rgba[i * 4 + 3] = 255;
  }
  return rgba;
}

// ============================================================
// 精灵属性表 (SAT) 解析
// ============================================================

/** 精灵尺寸映射 (sizeCode → tiles) */
const SIZE_MAP: Record<number, number> = {
  0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8,
  8:9, 9:10, 10:11, 11:12, 12:13, 13:14, 14:15, 15:16
};

/**
 * 从 VRAM 解析精灵属性表 (SAT)
 * 基址: VDP R5 = 0x6C → VRAM 0xD800
 */
export function parseSpriteAttributes(vram: Uint8Array, satBase: number = 0xD800): SpriteAttribute[] {
  const result: SpriteAttribute[] = [];
  let link = 0;
  let count = 0;
  
  while (link !== 0xFF && count < 80) {
    const addr = satBase + link * 8;
    
    const y = (((vram[addr] << 8) | vram[addr + 1]) & 0x3FF);
    const sizeByte = vram[addr + 2];
    const linkByte = vram[addr + 3];
    const tileAttr = (vram[addr + 4] << 8) | vram[addr + 5];
    const x = ((vram[addr + 6] << 8) | vram[addr + 7]) & 0x3FF;
    
    result.push({
      index: link,
      y,
      x,
      widthTiles: SIZE_MAP[(sizeByte >> 4) & 0x0F] || 1,
      heightTiles: SIZE_MAP[sizeByte & 0x0F] || 1,
      tileStart: tileAttr & 0x07FF,
      hFlip: !!(tileAttr & 0x0800),
      vFlip: !!(tileAttr & 0x1000),
      palette: (tileAttr >> 13) & 0x03,
      priority: (tileAttr >> 15) & 0x01,
      link: linkByte,
      visible: y !== 0,
    });
    
    link = linkByte;
    count++;
  }
  
  return result;
}

// ============================================================
// 精灵帧拼凑 (tile puzzle)
// ============================================================

/**
 * 从 VRAM (或 tile 池) 拼凑完整精灵帧
 * 
 * @param tilePool VRAM 数据或 tile 数组
 * @param attr 精灵属性
 * @returns 拼凑后的精灵帧
 */
export function composeSpriteFrame(
  tilePool: Uint8Array,
  attr: SpriteAttribute
): SpriteFrame {
  const { widthTiles, heightTiles, tileStart, hFlip, vFlip, palette } = attr;
  const tiles: TilePixels[] = [];
  
  // 按行优先读取 tiles
  for (let ty = 0; ty < heightTiles; ty++) {
    for (let tx = 0; tx < widthTiles; tx++) {
      const tileIdx = tileStart + ty * widthTiles + tx;
      const addr = tileAddress(tileIdx);
      const tile = decodeTile(tilePool, addr);
      tiles.push(tile);
    }
  }
  
  // 合并为完整像素
  const merged = new Uint8Array(widthTiles * heightTiles * 64);
  for (let tileIdx = 0; tileIdx < tiles.length; tileIdx++) {
    const tileTx = tileIdx % widthTiles;
    const tileTy = Math.floor(tileIdx / widthTiles);
    const tile = tiles[tileIdx];
    
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        let sx = px, sy = py;
        if (hFlip) sx = 7 - px;
        if (vFlip) sy = 7 - py;
        const srcIdx = sy * 8 + sx;
        const dstX = tileTx * 8 + px;
        const dstY = tileTy * 8 + py;
        merged[dstY * (widthTiles * 8) + dstX] = tile[srcIdx];
      }
    }
  }
  
  return {
    tiles,
    widthTiles,
    heightTiles,
    pixelWidth: widthTiles * 8,
    pixelHeight: heightTiles * 8,
    mergedPixels: merged,
    palette,
    hFlip,
    vFlip,
  };
}

// ============================================================
// 小精灵表 (ROM 0x080CBC)
// ============================================================

/**
 * 读取小精灵条目 (192字节 = 6 tiles 裸数据)
 * 用于菜单头像/图标
 */
export function readSmallSpriteEntry(rom: RomReader, index: number): SmallSpriteEntry {
  const addr = ROM_OFFSETS.SMALL_SPRITE_TABLE + index * ROM_OFFSETS.SMALL_SPRITE_ENTRY_SIZE;
  const tiles: TilePixels[] = [];
  for (let i = 0; i < 6; i++) {
    const data = rom.readBytes(addr + i * TILE_BYTES, TILE_BYTES);
    tiles.push(decodeTile(data, 0));
  }
  return { index, tiles, romAddr: addr };
}

// ============================================================
// 场景精灵脚本解析
// ============================================================

/**
 * 解析场景精灵脚本
 * 每个条目: spriteId (2B) + tileData (32B) = 34 bytes
 * VRAM 目标: (type * 0x100 + spriteId) * 0x20 + 0x2000
 */
export function parseSceneScript(
  rom: RomReader,
  scriptAddr: number,
  scriptType: number
): ScriptSpriteEntry[] {
  const entries: ScriptSpriteEntry[] = [];
  let addr = scriptAddr;
  
  while (true) {
    const spriteId = rom.readWord(addr);
    if (spriteId === 0xFFFF || spriteId === 0) break;
    
    const vramAddr = (scriptType * 0x100 + spriteId) * 0x20 + 0x2000;
    const tileIndex = vramAddr / TILE_BYTES;
    const tileData = rom.readBytes(addr + 2, TILE_BYTES);
    
    entries.push({ spriteId, tileData, vramAddress: vramAddr, tileIndex });
    addr += 34; // 2 (id) + 32 (tile)
    
    if (entries.length > 200) break; // safety
  }
  
  return entries;
}

/**
 * 解析场景脚本指针表
 */
export function parseScriptPointerTable(
  rom: RomReader,
  tableAddr: number,
  count: number
): number[] {
  const pointers: number[] = [];
  for (let i = 0; i < count; i++) {
    pointers.push(rom.readLong(tableAddr + i * 4));
  }
  return pointers;
}

// ============================================================
// 资源加载系统
// ============================================================

/**
 * 资源指针查找 (FUN_00009a0e)
 */
export function resolveResourcePointer(
  rom: RomReader,
  resourceId: number,
  originalD0: number
): number {
  const shiftCount = (originalD0 & 0xFFFF) % 64;
  const index = (resourceId & 0x7FFF) >> shiftCount;
  return rom.readLong(ROM_OFFSETS.RESOURCE_POINTER_TABLE + index * 4);
}

export interface DecompressedResource {
  data: Uint8Array;
  type: number;
  size: number;
}

/**
 * LZSS 解压 (Type 3)
 */
export function decompressLZSS(rom: RomReader, resourceAddr: number): DecompressedResource {
  const decompSize = rom.readWord(resourceAddr + 1);
  const srcStart = resourceAddr + 3;
  const window = new Uint8Array(0x1000).fill(0x20);
  let wpos = 0x0FEE, out = new Uint8Array(decompSize), opos = 0;
  let spos = srcStart, remain = decompSize;
  
  while (remain > 0) {
    const flag = rom.readByte(spos++);
    for (let b = 0; b < 8 && remain > 0; b++) {
      if ((flag >> b) & 1) {
        const by = rom.readByte(spos++);
        window[wpos] = by; out[opos++] = by;
        wpos = (wpos + 1) & 0xFFF; remain--;
      } else {
        const b1 = rom.readByte(spos++), b2 = rom.readByte(spos++);
        let off = (b1 | ((b2 & 0xF0) << 4)) & 0xFFF;
        const len = (b2 & 0x0F) + 2;
        for (let i = 0; i < len && remain > 0; i++) {
          const by = window[off];
          window[wpos] = by; out[opos++] = by;
          off = (off + 1) & 0xFFF; wpos = (wpos + 1) & 0xFFF; remain--;
        }
      }
    }
  }
  return { data: out, type: 3, size: decompSize };
}

/**
 * 加载并解压资源
 */
export function loadResource(rom: RomReader, resourceId: number): DecompressedResource | null {
  const addr = resolveResourcePointer(rom, resourceId, resourceId | 0x8000);
  const typeCode = rom.readByte(addr);
  try {
    if (typeCode === 3) return decompressLZSS(rom, addr);
    // Type 2 也需要实现，这里简化
  } catch { return null; }
  return null;
}

// ============================================================
// 角色数据查询 (用于关联角色到精灵资源)
// ============================================================

/** 可玩角色索引 */
export const PLAYABLE_CHARACTERS: Record<number, string> = {
  0: '艾尔文',
  1: '莉亚娜',
  2: '海恩',
  3: '雪莉',
  4: '捷西卡',
  5: '基斯',
  6: '阿伦',
  7: '利昂',
  8: '伊美尔达',
  9: '暗黑王子',
};

export interface CharacterInfo {
  index: number;
  name: string;
  baseClassId: number;
  portraitIdx: number;
  modifiers: { at: number[]; df: number[]; mv: number[]; range: number[] };
}

/**
 * 读取角色信息
 */
export function readCharacterInfo(rom: RomReader, charIndex: number): CharacterInfo | null {
  if (charIndex < 0 || charIndex > 9) return null;
  
  const baseAddr = ROM_OFFSETS.CHAR_INIT_TABLE + charIndex * ROM_OFFSETS.CHAR_ENTRY_SIZE;
  const baseClassId = rom.readByte(baseAddr + 0x00);
  const portraitIdx = rom.readByte(baseAddr + 0x0D);
  
  // 修正表 (0x082A59, 6B/角色)
  const modAddr = ROM_OFFSETS.CHAR_MODIFIER_TABLE + charIndex * 6;
  const modifiers = {
    at: [rom.readByte(modAddr), rom.readByte(modAddr + 1)],
    df: [rom.readByte(modAddr + 2), rom.readByte(modAddr + 3)],
    mv: [rom.readByte(modAddr + 4)],
    range: [rom.readByte(modAddr + 5)],
  };
  
  return {
    index: charIndex,
    name: PLAYABLE_CHARACTERS[charIndex] || `未知-${charIndex}`,
    baseClassId,
    portraitIdx,
    modifiers,
  };
}

// ============================================================
// 精灵帧导出 (JSON / RGBA)
// ============================================================

export interface SpriteExportData {
  /** 精灵帧名称 */
  name: string;
  /** 源信息 */
  source: {
    type: 'small_sprite' | 'resource' | 'scene_script';
    index: number;
    romAddr: number;
  };
  /** 帧数据 */
  frame: {
    widthTiles: number;
    heightTiles: number;
    pixelWidth: number;
    pixelHeight: number;
    palette: number;
  };
  /** 4bpp 像素数据 (row-major, values 0-15) */
  pixels: number[];
  /** RGBA 像素数据 (需要提供调色板) */
  rgba?: number[];
}

/**
 * 导出精灵帧为 JSON 像素数据
 */
export function exportSpriteFrameToJSON(
  frame: SpriteFrame,
  name: string,
  source: { type: string; index: number; romAddr: number },
  crPalette?: Palette,
): SpriteExportData {
  const result: SpriteExportData = {
    name,
    source: source as SpriteExportData['source'],
    frame: {
      widthTiles: frame.widthTiles,
      heightTiles: frame.heightTiles,
      pixelWidth: frame.pixelWidth,
      pixelHeight: frame.pixelHeight,
      palette: frame.palette,
    },
    pixels: Array.from(frame.mergedPixels),
  };
  
  if (crPalette) {
    result.rgba = Array.from(
      pixelsToRGBA(frame.mergedPixels, crPalette, frame.pixelWidth, frame.pixelHeight)
    );
  }
  
  return result;
}

// ============================================================
// 精灵拼凑原理说明
// ============================================================

/**
 * 精灵拼凑 (Tile Composition) 原理:
 * 
 * 1. Genesis VDP 精灵系统:
 *    - VRAM 0x0000-0xBFFF: tile 图案存储区 (精灵和 BG 共享)
 *    - VRAM 0xD800-0xDBFF: Sprite Attribute Table (SAT, 80精灵×8字节)
 *    - CRAM: 4组×16色调色板
 * 
 * 2. SAT 每精灵定义:
 *    - Y坐标 (10bit): 屏幕 Y = value - 128
 *    - X坐标 (10bit): 屏幕 X = value - 128
 *    - 尺寸码: 1×1 ~ 16×16 tiles (8~128像素)
 *    - tileStart: 指向 VRAM 中的 tile 数据起始位置
 *    - 调色板 (2bit): 使用 CRAM 中的哪组调色板
 *    - H/V 翻转 (各1bit): 镜像翻转
 *    - 优先级: 前景/背景
 * 
 * 3. Tile 排列顺序 (行优先):
 *    对于宽 W tiles, 高 H tiles 的精灵:
 *    tile[y][x] = VRAM[tileStart + y * W + x]
 *    每 tile = 32 bytes (8行×4 planes)
 * 
 * 4. 数据来源:
 *    - 资源系统 (0x0B0000): LZSS/位平面压缩 → 解压 → DMA → VRAM
 *    - 场景脚本 (0x080328/0x080674): 逐 tile 加载 → VRAM
 *    - 小精灵表 (0x080CBC): 192B 裸数据 → DMA → VRAM
 * 
 * 5. 一个战斗角色精灵的典型尺寸:
 *    - 地图上: 1×1 或 2×2 tiles (8×8 或 16×16 px)
 *    - 战斗中: 4×4 ~ 8×8 tiles (32×32 ~ 64×64 px)
 *    - 多帧动画: 同一角色多个精灵帧, 不同 tileStart
 */
export const SPRITE_COMPOSITION_PRINCIPLES = `
Sprite Tile Composition (精灵拼凑原理):

VRAM Layout:
  [0x0000 - 0xBFFF]  Tile Pattern Pool (BG + Sprite shared)
    ├── BG tiles (referenced by Plane A/B nametable)
    └── Sprite tiles (referenced by SAT at 0xD800)
  [0xC000 - 0xCFFF]  Plane A Nametable
  [0xD800 - 0xDBFF]  Sprite Attribute Table (80 sprites × 8 bytes)
  [0xE000 - 0xEFFF]  Plane B Nametable

Tile Puzzle Formula:
  For a sprite at SAT index N with:
    widthTiles = W, heightTiles = H
    tileStart  = T

  The tiles are arranged as a W×H grid:
    tile(x, y) = VRAM[tileStart + y * W + x]

  Each tile is 8×8 pixels, 32 bytes (4bpp, 8 rows × 4 bytes/row)

Palette:
  SAT bit14-13 selects CRAM palette group (0-3)
  Each palette group has 16 colors
  Color index 0 = transparent

Data Sources:
  1. Resource System (0x0B0000):
     - Type 3 (LZSS): Compressed tile batches
     - Type 2 (Bitplanar): Compressed tile batches  
     - DMA → VRAM in VBlank

  2. Scene Scripts (0x080328/0x080674):
     - Entry: spriteId(2B) + raw_tile(32B) = 34B
     - VRAM target = (type*0x100 + spriteId) * 0x20 + 0x2000
     - Tile-by-tile loading for battle sprites

  3. Small Sprite Table (0x080CBC):
     - 192 bytes = 6 raw tiles (menu portraits/icons)
     - DMA → VRAM 0x13E0
`;
