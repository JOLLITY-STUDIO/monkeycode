/* 搜索方法定义/调用 */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const patterns = ['_entryC_oamSlotPath', '_sceneTileLoader8855', '_sceneTileLoader886E', 'bankSwitch9FA8'];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'dist' || e.name === 'trace' || e.name === 'docs' || e.name === '_test_out') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = walk(root);
for (const pat of patterns) {
  console.log(`=== ${pat} ===`);
  for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');
    lines.forEach((ln, i) => {
      if (ln.includes(pat)) {
        console.log(`  ${path.relative(root, f)}:${i + 1}: ${ln.trim().slice(0, 90)}`);
      }
    });
  }
}
