import fs from 'fs';
const romPath = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = fs.readFileSync(romPath);
const HEADER = 0x10;
const BANK_SIZE = 0x4000;

// Bank 15 PRG data blocks (CPU address ranges converted to ROM file offsets)
const bank15Base = 15 * BANK_SIZE + HEADER; // ROM file offset of bank 15 start
const ranges = [
  [0x8000, 0x83F0],
  [0xA9DA, 0xAB85],
  [0xB15A, 0xB30E],
  [0xB329, 0xB4D4],
  [0xB4F1, 0xBA28],
  [0xBA83, 0xBD0F],
];

function romOffset(cpu) { return bank15Base + (cpu - 0x8000); }
function search(buf, seq) {
  const out = [];
  for (let i = 0; i < buf.length - seq.length; i++) {
    let ok = true;
    for (let j = 0; j < seq.length; j++) if (buf[i + j] !== seq[j]) { ok = false; break; }
    if (ok) out.push(i);
  }
  return out;
}

console.log('Bank 15 ROM base offset:', '0x' + bank15Base.toString(16));
console.log('Bank 15 dump with searches:\n');
for (const [s, e] of ranges) {
  const start = romOffset(s);
  const len = e - s + 1;
  const block = rom.subarray(start, start + len);
  console.log(`--- CPU 0x${s.toString(16)}-0x${e.toString(16)} (ROM 0x${start.toString(16)}, ${len} bytes) ---`);

  // Search for first-level stamina values in various formats
  const stVals = [408, 748, 416, 400];
  // LE16 bytes in order
  const leSeq = [];
  for (const v of stVals) { leSeq.push(v & 0xff, v >> 8); }
  const hits = search(block, leSeq);
  console.log('  stamina LE16 search:', hits.length ? 'FOUND @' + hits.map(x => '0x' + x.toString(16)).join(', ') : 'NONE');
  // 408 single
  console.log('  408 LE16 in block:', search(block, [408 & 0xff, 408 >> 8]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
  console.log('  748 LE16 in block:', search(block, [748 & 0xff, 748 >> 8]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
  console.log('  416 LE16 in block:', search(block, [416 & 0xff, 416 >> 8]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
  console.log('  400 LE16 in block:', search(block, [400 & 0xff, 400 >> 8]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');

  // Search for name patterns
  console.log('  つばさ PPU [12,94,1A,0B]:', search(block, [0x12, 0x94, 0x1A, 0x0B]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
  console.log('  つばさ [12,94,0B]:', search(block, [0x12, 0x94, 0x0B]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
  console.log('  ば [94,1A]:', search(block, [0x94, 0x1A]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');

  // Hex dump first 256 bytes
  for (let i = 0; i < Math.min(256, block.length); i += 16) {
    const off = i;
    const line = block.subarray(i, i + 16);
    const hex = Array.from(line).map(b => b.toString(16).padStart(2, '0')).join(' ');
    const ascii = Array.from(line).map(b => b >= 0x20 && b < 0x7f ? String.fromCharCode(b) : '.').join('');
    console.log(`    0x${(s + off).toString(16).padStart(4,'0')}: ${hex} |${ascii}|`);
  }
  if (block.length > 256) console.log('    ... (truncated)');
  console.log();
}
