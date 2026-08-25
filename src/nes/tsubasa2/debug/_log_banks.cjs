// 统计 opening-all.log 中出现过的 bank 前缀和地址分布
const fs = require('fs');
const log = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8');
const lines = log.split(/\r?\n/);
const banks = {};
const addrBanks = {};
let frames = new Set();
const re = /^f(\d+)\s+c\d+\s+i\d+\s+A:[0-9A-F]{2}\s+X:[0-9A-F]{2}\s+Y:[0-9A-F]{2}\s+S:[0-9A-F]{2}\s+P:\S+\s+\$(\d+):([0-9A-F]{4}):/;
let bad = 0;
for (const l of lines) {
  if (!l.trim()) continue;
  const m = l.match(re);
  if (!m) { bad++; continue; }
  frames.add(parseInt(m[1], 10));
  const bk = m[2];
  const addr = m[3];
  banks[bk] = (banks[bk] || 0) + 1;
  const key = bk + ':' + addr[0];
  addrBanks[key] = (addrBanks[key] || 0) + 1;
}
console.log('总行数', lines.length, 'bad', bad);
console.log('frames 范围:', Math.min(...frames), '..', Math.max(...frames), '共', frames.size);
console.log('bank 前缀分布:', JSON.stringify(banks));
console.log('bank:地址高位分布:', JSON.stringify(addrBanks, null, 1));
