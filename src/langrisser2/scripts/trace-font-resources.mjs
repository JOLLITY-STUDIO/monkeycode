import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', '20260713');
const ROM_FILE = path.join(BASE, 'Langrisser II (Japan).md');
const OUTPUT_DIR = path.join(__dirname, '..', 'output');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const rom = new Uint8Array(fs.readFileSync(ROM_FILE));

const RL = (o) => ((rom[o] << 24) | (rom[o + 1] << 16) | (rom[o + 2] << 8) | rom[o + 3]) >>> 0;
const RW = (o) => ((rom[o] << 8) | rom[o + 1]);
const RB = (o) => rom[o];

function hex(a, n = 6) { return '0x' + a.toString(16).padStart(n, '0'); }

console.log('=== 追踪字体资源依赖 ===\n');

// ============================================================
// 资源指针表
// ============================================================
const RESOURCE_TABLE = 0x0B0000;

function resolveResource(resourceId) {
  const shiftCount = (resourceId & 0xFFFF) % 64;
  const index = (resourceId & 0x7FFF) >> shiftCount;
  const entryAddr = RESOURCE_TABLE + index * 4;
  return RL(entryAddr);
}

function decompressLZSS(addr) {
  const headerAddr = addr + 1;
  const decompressedSize = RW(headerAddr);
  const compressedDataStart = addr + 3;
  
  const window = new Uint8Array(0x1000).fill(0x20);
  let windowPos = 0x0fee;
  let remaining = decompressedSize;
  
  const output = new Uint8Array(decompressedSize);
  let outputPos = 0;
  let compressedPos = compressedDataStart;
  
  while (remaining > 0) {
    const flagByte = RB(compressedPos++);
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      const isLiteral = (flagByte >> bit) & 1;
      if (isLiteral) {
        const byte = RB(compressedPos++);
        window[windowPos] = byte;
        output[outputPos++] = byte;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
      } else {
        const b1 = RB(compressedPos++);
        const b2 = RB(compressedPos++);
        let matchOffset = (b1 | ((b2 & 0xf0) << 4)) & 0xfff;
        const matchLength = (b2 & 0x0f) + 2;
        for (let i = 0; i < matchLength && remaining > 0; i++) {
          const byte = window[matchOffset];
          window[windowPos] = byte;
          output[outputPos++] = byte;
          matchOffset = (matchOffset + 1) & 0xfff;
          windowPos = (windowPos + 1) & 0xfff;
          remaining--;
        }
      }
    }
  }
  return { data: output, size: decompressedSize };
}

function decompressType2(addr) {
  const b1 = RB(addr + 1);
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7f;
  
  if (!compressed) {
    const size = RW(addr + 2);
    const outputSize = size * planes * 8;
    const data = new Uint8Array(outputSize);
    for (let i = 0; i < outputSize; i++) {
      data[i] = RB(addr + 4 + i);
    }
    return { data, size: outputSize, planes };
  }
  
  const lut = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const b = RB(addr + 2 + i);
    lut[i * 2] = (b >> 4) & 0xf;
    lut[i * 2 + 1] = b & 0xf;
  }
  
  const sz = RW(addr + 10);
  let pc = planes;
  if (pc !== 2) pc ^= 5;
  
  const ctrlStart = addr + 12;
  const pixelStart = ctrlStart + sz;
  const outSize = sz * planes * 8;
  const bpt = pc * 8 * planes;
  const tc = Math.floor(sz / pc);
  
  const out = new Uint8Array(outSize);
  let cp = ctrlStart;
  let pp = pixelStart;
  
  for (let t = 0; t < tc; t++) {
    const wb = new Uint8Array(bpt);
    let wp = 0;
    
    for (let pl = 0; pl < pc; pl++) {
      const cb = RB(cp++);
      for (let bt = 7; bt >= 0; bt--) {
        if ((cb >> bt) & 1) {
          for (let p = 0; p < planes; p++) wb[wp++] = RB(pp++);
        } else {
          for (let p = 0; p < planes; p++) wb[wp++] = 0;
        }
      }
    }
    
    const to = new Uint8Array(32);
    let ow = 0;
    const np = Math.min(pc, 4);
    
    for (let outer = 0; outer < 4; outer++) {
      const ps = [];
      for (let p = 0; p < np; p++) {
        const bo = (outer + p * 4) * 2;
        ps.push((wb[bo] << 8) | wb[bo + 1]);
      }
      
      for (let inner = 0; inner < 4; inner++) {
        let pix = 0;
        for (let px = 0; px < 4; px++) {
          const b0 = np > 0 ? (ps[0] & 0x8000 ? 1 : 0) : 0;
          const b1 = np > 1 ? (ps[1] & 0x8000 ? 1 : 0) : 0;
          const b2 = np > 2 ? (ps[2] & 0x8000 ? 1 : 0) : 0;
          const b3 = np > 3 ? (ps[3] & 0x8000 ? 1 : 0) : 0;
          pix = (pix << 4) | lut[(b3 << 3) | (b1 << 2) | (b2 << 1) | b0];
          for (let p = 0; p < np; p++) ps[p] = (ps[p] << 1) & 0xFFFF;
        }
        to[ow * 2] = (pix >> 8) & 0xFF;
        to[ow * 2 + 1] = pix & 0xFF;
        ow++;
      }
    }
    
    out.set(to, t * 32);
  }
  
  return { data: out, size: outSize, planes };
}

function loadResource(resourceId) {
  const ptr = resolveResource(resourceId);
  if (ptr < 0x0B0000 || ptr >= rom.length) return null;
  
  const type = RB(ptr);
  try {
    if (type === 3) return { ...decompressLZSS(ptr), type: 3 };
    if (type === 2) return { ...decompressType2(ptr), type: 2 };
  } catch(e) {}
  return null;
}

// ============================================================
// 分析假名字符表 (ROM 0x082114)
// ============================================================
console.log('--- 分析假名字符表 (ROM 0x082114) ---');

const KANA_TABLE_ADDR = 0x082114;
const KANA_TABLE_SIZE = 0x100;

const kanaData = [];
for (let i = 0; i < KANA_TABLE_SIZE; i++) {
  kanaData.push(RB(KANA_TABLE_ADDR + i));
}

const tileIndices = new Set();
for (const val of kanaData) {
  if (val !== 0 && val !== 0xFF) {
    tileIndices.add(val);
  }
}

console.log(`假名字符表中引用的 tile 索引范围: ${Math.min(...tileIndices)} - ${Math.max(...tileIndices)}`);
console.log(`唯一 tile 索引数量: ${tileIndices.size}`);

const sortedTileIndices = [...tileIndices].sort((a, b) => a - b);
console.log('引用的 tile 索引:');
console.log(sortedTileIndices.map(i => '0x' + i.toString(16).padStart(3, '0')).join(', '));

// ============================================================
// 搜索加载字体的代码
// ============================================================
console.log('\n--- 搜索加载字体的代码 ---');

const fontLoadPatterns = [
  { name: 'loadResource', pattern: [0x20, 0x9C, 0xC7, 0x00] },
  { name: 'loadResource 0x8001', pattern: [0x30, 0x20, 0x01, 0x80] },
];

for (const { name, pattern } of fontLoadPatterns) {
  const hits = [];
  for (let off = 0; off < rom.length - pattern.length; off++) {
    let match = true;
    for (let i = 0; i < pattern.length; i++) {
      if (rom[off + i] !== pattern[i]) { match = false; break; }
    }
    if (match) hits.push(off);
  }
  console.log(`${name}: ${hits.length} 处引用`);
  hits.slice(0, 5).forEach(h => console.log(`  ${hex(h)}`));
}

// ============================================================
// 查找所有可能的字体资源
// ============================================================
console.log('\n--- 查找所有可能的字体资源 ---');

const fontCandidates = [];

for (let entry = 0; entry < 512; entry++) {
  const ptr = RL(RESOURCE_TABLE + entry * 4);
  if (ptr < 0x0B0000 || ptr >= rom.length) continue;
  
  const type = RB(ptr);
  let size = 0;
  let tileCount = 0;
  
  try {
    if (type === 3) {
      size = RW(ptr + 1);
      tileCount = Math.floor(size / 32);
    } else if (type === 2) {
      const planes = RB(ptr + 1) & 0x7F;
      const sz = RW(ptr + 2);
      size = sz * planes * 8;
      tileCount = Math.floor(size / 32);
    }
    
    if (tileCount > 0 && tileCount <= 512) {
      fontCandidates.push({ entry, type, ptr, size, tileCount });
    }
  } catch(e) {}
}

fontCandidates.sort((a, b) => a.tileCount - b.tileCount);

console.log(`找到 ${fontCandidates.length} 个可能的字体资源:`);
fontCandidates.slice(0, 20).forEach(c => {
  console.log(`  Entry ${c.entry.toString().padStart(3)}: type=${c.type}, tiles=${c.tileCount}, size=${c.size}`);
});

// ============================================================
// 查看资源0x8001加载后的VRAM地址
// ============================================================
console.log('\n--- 查看资源0x8001加载后的VRAM地址 ---');

const vramLoadPattern = [0x30, 0x20, 0x01, 0x80];
for (let off = 0; off < rom.length - 10; off++) {
  let match = true;
  for (let i = 0; i < vramLoadPattern.length; i++) {
    if (rom[off + i] !== vramLoadPattern[i]) { match = false; break; }
  }
  if (match) {
    const vramAddr = (rom[off - 4] << 8) | rom[off - 3];
    console.log(`在 ${hex(off)} 发现资源 0x8001 加载, VRAM地址=${hex(vramAddr, 4)}`);
    
    const context = rom.slice(off - 16, off + 16);
    console.log(`  上下文: ${Array.from(context).map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
  }
}

// ============================================================
// 提取多个资源的字体数据
// ============================================================
console.log('\n--- 提取多个资源的字体数据 ---');

const resourcesToCheck = [0x8001, 0x8002, 0x8003, 0x8004, 0x8005, 0x8100, 0x8200, 0x8300];

const allTiles = new Map();

for (const id of resourcesToCheck) {
  const res = loadResource(id);
  if (!res) {
    console.log(`资源 ${hex(id)}: 无法加载`);
    continue;
  }
  
  const tileCount = Math.floor(res.size / 32);
  console.log(`资源 ${hex(id)}: ${tileCount} 个 tile`);
  
  for (let i = 0; i < tileCount; i++) {
    const tileBytes = res.data.slice(i * 32, i * 32 + 32);
    if (!allTiles.has(id)) allTiles.set(id, []);
    allTiles.get(id).push(tileBytes);
  }
}

// ============================================================
// 分析文字文本区 (ROM 0x0C0000)
// ============================================================
console.log('\n--- 分析文字文本区 (ROM 0x0C0000) ---');

const TEXT_REGION_START = 0x0C0000;
const TEXT_REGION_SIZE = 0x40000;

const sjisBlocks = [];
let inBlock = false;
let blockStart = 0;
let sjisCount = 0;

for (let i = 0; i < TEXT_REGION_SIZE - 1; i++) {
  const b1 = rom[TEXT_REGION_START + i];
  const isSJISLead = (b1 >= 0x81 && b1 <= 0x9F) || (b1 >= 0xE0 && b1 <= 0xFC);
  
  if (isSJISLead) {
    sjisCount++;
    if (!inBlock) {
      inBlock = true;
      blockStart = i;
    }
    i++;
  } else if (inBlock) {
    if (sjisCount >= 10) {
      sjisBlocks.push({ start: TEXT_REGION_START + blockStart, end: TEXT_REGION_START + i, count: sjisCount });
    }
    inBlock = false;
    sjisCount = 0;
  }
}

sjisBlocks.sort((a, b) => b.count - a.count);

console.log(`找到 ${sjisBlocks.length} 个 SJIS 文本块`);
sjisBlocks.slice(0, 10).forEach(b => {
  console.log(`  ${hex(b.start)}-${hex(b.end)}: ${b.count}个SJIS字符`);
  
  const sample = rom.slice(b.start, Math.min(b.start + 32, b.end));
  const sampleStr = [];
  for (let i = 0; i < sample.length; i++) {
    const b1 = sample[i];
    if ((b1 >= 0x81 && b1 <= 0x9F) || (b1 >= 0xE0 && b1 <= 0xFC)) {
      sampleStr.push(`[${b1.toString(16)} ${(i+1 < sample.length ? sample[i+1] : 0).toString(16)}]`);
      i++;
    } else if (b1 >= 0x20 && b1 <= 0x7E) {
      sampleStr.push(String.fromCharCode(b1));
    } else if (b1 === 0) {
      sampleStr.push('.');
    } else {
      sampleStr.push(`<${b1.toString(16)}>`);
    }
  }
  console.log(`  内容预览: ${sampleStr.join('')}`);
});

// ============================================================
// 查找章节标题文本
// ============================================================
console.log('\n--- 查找章节标题文本 ---');

const chapterKeywords = [
  [0x83, 0x63],
  [0x83, 0x55],
  [0x83, 0x56],
];

for (const keyword of chapterKeywords) {
  const hits = [];
  for (let off = TEXT_REGION_START; off < TEXT_REGION_START + TEXT_REGION_SIZE - 2; off++) {
    if (rom[off] === keyword[0] && rom[off + 1] === keyword[1]) {
      hits.push(off);
    }
  }
  console.log(`关键字 [${keyword.map(b => b.toString(16)).join(' ')}]: ${hits.length} 处`);
  hits.slice(0, 5).forEach(h => {
    const context = rom.slice(h, h + 20);
    const str = [];
    for (let i = 0; i < context.length; i++) {
      const b1 = context[i];
      if ((b1 >= 0x81 && b1 <= 0x9F) || (b1 >= 0xE0 && b1 <= 0xFC)) {
        str.push(`[${b1.toString(16)} ${(i+1 < context.length ? context[i+1] : 0).toString(16)}]`);
        i++;
      } else if (b1 >= 0x20 && b1 <= 0x7E) {
        str.push(String.fromCharCode(b1));
      } else {
        str.push(`.`);
      }
    }
    console.log(`  ${hex(h)}: ${str.join('')}`);
  });
}

console.log('\n=== 追踪完成 ===');
