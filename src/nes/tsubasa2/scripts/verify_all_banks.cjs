// G6: 各 Bank 全量差分验证 — ROM 原始字节 vs TS 内嵌数据
// 权威基准: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes (header 16B + 32×8KB PRG)
// 对比: src/game/data/prg/prg-bank-XX.ts 内嵌数组 == ROM bank 8KB
// 说明: asm .byte 提取不完整(含代码行), 不作为基准, 仅记录参考
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ROM_PATH = path.join(ROOT, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const BANK = 0x2000;

let rom = null;
try {
  rom = fs.readFileSync(ROM_PATH);
} catch (e) {
  console.error(`无法读取 ROM: ${ROM_PATH}`);
  process.exit(1);
}
if (rom.length < 0x10 + 32 * BANK) {
  console.error(`ROM 大小不足: ${rom.length}`);
  process.exit(1);
}
const romBank = (n) => Array.from(rom.subarray(0x10 + n * BANK, 0x10 + (n + 1) * BANK));

// 从 TS 文件提取内嵌数组
function extractTsArray(tsPath, varName) {
  const src = fs.readFileSync(tsPath, 'utf8');
  // 匹配 const XXX: readonly number[] = [...] 或 const XXX = [...]
  const re = new RegExp('(?:const|let|var)\\s+' + varName + '[^=]*=\\s*\\[([\\s\\S]*?)\\]');
  const m = src.match(re);
  if (!m) return null;
  return m[1].split(',').map(s => s.trim()).filter(s => s.length > 0).map(s => {
    s = s.replace(/\/\/.*$/, '').trim();
    if (s.startsWith('0x')) return parseInt(s, 16);
    if (s.startsWith('$')) return parseInt(s.slice(1), 16);
    return parseInt(s, 10);
  }).filter(n => !isNaN(n));
}

// 验证单个 bank
function verifyBank(bankNum) {
  const bankId = bankNum.toString().padStart(2, '0');
  const expected = romBank(bankNum);

  // 找 TS 数据源: prg-bank-XX.ts / bankXX-data.ts / bankXX-tables.ts
  const tsCandidates = [
    { path: `src/game/data/prg/prg-bank-${bankId}.ts`, var: `PRG_BANK_${bankId}` },
    { path: `src/game/data/prg/prg-bank-${bankId}.ts`, var: `PRG_BANK_${bankNum}` },
    { path: `src/game/data/prg/bank${bankId}-data.ts`, var: `B${bankNum}_DATA` },
    { path: `src/game/data/prg/bank${bankId}-tables.ts`, var: `B${bankNum}_DATA` },
  ];

  let tsBytes = null;
  let tsSource = '';
  for (const c of tsCandidates) {
    const abs = path.join(ROOT, c.path);
    if (fs.existsSync(abs)) {
      tsBytes = extractTsArray(abs, c.var);
      if (tsBytes && tsBytes.length > 0) {
        tsSource = c.path;
        break;
      }
    }
  }

  if (!tsBytes) {
    return { bank: bankId, status: 'no-ts', romLen: expected.length };
  }

  // 对比 ROM 权威基准
  const minLen = Math.min(tsBytes.length, expected.length);
  let diff = 0;
  const diffs = [];
  for (let i = 0; i < minLen; i++) {
    if (tsBytes[i] !== expected[i]) {
      diff++;
      if (diffs.length < 5) diffs.push({ offset: i, rom: expected[i], ts: tsBytes[i] });
    }
  }
  const lenDiff = Math.abs(tsBytes.length - expected.length);
  const exact = diff === 0 && lenDiff === 0;

  return {
    bank: bankId,
    status: exact ? 'PASS' : 'FAIL',
    romLen: expected.length,
    tsLen: tsBytes.length,
    diff,
    lenDiff,
    tsSource,
    diffs,
  };
}

// 验证全部 32 个 bank
console.log('═══════════════════════════════════════════════════════════');
console.log('G6: 各 Bank 全量差分验证 (ROM vs TS 内嵌)');
console.log('═══════════════════════════════════════════════════════════');
let passCount = 0, failCount = 0, skipCount = 0;
const results = [];
for (let b = 0; b < 32; b++) {
  const r = verifyBank(b);
  results.push(r);
  if (r.status === 'PASS') {
    passCount++;
    console.log(`bank ${r.bank}: ✅ PASS (ts=${r.tsLen}B rom=${r.romLen}B diff=0) ← ${r.tsSource}`);
  } else if (r.status === 'FAIL') {
    failCount++;
    console.log(`bank ${r.bank}: ❌ FAIL (ts=${r.tsLen}B rom=${r.romLen}B diff=${r.diff} lenDiff=${r.lenDiff}) ← ${r.tsSource}`);
    if (r.diffs.length > 0) {
      r.diffs.forEach(d => console.log(`  offset=0x${d.offset.toString(16)} rom=0x${d.rom.toString(16)} ts=0x${d.ts.toString(16)}`));
    }
  } else {
    skipCount++;
    console.log(`bank ${r.bank}: ⏭️ ${r.status} (rom=${r.romLen}B)`);
  }
}
console.log('═══════════════════════════════════════════════════════════');
console.log(`总计: ${passCount} PASS / ${failCount} FAIL / ${skipCount} SKIP`);
