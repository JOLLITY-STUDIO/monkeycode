/**
 * 统一修复 src/game/data/prg-bank-*.ts 命名与内容格式
 *
 * 约定（与 _tmp_bzk_out/bank_NN.asm 一致）：
 *   1. 文件名：十进制  prg-bank-00.ts ~ prg-bank-31.ts
 *   2. 内容：16 进制字面量 0xNN（6502 原样数据）
 *
 * 幂等：可重复执行。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'game', 'data');
const ASM_DIR = path.join(ROOT, '_tmp_bzk_out');

function bankFromName(file) {
  const m = file.match(/^prg-bank-([0-9a-f]{2})\.ts$/);
  if (!m) return -1;
  const s = m[1];
  if (/[a-f]/.test(s)) return parseInt(s, 16);
  const v = parseInt(s, 10);
  if (v <= 9) return v;
  if (s[0] === '1') return parseInt(s, 16); // 10~1f → 16~31
  return v; // 20+ → 十进制
}

function parseBytes(content) {
  const m = content.match(/const\s+PRG_BANK_\w+\s*:\s*readonly\s*number\[\]\s*=\s*\[([\s\S]*?)\];/);
  if (!m) throw new Error('无法解析数组体: ' + content.slice(0, 80));
  const toks = m[1].split(/[,\s]+/).map(t => t.trim()).filter(Boolean);
  return toks.map(t => parseInt(t, 0));
}

/**
 * 从 bank_NN_part01.asm 提取前 count 个字节。
 * 行格式（含指令行与 .byte 行两种）：
 *   - - - - - - 0x028010 0A:8000: 4C        .byte $4C
 *   C - - - - - 0x028013 0A:8003: 4C DC 84  JMP $84DC
 * 取地址标记 "AA:BBBB:" 之后连续的 hex 字节对（遇到非 hex 文本即停）。
 */
function asmFirstBytes(bank, count) {
  const nn = String(bank).padStart(2, '0');
  const f = path.join(ASM_DIR, `bank_${nn}`, `bank_${nn}_part01.asm`);
  if (!fs.existsSync(f)) return null;
  const out = [];
  for (const ln of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = ln.match(/[0-9A-F]{2}:[0-9A-F]{4}:\s+([0-9A-F]{2}(?:[\s,]+[0-9A-F]{2})*)/);
    if (!m) continue;
    for (const h of m[1].match(/[0-9A-F]{2}/g)) out.push(parseInt(h, 16));
    if (out.length >= count) break;
  }
  return out.slice(0, count);
}

// ── 收集 ──
const files = fs.readdirSync(DATA_DIR).filter(f => /^prg-bank-[0-9a-f]{2}\.ts$/.test(f));
const byBank = {};
for (const f of files) {
  const b = bankFromName(f);
  if (b < 0 || b > 31) { console.log(`[跳过] ${f} (bank=${b})`); continue; }
  const bytes = parseBytes(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'));
  if (bytes.length !== 8192) console.log(`[警告] ${f} 字节数=${bytes.length}, 非 8192`);
  (byBank[b] ||= []).push({ file: f, bytes });
}

// ── asm 交叉验证（仅供参考）──
console.log('=== asm 首 64 字节交叉验证 ===');
for (const b of Object.keys(byBank).map(Number).sort((a, c) => a - c)) {
  const ref = asmFirstBytes(b, 64);
  for (const e of byBank[b]) {
    const ok = ref && e.bytes.slice(0, 64).every((v, i) => v === ref[i]);
    console.log(`bank_${String(b).padStart(2, '0')} ${e.file}: ${ok ? 'OK' : ref ? 'MISMATCH' : '无asm'}`);
  }
}

// ── 重复处理：任取一份（字节将写入规范名），内容不一致则告警 ──
console.log('\n=== 重复 bank 处理 ===');
const keep = [];
const del = [];
for (const b of Object.keys(byBank).map(Number)) {
  const list = byBank[b];
  if (list.length === 1) { keep.push(...list); continue; }
  const [best, ...others] = list;
  const same = others.every(e => e.bytes.length === best.bytes.length && e.bytes.every((v, i) => v === best.bytes[i]));
  console.log(`bank_${String(b).padStart(2, '0')}: 保留 ${best.file}${same ? ' (内容一致)' : ' (内容不一致!)'}`);
  keep.push(best);
  del.push(...others);
}

// ── 写入规范文件（十进制命名 + hex 内容）──
console.log('\n=== 写入规范化文件 ===');
const hexLine = a => a.map(v => '0x' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ');
for (const e of keep) {
  const bank = bankFromName(e.file);
  const nn = String(bank).padStart(2, '0');
  const arr = e.bytes;
  const lines = [];
  for (let i = 0; i < arr.length; i += 16) {
    lines.push('  ' + hexLine(arr.slice(i, i + 16)) + (i + 16 < arr.length ? ',' : ''));
  }
  const content =
    `/** PRG-ROM Bank ${nn} (8KB) — 自动生成 */\n` +
    `const PRG_BANK_${nn}: readonly number[] = [\n` +
    lines.join('\n') + '\n' +
    `];\n` +
    `export default PRG_BANK_${nn};\n`;
  const target = path.join(DATA_DIR, `prg-bank-${nn}.ts`);
  const isNew = !fs.existsSync(target);
  fs.writeFileSync(target, content);
  console.log(`bank_${nn}: ${e.file} → prg-bank-${nn}.ts${isNew ? ' [新写入]' : ' [覆盖]'}`);
}

// ── 删除冗余 ──
console.log('\n=== 删除冗余 ===');
for (const e of del) {
  const p = path.join(DATA_DIR, e.file);
  if (fs.existsSync(p)) { fs.unlinkSync(p); console.log(`删除 ${e.file}`); }
}

// ── 扫描引用旧 hex 命名的 import ──
console.log('\n=== 扫描旧 hex 命名引用 ===');
const oldNames = new Set(['0a', '0b', '0c', '0d', '0e', '0f', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1a', '1b', '1c', '1d', '1e', '1f'].map(s => `prg-bank-${s}`));
const hits = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) { if (!/node_modules|_tmp|\.codebuddy/.test(p)) walk(p); continue; }
    if (!/\.(ts|js)$/.test(f)) continue;
    const c = fs.readFileSync(p, 'utf8');
    for (const nm of oldNames) if (c.includes(nm)) hits.push({ file: p.replace(ROOT, '.'), name: nm });
  }
}
walk(path.join(ROOT, 'src'));
if (hits.length === 0) console.log('无旧 hex 命名引用');
else for (const h of hits) console.log(`${h.file}: 引用 ${h.name}`);

// ── 汇总 ──
console.log('\n=== 结果 ===');
const finalFiles = fs.readdirSync(DATA_DIR).filter(f => /^prg-bank-[0-9]{2}\.ts$/.test(f)).sort();
console.log(`最终 prg-bank 文件 ${finalFiles.length} 个:`);
console.log(finalFiles.join('\n'));
