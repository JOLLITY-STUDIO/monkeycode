/**
 * 解码 bank-22-sprite-engine-data.ts 中的 OAM layout 流
 * 将 xAttr,tile 对解析为 TILE 对象格式输出
 *
 * 用法: node _decode_layout_objects.js
 * 输出: _layout_decoded.txt (完整解析)
 *       _layout_decoded_tiles_only.txt (仅 tile 值序列，可直接搜索)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(
  __dirname,
  'game-engine', 'native-game', 'tsubasa', 'banks', 'prg',
  'bank-22-sprite-engine-data.ts'
);

// --- 读取并提取所有 DATA_ 数组 ---
const raw = fs.readFileSync(DATA_FILE, 'utf-8');

/** @type {Map<string, number[]>} */
const arrays = new Map();

// 方法: 逐行解析, https:// 查找 export const DATA_ 行, 然后收集后续 [...]
const lines = raw.split('\n');
let currentName = null;
let currentValues = [];

for (const line of lines) {
  const exportMatch = line.match(/export const (DATA_\$[\dA-F]+_\$[\dA-F]+)/);
  if (exportMatch) {
    // 保存前一个
    if (currentName && currentValues.length > 0) {
      arrays.set(currentName, currentValues);
    }
    currentName = exportMatch[1];
    currentValues = [];
    continue;
  }

  if (currentName) {
    // 收集数字
    const numMatches = line.match(/0x[0-9A-Fa-f]+/g);
    if (numMatches) {
      for (const m of numMatches) {
        currentValues.push(parseInt(m, 16));
      }
    }

    // 检测数组结束
    if (line.includes('];') || line.includes(']')) {
      arrays.set(currentName, currentValues);
      currentName = null;
      currentValues = [];
    }
  }
}

console.log(`加载了 ${arrays.size} 个数据数组`);
for (const [k, v] of arrays) {
  console.log(`  ${k}: ${v.length} bytes`);
}

// --- 解码 layout 流 ---

/**
 * 解码 OAM layout 字节流为结构化对象
 * 
 * 格式:
 * - 控制字节 (byte & 0x07 == 0):
 *   groupCount = (byte >> 3) & 0x07
 *   下一字节 = Y delta 索引
 *   后面 groupCount+1 个 [xAttr, tile] 对
 * 
 * - 绘制字节 (byte & 0x07 > 0):
 *   count = byte & 0x07
 *   count 1: 退出 (PLA/PLA/RTS)
 *   count 2: 推进指针 (读 2 字节小尾端指针)
 *   count 3: 调整动画偏移
 *   count 4-7: 直接 writeOAM (后面 count 个 [xAttr, tile] 对)
 *
 * xAttr 字节结构:
 *   bits 0-1: palette
 *   bits 2-7: X delta 表索引
 *
 * 注意: hFlip/vFlip 来自运行时 sprite meta ($0049 bit6/bit7)，不在流中
 */
function decodeLayoutStream(name, bytes) {
  const result = {
    name,
    groups: [],
    tileSequence: [],
    uniqueTiles: new Set()
  };
  
  let i = 0;
  let groupIdx = 0;
  
  while (i < bytes.length) {
    const ctrl = bytes[i];
    i++;
    const code = ctrl & 0x07;

    if (code === 0) {
      // --- 分组控制头 ---
      const groupCount = (ctrl >> 3) & 0x07;  // entry count = groupCount + 1
      const yDeltaIdx = bytes[i];
      i++;

      const tiles = [];
      for (let e = 0; e <= groupCount; e++) {
        if (i >= bytes.length) break;
        const xAttr = bytes[i];
        i++;
        if (i >= bytes.length) break;
        const tileVal = bytes[i];
        i++;

        const tile = {
          value: tileVal,
          palette: xAttr & 0x03,
          xDeltaIdx: (xAttr >> 2) & 0x3F,
          xAttr: xAttr,
          // hFlip/vFlip 来自运行时 $0049，此处标记
          note: 'hFlip/vFlip from runtime $0049'
        };
        tiles.push(tile);
        result.tileSequence.push(tileVal);
        result.uniqueTiles.add(tileVal);
      }

      result.groups.push({
        idx: groupIdx++,
        type: 'GROUP',
        rawCtrl: ctrl,
        entryCount: groupCount + 1,
        yDeltaIdx,
        tiles
      });

    } else {
      // --- 绘制 entry batch ---
      const count = code;

      if (count === 1) {
        // $8161: exit loop
        result.groups.push({
          idx: groupIdx++,
          type: 'EXIT',
          rawCtrl: ctrl
        });
        break; // 流结束

      } else if (count === 2) {
        // $8164: advance pointer (读 2 字节)
        if (i + 1 < bytes.length) {
          const lo = bytes[i];
          const hi = bytes[i + 1];
          i += 2;
          const ptr = (hi << 8) | lo;
          result.groups.push({
            idx: groupIdx++,
            type: 'ADVANCE_PTR',
            rawCtrl: ctrl,
            ptr: `0x${ptr.toString(16).toUpperCase().padStart(4, '0')}`
          });
        } else {
          result.groups.push({ idx: groupIdx++, type: 'ADVANCE_PTR_ERR', rawCtrl: ctrl });
          break;
        }

      } else if (count === 3) {
        // $8175: adjust by animation
        result.groups.push({
          idx: groupIdx++,
          type: 'ADJUST_ANIM',
          rawCtrl: ctrl
        });
        // 这之后通常会继续循环

      } else {
        // count 4-7: direct writeOAM
        const tiles = [];
        for (let e = 0; e < count; e++) {
          if (i >= bytes.length) break;
          const xAttr = bytes[i];
          i++;
          if (i >= bytes.length) break;
          const tileVal = bytes[i];
          i++;

          const tile = {
            value: tileVal,
            palette: xAttr & 0x03,
            xDeltaIdx: (xAttr >> 2) & 0x3F,
            xAttr: xAttr,
            note: 'hFlip/vFlip from runtime $0049'
          };
          tiles.push(tile);
          result.tileSequence.push(tileVal);
          result.uniqueTiles.add(tileVal);
        }

        result.groups.push({
          idx: groupIdx++,
          type: 'WRITE_OAM',
          rawCtrl: ctrl,
          entryCount: count,
          tiles
        });
      }
    }
  }

  return result;
}

// --- 判断哪些是 OAM layout 数据 ---
// 不是所有数组都是 layout 流；只有包含控制字节语法的才是
// 简单启发：较大的数组 (>=50 字节) 且有 0x00-0x07 控制模式
const LAYOUT_ARRAYS = [
  'DATA_$841C_$86A0',
  'DATA_$86A1_$89AE',
  'DATA_$89BC_$8F1C',
  'DATA_$8F56_$9542',
  'DATA_$9543_$95C1',
  'DATA_$95C1_$95E0',  // 可能不存在
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

// --- 输出 ---
let fullOut = '';
fullOut += '════════════════════════════════════════════\n';
fullOut += 'OAM LAYOUT 流解码 — TILE 对象格式\n';
fullOut += '════════════════════════════════════════════\n\n';
fullOut += '每个 TILE 对象:\n';
fullOut += '  value     → tile 索引 (可直接搜索)\n';
fullOut += '  palette   → 调色板 (0-3)\n';
fullOut += '  xDeltaIdx → X 偏移表索引 (查 DATA_$81F0_$821D)\n';
fullOut += '  note      → hFlip/vFlip 来自运行时 sprite meta, 不在流中\n\n';

let tilesOnly = '';

for (const arrayName of LAYOUT_ARRAYS) {
  const bytes = arrays.get(arrayName);
  if (!bytes) {
    // 尝试模糊匹配
    const found = [...arrays.keys()].find(k => k.startsWith(arrayName.split('_$')[0]));
    if (found) {
      const decoded = decodeLayoutStream(found, arrays.get(found));
      fullOut += renderDecoded(decoded);
      tilesOnly += `// ${found}\n${decoded.tileSequence.join(', ')}\n\n`;
    }
    continue;
  }

  const decoded = decodeLayoutStream(arrayName, bytes);
  fullOut += renderDecoded(decoded);
  tilesOnly += `// ${arrayName}\n${decoded.tileSequence.map(t => `0x${t.toString(16).toUpperCase().padStart(2,'0')}`).join(', ')}\n\n`;
}

/**
 * 渲染解码结果
 */
function renderDecoded(decoded) {
  let out = '';
  out += `\n────────────────────────────────────────\n`;
  out += `${decoded.name}  (${decoded.groups.length} 个结构, ${decoded.tileSequence.length} 个 TILE)\n`;
  out += `────────────────────────────────────────\n`;
  out += `去重 tile: [${[...decoded.uniqueTiles].sort((a,b)=>a-b).map(t=>`0x${t.toString(16).toUpperCase()}`).join(', ')}]\n\n`;

  for (const g of decoded.groups) {
    if (g.type === 'GROUP') {
      out += `[分组 ctrl=0x${g.rawCtrl.toString(16).toUpperCase().padStart(2,'0')} yDeltaIdx=${g.yDeltaIdx} ×${g.entryCount}]\n`;
      for (const t of g.tiles) {
        out += `  TILE { value: 0x${t.value.toString(16).toUpperCase().padStart(2,'0')}, palette: ${t.palette}, xDeltaIdx: ${t.xDeltaIdx} }\n`;
      }
    } else if (g.type === 'WRITE_OAM') {
      out += `[OAM ctrl=0x${g.rawCtrl.toString(16).toUpperCase().padStart(2,'0')} ×${g.entryCount}]\n`;
      for (const t of g.tiles) {
        out += `  TILE { value: 0x${t.value.toString(16).toUpperCase().padStart(2,'0')}, palette: ${t.palette}, xDeltaIdx: ${t.xDeltaIdx} }\n`;
      }
    } else if (g.type === 'EXIT') {
      out += `[EXIT ctrl=0x${g.rawCtrl.toString(16).toUpperCase().padStart(2,'0')}] ← 流结束\n`;
    } else if (g.type === 'ADVANCE_PTR') {
      out += `[ADVANCE_PTR ctrl=0x${g.rawCtrl.toString(16).toUpperCase().padStart(2,'0')} → ${g.ptr}]\n`;
    } else if (g.type === 'ADJUST_ANIM') {
      out += `[ADJUST_ANIM ctrl=0x${g.rawCtrl.toString(16).toUpperCase().padStart(2,'0')}]\n`;
    }
  }

  out += `\n-- TILE 序列 (可直接在源文件中搜索) --\n`;
  out += decoded.tileSequence.map(t => `0x${t.toString(16).toUpperCase().padStart(2,'0')}`).join(', ');
  out += '\n';
  return out;
}

// --- 写入文件 ---
const fullPath = path.join(__dirname, '_layout_decoded_full.txt');
const tilesPath = path.join(__dirname, '_layout_decoded_tiles.txt');

fs.writeFileSync(fullPath, fullOut, 'utf-8');
fs.writeFileSync(tilesPath, tilesOnly, 'utf-8');

console.log(`\n✓ 完整解码写入: ${fullPath}`);
console.log(`✓ 纯 tile 序列写入: ${tilesPath}`);
console.log(`\n直接搜索 tile 值请用: _layout_decoded_tiles.txt`);
