const fs = require('fs');
const p = 'src/core/cpu.ts';
const lines = fs.readFileSync(p, 'utf8').split(/\r\n|\r|\n/);
for (let i = 0; i < Math.min(lines.length, 120); i++) {
  const t = lines[i];
  if (/mem|pc\b|this\./ && /^\s*(public|private|readonly|this\.)/.test(t)) {
    console.log((i + 1) + ': ' + t.trim());
  }
}
