import { readFileSync } from 'fs';

const core = readFileSync('tools/6502-to-js-test/_prg_output/core.cjs', 'utf8');

// Find v[expr] patterns more carefully
// LDA_ZP(0x27) in bank00 would be accessing memory address 0x27
// In asm.js this would be something like v[base + 0x27] or v[0x27 + base]
// Let's look for patterns near known address values

// Check: what's the minimum constant offset for v[...constant...]?
// If STATIC_BASE=8, memory[0]=v[8]; if STATIC_BASE=1024, memory[0]=v[1024]
const line4 = core.split('\n')[4]; // The giant asm.js function
console.log('Line 4 length:', line4.length);

// Find all constant accesses: v[<number>]
const constAccesses = [...line4.matchAll(/\bv\[(\d+)\]/g)];
console.log('Total constant v[...] accesses:', constAccesses.length);

const offsets = constAccesses.map(m => parseInt(m[1]));
const uniq = [...new Set(offsets)].sort((a, b) => a - b);
console.log('Unique offset values:', uniq.length);
console.log('Min offset:', uniq[0], 'Max offset:', uniq[uniq.length - 1]);

// Also look for v[... + const] patterns
const addPatterns = [...line4.matchAll(/\bv\[(?:\w+\+(\d+)\|0)\]/g)];
console.log('\nv[X + const|0] patterns:', addPatterns.length);
const addOffsets = addPatterns.map(m => parseInt(m[1]));
const addUniq = [...new Set(addOffsets)].sort((a, b) => a - b);
console.log('Unique offsets:', addUniq.length);
console.log('Min:', addUniq[0], 'Max:', addUniq[addUniq.length - 1]);
console.log('First 20:', addUniq.slice(0, 20));

// Check the LDA_ZP: ZPX(27) would be v[27+base] or v[(27&255)+base]
// Let's find v with 0x27 or 27
const matches27 = [...line4.matchAll(/\[(?:e\+)?(\d+)(?:\|0)?\]/g)];
console.log('\nPatterns with small numbers (< 256):');
const small = matches27.filter(m => parseInt(m[1]) < 256);
console.log(small.slice(0, 20).map(m => m[0]));

// Also check if there are patterns like v[addr+staticBase]
// Pattern: expression representing NES address calculation
console.log('\n=== Checking line 2 (asm.js init) for offsets ===');
const line2 = core.split('\n')[2];
// Look for K=132128 (stack size?), or other constants
const K = line2.match(/K=(\d+)/);
console.log('K (stack pointer?):', K ? K[1] : 'not found');
const r = line2.match(/new ArrayBuffer\((\d+)\)/);
console.log('ArrayBuffer:', r ? r[1] : 'not found');

// Now check: v[1024] appears but what's the NEXT common offset after that?
// If 1024 = STATIC_BASE, then memory[0]=v[1024]
const between = uniq.filter(x => x >= 1024 && x <= 1024 + 256);
console.log('\nOffsets 1024..1280:', between);
