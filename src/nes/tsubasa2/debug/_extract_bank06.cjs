const fs = require('fs');
const path = require('path');
const ls = fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).log'), 'utf8').split('\n');

// 统计 bank 06 / 0B / 00 的 $8xxx 地址分布
const stats = {};
for (const l of ls) {
  const a = l.match(/\$([0-9A-F]{2}):([0-9A-F]{4}):\s+([0-9A-F]{2}(?: [0-9A-F]{2})*)\s+(.+)/);
  if (!a) continue;
  const bank = a[1], addr = a[2];
  if (addr >= '8400' && addr <= '8660') {
    const k = bank + ':' + addr;
    stats[k] = (stats[k] || 0) + 1;
  }
}
const top = Object.entries(stats).sort((a, b) => a[0].localeCompare(b[0]));
console.log('distinct $84xx-$8660 exec addrs:', top.length);
for (const [k, v] of top) console.log('$' + k, v);
