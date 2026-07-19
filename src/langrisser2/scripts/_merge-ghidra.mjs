// Merge Ghidra exports (XML + C) with our ASM code/data classification
import fs from 'fs';

const base = 'd:/studio/github/monkeycode/src/langrisser2/20260713/asm';
const xml = fs.readFileSync(`${base}/Langrisser II (Japan).md.xml`, 'utf8');

// ── 1. Extract data from XML ──
console.log('【1】Extracting Ghidra XML data...');

// ROM functions (ENTRY_POINT is plain hex, no "::" namespace)
const romFunctions = [];
for (const m of xml.matchAll(/<FUNCTION [^>]*ENTRY_POINT="([0-9a-fA-F]+)"[^>]*NAME="([^"]+)"/g)) {
  romFunctions.push({ addr: parseInt(m[1], 16), name: m[2] });
}

// Symbols (named ISR vectors, labels)
const symbols = [];
for (const m of xml.matchAll(/<SYMBOL [^>]*ADDRESS="([0-9a-fA-F]+)"[^>]*NAME="([^"]*)"[^>]*TYPE="([^"]*)"/g)) {
  const source = m[0].match(/SOURCE_TYPE="([^"]*)"/)?.[1] ?? '';
  symbols.push({ addr: parseInt(m[1], 16), name: m[2], type: m[3], source });
}

// Code blocks
const codeBlocks = [];
for (const m of xml.matchAll(/<CODE_BLOCK START="([0-9a-fA-F]+)" END="([0-9a-fA-F]+)"/g)) {
  codeBlocks.push({ start: parseInt(m[1], 16), end: parseInt(m[2], 16) });
}

console.log(`  ROM functions: ${romFunctions.length}`);
console.log(`  Symbols:       ${symbols.length}`);
console.log(`  Code blocks:   ${codeBlocks.length}`);

// ── 2. Our ASM classification ──
const ourBlocks = [
  { start:0x000000, type:'code', codeRatio:86.0 },
  { start:0x010000, type:'code', codeRatio:98.8 },
  { start:0x020000, type:'code', codeRatio:99.7 },
  { start:0x030000, type:'data', codeRatio:6.9 },
  { start:0x040000, type:'data', codeRatio:49.3 },
  { start:0x050000, type:'code', codeRatio:91.0 },
  { start:0x060000, type:'code', codeRatio:89.7 },
  { start:0x070000, type:'code', codeRatio:91.6 },
  { start:0x080000, type:'code', codeRatio:92.2 },
  { start:0x090000, type:'code', codeRatio:97.2 },
  { start:0x0A0000, type:'data', codeRatio:39.2 },
  { start:0x0B0000, type:'code', codeRatio:88.5 },
  { start:0x0C0000, type:'code', codeRatio:86.6 },
  { start:0x0D0000, type:'code', codeRatio:86.7 },
  { start:0x0E0000, type:'code', codeRatio:84.4 },
  { start:0x0F0000, type:'code', codeRatio:84.9 },
  { start:0x100000, type:'code', codeRatio:78.3 },
  { start:0x110000, type:'code', codeRatio:79.0 },
  { start:0x120000, type:'code', codeRatio:83.1 },
  { start:0x130000, type:'data', codeRatio:42.6 },
  { start:0x140000, type:'data', codeRatio:0.0 },
  { start:0x150000, type:'data', codeRatio:0.0 },
  { start:0x160000, type:'data', codeRatio:0.0 },
  { start:0x170000, type:'data', codeRatio:0.0 },
  { start:0x180000, type:'code', codeRatio:93.8 },
  { start:0x190000, type:'code', codeRatio:94.3 },
  { start:0x1A0000, type:'code', codeRatio:94.2 },
  { start:0x1B0000, type:'code', codeRatio:52.0 },
  { start:0x1C0000, type:'code', codeRatio:80.6 },
  { start:0x1D0000, type:'code', codeRatio:82.2 },
  { start:0x1E0000, type:'code', codeRatio:65.9 },
  { start:0x1F0000, type:'code', codeRatio:77.5 },
];

function getOurType(addr) { const idx = Math.floor(addr / 0x10000); return ourBlocks[idx]?.type ?? 'unknown'; }

// ── 3. Ghidra code coverage per 64KB block ──
console.log('\n【2】Cross-reference per 64KB block');
const funcsPerBlock = new Array(32).fill(0);
const ghidraCodeBytes = new Array(32).fill(0);

romFunctions.forEach(f => { const idx = Math.floor(f.addr / 0x10000); if (idx < 32) funcsPerBlock[idx]++; });
codeBlocks.forEach(cb => {
  const si = Math.floor(cb.start / 0x10000), ei = Math.floor((cb.end - 1) / 0x10000);
  for (let i = si; i <= ei && i < 32; i++) {
    const bs = i * 0x10000, be = bs + 0x10000;
    ghidraCodeBytes[i] += Math.min(cb.end, be) - Math.max(cb.start, bs);
  }
});

console.log('Blk  Addr    | Ours  | Ghidra Funcs | Ghidra CodeKB | Ghidra% | ASM%   | Diff');
console.log('─────┼────────┼───────┼──────────────┼───────────────┼─────────┼────────┼──────');
ourBlocks.forEach((b, i) => {
  const addr = b.start.toString(16).toUpperCase().padStart(6, '0');
  const fCount = funcsPerBlock[i];
  const gKB = (ghidraCodeBytes[i] / 1024).toFixed(1);
  const gPct = (ghidraCodeBytes[i] / 655.36).toFixed(0);
  const aPct = b.codeRatio.toFixed(0);
  const diff = Math.abs(b.codeRatio - parseFloat(gPct));
  const flag = diff > 20 ? ' ⚠' : '';
  console.log(` ${i.toString().padEnd(3)}| $${addr} | ${b.type.padEnd(5)} | ${String(fCount).padEnd(12)} | ${String(gKB).padEnd(13)} | ${String(gPct).padEnd(7)} | ${aPct}%   | ${diff}%${flag}`);
});

// ── 4. Agreement analysis ──
console.log('\n【3】Agreement analysis');
let agree = 0, disagreeData = [];
ourBlocks.forEach((b, i) => {
  const gPct = ghidraCodeBytes[i] / 65536 * 100;
  const gType = gPct > 50 ? 'code' : 'data';
  if (b.type === gType) agree++;
  else disagreeData.push({ blk: i, addr: b.start, ours: b.type, oursPct: b.codeRatio, ghidra: gType, ghidraPct: gPct });
});
console.log(`  Agreement: ${agree}/32 blocks (${(agree/32*100).toFixed(0)}%)`);
if (disagreeData.length) {
  console.log(`  Disagreements:`);
  disagreeData.forEach(d => console.log(`    Blk ${d.blk} ($${d.addr.toString(16).toUpperCase()}): ours=${d.ours}(${d.oursPct}%) vs ghidra=${d.ghidra}(${d.ghidraPct.toFixed(0)}%)`));
}

// ── 5. Notable symbols ──
console.log('\n【4】Key named symbols (user-defined)');
const udSymbols = symbols.filter(s => s.source === 'USER_DEFINED');
console.log(`  ${udSymbols.length} user-defined symbols:`);
udSymbols.forEach(s => {
  console.log(`    ${s.name.padEnd(16)} @ 0x${s.addr.toString(16).toUpperCase().padStart(6, '0')}`);
});

// ── 6. Generate TS function index ──
console.log('\n【5】Generating rom-functions.ts...');

const header = `/**
 * ROM Function Index — Ghidra decompilation merged with ASM code/data classification
 * Source: Ghidra 11.0.1 (802 ROM functions, 488 code blocks, 355 symbols)
 * Cross-ref: rom.asm instruction-level boundaries
 * Generated: ${new Date().toISOString()}
 */

import { readRomByte } from './rom-blocks';

export interface GhidraFunction {
  /** ROM address of function entry point */
  addr: number;
  /** Ghidra auto-assigned name (FUN_XXXXXXXX) */
  name: string;
  /** Our ASM-based classification for the 64KB block containing this function */
  blockType: 'code' | 'data';
}

/** ${romFunctions.length} ROM functions detected by Ghidra auto-analysis.
 *  Functions found in 'data' blocks via ASM may be false positives or embedded code.
 */
export const GHIDRA_FUNCTIONS: GhidraFunction[] = [
`;

const entries = romFunctions.map(f => {
  const t = getOurType(f.addr);
  return `  { addr:0x${f.addr.toString(16).toUpperCase().padStart(6,'0')}, name:'${f.name}', blockType:'${t}' }`;
});

const footer = `
];

/** Find Ghidra function by address (binary search) */
export function findGhidraFunction(addr: number): GhidraFunction | undefined {
  let lo = 0, hi = GHIDRA_FUNCTIONS.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const f = GHIDRA_FUNCTIONS[mid];
    if (f.addr === addr) return f;
    if (addr < f.addr) hi = mid - 1;
    else lo = mid + 1;
  }
  return undefined;
}

export const GHIDRA_SUMMARY = {
  totalRomFunctions: ${romFunctions.length},
  totalCodeBlocks: ${codeBlocks.length},
  totalSymbols: ${symbols.length},
  userDefinedSymbols: ${udSymbols.length},
  agreementWithASM: ${agree}/${ourBlocks.length},
};
`;

const outPath = `${base}/m68k/output/rom-functions.ts`;
fs.writeFileSync(outPath, header + entries.join(',\n') + footer);
console.log(`  → ${outPath} (${(entries.length * 40 / 1024).toFixed(0)}KB estimated)`);

// ── 7. Summary ──
console.log('\n═══════════════════════════════════════════');
console.log('FINAL SUMMARY');
console.log('═══════════════════════════════════════════');
console.log(`  ROM functions (Ghidra):    ${romFunctions.length}`);
console.log(`  Code blocks:               ${codeBlocks.length}`);
console.log(`  Named symbols:             ${symbols.length}`);
console.log(`  ASM agreement:             ${agree}/32 blocks (${(agree/32*100).toFixed(0)}%)`);
console.log(`  Function coverage:         0x${romFunctions[0]?.addr.toString(16) ?? 'N/A'} → 0x${romFunctions[romFunctions.length-1]?.addr.toString(16) ?? 'N/A'}`);
