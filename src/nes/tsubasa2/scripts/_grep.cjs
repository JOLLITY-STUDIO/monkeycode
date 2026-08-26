// 通用递归文本搜索（替代损坏的 search_content）
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const root = args[0];
const pattern = args[1];
const exts = (args[2] || 'ts').split(',').map(e => '.' + e.replace(/^\./, ''));
const out = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('node_modules') || e.name.startsWith('.git')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (exts.some(x => e.name.endsWith(x))) {
      try {
        const c = fs.readFileSync(p, 'utf8');
        const lines = c.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(pattern)) out.push(p + ':' + (i + 1) + ': ' + lines[i].trim());
        }
      } catch {}
    }
  }
}
walk(root);
console.log(out.join('\n') || 'NO MATCH');
