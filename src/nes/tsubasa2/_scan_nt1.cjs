// scan nt1 / nametable / apu references in src
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'src');
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!['node_modules', 'mini-audio'].includes(e.name)) walk(p, out); }
    else if (/\.(ts|js)$/.test(e.name)) out.push(p);
  }
}
const files = [];
walk(root, files);
const patterns = [/nt1/i, /nametable/i, /apu/i, /audio\.wav/i, /samples-per-frame/i, /emu-full/i];
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  for (const re of patterns) {
    const m = c.match(re);
    if (m) {
      // find line
      const lines = c.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (re.test(lines[i])) {
          const t = lines[i].trim().slice(0, 120);
          console.log(`${path.relative(__dirname, f)}:${i + 1}: ${t}`);
        }
      }
    }
  }
}
