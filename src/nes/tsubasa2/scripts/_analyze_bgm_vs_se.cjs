const fs = require('fs');
const f = fs.readFileSync(__dirname + '/_apu_trace_opening.txt', 'utf8');
const lines = f.split('\n');

// 解析 NOISE Period 序列
const np = []; // { f, v }
lines.forEach(l => {
  const m = l.match(/F\s*(\d+).*\$400E=0x([0-9a-f]+) NOISE Period/);
  if (m) np.push({ f: parseInt(m[1]), v: parseInt(m[2], 16) });
});

// 找 Period 变化的事件
const changes = [];
let lastV = -1;
np.forEach(e => {
  if (e.v !== lastV) { changes.push(e); lastV = e.v; }
});

// 方法1: 帧间隔分析 - BGM pattern 是规律的，SE 是不规律的
console.log('=== 帧间隔分析 (BGM=规律间隔, SE=密集突变) ===');
const gaps = [];
for (let i = 1; i < changes.length; i++) {
  gaps.push({ from: changes[i-1], to: changes[i], gap: changes[i].f - changes[i-1].f });
}

// 统计 gap 分布
const gapCount = {};
gaps.forEach(g => { gapCount[g.gap] = (gapCount[g.gap] || 0) + 1; });
console.log('帧间隔分布:');
Object.entries(gapCount).sort((a,b)=>b[1]-a[1]).slice(0,15).forEach(([g,n]) => console.log('  ' + g + '帧: ' + n + '次'));

// 方法2: 按 Period 值序列找出 SE 片段
// BGM特征是 0x01↔0x05 交替，或是 0x05 单独持续
// SE特征是短时间内出现3+种不同Period值
console.log('\n=== SE 片段识别 (连续3+种Period值) ===');
const seSegments = [];
let seg = [changes[0]];
for (let i = 1; i < changes.length; i++) {
  const gap = changes[i].f - changes[i-1].f;
  if (gap <= 20) {
    seg.push(changes[i]);
  } else {
    // 分析已收集的片段
    const vals = new Set(seg.map(s => s.v));
    if (vals.size >= 3 && seg.length >= 4) {
      const str = seg.map(s => '0x' + s.v.toString(16)).join('→');
      seSegments.push({
        start: seg[0].f,
        end: seg[seg.length-1].f,
        len: seg.length,
        vals: vals.size,
        pattern: str,
        range: seg[seg.length-1].f - seg[0].f,
      });
    }
    seg = [changes[i]];
  }
}

// 去重相似片段
const uniqueSEs = [];
seSegments.forEach(s => {
  const dup = uniqueSEs.find(u => u.pattern === s.pattern);
  if (!dup) uniqueSEs.push(s);
});

uniqueSEs.forEach((s, i) => {
  console.log(`SE#${i+1}: F${s.start}-F${s.end} (${s.range}帧) ${s.len}次变化 ${s.vals}种值`);
  console.log('  ' + s.pattern.substring(0, 100));
});

// 方法3: BGM 鼓点 pattern (0x05 ↔ 0x01)
console.log('\n=== BGM 鼓点识别 (0x01↔0x05 交替) ===');
const bgmDrum = changes.filter((c, i) => {
  if (i < 1 || i >= changes.length - 1) return false;
  const prev = changes[i-1].v;
  const curr = c.v;
  const next = changes[i+1].v;
  return (curr === 0x05 && prev === 0x01 && next === 0x01) ||
         (curr === 0x01 && prev === 0x05 && next === 0x05);
});
console.log('BGM 鼓点切换: ' + bgmDrum.length + ' 次 (0x01/0x05 交替)');

// 统计 BGM vs SE 占比
let bgmChanges = 0, seChanges = 0;
changes.forEach((c, i) => {
  if (c.v === 0x01 || c.v === 0x05) bgmChanges++;
  else seChanges++;
});
console.log('BGM鼓点变化: ' + bgmChanges + '次, SE变化: ' + seChanges + '次');

// 列出所有不同 SE 出现的帧段 (非 0x01/0x05 的连续区域)
console.log('\n=== SE 活跃帧段 (非BGM鼓点) ===');
let seActive = false;
let seStart = 0;
changes.forEach((c, i) => {
  if (c.v !== 0x01 && c.v !== 0x05) {
    if (!seActive) { seActive = true; seStart = c.f; }
  } else {
    if (seActive) {
      const dur = c.f - seStart;
      if (dur >= 5) console.log('  F' + seStart + ' ~ F' + c.f + ' (' + dur + '帧)');
      seActive = false;
    }
  }
});
if (seActive) console.log('  F' + seStart + ' ~ END');
