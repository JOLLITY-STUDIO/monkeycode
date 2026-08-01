/**
 * 将 bank-22-sprite-engine-data.ts 中的布局流 raw hex 数组
 * 转换为结构化 TILE 对象格式
 *
 * 输出: _layout_converted.ts (所有布局数据的结构化版本)
 * 用法: node _convert_layout_data.js
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(
  __dirname,
  'game-engine', 'native-game', 'tsubasa', 'banks', 'prg',
  'bank-22-sprite-engine-data.ts'
);

const raw = fs.readFileSync(DATA_FILE, 'utf-8');

// ── 解析所有 DATA_ 数组 ──
const lines = raw.split('\n');
/** @type {Map<string, number[]>} */
const arrays = new Map();
let currentName = null;
let currentValues = [];

for (const line of lines) {
  const exportMatch = line.match(/export const (DATA_\$[\dA-F]+_\$[\dA-F]+)/);
  if (exportMatch) {
    if (currentName && currentValues.length > 0) arrays.set(currentName, currentValues);
    currentName = exportMatch[1];
    currentValues = [];
    continue;
  }
  if (currentName) {
    const numMatches = line.match(/0x[0-9A-Fa-f]+/g);
    if (numMatches) for (const m of numMatches) currentValues.push(parseInt(m, 16));
    if (line.includes('];') || line.includes(']')) {
      arrays.set(currentName, currentValues);
      currentName = null;
      currentValues = [];
    }
  }
}

console.log(`加载了 ${arrays.size} 个数据数组`);

// ── 解码布局流 ──

/**
 * 解码一条布局流为结构化 item 数组
 * @param {number[]} bytes
 * @returns {{ items: Array<{[key]: any}>, stats: {tiles: number, controls: number} }}
 */
function decodeStream(bytes, baseAddr) {
  const items = [];
  let tiles = 0, controls = 0;
  let i = 0;

  while (i < bytes.length) {
    const ctrl = bytes[i++];
    const code = ctrl & 0x07;

    if (code === 0) {
      // GROUP: groupCount, yDeltaIdx, then (groupCount+1) × [xAttr, tileValue]
      const groupCount = (ctrl >> 3) & 0x07;
      const yDeltaIdx = bytes[i++];
      const tileItems = [];
      for (let e = 0; e <= groupCount; e++) {
        if (i >= bytes.length) break;
        const xAttr = bytes[i++];
        if (i >= bytes.length) break;
        const tileVal = bytes[i++];
        tileItems.push({ value: tileVal, palette: xAttr & 0x03, xDeltaIdx: (xAttr >> 2) & 0x3F });
        tiles++;
      }
      items.push({ type: 'GROUP', yDeltaIdx, entries: groupCount + 1, tiles: tileItems });
      controls++;
    } else if (code === 1) {
      items.push({ type: 'EXIT' });
      controls++;
      break;
    } else if (code === 2) {
      if (i + 1 < bytes.length) {
        const lo = bytes[i++], hi = bytes[i++];
        items.push({ type: 'ADVANCE_PTR', ptr: (hi << 8) | lo });
      }
      controls++;
    } else if (code === 3) {
      // ADJUST_ANIM: stop parsing — layout continues via jump table in raw data.
      // The code module uses romOffset to resolve anim jump targets at runtime.
      items.push({ type: 'ADJUST_ANIM', romOffset: baseAddr + (i - 1) });
      controls++;
      // Don't try to parse the jump table — leave remaining raw data for code module
      break;
    } else {
      // code 4-7: direct OAM
      const tileItems = [];
      for (let e = 0; e < code; e++) {
        if (i >= bytes.length) break;
        const xAttr = bytes[i++];
        if (i >= bytes.length) break;
        const tileVal = bytes[i++];
        tileItems.push({ value: tileVal, palette: xAttr & 0x03, xDeltaIdx: (xAttr >> 2) & 0x3F });
        tiles++;
      }
      items.push({ type: 'OAM', count: code, tiles: tileItems });
      controls++;
    }
  }
  return { items, stats: { tiles, controls } };
}

// ── 布局流数组名称 ──
const LAYOUT_ARRAYS = [
  'DATA_$841C_$86A0',
  'DATA_$86A1_$89AE',
  'DATA_$89AF_$89BB',
  'DATA_$89BC_$8F1C',
  'DATA_$8F1D_$8F2B',
  'DATA_$8F2C_$8F40',
  'DATA_$8F41_$8F55',
  'DATA_$8F56_$9542',
  'DATA_$9543_$95C1',
  'DATA_$95C2_$95E0',
  'DATA_$95E1_$9612',
  'DATA_$9613_$9627',
  'DATA_$9628_$9650',
  'DATA_$9651_$968A',
  'DATA_$968B_$9742',
  'DATA_$9743_$9B2B',
  'DATA_$9B2C_$9B46',
  'DATA_$9B47_$9B6F',
  'DATA_$9B70_$9FFF',
];

// ── 生成 TS 代码 ──

function tileToTS(t) {
  return `{ value: 0x${t.value.toString(16).toUpperCase().padStart(2, '0')}, palette: ${t.palette}, xDeltaIdx: ${t.xDeltaIdx} }`;
}

function tilesToTS(tiles, indent) {
  if (tiles.length === 0) return '';
  const inl = indent + '  ';
  // 每行最多 3 个，最后一个不加逗号
  let out = '';
  for (let i = 0; i < tiles.length; i++) {
    if (i % 3 === 0) {
      if (i > 0) out += ',\n';
      out += inl + tileToTS(tiles[i]);
    } else {
      out += ', ' + tileToTS(tiles[i]);
    }
  }
  return out;
}

function itemToTS(item) {
  switch (item.type) {
    case 'GROUP':
      return `{ type: 'GROUP', yDeltaIdx: ${item.yDeltaIdx}, entries: ${item.entries}, tiles: [\n${tilesToTS(item.tiles, '    ')}\n  ] }`;
    case 'EXIT':
      return `{ type: 'EXIT' }`;
    case 'ADVANCE_PTR':
      return `{ type: 'ADVANCE_PTR', ptr: 0x${item.ptr.toString(16).toUpperCase().padStart(4, '0')} }`;
    case 'ADJUST_ANIM':
      return `{ type: 'ADJUST_ANIM', romOffset: 0x${item.romOffset.toString(16).toUpperCase().padStart(4, '0')} }`;
    case 'OAM':
      return `{ type: 'OAM', count: ${item.count}, tiles: [\n${tilesToTS(item.tiles, '    ')}\n  ] }`;
    default:
      return `{ UNKNOWN }`;
  }
}

// ── 构建输出 ──
let totalTiles = 0;
let totalItems = 0;

// 1. 布局流定义类型
let out = `/* eslint-disable */\n`;
out += `// ═══════════════════════════════════════════════\n`;
out += `// 22号Bank布局流-结构化TILE数据\n`;
out += `// 由 _convert_layout_data.js 自动生成\n`;
out += `// ═══════════════════════════════════════════════\n\n`;

out += `/** 布局流中的 Tile 条目 */\n`;
out += `export interface LayoutTile {\n`;
out += `  value: number;      // tile 索引\n`;
out += `  palette: number;    // 调色板 0-3\n`;
out += `  xDeltaIdx: number;  // X 偏移表索引\n`;
out += `}\n\n`;

out += `/** 布局流控制指令类型 */\n`;
out += `export type LayoutItem =\n`;
out += `  | { type: 'GROUP'; yDeltaIdx: number; entries: number; tiles: LayoutTile[] }\n`;
out += `  | { type: 'OAM'; count: number; tiles: LayoutTile[] }\n`;
out += `  | { type: 'EXIT' }\n`;
out += `  | { type: 'ADVANCE_PTR'; ptr: number }\n`;
out += `  | { type: 'ADJUST_ANIM'; romOffset: number };\n\n`;

for (const arrayName of LAYOUT_ARRAYS) {
  const bytes = arrays.get(arrayName);
  if (!bytes) continue;

  // Extract ROM base address from array name: DATA_$841C_$86A0 → 0x841C
  const addrMatch = arrayName.match(/DATA_\$([\dA-F]+)_\$/);
  const baseAddr = addrMatch ? parseInt(addrMatch[1], 16) : 0;

  const decoded = decodeStream(bytes, baseAddr);
  const layoutName = arrayName.replace('DATA_', 'LAYOUT_').replace(/_\$[\dA-F]+$/, '');

  out += `// ${arrayName.replace(/_/g, '-')} → ${decoded.items.length} 个指令, ${decoded.stats.tiles} 个 TILE\n`;
  out += `export const ${layoutName}: readonly LayoutItem[] = [\n`;

  for (let i = 0; i < decoded.items.length; i++) {
    out += `  ${itemToTS(decoded.items[i])}`;
    if (i < decoded.items.length - 1) out += ',';
    out += '\n';
  }

  out += `];\n\n`;

  // 单独导出纯 tile 值序列（直接搜索用）
  const allTiles = [];
  for (const item of decoded.items) {
    if (item.tiles) {
      for (const t of item.tiles) allTiles.push(t.value);
    }
  }
  if (allTiles.length > 0) {
    // 每行 16 个
    let tileStr = '';
    for (let i = 0; i < allTiles.length; i++) {
      if (i % 16 === 0) {
        tileStr += i > 0 ? '\n  ' : '  ';
      }
      tileStr += `0x${allTiles[i].toString(16).toUpperCase().padStart(2, '0')}, `;
    }
    out += `/** ${layoutName} 的纯 tile 值序列 (可直接搜索) */\n`;
    out += `export const ${layoutName}_TILES: readonly number[] = [\n${tileStr}\n];\n\n`;
  }

  totalTiles += decoded.stats.tiles;
  totalItems += decoded.items.length;
}

// ── 写入 ──
const outPath = path.join(__dirname, '_layout_converted.ts');
fs.writeFileSync(outPath, out, 'utf-8');
console.log(`\n✓ 已写入: ${outPath}`);
console.log(`  总计: ${totalItems} 个布局指令, ${totalTiles} 个 TILE`);
console.log(`\n接下来需要:`);
console.log(`  1. 检查 _layout_converted.ts`);
console.log(`  2. 更新 bank-22-sprite-engine-code.ts 消费结构化数据`);
