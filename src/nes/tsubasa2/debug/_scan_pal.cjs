// 扫描 emu-full 帧 palette 变化（Scene0 满亮后 SPR palette 实证）
const fs = require('fs');
const p = 'output/emu-full';
const dirs = fs.readdirSync(p).filter((d) => d.startsWith('frame')).sort();
let prev = null;
const events = [];
for (const d of dirs) {
  const f = parseInt(d.slice(6), 10);
  const pf = p + '/' + d + '/palette.json';
  if (!fs.existsSync(pf)) continue;
  let pal;
  try { pal = JSON.parse(fs.readFileSync(pf, 'utf8')); } catch { continue; }
  const bg = pal.bg.join(',');
  const spr = pal.spr.join(',');
  if (prev && (prev.bg !== bg || prev.spr !== spr)) {
    events.push('f' + prev.f + ' -> f' + f + '\n  bg:  ' + prev.bg + '\n  ->   ' + bg + '\n  spr: ' + prev.spr + '\n  ->   ' + spr);
  }
  prev = { f, bg, spr };
}
console.log('palette 变化事件 (共 ' + events.length + '):');
for (const e of events.slice(0, 60)) console.log(e + '\n');
console.log('=== Scene0 区间 (f3550+) ===');
const ev2 = events.filter((e) => {
  const m = e.match(/^f(\d+)/);
  return m && parseInt(m[1], 10) >= 3550;
});
for (const e of ev2) console.log(e + '\n');
