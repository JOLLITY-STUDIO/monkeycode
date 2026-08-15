const fs = require('fs');
const lines = fs.readFileSync('_b28_instr.txt', 'utf8').split('\n').filter(l => l.trim());

// parse all instructions
const instr = [];
for (const l of lines) {
  const m = l.match(/^\$([0-9A-F]{4})\s+(.*)$/);
  if (!m) continue;
  instr.push({ addr: parseInt(m[1], 16), text: m[2].trim() });
}

// build address->index map
const addrIndex = new Map();
for (let i = 0; i < instr.length; i++) addrIndex.set(instr[i].addr, i);

// find branch/jump targets
const targets = new Set();
for (const ins of instr) {
  const t = ins.text;
  // JSR/JMP $xxxx
  const m1 = t.match(/(?:JSR|JMP) \$([0-9A-F]{4})/);
  if (m1) targets.add(parseInt(m1[1], 16));
  // branch $xxxx
  const m2 = t.match(/\$([0-9A-F]{4})$/);
  if (m2 && !/JSR|JMP/.test(t)) targets.add(parseInt(m2[1], 16));
}

// function starts: targets, or first instr, or after RTS/RTI
const starts = new Set([instr[0].addr, ...targets]);
let lastRts = -1;
for (let i = 0; i < instr.length - 1; i++) {
  const t = instr[i].text;
  if (/^(RTS|RTI)$/.test(t) || /^JMP \$[0-9A-F]{4}$/.test(t)) {
    starts.add(instr[i + 1].addr);
    lastRts = i;
  }
}

// output function ranges
const sorted = [...starts].sort((a, b) => a - b);
console.log('FUNCTION STARTS:', sorted.length);
for (let i = 0; i < sorted.length; i++) {
  const s = sorted[i];
  const e = sorted[i + 1] ? sorted[i + 1] - 1 : 0x8FFF;
  const si = addrIndex.get(s);
  const ei = addrIndex.get(e) ?? instr.length - 1;
  console.log('$' + s.toString(16).toUpperCase().padStart(4, '0') + ' L' + (si + 1) + '-' + (ei + 1));
}

// list all instructions grouped by function
let current = 0;
console.log('\n=== INSTRUCTIONS BY FUNCTION ===');
for (let i = 0; i < instr.length; i++) {
  if (sorted.includes(instr[i].addr)) {
    current = instr[i].addr;
    console.log('\n--- $' + current.toString(16).toUpperCase().padStart(4, '0') + ' ---');
  }
  console.log(instr[i].text);
}
