// 提取代表帧完整内容
const fs = require('fs');
const lines = fs.readFileSync('docs/roms/opening-all/opening-all-per-frame.log', 'utf8').split(/\r?\n/);
const WANT = new Set([282, 347, 418, 1207, 2136, 3607, 3638, 3731, 4083, 4096, 4337]);
const byFrame = {};
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^f(\d+)\s/);
  if (m) { const f = +m[1]; (byFrame[f] = byFrame[f] || []).push(lines[i]); }
}
for (const f of [...WANT].sort((a, b) => a - b)) {
  const arr = byFrame[f] || [];
  console.log(`\n========== f${f} (${arr.length} lines) ==========`);
  for (const l of arr.slice(0, 100)) console.log(l.slice(0, 160));
}
