// 分析 opening-all.log：帧范围、PRG bank 切换、关键地址写入
const fs = require('fs');
const p = 'docs/roms/opening-all/opening-all.log';
const b = fs.readFileSync(p, 'utf8');
const lines = b.split(/\r?\n/);

let minF = 99999, maxF = -1;
const banks = new Set();
const perFrame = {}; // frame -> {lines, chrWrites, bankSw}
const chrAddr = new Set();
const bankSwitches = {}; // 'addr=val' -> count

for (const l of lines) {
  const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)/);
  if (!m) continue;
  const f = +m[1];
  if (f < minF) minF = f;
  if (f > maxF) maxF = f;
  if (!perFrame[f]) perFrame[f] = { lines: 0, chrWrites: 0, bankSw: 0 };

  const inst = l.match(/\$(\w+):(\w+):\s+(.+)$/);
  if (!inst) continue;
  const bank = inst[1], addr = inst[2], rest = inst[3];
  banks.add(bank);
  perFrame[f].lines++;
  // MMC3 register writes: STA $8000/$8001 etc (via A:xx after instruction)
  if (/STA \$8000/.test(rest) || /STA \$8001/.test(rest) || /STA \$8002/.test(rest) || /STA \$8003/.test(rest)) {
    perFrame[f].bankSw++;
  }
  if (/STA \$2006|STA \$2007|STA \$2000|STA \$2001|STA \$2005/.test(rest)) {
    perFrame[f].chrWrites++;
  }
}
console.log('frame range: f' + minF + ' .. f' + maxF);
console.log('PRG banks seen: ' + [...banks].join(','));

// 每 30 帧聚合一次，看 PPU 写入活跃度
console.log('\n--- PPU write activity per 30 frames ---');
let bucket = null, bucketF = null;
const rows = [];
for (let f = minF; f <= maxF; f++) {
  const d = perFrame[f] || { lines: 0, chrWrites: 0, bankSw: 0 };
  const key = Math.floor(f / 30);
  if (!rows[key]) rows[key] = { lines: 0, chrWrites: 0, bankSw: 0, frames: 0 };
  rows[key].lines += d.lines;
  rows[key].chrWrites += d.chrWrites;
  rows[key].bankSw += d.bankSw;
  rows[key].frames++;
}
rows.forEach((r, k) => {
  if (!r) return;
  console.log('f' + (k * 30) + '-' + (k * 30 + r.frames - 1) + ': inst=' + r.lines + ' ppuWr=' + r.chrWrites + ' bankSw=' + r.bankSw);
});
