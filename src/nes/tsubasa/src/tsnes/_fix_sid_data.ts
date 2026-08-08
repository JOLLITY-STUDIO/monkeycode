/**
 * 从 ROM PRG bank 读取修复 SID 0x3B 数据
 * npx tsx _fix_sid_data.ts
 */
import PRG_BANK_13 from './rom-data/prg-bank-13';

const BANK_OFFSET = 0x8000;

function readBytes(romAddr: number, count: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < count; i++) {
    const off = romAddr + i - BANK_OFFSET;
    result.push(off >= 0 && off < PRG_BANK_13.length ? PRG_BANK_13[off] : 0);
  }
  return result;
}

// Init list entries from master channel 0xFF block:
// ch0→0x91F4, ch1→0x9230, ch3→0x91F3
// Read entire master block from the earliest init address
// 0x9188 to cover init list + all tracks
const BLOCK_START = 0x9188;
const BLOCK_SIZE = 0x200; // 512 bytes covers all three tracks

const fullBlock = readBytes(BLOCK_START, BLOCK_SIZE);

console.log(`// Block: 0x9188 → 0x${(BLOCK_START + BLOCK_SIZE).toString(16)} (${BLOCK_SIZE} bytes)`);
console.log();
console.log(`// ch3 track starts at offset 0x${(0x91F3 - 0x9188).toString(16)} = ${0x91F3 - 0x9188}`);
console.log(`// ch0 track starts at offset 0x${(0x91F4 - 0x9188).toString(16)} = ${0x91F4 - 0x9188}`);
console.log(`// ch1 track starts at offset 0x${(0x9230 - 0x9188).toString(16)} = ${0x9230 - 0x9188}`);
console.log();

// Show each channel's actual track data (first 100 bytes of their track)
const ch0Start = 0x91F4 - 0x9188;
const ch1Start = 0x9230 - 0x9188;
const ch3Start = 0x91F3 - 0x9188;

for (const [ch, start] of [[0, ch0Start], [1, ch1Start], [3, ch3Start]] as [number, number][]) {
  const len = Math.min(100, BLOCK_SIZE - start);
  const data = fullBlock.slice(start, start + len);
  console.log(`// ch${ch} trackBytes (first ${len} bytes at offset ${start}):`);
  console.log(`[${data.map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ')}]`);
  console.log();
}

// 验证：ch0 第一个字节应该是 note body (< 0x80)
console.log('// Verification:');
console.log(`// ch0[0] = 0x${fullBlock[ch0Start].toString(16).padStart(2, '0')} (${fullBlock[ch0Start] < 0x80 ? '✅ <0x80 → note body' : '❌ command or length'})`);
console.log(`// ch1[0] = 0x${fullBlock[ch1Start].toString(16).padStart(2, '0')} (${fullBlock[ch1Start] >= 0x80 && fullBlock[ch1Start] < 0xE0 ? '✅ length prefix' : '❌'})`);
console.log(`// ch3[0] = 0x${fullBlock[ch3Start].toString(16).padStart(2, '0')} (${fullBlock[ch3Start] >= 0xE0 ? '✅ command' : '❌'})`);

// Check: ch1 starts with 0x92 → length prefix, next byte should be note
console.log(`// ch1[1] = 0x${fullBlock[ch1Start + 1].toString(16).padStart(2, '0')} — note body?`);
