const fs = require('fs');
const path = require('path');
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      if (f === 'node_modules') continue;
      walk(p);
    } else if (/\.(js|ts|mjs|cjs)$/i.test(f)) {
      let c = '';
      try { c = fs.readFileSync(p, 'utf8'); } catch (e) { continue; }
      if (c.length < 500000 && /PRG|prgRom|prgData|nes\.rom|0x4210|4A10|ROM_BYTES|romData/i.test(c)) {
        console.log(p);
      }
    }
  }
}
walk('src/core');
console.log('---done---');
