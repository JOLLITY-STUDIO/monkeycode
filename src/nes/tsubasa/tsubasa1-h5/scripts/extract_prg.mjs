/**
 * ROM数据提取脚本
 * 从 .nes 文件中提取所有 PRG Bank 数据
 * 生成 TypeScript 结构化数据文件
 * 
 * 用法: node scripts/extract_prg.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const NES_FILE = join(PROJECT_ROOT, '_tmp_disasm_out', 'Captain Tsubasa (Japan).nes');
const OUTPUT_DIR = join(PROJECT_ROOT, 'src', 'data', 'raw');

const PRG_BANK_SIZE = 0x4000; // 16KB
const TOTAL_PRG_BANKS = 8;

/**
 * NES文件格式:
 * Header: 16 bytes
 *   [0-3]: "NES\x1A"
 *   [4]: PRG ROM count (×16KB)
 *   [5]: CHR ROM count (×8KB)
 *   [6]: Mapper low nibble + flags
 *   [7]: Mapper high nibble + flags
 *   [8-15]: Reserved
 * 
 * PRG ROM: $10 + (PRG_COUNT * 0x4000)
 * CHR ROM: after PRG ROM
 */
function parseNesHeader(buffer) {
  if (buffer[0] !== 0x4E || buffer[1] !== 0x45 || buffer[2] !== 0x53 || buffer[3] !== 0x1A) {
    throw new Error('无效的NES文件 (缺少NES\x1A签名)');
  }
  
  const prgCount = buffer[4];
  const chrCount = buffer[5];
  const mapperLo = (buffer[6] >> 4) & 0x0F;
  const mapperHi = buffer[7] & 0xF0;
  const mapper = mapperLo | mapperHi;
  
  return {
    prgCount,
    chrCount,
    mapper,
    mirrorV: !!(buffer[6] & 1),
    hasBattery: !!(buffer[6] & 2),
    hasTrainer: !!(buffer[6] & 4),
  };
}

/**
 * 将二进制数据格式化为 TypeScript 数组字符串
 */
function formatUint8Array(data, bytesPerLine = 16) {
  const lines = [];
  for (let i = 0; i < data.length; i += bytesPerLine) {
    const chunk = data.slice(i, i + bytesPerLine);
    const hex = Array.from(chunk)
      .map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0'))
      .join(', ');
    lines.push(`    ${hex},`);
  }
  return lines.join('\n');
}

// 不再生成巨大的TS数组文件，改为紧凑base64格式

/**
 * 从指定地址读取字节 (用于ROM数据提取时的交叉引用)
 */
function readByte(prgData, cpuAddr) {
  const offset = cpuAddr & 0x3FFF;
  if (offset >= prgData.length) return 0;
  return prgData[offset];
}

/**
 * 提取Bank 3中的球员数据并生成PlayerTable
 */
function extractPlayerData(allPrgBanks) {
  // Bank 3 球员数据在 ROM 偏移 $0C010-$0FFFF, CPU $8000-$BFFF
  // 具体数据结构待进一步分析
  console.log('[extract_prg] Bank 3 球员数据提取 (占位)');
  
  // 球员数据起始位置 (需要从ASM中确认)
  // 根据ROM分析报告，Bank 3包含球员能力值、必杀技、球队阵容
  // 这里先记录占位
}

/**
 * 提取Bank 7中的文本/事件脚本数据 (占位)
 */
function extractTextData(allPrgBanks) {
  console.log('[extract_prg] Bank 7 文本/事件数据提取 (占位)');
}

/**
 * 主函数
 */
function main() {
  console.log('[extract_prg] 读取NES ROM...');
  const nesBuffer = readFileSync(NES_FILE);
  console.log(`[extract_prg] 文件大小: ${nesBuffer.length} 字节`);
  
  const header = parseNesHeader(nesBuffer);
  console.log(`[extract_prg] PRG Banks: ${header.prgCount} × 16KB = ${header.prgCount * 16}KB`);
  console.log(`[extract_prg] CHR Banks: ${header.chrCount} × 8KB = ${header.chrCount * 8}KB`);
  
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const allPrgBanks = [];
  for (let b = 0; b < header.prgCount; b++) {
    const offset = 16 + b * PRG_BANK_SIZE;
    const prgData = nesBuffer.slice(offset, offset + PRG_BANK_SIZE);
    allPrgBanks.push(prgData);
  }
  
  // 生成紧凑base64 JSON文件 (供HTML/运行时加载)
  const bulkData = [];
  for (let b = 0; b < header.prgCount; b++) {
    bulkData.push({
      bankId: b,
      size: allPrgBanks[b].length,
      base64: Buffer.from(allPrgBanks[b]).toString('base64'),
    });
  }
  
  const bulkFile = join(OUTPUT_DIR, 'prg_bulk.json');
  writeFileSync(bulkFile, JSON.stringify(bulkData, null, 2), 'utf-8');
  console.log(`[extract_prg] JSON打包: prg_bulk.json (${(Buffer.byteLength(JSON.stringify(bulkData)) / 1024).toFixed(1)}KB)`);
  
  // 生成TS Loader (紧凑格式，解码base64)
  const loaderLines = [];
  loaderLines.push('/**');
  loaderLines.push(' * PRG Bank 数据加载器 (自动生成)');
  loaderLines.push(' * 从prg_bulk.json的base64数据初始化解码');
  loaderLines.push(' */');
  loaderLines.push('');
  loaderLines.push(`export const PRG_BANK_COUNT = ${header.prgCount};`);
  loaderLines.push(`export const PRG_BANK_SIZE = ${PRG_BANK_SIZE};`);
  loaderLines.push('');
  loaderLines.push('const _banks: Uint8Array[] = [];');
  loaderLines.push('');
  loaderLines.push('/** 获取PRG Bank原始数据 */');
  loaderLines.push('export function getPrgBank(bankId: number): Uint8Array | null {');
  loaderLines.push('  return _banks[bankId] ?? null;');
  loaderLines.push('}');
  loaderLines.push('');
  loaderLines.push('/** 读取PRG Bank中指定偏移的字节 */');
  loaderLines.push('export function prgBankRead(bankId: number, offset: number): number {');
  loaderLines.push('  const bank = _banks[bankId];');
  loaderLines.push('  return bank?.[offset & 0x3FFF] ?? 0;');
  loaderLines.push('}');
  loaderLines.push('');
  loaderLines.push('/** 读取16位值 (little-endian) */');
  loaderLines.push('export function prgBankRead16(bankId: number, offset: number): number {');
  loaderLines.push('  const lo = prgBankRead(bankId, offset);');
  loaderLines.push('  const hi = prgBankRead(bankId, offset + 1);');
  loaderLines.push('  return lo | (hi << 8);');
  loaderLines.push('}');
  loaderLines.push('');
  loaderLines.push('/** 从CPU地址读取 (Bank 7 @ $C000-$FFFF) */');
  loaderLines.push('export function prgCpuRead(bankId: number, cpuAddr: number): number {');
  loaderLines.push('  const offset = cpuAddr & 0x3FFF;');
  loaderLines.push('  return prgBankRead(bankId, cpuAddr >= 0xC000 ? cpuAddr - 0x8000 : cpuAddr - 0x8000);');
  loaderLines.push('}');
  loaderLines.push('');
  loaderLines.push('/** 初始化PRG数据 (从base64解码) */');
  loaderLines.push('export function initPrgBanks(banks: { bankId: number; base64: string }[]): void {');
  loaderLines.push('  for (const entry of banks) {');
  loaderLines.push('    const binary = atob(entry.base64);');
  loaderLines.push('    const data = new Uint8Array(entry.size);');
  loaderLines.push('    for (let i = 0; i < entry.size; i++) {');
  loaderLines.push('      data[i] = binary.charCodeAt(i);');
  loaderLines.push('    }');
  loaderLines.push('    _banks[entry.bankId] = data;');
  loaderLines.push('  }');
  loaderLines.push('}');
  loaderLines.push('');
  
  const loaderFile = join(OUTPUT_DIR, 'PrgLoader.ts');
  writeFileSync(loaderFile, loaderLines.join('\n'), 'utf-8');
  console.log(`[extract_prg] TS Loader: PrgLoader.ts`);
  
  // 统计
  console.log('\n[extract_prg] Bank数据统计:');
  for (let b = 0; b < header.prgCount; b++) {
    let nonZero = 0;
    for (let i = 0; i < allPrgBanks[b].length; i++) {
      if (allPrgBanks[b][i] !== 0) nonZero++;
    }
    console.log(`  Bank ${b}: ${allPrgBanks[b].length}B, 非零${nonZero}B (${(nonZero/allPrgBanks[b].length*100).toFixed(1)}%)`);
  }
  
  console.log(`\n[extract_prg] ✅ 完成! 输出目录: ${OUTPUT_DIR}`);
}

main();
