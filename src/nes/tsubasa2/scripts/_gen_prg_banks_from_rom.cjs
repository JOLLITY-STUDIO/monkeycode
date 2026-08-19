/**
 * 从 ROM 再生全部 32 个 prg-bank 文件（十进制命名 + 0xNN hex 内容）
 *
 * ROM: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes
 * 布局: 16B header + 32 × 8KB PRG + 16 × 8KB CHR
 *
 * 流程：
 *   1. 校验 ROM header（PRG 数量）
 *   2. 逐 bank 对比 ROM 与磁盘现有文件，报告 OK/MISMATCH
 *   3. 不一致的 bank 用 ROM 覆盖（统一写规范格式）
 *   4. 删除 hex 命名残留文件（prg-bank-0a~0f, 1a~1f）
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'game', 'data');
const ROM_PATH = path.join(ROOT, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');

const rom = fs.readFileSync(ROM_PATH);
console.log(`ROM 大小: ${rom.length} bytes`);
console.log(`Header: ${rom.slice(0, 16).toString('hex').toUpperCase()}`);

// ── header 校验 ──
const prg16 = rom[4]; // 16KB 块数
const chr8 = rom[5];  // 8KB 块数
const prgBanks = prg16 * 2; // 8KB banks
console.log(`PRG: ${prg16}×16KB = ${prgBanks} banks, CHR: ${chr8}×8KB`);
if (prgBanks !== 32) { console.error('PRG bank 数不是 32，中止'); process.exit(1); }
if (rom.length < 0x10 + 32 * 0x2000) { console.error('ROM 大小不足'); process.exit(1); }

const PRG_OFFSET = 0x10;
function romBank(n) {
  const off = PRG_OFFSET + n * 0x2000;
  return [...rom.slice(off, off + 0x2000)];
}

// ── 解析磁盘现有文件 ──
function parseBytes(content) {
  const m = content.match(/const\s+PRG_BANK_\w+\s*:\s*readonly\s*number\[\]\s*=\s*\[([\s\S]*?)\];/);
  if (!m) return null;
  const toks = m[1].split(/[,\s]+/).map(t => t.trim()).filter(Boolean);
  try { return toks.map(t => parseInt(t, 0)); } catch { return null; }
}

const hexLine = a => a.map(v => '0x' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ');

// ── 对比 + 覆盖 ──
const report = [];
for (let n = 0; n < 32; n++) {
  const nn = String(n).padStart(2, '0');
  const target = path.join(DATA_DIR, `prg-bank-${nn}.ts`);
  const romData = romBank(n);
  let disk = null;
  let mismatchAt = -1;
  if (fs.existsSync(target)) {
    disk = parseBytes(fs.readFileSync(target, 'utf8'));
    if (disk) {
      const len = Math.min(disk.length, romData.length);
      for (let i = 0; i < len; i++) if (disk[i] !== romData[i]) { mismatchAt = i; break; }
      if (disk.length !== romData.length && mismatchAt < 0) mismatchAt = len;
    }
  }
  const ok = disk && disk.length === 8192 && mismatchAt < 0;
  report.push({ n, nn, ok, mismatchAt, hasDisk: !!disk, diskLen: disk ? disk.length : -1 });
  if (!ok) {
    // 用 ROM 覆盖
    const lines = [];
    for (let i = 0; i < romData.length; i += 16) {
      lines.push('  ' + hexLine(romData.slice(i, i + 16)) + (i + 16 < romData.length ? ',' : ''));
    }
    const content =
      `/** PRG-ROM Bank ${nn} (8KB) — 自动生成 */\n` +
      `const PRG_BANK_${nn}: readonly number[] = [\n` +
      lines.join('\n') + '\n' +
      `];\n` +
      `export default PRG_BANK_${nn};\n`;
    fs.writeFileSync(target, content);
  }
}

for (const r of report) {
  const d = !r.hasDisk ? ' [无磁盘文件]' : r.ok ? '' : ` MISMATCH@0x${r.mismatchAt.toString(16)} (len=${r.diskLen})`;
  console.log(`bank_${r.nn}: ${r.ok ? 'OK' : '覆盖'}${d}`);
}

// ── 删除 hex 命名残留（仅含字母的 0a~0f / 1a~1f）──
console.log('\n=== 删除 hex 命名残留 ===');
const leftovers = [];
for (const f of fs.readdirSync(DATA_DIR)) {
  const m = f.match(/^prg-bank-([0-9a-f]{2})\.ts$/);
  if (!m) continue;
  if (/[a-f]/.test(m[1])) leftovers.push(f); // 00~09/10~31 全数字名 = 合法十进制，保留
}
for (const f of leftovers) {
  fs.unlinkSync(path.join(DATA_DIR, f));
  console.log(`删除 ${f}`);
}

// ── 汇总 ──
console.log('\n=== 最终 prg-bank 文件 ===');
const finals = fs.readdirSync(DATA_DIR).filter(f => /^prg-bank-[0-9]{2}\.ts$/.test(f)).sort();
console.log(`${finals.length} 个:`);
console.log(finals.join('\n'));
