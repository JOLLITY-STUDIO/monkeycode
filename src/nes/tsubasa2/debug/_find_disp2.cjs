// 在日志中查找场景分发器调用（JSR $A212 / $A484）与场景向量跳转目标
const fs = require('fs');
const dir = 'docs/roms/opening-all';
const p = fs.readdirSync(dir).find(n => n.endsWith('.log'));
const lines = fs.readFileSync(dir + '/' + p, 'utf8').split(/\r?\n/);
const targets = ['A212', 'A484', 'A855', 'A86E', 'A20F', 'A20C', 'A215', 'A8CE', 'A8FE'];
const hits = [];
for (const l of lines) {
  const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+.*\$([0-9A-F]{2}):([0-9A-F]{4}):\s+((?:JSR|JMP) \$([0-9A-F]{4})).*$/);
  if (m && targets.includes(m[7])) {
    hits.push({ frame: +m[1], cycle: +m[2], callAddr: '$' + m[5], target: '$' + m[7], text: m[6], bank: m[4] });
  }
}
console.log('hub 调用总数', hits.length);
const seen = new Set();
for (const h of hits) {
  const k = h.target;
  if (!seen.has(k)) { seen.add(k); console.log('首个', k, 'f' + h.frame, h.callAddr); }
}
// 按 target 分组
const byT = {};
for (const h of hits) {
  (byT[h.target] = byT[h.target] || []).push(h);
}
for (const [t, arr] of Object.entries(byT)) {
  console.log(t, '次数', arr.length, 'f', arr[0].frame + '-' + arr[arr.length - 1].frame);
  // 前 8 个调用点
  for (const h of arr.slice(0, 8)) console.log('   f' + h.frame + ' c' + h.cycle + ' from ' + h.bank + ':' + h.callAddr);
}
