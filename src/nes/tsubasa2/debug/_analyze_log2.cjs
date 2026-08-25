// 分析 opening-all.log：帧/周期连续性，检测多次运行拼接
const fs = require('fs');
const dir = 'docs/roms/opening-all';
const names = fs.readdirSync(dir);
const p = names.find(n => n.endsWith('.log'));
if (!p) { console.log('未找到 log'); process.exit(1); }
const s = fs.readFileSync(dir + '/' + p, 'utf8');
const lines = s.split(/\r?\n/).filter(l => l.trim().length > 0);
console.log('文件', p, '总行数', lines.length);
const rows = [];
for (const l of lines) {
  const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)/);
  if (m) rows.push({ frame: +m[1], cycle: +m[2], instr: +m[3] });
}
console.log('可解析行', rows.length);
let breaks = [];
for (let i = 1; i < rows.length; i++) {
  const prev = rows[i - 1], cur = rows[i];
  if (cur.cycle < prev.cycle || cur.frame < prev.frame) {
    breaks.push({ at: i, prevFrame: prev.frame, prevCycle: prev.cycle, curFrame: cur.frame, curCycle: cur.cycle });
  }
}
console.log('回退断点数', breaks.length);
for (const b of breaks.slice(0, 20)) {
  console.log(`  断点@行${b.at}: f${b.prevFrame}(c${b.prevCycle}) → f${b.curFrame}(c${b.curCycle})`);
}
// 段分析
const segs = []; let segStart = 0;
for (let i = 1; i <= rows.length; i++) {
  if (i === rows.length || rows[i].cycle < rows[i - 1].cycle) {
    segs.push({ from: segStart, to: i - 1, f0: rows[segStart].frame, f1: rows[i - 1].frame, c0: rows[segStart].cycle, c1: rows[i - 1].cycle, n: i - segStart });
    segStart = i;
  }
}
console.log('运行段数', segs.length);
segs.forEach((s2, i) => console.log(`  段${i}: 行${s2.from}-${s2.to} f${s2.f0}-f${s2.f1} c${s2.c0}-c${s2.c1} 行数${s2.n}`));
// 关键帧抽样：看开头和结尾
const frameCount = {};
for (const r of rows) frameCount[r.frame] = (frameCount[r.frame] || 0) + 1;
const dupFrames = Object.entries(frameCount).filter(([f, n]) => n > 1);
console.log('重复出现的帧数', dupFrames.length);
