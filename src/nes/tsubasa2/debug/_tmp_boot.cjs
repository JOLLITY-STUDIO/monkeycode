const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
function walk(d) {
  let out = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (f.endsWith('.s')) out.push(p);
  }
  return out;
}
const files = walk(root);
const lines = [];
files.forEach((p) => {
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  ls.forEach((l, i) => {
    const rel = p.replace(root + path.sep, '').replace(/\\/g, '/');
    lines.push({ file: rel, line: i + 1, text: l });
  });
});

// Find boot entry points: bank31 reset vector $E000 area + bank30 init
// 1. Search for JMP targets in bank30/bank31
function grep(pat) {
  const r = [];
  for (const l of lines) {
    if (pat.test(l.text)) r.push(l);
  }
  return r;
}

console.log('=== bank31 reset area ($E000-$E0FF) ===');
for (const l of lines) {
  const m = l.text.match(/\$E0[0-9A-F]{2}/);
  if (l.file.includes('bank31') && m) {
    console.log(l.file + ':' + l.line + ': ' + l.text.trim().slice(0, 110));
  }
}
console.log('\n=== JMP/JSR from bank31 to bank0/30 ===');
for (const l of grep(/\b(JMP|JSR)\s+\$(800[0-9A-F]|80[1-9A-F][0-9A-F]|C[0-9A-F]{3}|E0[0-9A-F]{2})/) ) {
  if (l.file.includes('bank31') || l.file.includes('bank30')) {
    console.log(l.file + ':' + l.line + ': ' + l.text.trim().slice(0, 110));
  }
}
console.log('\n=== bank30 $C64E init area ===');
for (const l of lines) {
  const m = l.text.match(/\$C6[4-9A-F][0-9A-F]/);
  if (l.file.includes('bank30') && m && !l.file.includes('_full')) {
    console.log(l.file + ':' + l.line + ': ' + l.text.trim().slice(0, 110));
  }
}
