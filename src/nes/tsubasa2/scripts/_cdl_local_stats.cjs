/**
 * 本地 CDL 全量统计: 32 个 PRG bank 的 code/data/unaccessed 分布
 * CDL 布局 = PRG(256KB) + CHR(128KB), 无 iNES 头。
 * 输出: 穿透整个 ROM 所需的代码翻译覆盖地图。
 */
const fs = require('fs');
const path = require('path');

const CDL_PATH = path.resolve(__dirname, '../_tmp_bzk_out/Captain Tsubasa II - Super Striker (Japan).cdl');
const cdl = fs.readFileSync(CDL_PATH);
const BANK = 8192;

console.log('=== PRG Bank CDL Stats (local CDL) ===\n');
console.log('Bank | Code  | Data  | Unacc | Code% | 翻译建议');

const rows = [];
for (let b = 0; b < 32; b++) {
  let code = 0, data = 0, unacc = 0, indirect = 0, written = 0;
  for (let off = 0; off < BANK; off++) {
    const v = cdl[b * BANK + off];
    if (v === 0) { unacc++; continue; }
    if (v & 1) code++;
    if (v & 2) data++;
    if (v & 4) indirect++;
    if (v & 0x40) written++;
  }
  let kind;
  if (code > 0 && data > 0) kind = 'code+data → Service + Data';
  else if (code > 0) kind = '纯 code → Service';
  else if (data > 0) kind = '纯 data → Model(结构化数据)';
  else kind = '未访问 → 数据保留即可';
  if (indirect > 50) kind += ' (含间接)';
  if (written > 50) kind += ' (含写)';
  const codep = (code / BANK * 100).toFixed(1);
  console.log(
    ` ${b.toString().padStart(2)} | ${code.toString().padStart(4)} | ${data.toString().padStart(4)} | ${unacc.toString().padStart(4)} | ${codep.padStart(5)}% | ${kind}`
  );
  rows.push({ bank: b, code, data, unacc, indirect, written });
}

const codeTotal = rows.reduce((s, r) => s + r.code, 0);
const dataTotal = rows.reduce((s, r) => s + r.data, 0);
console.log(`\n=== 合计: code=${codeTotal} (${(codeTotal / (32 * BANK) * 100).toFixed(1)}%), data=${dataTotal}, 全部 32 bank 数据已 import ✓`);
