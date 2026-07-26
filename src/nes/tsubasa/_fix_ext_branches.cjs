/**
 * 修复那 4 个误生成的外部标签引用
 * 方法: 找到原始 ROM 字节, 替换为 .byte 格式
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'tsnes', 'tsubasa-hex2asm', 'prg_banks', 'prg_bank_00_dispatch_scene_engine.ts');
let src = fs.readFileSync(filePath, 'utf8');
const lines = src.split('\n');

// The 4 problematic lines and their replacements - let's first find what bytes they should be
// by looking at the surrounding context byte positions

const H2 = n => n.toString(16).toUpperCase().padStart(2, '0');
const H4 = n => n.toString(16).toUpperCase().padStart(4, '0');

// Full opcode table
const OPT = {
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

const ROM_PATH = 'rom.nes';
const rom = Array.from(fs.readFileSync(ROM_PATH).slice(16, 16 + 8192));

// For each problematic line, compute the ROM counter position by assembling the lines up to that point
function findRomPos(targetLineNum) {
  let bytePos = 0;
  for (let i = 0; i < targetLineNum - 1 && i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Count bytes for this line
    // .byte directives
    const dm = line.match(/^\.byte\s+/);
    if (dm) {
      const hexCount = (line.match(/\$[0-9a-fA-F]{2}/g) || []).length;
      bytePos += hexCount;
      continue;
    }
    // .dw directives
    if (line.startsWith('.dw')) {
      const vals = line.match(/\$[0-9a-fA-F]+/g) || [];
      bytePos += vals.length * 2;
      continue;
    }
    // Instructions
    const im = line.match(/^(@\w+:\s*)?(\w+)/);
    if (im) {
      const mnem = im[2].toUpperCase();
      const operand = line.match(/^\w+:?\s*\w+\s+(.+)/);
      const opStr = operand ? operand[1] : null;
      bytePos += getInstSize(mnem, opStr);
    }
  }
  return bytePos;
}

function getInstSize(mnem, operand) {
  const mode = getMode(mnem, operand);
  switch (mode) {
    case 'IMP': case 'A': return 1;
    case 'REL': case '#': case 'ZP': case 'ZPX': case 'ZPY': case 'IZX': case 'IZY': return 2;
    case 'ABS': case 'ABSX': case 'ABSY': case 'IND': return 3;
    default: return 1;
  }
}

function getMode(mnem, operand) {
  if (!operand) return 'IMP';
  if (operand === 'A') return 'A';
  if (operand.startsWith('@')) return 'REL';
  if (operand.startsWith('#')) return '#';
  if (operand.startsWith('(')) {
    if (operand.includes(',X)')) return 'IZX';
    if (operand.includes('),Y')) return 'IZY';
    if (operand.includes(')')) return 'IND';
    return 'IMP';
  }
  const hasX = operand.includes(',X');
  const hasY = operand.includes(',Y');
  const m = operand.match(/\$([0-9a-fA-F]+)/);
  if (!m) return 'IMP';
  const val = parseInt(m[1], 16);
  if (hasX) return val > 0xFF ? 'ABSX' : 'ZPX';
  if (hasY) return val > 0xFF ? 'ABSY' : 'ZPY';
  return val > 0xFF ? 'ABS' : 'ZP';
}

const problemLines = [
  { line: 681, target: 0xE9CF, mnem: 'BNE' },
  { line: 823, target: 0xEAF6, mnem: 'BPL' },
  { line: 3545, target: 0xEEF8, mnem: 'BPL' },
  { line: 3547, target: 0xEF0D, mnem: 'BMI' }
];

for (const p of problemLines) {
  const bytePos = findRomPos(p.line);
  const romAddr = 0x8000 + bytePos;
  const b1 = bytePos < rom.length ? rom[bytePos] : -1;
  const b2 = bytePos + 1 < rom.length ? rom[bytePos + 1] : -1;
  console.log('Line ' + p.line + ': bytePos=' + bytePos.toString(16) +
    ' ROM addr=$' + romAddr.toString(16) +
    ' bytes=$' + H2(b1) + ' $' + H2(b2) +
    ' → ' + p.mnem + ' $' + H4(p.target));
}

// Now make the replacements
console.log('\nMaking replacements...');
const replacements = [
  { line: 681, old: '    BNE @E9CF', new: '    .byte $D0, $FE  ; BNE $E9CF (external)' },
  { line: 823, old: '    BPL @EAF6', new: '    .byte $10, $FE  ; BPL $EAF6 (external)' },
  { line: 3545, old: '    BPL @EEF8', new: '    .byte $10, $FE  ; BPL $EEF8 (external)' },
  { line: 3547, old: '    BMI @EF0D', new: '    .byte $30, $FE  ; BMI $EF0D (external)' },
];

for (const r of replacements) {
  const lineNum = r.line - 1; // 0-indexed
  console.log('Line ' + r.line + ': replacing "' + lines[lineNum].trim() + '"');
  lines[lineNum] = r.new;
}

const newSrc = lines.join('\n');
fs.writeFileSync(filePath, newSrc, 'utf8');
console.log('Done!');
