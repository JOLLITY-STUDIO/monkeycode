// Build byte map from ROM offsets: local = romOff - 0x4010 + 0x8000
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '_tmp_bzk_out', 'bank_02');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm')).sort();

const bytes = {}; // local addr -> byte
for (const file of files) {
  const txt = fs.readFileSync(path.join(dir, file), 'utf8');
  const re = /0x([0-9A-F]{4,6})\s+01:8[0-9A-F]{3}:\s+([0-9A-F]{2})(?:\s+([0-9A-F]{2}))?(?:\s+([0-9A-F]{2}))?/g;
  let m;
  while ((m = re.exec(txt)) !== null) {
    const romOff = parseInt(m[1], 16);
    const local = romOff - 0x4010 + 0x8000;
    for (let k = 2; k <= 4; k++) {
      if (m[k] !== undefined) {
        const rel = k - 2;
        bytes[local + rel] = parseInt(m[k], 16);
      }
    }
  }
}
const addrs = Object.keys(bytes).map(Number).sort((a, b) => a - b);
console.log('total bytes mapped:', addrs.length);

function seq(a, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const v = bytes[a + i];
    if (v === undefined) return null;
    out.push(v);
  }
  return out;
}
function find(pat, label) {
  const n = pat.length;
  for (const a of addrs) {
    const b = seq(a, n);
    if (b && b.every((v, i) => v === pat[i])) {
      console.log(`${label}: local 0x${a.toString(16).toUpperCase()} = CPU 0x${(a + 0x2000).toString(16).toUpperCase()}`);
      return;
    }
  }
  console.log(`${label}: NOT FOUND`);
}

find([0x6C, 0x00, 0x04, 0xFC], 'PW_OAM_FIX');
find([0x20, 0x00, 0x20, 0x20, 0x20, 0x8F], 'SCENE_SCRIPT');
find([0x10, 0x00, 0x10, 0x00, 0x40], 'SCROLL_DX');
find([0x00, 0x10, 0x00, 0x40, 0x00], 'SCROLL_DY');
find([0x02, 0x03, 0x04, 0x05, 0x06, 0x07], 'FIELD_TILES');
find([0x6C, 0x00, 0x04, 0xFC, 0x6E], 'PW_OAM_FIX_ext');

function dump(a, b, label) {
  console.log(`\n--- ${label} 0x${a.toString(16).toUpperCase()}-0x${b.toString(16).toUpperCase()} ---`);
  for (let i = a; i <= b; i++) {
    if (bytes[i] !== undefined) console.log(`0x${i.toString(16).toUpperCase()}: ${bytes[i].toString(16).padStart(2, '0')}`);
  }
}

dump(0x8A90, 0x8B50, 'SCENE_SCRIPT/tables');
dump(0x8AD8, 0x8B30, 'SCROLL region');
dump(0x8A00, 0x8A50, 'AA06 region');
dump(0x8670, 0x8690, 'A677 conflict');
