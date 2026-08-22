// _tmp_tsc_errors.cjs — 统计 _tmp_tsc_force.txt 错误分布
'use strict';
const fs = require('fs');
const txt = fs.readFileSync('_tmp_tsc_force.txt', 'utf8');
const lines = txt.split(/\r?\n/);
const byFile = new Map();
const samples = new Map();
let total = 0;
for (const l of lines) {
  const m = l.match(/^([^(]+)\((\d+),(\d+)\): error (TS\d+): (.*)$/);
  if (m) {
    const file = m[1];
    byFile.set(file, (byFile.get(file) || 0) + 1);
    if (!samples.has(file)) samples.set(file, `${m[4]} ${m[5].slice(0, 100)}`);
    total++;
  }
}
console.log('TOTAL errors:', total);
for (const [f, n] of [...byFile.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`${n}\t${f}\t${samples.get(f)}`);
}
