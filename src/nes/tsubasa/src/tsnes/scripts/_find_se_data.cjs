// 找出 SE-only trace 中的独特 NOISE period 及其帧段
const fs = require('fs');

const se = fs.readFileSync('scripts/_apu_trace_se_only.txt', 'utf8');
const lines = se.split('\n').filter(l => l.trim());

// 收集所有 SE 段中 NOISE 的 period 分布
const noisePeriods = {};
let inSE = false;

for (const line of lines) {
  if (line.includes('NOISE')) {
    const m = line.match(/period=0x([0-9A-F]+)/);
    const fm = line.match(/frame=(\d+)/);
    if (m && fm) {
      const p = parseInt(m[1], 16);
      const f = parseInt(fm[1]);
      if (!noisePeriods[p]) noisePeriods[p] = [];
      noisePeriods[p].push(f);
    }
  }
}

console.log('=== SE-Only NOISE Period 分布 ===\n');
const periods = Object.keys(noisePeriods).map(Number).sort((a,b)=>a-b);
for (const p of periods) {
  const frames = noisePeriods[p];
  // 合并连续帧
  const ranges = [];
  let start = frames[0], end = frames[0];
  for (let i = 1; i < frames.length; i++) {
    if (frames[i] <= end + 2) { end = frames[i]; }
    else { ranges.push([start, end]); start = frames[i]; end = frames[i]; }
  }
  ranges.push([start, end]);
  
  console.log(`Period 0x${p.toString(16).padStart(2,'0')}: ${frames.length}次, ${ranges.length}段`);
  for (const [s, e] of ranges) {
    console.log(`  F${s}~F${e} (${e-s}帧)`);
  }
}

// 还看 SQ1/SQ2 在 SE 段的变化
console.log('\n=== SE段中 SQ1/SQ2 的 freq 变化 ===\n');
const sqChanges = {};
for (const line of lines) {
  if (line.includes('SQ1') || line.includes('SQ2')) {
    const fm = line.match(/frame=(\d+)/);
    const ff = line.match(/freq=([\d.]+)/);
    if (fm && ff) {
      const f = parseInt(fm[1]);
      const freq = parseFloat(ff[1]);
      if (!sqChanges[f]) sqChanges[f] = [];
      sqChanges[f].push(line.trim());
    }
  }
}

const sqFrames = Object.keys(sqChanges).map(Number).sort((a,b)=>a-b);
if (sqFrames.length > 0) {
  console.log(`共有 ${sqFrames.length} 帧有 SQ1/SQ2 活动（通常=SE触发了旋律通道）`);
  sqFrames.slice(0, 20).forEach(f => {
    console.log(`F${f}: ${sqChanges[f][0]}`);
  });
  if (sqFrames.length > 20) console.log(`... 还有 ${sqFrames.length-20} 帧`);
} else {
  console.log('无 SQ1/SQ2 活动（SE 纯走 NOISE）');
}
