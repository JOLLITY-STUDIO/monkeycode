/**
 * 用新 CDL 文件统计所有 32 个 PRG bank 的 code/data/unaccessed 字节数
 * CDL 标志位:
 *   bit 0 = Code (被执行为指令)
 *   bit 1 = Data (被读取为数据)
 *   bit 2 = Indirect (间接读取)
 *   bit 6 = Written
 */
const fs = require('fs');
const path = require('path');

const CDL_PATH = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/Captain Tsubasa II - Super Striker (Japan).cdl';
const cdl = fs.readFileSync(CDL_PATH);

const BANK_SIZE = 8192;
const HEADER = 0x10;
const PRG_SIZE = 0x40000; // 256KB

function flagStr(v) {
  const a = [];
  if (v & 1) a.push('C');
  if (v & 2) a.push('D');
  if (v & 4) a.push('I');
  if (v & 0x40) a.push('W');
  return a.length ? a.join('') : '-';
}

console.log('=== PRG Bank CDL Stats (from _tmp_bzk_out CDL) ===\n');
console.log('Bank | CPU Map   | Code  | Data  | Unacc | Code%  | Data%  | Flags');

const results = [];

for (let b = 0; b < 32; b++) {
  const prgStart = b * BANK_SIZE;
  let code = 0, data = 0, indirect = 0, written = 0, unacc = 0;

  for (let off = 0; off < BANK_SIZE; off++) {
    const v = cdl[prgStart + off];
    if (v === 0) { unacc++; continue; }
    if (v & 1) code++;
    if (v & 2) data++;
    if (v & 4) indirect++;
    if (v & 0x40) written++;
  }

  // CPU address: banks 30/31 are fixed, others depend on mapping context
  let cpu;
  if (b === 30) cpu = '$C000';
  else if (b === 31) cpu = '$E000';
  else cpu = '$8000 / $A000';

  const codep = (code / BANK_SIZE * 100).toFixed(1);
  const datap = (data / BANK_SIZE * 100).toFixed(1);
  const f = [];
  if (indirect > 100) f.push(`I:${indirect}`);
  if (written > 100) f.push(`W:${written}`);

  console.log(
    ` ${b.toString().padStart(2)} | ${cpu.padEnd(13)} | ${code.toString().padStart(4)} | ${data.toString().padStart(4)} | ${unacc.toString().padStart(4)} | ${codep.padStart(5)}% | ${datap.padStart(5)}% | ${f.join(' ')}`
  );

  results.push({ bank: b, cpu, code, data, indirect, written, unacc, codep: parseFloat(codep), datap: parseFloat(datap) });
}

// 输出 TypeScript 常量格式
console.log('\n\n=== TypeScript PRG_STATS 格式 ===\n');
console.log('const PRG_STATS: Record<number, { code: number; data: number; unacc: number; cpu: string; indirect?: number; written?: number }> = {');
for (const r of results) {
  const extra = [];
  if (r.indirect > 100) extra.push(`indirect: ${r.indirect}`);
  if (r.written > 100) extra.push(`written: ${r.written}`);
  const extraStr = extra.length ? ', ' + extra.join(', ') : '';
  console.log(`  ${r.bank}: { code: ${r.code}, data: ${r.data}, unacc: ${r.unacc}, cpu: '${r.cpu}'${extraStr} },`);
}
console.log('};');

// 找出变化最大的 bank（对比旧的 _stats.txt）
console.log('\n\n=== 与旧 PRG_STATS 差异 ===\n');
// 旧数据（从 bankpage.ts 提取）
const OLD = {
  0:  { code: 7274, data: 427,  unacc: 491 },
  1:  { code: 4239, data: 3556, unacc: 397 },
  2:  { code: 1828, data: 245,  unacc: 6119 },
  3:  { code: 0,    data: 8186, unacc: 6 },
  4:  { code: 0,    data: 8158, unacc: 34 },
  5:  { code: 0,    data: 8157, unacc: 35 },
  6:  { code: 0,    data: 3345, unacc: 4847 },
  7:  { code: 0,    data: 3908, unacc: 4284 },
  8:  { code: 0,    data: 6358, unacc: 1834 },
  9:  { code: 0,    data: 6645, unacc: 1547 },
  10: { code: 0,    data: 7039, unacc: 1153 },
  11: { code: 1477, data: 5958, unacc: 757 },
  12: { code: 1674, data: 6088, unacc: 430 },
  13: { code: 0,    data: 8176, unacc: 16 },
  14: { code: 0,    data: 8177, unacc: 15 },
  15: { code: 0,    data: 8134, unacc: 58 },
  16: { code: 1860, data: 4599, unacc: 1733 },
  17: { code: 0,    data: 7239, unacc: 953 },
  18: { code: 0,    data: 7616, unacc: 576 },
  19: { code: 877,  data: 5021, unacc: 2294 },
  20: { code: 2002, data: 6070, unacc: 120 },
  21: { code: 0,    data: 6901, unacc: 1291 },
  22: { code: 453,  data: 7388, unacc: 351 },
  23: { code: 0,    data: 8047, unacc: 145 },
  24: { code: 2774, data: 4686, unacc: 732 },
  25: { code: 0,    data: 7520, unacc: 672 },
  26: { code: 7331, data: 584,  unacc: 277 },
  27: { code: 384,  data: 6021, unacc: 1787 },
  28: { code: 2871, data: 4189, unacc: 1132 },
  29: { code: 0,    data: 3866, unacc: 4326 },
  30: { code: 6350, data: 1495, unacc: 347 },
  31: { code: 3951, data: 3387, unacc: 854 },
};

for (const r of results) {
  const o = OLD[r.bank];
  if (!o) continue;
  const dc = r.code - o.code;
  const dd = r.data - o.data;
  const du = r.unacc - o.unacc;
  if (dc !== 0 || dd !== 0 || du !== 0) {
    console.log(`Bank ${r.bank.toString().padStart(2)}: code ${o.code}→${r.code} (${dc>=0?'+':''}${dc}), data ${o.data}→${r.data} (${dd>=0?'+':''}${dd}), unacc ${o.unacc}→${r.unacc} (${du>=0?'+':''}${du})`);
  }
}
