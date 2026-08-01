/**
 * Layout Tile 对照检索工具
 *
 * 用法:
 *   node bank-22-sprite-engine-data-fordebuging.search.cjs 0x40 0x5F 0x44 ...
 *   (直接把 debug spr 输出的 tile 序列贴进来)
 */

const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'bank-22-sprite-engine-data-fordebuging.ts'), 'utf-8');

// 匹配: LAYOUT_$XXXX_TILES_VALUES: readonly number[] = [...]
const re = /(LAYOUT_\$[A-F0-9]+)_TILES_VALUES:\s*readonly\s+number\[\]\s*=\s*\[([\s\S]*?)\];/g;

const layouts = {};
let m;
while ((m = re.exec(src)) !== null) {
  const name = m[1];
  const tilesStr = m[2];
  const tiles = [];
  const hexRe = /0x([0-9A-F]{2})/gi;
  let hm;
  while ((hm = hexRe.exec(tilesStr)) !== null) {
    tiles.push(parseInt(hm[1], 16));
  }
  layouts[name] = new Set(tiles);
}

const input = process.argv.slice(2);
if (input.length === 0) {
  console.log('用法: node ...search.cjs 0x40 0x5F 0x44 ...');
  console.log('或者: node ...search.cjs 64 95 68 ...');
  process.exit(0);
}

const tiles = input.map(s => {
  if (s.startsWith('0x') || s.startsWith('0X')) return parseInt(s, 16);
  return parseInt(s, 10);
});

console.log('='.repeat(55));
console.log(`search ${tiles.length} tiles:`);
console.log(tiles.map(t => `0x${t.toString(16).toUpperCase()}`).join(' '));
console.log('='.repeat(55) + '\n');

tiles.forEach((tile, i) => {
  const matches = [];
  for (const [name, tileSet] of Object.entries(layouts)) {
    if (tileSet.has(tile)) matches.push(name);
  }
  const tag = `#${i + 1}`.padEnd(4);
  if (matches.length === 0) {
    console.log(`[${tag}] 0x${tile.toString(16).toUpperCase()} => (no match)`);
  } else {
    console.log(`[${tag}] 0x${tile.toString(16).toUpperCase()} => ${matches.length}: ${matches.join(', ')}`);
  }
});

// summary
console.log('\n' + '='.repeat(55));
console.log('hit ranking:');

const hitCounts = {};
for (const [name, tileSet] of Object.entries(layouts)) {
  let count = 0;
  tiles.forEach(t => { if (tileSet.has(t)) count++; });
  if (count > 0) hitCounts[name] = count;
}

const sorted = Object.entries(hitCounts).sort((a, b) => b[1] - a[1]);
sorted.forEach(([name, count]) => {
  const pct = ((count / tiles.length) * 100).toFixed(1);
  console.log(`  ${name}: ${count}/${tiles.length} (${pct}%)`);
});
