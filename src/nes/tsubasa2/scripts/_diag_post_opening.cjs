// 调查 f4090-f4332 场景行为 + f3600+ 的 OAM/scroll 变化
const fs = require('fs');
const out = [];
for (let f = 4090; f <= 4332; f += 5) {
  const d = 'output/emu-full/frame-' + String(f).padStart(4, '0');
  if (!fs.existsSync(d + '/nt.json')) continue;
  const nt = JSON.parse(fs.readFileSync(d + '/nt.json', 'utf8'));
  const oam = JSON.parse(fs.readFileSync(d + '/oam.json', 'utf8'));
  const vis = oam.filter((o) => o.y < 0xef).length;
  const sig = nt.map((n) => n.tile.slice(0, 960).filter((v) => v !== 0).length).join(',');
  out.push('f' + f + ' NTnz=[' + sig + '] visSpr=' + vis);
}
console.log(out.join('\n'));
