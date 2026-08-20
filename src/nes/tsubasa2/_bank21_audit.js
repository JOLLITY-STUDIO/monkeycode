const fs = require('fs');

function parseSection(f) {
  const s = fs.readFileSync('asm/bank21/' + f + '.s', 'utf8');
  const bytes = [];
  for (const line of s.split(/\r?\n/)) {
    const m = line.match(/\.byte\s+(.*)/);
    if (m) {
      const vals = m[1].split(',');
      for (const v of vals) {
        const t = v.trim().replace(/^\$/, '');
        if (/^[0-9A-Fa-f]{2}$/.test(t)) bytes.push(parseInt(t, 16));
      }
    }
  }
  return bytes;
}

const tables = parseSection('data_tables');
const maps = parseSection('data_maps');
const tail = parseSection('data_tail');

// --- pointer table 1 in tables: starts at offset 436 ($81B4) with 0x8A,0xA3
// count how many word pointers (pairs) until pattern changes
function findPtrEnd(bytes, start) {
  // pointers are little-endian word pairs. table continues while both bytes are >= 0x80 (high byte) and values are plausible addresses
  let i = start;
  while (i + 1 < bytes.length) {
    const lo = bytes[i], hi = bytes[i + 1];
    // address = hi<<8|lo ; plausible if hi in $80-$FF and lo any
    // pointer table entries look like hi=$A3-$AB, lo varies
    if (hi < 0x80) break;
    i += 2;
  }
  return i;
}

const ptr1Start = 436;
const ptr1End = findPtrEnd(tables, ptr1Start);
console.log('ptr table1: start $' + (0x8000 + ptr1Start).toString(16) + ' end $' + (0x8000 + ptr1End).toString(16) + ' count', (ptr1End - ptr1Start) / 2);

// show a few entries around start/end
function dumpPtrs(bytes, start, n) {
  let s = '';
  for (let k = 0; k < n && start + k * 2 + 1 < bytes.length; k++) {
    const lo = bytes[start + k * 2], hi = bytes[start + k * 2 + 1];
    s += '$' + ((hi << 8) | lo).toString(16).toUpperCase().padStart(4, '0') + ' ';
  }
  return s;
}
console.log('ptr1 first:', dumpPtrs(tables, ptr1Start, 6));
console.log('ptr1 last :', dumpPtrs(tables, ptr1End - 12, 6));

// --- what is after ptr table1? show bytes at ptr1End region
console.log('after ptr1 (offset ' + ptr1End + '):', tables.slice(ptr1End, ptr1End + 24).map(b => '$' + b.toString(16).toUpperCase().padStart(2, '0')).join(' '));

// pointer table 2 in maps at offset 467 ($8C47)
const ptr2Start = 467;
const ptr2End = findPtrEnd(maps, ptr2Start);
console.log('ptr table2: start $' + (0x8000 + tables.length + ptr2Start).toString(16) + ' end $' + (0x8000 + tables.length + ptr2End).toString(16) + ' count', (ptr2End - ptr2Start) / 2);
console.log('ptr2 first:', dumpPtrs(maps, ptr2Start, 6));
console.log('ptr2 last :', dumpPtrs(maps, ptr2End - 12, 6));
console.log('after ptr2:', maps.slice(ptr2End, ptr2End + 16).map(b => '$' + b.toString(16).toUpperCase().padStart(2, '0')).join(' '));

// find where F8 00 appears (data marker) - the scenario data. Look in maps after ptr2
// find first occurrence of pattern $F8 after ptr2
let f8idx = -1;
for (let i = ptr2End; i < maps.length - 1; i++) {
  if (maps[i] === 0xf8 && maps[i + 1] === 0x00) { f8idx = i; break; }
}
console.log('first F8 00 after ptr2 at maps offset', f8idx, 'abs $' + (0x8000 + tables.length + f8idx).toString(16));
