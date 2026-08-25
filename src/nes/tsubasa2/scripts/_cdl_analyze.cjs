/**
 * _cdl_analyze.cjs — 解析 Mesen CDL 文件,定位 frame 13 时已执行的 PRG 范围
 *
 * CDL 格式: 1 byte per ROM address, value:
 *   0 = 未访问
 *   1 = read as data (D)
 *   2 = read as code (C) — 即 CPU fetch 用过的 instruction bytes
 *   3 = both (C|D)
 *
 * 天使之翼2 ROM layout (iNES):
 *   0x00000-0x07FFF: PRG bank 0  (固定)
 *   0x08000-0x0FFFF: PRG bank 1  (固定)
 *   0x10000-0x17FFF: PRG bank 2  (MMC3 切换)
 *   ... 16 个 PRG bank, 每个 16KB
 *   0x40000 起: CHR (16 个 8KB bank)
 */
const fs = require('fs');
const path = require('path');

const cdlPath = path.join(__dirname, '..', 'docs', 'roms', 'tecmo',
  'Captain Tsubasa II - Super Striker (Japan)frame13.cdl');
const buf = fs.readFileSync(cdlPath);
console.log('CDL size:', buf.length, 'bytes (=' + (buf.length/1024) + ' KB)');
console.log('Expected 384 KB for 16×16KB PRG + 128 KB CHR');
console.log('');

const CDL_DATA = 1;
const CDL_CODE = 2;
const CDL_BOTH = 3;

// 按 region 统计
const regions = [
  ['PRG0',  0x00000, 0x04000],
  ['PRG1',  0x04000, 0x08000],
  ['PRG2',  0x08000, 0x0C000],
  ['PRG3',  0x0C000, 0x10000],
  ['PRG4',  0x10000, 0x14000],
  ['PRG5',  0x14000, 0x18000],
  ['PRG6',  0x18000, 0x1C000],
  ['PRG7',  0x1C000, 0x20000],
  ['PRG8',  0x20000, 0x24000],
  ['PRG9',  0x24000, 0x28000],
  ['PRG10', 0x28000, 0x2C000],
  ['PRG11', 0x2C000, 0x30000],
  ['PRG12', 0x30000, 0x34000],
  ['PRG13', 0x34000, 0x38000],
  ['PRG14', 0x38000, 0x3C000],
  ['PRG15', 0x3C000, 0x40000],
  ['CHR0-15', 0x40000, 0x60000],
];

for (const [name, lo, hi] of regions) {
  let dataN = 0, codeN = 0, bothN = 0, noneN = 0;
  const ranges = []; // [lo, hi, code] per contiguous block
  let curStart = -1, curCode = 0;
  function flush(end) {
    if (curStart >= 0) ranges.push({ lo: curStart, hi: end, code: curCode });
    curStart = -1; curCode = 0;
  }
  for (let i = lo; i < hi; i++) {
    const v = buf[i];
    if (v === 0) {
      if (curStart >= 0) flush(i);
      noneN++;
      continue;
    }
    if (v === 1) dataN++;
    else if (v === 2) codeN++;
    else if (v === 3) bothN++;
    if (curStart < 0) { curStart = i; curCode = v; }
    else if (v !== curCode) { flush(i); curStart = i; curCode = v; }
  }
  if (curStart >= 0) flush(hi);

  const total = hi - lo;
  const accessed = (dataN + codeN + bothN);
  if (accessed === 0) {
    console.log(`${name} [${lo.toString(16)}-${hi.toString(16)}]: UNTOUCHED (0/${total})`);
  } else {
    console.log(`${name} [${(lo).toString(16).padStart(5,' ')}-${hi.toString(16).padStart(5,' ')}]: D=${dataN} C=${codeN} C|D=${bothN}  untouched=${noneN}  blocks=${ranges.length}`);
    if (name.startsWith('PRG') && ranges.length) {
      console.log('  Code ranges:');
      ranges.filter(r => r.code >= 2).forEach(r => {
        console.log(`    ${(r.lo).toString(16).padStart(5,' ')}-${r.hi.toString(16).padStart(5,' ')} (${r.code === 2 ? 'C only' : 'C|D'})  size=${r.hi-r.lo}`);
      });
    }
  }
}
