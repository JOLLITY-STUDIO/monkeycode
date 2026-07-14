/**
 * debug-event-data.mjs
 * 第一次探索 SCENARIO_CONFIG (0x0821BE) 的原始数据 dump
 * 目的: 查看 128 字节事件数据的原始形式，判断是 dword/word/byte 结构
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rom = readFileSync(join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin'));
const readU32 = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;
const readU16 = (addr) => ((rom[addr] << 8) | rom[addr + 1]);

console.log('=== SCENARIO_CONFIG Event Data Dump (Stages 1-5) ===\n');

for (let stage = 0; stage < 5; stage++) {
  const sPtr = readU32(0x0821BE + stage * 4);
  const flagPtr = readU32(0x082142 + stage * 8);
  
  console.log(`Stage ${stage + 1}: eventData=0x${sPtr.toString(16)} flagData=0x${(flagPtr !== 0 ? flagPtr.toString(16) : '0')}`);
  
  // Print event data as 4 columns per line
  if (sPtr && sPtr < rom.length) {
    const bytes = [];
    for (let i = 0; i < 128; i++) bytes.push(rom[sPtr + i]);
    
    // Show as 8-byte rows (16 rows total)
    console.log('  128-byte event data (hex):');
    for (let r = 0; r < 16; r++) {
      const row = bytes.slice(r * 8, r * 8 + 8).map(b => b.toString(16).padStart(2, '0')).join(' ');
      const ascii = bytes.slice(r * 8, r * 8 + 8).map(b => (b >= 32 && b < 127) ? String.fromCharCode(b) : '.').join('');
      console.log('    ' + row + '  ' + ascii);
    }
    
    // Also show as 32 dwords
    console.log('  As 32 dwords:');
    const dwords = [];
    for (let i = 0; i < 32; i++) dwords.push('0x' + readU32(sPtr + i * 4).toString(16).padStart(8, '0'));
    for (let i = 0; i < 4; i++) console.log('    [' + dwords.slice(i * 8, i * 8 + 8).join(', ') + ']');
    
    // Word view (64 words) — helps identify repeated patterns
    console.log('  As 64 words:');
    const words = [];
    for (let i = 0; i < 64; i++) words.push('0x' + readU16(sPtr + i * 2).toString(16).padStart(4, '0'));
    for (let i = 0; i < 8; i++) console.log('    [' + words.slice(i * 8, i * 8 + 8).join(', ') + ']');
  }
  
  // Print flag data
  if (flagPtr && flagPtr < rom.length) {
    const f0 = readU32(flagPtr), f1 = readU32(flagPtr + 4), f2 = readU32(flagPtr + 8), f3 = readU32(flagPtr + 12);
    console.log('  Flag dwords: 0x' + f0.toString(16).padStart(8, '0') +
      ' 0x' + f1.toString(16).padStart(8, '0') +
      ' 0x' + f2.toString(16).padStart(8, '0') +
      ' 0x' + f3.toString(16).padStart(8, '0'));
  }
  console.log('');
}
