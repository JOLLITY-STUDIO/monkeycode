import fs from 'fs';
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const HEADER = 0x10;
const BANK_SIZE = 0x4000;
const bank15Base = 15 * BANK_SIZE + HEADER;

const ranges = [
  [0x8000, 0x83F0],
  [0xA9DA, 0xAB85],
  [0xB15A, 0xB30E],
  [0xB329, 0xB4D4],
  [0xB4F1, 0xBA28],
  [0xBA83, 0xBD0F],
];

function search(buf, seq) {
  const out = [];
  for (let i = 0; i < buf.length - seq.length; i++) {
    let ok = true;
    for (let j = 0; j < seq.length; j++) if (buf[i + j] !== seq[j]) { ok = false; break; }
    if (ok) out.push(i);
  }
  return out;
}

const costs = [200, 160, 90, 40];
const costLE = [];
for (const v of costs) costLE.push(v & 0xff, v >> 8);

for (const [s, e] of ranges) {
  const start = bank15Base + (s - 0x8000);
  const block = rom.subarray(start, start + (e - s + 1));
  console.log(`CPU 0x${s.toString(16)}-0x${e.toString(16)}:`);
  const h1 = search(block, costs);
  const h2 = search(block, costLE);
  console.log('  costs raw [200,160,90,40]:', h1.length ? h1.map(x=>'0x'+x.toString(16)).join(',') : 'NONE');
  console.log('  costs LE16:', h2.length ? h2.map(x=>'0x'+x.toString(16)).join(',') : 'NONE');
  for (const v of costs) {
    const h = search(block, [v & 0xff, v >> 8]);
    if (h.length) console.log(`  ${v} LE16 found at ${h.map(x=>'0x'+x.toString(16)).join(',')}`);
  }
  for (const v of costs) {
    const h = search(block, [v]);
    if (h.length) console.log(`  ${v} single byte found at ${h.slice(0,5).map(x=>'0x'+x.toString(16)).join(',')}`);
  }
}
