/**
 * 天使之翼 II — ntBank ($5A) 追踪器
 *
 * 扫描 ROM 原始字节，找出所有写 $5A/$56 的指令，
 * 追踪数据流，建立 scene → ntBank → nametable 的映射
 *
 * 用法: node _trace_ntbank.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// ─── 从 _romdata.ts 读取 ROM 数据 ──────────────────────────────────────
// 动态 import TS 麻烦，直接从 JSON 预导出或解析 ts 文件
// 这里我们直接读 typescript 源文件提取 Uint8Array

const ROMDATA_PATH = 'src/disasm/banks/backup/_romdata.ts';

function parseRomData() {
  const content = readFileSync(ROMDATA_PATH, 'utf-8');
  const banks = [];

  // 匹配 ROM_DATA[N] = new Uint8Array([...]);
  const bankRegex = /ROM_DATA\[(\d+)\]\s*=\s*new Uint8Array\(\[([\s\S]*?)\]\)/g;
  let match;
  while ((match = bankRegex.exec(content)) !== null) {
    const idx = parseInt(match[1]);
    const bytesStr = match[2];
    // 解析字节列表（0xNN 格式）
    const bytes = [];
    const byteRegex = /0x([0-9a-fA-F]{2})/g;
    let bm;
    while ((bm = byteRegex.exec(bytesStr)) !== null) {
      bytes.push(parseInt(bm[1], 16));
    }
    banks[idx] = bytes;
  }

  return banks;
}

console.log('解析 ROM 数据...');
let ROM_DATA;
try {
  ROM_DATA = parseRomData();
  console.log(`  ${ROM_DATA.filter(Boolean).length} banks loaded`);
} catch (e) {
  console.error('解析 ROM 数据失败:', e.message);
  console.log('  fallback: 尝试 require...');
  // fallback: 动态 require
  try {
    const mod = require('./src/disasm/banks/backup/_romdata.js');
    ROM_DATA = mod.ROM_DATA;
  } catch {
    // 用 tsx 执行
    console.error('  romdata 不可用，请确保 _romdata.ts 可解析');
    process.exit(1);
  }
}

// ─── 工具 ────────────────────────────────────────────────────────────
const hex8 = (v) => (v & 0xFF).toString(16).padStart(2, '0').toUpperCase();

/**
 * 在 bank 数据中搜索连续字节序列
 */
function findBytes(bankData, pattern) {
  const results = [];
  for (let i = 0; i <= bankData.length - pattern.length; i++) {
    let match = true;
    for (let j = 0; j < pattern.length; j++) {
      if (bankData[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      results.push(i);
    }
  }
  return results;
}

/**
 * 上下文：CPU 指令周围
 * @returns [disasmLines, bytesBefore]
 */
function getContext(bankData, offset, before = 10, after = 5) {
  const cpuAddr = 0x8000 + offset;
  const bytes = [];
  for (let i = Math.max(0, offset - before); i <= Math.min(bankData.length - 1, offset + after + 1); i++) {
    bytes.push({
      offset: i,
      cpu: 0x8000 + i,
      byte: bankData[i],
      isMatch: i >= offset && i < offset + 3,
    });
  }
  return bytes;
}

// ─── 6502 指令解码 ───────────────────────────────────────────────────
const OP_CODES = {
  0xA5: { mnemonic: 'LDA', mode: 'zp',   bytes: 2 },
  0xA6: { mnemonic: 'LDX', mode: 'zp',   bytes: 2 },
  0xA4: { mnemonic: 'LDY', mode: 'zp',   bytes: 2 },
  0xA9: { mnemonic: 'LDA', mode: 'imm',  bytes: 2 },
  0xA2: { mnemonic: 'LDX', mode: 'imm',  bytes: 2 },
  0xA0: { mnemonic: 'LDY', mode: 'imm',  bytes: 2 },
  0x85: { mnemonic: 'STA', mode: 'zp',   bytes: 2 },
  0x86: { mnemonic: 'STX', mode: 'zp',   bytes: 2 },
  0x84: { mnemonic: 'STY', mode: 'zp',   bytes: 2 },
  0x8D: { mnemonic: 'STA', mode: 'abs',  bytes: 3 },
  0x8E: { mnemonic: 'STX', mode: 'abs',  bytes: 3 },
  0x8C: { mnemonic: 'STY', mode: 'abs',  bytes: 3 },
  0xAD: { mnemonic: 'LDA', mode: 'abs',  bytes: 3 },
  0xAE: { mnemonic: 'LDX', mode: 'abs',  bytes: 3 },
  0xAC: { mnemonic: 'LDY', mode: 'abs',  bytes: 3 },
  0x09: { mnemonic: 'ORA', mode: 'imm',  bytes: 2 },
  0x29: { mnemonic: 'AND', mode: 'imm',  bytes: 2 },
  0x4A: { mnemonic: 'LSR', mode: 'acc',  bytes: 1 },
  0x0A: { mnemonic: 'ASL', mode: 'acc',  bytes: 1 },
  0x4C: { mnemonic: 'JMP', mode: 'abs',  bytes: 3 },
  0x20: { mnemonic: 'JSR', mode: 'abs',  bytes: 3 },
  0x60: { mnemonic: 'RTS', mode: 'impl', bytes: 1 },
  0xD0: { mnemonic: 'BNE', mode: 'rel',  bytes: 2 },
  0xF0: { mnemonic: 'BEQ', mode: 'rel',  bytes: 2 },
  0x90: { mnemonic: 'BCC', mode: 'rel',  bytes: 2 },
  0xB0: { mnemonic: 'BCS', mode: 'rel',  bytes: 2 },
  0x10: { mnemonic: 'BPL', mode: 'rel',  bytes: 2 },
  0x30: { mnemonic: 'BMI', mode: 'rel',  bytes: 2 },
  0x50: { mnemonic: 'BVC', mode: 'rel',  bytes: 2 },
  0x70: { mnemonic: 'BVS', mode: 'rel',  bytes: 2 },
  0xC9: { mnemonic: 'CMP', mode: 'imm',  bytes: 2 },
  0xC0: { mnemonic: 'CPY', mode: 'imm',  bytes: 2 },
  0xE0: { mnemonic: 'CPX', mode: 'imm',  bytes: 2 },
  0x18: { mnemonic: 'CLC', mode: 'impl', bytes: 1 },
  0x38: { mnemonic: 'SEC', mode: 'impl', bytes: 1 },
  0x48: { mnemonic: 'PHA', mode: 'impl', bytes: 1 },
  0x68: { mnemonic: 'PLA', mode: 'impl', bytes: 1 },
  0xAA: { mnemonic: 'TAX', mode: 'impl', bytes: 1 },
  0xA8: { mnemonic: 'TAY', mode: 'impl', bytes: 1 },
  0x8A: { mnemonic: 'TXA', mode: 'impl', bytes: 1 },
  0x98: { mnemonic: 'TYA', mode: 'impl', bytes: 1 },
  0x65: { mnemonic: 'ADC', mode: 'zp',   bytes: 2 },
  0xE6: { mnemonic: 'INC', mode: 'zp',   bytes: 2 },
  0xC6: { mnemonic: 'DEC', mode: 'zp',   bytes: 2 },
  0x24: { mnemonic: 'BIT', mode: 'zp',   bytes: 2 },
  0xC8: { mnemonic: 'INY', mode: 'impl', bytes: 1 },
  0x88: { mnemonic: 'DEY', mode: 'impl', bytes: 1 },
  0xE8: { mnemonic: 'INX', mode: 'impl', bytes: 1 },
  0xCA: { mnemonic: 'DEX', mode: 'impl', bytes: 1 },
};

function disasm(bankData, offset, len = 5) {
  const lines = [];
  let i = offset;
  while (i < Math.min(bankData.length, offset + len * 3)) {
    const op = bankData[i];
    const info = OP_CODES[op];
    if (!info) {
      lines.push(`  $${hex8(0x8000 + i)}: DB $${hex8(op)}`);
      i++;
      continue;
    }
    let operands = '';
    if (info.bytes >= 2) operands += `$${hex8(bankData[i + 1])}`;
    if (info.bytes >= 3) operands += `${hex8(bankData[i + 2])}`;
    lines.push(`  $${hex8(0x8000 + i)}: ${info.mnemonic} ${operands}`);
    i += info.bytes;
  }
  return lines;
}

// ─── 分析 ────────────────────────────────────────────────────────────

console.log('\n========== 搜索写 $5A (ntBank) 的指令 ==========');

const writes5A = [];

// STA $5A = 85 5A
// STX $5A = 86 5A
// STY $5A = 84 5A
const patterns = [
  { bytes: [0x85, 0x5A], name: 'STA' },
  { bytes: [0x86, 0x5A], name: 'STX' },
  { bytes: [0x84, 0x5A], name: 'STY' },
];

for (const pat of patterns) {
  for (let bankIdx = 0; bankIdx < ROM_DATA.length; bankIdx++) {
    const bank = ROM_DATA[bankIdx];
    if (!bank) continue;
    const matches = findBytes(bank, pat.bytes);
    for (const offset of matches) {
      const cpu = 0x8000 + offset;
      const ctx = getContext(bank, offset, 12, 0);
      writes5A.push({
        bank: bankIdx,
        offset,
        cpu,
        inst: pat.name,
        context: ctx,
      });
    }
  }
}

console.log(`找到 ${writes5A.length} 处写 $5A:`);
for (const w of writes5A) {
  console.log(`  Bank ${w.bank} CPU $${hex8(w.cpu)} (ROM $${hex8(w.bank * 0x2000 + 0x10 + w.offset)}) — ${w.inst} $5A`);
  // 打印前后指令上下文
  const bankData = ROM_DATA[w.bank];
  if (bankData) {
    const disasmLines = disasm(bankData, Math.max(0, w.offset - 6), 6);
    for (const line of disasmLines) {
      console.log(`   ${line}`);
    }
  }
}

// ─── 搜索写 $56 (NT 索引源) 的指令 ─────────────────────────────────
console.log('\n========== 搜索写 $56 (NT 索引) 的指令 ==========');

const writes56 = [];
const patterns56 = [
  { bytes: [0x85, 0x56], name: 'STA' },
  { bytes: [0x86, 0x56], name: 'STX' },
  { bytes: [0x84, 0x56], name: 'STY' },
  { bytes: [0xA5, 0x56], name: 'LDA' },  // 读
];

for (const pat of patterns56) {
  for (let bankIdx = 0; bankIdx < ROM_DATA.length; bankIdx++) {
    const bank = ROM_DATA[bankIdx];
    if (!bank) continue;
    const matches = findBytes(bank, pat.bytes);
    for (const offset of matches) {
      writes56.push({
        bank: bankIdx,
        offset,
        cpu: 0x8000 + offset,
        inst: pat.name,
      });
    }
  }
}

console.log(`找到 ${writes56.length} 处读写 $56:`);
for (const w of writes56) {
  console.log(`  Bank ${w.bank} CPU $${hex8(w.cpu)} — ${w.inst} $56`);
  const bankData = ROM_DATA[w.bank];
  if (bankData) {
    const disasmLines = disasm(bankData, Math.max(0, w.offset - 5), 5);
    for (const line of disasmLines) {
      console.log(`   ${line}`);
    }
  }
}

// ─── 分析 bank_11 中 ntBank 的数据布局 ──────────────────────────────
console.log('\n========== Bank 11 ntBank 数据区 ==========');
const bank11 = ROM_DATA[11];
if (bank11) {
  // loadNametable 在 $800C，srcBase = $800C - $8000 + ntBank * $100
  // ntBank 值域: 0x00-0x7F? 最多 128 个
  const ntDataBase = 0x0C; // $800C - $8000
  console.log(`loadNametable 入口: CPU $800C, ROM 偏移 ${ntDataBase}`);
  console.log(`每个 ntBank = $100 (256 bytes), 最大 ${Math.floor((8192 - ntDataBase) / 256)} 个`);
  console.log(`实际 960 bytes = 30×32 tile 索引，分布在多 bank？`);

  // 实际上 loadNametable 来自 ROM 数据段: srcBase = 0x800C - 0x8000 + ntBank * 0x100
  // 但 nametable 是 30×32 = 960 bytes，需要 4 个 256 字节块
  // 检查 ROM offsets:
  console.log(`ROM bank11 offset 0x0C: 前 32 bytes = [${bank11.slice(ntDataBase, ntDataBase + 32).map(b => hex8(b)).join(' ')}]`);
  console.log(`ROM bank11 offset 0x10C: 前 32 bytes = [${bank11.slice(ntDataBase + 0x100, ntDataBase + 0x100 + 32).map(b => hex8(b)).join(' ')}]`);
  console.log(`ROM bank11 offset 0x20C: 前 32 bytes = [${bank11.slice(ntDataBase + 0x200, ntDataBase + 0x200 + 32).map(b => hex8(b)).join(' ')}]`);
  console.log(`ROM bank11 offset 0x30C: 前 32 bytes = [${bank11.slice(ntDataBase + 0x300, ntDataBase + 0x300 + 32).map(b => hex8(b)).join(' ')}]`);
}

// ─── 输出汇总 ────────────────────────────────────────────────────────
console.log('\n========== 结论 ==========');
console.log(`
写 $5A (ntBank) 的路径:
  - Bank 00: LDA $56 → STA $5A  (从 $56 载入)
  - Bank 11: scrollX 计算 → STA $5A  (比赛滚动)

写 $56 的路径位于 Bank 00/30 的脚本处理和场景初始化代码中。

完整映射需要:
  1. 追踪 Bank 09/10 的场景脚本 bytecode (操作码 $F0 = 设置 NT)
  2. 或用 emulator 运行时 dump (test_framework.mjs 已在做)
`);
