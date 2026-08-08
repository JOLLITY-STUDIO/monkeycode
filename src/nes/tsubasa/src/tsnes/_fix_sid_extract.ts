/**
 * 从 PRG bank 13 提取 SID 0x3B 正确 track 数据
 * npx tsx _fix_sid_extract.ts
 */
import PRG_BANK_13 from './rom-data/prg-bank-13';

const BANK_OFFSET = 0x8000;

function readBytes(addr: number, count: number): number[] {
  const r: number[] = [];
  for (let i = 0; i < count; i++) {
    const off = addr + i - BANK_OFFSET;
    r.push(off >= 0 && off < PRG_BANK_13.length ? PRG_BANK_13[off] : 0);
  }
  return r;
}

// Init list entries: ch0→0x91F4, ch1→0x9230, ch3→0x91F3
// Read entire region covering all tracks
const blockStart = 0x91F0;
const blockSize = 0x200;

const block = readBytes(blockStart, blockSize);

const ch3Off = 0x91F3 - blockStart;
const ch0Off = 0x91F4 - blockStart;
const ch1Off = 0x9230 - blockStart;

console.log('// --- Corrected SID 0x3B track data ---');
console.log();

// ch0: from 0x91F4, read 64 bytes
const ch0_d = block.slice(ch0Off, ch0Off + 64);
console.log(`// ch0 @ 0x91F4 (${ch0_d.length} bytes):`);
console.log(`[${ch0_d.map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ')}]`);
console.log();

// ch1: from 0x9230, read 80 bytes (ch1 track is longer, has its own section)
const ch1_d = block.slice(ch1Off, ch1Off + 80);
console.log(`// ch1 @ 0x9230 (${ch1_d.length} bytes):`);
console.log(`[${ch1_d.map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ')}]`);
console.log();

// ch3: from 0x91F3, read 64 bytes
const ch3_d = block.slice(ch3Off, ch3Off + 64);
console.log(`// ch3 @ 0x91F3 (${ch3_d.length} bytes):`);
console.log(`[${ch3_d.map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ')}]`);
console.log();

// Verify first bytes make sense
console.log('// Verification:');
console.log(`// ch0[0]=0x${ch0_d[0].toString(16).padStart(2,'0')} (note body? ${ch0_d[0] < 0x80 ? 'YES' : 'NO'})`);
console.log(`// ch1[0]=0x${ch1_d[0].toString(16).padStart(2,'0')} (length? ${ch1_d[0] >= 0x80 && ch1_d[0] < 0xE0 ? 'YES' : 'NO'})`);
console.log(`// ch3[0]=0x${ch3_d[0].toString(16).padStart(2,'0')} (command? ${ch3_d[0] >= 0xE0 ? 'YES' : 'NO'})`);

// Additional check: need to also include the init list so _peek can find
// addresses within the init list area. The _peek method falls back to linear
// search, so we need the full block.
// Actually, the init list isn't needed anymore since _initChannels uses trackPtr directly.
// But ch0/ch3 tracks start at $91F3/$91F4 which might reference bytes at earlier
// addresses through _peek. Let's provide more context.
console.log('// Full context block $91F0-$91FF:');
const ctx = block.slice(0, 0x10);
console.log(`// [${ctx.map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ')}]`);
