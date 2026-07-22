// Merge ALL 15 PRG banks. Labels prefixed B{bn}_. Missing targets → stubs.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '_prg_output') + '/';

const bankFiles = [
  { f: 'prg_bank_00.c', bn: 0 },  { f: 'prg_bank_01.c', bn: 1 },
  { f: 'prg_bank_02.c', bn: 2 },  { f: 'prg_bank_11.c', bn: 11 },
  { f: 'prg_bank_12.c', bn: 12 }, { f: 'prg_bank_16.c', bn: 16 },
  { f: 'prg_bank_19.c', bn: 19 }, { f: 'prg_bank_20.c', bn: 20 },
  { f: 'prg_bank_22.c', bn: 22 }, { f: 'prg_bank_24.c', bn: 24 },
  { f: 'prg_bank_26.c', bn: 26 }, { f: 'prg_bank_27.c', bn: 27 },
  { f: 'prg_bank_28.c', bn: 28 }, { f: 'prg_bank_30.c', bn: 30 },
  { f: 'prg_bank_31.c', bn: 31 },
];

// Map CPU address → bank, and also which bank labels exist
const addrToBank = {};
const bankLabels = new Set(); // 'bn:addr'
for (const { f, bn } of bankFiles) {
  const code = fs.readFileSync(srcDir + f, 'utf8');
  for (const m of code.matchAll(/^L_([0-9a-f]+):/gm)) {
    addrToBank[m[1]] = bn;
    bankLabels.add(`${bn}:${m[1]}`);
  }
}

function lbl(bn, addr) { return `B${bn}_${addr}`; }

let merged = `// Merged: ${bankFiles.length} banks, all JSR/JMP/branches inline
#include "6502_nes.h"

`;

const allRetAddrs = [];
const allGotoTargets = new Set();

for (const { f, bn } of bankFiles) {
  let code = fs.readFileSync(srcDir + f, 'utf8');
  code = code.replace(/^#include\s+"6502_nes\.h"\s*\n/m, '');
  code = code.trim();

  // Bank 31: strip labels < $C000
  if (bn === 31) {
    const lines = code.split('\n');
    const ok = []; let skip = false;
    for (const l of lines) {
      const m = l.match(/^\s*L_([0-9a-f]+):/);
      if (m) skip = parseInt(m[1], 16) < 0xC000;
      if (!skip) ok.push(l);
    }
    code = ok.join('\n');
  }

  // Gather RET_ADDR
  for (const m of code.matchAll(/RET_ADDR\(([0-9a-f]+)\)/g)) {
    allRetAddrs.push({ bn, addr: m[1] });
  }
  code = code.replace(/RET_BEGIN\s*\n[\s\S]*?RET_END\s*/g, '');

  // Prefix labels
  code = code.replace(/^L_([0-9a-f]+):/gm, (_, a) => lbl(bn, a) + ':');

  // Expand JMP_IND (HEX macro can't handle 0x prefix)
  code = code.replace(/JMP_IND\(0x([0-9a-f]+)\)/g, (_, addr) => {
    const a = parseInt(addr, 16);
    return `CYCLE(5); PC = GetMem(${a + 1}) << 8 | GetMem(${a}); CHECK_CYCLE(); goto _RET_MAP;`;
  });

  // Expand JSR
  code = code.replace(/JSR\(([0-9a-f]+),\s*([0-9a-f]+)\)/g, (_, target, curr) => {
    const tbn = addrToBank[target];
    const rp = parseInt(curr, 16) + 2;
    if (tbn === undefined) {
      return `CYCLE(6); SetStack(SP, ${rp & 0xFF}); SetStack(SP - 1, ${rp >> 8}); SP -= 2; PC = 0x${target}; /* UNRES JSR $${target} */ goto LABEL_END;`;
    }
    allGotoTargets.add(lbl(tbn, target));
    return `CYCLE(6); SetStack(SP, ${rp & 0xFF}); SetStack(SP - 1, ${rp >> 8}); SP -= 2; goto ${lbl(tbn, target)};`;
  });

  // Expand JMP
  code = code.replace(/JMP\(([0-9a-f]+),\s*([0-9a-f]+)\)/g, (_, target) => {
    const tbn = addrToBank[target];
    if (tbn === undefined) {
      return `PC = 0x${target}; /* UNRES JMP $${target} */ goto LABEL_END;`;
    }
    allGotoTargets.add(lbl(tbn, target));
    return `CYCLE(3); PC = 0x${target}; goto ${lbl(tbn, target)};`;
  });

  // Expand branches
  const branchMap = { BCC: '!SR_C', BCS: 'SR_C', BEQ: 'SR_Z', BNE: '!SR_Z',
                      BPL: '!SR_N', BMI: 'SR_N', BVC: '!SR_V', BVS: 'SR_V' };
  for (const [op, cond] of Object.entries(branchMap)) {
    const re = new RegExp(`\\b${op}\\(([0-9a-f]+)\\)`, 'g');
    code = code.replace(re, (_, addr) => {
      allGotoTargets.add(lbl(bn, addr));
      return `CYCLE(2); if (${cond}) goto ${lbl(bn, addr)};`;
    });
  }

  // Also track RET targets
  for (const m of code.matchAll(/goto (B\d+_[0-9a-f]+);/g)) {
    allGotoTargets.add(m[1]);
  }

  merged += `// ===== Bank ${bn} (${f}) =====\n`;
  merged += code + '\n\n';
}

// Find stubs needed: goto targets not defined as labels
const defined = new Set();
for (const m of merged.matchAll(/^(B\d+_[0-9a-f]+):/gm)) defined.add(m[1]);
const missing = [...allGotoTargets].filter(l => !defined.has(l));

if (missing.length > 0) {
  console.log(`  Missing labels (stubs): ${missing.length}`);
  merged += `// ===== Stubs for missing branch targets =====\n`;
  for (const l of missing.sort()) {
    merged += `${l}: /* STUB */ goto LABEL_END;\n`;
  }
}

// Build RET table
const dedupedRets = new Map();
for (const r of allRetAddrs) {
  if (!dedupedRets.has(r.addr)) dedupedRets.set(r.addr, r.bn);
}

let retBlock = 'RET_BEGIN\n';
for (const [addr, bn] of dedupedRets) {
  const caseVal = parseInt(addr, 16) + 1;
  retBlock += `    case 0x${caseVal.toString(16)}: goto ${lbl(bn, addr)}; /* $${addr} */\n`;
}
retBlock += 'RET_END\n';
merged += retBlock;

const outPath = srcDir + '_merged_all.c';
fs.writeFileSync(outPath, merged);
console.log(`Written ${outPath}`);
console.log(`  Size: ${(merged.length/1024).toFixed(1)} KB`);
console.log(`  RET addrs: ${allRetAddrs.length}, deduped: ${dedupedRets.size}`);
