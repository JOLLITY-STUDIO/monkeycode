const fs = require('fs');
const s = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/debug/trace/opening-nt.log', 'utf8');
const lines = s.split('\n');
let prev = -1;
const bursts = [];
let cur = null;
for (const l of lines) {
  const m = l.match(/^\[(NT_WRITE)\] i(\d+) .*tile=#\$([0-9A-F]{2})/);
  if (!m) continue;
  const t = parseInt(m[3], 16);
  if (t === 0) continue;
  if (!cur || prev + 1 !== parseInt(m[2])) {
    cur = { start: m[2], writes: [] };
    bursts.push(cur);
  }
  cur.writes.push(l);
  prev = parseInt(m[2]);
}
console.log('total non-zero bursts:', bursts.length);
bursts.forEach((b, bi) => {
  console.log(`=== burst ${bi} i${b.start} count=${b.writes.length}`);
  b.writes.forEach(w => console.log('  ' + w.slice(0, 100)));
});
