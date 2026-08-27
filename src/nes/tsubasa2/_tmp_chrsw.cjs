// 临时：检查 emu frame-0010 chr-switches + 直接读 ROM CHR 对比
const fs = require('fs');
const cs = JSON.parse(fs.readFileSync('output/emu-full/frame-0010/chr-switches.json', 'utf8'));
console.log('chr-switches type=', Array.isArray(cs) ? 'array len=' + cs.length : typeof cs);
const arr = Array.isArray(cs) ? cs : (cs.switches || Object.values(cs));
for (const e of arr.slice(0, 40)) console.log('CHR:', JSON.stringify(e));

// 找 ROM CHR 文件
const candidates = [];
function walk(dir, depth) {
  if (depth > 3) return;
  let items;
  try { items = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const it of items) {
    const p = dir + '/' + it.name;
    if (it.isDirectory()) walk(p, depth + 1);
    else if (/\.nes$/i.test(it.name)) candidates.push(p);
  }
}
walk('rom-data', 0);
walk('.', 1);
console.log('NES candidates:', candidates.slice(0, 10));
