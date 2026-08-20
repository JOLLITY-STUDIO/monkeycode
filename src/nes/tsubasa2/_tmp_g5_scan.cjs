// G5 巡检: 查找 CHR 相关文件/引用
const fs = require('fs');
const path = require('path');

function walk(dir, depth, out) {
  if (depth <= 0) return;
  let items;
  try { items = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) walk(p, depth - 1, out);
    else out.push(p);
  }
}

const srcFiles = [];
walk('src', 6, srcFiles);
const hits = srcFiles.filter(f => /chr/i.test(f));
console.log('=== src 中含 chr 的文件 ===');
hits.forEach(f => console.log(f));

// 查找 chr 二进制/数据源
const rootHits = [];
walk('.', 2, rootHits);
const chrFiles = rootHits.filter(f => /\.chr$/i.test(f) || /chr.*\.(bin|ts)$/i.test(f));
console.log('\n=== 根目录 CHR 数据源 ===');
chrFiles.forEach(f => console.log(f));

// 检查 ppu 渲染如何取 tile: 找 chr-slot-mapper
console.log('\n=== chr-slot-mapper.ts ===');
console.log(fs.readFileSync('src/game/data/ppu/chr/chr-slot-mapper.ts', 'utf8').slice(0, 3000));
