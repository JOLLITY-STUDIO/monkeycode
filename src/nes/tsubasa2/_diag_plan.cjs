// 临时:诊断 frame0 后 perScanlineChrPlan 是否设置 + applyChrPlanAt 是否生效
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');

const rt = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(rt);

console.log('boot slots:', rt.chrSlots.join(','));
console.log('boot perScanlineChrPlan len:', rt.perScanlineChrPlan ? rt.perScanlineChrPlan.length : 'N/A');

rt.frame(g);
console.log('after f0 slots:', rt.chrSlots.join(','));
console.log('after f0 plan len:', rt.perScanlineChrPlan ? rt.perScanlineChrPlan.length : 'N/A');
if (rt.perScanlineChrPlan && rt.perScanlineChrPlan.length) {
  for (const e of rt.perScanlineChrPlan) {
    console.log('plan entry s=' + e.s + ' b=[' + e.b.join(',') + ']');
  }
}

// 手动模拟 applyChrPlanAt 于 scanline 0 和 130
function sim(plan, scan) {
  if (!plan || plan.length === 0) return null;
  let banks = plan[0].b;
  for (const e of plan) {
    if (e.s <= scan) banks = e.b;
    else break;
  }
  return banks;
}
console.log('sim s=0:', sim(rt.perScanlineChrPlan, 0).join(','));
console.log('sim s=129:', sim(rt.perScanlineChrPlan, 129).join(','));
console.log('sim s=130:', sim(rt.perScanlineChrPlan, 130).join(','));

// ptTile 检查: slot0 tile40 / slot4 tile40 的 opaque 首行
const ppu = rt.ppu;
for (const slot of [0, 4]) {
  const t = ppu.ptTile[slot * 64 + 40];
  const op = t && t.opaque ? Array.from(t.opaque).map(v => v ? '#' : '.').join('') : '?';
  console.log('ptTile slot' + slot + ' tile40 opaque=' + op);
}
