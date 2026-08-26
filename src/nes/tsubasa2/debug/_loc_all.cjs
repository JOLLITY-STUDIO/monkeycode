const fs = require('fs');
const path = require('path');
function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith('.s')) out.push(p);
  }
  return out;
}
const files = walk('src/asm');
const want = [0xA82F, 0x8976, 0x88CA, 0x9085];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = /;\s*\$([0-9A-Fa-f]{4})/.exec(lines[i]);
    if (m && want.includes(parseInt(m[1], 16))) {
      console.log(`=== ${f} line ${i + 1}: $${m[1].toUpperCase()} ===`);
      for (let j = Math.max(0, i); j < Math.min(lines.length, i + 55); j++) console.log(lines[j]);
      console.log('---');
    }
  }
}
