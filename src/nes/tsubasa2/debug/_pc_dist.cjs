const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, 'trace');

// 每段统计: 按 bank 前缀 + PC 高字节分布
for (let s = 1; s <= 10; s++) {
  const f = path.join(dir, `cpu_seg${String(s).padStart(3, '0')}.log`);
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  const dist = {};
  let total = 0;
  const pcTop = {};
  for (const l of lines) {
    const m = l.match(/^i\d+\s+\$(\w+):([0-9A-F]{4}):/);
    if (!m) continue;
    total++;
    const key = `$${m[1]}:${m[2][0]}${m[2][1]}xx`;
    dist[key] = (dist[key] || 0) + 1;
    const t2 = `$${m[1]}:${m[2]}`;
    if (!pcTop[t2]) pcTop[t2] = 0;
    pcTop[t2]++;
  }
  const sorted = Object.entries(dist).sort((a, b) => b[1] - a[1]).slice(0, 12);
  console.log(`\n=== seg${s} (${total} 指令) PC 分布 TOP12 ===`);
  for (const [k, v] of sorted) console.log(`  ${k}  ${v}  (${(v / total * 100).toFixed(1)}%)`);
  // 找出最热的 PC
  const hot = Object.entries(pcTop).sort((a, b) => b[1] - a[1]).slice(0, 5);
  console.log(`  最热 PC: ${hot.map(([k, v]) => `${k}x${v}`).join(' ')}`);
}
