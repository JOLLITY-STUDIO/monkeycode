/**
 * 从 Bank 12 ROM 提取 $8754 时序表指针及对应的子表数据
 * 用法: npx tsx _extract_timing.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { NES_PRG_ROM } from '../rom-data/index';

const B12_OFF = 12 * 0x2000;
const BANK12_DATA = NES_PRG_ROM.slice(B12_OFF, B12_OFF + 0x2000);

const TIMING_TBL = 0x8754; // $8754 pointer table base

function b12Index(addr: number): number {
  return (addr - 0x8000);
}

function read16(addr: number): number {
  const i = b12Index(addr);
  return BANK12_DATA[i] | (BANK12_DATA[i + 1] << 8);
}

// 1. 解析 $8754 指针表 — 持续读到数据不再是 Bank 12 地址范围
const ptrs: Array<{ idx: number; addr: number; lo: number; hi: number }> = [];
for (let i = 0; i < 64; i++) {
  const tblAddr = TIMING_TBL + i * 2;
  const ptr = read16(tblAddr);
  if (ptr < 0x8700 || ptr >= 0xA000) break; // 不在 Bank 12 数据区
  ptrs.push({ idx: i, addr: ptr, lo: BANK12_DATA[b12Index(tblAddr)], hi: BANK12_DATA[b12Index(tblAddr) + 1] });
}

console.log(`Found ${ptrs.length} timing table pointers at $8754:`);
for (const p of ptrs) {
  console.log(`  idx ${String(p.idx).padStart(2)}: $${p.addr.toString(16).toUpperCase()} ($${p.lo.toString(16)}, $${p.hi.toString(16)})`);
}

// 2. 提取每个指针指向的子表数据（字节对直到遇到 $FF 或 $00）
// 子表格式: [durLo, durHi] × N, 以 $FF 终止（$FF 后的字节是下一个子表的开始）
// durLo 是下一个音符的帧数低字节
// durHi 是下一个音符的 duration_hi(也是音量计算用的值)

// 收集所有指针的目标地址
const targetAddrs = ptrs.map(p => p.addr).sort((a, b) => a - b);

const subTables: Map<number, number[][]> = new Map();

for (let i = 0; i < targetAddrs.length; i++) {
  const startAddr = targetAddrs[i];
  const endAddr = i + 1 < targetAddrs.length ? targetAddrs[i + 1] : 0xA000;
  const pairs: number[][] = [];
  
  for (let addr = startAddr; addr < endAddr && addr < 0xA000; addr += 2) {
    const lo = BANK12_DATA[b12Index(addr)];
    if (lo === 0xFF) break; // 终止符
    const hi = BANK12_DATA[b12Index(addr + 1)];
    if (hi === 0xFF) {
      // 单个字节终止，把 lo 当作最后一个值
      pairs.push([lo, 0]);
      break;
    }
    pairs.push([lo, hi]);
  }
  
  subTables.set(startAddr, pairs);
}

// 3. 输出为 TypeScript 常量
const outLines: string[] = [
  '/**',
  ' * Bank 12 时序子表 — 从 prg-bank-12.ts 自动提取',
  ' * 由 $8754 指针表索引，格式 [durLo, durHi][]',
  ' * durLo: 下一音符帧数（低字节）',
  ' * durHi: 下一音符音量衰减基准值',
  ' */',
  '',
  `// $8754 指针表 — ${ptrs.length} entries`,
  'export const TIMING_TBL_PTRS: readonly number[] = [',
];
for (const p of ptrs) {
  outLines.push(`  0x${p.lo.toString(16).padStart(2, '0')}, 0x${p.hi.toString(16).padStart(2, '0')},  // idx ${p.idx}: $${p.addr.toString(16).toUpperCase()}`);
}
outLines.push('];', '');

outLines.push('// 时序子表数据 — 按 idx 索引');
outLines.push('export const TIMING_SUB_TABLES: readonly (readonly number[][])[] = [');
for (let idx = 0; idx < ptrs.length; idx++) {
  const addr = ptrs.find(p => p.idx === idx)?.addr;
  const pairs = addr ? subTables.get(addr) : null;
  if (!pairs || pairs.length === 0) {
    outLines.push(`  [],  // idx ${idx}: $$${addr?.toString(16).toUpperCase() ?? '???'} — 无数据`);
    continue;
  }
  const hexPairs = pairs.map(p => `[0x${p[0].toString(16).padStart(2, '0')}, 0x${p[1].toString(16).padStart(2, '0')}]`).join(', ');
  outLines.push(`  /* ${String(idx).padStart(2)} */ [${hexPairs}],`);
}
outLines.push('];');

const outPath = path.join(__dirname, '_timing_data.ts');
fs.writeFileSync(outPath, outLines.join('\n'), 'utf-8');
console.log(`\nOutput written to ${outPath}`);
console.log(`Sub-tables count: ${subTables.size}`);
for (const [addr, pairs] of subTables) {
  console.log(`  $${addr.toString(16).toUpperCase()}: ${pairs.length} pairs`);
}
