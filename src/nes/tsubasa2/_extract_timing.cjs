const m = require('./_test_out/game/data/prg-bank-12.js');
const data = m.default || m.PRG_BANK_12;
// pointer little-endian at cpu address `cpu`
function readPtr(cpu) { const o = cpu - 0x8000; return data[o] | (data[o + 1] << 8); }
// Timing pointer table base $8754 (low at $8754, high at $8755), per asm $854B LDA $8754,X
const BASE = 0x8754;
const N = 48;
const ptrs = [];
for (let i = 0; i < N; i++) ptrs.push(readPtr(BASE + i * 2));
console.log('ptrs[0..8]:', ptrs.slice(0, 9).map(p => '$' + p.toString(16)).join(' '));
function decodeTable(cpu) {
  const o = cpu - 0x8000;
  if (o < 0 || o + 2 > data.length) return null;
  const pairs = [];
  let i = o;
  while (i < data.length && data[i] !== 0xFF && pairs.length < 128) {
    pairs.push([data[i], data[i + 1]]);
    i += 2;
  }
  return pairs;
}
const lines = [];
const seen = new Map();
ptrs.forEach((p, idx) => {
  const t = decodeTable(p);
  if (!t) { lines.push(`// [${idx}] $${p.toString(16)} : OUT OF RANGE`); return; }
  const key = JSON.stringify(t);
  if (!seen.has(key)) {
    seen.set(key, [idx]);
    lines.push(`// [${idx}] $${p.toString(16)} len=${t.length}`);
    lines.push('  [' + t.map(([a, b]) => `[${a}, ${b}]`).join(', ') + '],');
  } else {
    lines.push(`// [${idx}] $${p.toString(16)} DUP of [${seen.get(key)[0]}]`);
  }
});
console.log(lines.join('\n'));
