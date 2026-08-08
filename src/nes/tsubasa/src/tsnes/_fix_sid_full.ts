/**
 * 从 PRG Bank 13 提取 SID 0x3B 的完整 track 数据（包括 JUMP 目标）
 * npx tsx _fix_sid_full.ts
 */
import PRG_BANK_13 from './rom-data/prg-bank-13';

// Bank 13 maps to $8000-$BFFF → ROM offset = bank_addr - 0x8000
function readRom(addr: number): number {
  const offset = addr - 0x8000;
  if (offset >= 0 && offset < PRG_BANK_13.length) {
    return PRG_BANK_13[offset];
  }
  return 0;
}

function readBytes(start: number, len: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < len; i++) {
    result.push(readRom(start + i));
  }
  return result;
}

// init list 位置（在 ROM 中）
// ch3: 0x91F3, ch0: 0x91F4, ch1: 0x9230
// 接下来找到 JUMP 目标和后续数据

// 先看 0xB1F3 附近的数据（JUMP 目标）
console.log('=== 0xB1F0-0xB300 范围数据 ===');
const b1Data = readBytes(0xB1F0, 0x100);
console.log(hexdump(b1Data, 0xB1F0));

// 看 0x91F0-0x9300 范围（当前 track 数据+后面）
console.log('\n=== 0x91F0-0x9300 范围数据 ===');
const earlyData = readBytes(0x91F0, 0x110);
console.log(hexdump(earlyData, 0x91F0));

// 检查 0x9230+ 到 0x9300 的数据（ch1 的 track 以及之后）
console.log('\n=== 0x9230-0x92C0 范围数据 ===');
const midData = readBytes(0x9230, 0x90);
console.log(hexdump(midData, 0x9230));

// 找到所有 E8/E9 的 JUMP/CALL 和 target
console.log('\n=== 搜索 JUMP/CALL (E8/E9) ===');
// 从 0x91F0 开始遍历
for (let addr = 0x91F0; addr <= 0x92D0; addr++) {
  const b = readRom(addr);
  if (b === 0xE8 || b === 0xE9) {
    const lo = readRom(addr + 1);
    const hi = readRom(addr + 2);
    const target = lo | (hi << 8);
    console.log(`  ${b===0xE8?'JUMP':'CALL'} at $${addr.toString(16).toUpperCase()} → $${target.toString(16).toUpperCase()}`);
    // 查看 target 附近数据
    console.log(`    target data: ${hexdump(readBytes(target, 32), target)}`);
  }
}

function hexdump(bytes: number[], baseAddr: number): string {
  const lines: string[] = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const addr = (baseAddr + i).toString(16).toUpperCase().padStart(4, '0');
    const hex = bytes.slice(i, i + 16).map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
    const ascii = bytes.slice(i, i + 16).map(b => (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.').join('');
    lines.push(`  $${addr}: ${hex.padEnd(48)} ${ascii}`);
  }
  return lines.join('\n');
}
