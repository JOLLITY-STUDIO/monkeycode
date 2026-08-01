const fs = require('fs');
const t = fs.readFileSync('_old_data.ts', 'utf-8');

// 匹配所有 DATA_$XXXX_$YYYY 数组
const re = /export const (DATA_\$([0-9A-Fa-f]+)_\$([0-9A-Fa-f]+)): readonly number\[\] = \[([\s\S]*?)\];/g;

let m;
const blocks = [];
while ((m = re.exec(t)) !== null) {
  const name = m[1];
  const start = parseInt(m[2], 16);
  const body = m[3];
  const nums = [...body.matchAll(/(0x[0-9A-Fa-f]{2})/g)].map(n => n[0]);
  // Only layout data (offset >= 0x041C)
  if (start >= 0x041C) {
    blocks.push({ start, name, nums });
  }
}

// Generate _RAW_LAYOUT_BLOCKS array
let out = 'const _RAW_LAYOUT_BLOCKS: [number, readonly number[]][] = [\n';
for (const b of blocks) {
  const off = b.start - 0x8000;
  // Format numbers in rows of 16
  let numsStr = '';
  for (let i = 0; i < b.nums.length; i++) {
    if (i % 16 === 0) numsStr += '\n    ';
    numsStr += b.nums[i] + (i < b.nums.length - 1 ? ',' : '');
  }
  out += `  [0x${off.toString(16).toUpperCase().padStart(4, '0')}, [${numsStr}]],\n`;
}
out += '];';

fs.writeFileSync('_raw_blocks_out.txt', out, 'utf-8');
console.log(`Extracted ${blocks.length} raw layout blocks`);
for (const b of blocks) {
  console.log(`  ${b.name}: ${b.nums.length} bytes`);
}
