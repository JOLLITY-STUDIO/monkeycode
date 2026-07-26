/**
 * 修复版验证：逐个检查转换后的函数产生的字节是否与 ROM 匹配
 */
const fs = require('fs');
const path = require('path');

const OPS = {
  ADC: { '#':0x69, ZP:0x65, ZPX:0x75, ABS:0x6D, ABSX:0x7D, ABSY:0x79, IZX:0x61, IZY:0x71 },
  AND: { '#':0x29, ZP:0x25, ZPX:0x35, ABS:0x2D, ABSX:0x3D, ABSY:0x39, IZX:0x21, IZY:0x31 },
  ASL: { A:0x0A, ZP:0x06, ZPX:0x16, ABS:0x0E, ABSX:0x1E },
  BCC: { REL:0x90 }, BCS: { REL:0xB0 }, BEQ: { REL:0xF0 },
  BIT: { ZP:0x24, ABS:0x2C }, BMI: { REL:0x30 },
  BNE: { REL:0xD0 }, BPL: { REL:0x10 }, BRK: { IMP:0x00 },
  BVC: { REL:0x50 }, BVS: { REL:0x70 },
  CLC: { IMP:0x18 }, CLD: { IMP:0xD8 }, CLI: { IMP:0x58 }, CLV: { IMP:0xB8 },
  CMP: { '#':0xC9, ZP:0xC5, ZPX:0xD5, ABS:0xCD, ABSX:0xDD, ABSY:0xD9, IZX:0xC1, IZY:0xD1 },
  CPX: { '#':0xE0, ZP:0xE4, ABS:0xEC }, CPY: { '#':0xC0, ZP:0xC4, ABS:0xCC },
  DEC: { ZP:0xC6, ZPX:0xD6, ABS:0xCE, ABSX:0xDE }, DEX: { IMP:0xCA }, DEY: { IMP:0x88 },
  EOR: { '#':0x49, ZP:0x45, ZPX:0x55, ABS:0x4D, ABSX:0x5D, ABSY:0x59, IZX:0x41, IZY:0x51 },
  INC: { ZP:0xE6, ZPX:0xF6, ABS:0xEE, ABSX:0xFE }, INX: { IMP:0xE8 }, INY: { IMP:0xC8 },
  JMP: { ABS:0x4C, IND:0x6C }, JSR: { ABS:0x20 },
  LDA: { '#':0xA9, ZP:0xA5, ZPX:0xB5, ABS:0xAD, ABSX:0xBD, ABSY:0xB9, IZX:0xA1, IZY:0xB1 },
  LDX: { '#':0xA2, ZP:0xA6, ZPY:0xB6, ABS:0xAE, ABSY:0xBE },
  LDY: { '#':0xA0, ZP:0xA4, ZPX:0xB4, ABS:0xAC, ABSX:0xBC },
  LSR: { A:0x4A, ZP:0x46, ZPX:0x56, ABS:0x4E, ABSX:0x5E },
  NOP: { IMP:0xEA },
  ORA: { '#':0x09, ZP:0x05, ZPX:0x15, ABS:0x0D, ABSX:0x1D, ABSY:0x19, IZX:0x01, IZY:0x11 },
  PHA: { IMP:0x48 }, PHP: { IMP:0x08 }, PLA: { IMP:0x68 }, PLP: { IMP:0x28 },
  ROL: { A:0x2A, ZP:0x26, ZPX:0x36, ABS:0x2E, ABSX:0x3E },
  ROR: { A:0x6A, ZP:0x66, ZPX:0x76, ABS:0x6E, ABSX:0x7E },
  RTI: { IMP:0x40 }, RTS: { IMP:0x60 },
  SBC: { '#':0xE9, ZP:0xE5, ZPX:0xF5, ABS:0xED, ABSX:0xFD, ABSY:0xF9, IZX:0xE1, IZY:0xF1 },
  SEC: { IMP:0x38 }, SED: { IMP:0xF8 }, SEI: { IMP:0x78 },
  STA: { ZP:0x85, ZPX:0x95, ABS:0x8D, ABSX:0x9D, ABSY:0x99, IZX:0x81, IZY:0x91 },
  STX: { ZP:0x86, ZPY:0x96, ABS:0x8E },
  STY: { ZP:0x84, ZPX:0x94, ABS:0x8C },
  TAX: { IMP:0xAA }, TAY: { IMP:0xA8 }, TSX: { IMP:0xBA },
  TXA: { IMP:0x8A }, TXS: { IMP:0x9A }, TYA: { IMP:0x98 },
};

const BRANCH_SET = new Set(['BCC','BCS','BEQ','BMI','BNE','BPL','BVC','BVS']);
const JUMP_SET = new Set(['JMP','JSR']);

function parseOpMnem(operand, mnemonic) {
  if (!operand) return 'IMP';
  if (operand === 'A') return 'A';
  if (operand.startsWith('@')) return JUMP_SET.has(mnemonic) ? 'ABS' : 'REL';
  if (operand.startsWith('#')) return '#';
  // IZX: ($XX,X), IZY: ($XX),Y, IND: ($XXXX)
  if (operand.startsWith('(')) {
    if (operand.match(/^\(\$[0-9a-fA-F]+,X\)$/)) return 'IZX';
    if (operand.match(/^\(\$[0-9a-fA-F]+\),Y$/)) return 'IZY';
    if (operand.match(/^\(\$[0-9a-fA-F]+\)$/)) return 'IND';
    return 'IMP';
  }
  // ZPX/ZPY/ABSX/ABSY/ZP/ABS
  const hasCommaX = operand.includes(',X');
  const hasCommaY = operand.includes(',Y');
  const m = operand.match(/\$([0-9a-fA-F]+)/);
  if (!m) return 'IMP';
  const val = parseInt(m[1], 16);
  if (hasCommaX) return val > 0xFF ? 'ABSX' : 'ZPX';
  if (hasCommaY) return val > 0xFF ? 'ABSY' : 'ZPY';
  return val > 0xFF ? 'ABS' : 'ZP';
}

function getSize(mode) {
  switch (mode) { case 'IMP':case 'A': return 1; case 'REL':case '#':case 'ZP':case 'ZPX':case 'ZPY':case 'IZX':case 'IZY': return 2; case 'ABS':case 'ABSX':case 'ABSY':case 'IND': return 3; default: return 1; }
}

function assembleAsm(source) {
  const lines = source.split('\n');
  const labelOffsets = {};
  const items = [];
  let offset = 0;

  // Pass 1
  for (const rawLine of lines) {
    let line = rawLine.replace(/;.*$/, '').replace(/\/\/.*$/, '').trim();
    if (!line) continue;
    
    // .byte
    if (line.startsWith('.byte')) {
      const hexes = line.match(/\$([0-9a-fA-F]{2})/g) || [];
      items.push({ kind: 'bytes', values: hexes.map(h => parseInt(h.slice(1), 16)) });
      offset += hexes.length;
      continue;
    }
    // .dw
    if (line.startsWith('.dw')) {
      const vals = line.match(/\$([0-9a-fA-F]+)/g) || [];
      const nums = vals.map(v => parseInt(v.slice(1), 16));
      // each word = 2 bytes
      for (const n of nums) { items.push({ kind: 'bytes', values: [n & 0xFF, (n >> 8) & 0xFF] }); offset += 2; }
      continue;
    }
    // .org
    if (line.startsWith('.org')) {
      const mOrg = line.match(/\.org\s+\$([0-9a-fA-F]+)/);
      if (mOrg) { /* skip - we don't adjust offsets here */ }
      continue;
    }
    
    // Label
    const lm = line.match(/^@(\w+):(?:\s+(.+))?$/);
    if (lm) {
      labelOffsets[lm[1]] = offset;
      if (lm[2]) line = lm[2];
      else continue;
    }
    
    // Instruction
    const im = line.match(/^(\w+)(?:\s+(.+))?$/);
    if (!im) continue;
    const mnemonic = im[1].toUpperCase();
    const operand = im[2] ? im[2].trim() : null;
    const mode = parseOpMnem(operand, mnemonic);
    
    if (!OPS[mnemonic] || OPS[mnemonic][mode] === undefined) {
      console.log('WARN: bad instruction ' + mnemonic + ' ' + (operand||'') + ' mode=' + mode + ' at offset ' + offset);
      continue;
    }
    
    const size = getSize(mode);
    items.push({ kind: 'inst', mnemonic, operand, mode, size });
    offset += size;
  }
  
  // Pass 2
  const result = [];
  for (const item of items) {
    if (item.kind === 'bytes') {
      result.push(...item.values);
      continue;
    }
    
    const opcode = OPS[item.mnemonic][item.mode];
    result.push(opcode);
    
    if (item.size >= 2) {
      if (item.mode === 'REL') {
        const targetOffset = labelOffsets[item.operand.slice(1)];
        if (targetOffset === undefined) {
          // External branch - not supported in this simplified assembler
          // Assume it was kept as .byte
          console.log('WARN: external/unresolved branch ' + item.mnemonic + ' ' + item.operand);
          result.pop(); // remove opcode
          continue;
        }
        const rel = targetOffset - (result.length);
        result.push(rel & 0xFF);
      } else if (item.mode === 'ABS' || item.mode === 'ABSX' || item.mode === 'ABSY') {
        const m = item.operand.match(/\$([0-9a-fA-F]+)/);
        let val = m ? parseInt(m[1], 16) : 0;
        if (item.operand.startsWith('@')) {
          val = labelOffsets[item.operand.slice(1)];
          if (val === undefined) { console.log('WARN: unresolved abs label ' + item.operand); val = 0; }
        }
        result.push(val & 0xFF, (val >> 8) & 0xFF);
      } else if (item.mode === '#') {
        const m = item.operand.match(/\$([0-9a-fA-F]+)/);
        result.push(m ? parseInt(m[1], 16) : 0);
      } else if (item.mode === 'ZP' || item.mode === 'ZPX' || item.mode === 'ZPY') {
        const m = item.operand.match(/\$([0-9a-fA-F]+)/);
        result.push(m ? parseInt(m[1], 16) : 0);
      } else if (item.mode === 'IZX' || item.mode === 'IZY') {
        const m = item.operand.match(/\$([0-9a-fA-F]+)/);
        result.push(m ? parseInt(m[1], 16) : 0);
      } else if (item.mode === 'IND') {
        const m = item.operand.match(/\$([0-9a-fA-F]+)/);
        const val = m ? parseInt(m[1], 16) : 0;
        result.push(val & 0xFF, (val >> 8) & 0xFF);
      }
    }
  }
  return result;
}

// ═══ Main ═══
const src = fs.readFileSync(path.join(__dirname, 'src', 'tsnes', 'tsubasa-hex2asm', 'prg_banks', 'prg_bank_00_dispatch_scene_engine.ts'), 'utf8');
const rom = fs.readFileSync('rom.nes');
const expected = Array.from(rom.slice(16, 16 + 8192));

const order = ['builddispatch', 'buildjumpVectors', 'buildsceneLoop',
  'buildscriptEngine', 'builddataTables', 'buildsceneTables',
  'buildbytecodeHandlers', 'buildscheduler', 'buildcontextSave', 'buildpadding'];

function getFuncBody(fname) {
  const search = 'function ' + fname + '(';
  let idx = src.indexOf(search);
  if (idx === -1) return null;
  let braceIdx = src.indexOf('{', idx);
  let depth = 0, endIdx = -1;
  for (let i = braceIdx; i < src.length; i++) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
  }
  return src.slice(braceIdx + 1, endIdx);
}

const total = [];
for (const fname of order) {
  const body = getFuncBody(fname);
  if (!body) { console.log(fname + ': NOT FOUND'); continue; }

  let bytes;
  const asmMatch = body.match(/return asm`([\s\S]*?)`\s*;?\s*$/);
  if (asmMatch) {
    bytes = assembleAsm(asmMatch[1]);
  } else if (body.includes('return [')) {
    const bm = body.match(/0x([0-9a-fA-F]{2})/g) || [];
    bytes = bm.map(m => parseInt(m.slice(2), 16));
  } else {
    console.log(fname + ': UNKNOWN format');
    bytes = [];
  }
  total.push(...bytes);
  console.log(fname + ': ' + bytes.length + ' bytes');
}

console.log('\nTotal: ' + total.length + ' / 8192 bytes');
const len = Math.min(total.length, expected.length);
let mismatches = 0;
for (let i = 0; i < len; i++) {
  if (total[i] !== expected[i]) {
    if (mismatches < 15) console.log('MISMATCH $' + (0x8000+i).toString(16) + ': got $' + total[i].toString(16).padStart(2,'0') + ' expected $' + expected[i].toString(16).padStart(2,'0'));
    mismatches++;
  }
}
console.log('Mismatches: ' + mismatches + ' / ' + len);
if (mismatches === 0) console.log('PERFECT MATCH!');
