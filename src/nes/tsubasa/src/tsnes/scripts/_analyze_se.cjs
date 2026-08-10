// 从 SE-only trace 中提取每个 SE 段的特征
const fs = require('fs');
const content = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/scripts/_apu_trace_se_only.txt', 'utf8');

// 正确匹配: $4000-$4007 = SQ1/SQ2 Freq/其他, $400E = NOISE Period
// SQ1 Freq: $4002(FreqLo) + $4003(FreqHi)
// SQ2 Freq: $4006(FreqLo) + $4007(FreqHi)
// NOISE: $400E(Period)
const reLine = /^ {2}F\s+(\d+) \$400([0-7E])=0x([0-9a-f]+) (\w+)\s+(.+)/gm;

const events = [];
let m;
while ((m = reLine.exec(content)) !== null) {
  const frame = parseInt(m[1]);
  const addr = parseInt(m[2], 16);  // 0-7 or E
  const val = parseInt(m[3], 16);
  const ch = m[4];
  const desc = m[5];
  events.push({ frame, addr, val, ch, desc });
}
events.sort((a,b) => a.frame - b.frame);

// 找出所有 unique SE NOISE periods (不是 BGM 鼓点 0x01/0x05)
const allNoiseFrames = [];
for (const e of events) {
  if (e.addr === 0x0E) allNoiseFrames.push({ frame: e.frame, period: e.val });
}

// 重构 frame 数据
const frameMap = {};
for (const e of events) {
  const f = e.frame;
  if (!frameMap[f]) frameMap[f] = { noise_p: null, sq1_fl: null, sq1_fh: null, sq2_fl: null, sq2_fh: null, sq2_vol: null };
  if (e.addr === 0x0E) frameMap[f].noise_p = e.val;
  if (e.addr === 0x02) frameMap[f].sq1_fl = e.val;
  if (e.addr === 0x03) frameMap[f].sq1_fh = e.val;
  if (e.addr === 0x04) frameMap[f].sq2_vol = e.val;  // Duty/Vol
  if (e.addr === 0x06) frameMap[f].sq2_fl = e.val;
  if (e.addr === 0x07) frameMap[f].sq2_fh = e.val;
}

// 找 SE 段: NOISE period 不为 0x01/0x05 且不为 null
const seFrames = allNoiseFrames.filter(n => n.period !== 0x01 && n.period !== 0x05);

// 合并间隔 ≤ 10 帧的段
const mergedSE = [];
let cur = null;
for (const n of seFrames) {
  if (!cur) { cur = { start: n.frame, end: n.frame, n_periods: [], sq2_pair: [] }; }
  else if (n.frame - cur.end <= 10) { cur.end = n.frame; }
  else { mergedSE.push(cur); cur = { start: n.frame, end: n.frame, n_periods: [], sq2_pair: [] }; }
  cur.n_periods.push(n.period);
  // 收集该帧的 SQ2 FreqHi+Lo pair
  const fm = frameMap[n.frame];
  if (fm && fm.sq2_fl !== null && fm.sq2_fh !== null) {
    cur.sq2_pair.push({ frame: n.frame, fl: fm.sq2_fl, fh: fm.sq2_fh });
  }
}
if (cur) mergedSE.push(cur);

console.log(`=== SE 段分析 (合并后共 ${mergedSE.length} 段) ===\n`);
for (let i = 0; i < mergedSE.length; i++) {
  const s = mergedSE[i];
  const dur = s.end - s.start;
  const uniqueNP = [...new Set(s.n_periods)].sort((a,b)=>a-b);
  const uniqueSQ2 = [...new Set(s.sq2_pair.map(p => (p.fh<<8)|p.fl))].sort((a,b)=>a-b);
  
  console.log(`SE #${(i+1).toString().padStart(2)}: F${s.start.toString().padStart(4)}~F${s.end.toString().padStart(4)} (${dur.toString().padStart(3)}帧 = ${(dur/60).toFixed(2)}s)`);
  console.log(`    NOISE: [${uniqueNP.map(p=>'0x'+p.toString(16)).join(', ')}]`);
  if (uniqueSQ2.length > 0) {
    console.log(`    SQ2 频率值: ${uniqueSQ2.length}种`);
    if (uniqueSQ2.length <= 15) console.log(`      [${uniqueSQ2.map(v=>'0x'+v.toString(16)).join(', ')}]`);
    else console.log(`      前15: [${uniqueSQ2.slice(0,15).map(v=>'0x'+v.toString(16)).join(', ')}] ...`);
  }
  console.log('');
}
