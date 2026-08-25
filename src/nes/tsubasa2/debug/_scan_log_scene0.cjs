// _scan_log_scene0.cjs — 扫描 opening-all.log 的 Scene0 地址序列，重建 emu 时序
const fs = require('fs');
const log = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8').split('\n');
console.log('total lines:', log.length);

// 找首现/末现的 Scene0 关键地址
const targets = ['A4C1', 'A4C6', 'A4C9', 'A4CB', 'A4D0', 'A4D2', 'A4D5', 'A4D6', 'A4D8', 'A4DE', 'A4E0',
  'A4E5', 'A4E9', 'A4F6', 'A4F9', 'A4FC', 'A4FF', 'A504', 'A506', 'A50A', 'A50D', 'A511', 'A513',
  'A517', 'A51A', 'A520', 'A522', 'A525', 'A527', 'A52A', 'A530', 'A538', 'A53B', 'A53E', 'A554', 'A557', 'A559'];
const first = {}, last = {};
for (let i = 0; i < log.length; i++) {
  const m = /^f(\d+)\s+c\d+\s+i\d+\s+A:[0-9A-F]{2} X:[0-9A-F]{2} Y:[0-9A-F]{2} S:[0-9A-F]{2} P:\S+ \$0[01]:([0-9A-F]{4}):/.exec(log[i]);
  if (!m) continue;
  const frame = +m[1];
  const addr = m[2];
  for (const t of targets) {
    if (addr === t) {
      if (first[t] === undefined) first[t] = frame;
      last[t] = frame;
      break;
    }
  }
}
console.log('--- Scene0 关键地址首/末现帧 (log bank $00/$01) ---');
for (const t of targets) {
  console.log(`${t}: first=${first[t] ?? '-'} last=${last[t] ?? '-'}`);
}
