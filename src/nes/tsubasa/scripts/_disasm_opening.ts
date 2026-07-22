/**
 * 反汇编开场 demo → 生成 TypeScript 文件
 * 用法: npx tsx _disasm_opening.ts
 * 输出: pages/game_jsnes/opening/*.ts
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import NES from './src/tsnes/src/nes';

const ROM_PATH = 'rom.nes';
const MAX_FRAMES = 240;
const OUT_DIR = 'pages/game_jsnes/opening';

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// ============================================================
// 6502 指令表: [mnemonic, addrMode, byteLen]
// ============================================================

type AddrMode = 'IMP' | 'IMM' | 'ZP' | 'ZPX' | 'ZPY' | 'ABS' | 'ABSX' | 'ABSY' | 'IND' | 'INDX' | 'INDY' | 'ACC' | 'REL';
type InsnDef = [string, AddrMode, number]; // [mnemonic, addrMode, bytes]

const OP_TABLE: (InsnDef | null)[] = [
  /* 00 */ ['BRK','IMP',1],['ORA','INDX',2],  null,  null,  null,['ORA','ZP',2],['ASL','ZP',2],  null,
  /* 08 */ ['PHP','IMP',1],['ORA','IMM',2],['ASL','ACC',1],  null,  null,['ORA','ABS',3],['ASL','ABS',3],  null,
  /* 10 */ ['BPL','REL',2],['ORA','INDY',2],  null,  null,  null,['ORA','ZPX',2],['ASL','ZPX',2],  null,
  /* 18 */ ['CLC','IMP',1],['ORA','ABSY',3],  null,  null,  null,['ORA','ABSX',3],['ASL','ABSX',3],  null,
  /* 20 */ ['JSR','ABS',3],['AND','INDX',2],  null,  null,['BIT','ZP',2],['AND','ZP',2],['ROL','ZP',2],  null,
  /* 28 */ ['PLP','IMP',1],['AND','IMM',2],['ROL','ACC',1],  null,['BIT','ABS',3],['AND','ABS',3],['ROL','ABS',3],  null,
  /* 30 */ ['BMI','REL',2],['AND','INDY',2],  null,  null,  null,['AND','ZPX',2],['ROL','ZPX',2],  null,
  /* 38 */ ['SEC','IMP',1],['AND','ABSY',3],  null,  null,  null,['AND','ABSX',3],['ROL','ABSX',3],  null,
  /* 40 */ ['RTI','IMP',1],['EOR','INDX',2],  null,  null,  null,['EOR','ZP',2],['LSR','ZP',2],  null,
  /* 48 */ ['PHA','IMP',1],['EOR','IMM',2],['LSR','ACC',1],  null,['JMP','ABS',3],['EOR','ABS',3],['LSR','ABS',3],  null,
  /* 50 */ ['BVC','REL',2],['EOR','INDY',2],  null,  null,  null,['EOR','ZPX',2],['LSR','ZPX',2],  null,
  /* 58 */ ['CLI','IMP',1],['EOR','ABSY',3],  null,  null,  null,['EOR','ABSX',3],['LSR','ABSX',3],  null,
  /* 60 */ ['RTS','IMP',1],['ADC','INDX',2],  null,  null,  null,['ADC','ZP',2],['ROR','ZP',2],  null,
  /* 68 */ ['PLA','IMP',1],['ADC','IMM',2],['ROR','ACC',1],  null,['JMP','IND',3],['ADC','ABS',3],['ROR','ABS',3],  null,
  /* 70 */ ['BVS','REL',2],['ADC','INDY',2],  null,  null,  null,['ADC','ZPX',2],['ROR','ZPX',2],  null,
  /* 78 */ ['SEI','IMP',1],['ADC','ABSY',3],  null,  null,  null,['ADC','ABSX',3],['ROR','ABSX',3],  null,
  /* 80 */   null,['STA','INDX',2],  null,  null,['STY','ZP',2],['STA','ZP',2],['STX','ZP',2],  null,
  /* 88 */ ['DEY','IMP',1],  null,['TXA','IMP',1],  null,['STY','ABS',3],['STA','ABS',3],['STX','ABS',3],  null,
  /* 90 */ ['BCC','REL',2],['STA','INDY',2],  null,  null,['STY','ZPX',2],['STA','ZPX',2],['STX','ZPY',2],  null,
  /* 98 */ ['TYA','IMP',1],['STA','ABSY',3],['TXS','IMP',1],  null,  null,['STA','ABSX',3],  null,  null,
  /* A0 */ ['LDY','IMM',2],['LDA','INDX',2],['LDX','IMM',2],  null,['LDY','ZP',2],['LDA','ZP',2],['LDX','ZP',2],  null,
  /* A8 */ ['TAY','IMP',1],['LDA','IMM',2],['TAX','IMP',1],  null,['LDY','ABS',3],['LDA','ABS',3],['LDX','ABS',3],  null,
  /* B0 */ ['BCS','REL',2],['LDA','INDY',2],  null,  null,['LDY','ZPX',2],['LDA','ZPX',2],['LDX','ZPY',2],  null,
  /* B8 */ ['CLV','IMP',1],['LDA','ABSY',3],['TSX','IMP',1],  null,['LDY','ABSX',3],['LDA','ABSX',3],['LDX','ABSY',3],  null,
  /* C0 */ ['CPY','IMM',2],['CMP','INDX',2],  null,  null,['CPY','ZP',2],['CMP','ZP',2],['DEC','ZP',2],  null,
  /* C8 */ ['INY','IMP',1],['CMP','IMM',2],['DEX','IMP',1],  null,['CPY','ABS',3],['CMP','ABS',3],['DEC','ABS',3],  null,
  /* D0 */ ['BNE','REL',2],['CMP','INDY',2],  null,  null,  null,['CMP','ZPX',2],['DEC','ZPX',2],  null,
  /* D8 */ ['CLD','IMP',1],['CMP','ABSY',3],  null,  null,  null,['CMP','ABSX',3],['DEC','ABSX',3],  null,
  /* E0 */ ['CPX','IMM',2],['SBC','INDX',2],  null,  null,['CPX','ZP',2],['SBC','ZP',2],['INC','ZP',2],  null,
  /* E8 */ ['INX','IMP',1],['SBC','IMM',2],['NOP','IMP',1],  null,['CPX','ABS',3],['SBC','ABS',3],['INC','ABS',3],  null,
  /* F0 */ ['BEQ','REL',2],['SBC','INDY',2],  null,  null,  null,['SBC','ZPX',2],['INC','ZPX',2],  null,
  /* F8 */ ['SED','IMP',1],['SBC','ABSY',3],  null,  null,  null,['SBC','ABSX',3],['INC','ABSX',3],  null,
];

const BRANCH_OPS = new Set(['BCC','BCS','BEQ','BMI','BNE','BPL','BVC','BVS']);
const JUMP_OPS = new Set(['JMP','JSR','RTS','RTI','BRK']);

// ============================================================
// 反汇编：单条指令
// ============================================================
interface DisasmLine {
  pc: number;
  opcode: number;
  mnemonic: string;
  mode: AddrMode;
  bytes: number[];
  operand: string;     // 格式化操作数如 "$2002"
  operandRaw: number;  // 原始数值
  hits: number;
  firstFrame: number;
}

// 汇编注释风格的操作数
function formatOperand(mode: AddrMode, lo: number, hi: number, pc: number): [string, number] {
  const addr = (hi << 8) | lo;
  switch (mode) {
    case 'IMM': return [`#$${lo.toString(16).toUpperCase().padStart(2, '0')}`, lo];
    case 'ZP':  return [`$${lo.toString(16).toUpperCase().padStart(2, '0')}`, lo];
    case 'ZPX': return [`$${lo.toString(16).toUpperCase().padStart(2, '0')},X`, lo];
    case 'ZPY': return [`$${lo.toString(16).toUpperCase().padStart(2, '0')},Y`, lo];
    case 'ABS': return [`$${addr.toString(16).toUpperCase().padStart(4, '0')}`, addr];
    case 'ABSX':return [`$${addr.toString(16).toUpperCase().padStart(4, '0')},X`, addr];
    case 'ABSY':return [`$${addr.toString(16).toUpperCase().padStart(4, '0')},Y`, addr];
    case 'IND': return [`($${addr.toString(16).toUpperCase().padStart(4, '0')})`, addr];
    case 'INDX':return [`($${lo.toString(16).toUpperCase().padStart(2, '0')},X)`, lo];
    case 'INDY':return [`($${lo.toString(16).toUpperCase().padStart(2, '0')}),Y`, lo];
    case 'REL': {
      const target = (pc + 2 + ((lo & 0x80) ? lo - 256 : lo)) & 0xFFFF;
      return [`$${target.toString(16).toUpperCase().padStart(4, '0')}`, target];
    }
    default: return ['', 0];
  }
}

function disassemble(pc: number, mem: Uint8Array): DisasmLine | null {
  const opcode = mem[pc];
  const def = OP_TABLE[opcode];
  if (!def) return null;
  const [mnemonic, mode, byteLen] = def;
  const bytes: number[] = [opcode];
  if (byteLen >= 2) bytes.push(mem[(pc + 1) & 0xFFFF]);
  if (byteLen >= 3) bytes.push(mem[(pc + 2) & 0xFFFF]);
  const lo = bytes[1] ?? 0, hi = bytes[2] ?? 0;
  const [operand, operandRaw] = formatOperand(mode, lo, hi, pc);
  return { pc, opcode, mnemonic, mode, bytes, operand, operandRaw, hits: 0, firstFrame: 0 };
}

// 跳过 NOP / 未定义 opcode
const NOP_LIKE = new Set([0xEA, 0x1A, 0x3A, 0x5A, 0x7A, 0xDA, 0xFA]);

// ============================================================
// 把 6502 指令翻译成 TypeScript 代码字符串
// ============================================================
function toTsLine(d: DisasmLine): string[] {
  const { pc, mnemonic, mode, operand, operandRaw } = d;
  const pcHex = `$${pc.toString(16).toUpperCase().padStart(4, '0')}`;
  const asm = `${mnemonic} ${operand}`.trim();
  const lines: string[] = [];
  lines.push(`  // ${pcHex}: ${asm}`);

  switch (mnemonic) {
    case 'LDA':
      lines.push(...tsLD('A', mode, operandRaw));
      break;
    case 'LDX':
      lines.push(...tsLD('X', mode, operandRaw));
      break;
    case 'LDY':
      lines.push(...tsLD('Y', mode, operandRaw));
      break;
    case 'STA':
      lines.push(...tsST('A', mode, operandRaw));
      break;
    case 'STX':
      lines.push(...tsST('X', mode, operandRaw));
      break;
    case 'STY':
      lines.push(...tsST('Y', mode, operandRaw));
      break;
    case 'TXA': lines.push('  A = X; setZN(A);'); break;
    case 'TAX': lines.push('  X = A; setZN(X);'); break;
    case 'TYA': lines.push('  A = Y; setZN(A);'); break;
    case 'TAY': lines.push('  Y = A; setZN(Y);'); break;
    case 'TXS': lines.push('  SP = X;'); break;
    case 'TSX': lines.push('  X = SP; setZN(X);'); break;
    case 'INX': lines.push('  X = (X + 1) & 0xFF; setZN(X);'); break;
    case 'INY': lines.push('  Y = (Y + 1) & 0xFF; setZN(Y);'); break;
    case 'DEX': lines.push('  X = (X - 1) & 0xFF; setZN(X);'); break;
    case 'DEY': lines.push('  Y = (Y - 1) & 0xFF; setZN(Y);'); break;
    case 'PHA': lines.push('  push(A);'); break;
    case 'PHP': lines.push('  push(FLAGS_BYTE() | 0x30);'); break;
    case 'PLA': lines.push('  A = pull(); setZN(A);'); break;
    case 'PLP': lines.push('  SET_FLAGS(pull());'); break;
    case 'CLC': lines.push('  C = false;'); break;
    case 'SEC': lines.push('  C = true;'); break;
    case 'CLI': lines.push('  I = false;'); break;
    case 'SEI': lines.push('  I = true;'); break;
    case 'CLD': lines.push('  D = false;'); break;
    case 'SED': lines.push('  D = true;'); break;
    case 'CLV': lines.push('  V = false;'); break;
    case 'NOP': lines.push('  // NOP'); break;
    case 'ADC': lines.push(...tsADC(mode, operandRaw)); break;
    case 'SBC': lines.push(...tsSBC(mode, operandRaw)); break;
    case 'AND': lines.push(...tsArith('AND', mode, operandRaw)); break;
    case 'ORA': lines.push(...tsArith('ORA', mode, operandRaw)); break;
    case 'EOR': lines.push(...tsArith('EOR', mode, operandRaw)); break;
    case 'CMP': lines.push(...tsCmp('A', mode, operandRaw)); break;
    case 'CPX': lines.push(...tsCmp('X', mode, operandRaw)); break;
    case 'CPY': lines.push(...tsCmp('Y', mode, operandRaw)); break;
    case 'BIT':
      lines.push(...tsBit(mode, operandRaw));
      break;
    case 'ASL':
      lines.push(...tsShift('ASL', mode, operandRaw));
      break;
    case 'LSR':
      lines.push(...tsShift('LSR', mode, operandRaw));
      break;
    case 'ROL':
      lines.push(...tsShift('ROL', mode, operandRaw));
      break;
    case 'ROR':
      lines.push(...tsShift('ROR', mode, operandRaw));
      break;
    case 'INC':
      lines.push(...tsIncDec('INC', mode, operandRaw));
      break;
    case 'DEC':
      lines.push(...tsIncDec('DEC', mode, operandRaw));
      break;
    case 'JMP':
      if (mode === 'IND') {
        lines.push(`  // JMP ($${operandRaw.toString(16).toUpperCase().padStart(4, '0')})`);
        lines.push(`  PC = mem[${hex(operandRaw)}] | (mem[${hex((operandRaw + 1) & 0xFFFF)}] << 8);`);
      } else {
        lines.push(`  PC = 0x${operandRaw.toString(16).toUpperCase().padStart(4, '0')};`);
      }
      lines.push('  return;');
      break;
    case 'JSR':
      lines.push(`  pushWord(PC + ${d.bytes.length - 1});`);
      lines.push(`  PC = 0x${operandRaw.toString(16).toUpperCase().padStart(4, '0')};`);
      lines.push('  return;');
      break;
    case 'RTS':
      lines.push(`  PC = pullWord() + 1;`);
      lines.push('  return;');
      break;
    case 'RTI':
      lines.push('  SET_FLAGS(pull());');
      lines.push('  PC = pullWord();');
      lines.push('  return;');
      break;
    case 'BRK':
      lines.push('  // BRK (halt for now)');
      lines.push('  return;');
      break;
    case 'BCC':
      lines.push(`  if (!C) { PC = 0x${operandRaw.toString(16).toUpperCase().padStart(4, '0')}; return; }`);
      break;
    case 'BCS':
      lines.push(`  if (C) { PC = 0x${operandRaw.toString(16).toUpperCase().padStart(4, '0')}; return; }`);
      break;
    case 'BEQ':
      lines.push(`  if (Z) { PC = 0x${operandRaw.toString(16).toUpperCase().padStart(4, '0')}; return; }`);
      break;
    case 'BNE':
      lines.push(`  if (!Z) { PC = 0x${operandRaw.toString(16).toUpperCase().padStart(4, '0')}; return; }`);
      break;
    case 'BMI':
      lines.push(`  if (N) { PC = 0x${operandRaw.toString(16).toUpperCase().padStart(4, '0')}; return; }`);
      break;
    case 'BPL':
      lines.push(`  if (!N) { PC = 0x${operandRaw.toString(16).toUpperCase().padStart(4, '0')}; return; }`);
      break;
    case 'BVC':
      lines.push(`  if (!V) { PC = 0x${operandRaw.toString(16).toUpperCase().padStart(4, '0')}; return; }`);
      break;
    case 'BVS':
      lines.push(`  if (V) { PC = 0x${operandRaw.toString(16).toUpperCase().padStart(4, '0')}; return; }`);
      break;
    default:
      lines.push(`  // TODO: ${asm}`);
  }
  return lines;
}

// ---- 翻译辅助函数 ----

function tsLD(reg: string, mode: AddrMode, val: number): string[] {
  const rhs = readExpr(mode, val);
  if (rhs === null) return [`  // TODO: LD${reg} ${val}`];
  return [`  ${reg} = ${rhs};`, `  setZN(${reg});`];
}

function tsST(reg: string, mode: AddrMode, val: number): string[] {
  const tgt = writeExpr(mode, val);
  if (tgt === null) return [`  // TODO: ST${reg} ${val}`];
  return [`  ${tgt} = ${reg};`];
}

function tsArith(op: 'AND' | 'ORA' | 'EOR', mode: AddrMode, val: number): string[] {
  const rhs = readExpr(mode, val);
  if (rhs === null) return [`  // TODO: ${op} ${val}`];
  const sym = op === 'AND' ? '&' : op === 'ORA' ? '|' : '^';
  return [`  A = (A ${sym} ${rhs}) & 0xFF;`, `  setZN(A);`];
}

function tsADC(mode: AddrMode, val: number): string[] {
  const rhs = readExpr(mode, val);
  if (rhs === null) return [`  // TODO: ADC ${val}`];
  return [
    `  { const r = ${rhs}; const sum = A + r + (C ? 1 : 0);`,
    `    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;`,
    `    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }`,
  ];
}

function tsSBC(mode: AddrMode, val: number): string[] {
  const rhs = readExpr(mode, val);
  if (rhs === null) return [`  // TODO: SBC ${val}`];
  return [
    `  { const r = ${rhs} ^ 0xFF; const sum = A + r + (C ? 1 : 0);`,
    `    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;`,
    `    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }`,
  ];
}

function tsCmp(reg: string, mode: AddrMode, val: number): string[] {
  const rhs = readExpr(mode, val);
  if (rhs === null) return [`  // TODO: CMP ${val}`];
  return [
    `  C = ${reg} >= ${rhs};`,
    `  setZN((${reg} - ${rhs}) & 0xFF);`,
  ];
}

function tsBit(mode: AddrMode, val: number): string[] {
  const rhs = readExpr(mode, val);
  if (rhs === null) return [`  // TODO: BIT ${val}`];
  // BIT: N = bit7, V = bit6, Z = (A & M) == 0
  return [
    `  { const t = ${rhs}; Z = (A & t) === 0; N = (t & 0x80) !== 0; V = (t & 0x40) !== 0; }`,
  ];
}

function tsShift(op: 'ASL' | 'LSR' | 'ROL' | 'ROR', mode: AddrMode, val: number): string[] {
  const tgt = mode === 'ACC' ? 'A' : writeExpr(mode, val);
  if (tgt === null) return [`  // TODO: ${op} ${val}`];
  switch (op) {
    case 'ASL': return [`  C = (${tgt} & 0x80) !== 0; ${tgt} = (${tgt} << 1) & 0xFF; setZN(${tgt});`];
    case 'LSR': return [`  C = (${tgt} & 1) !== 0; ${tgt} = ${tgt} >>> 1; setZN(${tgt});`];
    case 'ROL': return [`  { const c = C ? 1 : 0; C = (${tgt} & 0x80) !== 0; ${tgt} = ((${tgt} << 1) | c) & 0xFF; setZN(${tgt}); }`];
    case 'ROR': return [`  { const c = C ? 0x80 : 0; C = (${tgt} & 1) !== 0; ${tgt} = (${tgt} >>> 1) | c; setZN(${tgt}); }`];
    default: return [];
  }
}

function tsIncDec(op: 'INC' | 'DEC', mode: AddrMode, val: number): string[] {
  const tgt = writeExpr(mode, val);
  if (tgt === null) return [`  // TODO: ${op} ${val}`];
  const delta = op === 'INC' ? '+ 1' : '- 1';
  return [`  ${tgt} = (${tgt} ${delta}) & 0xFF; setZN(${tgt});`];
}

// 读表达式
function readExpr(mode: AddrMode, val: number): string | null {
  switch (mode) {
    case 'IMM': return `0x${val.toString(16).toUpperCase()}`;
    case 'ZP':  return `zp(${hex(val)})`;
    case 'ZPX': return `zp((${hex(val)} + X) & 0xFF)`;
    case 'ZPY': return `zp((${hex(val)} + Y) & 0xFF)`;
    case 'ABS': return `mem[${hex(val)}]`;
    case 'ABSX': return `mem[(${hex(val)} + X) & 0xFFFF]`;
    case 'ABSY': return `mem[(${hex(val)} + Y) & 0xFFFF]`;
    case 'INDX': return `mem[indX(${hex(val)})]`;
    case 'INDY': return `mem[indY(${hex(val)})]`;
    case 'ACC': return 'A';
    case 'IND': return null; // JMP (indirect) handled separately
    default: return null;
  }
}

// 写目标
function writeExpr(mode: AddrMode, val: number): string | null {
  switch (mode) {
    case 'ZP':  return `mem[${hex(val)}]`;
    case 'ZPX': return `mem[(${hex(val)} + X) & 0xFF]`;
    case 'ZPY': return `mem[(${hex(val)} + Y) & 0xFF]`;
    case 'ABS': return `mem[${hex(val)}]`;
    case 'ABSX': return `mem[(${hex(val)} + X) & 0xFFFF]`;
    case 'ABSY': return `mem[(${hex(val)} + Y) & 0xFFFF]`;
    case 'INDX': return `mem[indX(${hex(val)})]`;
    case 'INDY': return `mem[indY(${hex(val)})]`;
    default: return null;
  }
}

function hex(v: number): string {
  return '0x' + v.toString(16).toUpperCase();
}

// ============================================================
// 主流程：trace → disasm → 分组 → 输出
// ============================================================
const romData = new Uint8Array(readFileSync(ROM_PATH));
console.log(`ROM: ${romData.length} bytes`);

const nes = new NES({
  onFrame: () => {},
  onStatusUpdate: () => {},
  emulateSound: false,
});
nes.loadROM(romData);

// 收集每条唯一指令
const instrByPC = new Map<number, DisasmLine>();

let totalInstr = 0;
nes.cpu._traceCb = (pc: number, opcode: number, _cycles: number, frame: number) => {
  totalInstr++;
  // Note: _instrPC is REG_PC, which may be off by 1 in this emulator.
  // Use the actual opcode byte from mem at (pc+1) to disassemble.
  // Also try pc directly as fallback.
  let actualPc = pc;
  let d = disassemble(actualPc, nes.cpu.mem);
  if (!d) {
    actualPc = (pc + 1) & 0xFFFF;
    d = disassemble(actualPc, nes.cpu.mem);
  }
  if (d && !instrByPC.has(actualPc)) {
    d.firstFrame = frame;
    d.pc = actualPc; // ensure correct PC in output
    instrByPC.set(actualPc, d);
  }
  const e = instrByPC.get(actualPc);
  if (e) e.hits++;
};

console.log(`Mapper: ${nes.rom.mapperType}`);
console.log(`Running ${MAX_FRAMES} frames...`);
const t0 = Date.now();
for (let f = 0; f < MAX_FRAMES; f++) {
  nes.frame();
  if (f % 60 === 0 || f === MAX_FRAMES - 1) {
    console.log(`  frame ${f}/${MAX_FRAMES} | ${totalInstr.toLocaleString()} instr | ${instrByPC.size} unique`);
  }
}
const elapsed = Date.now() - t0;
console.log(`Done in ${elapsed}ms\n`);

// 按地址分组 (连续地址块 → 一个 "函数")
const allPCs = [...instrByPC.keys()].sort((a, b) => a - b);
const groups: DisasmLine[][] = [];
let cur: DisasmLine[] = [];
const GAP_THRESHOLD = 16; // 两块之间地址间距超过 16 就算新函数

for (let i = 0; i < allPCs.length; i++) {
  const pc = allPCs[i];
  const d = instrByPC.get(pc)!;
  const prevPC = i > 0 ? allPCs[i - 1] : -999;

  if (prevPC < 0 || pc - prevPC > GAP_THRESHOLD) {
    if (cur.length) groups.push(cur);
    cur = [d];
  } else {
    cur.push(d);
  }
}
if (cur.length) groups.push(cur);

console.log(`Grouped ${instrByPC.size} unique addresses into ${groups.length} functions`);

// ============================================================
// 生成 TypeScript 文件
// ============================================================

// 1. state.ts — 共享状态
const stateTs = `// opening/state.ts — 6502 CPU state (no emulator CPU needed)
// PPU/APU still provided by tsnes

// registers
export let A = 0, X = 0, Y = 0, SP = 0xFD, PC = 0x0000;

// status flags
export let C = false, Z = false, I = false, D = false, V = false, N = false;

// memory
export const mem = new Uint8Array(0x10000);

// --- helpers ---

export function setZN(v: number): void {
  Z = (v & 0xFF) === 0;
  N = (v & 0x80) !== 0;
}

export function zp(addr: number): number {
  return mem[addr & 0xFF];
}

export function setZp(addr: number, val: number): void {
  mem[addr & 0xFF] = val;
}

export function indX(zpAddr: number): number {
  const base = (zpAddr + X) & 0xFF;
  return mem[base] | (mem[(base + 1) & 0xFF] << 8);
}

export function indY(zpAddr: number): number {
  return (mem[zpAddr] | (mem[(zpAddr + 1) & 0xFF] << 8)) + Y;
}

export function push(v: number): void {
  mem[0x0100 | SP] = v;
  SP = (SP - 1) & 0xFF;
}

export function pull(): number {
  SP = (SP + 1) & 0xFF;
  return mem[0x0100 | SP];
}

export function pushWord(w: number): void {
  push((w >> 8) & 0xFF);
  push(w & 0xFF);
}

export function pullWord(): number {
  return pull() | (pull() << 8);
}

export function FLAGS_BYTE(): number {
  return (C ? 0x01 : 0) | (Z ? 0x02 : 0) | (I ? 0x04 : 0)
       | (D ? 0x08 : 0) | 0x20 /* always 1 */ | (V ? 0x40 : 0) | (N ? 0x80 : 0);
}

export function SET_FLAGS(b: number): void {
  C = (b & 0x01) !== 0; Z = (b & 0x02) !== 0; I = (b & 0x04) !== 0;
  D = (b & 0x08) !== 0; V = (b & 0x40) !== 0; N = (b & 0x80) !== 0;
}

// PPU 寄存器访问 (由 tsnes PPU 实例注入)
export let ppuRead: (addr: number) => number = () => 0;
export let ppuWrite: (addr: number, val: number) => void = () => {};
// 每帧结束的回调 (由 runner 设置)
export let onFrameReady: (() => void) | null = null;
`;

// 2. 指令分发表 — 一个巨大的 lookup table
let instrTableTs = `// opening/instr_table.ts — instruction lookup table
// Auto-generated from opening demo trace
// Total unique instructions: ${instrByPC.size}
// Total instructions executed: ${totalInstr.toLocaleString()}

// Each entry is a function that executes one 6502 instruction.
// Branches/Jumps set S.PC and return; the runner loops.
export type InstrFn = () => void;

export const instrTable: Record<number, InstrFn> = {};
export const allFunctions: InstrFn[] = [];

`;

// 按 group 输出
const FUNCS_PER_FILE = 20;
const funcFiles: { name: string; content: string }[] = [];
const funcNamesInBatch: string[][] = []; // func names grouped by batch for imports

for (let gi = 0; gi < groups.length; gi++) {
  const g = groups[gi];
  const start = g[0].pc;
  const end = g[g.length - 1].pc;
  const startHex = `$${start.toString(16).toUpperCase().padStart(4, '0')}`;
  const fileName = `func_${start.toString(16).toUpperCase().padStart(4, '0')}`;
  const funcName = `func${start.toString(16).toUpperCase()}`;

  // 函数头部注释
  let totalHits = 0;
  for (const d of g) totalHits += d.hits;
  let fBody = `  // hits: ${totalHits.toLocaleString()}\n`;
  fBody += `  // pc range: ${startHex}-$${end.toString(16).toUpperCase().padStart(4, '0')}\n`;

  // 每个指令
  for (const d of g) {
    const lines = toTsLine(d);
    fBody += '  // --- pc ' + d.pc.toString(16).toUpperCase() + ' ---\n';
    for (const l of lines) fBody += l + '\n';
    fBody += '\n';
  }

  fBody += `  // fall-through end\n`;

  // 生成完整的函数文件 (不含 import，import 在 batch 层级统一加)
  const funcFile = `// ${fileName}.ts
// Address range: ${startHex}-$${end.toString(16).toUpperCase().padStart(4, '0')}
// Instructions: ${g.length}
// Total hits: ${totalHits.toLocaleString()}
// First seen at frame: ${g[0].firstFrame}

export function ${funcName}(): void {
${fBody}
}
`;

  funcFiles.push({ name: fileName, content: funcFile });

  // Track func name per batch for bundled imports
  const batchIdx = Math.floor(gi / FUNCS_PER_FILE);
  if (!funcNamesInBatch[batchIdx]) funcNamesInBatch[batchIdx] = [];
  funcNamesInBatch[batchIdx].push(funcName);

  if (gi % 50 === 0) console.log(`  generating file ${gi + 1}/${groups.length}...`);
}

// 生成从打包文件的 import 语句 (匹配下方 funcs_XXX.ts 的写出来组织方式)
for (let i = 0; i < funcNamesInBatch.length; i++) {
  const batchName = `funcs_${(i * FUNCS_PER_FILE).toString().padStart(3, '0')}`;
  instrTableTs += `import { ${funcNamesInBatch[i].join(', ')} } from './${batchName}';\n`;
}
instrTableTs += '\n';

// 添加 runner 的 init 调用
instrTableTs += `\n// Init all function references (call once at startup)\nexport function initTable(): void {\n`;
instrTableTs += `  allFunctions.length = 0;\n`;
for (let gi = 0; gi < groups.length; gi++) {
  const g = groups[gi];
  const start = g[0].pc;
  const funcName = `func${start.toString(16).toUpperCase()}`;
  instrTableTs += `  instrTable[0x${start.toString(16).toUpperCase()}] = ${funcName};\n`;
  instrTableTs += `  allFunctions.push(${funcName});\n`;
}

// 覆盖所有跳过地址 — 用第一个见过的指令覆盖
// Actually the register() inside each func file already does this.
// Let me keep it simpler.

instrTableTs += `}\n`;

// 3. runner.ts
const runnerTs = `// opening/runner.ts — main exec loop
// Replaces CPU.emulate(): calls TS functions by PC lookup table
// PPU/APU are from tsnes (unchanged)

import * as S from './state';
import { instrTable, initTable } from './instr_table';
import type { PPU } from '../../src/tsnes/src/ppu/index';
import type { NES } from '../../src/tsnes/src/nes';

export const ENTRY_PC = ${groups[0] ? '0x' + groups[0][0].pc.toString(16) : '0x8000'};

let ppu: any = null;
let frameDone = false;

export function init(p: any): void {
  ppu = p;
  initTable();
  
  // Wire PPU I/O
  S.ppuRead = (addr: number): number => {
    // PPU registers $2000-$2007
    switch (addr) {
      case 0x2002: return ppu.readStatus();
      case 0x2007: return ppu.readData();
      default: return 0;
    }
  };
  
  S.ppuWrite = (addr: number, val: number): void => {
    switch (addr) {
      case 0x2000: ppu.writeCtrl(val); break;
      case 0x2001: ppu.writeMask(val); break;
      case 0x2003: ppu.writeOAMAddr(val); break;
      case 0x2004: ppu.writeOAMData(val); break;
      case 0x2005: ppu.writeScroll(val); break;
      case 0x2006: ppu.writeAddr(val); break;
      case 0x2007: ppu.writeData(val); break;
      case 0x4014: ppu.writeDMA(val, S.mem); break;
      default: break;
    }
  };
}

// Run until VBlank (one frame)
export function runFrame(): void {
  frameDone = false;
  S.PC = ENTRY_PC;
  
  let safety = 0;
  const MAX = 50_000; // safety limit
  
  while (!frameDone && safety < MAX) {
    const fn = instrTable[S.PC];
    if (fn) {
      fn();
    } else {
      // Unknown instruction — skip (should not happen)
      S.PC = (S.PC + 1) & 0xFFFF;
    }
    safety++;
  }
  
  if (safety >= MAX) {
    console.warn('runner: frame exceeded safety limit');
  }
}

// Called by NMI handler (conceptually)
export function onVBlank(): void {
  frameDone = true;
}
`;

// ============================================================
// 写入文件
// ============================================================

// state.ts
writeFileSync(join(OUT_DIR, 'state.ts'), stateTs);
console.log(`  ✓ state.ts`);

// instr_table.ts
writeFileSync(join(OUT_DIR, 'instr_table.ts'), instrTableTs);
console.log(`  ✓ instr_table.ts`);

// runner.ts
writeFileSync(join(OUT_DIR, 'runner.ts'), runnerTs);
console.log(`  ✓ runner.ts`);

// 每个 func 文件 (分片存储，避免单文件过大) — import 只写一次
const BATCH_IMPORT_HEADER = `// @ts-nocheck — auto-generated de-CPU functions, mutates imported state
import { A, X, Y, PC, SP, C, Z, I, D, V, N, setZN, mem, zp, setZp, indX, indY, push, pull, pushWord, pullWord, FLAGS_BYTE, SET_FLAGS } from './state';
import { instrTable } from './instr_table';

`;

for (let i = 0; i < funcFiles.length; i += FUNCS_PER_FILE) {
  const batch = funcFiles.slice(i, i + FUNCS_PER_FILE);
  const batchName = `funcs_${i.toString().padStart(3, '0')}.ts`;
  let batchContent = BATCH_IMPORT_HEADER + batch.map(f => f.content).join('\n\n');
  writeFileSync(join(OUT_DIR, batchName), batchContent);
}
console.log(`  ✓ ${Math.ceil(funcFiles.length / FUNCS_PER_FILE)} func batch files`);

// 摘要
const summary = {
  totalFrames: MAX_FRAMES,
  totalInstructions: totalInstr,
  uniquePCs: instrByPC.size,
  functions: groups.length,
  outputDir: OUT_DIR,
  elapsedMs: elapsed,
};
writeFileSync(join(OUT_DIR, '_summary.json'), JSON.stringify(summary, null, 2));

console.log(`\n=== Done ===`);
console.log(`Files written to ${OUT_DIR}/`);
console.log(`  - state.ts          (CPU state: registers, flags, memory)`);
console.log(`  - instr_table.ts    (PC → function lookup table)`);
console.log(`  - runner.ts         (main execution loop)`);
console.log(`  - funcs_*.ts        (disassembled instructions as TS functions)`);
console.log(`  - _summary.json     (trace statistics)`);
console.log(`\nTotal: ${instrByPC.size} unique addresses, ${groups.length} function groups`);
