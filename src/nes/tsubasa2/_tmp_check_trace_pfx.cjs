// 检查 trace 文件里的 bank 前缀：$06: 还是 $0C:，并抓写 $4000 的行
const fs = require('fs');
const files = [
  'docs/trace/Captain Tsubasa II - Super Striker (Japan)-openning4.log'
];
const prefixCount = {};
const apuLines = new Map(); // bank 前缀 -> 示例行
for (const f of files) {
  if (!fs.existsSync(f)) { console.log('MISSING', f); continue; }
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  let apu = 0;
  for (const line of lines) {
    const m = line.match(/\$([0-9A-Fa-f]{2}):[0-9A-Fa-f]{4}:/);
    if (m) {
      const pfx = m[1].toUpperCase();
      prefixCount[pfx] = (prefixCount[pfx] || 0) + 1;
      if (line.includes('$400')) {
        apu++;
        if (!apuLines.has(pfx)) apuLines.set(pfx, line.trim().slice(0, 140));
      }
    }
  }
  console.log(`FILE ${f}: lines=${lines.length}`);
  console.log('bank 前缀分布:', JSON.stringify(prefixCount, null, 0));
  console.log('写 APU($400x) 的行数:', apu);
  console.log('各 bank 写 APU 示例:');
  for (const [pfx, sample] of apuLines) {
    console.log(`  $${pfx}: ${sample}`);
  }
}
