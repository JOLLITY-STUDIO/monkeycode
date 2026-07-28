/**
 * 簡易 6502 反匯編器
 * 讀取 prg_bank_* 中的 hex CODE 區塊，輸出可讀的 opcode 列表
 *
 * 用法: npx ts-node tools/disasm_hex_blocks.ts bank01
 */

import * as fs from 'fs';
import * as path from 'path';

// ── 定址模式與 mnemonics ──

const ADDR_IMPL = 0;   // implied (no operand)
const ADDR_IMM = 1;    // #$xx
const ADDR_ZP = 2;     // $xx (零页)
const ADDR_ZPX = 3;    // $xx,X
const ADDR_ZPY = 4;    // $xx,Y
const ADDR_REL = 5;    // $xx (PC 相對)
const ADDR_ABS = 6;    // $xxxx
const ADDR_ABSX = 7;   // $xxxx,X
const ADDR_ABSY = 8;   // $xxxx,Y
const ADDR_IND = 9;    // ($xxxx)
const ADDR_INDX = 10;  // ($xx,X)
const ADDR_INDY = 11;  // ($xx),Y
const ADDR_ACC = 12;   // A (accumulator)

interface OpDef { mnemonic: string; mode: number; size: number; }

// 完整 6502 opcode 表
const OPCODE_MAP: Record<number, OpDef> = {
  // LDA
  0xA9: { mnemonic: 'LDA', mode: ADDR_IMM, size: 2 },
  0xA5: { mnemonic: 'LDA', mode: ADDR_ZP,  size: 2 },
  0xB5: { mnemonic: 'LDA', mode: ADDR_ZPX, size: 2 },
  0xAD: { mnemonic: 'LDA', mode: ADDR_ABS, size: 3 },
  0xBD: { mnemonic: 'LDA', mode: ADDR_ABSX,size: 3 },
  0xB9: { mnemonic: 'LDA', mode: ADDR_ABSY,size: 3 },
  0xA1: { mnemonic: 'LDA', mode: ADDR_INDX,size: 2 },
  0xB1: { mnemonic: 'LDA', mode: ADDR_INDY,size: 2 },
  // LDX
  0xA2: { mnemonic: 'LDX', mode: ADDR_IMM, size: 2 },
  0xA6: { mnemonic: 'LDX', mode: ADDR_ZP,  size: 2 },
  0xB6: { mnemonic: 'LDX', mode: ADDR_ZPY, size: 2 },
  0xAE: { mnemonic: 'LDX', mode: ADDR_ABS, size: 3 },
  0xBE: { mnemonic: 'LDX', mode: ADDR_ABSY,size: 3 },
  // LDY
  0xA0: { mnemonic: 'LDY', mode: ADDR_IMM, size: 2 },
  0xA4: { mnemonic: 'LDY', mode: ADDR_ZP,  size: 2 },
  0xB4: { mnemonic: 'LDY', mode: ADDR_ZPX, size: 2 },
  0xAC: { mnemonic: 'LDY', mode: ADDR_ABS, size: 3 },
  0xBC: { mnemonic: 'LDY', mode: ADDR_ABSX,size: 3 },
  // STA
  0x85: { mnemonic: 'STA', mode: ADDR_ZP,  size: 2 },
  0x95: { mnemonic: 'STA', mode: ADDR_ZPX, size: 2 },
  0x8D: { mnemonic: 'STA', mode: ADDR_ABS, size: 3 },
  0x9D: { mnemonic: 'STA', mode: ADDR_ABSX,size: 3 },
  0x99: { mnemonic: 'STA', mode: ADDR_ABSY,size: 3 },
  0x81: { mnemonic: 'STA', mode: ADDR_INDX,size: 2 },
  0x91: { mnemonic: 'STA', mode: ADDR_INDY,size: 2 },
  // STX
  0x86: { mnemonic: 'STX', mode: ADDR_ZP,  size: 2 },
  0x96: { mnemonic: 'STX', mode: ADDR_ZPY, size: 2 },
  0x8E: { mnemonic: 'STX', mode: ADDR_ABS, size: 3 },
  // STY
  0x84: { mnemonic: 'STY', mode: ADDR_ZP,  size: 2 },
  0x94: { mnemonic: 'STY', mode: ADDR_ZPX, size: 2 },
  0x8C: { mnemonic: 'STY', mode: ADDR_ABS, size: 3 },
  // Transfer
  0xAA: { mnemonic: 'TAX', mode: ADDR_IMPL,size: 1 },
  0xA8: { mnemonic: 'TAY', mode: ADDR_IMPL,size: 1 },
  0x8A: { mnemonic: 'TXA', mode: ADDR_IMPL,size: 1 },
  0x98: { mnemonic: 'TYA', mode: ADDR_IMPL,size: 1 },
  0xBA: { mnemonic: 'TSX', mode: ADDR_IMPL,size: 1 },
  0x9A: { mnemonic: 'TXS', mode: ADDR_IMPL,size: 1 },
  // Stack
  0x48: { mnemonic: 'PHA', mode: ADDR_IMPL,size: 1 },
  0x08: { mnemonic: 'PHP', mode: ADDR_IMPL,size: 1 },
  0x68: { mnemonic: 'PLA', mode: ADDR_IMPL,size: 1 },
  0x28: { mnemonic: 'PLP', mode: ADDR_IMPL,size: 1 },
  // Jumps
  0x4C: { mnemonic: 'JMP', mode: ADDR_ABS, size: 3 },
  0x6C: { mnemonic: 'JMP', mode: ADDR_IND, size: 3 },
  0x20: { mnemonic: 'JSR', mode: ADDR_ABS, size: 3 },
  0x60: { mnemonic: 'RTS', mode: ADDR_IMPL,size: 1 },
  0x40: { mnemonic: 'RTI', mode: ADDR_IMPL,size: 1 },
  // Branches
  0x90: { mnemonic: 'BCC', mode: ADDR_REL, size: 2 },
  0xB0: { mnemonic: 'BCS', mode: ADDR_REL, size: 2 },
  0xF0: { mnemonic: 'BEQ', mode: ADDR_REL, size: 2 },
  0x30: { mnemonic: 'BMI', mode: ADDR_REL, size: 2 },
  0xD0: { mnemonic: 'BNE', mode: ADDR_REL, size: 2 },
  0x10: { mnemonic: 'BPL', mode: ADDR_REL, size: 2 },
  0x50: { mnemonic: 'BVC', mode: ADDR_REL, size: 2 },
  0x70: { mnemonic: 'BVS', mode: ADDR_REL, size: 2 },
  // Flag ops
  0x18: { mnemonic: 'CLC', mode: ADDR_IMPL,size: 1 },
  0x38: { mnemonic: 'SEC', mode: ADDR_IMPL,size: 1 },
  0x58: { mnemonic: 'CLI', mode: ADDR_IMPL,size: 1 },
  0x78: { mnemonic: 'SEI', mode: ADDR_IMPL,size: 1 },
  0xD8: { mnemonic: 'CLD', mode: ADDR_IMPL,size: 1 },
  0xF8: { mnemonic: 'SED', mode: ADDR_IMPL,size: 1 },
  0xB8: { mnemonic: 'CLV', mode: ADDR_IMPL,size: 1 },
  // Arithmetic
  0x69: { mnemonic: 'ADC', mode: ADDR_IMM, size: 2 },
  0x65: { mnemonic: 'ADC', mode: ADDR_ZP,  size: 2 },
  0x75: { mnemonic: 'ADC', mode: ADDR_ZPX, size: 2 },
  0x6D: { mnemonic: 'ADC', mode: ADDR_ABS, size: 3 },
  0x7D: { mnemonic: 'ADC', mode: ADDR_ABSX,size: 3 },
  0x79: { mnemonic: 'ADC', mode: ADDR_ABSY,size: 3 },
  0x61: { mnemonic: 'ADC', mode: ADDR_INDX,size: 2 },
  0x71: { mnemonic: 'ADC', mode: ADDR_INDY,size: 2 },
  0xE9: { mnemonic: 'SBC', mode: ADDR_IMM, size: 2 },
  0xE5: { mnemonic: 'SBC', mode: ADDR_ZP,  size: 2 },
  0xF5: { mnemonic: 'SBC', mode: ADDR_ZPX, size: 2 },
  0xED: { mnemonic: 'SBC', mode: ADDR_ABS, size: 3 },
  0xFD: { mnemonic: 'SBC', mode: ADDR_ABSX,size: 3 },
  0xF9: { mnemonic: 'SBC', mode: ADDR_ABSY,size: 3 },
  0xE1: { mnemonic: 'SBC', mode: ADDR_INDX,size: 2 },
  0xF1: { mnemonic: 'SBC', mode: ADDR_INDY,size: 2 },
  // CMP
  0xC9: { mnemonic: 'CMP', mode: ADDR_IMM, size: 2 },
  0xC5: { mnemonic: 'CMP', mode: ADDR_ZP,  size: 2 },
  0xD5: { mnemonic: 'CMP', mode: ADDR_ZPX, size: 2 },
  0xCD: { mnemonic: 'CMP', mode: ADDR_ABS, size: 3 },
  0xDD: { mnemonic: 'CMP', mode: ADDR_ABSX,size: 3 },
  0xD9: { mnemonic: 'CMP', mode: ADDR_ABSY,size: 3 },
  0xC1: { mnemonic: 'CMP', mode: ADDR_INDX,size: 2 },
  0xD1: { mnemonic: 'CMP', mode: ADDR_INDY,size: 2 },
  // CPX
  0xE0: { mnemonic: 'CPX', mode: ADDR_IMM, size: 2 },
  0xE4: { mnemonic: 'CPX', mode: ADDR_ZP,  size: 2 },
  0xEC: { mnemonic: 'CPX', mode: ADDR_ABS, size: 3 },
  // CPY
  0xC0: { mnemonic: 'CPY', mode: ADDR_IMM, size: 2 },
  0xC4: { mnemonic: 'CPY', mode: ADDR_ZP,  size: 2 },
  0xCC: { mnemonic: 'CPY', mode: ADDR_ABS, size: 3 },
  // Logical
  0x29: { mnemonic: 'AND', mode: ADDR_IMM, size: 2 },
  0x25: { mnemonic: 'AND', mode: ADDR_ZP,  size: 2 },
  0x35: { mnemonic: 'AND', mode: ADDR_ZPX, size: 2 },
  0x2D: { mnemonic: 'AND', mode: ADDR_ABS, size: 3 },
  0x3D: { mnemonic: 'AND', mode: ADDR_ABSX,size: 3 },
  0x39: { mnemonic: 'AND', mode: ADDR_ABSY,size: 3 },
  0x21: { mnemonic: 'AND', mode: ADDR_INDX,size: 2 },
  0x31: { mnemonic: 'AND', mode: ADDR_INDY,size: 2 },
  0x49: { mnemonic: 'EOR', mode: ADDR_IMM, size: 2 },
  0x45: { mnemonic: 'EOR', mode: ADDR_ZP,  size: 2 },
  0x55: { mnemonic: 'EOR', mode: ADDR_ZPX, size: 2 },
  0x4D: { mnemonic: 'EOR', mode: ADDR_ABS, size: 3 },
  0x5D: { mnemonic: 'EOR', mode: ADDR_ABSX,size: 3 },
  0x59: { mnemonic: 'EOR', mode: ADDR_ABSY,size: 3 },
  0x41: { mnemonic: 'EOR', mode: ADDR_INDX,size: 2 },
  0x51: { mnemonic: 'EOR', mode: ADDR_INDY,size: 2 },
  0x09: { mnemonic: 'ORA', mode: ADDR_IMM, size: 2 },
  0x05: { mnemonic: 'ORA', mode: ADDR_ZP,  size: 2 },
  0x15: { mnemonic: 'ORA', mode: ADDR_ZPX, size: 2 },
  0x0D: { mnemonic: 'ORA', mode: ADDR_ABS, size: 3 },
  0x1D: { mnemonic: 'ORA', mode: ADDR_ABSX,size: 3 },
  0x19: { mnemonic: 'ORA', mode: ADDR_ABSY,size: 3 },
  0x01: { mnemonic: 'ORA', mode: ADDR_INDX,size: 2 },
  0x11: { mnemonic: 'ORA', mode: ADDR_INDY,size: 2 },
  // BIT
  0x24: { mnemonic: 'BIT', mode: ADDR_ZP,  size: 2 },
  0x2C: { mnemonic: 'BIT', mode: ADDR_ABS, size: 3 },
  // Shifts
  0x0A: { mnemonic: 'ASL', mode: ADDR_ACC, size: 1 },
  0x06: { mnemonic: 'ASL', mode: ADDR_ZP,  size: 2 },
  0x16: { mnemonic: 'ASL', mode: ADDR_ZPX, size: 2 },
  0x0E: { mnemonic: 'ASL', mode: ADDR_ABS, size: 3 },
  0x1E: { mnemonic: 'ASL', mode: ADDR_ABSX,size: 3 },
  0x4A: { mnemonic: 'LSR', mode: ADDR_ACC, size: 1 },
  0x46: { mnemonic: 'LSR', mode: ADDR_ZP,  size: 2 },
  0x56: { mnemonic: 'LSR', mode: ADDR_ZPX, size: 2 },
  0x4E: { mnemonic: 'LSR', mode: ADDR_ABS, size: 3 },
  0x5E: { mnemonic: 'LSR', mode: ADDR_ABSX,size: 3 },
  0x2A: { mnemonic: 'ROL', mode: ADDR_ACC, size: 1 },
  0x26: { mnemonic: 'ROL', mode: ADDR_ZP,  size: 2 },
  0x36: { mnemonic: 'ROL', mode: ADDR_ZPX, size: 2 },
  0x2E: { mnemonic: 'ROL', mode: ADDR_ABS, size: 3 },
  0x3E: { mnemonic: 'ROL', mode: ADDR_ABSX,size: 3 },
  0x6A: { mnemonic: 'ROR', mode: ADDR_ACC, size: 1 },
  0x66: { mnemonic: 'ROR', mode: ADDR_ZP,  size: 2 },
  0x76: { mnemonic: 'ROR', mode: ADDR_ZPX, size: 2 },
  0x6E: { mnemonic: 'ROR', mode: ADDR_ABS, size: 3 },
  0x7E: { mnemonic: 'ROR', mode: ADDR_ABSX,size: 3 },
  // INC/DEC
  0xE6: { mnemonic: 'INC', mode: ADDR_ZP,  size: 2 },
  0xF6: { mnemonic: 'INC', mode: ADDR_ZPX, size: 2 },
  0xEE: { mnemonic: 'INC', mode: ADDR_ABS, size: 3 },
  0xFE: { mnemonic: 'INC', mode: ADDR_ABSX,size: 3 },
  0xC6: { mnemonic: 'DEC', mode: ADDR_ZP,  size: 2 },
  0xD6: { mnemonic: 'DEC', mode: ADDR_ZPX, size: 2 },
  0xCE: { mnemonic: 'DEC', mode: ADDR_ABS, size: 3 },
  0xDE: { mnemonic: 'DEC', mode: ADDR_ABSX,size: 3 },
  // INX/DEX...
  0xE8: { mnemonic: 'INX', mode: ADDR_IMPL,size: 1 },
  0xC8: { mnemonic: 'INY', mode: ADDR_IMPL,size: 1 },
  0xCA: { mnemonic: 'DEX', mode: ADDR_IMPL,size: 1 },
  0x88: { mnemonic: 'DEY', mode: ADDR_IMPL,size: 1 },
  // NOP
  0xEA: { mnemonic: 'NOP', mode: ADDR_IMPL,size: 1 },
  // BRK
  0x00: { mnemonic: 'BRK', mode: ADDR_IMPL,size: 1 },
};

function fmtOperand(mode: number, b1: number, b2: number): string {
  const lo = b1 & 0xFF;
  const hi = b2 & 0xFF;
  const abs = (hi << 8) | lo;
  switch (mode) {
    case ADDR_IMPL: return '';
    case ADDR_IMM: return `#$${lo.toString(16).padStart(2,'0')}`;
    case ADDR_ZP: return `$${lo.toString(16).padStart(2,'0')}`;
    case ADDR_ZPX: return `$${lo.toString(16).padStart(2,'0')},X`;
    case ADDR_ZPY: return `$${lo.toString(16).padStart(2,'0')},Y`;
    case ADDR_ABS: return `$${abs.toString(16).padStart(4,'0')}`;
    case ADDR_ABSX: return `$${abs.toString(16).padStart(4,'0')},X`;
    case ADDR_ABSY: return `$${abs.toString(16).padStart(4,'0')},Y`;
    case ADDR_IND: return `($${abs.toString(16).padStart(4,'0')})`;
    case ADDR_INDX: return `($${lo.toString(16).padStart(2,'0')},X)`;
    case ADDR_INDY: return `($${lo.toString(16).padStart(2,'0')}),Y`;
    case ADDR_REL: {
      const offset = (lo & 0x80) ? lo - 256 : lo;
      return `$${offset >= 0 ? '+' : ''}${offset}`;
    }
    case ADDR_ACC: return 'A';
    default: return `?$${lo.toString(16)}`;
  }
}

function disasmBytes(bytes: number[], baseAddr: number): string[] {
  const lines: string[] = [];
  let addr = baseAddr;
  let i = 0;
  while (i < bytes.length) {
    const op = bytes[i];
    const def = OPCODE_MAP[op];
    if (!def) {
      lines.push(`$${addr.toString(16).padStart(4,'0')}:  .byte $${op.toString(16).padStart(2,'0')}  ; UNKNOWN`);
      addr++;
      i++;
      continue;
    }
    const b1 = (def.size > 1) ? bytes[i + 1] ?? 0 : 0;
    const b2 = (def.size > 2) ? bytes[i + 2] ?? 0 : 0;
    const operand = fmtOperand(def.mode, b1, b2);

    // 计算分支目標地址
    let branchHint = '';
    if (def.mode === ADDR_REL) {
      const target = (addr + def.size + ((b1 & 0x80) ? b1 - 256 : b1)) & 0xFFFF;
      branchHint = ` ; → $${target.toString(16).padStart(4,'0')}`;
    }

    const hexPart = bytes.slice(i, i + def.size)
      .map(b => b.toString(16).padStart(2,'0')).join(' ');
    lines.push(`$${addr.toString(16).padStart(4,'0')}  ${hexPart.padEnd(9)} ${def.mnemonic} ${operand}${branchHint}`.trimEnd());
    i += def.size;
    addr += def.size;
  }
  return lines;
}

// ── 主程式 ──
function main() {
  const bankId = process.argv[2] || '01';
  const srcPath = path.resolve(__dirname, '..', 'tsubasa-hex2asm', 'prg_banks', `prg_bank_${bankId.padStart(2, '0')}_match_jump.ts`);
  if (!fs.existsSync(srcPath)) {
    console.error(`File not found: ${srcPath}`);
    console.log('Try: npx ts-node tools/disasm_hex_blocks.ts 02 (for bank02)');
    process.exit(1);
  }

  const content = fs.readFileSync(srcPath, 'utf-8');
  const outPath = path.resolve(__dirname, '..', `disasm_bank${bankId.padStart(2, '0')}.txt`);
  const outStream = fs.createWriteStream(outPath, { encoding: 'utf-8' });

  outStream.write(`; ============================================\n`);
  outStream.write(`; Disassembly: PRG Bank ${bankId}\n`);
  outStream.write(`; ============================================\n\n`);

  // 匹配所有 CODE_ 區塊
  const codeBlockRegex = /CODE_\$([0-9A-F]+)_\$([0-9A-F]+)\(\):.*?\n  return \[\n([\s\S]*?)\n  \];\n\}/gi;
  let match;
  let totalBytes = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const startAddr = parseInt(match[1], 16);
    const endAddr = parseInt(match[2], 16);
    const hexStr = match[3];
    // 解析 hex bytes
    const bytes = hexStr
      .replace(/0x/gi, '')
      .replace(/,/g, ' ')
      .split(/\s+/)
      .filter(s => s.length > 0)
      .map(s => parseInt(s, 16));

    outStream.write(`\n; ── CODE: $${startAddr.toString(16).padStart(4,'0')}-$${endAddr.toString(16).padStart(4,'0')} (${bytes.length} bytes) ──\n\n`);
    const lines = disasmBytes(bytes, startAddr);
    for (const line of lines) {
      outStream.write(line + '\n');
    }
    totalBytes += bytes.length;
  }

  outStream.write(`\n\n; Total: ${totalBytes} code bytes disassembled\n`);
  outStream.end();
  console.log(`Done! → ${outPath} (${totalBytes} bytes disassembled)`);
}

main();
