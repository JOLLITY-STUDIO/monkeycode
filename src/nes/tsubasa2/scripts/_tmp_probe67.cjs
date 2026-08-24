/**
 * parse_asm_bytes.js - 把 .byte 十六进制数组拼接成单个 Uint8Array
 */
const fs = require('fs');
const path = require('path');

function parseAsmBytes(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const bytes = [];
  for (const line of text.split(/\r?\n/)) {
    // match .byte $XX,$YY,...
    const m = line.match(/\.byte\s+(.+)$/i);
    if (!m) continue;
    const parts = m[1].split(',').map(s => s.trim()).filter(Boolean);
    for (const p of parts) {
      // accept $XX or 0xXX
      let v;
      if (p.startsWith('$')) v = parseInt(p.slice(1), 16);
      else if (p.startsWith('0x') || p.startsWith('0X')) v = parseInt(p.slice(2), 16);
      else v = parseInt(p, 16);
      if (!Number.isNaN(v)) bytes.push(v);
    }
  }
  return new Uint8Array(bytes);
}

// bank06: data_tables + data_maps + data_tail
const bank06Tables = parseAsmBytes(path.join(__dirname, '../src/asm/bank06/data_tables.s'));
const bank06Maps = parseAsmBytes(path.join(__dirname, '../src/asm/bank06/data_maps.s'));
const bank06Tail = parseAsmBytes(path.join(__dirname, '../src/asm/bank06/data_tail.s'));
const bank06 = new Uint8Array(bank06Tables.length + bank06Maps.length + bank06Tail.length);
bank06.set(bank06Tables, 0);
bank06.set(bank06Maps, bank06Tables.length);
bank06.set(bank06Tail, bank06Tables.length + bank06Maps.length);

// bank07
const bank07Tables = parseAsmBytes(path.join(__dirname, '../src/asm/bank07/data_tables.s'));
const bank07Maps = parseAsmBytes(path.join(__dirname, '../src/asm/bank07/data_maps.s'));
const bank07Tail = parseAsmBytes(path.join(__dirname, '../src/asm/bank07/data_tail.s'));
const bank07 = new Uint8Array(bank07Tables.length + bank07Maps.length + bank07Tail.length);
bank07.set(bank07Tables, 0);
bank07.set(bank07Maps, bank07Tables.length);
bank07.set(bank07Tail, bank07Tables.length + bank07Maps.length);

const u8 = s => Array.from(s, b => '0x' + b.toString(16).padStart(2, '0').toUpperCase()).join(',');
const out = [];
out.push('=== bank06 === size=' + bank06.length);
out.push('=== bank07 === size=' + bank07.length);

// 6 script header pointers at start of bank06 (12 bytes = 6 × 16-bit LE)
out.push('--- bank06 script hdr ptrs ---');
const hdr = [];
for (let i = 0; i < 12; i += 2) hdr.push(bank06[i] | (bank06[i+1] << 8));
out.push('offsets: ' + hdr.map(h => '0x' + h.toString(16).padStart(4,'0').toUpperCase()).join(', '));

// Bank07: pointer table at start (212 bytes = 106 × 2)
out.push('--- bank07 chr pointer table ---');
const bank07Ptrs = [];
for (let i = 0; i < 212; i += 2) bank07Ptrs.push(bank07[i] | (bank07[i+1] << 8));
out.push('count=' + bank07Ptrs.length);
out.push('first 8 ptrs: ' + bank07Ptrs.slice(0,8).map(p=>'0x'+p.toString(16).padStart(4,'0').toUpperCase()).join(','));
out.push('last 8 ptrs: ' + bank07Ptrs.slice(-8).map(p=>'0x'+p.toString(16).padStart(4,'0').toUpperCase()).join(','));

// For each bank07 config, capture the 6-byte header
out.push('--- bank07 chr configs (first 8) ---');
for (let i = 0; i < 8; i++) {
  const off = bank07Ptrs[i] - 0xA000; // CPU→bank offset
  const hdr6 = [];
  for (let j = 0; j < 6; j++) hdr6.push(bank07[off+j]);
  out.push(`idx 0x${i.toString(16).padStart(2,'0')} off=0x${off.toString(16).padStart(4,'0')}: [${hdr6.map(b=>'0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(',')}]`);
}

// bank06 boundaries: BG palette at 0x1000, SPR at 0x1300
out.push('--- bank06 BG palette region (offset 0x1000-0x10FF) ---');
const bg10 = [];
for (let i = 0x1000; i < 0x1100; i++) bg10.push(bank06[i]);
out.push('bytes 0x1000..0x10FF: ' + u8(new Uint8Array(bg10)).slice(0,200) + '...');
out.push('count=' + bg10.length);

// next 256 bytes
const bg20 = [];
for (let i = 0x1100; i < 0x1200; i++) bg20.push(bank06[i]);
out.push('count=' + bg20.length + ' first 8: 0x' + bg20.slice(0,8).map(b=>b.toString(16).padStart(2,'0')).join(' '));

// scan for repetition of 16-zero start (palette style)
out.push('--- search for palette-like regions in bank06 ---');
// palette = 16 groups × 16 bytes = 256 bytes (but the user said 16 groups, 16 bytes each = 256)
// and the BG region range estimate
out.push('region @0x1000-0x11FF first 32: ' + u8(bank06.slice(0x1000,0x1020)).slice(0,300));
out.push('region @0x1300-0x13FF first 32: ' + u8(bank06.slice(0x1300,0x1320)).slice(0,300));

fs.writeFileSync(path.join(__dirname, '_tmp_probe67.txt'), out.join('\n'));
console.log('wrote ' + out.length + ' lines');
