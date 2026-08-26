// 扫描 emu-full nt.json: 找 NT0 tile[960]=170 / attrib[0]=8 的帧范围
const fs = require('fs');
const path = require('path');
const emuDir = 'output/emu-full';
let firstTile170 = -1, lastTile170 = -1, firstAttr8 = -1, lastAttr8 = -1;
const dirs = fs.readdirSync(emuDir).filter(d => /^frame-\d+$/.test(d)).sort((a, b) => parseInt(a.slice(6)) - parseInt(b.slice(6)));
const range = [];
for (const d of dirs) {
  const f = parseInt(d.slice(6));
  if (f < 2800 || f > 4300) continue;
  const p = path.join(emuDir, d, 'nt.json');
  if (!fs.existsSync(p)) continue;
  let data;
  try { data = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { continue; }
  const nt0 = data.find(x => x.idx === 0);
  if (!nt0) continue;
  const t170 = nt0.tile[960] === 170;
  const a8 = nt0.attrib[0] === 8;
  if (t170 && firstTile170 < 0) firstTile170 = f;
  if (t170) lastTile170 = f;
  if (a8 && firstAttr8 < 0) firstAttr8 = f;
  if (a8) lastAttr8 = f;
  if (f >= 3030 && f <= 3065) {
    const nz = nt0.tile.filter(v => v !== 0).length;
    range.push(`f${f}:t960=${nt0.tile[960]},a0=${nt0.attrib[0]},nz=${nz}`);
  }
}
console.log('first tile170:', firstTile170, 'last tile170:', lastTile170);
console.log('first attr8:', firstAttr8, 'last attr8:', lastAttr8);
console.log('\nper-frame 3030-3065:');
console.log(range.join('\n'));
console.log('done-2');
