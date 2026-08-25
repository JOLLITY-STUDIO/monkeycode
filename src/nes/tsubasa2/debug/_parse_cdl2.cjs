// CDL v2: 65536 addr * 6 bytes，无 header（393216 = 65536*6）
// 每地址 6 字节；聚焦 bank0 区域 $8000-$9FFF (R6=0) 与 $A000-$BFFF (R7)
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const cdl = fs.readFileSync(path.join(DIR, 'Captain Tsubasa II - Super Striker (Japan)-tsubasa1045.cdl'));
const BYTES = 6;
const getFlags = (addr) => {
  const off = addr * BYTES;
  const b = cdl.slice(off, off + BYTES);
  return { f0: b[0], f1: b[1], f2: b[2], f3: b[3], f4: b[4], f5: b[5] };
};
// 检查几个已知地址
const probes = [0x91bf, 0x9a7e, 0x9aa2, 0x9ea2, 0xa036, 0xa0ed, 0x80ca, 0x8119];
for (const a of probes) {
  const fl = getFlags(a);
  console.log(`$${a.toString(16)}: ${JSON.stringify(fl)}`);
}
// 统计每个 8KB 窗口的 code/data 数（FCEUX flag: bit0=code? bit1=data?）
const stat = {};
for (let addr = 0x8000; addr < 0x10000; addr++) {
  const fl = getFlags(addr);
  const win = Math.floor(addr / 0x2000);
  if (!stat[win]) stat[win] = { code: 0, data: 0, other: 0 };
  const v = fl.f0;
  if (v & 0x01) stat[win].code++;
  if (v & 0x02) stat[win].data++;
  if (v & 0x04) stat[win].other++;
}
console.log('\nper-window (addr window -> code/data/other):');
for (const w in stat) {
  const s = stat[w];
  console.log(`  window ${w} ($${(0x8000 + parseInt(w) * 0x2000).toString(16)}): code=${s.code} data=${s.data} other=${s.other}`);
}
// bank0 区域 ($8000-$9FFF) 的 code 段轮廓
console.log('\nbank0 ($8000-$9FFF) code runs:');
let run = null;
for (let addr = 0x8000; addr < 0xa000; addr++) {
  const isCode = (getFlags(addr).f0 & 0x01) !== 0;
  if (isCode && !run) run = addr;
  if (!isCode && run) { console.log(`  $${run.toString(16)}-$${(addr - 1).toString(16)} (${addr - run} bytes)`); run = null; }
}
if (run) console.log(`  $${run.toString(16)}-$${0x9fff.toString(16)}`);
