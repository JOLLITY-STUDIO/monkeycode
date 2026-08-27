const fs = require('fs');
const path = require('path');
const root = process.cwd();
const out = [];
const skip = new Set(['node_modules', '.git', 'output', 'dist', 'dist-cjs', 'dist-cjs2', 'mini-audio', 'asm', 'docs', 'rom-data', 'debug', 'tools', 'test', '.codebuddy']);
function walk(p, depth) {
  if (depth > 3) return;
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    const base = path.basename(p);
    if (skip.has(base)) return;
    for (const e of fs.readdirSync(p)) walk(path.join(p, e), depth + 1);
  } else if (/\.(ts|js|json|wxml|wxss|config|cjs|mjs)$/.test(p)) {
    const txt = fs.readFileSync(p, 'utf8');
    if (txt.includes('dist-cjs2-test')) {
      out.push(p);
    }
  }
}
walk(root, 0);
console.log(out.length ? out.join('\n') : '(none)');
