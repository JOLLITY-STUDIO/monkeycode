/**
 * BZK CDL ASM → C transpiler
 * Converts _full_disasm.asm to C files using 6502.h macros
 * Output: tools/6502-to-js-test/_prg_bank_XX.c (one per MMC3 bank)
 */
import fs from 'fs';
import path from 'path';

const ASM_FILE = process.argv[2] || '../_tmp_bzk_out/_full_disasm.asm';
const OUT_DIR = process.argv[3] || '../tools/6502-to-js-test/_prg_output';

// ==================== Parser ====================

function parseLine(line) {
  // Format: "  0x000010 $8000: C-----  A5 27    LDA  $27"
  // Data lines may have wrapped .byte: "  0x00001D $800D: -D0---  .byte $65"
  const m = line.match(
    /^\s+(0x[0-9A-Fa-f]+)\s+\$([0-9A-Fa-f]{4}):\s+([-CDJIA0-9]+)(?:\s+([0-9A-Fa-f]{2}(?: [0-9A-Fa-f]{2}){0,2}))?\s+(.+)$/
  );
  if (!m) return null;
  const [, romOffs, addr, cdl, rawBytes, rest] = m;
  const addrNum = parseInt(addr, 16);

  if (cdl[0] !== 'C') {
    // Data line - extract bytes from hex column or .byte directive
    let dataBytes = [];
    if (rawBytes) {
      dataBytes = rawBytes.trim().split(/\s+/).map(b => '0x' + b.toUpperCase());
    } else {
      // Try extracting from .byte $XX[, $XX, ...]
      const bm = rest.match(/\$([0-9A-Fa-f]{2})/g);
      if (bm) {
        dataBytes = bm.map(b => '0x' + b.slice(1).toUpperCase());
      }
    }
    return { type: 'data', romOffs, addr: addrNum, cdl, bytes: dataBytes };
  }

  const trimmed = rest.trim();
  if (trimmed.startsWith('.byte')) {
    let dataBytes = [];
    if (rawBytes) {
      dataBytes = rawBytes.trim().split(/\s+/).map(b => '0x' + b.toUpperCase());
    } else {
      const bm = trimmed.match(/\$([0-9A-Fa-f]{2})/g);
      if (bm) dataBytes = bm.map(b => '0x' + b.slice(1).toUpperCase());
    }
    return { type: 'data', romOffs, addr: addrNum, cdl, bytes: dataBytes };
  }

  let mnemonic = '';
  let operand = '';
  const spIdx = trimmed.indexOf(' ');
  if (spIdx >= 0) {
    mnemonic = trimmed.substring(0, spIdx).trim();
    operand = trimmed.substring(spIdx + 1).trim();
  } else {
    mnemonic = trimmed;
  }

  // Strip !! prefix (bad instruction marker)
  if (mnemonic.startsWith('!!')) {
    mnemonic = mnemonic.substring(2);
  }

  return { type: 'code', romOffs, addr: addrNum, mnemonic, operand, cdl };
}

// ==================== Addressing mode ====================

/**
 * Parse operand and return { suffix, args }
 * args format:
 *   - memory ops: "0xHH" or "0xHHHH"  (with 0x prefix, for C literal)
 *   - JSR/JMP:    "hhhh, hhhh"        (no 0x, used in LABEL/HEX macro)
 *   - branches:   "hhhh"              (no 0x, used in LABEL/HEX macro)
 */
function parseOperand(mnemonic, operand, addr) {
  // implied
  if (!operand) return { suffix: '', args: '' };

  // accumulator
  if (operand === 'A') return { suffix: '_A', args: '' };

  const isJsrJmp = mnemonic === 'JSR' || mnemonic === 'JMP';
  const isBranch = ['BCC','BCS','BEQ','BNE','BPL','BMI','BVC','BVS'].includes(mnemonic);

  // Immediate: #$XX
  let m = operand.match(/^#\$([0-9A-Fa-f]{2})$/);
  if (m) return { suffix: '_IMM', args: '0x' + m[1].toUpperCase() };

  // (ZP,X): ($XX,X)
  m = operand.match(/^\(\$([0-9A-Fa-f]{2}),X\)$/i);
  if (m) return { suffix: '_IDX', args: '0x' + m[1].toUpperCase() };

  // (ZP),Y: ($XX),Y
  m = operand.match(/^\(\$([0-9A-Fa-f]{2})\),Y$/i);
  if (m) return { suffix: '_IDY', args: '0x' + m[1].toUpperCase() };

  // ZP,X: $XX,X
  m = operand.match(/^\$([0-9A-Fa-f]{2}),X$/i);
  if (m) return { suffix: '_ZP_X', args: '0x' + m[1].toUpperCase() };

  // ZP,Y: $XX,Y
  m = operand.match(/^\$([0-9A-Fa-f]{2}),Y$/i);
  if (m) return { suffix: '_ZP_Y', args: '0x' + m[1].toUpperCase() };

  // ABS,X: $XXXX,X
  m = operand.match(/^\$([0-9A-Fa-f]{4}),X$/i);
  if (m) return { suffix: '_ABS_X', args: '0x' + m[1].toLowerCase() };

  // ABS,Y: $XXXX,Y
  m = operand.match(/^\$([0-9A-Fa-f]{4}),Y$/i);
  if (m) return { suffix: '_ABS_Y', args: '0x' + m[1].toLowerCase() };

  // ZP: $XX
  m = operand.match(/^\$([0-9A-Fa-f]{2})$/i);
  if (m) {
    const hex = m[1];
    if (isJsrJmp) {
      return null; // JSR/JMP to ZP makes no sense in NES
    }
    if (isBranch) {
      // Branches to ZP - use full hex for label consistency
      return { suffix: '', args: '00' + hex.toLowerCase() };
    }
    return { suffix: '_ZP', args: '0x' + hex.toUpperCase() };
  }

  // ABS / JSR / JMP / Branch: $XXXX
  m = operand.match(/^\$([0-9A-Fa-f]{4})$/i);
  if (m) {
    const hex = m[1].toLowerCase();
    if (isJsrJmp) {
      const curr = addr.toString(16).padStart(4, '0').toLowerCase();
      return { suffix: '', args: `${hex}, ${curr}` };
    }
    if (isBranch) {
      return { suffix: '', args: hex };
    }
    return { suffix: '_ABS', args: '0x' + hex };
  }

  // JMP indirect: ($XXXX)
  m = operand.match(/^\(\$([0-9A-Fa-f]{4})\)$/i);
  if (m && mnemonic === 'JMP') {
    return { suffix: '_IND', args: '0x' + m[1].toLowerCase() };
  }

  return null;
}

// ==================== Mnemonic → macro base ====================

const MNEMONIC_MAP = {
  // load
  LDA: 'LDA', LDX: 'LDX', LDY: 'LDY',
  // store
  STA: 'STA', STX: 'STX', STY: 'STY',
  // arithmetic
  ADC: 'ADC', SBC: 'SBC',
  // compare
  CMP: 'CMP', CPX: 'CPX', CPY: 'CPY',
  // logical
  AND: 'AND', ORA: 'ORA', EOR: 'EOR',
  // shift
  ASL: 'ASL', LSR: 'LSR',
  ROL: 'ROL', ROR: 'ROR',
  // inc/dec
  INC: 'INC', DEC: 'DEC',
  // bit
  BIT: 'BIT',
  // flags
  CLC: 'CLC', SEC: 'SEC', CLD: 'CLD', SED: 'SED',
  CLI: 'CLI', SEI: 'SEI', CLV: 'CLV',
  // transfer
  TAX: 'TAX', TAY: 'TAY', TXA: 'TXA', TYA: 'TYA',
  TSX: 'TSX', TXS: 'TXS',
  // inc/dec reg
  INX: 'INX', INY: 'INY', DEX: 'DEX', DEY: 'DEY',
  // stack
  PHA: 'PHA', PLA: 'PLA', PHP: 'PHP', PLP: 'PLP',
  // system
  NOP: 'NOP', BRK: 'BRK',
  // interrupt
  RTI: 'RTI',
  // subroutine
  RTS: 'RTS', JSR: 'JSR', JMP: 'JMP',
  // branch
  BCC: 'BCC', BCS: 'BCS', BEQ: 'BEQ', BNE: 'BNE',
  BPL: 'BPL', BMI: 'BMI', BVC: 'BVC', BVS: 'BVS',
};

// ==================== Main ====================

function main() {
  console.log(`Reading: ${ASM_FILE}`);
  const content = fs.readFileSync(ASM_FILE, 'utf8');
  let rawLines = content.split('\n');

  // Join wrapped lines (continuation lines start with "$XX" without hex offset)
  const lines = [];
  for (let i = 0; i < rawLines.length; i++) {
    const l = rawLines[i];
    if (l.match(/^\$\w/) && !l.match(/^\s+0x/)) {
      // Continuation: append to previous line with a space
      if (lines.length > 0) {
        lines[lines.length - 1] += ' ' + l.trim();
      }
    } else {
      lines.push(l);
    }
  }

  // Banks: { bankNum: { codeLines: [...], rtsAddrs: Set, romRange: str, cpuRange: str, cdlStats: str } }
  const banks = [];
  let currentBank = null;
  let bankHeaderLines = [];

  for (const line of lines) {
    // Detect bank header
    if (line.startsWith('; ===== MMC3 Bank')) {
      // Finalize previous
      if (currentBank) {
        currentBank.header = bankHeaderLines.join('\n');
      }
      currentBank = { codeLines: [], unsupported: [], rtsAddrs: new Set(), header: '', dataInits: [] };
      banks.push(currentBank);
      bankHeaderLines = [line];
      continue;
    }

    if (line.startsWith(';') && currentBank) {
      bankHeaderLines.push(line);
      continue;
    }

    if (!currentBank) continue;

    const parsed = parseLine(line);
    if (!parsed) continue;
    if (parsed.type === 'data') {
      currentBank.dataInits.push({ addr: parsed.addr, bytes: parsed.bytes });
      continue;
    }
    // type === 'code'

    const { mnemonic, operand, addr } = parsed;
    const macroBase = MNEMONIC_MAP[mnemonic.toUpperCase()];

    if (macroBase === null || macroBase === undefined) {
      // Unsupported instruction
      currentBank.unsupported.push({ addr, mnemonic, operand });
      continue;
    }

    let cLine;
    if (!operand) {
      cLine = `${macroBase}()`;
    } else {
      const opInfo = parseOperand(mnemonic, operand, addr);
      if (!opInfo) {
        currentBank.unsupported.push({ addr, mnemonic, operand, reason: 'cant parse operand' });
        continue;
      }
      cLine = `${macroBase}${opInfo.suffix}(${opInfo.args})`;
    }

    // Track RTS return addresses
    if (mnemonic === 'RTS') {
      currentBank.rtsAddrs.add(addr);
    }

    const addrHex = addr.toString(16).padStart(4, '0').toLowerCase();
    currentBank.codeLines.push(`L_${addrHex}: ${cLine}`);
  }

  // Finalize last bank
  if (currentBank) {
    currentBank.header = bankHeaderLines.join('\n');
  }

  // Write output
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  let totalCode = 0;
  let totalRts = 0;
  let totalUnsupported = 0;
  let totalDataBytes = 0;

  for (let i = 0; i < banks.length; i++) {
    const bank = banks[i];
    if (bank.codeLines.length === 0 && bank.unsupported.length === 0 && bank.dataInits.length === 0) continue;

    const out = [];
    out.push(`// Auto-generated from BZK CDL disassembly`);
    out.push(`// ${bank.header.replace(/\n/g, '\n// ')}`);
    out.push(`#include "6502_nes.h"`);
    out.push(``);

    // Data init (runs once per bank on first update_frame call)
    let bankDataBytes = 0;
    if (bank.dataInits.length > 0) {
      for (const d of bank.dataInits) bankDataBytes += d.bytes.length;
      out.push(`// === DATA INIT (${bank.dataInits.length} lines, ${bankDataBytes} bytes) ===`);
      out.push(`{ static int _di_${i} = 0; if (!_di_${i}) {`);
      for (const d of bank.dataInits) {
        for (let j = 0; j < d.bytes.length; j++) {
          const addrHex = (d.addr + j).toString(16).padStart(4, '0').toLowerCase();
          out.push(`  SetMem(0x${addrHex}, ${d.bytes[j]});`);
        }
      }
      out.push(`  _di_${i} = 1; } }`);
      out.push(``);
    }

    for (const l of bank.codeLines) {
      out.push(l);
    }

    // Unsupported instructions as comments
    if (bank.unsupported.length > 0) {
      out.push(``);
      out.push(`// === UNSUPPORTED INSTRUCTIONS (${bank.unsupported.length}) ===`);
      for (const u of bank.unsupported) {
        const a = u.addr.toString(16).padStart(4, '0').toLowerCase();
        out.push(`// $${a}: ${u.mnemonic} ${u.operand || ''}  [${u.reason || 'no macro'}]`);
      }
    }

    // RET_BEGIN / RET_END
    if (bank.rtsAddrs.size > 0) {
      out.push(``);
      out.push(`RET_BEGIN`);
      const sorted = [...bank.rtsAddrs].sort((a, b) => a - b);
      for (const a of sorted) {
        const h = a.toString(16).padStart(4, '0').toLowerCase();
        out.push(`    RET_ADDR(${h})`);
      }
      out.push(`RET_END`);
    }

    const fname = path.join(OUT_DIR, `prg_bank_${i.toString().padStart(2, '0')}.c`);
    fs.writeFileSync(fname, out.join('\n') + '\n');
    console.log(`[${i.toString().padStart(2, '0')}] ${fname}: ${bank.codeLines.length} instr, ${bankDataBytes} data bytes, ${bank.rtsAddrs.size} RTS, ${bank.unsupported.length} unsupported`);

    totalCode += bank.codeLines.length;
    totalRts += bank.rtsAddrs.size;
    totalUnsupported += bank.unsupported.length;
    totalDataBytes += bankDataBytes;
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total banks: ${banks.length}`);
  console.log(`Total code lines: ${totalCode}`);
  console.log(`Total data bytes: ${totalDataBytes}`);
  console.log(`Total RTS addresses: ${totalRts}`);
  console.log(`Total unsupported: ${totalUnsupported}`);
  console.log(`Output dir: ${path.resolve(OUT_DIR)}`);
}

main();
