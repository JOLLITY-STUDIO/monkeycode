/* 快速 grep 脚本: node _grep_src.cjs <pattern> <dir-or-file> [ext1,ext2...] */
const fs = require('fs');
const path = require('path');

const pattern = process.argv[2] || 'TODO';
const target = process.argv[3] || 'tsubasa2-h5-src/src';
const exts = (process.argv[4] || 'ts').split(',');

const re = new RegExp(pattern);
const results = [];

function scanFile(p) {
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (re.test(line)) results.push(`${p}:${i + 1}: ${line.trim()}`);
  });
}

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'dist' || e.name === '.git') continue;
      walk(p);
    } else if (exts.includes(path.extname(e.name).slice(1))) {
      scanFile(p);
    }
  }
}

const st = fs.statSync(target);
if (st.isFile()) scanFile(target);
else walk(target);
console.log(results.join('\n') || '(no matches)');
