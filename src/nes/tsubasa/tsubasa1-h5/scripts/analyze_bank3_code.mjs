/**
 * Bank 3 数据深度分析
 * 通过追踪代码访问模式来定位数据结构
 * 用法: node scripts/analyze_bank3_code.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const PRG_BULK = join(PROJECT_ROOT, 'src', 'data', 'raw', 'prg_bulk.json');

function loadBank(id) {
  const bulk = JSON.parse(readFileSync(PRG_BULK, 'utf-8'));
  const entry = bulk.find(e => e.bankId === id);
  return Uint8Array.from(Buffer.from(entry.base64, 'base64'));
}

function read16LE(data, offset) { return data[offset] | (data[offset + 1] << 8); }

const bank3 = loadBank(3);

console.log('═'.repeat(60));
console.log('  Bank 3 — 代码流分析 + 数据表定位');
console.log('═'.repeat(60));

// ==================== 1. 跳转表分析 ====================
console.log('\n📋 跳转表 ($8000-$8017):');
const jumpTargets = [];
for (let i = 0; i < 8; i++) {
  const offset = i * 3;
  if (bank3[offset] === 0x4C) {
    const target = read16LE(bank3, offset + 1);
    jumpTargets.push({ entry: i, offset, target });
    console.log(`  Sub ${i}: JMP $${target.toString(16).toUpperCase().padStart(4,'0')} → ROM $${(target-0x8000).toString(16).toUpperCase().padStart(4,'0')}`);
  }
}

// ==================== 2. 追踪代码中的数据访问 ====================
console.log('\n🔍 代码段数据访问分析:');

// 分析每个跳转目标的代码，查找内存访问模式
function analyzeCodeAt(startAddr, depth = 0) {
  const startOffset = startAddr - 0x8000;
  if (startOffset < 0 || startOffset >= bank3.length) return [];
  
  const accesses = [];
  const visited = new Set();
  const queue = [{ offset: startOffset, depth }];
  const MAX_TRACE = 200;
  let count = 0;
  
  while (queue.length > 0 && count < MAX_TRACE) {
    const { offset, depth } = queue.shift();
    if (visited.has(offset) || offset >= bank3.length - 1) continue;
    visited.add(offset);
    count++;
    
    const b = bank3[offset];
    const next1 = bank3[offset + 1];
    const next2 = bank3[offset + 2];
    
    // LDA abs / STA abs → 可能访问数据表
    if ((b === 0xAD || b === 0x8D || b === 0xAE || b === 0x8E || b === 0xAC || b === 0x8C) && offset + 2 < bank3.length) {
      const absAddr = read16LE(bank3, offset + 1);
      if (absAddr >= 0x8000 && absAddr <= 0xBFFF) {
        accesses.push({
          type: b === 0xAD || b === 0xAE || b === 0xAC ? 'LDA' : 'STA',
          addr: absAddr,
          romOffset: absAddr - 0x8000,
          codeOffset: offset,
        });
      }
    }
    
    // LDA (indirect),Y → 通过指针访问
    if (b === 0xB1 && offset + 1 < bank3.length) {
      // 记录间接访问，但需要追踪指针来源
    }
    
    // LDA zp,X / LDA abs,X / LDA abs,Y
    if ((b === 0xBD || b === 0xB9) && offset + 2 < bank3.length) {
      const absAddr = read16LE(bank3, offset + 1);
      if (absAddr >= 0x8000 && absAddr <= 0xBFFF) {
        accesses.push({
          type: 'LDA_INDEXED',
          addr: absAddr,
          romOffset: absAddr - 0x8000,
          codeOffset: offset,
        });
      }
    }
    
    // JSR → 追踪子程序
    if (b === 0x20 && offset + 2 < bank3.length) {
      const subAddr = read16LE(bank3, offset + 1);
      if (subAddr >= 0x8000 && subAddr < 0xC000) {
        queue.push({ offset: subAddr - 0x8000, depth: depth + 1 });
      }
    }
    
    // JMP → 追踪跳转
    if (b === 0x4C && offset + 2 < bank3.length) {
      const jmpAddr = read16LE(bank3, offset + 1);
      if (jmpAddr >= 0x8000 && jmpAddr < 0xC000) {
        queue.push({ offset: jmpAddr - 0x8000, depth: depth + 1 });
        continue; // 不继续当前路径
      }
    }
    
    // 条件分支 (BEQ/BNE/BCC/BCS/BMI/BPL/BVC/BVS) → 追踪两条路径
    if ((b & 0x1F) === 0x10 || (b & 0x1F) === 0x30 || b === 0x50 || b === 0x70 || b === 0x90 || b === 0xB0) {
      const branchTarget = offset + 2 + (bank3[offset + 1] < 128 ? bank3[offset + 1] : bank3[offset + 1] - 256);
      if (branchTarget >= 0 && branchTarget < bank3.length) {
        queue.push({ offset: branchTarget, depth });
      }
      queue.push({ offset: offset + 2, depth });
      continue;
    }
    
    // RTS → 停止
    if (b === 0x60) continue;
    
    // 否则继续顺序执行
    if (b !== 0x4C && b !== 0x6C && b !== 0x40) {
      queue.push({ offset: offset + (b === 0x20 ? 3 : (b >= 0xAD && b <= 0xBF ? 3 : 2)), depth });
    }
  }
  
  return accesses;
}

const allAccesses = [];
for (const jt of jumpTargets) {
  const accesses = analyzeCodeAt(jt.target);
  if (accesses.length > 0) {
    console.log(`\n  Sub ${jt.entry} ($${jt.target.toString(16).toUpperCase()}):`);
    // 去重并按地址排序
    const unique = [];
    const seen = new Set();
    for (const a of accesses) {
      const key = `${a.addr}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(a);
        allAccesses.push(a);
      }
    }
    unique.sort((a, b) => a.romOffset - b.romOffset);
    for (const a of unique.slice(0, 10)) {
      console.log(`    ${a.type} $${a.addr.toString(16).toUpperCase().padStart(4,'0')} (ROM $${a.romOffset.toString(16).toUpperCase().padStart(4,'0')})`);
    }
    if (unique.length > 10) console.log(`    ... 共 ${unique.length} 个访问点`);
  }
}

// ==================== 3. 最常访问的数据区域 ====================
console.log('\n📊 数据区域访问频率:');

const regionFreq = new Map();
for (const a of allAccesses) {
  const region = Math.floor(a.romOffset / 256) * 256;
  const key = `${region.toString(16).toUpperCase().padStart(4,'0')}`;
  regionFreq.set(key, (regionFreq.get(key) || 0) + 1);
}

const sortedRegions = Array.from(regionFreq.entries())
  .sort((a, b) => b[1] - a[1]);

for (const [region, count] of sortedRegions.slice(0, 15)) {
  const bar = '█'.repeat(Math.min(count, 40));
  console.log(`  ROM $${region}: ${count} 次访问 ${bar}`);
}

// ==================== 4. 扫描玩家数据候选区域 ====================
console.log('\n🎮 玩家数据候选区域扫描:');

// 在访问频率最高的区域中搜索
for (const [region, count] of sortedRegions.slice(0, 10)) {
  const regionStart = parseInt(region, 16);
  if (regionStart < 0x100 || regionStart > 0x3F00) continue; // 跳过代码段
  
  console.log(`\n  ROM $${region} (CPU $${(regionStart + 0x8000).toString(16).toUpperCase()}):`);
  
  // Hexdump前64字节
  for (let row = 0; row < 4; row++) {
    const offset = regionStart + row * 16;
    const bytes = Array.from(bank3.slice(offset, offset + 16))
      .map(b => b.toString(16).toUpperCase().padStart(2, '0'));
    console.log(`    $${offset.toString(16).toUpperCase().padStart(4,'0')}: ${bytes.join(' ')}`);
  }
  
  // 尝试识别结构
  const firstBytes = Array.from(bank3.slice(regionStart, regionStart + 64));
  const avg = firstBytes.reduce((a, b) => a + b, 0) / firstBytes.length;
  const nonZero = firstBytes.filter(b => b !== 0).length;
  const inRange = firstBytes.filter(b => b >= 10 && b <= 99).length;
  console.log(`    平均: ${avg.toFixed(1)} | 非零: ${nonZero}/64 | 10-99范围: ${inRange}/64`);
}

// ==================== 5. 末尾数据表 ====================
console.log('\n📋 Bank 3 末尾数据区域 ($3D00-$3FFF):');
for (let offset = 0x3D00; offset < 0x4000; offset += 16) {
  const bytes = Array.from(bank3.slice(offset, offset + 16))
    .map(b => b.toString(16).toUpperCase().padStart(2, '0'));
  console.log(`  $${offset.toString(16).toUpperCase()}: ${bytes.join(' ')}`);
}

console.log('\n' + '═'.repeat(60));
console.log('  分析完成');
console.log('═'.repeat(60));
