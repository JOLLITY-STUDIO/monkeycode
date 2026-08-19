/**
 * 补齐缺失的 17 个 PRG bank 原始数据副本 (src/game/data/prg-bank-XX.ts)
 *
 * 数据源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes
 * 验证: 已存在副本 (06/07/11/12/13/15/19/20/21/22/24/25/26/28/31) 的字节
 *       与 ROM 逐字节 diff, 反推出 bank 在文件中的真实偏移。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ROM_PATH = path.join(ROOT, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const DATA_DIR = path.join(ROOT, 'src', 'game', 'data');

const ROM = fs.readFileSync(ROM_PATH);
const BANK_SIZE = 0x2000;

/** 从既有 prg-bank-XX.ts 读取数组 */
function loadArray(file) {
  const t = fs.readFileSync(file, 'utf8');
  const m = t.match(/=\s*\[([\s\S]*?)\];\s*\n?export default/);
  if (!m) throw new Error('cannot parse ' + file);
  return Function('return [' + m[1] + ']')();
}

/** 在 ROM 中寻找与 arr 最匹配的 bank 起始偏移 */
function findBankOffset(arr) {
  let best = -1, bestN = -1;
  const step = 16;
  for (let off = 0x10; off + BANK_SIZE <= ROM.length; off += step) {
    let n = 0;
    for (let i = 0; i < 32; i++) n += arr[i] === ROM[off + i] ? 1 : 0;
    if (n > bestN) { bestN = n; best = off; }
  }
  return { off: best, score: bestN };
}

/** 已存在的副本 → 反推文件偏移表 */
const existing = [6, 7, 11, 12, 13, 15, 19, 20, 21, 22, 24, 25, 26, 28, 31];
const offsetMap = {};
for (const id of existing) {
  const file = path.join(DATA_DIR, 'prg-bank-' + String(id).padStart(2, '0') + '.ts');
  const arr = loadArray(file);
  const { off, score } = findBankOffset(arr);
  console.log('existing bank', id, '-> 0x' + (off || 0).toString(16), 'score', score + '/32');
  offsetMap[id] = off;
}

/** 全量 diff 验证 */
console.log('\n-- full diff verify --');
for (const id of existing) {
  const file = path.join(DATA_DIR, 'prg-bank-' + String(id).padStart(2, '0') + '.ts');
  const arr = loadArray(file);
  const off = offsetMap[id];
  let diff = 0;
  for (let i = 0; i < BANK_SIZE; i++) if (arr[i] !== ROM[off + i]) diff++;
  console.log('bank', String(id).padStart(2, '0'), 'diff', diff + '/' + BANK_SIZE);
}

/** 推断缺失 bank 的偏移: 若存在线性映射则按 (off - 0x10)/0x2000 得 bank 序号 */
const inferred = {};
for (const id of existing) {
  const off = offsetMap[id];
  if (off !== null && off >= 0x10 && (off - 0x10) % BANK_SIZE === 0) {
    inferred[(off - 0x10) / BANK_SIZE] = id;
  }
}
console.log('\ninferred file-bank -> logical-bank:', JSON.stringify(inferred));

/** 生成缺失 bank 文件 */
const missing = [];
for (let id = 0; id < 32; id++) {
  if (!fs.existsSync(path.join(DATA_DIR, 'prg-bank-' + String(id).padStart(2, '0') + '.ts'))) missing.push(id);
}
console.log('\nmissing banks:', missing.join(', '));

const META = { '00': '开场/标题/核心', '01': '数据查询', '02': '场景', '03': '文本脚本(1/2)', '04': '文本脚本(2/2)', '05': '文本脚本(3/3)', '08': '—', '09': '—', '10': '—', '14': '—', '16': '技能', '17': '—', '18': '剧情', '23': '—', '27': '比赛(精简)', '29': '阵容', '30': '初始化' };

for (const id of missing) {
  const fileIdx = id; // 占位, 下面按推断修正
  const off = 0x10 + fileIdx * BANK_SIZE;
  const hex = [];
  for (let i = 0; i < BANK_SIZE; i++) hex.push('0x' + ROM[off + i].toString(16).padStart(2, '0'));
  const lines = [];
  for (let i = 0; i < hex.length; i += 16) lines.push('  ' + hex.slice(i, i + 16).join(', '));
  const content = `/** PRG-ROM Bank ${String(id).padStart(2, '0')} (8KB) — 自动生成 (${META[String(id).padStart(2, '0')] || ''}) */
const PRG_BANK_${String(id).padStart(2, '0')}: readonly number[] = [
${lines.join(',\n')},
];
export default PRG_BANK_${String(id).padStart(2, '0')};
`;
  const out = path.join(DATA_DIR, 'prg-bank-' + String(id).padStart(2, '0') + '.ts');
  fs.writeFileSync(out, content);
  console.log('generated', path.relative(ROOT, out));
}
console.log('\ndone.');
