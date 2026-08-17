const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src';
const pats = ['Bank27Service', 'bank27', 'ram_04A5', 'KEY_04A5', 'ram_05FB', 'KEY_05FB', 'ram_062A', 'KEY_062A', 'ram_00E2', 'KEY_00E2', 'ram_0034', 'ram_0063', 'ram_05F3', 'ram_05F4', 'ram_05F5'];
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p, out); }
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
}
const files = [];
walk(root, files);
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (pats.some(p => lines[i].includes(p))) {
      console.log(`${path.relative(root, f)}:${i + 1}: ${lines[i].trim()}`);
    }
  }
}
