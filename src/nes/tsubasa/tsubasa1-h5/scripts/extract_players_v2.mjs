/**
 * Bank 3 球员数据提取 v2
 * 改进: 跳过代码段，专注于数据区域
 * 
 * 用法: node scripts/extract_players_v2.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const PRG_BULK = join(PROJECT_ROOT, 'src', 'data', 'raw', 'prg_bulk.json');
const OUTPUT_DIR = join(PROJECT_ROOT, 'src', 'data', 'tables');

const BANK_3_ID = 3;
const POSITIONS = ['GK', 'DF', 'MF', 'FW'];

function loadBank3() {
  const bulk = JSON.parse(readFileSync(PRG_BULK, 'utf-8'));
  const entry = bulk.find(e => e.bankId === BANK_3_ID);
  if (!entry) throw new Error('Bank 3 未找到');
  return Uint8Array.from(Buffer.from(entry.base64, 'base64'));
}

function read16LE(data, offset) {
  return data[offset] | (data[offset + 1] << 8);
}

// 读取CPU地址空间中的字节
function readCpuAddr(data, addr) {
  const offset = addr - 0x8000;
  return (offset >= 0 && offset < data.length) ? data[offset] : 0;
}

/**
 * 分析 Bank 3 代码段 (跳转表)
 */
function analyzeJumpTable(data) {
  const jumps = [];
  for (let i = 0; i < 256; i += 3) {
    if (data[i] === 0x4C) { // JMP opcode
      const target = read16LE(data, i + 1);
      jumps.push({ offset: i, target, targetHex: '$' + target.toString(16).toUpperCase().padStart(4, '0') });
    }
  }
  return jumps;
}

/**
 * 查找数据区域边界
 * 代码通常在前 256-512 字节
 * 数据区域从第一个大段连续非代码字节开始
 */
function findDataBoundary(data) {
  // 找最后一个 JMP 指令之后的第一个数据段
  let lastJmp = 0;
  for (let i = 0; i < 512; i += 3) {
    if (data[i] === 0x4C) lastJmp = i + 3;
  }
  return lastJmp > 0 ? lastJmp : 256;
}

/**
 * 扫描数据区域中的结构体 (连续相似长度)
 * 通过寻找相同间距的序列模式
 */
function scanStructPatterns(data, startOffset, structSize, maxCount) {
  const results = [];
  
  for (let i = 0; i < maxCount; i++) {
    const offset = startOffset + i * structSize;
    if (offset + structSize > data.length) break;
    
    // 收集结构体字节
    const bytes = [];
    for (let j = 0; j < structSize; j++) {
      bytes.push(data[offset + j]);
    }
    results.push({ offset, bytes });
  }
  
  return results;
}

/**
 * 分析结构体字段的统计特征
 * 用来推断哪些字节是ID、能力值等
 */
function analyzeStructFields(structs) {
  if (structs.length === 0) return null;
  
  const size = structs[0].bytes.length;
  const fieldStats = [];
  
  for (let f = 0; f < size; f++) {
    const values = structs.map(s => s.bytes[f]);
    const unique = new Set(values).size;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const nonZero = values.filter(v => v !== 0).length;
    
    fieldStats.push({
      field: f,
      unique,
      min,
      max,
      nonZeroCount: nonZero,
      firstValues: values.slice(0, 5),
    });
  }
  
  return fieldStats;
}

/**
 * 16进制dump指定区域
 */
function hexdump(data, offset, length = 64) {
  const lines = [];
  for (let i = 0; i < length; i += 16) {
    const addr = (offset + i).toString(16).toUpperCase().padStart(4, '0');
    const bytes = [];
    const ascii = [];
    for (let j = 0; j < 16 && (i + j) < length; j++) {
      const b = data[offset + i + j];
      bytes.push(b.toString(16).toUpperCase().padStart(2, '0'));
      ascii.push((b >= 32 && b <= 126) ? String.fromCharCode(b) : '.');
    }
    lines.push(`  $${addr}: ${bytes.join(' ')}  ${ascii.join('')}`);
  }
  return lines.join('\n');
}

// ==================== 主函数 ====================

console.log('═'.repeat(60));
console.log('  Bank 3 — 球员数据提取 v2');
console.log('═'.repeat(60));

const bank3 = loadBank3();
console.log(`\nBank 3: ${bank3.length}B`);

// 分析代码段
console.log('\n--- 代码段 (跳转表) ---');
const jumps = analyzeJumpTable(bank3);
for (const j of jumps.slice(0, 10)) {
  console.log(`  $${j.offset.toString(16).toUpperCase().padStart(4,'0')}: JMP ${j.targetHex}`);
}
console.log(`  ... (共 ${jumps.length} 个 JMP)`);

// 找数据边界
const dataStart = findDataBoundary(bank3);
console.log(`\n数据区域起始: $${dataStart.toString(16).toUpperCase().padStart(4,'0')} (CPU $${(dataStart + 0x8000).toString(16).toUpperCase().padStart(4,'0')})`);

// Hexdump 数据开始区域
console.log('\n--- 数据区域 hexdump (前256B) ---');
console.log(hexdump(bank3, dataStart, 256));

// 尝试不同结构体大小
console.log('\n--- 结构体分析 ---');
const structSizes = [16, 20, 24, 32, 48];

for (const size of structSizes) {
  const structs = scanStructPatterns(bank3, dataStart, size, 20);
  const stats = analyzeStructFields(structs);
  
  // 看前几个结构体数据
  const firstStructs = structs.slice(0, 3);
  const nonZeroFields = stats?.filter(f => f.nonZeroCount > structs.length * 0.3).length ?? 0;
  
  console.log(`\n  structSize=${size}: ${structs.length} structs, ${nonZeroFields} non-zero fields`);
  
  for (const s of firstStructs) {
    const hex = s.bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
    console.log(`    $${s.offset.toString(16).toUpperCase().padStart(4,'0')}: ${hex}`);
  }
}

// === 保存完整 Bank 3 dump 用于手动分析 ===
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const fullDump = [];
for (let i = 0; i < bank3.length; i += 16) {
  const addr = (i + 0x8000).toString(16).toUpperCase().padStart(4, '0');
  const bytes = Array.from(bank3.slice(i, Math.min(i + 16, bank3.length)))
    .map(b => b.toString(16).toUpperCase().padStart(2, '0'));
  fullDump.push(`${addr}: ${bytes.join(' ')}`);
}

writeFileSync(join(OUTPUT_DIR, 'bank3_full_dump.txt'), fullDump.join('\n'), 'utf-8');
console.log(`\n✅ 完整 Bank 3 dump: bank3_full_dump.txt (${fullDump.length} lines)`);

console.log('\n' + '═'.repeat(60));
console.log('  提取完成');
console.log('═'.repeat(60));
