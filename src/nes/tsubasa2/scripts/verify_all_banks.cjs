// G6: 各 Bank 全量差分验证 — asm/bankXX/_full.s .byte 数据 vs TS 内嵌数据
// 对比: asm/bankXX/_full.s → .byte 提取 8192B vs src/game/data/prg/prg-bank-XX.ts 或 bankXX-data.ts 内嵌数组
const fs = require('fs');
const path = require('path');

// 从 asm _full.s 提取 .byte 数据
function extractAsmBytes(asmPath) {
  const src = fs.readFileSync(asmPath, 'utf8');
  const lines = src.split('\n');
  const bytes = [];
  let pending = false;
  for (const raw of lines) {
    const l = raw.trim();
    if (!l || l.startsWith(';')) continue;
    if (l.startsWith('.byte')) {
      let c = l.slice(5).trim();
      c = c.split(';')[0].trim();
      if (c === '') { pending = true; continue; }
      const parts = c.split(',').map(s => s.trim());
      for (const p of parts) {
        if (p === '') continue;
        bytes.push(p[0] === '$' ? parseInt(p.slice(1), 16) : parseInt(p, 16));
      }
      pending = !c.endsWith(',');
    } else if (pending) {
      let c = l.split(';')[0].trim();
      if (c === '') continue;
      const parts = c.split(',').map(s => s.trim());
      for (const p of parts) {
        if (p === '') continue;
        bytes.push(p[0] === '$' ? parseInt(p.slice(1), 16) : parseInt(p, 16));
      }
      pending = !l.trim().endsWith(',');
    }
  }
  return bytes;
}

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
  const asmPath = `asm/bank${bankId}/_full.s`;
  if (!fs.existsSync(asmPath)) {
    return { bank: bankId, status: 'no-asm', diff: -1 };
  }

  const asmBytes = extractAsmBytes(asmPath);
  if (asmBytes.length === 0) {
    return { bank: bankId, status: 'asm-empty', asmLen: 0 };
  }

  // 找 TS 数据源: prg-bank-XX.ts 或 bankXX-data.ts
  const tsCandidates = [
    { path: `src/game/data/prg/prg-bank-${bankId}.ts`, var: `PRG_BANK_${bankNum}` },
    { path: `src/game/data/prg/bank${bankId}-data.ts`, var: `B${bankNum}_DATA` },
    { path: `src/game/data/prg/bank${bankId}-tables.ts`, var: `B${bankNum}_DATA` },
  ];

  let tsBytes = null;
  let tsSource = '';
  for (const c of tsCandidates) {
    if (fs.existsSync(c.path)) {
      tsBytes = extractTsArray(c.path, c.var);
      if (tsBytes && tsBytes.length > 0) {
        tsSource = c.path;
        break;
      }
    }
  }

  if (!tsBytes) {
    return { bank: bankId, status: 'no-ts', asmLen: asmBytes.length };
  }

  // 对比
  const minLen = Math.min(asmBytes.length, tsBytes.length);
  let diff = 0;
  const diffs = [];
  for (let i = 0; i < minLen; i++) {
    if (asmBytes[i] !== tsBytes[i]) {
      diff++;
      if (diffs.length < 5) diffs.push({ offset: i, asm: asmBytes[i], ts: tsBytes[i] });
    }
  }
  // 长度差异
  const lenDiff = Math.abs(asmBytes.length - tsBytes.length);

  return {
    bank: bankId,
    status: diff === 0 && lenDiff === 0 ? 'PASS' : 'FAIL',
    asmLen: asmBytes.length,
    tsLen: tsBytes.length,
    diff,
    lenDiff,
    tsSource,
    diffs,
  };
}

// 验证全部 32 个 bank
console.log('═══════════════════════════════════════════════════════════');
console.log('G6: 各 Bank 全量差分验证 (asm .byte vs TS 内嵌)');
console.log('═══════════════════════════════════════════════════════════');
let passCount = 0, failCount = 0, skipCount = 0;
const results = [];
for (let b = 0; b < 32; b++) {
  const r = verifyBank(b);
  results.push(r);
  if (r.status === 'PASS') {
    passCount++;
    console.log(`bank ${r.bank}: ✅ PASS (asm=${r.asmLen}B ts=${r.tsLen}B diff=0)`);
  } else if (r.status === 'FAIL') {
    failCount++;
    console.log(`bank ${r.bank}: ❌ FAIL (asm=${r.asmLen}B ts=${r.tsLen}B diff=${r.diff} lenDiff=${r.lenDiff}) ← ${r.tsSource}`);
    if (r.diffs.length > 0) {
      r.diffs.forEach(d => console.log(`  offset=0x${d.offset.toString(16)} asm=0x${d.asm.toString(16)} ts=0x${d.ts.toString(16)}`));
    }
  } else {
    skipCount++;
    console.log(`bank ${r.bank}: ⏭️ ${r.status} (asm=${r.asmLen || 0}B)`);
  }
}
console.log('═══════════════════════════════════════════════════════════');
console.log(`总计: ${passCount} PASS / ${failCount} FAIL / ${skipCount} SKIP`);
