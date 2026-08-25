// 分步扫描 opening trace（避免巨型正则）
const fs = require('fs');
const b = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8');
const out = [];

try {
  // 1) STA $00ED 指令出现次数
  let idx = 0;
  const hits = [];
  while (true) {
    const p = b.indexOf('STA $00ED', idx);
    if (p < 0) break;
    hits.push(p);
    idx = p + 1;
  }
  out.push('STA $00ED occurrences: ' + hits.length);
  hits.slice(0, 30).forEach((p, i) => {
    out.push('  #' + i + ' @' + p + ' ctx[' + b.slice(Math.max(0, p - 90), p + 25).replace(/\r/g, '\\r').replace(/\n/g, '\\n') + ']');
  });
} catch (e) {
  out.push('ERR1: ' + e.message);
}

try {
  // 2) 含 "00ED" 的任意片段
  let idx = 0;
  let cnt = 0;
  const samples = [];
  while (true) {
    const p = b.indexOf('00ED', idx);
    if (p < 0) break;
    if (cnt < 12) samples.push(b.slice(Math.max(0, p - 50), p + 30).replace(/\r/g, '\\r').replace(/\n/g, '\\n'));
    cnt++;
    idx = p + 1;
  }
  out.push('\n"00ED" occurrences: ' + cnt);
  samples.forEach((s, i) => out.push('  #' + i + ' [' + s + ']'));
} catch (e) {
  out.push('ERR2: ' + e.message);
}

fs.writeFileSync('debug/_scene_flow2.txt', out.join('\n'), 'utf8');
process.stdout.write('WROTE ' + out.length + ' lines\n');
