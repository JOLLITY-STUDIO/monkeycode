
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const RESOURCES_DIR = path.join(__dirname, '../20260713/output/resources');

const vram = fs.readFileSync(VRAM_PATH);
const cram = fs.readFileSync(CRAM_PATH);

console.log('=== 标题画面 VRAM 结构分析 ===\n');

// VDP寄存器假设 (根据execution-trace.md的结论)
// Plane A: 0xC000 (R2=0x30)
// Plane B: 0xE000 (R4=0x07)
// 显示模式: H40 V28 = 320x224, nametable 64x32

const PLANE_A_ADDR = 0xC000;
const PLANE_B_ADDR = 0xE000;
const NT_COLS = 64;
const NT_ROWS = 32;
const NT_ENTRY_SIZE = 2;

function parseNameTableEntry(addr) {
  const lo = vram[addr & 0xFFFF];
  const hi = vram[(addr + 1) & 0xFFFF];
  const word = (hi << 8) | lo; // 小端
  return {
    tileIndex: word & 0x07FF,
    hFlip: !!(word & 0x1000),
    vFlip: !!(word & 0x0800),
    palette: (word >> 13) & 0x03,
    priority: (word >> 15) & 0x01,
  };
}

// 分析Plane A
console.log('--- Plane A (0xC000) ---');
const planeATiles = new Set();
const planeAPalettes = new Set();
let planeANonEmpty = 0;
let planeATileMin = 0x7FF, planeATileMax = 0;

for (let row = 0; row < NT_ROWS; row++) {
  for (let col = 0; col < NT_COLS; col++) {
    const addr = PLANE_A_ADDR + (row * NT_COLS + col) * NT_ENTRY_SIZE;
    const entry = parseNameTableEntry(addr);
    if (entry.tileIndex !== 0) {
      planeANonEmpty++;
      planeATiles.add(entry.tileIndex);
      planeAPalettes.add(entry.palette);
      if (entry.tileIndex < planeATileMin) planeATileMin = entry.tileIndex;
      if (entry.tileIndex > planeATileMax) planeATileMax = entry.tileIndex;
    }
  }
}

console.log(`  非空条目: ${planeANonEmpty}`);
console.log(`  使用tile数: ${planeATiles.size}`);
console.log(`  Tile范围: ${planeATileMin} - ${planeATileMax}`);
console.log(`  使用调色板: ${Array.from(planeAPalettes).sort().join(', ')}`);

// 分析Plane B
console.log('\n--- Plane B (0xE000) ---');
const planeBTiles = new Set();
const planeBPalettes = new Set();
let planeBNonEmpty = 0;
let planeBTileMin = 0x7FF, planeBTileMax = 0;

for (let row = 0; row < NT_ROWS; row++) {
  for (let col = 0; col < NT_COLS; col++) {
    const addr = PLANE_B_ADDR + (row * NT_COLS + col) * NT_ENTRY_SIZE;
    const entry = parseNameTableEntry(addr);
    if (entry.tileIndex !== 0) {
      planeBNonEmpty++;
      planeBTiles.add(entry.tileIndex);
      planeBPalettes.add(entry.palette);
      if (entry.tileIndex < planeBTileMin) planeBTileMin = entry.tileIndex;
      if (entry.tileIndex > planeBTileMax) planeBTileMax = entry.tileIndex;
    }
  }
}

console.log(`  非空条目: ${planeBNonEmpty}`);
console.log(`  使用tile数: ${planeBTiles.size}`);
console.log(`  Tile范围: ${planeBTileMin} - ${planeBTileMax}`);
console.log(`  使用调色板: ${Array.from(planeBPalettes).sort().join(', ')}`);

// 找出所有使用的tile范围
const allUsedTiles = new Set([...planeATiles, ...planeBTiles]);
const usedTileArray = Array.from(allUsedTiles).sort((a, b) => a - b);
console.log(`\n--- 所有使用的tile ---`);
console.log(`  总tile数: ${allUsedTiles.size}`);
console.log(`  最小tile: ${usedTileArray[0]}`);
console.log(`  最大tile: ${usedTileArray[usedTileArray.length - 1]}`);

// 找连续tile块
console.log(`\n  连续tile块:`);
let blocks = [];
let blockStart = usedTileArray[0];
let blockPrev = usedTileArray[0];
for (let i = 1; i < usedTileArray.length; i++) {
  if (usedTileArray[i] !== blockPrev + 1) {
    blocks.push({ start: blockStart, end: blockPrev, count: blockPrev - blockStart + 1 });
    blockStart = usedTileArray[i];
  }
  blockPrev = usedTileArray[i];
}
blocks.push({ start: blockStart, end: blockPrev, count: blockPrev - blockStart + 1 });

for (const b of blocks.slice(0, 10)) {
  console.log(`    tile ${b.start} - ${b.end} (${b.count} tiles, ${b.count * 32} bytes)`);
}
if (blocks.length > 10) console.log(`    ... 共 ${blocks.length} 个块`);

// ============ 现在匹配资源 ============
console.log('\n\n=== 资源匹配分析 ===\n');

// 读取所有已解压的资源
const resourceFiles = fs.readdirSync(RESOURCES_DIR).filter(f => f.endsWith('.bin'));
const resources = [];

for (const f of resourceFiles) {
  const match = f.match(/resource-(\d+)-type(\d+)\.bin/);
  if (!match) continue;
  const index = parseInt(match[1]);
  const type = parseInt(match[2]);
  const data = fs.readFileSync(path.join(RESOURCES_DIR, f));
  resources.push({ index, type, data, size: data.length, numTiles: Math.floor(data.length / 32) });
}

console.log(`已加载 ${resources.length} 个资源\n`);

// 策略: 对于每个大的资源，检查VRAM中的tile是否能在该资源中找到
// 计算"覆盖率" - VRAM中使用的tile有多少比例出现在该资源中

function computeTileCoverage(resourceData, vramTileIndices) {
  // 把资源数据拆成tile
  const resourceTiles = new Set();
  const numResourceTiles = Math.floor(resourceData.length / 32);
  
  // 资源的tile数据 - 以32字节为单位
  const resourceTileData = [];
  for (let i = 0; i < numResourceTiles; i++) {
    const tileData = new Uint8Array(32);
    for (let j = 0; j < 32; j++) {
      tileData[j] = resourceData[i * 32 + j];
    }
    resourceTileData.push(tileData);
  }
  
  // 对VRAM中的每个tile，检查是否在资源中
  let matched = 0;
  let total = vramTileIndices.length;
  
  for (const tileIdx of vramTileIndices) {
    const vramTileOffset = tileIdx * 32;
    let found = false;
    
    for (let rt = 0; rt < numResourceTiles; rt++) {
      let match = true;
      for (let b = 0; b < 32; b++) {
        if (vram[vramTileOffset + b] !== resourceTileData[rt][b]) {
          match = false;
          break;
        }
      }
      if (match) {
        found = true;
        break;
      }
    }
    
    if (found) matched++;
  }
  
  return { matched, total, ratio: matched / total };
}

// 只检查非零tile
const nonZeroTiles = usedTileArray.filter(t => t !== 0);
console.log(`非零tile数: ${nonZeroTiles.length}`);

// 按大小排序，检查最大的几个资源
const sortedBySize = [...resources].sort((a, b) => b.size - a.size);
console.log('\n--- 前30大资源的tile覆盖率 ---');

for (let i = 0; i < 30 && i < sortedBySize.length; i++) {
  const res = sortedBySize[i];
  const coverage = computeTileCoverage(res.data, nonZeroTiles.slice(0, 100)); // 先抽100个
  console.log(`  Entry ${res.index.toString().padStart(3)} (Type ${res.type}, ${res.numTiles.toString().padStart(3)} tiles): 覆盖率 ${(coverage.ratio*100).toFixed(1)}% (${coverage.matched}/${coverage.total})`);
}

// 更精确地: 找覆盖率最高的资源
console.log('\n--- 高覆盖率资源 ---');
const fullCoverage = [];
for (const res of resources) {
  if (res.numTiles < 10) continue; // 跳过太小的
  const coverage = computeTileCoverage(res.data, nonZeroTiles);
  if (coverage.ratio > 0.1) { // >10% 覆盖率
    fullCoverage.push({ ...res, ...coverage });
  }
}

fullCoverage.sort((a, b) => b.ratio - a.ratio);
for (const res of fullCoverage) {
  console.log(`  Entry ${res.index.toString().padStart(3)} (Type ${res.type}, ${res.numTiles.toString().padStart(3)} tiles): ${(res.ratio*100).toFixed(1)}% (${res.matched}/${res.total})`);
}

// ============ CRAM分析 ============
console.log('\n\n=== CRAM 分析 ===\n');
console.log(`CRAM大小: ${cram.length} bytes`);
console.log(`颜色条目: ${cram.length / 2} 个`);

// 解析CRAM颜色 (小端)
function cramToRGB(cramValue) {
  const r = (cramValue & 0x07) * 36;
  const g = ((cramValue >> 3) & 0x07) * 36;
  const b = ((cramValue >> 6) & 0x07) * 36;
  return { r, g, b };
}

const colors = [];
for (let i = 0; i < cram.length; i += 2) {
  const lo = cram[i];
  const hi = cram[i + 1];
  const val = (hi << 8) | lo; // 小端
  const rgb = cramToRGB(val);
  colors.push({ index: i/2, value: val, ...rgb });
}

// 打印前32个颜色 (4个调色板)
console.log('\n前32个颜色 (4个调色板 x 16色):');
for (let pal = 0; pal < 4; pal++) {
  console.log(`  调色板 ${pal}:`);
  let line = '    ';
  for (let c = 0; c < 16; c++) {
    const col = colors[pal * 16 + c];
    line += `#${col.r.toString(16).padStart(2,'0')}${col.g.toString(16).padStart(2,'0')}${col.b.toString(16).padStart(2,'0')} `;
  }
  console.log(line);
}
