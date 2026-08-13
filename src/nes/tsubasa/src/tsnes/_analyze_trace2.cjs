const fs = require('fs');
const lines = fs.readFileSync('trace/Captain Tsubasa II - Super Striker (Japan)-continue-panel.log', 'utf8').split('\n');

console.log('=== bank15 sample lines (first 40) ===');
let cnt = 0;
for (const l of lines) {
  if (/\$15:/.test(l)) { console.log(l); if (++cnt >= 40) break; }
}

console.log('\n=== JSR call targets (top 40) ===');
const jsr = {};
for (const l of lines) {
  const m = l.match(/^\S+\s+(?:A:.. X:.. Y:.. S:..  )?(\$[0-9A-F]{2}:[0-9A-F]{4}):\s*(?:[0-9A-F]{2}\s+)+JSR\s+(\$[0-9A-F]{4})/);
  if (!m) {
    const m2 = l.match(/\$([0-9A-F]{2}):([0-9A-F]{4}):\s*(?:[0-9A-F]{2} )+JSR\s+\$([0-9A-F]{4})/);
    if (m2) {
      const k = 'bank' + parseInt(m2[1], 16) + ':' + m2[3];
      jsr[k] = (jsr[k] || 0) + 1;
    }
  }
}
console.log(Object.entries(jsr).sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, v]) => k + ' x' + v).join('\n'));

console.log('\n=== JMP targets (top 30) ===');
const jmp = {};
for (const l of lines) {
  const m2 = l.match(/\$([0-9A-F]{2}):([0-9A-F]{4}):\s*(?:[0-9A-F]{2} )+JMP\s+\$([0-9A-F]{4})/);
  if (m2) {
    const k = 'bank' + parseInt(m2[1], 16) + ':' + m2[3];
    jmp[k] = (jmp[k] || 0) + 1;
  }
}
console.log(Object.entries(jmp).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([k, v]) => k + ' x' + v).join('\n'));

console.log('\n=== bank transitions (JSR/RTS/JMP crossing bank) top 30 ===');
const trans = {};
let lastBank = null;
for (const l of lines) {
  const m = l.match(/^\S+\s+A:.. X:.. Y:.. S:..  \$([0-9A-F]{2}):/);
  if (m) {
    const b = parseInt(m[1], 16);
    if (lastBank !== null && b !== lastBank) {
      const k = 'bank' + lastBank + '->bank' + b;
      trans[k] = (trans[k] || 0) + 1;
    }
    lastBank = b;
  }
}
console.log(Object.entries(trans).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([k, v]) => k + ' x' + v).join('\n'));
