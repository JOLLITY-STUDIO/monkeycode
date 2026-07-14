/**
 * 解析资源加载表并提取开场动画资源数据
 * 1. 解析 0x19efba 资源表 (场景数据 [+0x00])
 * 2. 解析 0x19f162 资源表 (场景数据 [+0x10])
 * 3. 检查每个资源的 ROM 数据
 * 4. 识别 tile/CRAM/nametable 数据
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function rb(o) { return rom[o] & 0xff; }
function rw(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function rl(o) { return (((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff)) >>> 0; }

// ============================================================
// 1. 解析资源表函数
// ============================================================
function parseResourceTable(tableAddr, label) {
  console.log(`\n=== ${label} (0x${tableAddr.toString(16)}) ===\n`);
  
  const entries = [];
  let pos = tableAddr;
  
  for (let i = 0; i < 30; i++) {
    const cmd = rb(pos);
    if (cmd === 0xff && rb(pos + 1) === 0xff) {
      console.log(`  [${i}] END (0xFF 0xFF)`);
      break;
    }
    
    const p0 = rb(pos + 1);
    const p1 = rb(pos + 2);
    const p2 = rb(pos + 3);
    const addr = rl(pos + 4);
    
    console.log(`  [${i}] cmd=0x${cmd.toString(16).padStart(2,'0')} params=[0x${p0.toString(16)} 0x${p1.toString(16)} 0x${p2.toString(16)}] addr=0x${addr.toString(16)}`);
    
    entries.push({ index: i, cmd, params: [p0, p1, p2], addr, tableAddr: pos });
    pos += 8;
  }
  
  return entries;
}

// ============================================================
// 2. 检查资源数据函数
// ============================================================
function checkResourceData(addr, label) {
  if (addr < 0 || addr >= rom.length) {
    console.log(`    地址无效`);
    return;
  }
  
  // 显示前 64 字节
  console.log(`    数据 (前 64B):`);
  for (let i = 0; i < 64; i += 16) {
    let hex = '';
    let ascii = '';
    for (let j = 0; j < 16; j++) {
      const b = rb(addr + i + j);
      hex += b.toString(16).padStart(2, '0') + ' ';
      ascii += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
    }
    console.log(`      0x${(addr + i).toString(16)}: ${hex} ${ascii}`);
  }
  
  // 检查是否是 LZSS 压缩数据 (以 0x20 开头?)
  const b0 = rb(addr);
  const b1 = rb(addr + 1);
  
  // 检查是否是 tile 数据 (32B/tile, 4bpp)
  // 检查是否是 CRAM 数据 (128B, 64 colors × 2B)
  // 检查是否是 nametable (4096B, 64×32 × 2B)
  
  // 统计数据特征
  let nonZero = 0;
  let uniqueBytes = new Set();
  for (let i = 0; i < 256 && addr + i < rom.length; i++) {
    const b = rb(addr + i);
    if (b !== 0) nonZero++;
    uniqueBytes.add(b);
  }
  
  console.log(`    特征: 非零字节=${nonZero}/256, 唯一字节数=${uniqueBytes.size}`);
  
  // 尝试识别数据类型
  if (b0 === 0x20) {
    console.log(`    可能是 LZSS 压缩数据 (开头 0x20)`);
  } else if (nonZero > 240) {
    console.log(`    可能是密集数据 (tile 或 nametable)`);
  } else if (nonZero < 10) {
    console.log(`    可能是稀疏数据或指针表`);
  }
}

// ============================================================
// 3. 解析所有资源表
// ============================================================

// 0x19efa2 场景数据的 8 个指针
console.log('=== 场景数据 0x19efa2 的 8 个指针 ===\n');
const scenePtrs = [];
for (let i = 0; i < 8; i++) {
  const ptr = rl(0x19efa2 + i * 4);
  scenePtrs.push(ptr);
  console.log(`  [+0x${(i*4).toString(16).padStart(2,'0')}] → 0x${ptr.toString(16)}`);
}

// 解析每个指针指向的资源表
for (let i = 0; i < 8; i++) {
  const ptr = scenePtrs[i];
  if (ptr === 0x1b0600ff) {
    console.log(`\n  [+0x${(i*4).toString(16).padStart(2,'0')}] 0x${ptr.toString(16)} - 特殊值，跳过`);
    continue;
  }
  if (ptr > 0 && ptr < rom.length && ptr > 0x10000) {
    const entries = parseResourceTable(ptr, `资源表 [+0x${(i*4).toString(16).padStart(2,'0')}]`);
    
    // 检查前几个条目的数据
    for (const e of entries.slice(0, 3)) {
      checkResourceData(e.addr, `条目 [${e.index}]`);
    }
  }
}

// ============================================================
// 4. 特别检查主脚本中 cmd 0x37 引用的资源
// ============================================================
console.log('\n=== 主脚本 cmd 0x37 资源 ID 对应 ===\n');

// 主脚本中的资源 ID: 0x15, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e, 0x2f
const targetIds = [0x15, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e, 0x2f];

// 在所有资源表中搜索这些 ID
for (let i = 0; i < 8; i++) {
  const ptr = scenePtrs[i];
  if (ptr === 0x1b0600ff || ptr === 0) continue;
  if (ptr < 0x10000 || ptr >= rom.length) continue;
  
  let pos = ptr;
  for (let j = 0; j < 30; j++) {
    const cmd = rb(pos);
    if (cmd === 0xff && rb(pos + 1) === 0xff) break;
    
    const id = rb(pos + 1);
    const addr = rl(pos + 4);
    
    if (targetIds.includes(id)) {
      console.log(`  资源 ID 0x${id.toString(16)}: 在表 [+0x${(i*4).toString(16)}] 条目 [${j}], cmd=0x${cmd.toString(16)}, addr=0x${addr.toString(16)}`);
      checkResourceData(addr, `资源 0x${id.toString(16)}`);
    }
    
    pos += 8;
  }
}

// ============================================================
// 5. 检查 0x19f3be 处的数据 (第一个资源表的第一个资源)
// ============================================================
console.log('\n=== 0x19f3be 详细检查 ===\n');

// 显示 256 字节
for (let i = 0; i < 256; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += rb(0x19f3be + i + j).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  0x${(0x19f3be + i).toString(16)}: ${hex}`);
}

// ============================================================
// 6. 检查资源数据的大小和类型
// ============================================================
console.log('\n=== 资源数据分析 ===\n');

// 从 0x19efba 表的所有资源
const table1Entries = [];
let pos = 0x19efba;
for (let i = 0; i < 10; i++) {
  const cmd = rb(pos);
  if (cmd === 0xff && rb(pos + 1) === 0xff) break;
  table1Entries.push({ cmd, id: rb(pos+1), addr: rl(pos+4) });
  pos += 8;
}

// 计算每个资源的大小 (到下一个资源地址的距离)
for (let i = 0; i < table1Entries.length; i++) {
  const e = table1Entries[i];
  const nextAddr = i + 1 < table1Entries.length ? table1Entries[i+1].addr : e.addr + 0x100;
  const size = nextAddr - e.addr;
  console.log(`  资源 0x${e.id.toString(16)}: addr=0x${e.addr.toString(16)}, size≈0x${size.toString(16)} (${size}B), cmd=0x${e.cmd.toString(16)}`);
  
  // 根据大小推断类型
  if (size === 128) {
    console.log(`    → 可能是 CRAM (64 colors × 2B)`);
  } else if (size === 4096) {
    console.log(`    → 可能是 Nametable (64×32 × 2B)`);
  } else if (size === 8192) {
    console.log(`    → 可能是 256 tiles (32B × 256)`);
  } else if (size < 100) {
    console.log(`    → 小数据，可能是配置或指针`);
  }
}
