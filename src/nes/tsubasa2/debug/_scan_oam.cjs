// 扫描 emu-full 全部帧 OAM y 变化，定位 Scene0 各阶段（下漂/滚动/清屏）
const fs = require('fs');
const p = 'output/emu-full';
const dirs = fs.readdirSync(p).filter((d) => d.startsWith('frame')).sort();
let prev = null;
const events = [];
for (const d of dirs) {
  const f = parseInt(d.slice(6), 10);
  const oamFile = p + '/' + d + '/oam.json';
  if (!fs.existsSync(oamFile)) continue;
  let oam;
  try { oam = JSON.parse(fs.readFileSync(oamFile, 'utf8')); } catch { continue; }
  // 特征：前 40 slot 的 y 和、x 和、attr 和；非空 sprite 数
  let ysum = 0, xsum = 0, attrSum = 0, alive = 0, minY = 255, maxY = 0;
  for (let i = 0; i < 64; i++) {
    const s = oam[i];
    if (s.y !== 0 || s.tile !== 0 || s.attr !== 0 || s.x !== 0) {
      ysum += s.y; xsum += s.x; attrSum += s.attr; alive++;
      if (s.y < minY) minY = s.y;
      if (s.y > maxY) maxY = s.y;
    }
  }
  const key = f + ' alive=' + alive + ' ysum=' + ysum + ' minY=' + minY + ' maxY=' + maxY + ' attrSum=' + attrSum;
  if (prev && (prev.ysum !== ysum || prev.alive !== alive || prev.attrSum !== attrSum)) {
    events.push('f' + prev.f + ' -> f' + f + '  [alive ' + prev.alive + '->' + alive + ', ysum ' + prev.ysum + '->' + ysum + ', attrSum ' + prev.attrSum + '->' + attrSum + ']');
  }
  prev = { f, ysum, alive, attrSum };
}
console.log('OAM 变化事件 (共 ' + events.length + '):');
for (const e of events.slice(0, 120)) console.log(e);
