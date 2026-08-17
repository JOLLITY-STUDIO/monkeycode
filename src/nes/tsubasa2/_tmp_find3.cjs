// Focused: locate data tables in bank_02 dumps
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '_tmp_bzk_out', 'bank_02');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm')).sort();

// Build address->bytes map
const map = {}; // local addr -> byte
const addrs = [];
for (const file of files) {
  const lines = fs.readFileSync(path.join(dir, file), 'utf8').split('\n');
  for (const line of lines) {
    const m = line.match(/0x([0-9A-F]{4,6})\s+01:8([0-9A-F]{3}):\s+([0-9A-F]{2})(?:\s+([0-9A-F]{2}))?(?:\s+([0-9A-F]{2}))?/);
    if (m) {
      const a = parseInt(m[1], 16);
      map[a] = map[a] || [];
      for (let k = 2; k <= 4; k++) if (m[k]) map[a].push(parseInt(m[k], 16));
      if (!addrs.includes(a)) addrs.push(a);
    }
  }
}
addrs.sort((x, y) => x - y);

function bytesAt(a, n) {
  // sequential bytes starting at addr a
  const out = [];
  let cur = a;
  while (out.length < n) {
    const b = map[cur];
    if (!b) break;
    out.push(b[0]);
    cur++;
  }
  return out;
}

function findPattern(pat, label) {
  const p = pat.map(x => x);
  const n = p.length;
  for (const a of addrs) {
    const b = bytesAt(a, n);
    if (b.length === n && b.every((v, i) => v === p[i])) {
      console.log(`${label} at local 0x${a.toString(16).toUpperCase()} (CPU 0x${(a + 0x2000).toString(16).toUpperCase()})`);
      return a;
    }
  }
  console.log(`${label}: NOT FOUND`);
  return -1;
}

findPattern([0x6C, 0x00, 0x04, 0xFC], 'PW_OAM_FIX 6C0004FC');
findPattern([0x20, 0x00, 0x20, 0x20, 0x20, 0x8F], 'SCENE_SCRIPT 20002020208F');
findPattern([0x10, 0x00, 0x10, 0x00, 0x40], 'SCROLL_DX 1000100040');
findPattern([0x00, 0x10, 0x00, 0x40, 0x00], 'SCROLL_DY 0010004000');
findPattern([0x02, 0x03, 0x04, 0x05, 0x06, 0x07], 'FIELD_TILES 020304050607');

// AB1F / AB21 / AB22 tables (16 bytes each) - unknown content; dump region around 8B1F
console.log('\n--- region 0x8B10-0x8B50 ---');
for (let a = 0x8B10; a <= 0x8B50; a++) {
  const b = map[a];
  if (b) console.log(`0x${a.toString(16).toUpperCase()}: ${b.map(x => x.toString(16).padStart(2, '0')).join(' ')}`);
}

console.log('\n--- region 0x8670-0x8680 (A677 conflict area) ---');
for (let a = 0x8670; a <= 0x8680; a++) {
  const b = map[a];
  if (b) console.log(`0x${a.toString(16).toUpperCase()}: ${b.map(x => x.toString(16).padStart(2, '0')).join(' ')}`);
}

console.log('\n--- region 0x8A90-0x8B10 (SCENE_SCRIPT / tables) ---');
for (let a = 0x8A90; a <= 0x8B10; a++) {
  const b = map[a];
  if (b) console.log(`0x${a.toString(16).toUpperCase()}: ${b.map(x => x.toString(16).padStart(2, '0')).join(' ')}`);
}
