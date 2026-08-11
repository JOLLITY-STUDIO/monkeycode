// 查找所有调用 player.load( 的位置（排除 node_modules）
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const EXCLUDE = new Set(['node_modules', '.git', '.codebuddy', 'tools', 'trace', '_tmp_bzk_out', 'mini-audio/rom-data', 'mini-audio/rom-data copy', 'rom-data', 'rom-data-tsubasa1', 'sid-data']);
const hits = [];
function walk(dir) {
  let items;
  try { items = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) {
      if (EXCLUDE.has(it.name)) continue;
      walk(p);
    } else if (/\.(ts|js|cjs)$/.test(it.name)) {
      const s = fs.readFileSync(p, 'utf8');
      const lines = s.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('.load(') || lines[i].includes('load(\n')) {
          const rel = path.relative(ROOT, p);
          hits.push(rel + ':' + (i + 1) + ': ' + lines[i].trim());
        }
      }
    }
  }
}
walk(ROOT);
console.log(hits.join('\n'));
console.log('\ntotal:', hits.length);
