const fs = require('fs');
const lines = fs.readFileSync('trace/Captain Tsubasa II - Super Striker (Japan)-continue-panel.log', 'utf8').split('\n');

const re = /^(\S+)\s+A:([0-9A-F]{2}) X:([0-9A-F]{2}) Y:([0-9A-F]{2}) S:([0-9A-F]{2})\s+\$([0-9A-F]{2}):([0-9A-F]{4}):\s+([0-9A-F]{2})\s+([A-Z]{3})(?:\s+\$([0-9A-F]{4}))?/;

const stats = { count: 0 };
const jsr = {};
const b15ops = {};
const b15order = [];
const input = {};
let lastBankTok = null;
const trans = {};

for (const l of lines) {
  const m = l.match(re);
  if (!m) continue;
  const [_, frame, A, X, Y, S, bankTok, pc, op, mnem, arg] = m;
  stats.count++;
  stats[bankTok] = (stats[bankTok] || 0) + 1;

  if (lastBankTok !== null && bankTok !== lastBankTok) {
    const k = lastBankTok + '->' + bankTok;
    trans[k] = (trans[k] || 0) + 1;
  }
  lastBankTok = bankTok;

  if (mnem === 'JSR' && arg) {
    const k = '$' + bankTok + ':' + arg;
    jsr[k] = (jsr[k] || 0) + 1;
  }

  if (bankTok === '0F') {
    const k = '$' + bankTok + ':' + pc;
    if (!b15ops[k]) { b15ops[k] = { mnem, op, count: 0, frames: [] }; b15order.push(k); }
    b15ops[k].count++;
    if (b15ops[k].frames.length < 3) b15ops[k].frames.push(frame);
  }

  const im = l.match(/(LDA|BIT|LDX|LDY)\s+\$40(1[67])/);
  if (im) {
    const k = '$' + bankTok + ' $40' + im[2];
    input[k] = (input[k] || 0) + 1;
  }
}

console.log('=== counts per bank ===');
for (const k of Object.keys(stats)) console.log(k, stats[k]);

console.log('\n=== JSR targets ===');
console.log(Object.entries(jsr).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' x' + v).join('\n'));

console.log('\n=== bank transitions ===');
console.log(Object.entries(trans).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' x' + v).join('\n'));

console.log('\n=== $4016/$4017 reads ===');
console.log(Object.entries(input).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' x' + v).join('\n'));

console.log('\n=== bank0F ops in order ===');
for (const k of b15order) {
  const o = b15ops[k];
  console.log(k + ' ' + o.mnem + ' (x' + o.count + ') frames:' + o.frames.join(','));
}
