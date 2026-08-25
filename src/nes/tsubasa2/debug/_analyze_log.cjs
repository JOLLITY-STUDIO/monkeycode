// 分析 opening 日志：检测帧号/周期号连续性，判断是否多次运行拼接
const fs = require('fs');
const p = 'docs/roms/opening-all/openning-4097清屏-到循环重新4343出现tecmo又.log';
const s = fs.readFileSync(p, 'utf8');
const lines = s.split(/\r?\n/).filter(l => l.trim().length > 0);
console.log('总行数', lines.length);

const rows = [];
for (const l of lines) {
  const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+(.+?)\s+\$(..):([0-9A-F]{4}):/i);
  if (m) rows.push({ frame: +m[1], cycle: +m[2], instr: +m[3], bank: m[5], addr: m[6], text: m[4] });
}
console.log('可解析行', rows.length);

// 找周期/帧回退点（多次运行拼接的标志）
let breaks = [];
for (let i = 1; i < rows.length; i++) {
  const prev = rows[i - 1], cur = rows[i];
  if (cur.cycle < prev.cycle || cur.frame < prev.frame || cur.instr < prev.instr) {
    breaks.push({ at: i, prevFrame: prev.frame, prevCycle: prev.cycle, curFrame: cur.frame, curCycle: cur.cycle });
  }
}
console.log('回退断点数', breaks.length);
for (const b of breaks.slice(0, 30)) {
  console.log(`  断点@行${b.at}: f${b.prevFrame}(c${b.prevCycle}) → f${b.curFrame}(c${b.curCycle})`);
}

// 每段的帧范围
const segs = [];
let segStart = 0;
for (let i = 1; i <= rows.length; i++) {
  if (i === rows.length || rows[i].cycle < rows[i - 1].cycle) {
    segs.push({ from: segStart, to: i - 1, f0: rows[segStart].frame, f1: rows[i - 1].frame, c0: rows[segStart].cycle, c1: rows[i - 1].cycle, n: i - segStart });
    segStart = i;
  }
}
console.log('运行段数', segs.length);
segs.forEach((s2, i) => console.log(`  段${i}: 行${s2.from}-${s2.to} f${s2.f0}-f${s2.f1} c${s2.c0}-c${s2.c1} 行数${s2.n}`));

// 各帧出现的次数（同一帧在多段出现 = 重复运行）
const frameCount = {};
for (const r of rows) frameCount[r.frame] = (frameCount[r.frame] || 0) + 1;
const dupFrames = Object.entries(frameCount).filter(([f, n]) => n > 1);
console.log('重复出现的帧数', dupFrames.length, '示例', dupFrames.slice(0, 10));

// 关键帧：4097 清屏 / 4343 tecmo 处的内容
const KEY = [4097, 4343];
for (const k of KEY) {
  const hit = rows.filter(r => r.frame === k);
  console.log(`帧${k} 行数`, hit.length);
  if (hit.length) {
    const first = hit[0], last = hit[hit.length - 1];
    console.log(`  首: c${first.cycle} bank${first.bank} $${first.addr} ${first.text}`);
    console.log(`  尾: c${last.cycle} bank${last.bank} $${last.addr} ${last.text}`);
  }
}

// 相邻帧覆盖：看 4097 附近与 4343 附近分别在做什么（抽样）
for (const k of [4090, 4097, 4100, 4330, 4340, 4343, 4350]) {
  const hit = rows.filter(r => r.frame === k);
  if (!hit.length) continue;
  const first = hit[0];
  console.log(`f${k} c${first.cycle} bank${first.bank} $${first.addr} ${first.text}`);
}
