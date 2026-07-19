import fs from 'fs';

const BASE = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能';
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = fs.readFileSync(`${BASE}.prg.bin`);
const cdl = fs.readFileSync(`${BASE}.cdl`);
const unused = fs.readFileSync(`${BASE}.unuseddata.prg.bin`);

// Map CDL indexes to ROM addresses
// NES PRG ROM: 16KB banks. The .prg.bin derived from CDL maps CDL byte N to PRG address.
// Let's figure out mapping. For MMC3 or similar, PRG ROM is at 0x8000-0xFFFF.
// The .prg.bin file size = number of PRG banks * 16384? Let's check.

console.log('rom size:', rom.length.toString(16));
console.log('prg size:', prg.length.toString(16));
console.log('cdl size:', cdl.length.toString(16));
console.log('unused size:', unused.length.toString(16));

// CDL format: 1 byte per byte of ROM. Bit 0 = code executed, Bit 1 = data read.
// Let's analyze which banks have data reads.
const dataBytes = [];
const codeBytes = [];
const prgRomStart = 0x10; // header size
const prgBankSize = 0x4000; // 16KB
const numPrgBanks = (rom.length - 0x10) / prgBankSize;
console.log('numPrgBanks:', numPrgBanks);

for (let i = 0; i < cdl.length; i++) {
  const flag = cdl[i];
  if (flag & 2) dataBytes.push(i);
  if (flag & 1) codeBytes.push(i);
}

console.log('CDL data bytes:', dataBytes.length, 'code bytes:', codeBytes.length);

// Map CDL to ROM address. NES PRG address: 0x8000-0xBFFF bank N.
// For MMC3, the ROM is mapped. But for the CDL, it's linear ROM offset.
// The .prg.bin was created from the CDL as PRG ROM dump.
// So CDL[i] corresponds to ROM byte at offset 0x10 + i? Or at some bank mapping.
// Actually FCEUX CDL: each byte corresponds to a byte in the ROM file (starting from 0).
// So CDL[0] = ROM[0]? Let's verify: rom[0x10] is first PRG byte.
// If ROM is traditional NES, header is 16 bytes.
// CDL covers the entire ROM? Let's check.

// Actually cdl is a file from FCEUX's CDL feature, which logs per PRG byte.
// The CDL covers PRG ROM only (banks).
// Let's check if first CDL byte matches rom[0x10].

const firstPrgByte = rom[0x10];
console.log('rom[0x10]:', firstPrgByte.toString(16), 'cdl[0] flag:', cdl[0].toString(16));

// Analyze data reads per bank
const bankRanges = {};
for (const addr of dataBytes) {
  const bank = Math.floor(addr / 0x4000);
  const offset = addr % 0x4000;
  if (!bankRanges[bank]) bankRanges[bank] = [];
  if (bankRanges[bank].length < 2 || offset > bankRanges[bank][0].end + 1) {
    // gap or start
    bankRanges[bank].push({ start: offset, end: offset });
  } else {
    bankRanges[bank][bankRanges[bank].length - 1].end = offset;
  }
}

console.log('\n=== Data read ranges per bank ===');
for (const [bank, ranges] of Object.entries(bankRanges)) {
  const merged = [];
  for (const r of ranges) {
    if (merged.length && r.start === merged[merged.length - 1].end + 1) {
      merged[merged.length - 1].end = r.end;
    } else {
      merged.push({ start: r.start, end: r.end });
    }
  }
  console.log(`Bank ${bank}:`);
  for (const r of merged) {
    const size = r.end - r.start + 1;
    console.log(`  0x${r.start.toString(16).padStart(4,'0')} - 0x${r.end.toString(16).padStart(4,'0')} (${size} bytes)`);
  }
}

// Now look at the PRG dump. The prg.bin file maps to CDL data bytes.
// But the prg.bin might be the actual bytes logged.
console.log('\n=== PRG dump hex (first 1024 bytes) ===');
for (let i = 0; i < Math.min(1024, prg.length); i += 16) {
  const line = prg.subarray(i, i + 16);
  const hex = Array.from(line).map(b => b.toString(16).padStart(2, '0')).join(' ');
  const ascii = Array.from(line).map(b => b >= 0x20 && b < 0x7f ? String.fromCharCode(b) : '.').join('');
  console.log(`${i.toString(16).padStart(4,'0')}: ${hex} |${ascii}|`);
}

// Also dump the unuseddata
console.log('\n=== UNUSED DATA (first 512 bytes) ===');
for (let i = 0; i < Math.min(512, unused.length); i += 16) {
  const line = unused.subarray(i, i + 16);
  const hex = Array.from(line).map(b => b.toString(16).padStart(2, '0')).join(' ');
  const ascii = Array.from(line).map(b => b >= 0x20 && b < 0x7f ? String.fromCharCode(b) : '.').join('');
  console.log(`${i.toString(16).padStart(4,'0')}: ${hex} |${ascii}|`);
}
