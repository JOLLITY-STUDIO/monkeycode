const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.resolve(__dirname, '_boot_probe_out.txt'), 'utf8');
const lines = raw.split('\n');
const frames = [];
for (const l of lines) {
  const m = l.match(/^f(\d+)\s+scene=(\d+)\s+r44=(\d+)\s+r45=(\d+)\s+r46=(\d+)\s+r47=(\d+)\s+r79=(\d+)\s+r7a=(\d+)\s+r7b=(\d+)\s+r7c=(\d+)\s+r1b=([0-9a-f]+)\s+r5b=(\d+)\s+r628=(\d+)/i);
  if (m) {
    frames.push({
      f: +m[1], scene: +m[2], r44: +m[3], r45: +m[4], r46: +m[5], r47: +m[6],
      r79: +m[7], r7a: +m[8], r7b: +m[9], r7c: +m[10], r1b: m[11], r5b: +m[12], r628: +m[13],
    });
  }
}
console.log('parsed frames:', frames.length);
// 找变化点
let prev = null;
for (const fr of frames) {
  if (!prev) { prev = fr; continue; }
  const ch = [];
  for (const k of ['scene', 'r44', 'r45', 'r46', 'r47', 'r79', 'r7a', 'r7b', 'r7c', 'r1b', 'r5b', 'r628']) {
    if (fr[k] !== prev[k]) ch.push(k + ':' + prev[k] + '->' + fr[k]);
  }
  if (ch.length) console.log('f' + fr.f, ch.join(' '));
  prev = fr;
}
// 打印 r44 非 0 的帧
const r44nz = frames.filter((x) => x.r44 !== 0);
console.log('r44 nonzero frames:', r44nz.length, r44nz.slice(0, 30).map((x) => 'f' + x.f + '=' + x.r44).join(' '));
// r79 变化范围
const r79s = [...new Set(frames.map((x) => x.r79))].sort((a, b) => a - b);
console.log('r79 distinct values:', r79s.join(','));
const r7cs = [...new Set(frames.map((x) => x.r7c))].sort((a, b) => a - b);
console.log('r7c distinct values:', r7cs.join(','));
