/**
 * 全自动修复: 恢复 → 转换 → 修复 4 个外部分支标签 → 删除所有残留 @label 引用
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FILENAME = 'src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_00_dispatch_scene_engine.ts';

// Step 1: Restore original
console.log('Step 1: Restoring eccbb79...');
execSync('git checkout eccbb79 -- "' + FILENAME + '"', { cwd: __dirname });

// Step 2: Run conversions
const CONVERT_SCRIPT = path.join(__dirname, '_convert_bank00_run.mjs');
const funcs = ['buildbytecodeHandlers', 'buildscheduler', 'buildpadding'];
for (const f of funcs) {
  console.log('  Converting ' + f + '...');
  execSync('node "' + CONVERT_SCRIPT + '" ' + f, { cwd: __dirname, stdio: 'pipe' });
}

// Step 3: Read the converted file and fix undefined labels
console.log('\nStep 3: Finding undefined labels...');
let content = fs.readFileSync(path.join(__dirname, FILENAME), 'utf8');
const lines = content.split('\n');

// Find all @Exxx labels that are referenced but not defined
// First pass: collect all defined labels per function
const funcBodies = {};
for (const fname of funcs) {
  const search = 'function ' + fname + '(';
  let idx = content.indexOf(search);
  if (idx === -1) continue;
  let braceIdx = content.indexOf('{', idx);
  let depth = 0, endIdx = -1;
  for (let i = braceIdx; i < content.length; i++) {
    if (content[i] === '{') depth++;
    if (content[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
  }
  const body = content.slice(braceIdx + 1, endIdx);
  const asmMatch = body.match(/return asm`([\s\S]*?)`\s*;?\s*$/);
  if (!asmMatch) continue;
  
  const asmLines = asmMatch[1].split('\n');
  const defined = new Set();
  const refs = new Set();
  
  for (const line of asmLines) {
    const t = line.trim();
    const lm = t.match(/^@(\w+):/);
    if (lm) defined.add(lm[1]);
    const refs_m = t.match(/@(\w+)/g);
    if (refs_m) for (const r of refs_m) {
      const name = r.slice(1);
      if (!name.endsWith(':')) refs.add(name);
    }
  }
  
  // Find undefined
  const undefined = [...refs].filter(r => !defined.has(r));
  if (undefined.length > 0) {
    console.log('  ' + fname + ' undefined: ' + undefined.join(', '));
  }
}

// Step 4: Fix the 4 known problem labels by replacing them with .byte
// These are branches that go outside the function's address range
// BNE @E9CF → .byte $D0, <rel>  ; BNE $E9CF (external)
// BPL @EAF6 → .byte $10, <rel>  ; BPL $EAF6 (external)
// BPL @EEF8 → .byte $10, <rel>  ; BPL $EEF8 (external)
// BMI @EF0D → .byte $30, <rel>  ; BMI $EF0D (external)

// The relative offsets are computed from the original ROM bytes.
// Since the converted function assembled bytes should match the ROM,
// the relative offset in the ROM at those positions is what we need.
// Let's just look at the ROM.

const rom = Array.from(fs.readFileSync('rom.nes').slice(16, 16 + 8192));

const fixes = [
  // For each fix, we need: the line text to replace, the ROM addr, and the mnemonic+target
  { search: '    BNE @E9CF', mnem: 'BNE', target: 0xE9CF, newLine: null },
  { search: '    BPL @EAF6', mnem: 'BPL', target: 0xEAF6, newLine: null },
  { search: '    BPL @EEF8', mnem: 'BPL', target: 0xEEF8, newLine: null },
  { search: '    BMI @EF0D', mnem: 'BMI', target: 0xEF0D, newLine: null },
];

// Since we can't easily compute the byte offset, just use placeholder and let the user verify
// Alternative: the raw ROM at unknown offset. We'll use the fact that these are in-function.
// Actually, for an external branch, the .byte approach preserves the EXACT bytes from ROM.
// Since we don't know the offset, let's read what was in the original unconverted file.

// Actually, the original file had these as part of the .byte 0xXX, 0xYY, ... stream
// So the exact bytes are known. Let's extract them from the restored file.

// Restore again to get original bytes
execSync('git checkout eccbb79 -- "' + FILENAME + '"', { cwd: __dirname });
const origContent = fs.readFileSync(path.join(__dirname, FILENAME), 'utf8');

// Now re-run conversions but skip the fix step for now
// Actually, let's do it differently: patch the disassembler script to not generate 
// REF references for external branches, then re-convert.

// The bug is in _convert_bank00_run.mjs line 118-128:
// The range check sometimes passes for external targets.
// Fix: add strict bounds checking

// Let me just verify by looking at the original bytes directly
function getFuncBytes(content, fname) {
  const search = 'function ' + fname + '(';
  let idx = content.indexOf(search);
  if (idx === -1) return [];
  let braceIdx = content.indexOf('{', idx);
  let depth = 0, endIdx = -1;
  for (let i = braceIdx; i < content.length; i++) {
    if (content[i] === '{') depth++;
    if (content[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
  }
  const body = content.slice(braceIdx + 1, endIdx);
  const bytes = [];
  const bm = body.match(/0x([0-9a-fA-F]{2})/g);
  if (bm) bm.forEach(m => bytes.push(parseInt(m.slice(2), 16)));
  return bytes;
}

const bhBytes = getFuncBytes(origContent, 'buildbytecodeHandlers');
const padBytes = getFuncBytes(origContent, 'buildpadding');

// Find the branch bytes in these original byte arrays
// For buildbytecodeHandlers: search for BNE $E9CF and BPL $EAF6
// For buildpadding: search for BPL $EEF8 and BMI $EF0D

const H2 = n => n.toString(16).toUpperCase().padStart(2, '0');
const H4 = n => n.toString(16).toUpperCase().padStart(4, '0');

const fullOptTable = {
  "69":[0,5,2],"65":[0,0,2],"75":[0,6,2],"6d":[0,3,3],"7d":[0,8,3],"79":[0,9,3],"61":[0,10,2],"71":[0,11,2],
  "29":[1,5,2],"25":[1,0,2],"35":[1,6,2],"2d":[1,3,3],"3d":[1,8,3],"39":[1,9,3],"21":[1,10,2],"31":[1,11,2],
  "0a":[2,4,1],"06":[2,0,2],"16":[2,6,2],"0e":[2,3,3],"1e":[2,8,3],
  "90":[3,1,2],"b0":[4,1,2],"f0":[5,1,2],"30":[7,1,2],"d0":[8,1,2],"10":[9,1,2],"50":[11,1,2],"70":[12,1,2],
  "24":[6,0,2],"2c":[6,3,3],"00":[10,2,1],
  "18":[13,2,1],"d8":[14,2,1],"58":[15,2,1],"b8":[16,2,1],
  "c9":[17,5,2],"c5":[17,0,2],"d5":[17,6,2],"cd":[17,3,3],"dd":[17,8,3],"d9":[17,9,3],"c1":[17,10,2],"d1":[17,11,2],
  "e0":[18,5,2],"e4":[18,0,2],"ec":[18,3,3],"c0":[19,5,2],"c4":[19,0,2],"cc":[19,3,3],
  "c6":[20,0,2],"d6":[20,6,2],"ce":[20,3,3],"de":[20,8,3],"ca":[21,2,1],"88":[22,2,1],
  "49":[23,5,2],"45":[23,0,2],"55":[23,6,2],"4d":[23,3,3],"5d":[23,8,3],"59":[23,9,3],"41":[23,10,2],"51":[23,11,2],
  "e6":[24,0,2],"f6":[24,6,2],"ee":[24,3,3],"fe":[24,8,3],"e8":[25,2,1],"c8":[26,2,1],
  "4c":[27,3,3],"6c":[27,12,3],"20":[28,3,3],
  "a9":[29,5,2],"a5":[29,0,2],"b5":[29,6,2],"ad":[29,3,3],"bd":[29,8,3],"b9":[29,9,3],"a1":[29,10,2],"b1":[29,11,2],
  "a2":[30,5,2],"a6":[30,0,2],"b6":[30,7,2],"ae":[30,3,3],"be":[30,9,3],
  "a0":[31,5,2],"a4":[31,0,2],"b4":[31,6,2],"ac":[31,3,3],"bc":[31,8,3],
  "4a":[32,4,1],"46":[32,0,2],"56":[32,6,2],"4e":[32,3,3],"5e":[32,8,3],
  "1a":[33,2,1],"3a":[33,2,1],"5a":[33,2,1],"7a":[33,2,1],"da":[33,2,1],"ea":[33,2,1],"fa":[33,2,1],
  "09":[34,5,2],"05":[34,0,2],"15":[34,6,2],"0d":[34,3,3],"1d":[34,8,3],"19":[34,9,3],"01":[34,10,2],"11":[34,11,2],
  "48":[35,2,1],"08":[36,2,1],"68":[37,2,1],"28":[38,2,1],
  "2a":[39,4,1],"26":[39,0,2],"36":[39,6,2],"2e":[39,3,3],"3e":[39,8,3],
  "6a":[40,4,1],"66":[40,0,2],"76":[40,6,2],"6e":[40,3,3],"7e":[40,8,3],
  "40":[41,2,1],"60":[42,2,1],
  "e9":[43,5,2],"eb":[43,5,2],"e5":[43,0,2],"f5":[43,6,2],"ed":[43,3,3],"fd":[43,8,3],"f9":[43,9,3],"e1":[43,10,2],"f1":[43,11,2],
  "38":[44,2,1],"f8":[45,2,1],"78":[46,2,1],
  "85":[47,0,2],"95":[47,6,2],"8d":[47,3,3],"9d":[47,8,3],"99":[47,9,3],"81":[47,10,2],"91":[47,11,2],
  "86":[48,0,2],"96":[48,7,2],"8e":[48,3,3],"84":[49,0,2],"94":[49,6,2],"8c":[49,3,3],
  "aa":[50,2,1],"a8":[51,2,1],"ba":[52,2,1],"8a":[53,2,1],"9a":[54,2,1],"98":[55,2,1],
};

function findBranchTarget(bytes, baseAddr, mnem, target) {
  const opcodeMap = { BNE: 0xD0, BPL: 0x10, BMI: 0x30 };
  const targetOpcode = opcodeMap[mnem];
  
  let pc = 0;
  while (pc < bytes.length) {
    const op = H2(bytes[pc]).toLowerCase();
    const rec = fullOptTable[op];
    if (!rec) { pc++; continue; }
    const [insIdx, mode, size] = rec;
    if (pc + size > bytes.length) break;
    
    if (bytes[pc] === targetOpcode && mode === 1) {
      const lo = bytes[pc + 1];
      const t = baseAddr + pc + 2 + (lo < 128 ? lo : lo - 256);
      if (t === target) {
        console.log('  Found ' + mnem + ' @ pc=' + pc.toString(16) + 
          ' (addr=$' + H4(baseAddr+pc) + ') offset=$' + pc.toString(16) +
          ' bytes=$' + H2(bytes[pc]) + ' $' + H2(lo));
        return { pc, opcode: bytes[pc], rel: lo, target, addr: baseAddr + pc };
      }
    }
    pc += size;
  }
  return null;
}

console.log('\nSearching for branch instructions in original bytes:');
const bases = { buildbytecodeHandlers: 0x8840, buildpadding: 0x8FF6 };

const searches = [
  { mnem: 'BNE', target: 0xE9CF, fn: 'buildbytecodeHandlers' },
  { mnem: 'BPL', target: 0xEAF6, fn: 'buildbytecodeHandlers' },
  { mnem: 'BPL', target: 0xEEF8, fn: 'buildpadding' },
  { mnem: 'BMI', target: 0xEF0D, fn: 'buildpadding' },
];

for (const s of searches) {
  const bytes = s.fn === 'buildbytecodeHandlers' ? bhBytes : padBytes;
  const base = bases[s.fn];
  const result = findBranchTarget(bytes, base, s.mnem, s.target);
  if (result) {
    const replacement = '    .byte $' + H2(result.opcode) + ', $' + H2(result.rel) +
      '  ; ' + s.mnem + ' $' + H4(s.target) + ' (external cross-function)';
    console.log('  Fix: ' + replacement.trim());
    fixes.find(f => f.mnem === s.mnem && f.target === s.target).newLine = replacement;
  }
}

// Now restore and re-convert
console.log('\nStep 4: Restoring and re-converting...');
execSync('git checkout eccbb79 -- "' + FILENAME + '"', { cwd: __dirname });
for (const f of funcs) {
  execSync('node "' + CONVERT_SCRIPT + '" ' + f, { cwd: __dirname, stdio: 'pipe' });
}

// Step 5: Apply fixes
console.log('\nStep 5: Applying fixes...');
content = fs.readFileSync(path.join(__dirname, FILENAME), 'utf8');
for (const f of fixes) {
  if (content.includes(f.search)) {
    content = content.replace(f.search, f.newLine);
    console.log('  Fixed: ' + f.search.trim());
  } else {
    console.log('  NOT FOUND: ' + f.search.trim());
  }
}

fs.writeFileSync(path.join(__dirname, FILENAME), content, 'utf8');
console.log('\nDone! Verify with: node _verify_conv.cjs');
