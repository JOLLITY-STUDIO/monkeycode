/**
 * Langrisser II 关卡场景数据解析器
 * 整合地图、tile属性、场景配置、名称表、道具等全量数据
 * ROM 地址速查: MEMORY.md
 */

// === 基础地址定义 ===
const SCENARIO_BOSS_TABLE = 0x060600;
const SCENARIO_CONFIG_END = 0x060668;
const NAME_PTR_TABLE = 0x0618E8;
const LEVEL_MAP_TABLE = 0x061CB0;
const TILE_ATTR_LO_TABLE = 0x061D2C;
const TILE_ATTR_HI_TABLE = 0x061D30;
const TILE_REMAP1_TABLE = 0x061E24;
const TILE_REMAP2_TABLE = 0x061E28;
const ITEM_NAME_TABLE = 0x060404;
const ITEM_DATA_TABLE = 0x060530;
const CLASS_NAME_TABLE = 0x05E958;
const CLASS_STATS_TABLE = 0x05EDDC;
const TROOP_TYPE_TABLE = 0x060200;

const MAX_SCENARIOS = 31;

function readU32(data, addr) {
  if (addr + 3 >= data.length) return 0;
  const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
  return dv.getUint32(addr, false);
}

function readU16(data, addr) {
  if (addr + 1 >= data.length) return 0;
  const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
  return dv.getUint16(addr, false);
}

function readU8(data, addr) {
  if (addr >= data.length) return 0;
  return data[addr];
}

// ============================================================
// 1. 关卡地图列表 (31关: 27常规 + 4隐藏)
// ============================================================

export function parseLevelList(data) {
  const levels = [];
  for (let i = 0; i < MAX_SCENARIOS; i++) {
    const ptr = readU32(data, LEVEL_MAP_TABLE + i * 4);
    if (ptr < 0x200 || ptr >= data.length) continue;

    const w = readU16(data, ptr);
    const h = readU16(data, ptr + 2);
    if (w === 0 || h === 0 || w > 64 || h > 64) continue;

    levels.push({
      index: i,
      name: `Scenario ${i + 1}`,
      mapPtr: ptr,
      width: w,
      height: h,
      tileCount: w * h,
    });
  }
  return levels;
}

// ============================================================
// 2. 单关地形 Tile 解析 (含高低层 remap)
// ============================================================

export function parseLevelTiles(data, levelIndex) {
  const ptr = readU32(data, LEVEL_MAP_TABLE + levelIndex * 4);
  if (ptr < 0x200 || ptr >= data.length) return null;

  const width = readU16(data, ptr);
  const height = readU16(data, ptr + 2);
  if (width > 64 || height > 64 || width * height === 0) return null;

  const tileStart = ptr + 4;
  const tiles = [];
  for (let i = 0; i < width * height && tileStart + i < data.length; i++) {
    tiles.push(data[tileStart + i]);
  }

  return { width, height, tiles, romAddr: ptr };
}

// ============================================================
// 3. Tile 属性解析 (移动消耗/防御加成, 每关 0x280 字节)
// ============================================================

function parseTileAttrBlock(data, attrPtr, attrHiPtr) {
  const attrLo = [];
  const attrHi = [];
  const size = 0x280;
  for (let i = 0; i < size && attrPtr + i < data.length; i++) {
    const b = data[attrPtr + i];
    const nibLo = b & 0x0F;
    const nibHi = (b >> 4) & 0x0F;
    attrLo.push(nibLo);
    attrHi.push(nibHi);
  }
  return { lo: attrLo, hi: attrHi };
}

export function parseSceneTileAttrs(data, levelIndex) {
  const loPtr = readU32(data, TILE_ATTR_LO_TABLE + levelIndex * 8);
  const hiPtr = readU32(data, TILE_ATTR_HI_TABLE + levelIndex * 8);

  if (loPtr < 0x200 || loPtr >= data.length) return null;
  if (hiPtr < 0x200 || hiPtr >= data.length) return null;

  return parseTileAttrBlock(data, loPtr, hiPtr);
}

// ============================================================
// 4. Tile 映射表 (VRAM tile ID remap, 每关 0x100 字节)
// ============================================================

function readTileRemap(data, ptr) {
  const remap = [];
  for (let i = 0; i < 0x100 && ptr + i < data.length; i++) {
    remap.push(data[ptr + i]);
  }
  return remap;
}

export function parseTileRemap(data, levelIndex) {
  const loPtr = readU32(data, TILE_REMAP1_TABLE + levelIndex * 8);
  const hiPtr = readU32(data, TILE_REMAP2_TABLE + levelIndex * 8);

  if (loPtr < 0x200 || loPtr >= data.length) return null;
  if (hiPtr < 0x200 || hiPtr >= data.length) return null;

  return {
    lo: readTileRemap(data, loPtr),
    hi: readTileRemap(data, hiPtr),
  };
}

// ============================================================
// 5. 场景 Boss/敌方职业配置 (0x060600, 8字节/关, 12关)
//    每字节对: (class_id, level)
// ============================================================

export function parseSceneBossConfig(data, levelIndex) {
  const addr = SCENARIO_BOSS_TABLE + levelIndex * 8;
  if (addr >= SCENARIO_CONFIG_END) return null;

  const pairs = [];
  for (let i = 0; i < 4; i++) {
    const cls = data[addr + i * 2];
    const lvl = data[addr + i * 2 + 1];
    if (cls === 0xFF || lvl === 0xFF) break;
    pairs.push({ classId: cls, level: lvl });
  }
  return pairs.length > 0 ? pairs : null;
}

// ============================================================
// 6. 名称指针表 (0x0618E8, 4字节/条目, 指向 FF 分隔的文本)
//    Langrisser II 使用自定义 1 字节编码, 非标准 Shift-JIS
//    (需 VRAM 字模表映射才能解码为可读文字)
// ============================================================

export function parseNameTable(data) {
  const names = [];
  for (let i = 0; i < 80; i++) {
    const ptr = readU32(data, NAME_PTR_TABLE + i * 4);
    if (ptr < 0x200 || ptr >= data.length) break;

    const end = data.indexOf(0xFF, ptr);
    const len = end !== -1 ? end - ptr : 0;
    if (len > 0) {
      names.push({
        index: i,
        ptr,
        bytes: Array.from(data.slice(ptr, ptr + len)),
        raw: String.fromCharCode(...data.slice(ptr, ptr + len)),
      });
    }
  }
  return names;
}

// ============================================================
// 7. 道具表 (FF分隔名, 8B数据/条目)
// ============================================================

export function parseItemList(data) {
  const nameParts = [];
  let pos = ITEM_NAME_TABLE;
  if (data[pos] === 0xFF) pos++;
  while (pos < data.length) {
    const end = data.indexOf(0xFF, pos);
    if (end === -1) break;
    if (end > pos) {
      nameParts.push({
        index: nameParts.length,
        bytes: Array.from(data.slice(pos, end)),
      });
    }
    pos = end + 1;
    if (pos < data.length && data[pos] === 0xFF) break;
  }

  const items = [];
  for (let i = 0; i < nameParts.length; i++) {
    const dataAddr = ITEM_DATA_TABLE + i * 8;
    if (dataAddr + 8 > data.length) break;

    const vals = [];
    for (let j = 0; j < 8; j++) {
      vals.push(data[dataAddr + j]);
    }

    items.push({
      index: i,
      name: nameParts[i],
      data: vals,
    });
  }
  return items;
}

// ============================================================
// 8. 职业名表 (FF分隔, 151条目, 自定义编码)
// ============================================================

export function parseClassNames(data) {
  const classes = [];
  let pos = CLASS_NAME_TABLE;
  while (pos < data.length) {
    const end = data.indexOf(0xFF, pos);
    if (end === -1 || end === pos) break;
    classes.push({
      index: classes.length,
      bytes: Array.from(data.slice(pos, end)),
    });
    pos = end + 1;
  }
  return classes;
}

// ============================================================
// 9. 兵种克制矩阵 (0x060200, 三角矩阵, FF分隔)
// ============================================================

export function parseTroopMatrix(data) {
  const PTR = TROOP_TYPE_TABLE;
  const BLOCK_SIZE = 8;
  const MAX_TYPES = 8;

  const matrix = Array.from({ length: MAX_TYPES }, () =>
    Array.from({ length: MAX_TYPES }, () => 0)
  );

  let off = 0;
  for (let attacker = 0; attacker < MAX_TYPES; attacker++) {
    for (let defender = attacker + 1; defender < MAX_TYPES; defender++) {
      if (PTR + off >= data.length) break;
      const val = data[PTR + off];
      if (val === 0xFF) {
        off++;
        continue;
      }
      matrix[attacker][defender] = val;
      matrix[defender][attacker] = 4 - (val - 1) + 1;
      off++;
    }
    if (PTR + off < data.length && data[PTR + off] === 0xFF) {
      off++;
    }
    if (PTR + off < data.length && data[PTR + off] === 0xFF) {
      break;
    }
  }

  return matrix;
}

// ============================================================
// 10. 完整场景数据导出 (一键获取单关全部数据)
// ============================================================

export function parseScenario(data, levelIndex) {
  const map = parseLevelTiles(data, levelIndex);
  const attrs = parseSceneTileAttrs(data, levelIndex);
  const remap = parseTileRemap(data, levelIndex);
  const bosses = parseSceneBossConfig(data, levelIndex);

  return {
    index: levelIndex,
    name: `Scenario ${levelIndex + 1}`,
    map: map ? {
      width: map.width,
      height: map.height,
      tileCount: map.tileCount,
      romAddr: map.romAddr,
      tiles: map.tiles,
    } : null,
    attrs: attrs ? { lo: attrs.lo, hi: attrs.hi } : null,
    remap: remap ? { lo: remap.lo, hi: remap.hi } : null,
    bosses,
    units: null,
    shop: null,
    script: null,
  };
}

export function parseAllScenarios(data) {
  const levels = parseLevelList(data);
  return levels.map(l => parseScenario(data, l.index));
}

// ============================================================
// 11. ASCII 地图渲染
// ============================================================

export function renderMapASCII(scenario) {
  if (!scenario || !scenario.map) return '';

  const { width, height, tiles } = scenario.map;
  const tileChars = [
    '·', '#', '^', '~', '█', '□', '$', '▓',
    '=', '░', '≈', '♣', '+', '×', '≈', '☁',
  ];

  let result = `Scenario ${scenario.index + 1} (${width}×${height})\n`;
  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      const t = tiles[y * width + x] & 0x0F;
      line += tileChars[t] || '?';
    }
    result += line + '\n';
  }
  return result;
}

// ============================================================
// 导出地址常量
// ============================================================

export {
  SCENARIO_BOSS_TABLE,
  NAME_PTR_TABLE,
  LEVEL_MAP_TABLE,
  TILE_ATTR_LO_TABLE,
  TILE_ATTR_HI_TABLE,
  TILE_REMAP1_TABLE,
  TILE_REMAP2_TABLE,
  ITEM_NAME_TABLE,
  ITEM_DATA_TABLE,
  CLASS_NAME_TABLE,
  TROOP_TYPE_TABLE,
  MAX_SCENARIOS,
};
