// 分析 bank 31 CDL 标注：代码段＆数据段
const fs = require('fs');

// CDL 文件
const cdl = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/Captain Tsubasa II - Super Striker (Japan).cdl');
const BANK_8K = 8192;
const BANK_OFFSET = 31 * BANK_8K;

// 分析 bank 31 每个字节
let codeRanges = [], dataRanges = [];
let inCode = false, inData = false;

for (let i = 0; i < BANK_8K; i++) {
  const addr = i + 0xE000;
  const b = cdl[BANK_OFFSET + i];
  const isCode = !!(b & 1);
  const isData = !!(b & 2);
  const isRead = !!(b & 4);
  const isExec = !!(b & 8);

  if (isCode && !inCode) { inCode = true; codeRanges.push({ start: addr, end: addr }); }
  else if (isCode && inCode) { codeRanges[codeRanges.length - 1].end = addr; }
  else { inCode = false; }
  
  if ((isData || isRead) && !inData) { inData = true; dataRanges.push({ start: addr, end: addr, flags: [] }); }
  else if ((isData || isRead) && inData) { dataRanges[dataRanges.length - 1].end = addr; }
  else { inData = false; }
}

// 合并小间隔
function merge(ranges, gap) {
  if (ranges.length < 2) return ranges;
  const merged = [ranges[0]];
  for (let i = 1; i < ranges.length; i++) {
    const prev = merged[merged.length - 1];
    if (ranges[i].start - prev.end <= gap) {
      prev.end = ranges[i].end;
    } else {
      merged.push(ranges[i]);
    }
  }
  return merged;
}

// 统计：每 256 字节段内的代码密度
console.log('=== Bank 31 ($E000-$FFFF) CDL 分析 ===\n');

console.log('代码段 (CDL bit0=1):');
const cRanges = merge(codeRanges.filter(r => r.end - r.start >= 2), 8);
for (const r of cRanges) {
  const sz = r.end - r.start + 1;
  console.log(`  $${r.start.toString(16).toUpperCase().padStart(4)} - $${r.end.toString(16).toUpperCase().padStart(4)} (${sz}B)`);
}

console.log('\n数据/读取段 (CDL bit2+4):');
const dRanges = merge(dataRanges.filter(r => r.end - r.start >= 2), 8);
for (const r of dRanges) {
  const sz = r.end - r.start + 1;
  console.log(`  $${r.start.toString(16).toUpperCase().padStart(4)} - $${r.end.toString(16).toUpperCase().padStart(4)} (${sz}B)`);
}

// 每 256 字节统计
console.log('\n每256字节统计 (C=代码 D=数据 - =未标注):');
for (let page = 0xE0; page < 0x100; page++) {
  let c = 0, d = 0;
  for (let i = 0; i < 256; i++) {
    const idx = (page * 256 - 0xE000 + i);
    if (idx >= 0 && idx < BANK_8K) {
      const b = cdl[BANK_OFFSET + idx];
      if (b & 1) c++;
      if (b & 2) d++;
    }
  }
  if (c + d > 0) {
    const bar = 'C'.repeat(Math.min(c / 8, 20)) + 'D'.repeat(Math.min(d / 8, 20));
    console.log(`  $${page.toString(16).toUpperCase()}00: C=${String(c).padStart(3)} D=${String(d).padStart(3)} ${bar}`);
  }
}
