const fs = require('fs');
const path = require('path');
const asm = fs.readFileSync(path.join(__dirname, '_full_disasm.asm'), 'utf8');
const lines = asm.split(/\r?\n/);
const out = [];
let started = false;
for (const line of lines) {
  const m = line.match(/\b([0-9A-F]{4})\b:/i);
  if (!m) continue;
  const addr = parseInt(m[1], 16);
  if (addr === 0xC6BE) started = true;
  if (started) {
    out.push(line);
    if (addr >= 0xC7F0) break;
  }
}
fs.writeFileSync(path.join(__dirname, '_c6be_full.txt'), out.join('\n'));
console.log('lines:', out.length);
