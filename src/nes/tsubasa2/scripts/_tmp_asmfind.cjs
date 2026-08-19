// 临时脚本: 在 workspace 所有 .asm 文件中查找地址模式
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const targets = ['B0C0:', 'B0D7:', 'B1C9:', 'B1D3:', 'B1DE:', 'A402:', 'A474:', 'A4D8:', 'B023:', 'B02E:', 'B013:', 'B045:', 'B016:', 'A6F9:', 'A4EB:', 'A64C:', 'A6D2:', 'AFC2:', '8FC2:', '84EB:', '864C:', '86D2:'];

const dirs = [path.join(root, '_tmp_bzk_out')];
const results = [];

function walk(dir, depth) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (depth < 3) walk(path.join(dir, e.name), depth + 1);
    } else if (e.name.endsWith('.asm')) {
      const lines = fs.readFileSync(path.join(dir, e.name), 'utf8').split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const m = line.match(/0x[0-9A-F]{6} \d\d:([0-9A-F]{4}):/);
        if (m && targets.includes(m[1] + ':')) {
          results.push(`${path.relative(root, path.join(dir, e.name))}:${i + 1}: ${line.trimEnd()}`);
        }
      }
    }
  }
}

for (const d of dirs) walk(d, 0);
console.log(results.join('\n') || '(no matches)');
