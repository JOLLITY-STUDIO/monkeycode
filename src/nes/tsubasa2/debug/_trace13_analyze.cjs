// analyze docs/roms/tecmo/13.log : 13-frame boot trace (aggregate, multiline records)
const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/tecmo/13.log';
const raw = fs.readFileSync(p, 'utf8');

// records start with ^f<digits>\s+c<digits>... and may wrap multiple lines
const recs = [];
const re = /^f(\d+)\s+c(\d+)\s+i(\d+)\s+A:([0-9A-F]{2}) X:([0-9A-F]{2}) Y:([0-9A-F]{2}) S:([0-9A-F]{2}) P:(\S+)\s+\$([0-9A-F]{2}):([0-9A-F]{4}):/gm;
let m;
const spans = [];
while ((m = re.exec(raw))) {
  if (spans.length) spans[spans.length - 1].end = m.index;
  spans.push({ start: m.index, end: raw.length, head: m });
}

for (const s of spans) {
  const h = s.head;
  const body = raw.slice(s.start, s.end).replace(/\s+/g, ' ').trim();
  recs.push({
    f: +h[1], c: +h[2], i: +h[3], A: h[4], X: h[5], Y: h[6], S: h[7], P: h[8], bank: h[9], pc: h[10], body
  });
}

const frames = new Map();
for (const r of recs) {
  if (!frames.has(r.f)) frames.set(r.f, []);
  frames.get(r.f).push(r);
}

console.log('=== RECORD COUNT ===', recs.length);
console.log('=== FRAME SUMMARY ===');
for (const [f, arr] of frames) {
  const banks = new Set(arr.map(e => e.bank));
  const regions = new Set(arr.map(e => e.bank + ':' + e.pc.slice(0, 2) + 'xx'));
  const r0 = arr[0], r1 = arr[arr.length - 1];
  console.log(`f${f}: ${arr.length} instr  cycles ${r0.c}-${r1.c}  banks=[${[...banks].join(',')}]`);
  console.log(`     regions=[${[...regions].sort().join(',')}]`);
}

console.log('\n=== PPU/APU REGISTER WRITES (STA ... @ $20xx-$40xx) ===');
let ppuCount = 0;
for (const [f, arr] of frames) {
  for (const e of arr) {
    if (/@ \$2[0-3][0-9A-F]{2}/.test(e.body) || /@ \$40[0-1][0-9A-F]/.test(e.body)) {
      ppuCount++;
      console.log(`f${f} c${e.c} ${e.bank}:${e.pc}  ${e.body.slice(0, 90)}`);
    }
  }
}
console.log('total PPU/APU writes:', ppuCount);

console.log('\n=== FLOW: first occurrence of each bank:pc (exact pc) ===');
const seen = new Set();
for (const [f, arr] of frames) {
  for (const e of arr) {
    const sig = e.bank + ':' + e.pc;
    if (!seen.has(sig)) {
      seen.add(sig);
      console.log(`  f${f} c${e.c} ${sig}  ${e.body.slice(0, 60)}`);
    }
  }
}
