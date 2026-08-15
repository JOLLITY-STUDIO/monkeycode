const fs = require('fs');
const lines = fs.readFileSync('_b28_instr.txt', 'utf8').split('\n');

// 1. opcode frequency
const ops = {};
for (const l of lines) {
  const m = l.match(/^\$([0-9A-F]+)\s+(\w+)/);
  if (m) {
    ops[m[2]] = (ops[m[2]] || 0) + 1;
  }
}
const arr = Object.entries(ops).sort((a, b) => b[1] - a[1]);
console.log('=== OPCODE FREQUENCY ===');
for (const [k, v] of arr) console.log(k + ':' + v);

// 2. labels
const labels = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^\$([0-9A-F]+)\s+\w+/);
  if (m) {
    labels.push({ addr: m[1], line: i + 1 });
  }
}
for (let i = 0; i < labels.length - 1; i++) {
  labels[i].end = labels[i + 1].line - 1;
}
labels[labels.length - 1].end = lines.length;
console.log('\n=== LABELS ===');
for (const lb of labels) {
  console.log('$' + lb.addr + ' L' + lb.line + '-' + lb.end);
}

// 3. external calls (to C5xx / Cxxx in fixed bank)
console.log('\n=== EXTERNAL CALLS ===');
for (const l of lines) {
  const m = l.match(/\$C([0-9A-F]{3})/);
  if (m) {
    console.log(l);
  }
}

// 4. jump tables / JSR targets
console.log('\n=== JSR TARGETS ===');
const jsr = {};
for (const l of lines) {
  const m = l.match(/JSR \$([0-9A-F]{4})/);
  if (m) jsr[m[1]] = (jsr[m[1]] || 0) + 1;
}
for (const [k, v] of Object.entries(jsr).sort()) console.log('$' + k + ':' + v);
