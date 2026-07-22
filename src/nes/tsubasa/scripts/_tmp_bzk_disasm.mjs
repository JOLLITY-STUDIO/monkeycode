// BZK-6502 style CDL-aware 6502 disassembler for MMC3
// Uses CDL bit flags: bit0=code, bit1=data, bit4=JMP target, bit5=indirect, bit6=absolute
import fs from 'fs';
import path from 'path';

const ROM_PATH = 'src/nes/tsubasa/src/legacy/romdata/Captain Tsubasa II - Super Striker (Japan).nes';
const CDL_PATH = 'src/nes/tsubasa/src/legacy/romdata/Captain Tsubasa II - Super Striker (Japan)-openning.cdl';
const OUT_DIR = 'src/nes/tsubasa/_tmp_bzk_out_openning';

const ROM_NAME = path.basename(ROM_PATH);
const CDL_NAME = path.basename(CDL_PATH);

const BANK_SIZE = 0x2000; // 8KB per MMC3 bank
const HEADER_SIZE = 0x10;

// 6502 opcode table: [length, mnemonic, addressing_mode]
const OPS = {
  0x00:[1,'BRK','implied'],0x01:[2,'ORA','(ind,X)'],0x05:[2,'ORA','zp'],
  0x06:[2,'ASL','zp'],0x08:[1,'PHP','implied'],0x09:[2,'ORA','#imm'],
  0x0A:[1,'ASL','acc'],0x0D:[3,'ORA','abs'],0x0E:[3,'ASL','abs'],
  0x10:[2,'BPL','rel'],0x11:[2,'ORA','(ind),Y'],0x15:[2,'ORA','zp,X'],
  0x16:[2,'ASL','zp,X'],0x18:[1,'CLC','implied'],0x19:[3,'ORA','abs,Y'],
  0x1D:[3,'ORA','abs,X'],0x1E:[3,'ASL','abs,X'],0x20:[3,'JSR','abs'],
  0x21:[2,'AND','(ind,X)'],0x24:[2,'BIT','zp'],0x25:[2,'AND','zp'],
  0x26:[2,'ROL','zp'],0x28:[1,'PLP','implied'],0x29:[2,'AND','#imm'],
  0x2A:[1,'ROL','acc'],0x2C:[3,'BIT','abs'],0x2D:[3,'AND','abs'],
  0x2E:[3,'ROL','abs'],0x30:[2,'BMI','rel'],0x31:[2,'AND','(ind),Y'],
  0x35:[2,'AND','zp,X'],0x36:[2,'ROL','zp,X'],0x38:[1,'SEC','implied'],
  0x39:[3,'AND','abs,Y'],0x3D:[3,'AND','abs,X'],0x3E:[3,'ROL','abs,X'],
  0x40:[1,'RTI','implied'],0x41:[2,'EOR','(ind,X)'],0x45:[2,'EOR','zp'],
  0x46:[2,'LSR','zp'],0x48:[1,'PHA','implied'],0x49:[2,'EOR','#imm'],
  0x4A:[1,'LSR','acc'],0x4C:[3,'JMP','abs'],0x4D:[3,'EOR','abs'],
  0x4E:[3,'LSR','abs'],0x50:[2,'BVC','rel'],0x51:[2,'EOR','(ind),Y'],
  0x55:[2,'EOR','zp,X'],0x56:[2,'LSR','zp,X'],0x58:[1,'CLI','implied'],
  0x59:[3,'EOR','abs,Y'],0x5D:[3,'EOR','abs,X'],0x5E:[3,'LSR','abs,X'],
  0x60:[1,'RTS','implied'],0x61:[2,'ADC','(ind,X)'],0x65:[2,'ADC','zp'],
  0x66:[2,'ROR','zp'],0x68:[1,'PLA','implied'],0x69:[2,'ADC','#imm'],
  0x6A:[1,'ROR','acc'],0x6C:[3,'JMP','(ind)'],0x6D:[3,'ADC','abs'],
  0x6E:[3,'ROR','abs'],0x70:[2,'BVS','rel'],0x71:[2,'ADC','(ind),Y'],
  0x75:[2,'ADC','zp,X'],0x76:[2,'ROR','zp,X'],0x78:[1,'SEI','implied'],
  0x79:[3,'ADC','abs,Y'],0x7D:[3,'ADC','abs,X'],0x7E:[3,'ROR','abs,X'],
  0x81:[2,'STA','(ind,X)'],0x84:[2,'STY','zp'],0x85:[2,'STA','zp'],
  0x86:[2,'STX','zp'],0x88:[1,'DEY','implied'],0x8A:[1,'TXA','implied'],
  0x8C:[3,'STY','abs'],0x8D:[3,'STA','abs'],0x8E:[3,'STX','abs'],
  0x90:[2,'BCC','rel'],0x91:[2,'STA','(ind),Y'],0x94:[2,'STY','zp,X'],
  0x95:[2,'STA','zp,X'],0x96:[2,'STX','zp,Y'],0x98:[1,'TYA','implied'],
  0x99:[3,'STA','abs,Y'],0x9A:[1,'TXS','implied'],0x9D:[3,'STA','abs,X'],
  0xA0:[2,'LDY','#imm'],0xA1:[2,'LDA','(ind,X)'],0xA2:[2,'LDX','#imm'],
  0xA4:[2,'LDY','zp'],0xA5:[2,'LDA','zp'],0xA6:[2,'LDX','zp'],
  0xA8:[1,'TAY','implied'],0xA9:[2,'LDA','#imm'],0xAA:[1,'TAX','implied'],
  0xAC:[3,'LDY','abs'],0xAD:[3,'LDA','abs'],0xAE:[3,'LDX','abs'],
  0xB0:[2,'BCS','rel'],0xB1:[2,'LDA','(ind),Y'],0xB4:[2,'LDY','zp,X'],
  0xB5:[2,'LDA','zp,X'],0xB6:[2,'LDX','zp,Y'],0xB8:[1,'CLV','implied'],
  0xB9:[3,'LDA','abs,Y'],0xBA:[1,'TSX','implied'],0xBC:[3,'LDY','abs,X'],
  0xBD:[3,'LDA','abs,X'],0xBE:[3,'LDX','abs,Y'],0xC0:[2,'CPY','#imm'],
  0xC1:[2,'CMP','(ind,X)'],0xC4:[2,'CPY','zp'],0xC5:[2,'CMP','zp'],
  0xC6:[2,'DEC','zp'],0xC8:[1,'INY','implied'],0xC9:[2,'CMP','#imm'],
  0xCA:[1,'DEX','implied'],0xCC:[3,'CPY','abs'],0xCD:[3,'CMP','abs'],
  0xCE:[3,'DEC','abs'],0xD0:[2,'BNE','rel'],0xD1:[2,'CMP','(ind),Y'],
  0xD5:[2,'CMP','zp,X'],0xD6:[2,'DEC','zp,X'],0xD8:[1,'CLD','implied'],
  0xD9:[3,'CMP','abs,Y'],0xDD:[3,'CMP','abs,X'],0xDE:[3,'DEC','abs,X'],
  0xE0:[2,'CPX','#imm'],0xE1:[2,'SBC','(ind,X)'],0xE4:[2,'CPX','zp'],
  0xE5:[2,'SBC','zp'],0xE6:[2,'INC','zp'],0xE8:[1,'INX','implied'],
  0xE9:[2,'SBC','#imm'],0xEA:[1,'NOP','implied'],0xEC:[3,'CPX','abs'],
  0xED:[3,'SBC','abs'],0xEE:[3,'INC','abs'],0xF0:[2,'BEQ','rel'],
  0xF1:[2,'SBC','(ind),Y'],0xF5:[2,'SBC','zp,X'],0xF6:[2,'INC','zp,X'],
  0xF8:[1,'SED','implied'],0xF9:[3,'SBC','abs,Y'],0xFD:[3,'SBC','abs,X'],
  0xFE:[3,'INC','abs,X'],
};

// CDL flag helpers
const CDL_CODE = 0x01;
const CDL_DATA = 0x02;
const CDL_BANK_MASK = 0x0C;
const CDL_JUMP = 0x10;
const CDL_INDIRECT = 0x20;
const CDL_ABSOLUTE = 0x40;

function cdlFlags(byte) {
  if (byte === 0) return '------';
  let s = '';
  s += (byte & CDL_CODE) ? 'C' : '-';
  s += (byte & CDL_DATA) ? 'D' : '-';
  if (byte & CDL_DATA) {
    const bn = ((byte & CDL_BANK_MASK) >> 2);
    s += bn;
  } else { s += '-'; }
  s += (byte & CDL_JUMP) ? 'J' : '-';
  s += (byte & CDL_INDIRECT) ? 'I' : '-';
  s += (byte & CDL_ABSOLUTE) ? 'A' : '-';
  return s;
}

function formatAddr16(lo, hi) {
  const addr = lo | (hi << 8);
  return '$' + addr.toString(16).toUpperCase().padStart(4, '0');
}

function formatBranchTarget(pc, offset) {
  // 6502 relative: target = pc + 2 + signed(offset)
  let target = pc + 2 + (offset & 0x80 ? offset - 256 : offset);
  return '$' + (target & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

function disasmBank(romBytes, cdlBytes, bankNum, cpuBase, outputLines) {
  const size = romBytes.length;
  let pos = 0;

  while (pos < size) {
    const cdl = cdlBytes[pos];
    const isCode = !!(cdl & CDL_CODE);
    const flags = cdlFlags(cdl);
    const romOffs = '0x' + (HEADER_SIZE + bankNum * BANK_SIZE + pos).toString(16).toUpperCase().padStart(6, '0');
    const cpuAddr = '$' + ((cpuBase + pos) & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    const prefix = `  ${romOffs} ${cpuAddr}: ${flags} `;

    if (!isCode) {
      // Data byte
      const b = romBytes[pos];
      const hex = b.toString(16).toUpperCase().padStart(2, '0');
      // Check if this is a jump target
      const jumpTag = (cdl & CDL_JUMP) ? ' ; <JMP target>' : '';
      const indirectTag = (cdl & CDL_INDIRECT) ? ' ; <indirect ref>' : '';
      outputLines.push(`${prefix} .byte $${hex}${jumpTag}${indirectTag}`);
      pos++;
      continue;
    }

    // Code: decode instruction
    const opcode = romBytes[pos];
    const opInfo = OPS[opcode];
    if (!opInfo) {
      // Undefined opcode - treat as data
      const hex = opcode.toString(16).toUpperCase().padStart(2, '0');
      outputLines.push(`${prefix} !!UNDEF $${hex}  ; unknown opcode, treating as data`);
      pos++;
      continue;
    }

    const [len, mnemonic, mode] = opInfo;

    // Check we have enough bytes
    if (pos + len > size) {
      outputLines.push(`${prefix} !!TRUNC ${mnemonic}  ; instruction truncated at bank boundary`);
      // Output remaining as data
      while (pos < size) {
        const b = romBytes[pos];
        const hex = b.toString(16).toUpperCase().padStart(2, '0');
        outputLines.push(`${prefix} .byte $${hex}`);
        pos++;
      }
      break;
    }

    // Build operand string
    let operand = '';
    const b1 = romBytes[pos + 1];
    const b2 = len > 2 ? romBytes[pos + 2] : 0;

    switch (mode) {
      case 'implied': break;
      case 'acc': operand = 'A'; break;
      case '#imm': operand = `#$${b1.toString(16).toUpperCase().padStart(2, '0')}`; break;
      case 'zp': operand = `$${b1.toString(16).toUpperCase().padStart(2, '0')}`; break;
      case 'zp,X': operand = `$${b1.toString(16).toUpperCase().padStart(2, '0')},X`; break;
      case 'zp,Y': operand = `$${b1.toString(16).toUpperCase().padStart(2, '0')},Y`; break;
      case 'abs': operand = formatAddr16(b1, b2); break;
      case 'abs,X': operand = formatAddr16(b1, b2) + ',X'; break;
      case 'abs,Y': operand = formatAddr16(b1, b2) + ',Y'; break;
      case '(ind)': operand = `(${formatAddr16(b1, b2)})`; break;
      case '(ind,X)': operand = `($${b1.toString(16).toUpperCase().padStart(2, '0')},X)`; break;
      case '(ind),Y': operand = `($${b1.toString(16).toUpperCase().padStart(2, '0')}),Y`; break;
      case 'rel': operand = formatBranchTarget(cpuBase + pos, b1); break;
    }

    // Hex bytes for the instruction
    const hexBytes = [];
    for (let i = 0; i < len; i++) {
      hexBytes.push(romBytes[pos + i].toString(16).toUpperCase().padStart(2, '0'));
    }

    outputLines.push(`${prefix} ${hexBytes.join(' ').padEnd(8)} ${mnemonic.padEnd(4)} ${operand}`);
    pos += len;
  }
}

// RAM usage tracking (BZK's distinctive feature)
function trackRamUsage(romBytes, cdlBytes, bankNum, cpuBase, ramCounts) {
  let pos = 0;
  const size = romBytes.length;

  while (pos < size) {
    const cdl = cdlBytes[pos];
    const isCode = !!(cdl & CDL_CODE);
    if (!isCode) { pos++; continue; }

    const opcode = romBytes[pos];
    const opInfo = OPS[opcode];
    if (!opInfo) { pos++; continue; }

    const [len, mnemonic, mode] = opInfo;
    if (pos + len > size) break;

    const b1 = romBytes[pos + 1];
    const b2 = len > 2 ? romBytes[pos + 2] : 0;

    // Track RAM address usage
    let addr = -1;
    if (mode === 'zp' || mode === 'zp,X' || mode === 'zp,Y' || mode === '(ind,X)' || mode === '(ind),Y') {
      addr = b1;
    } else if (mode === 'abs' || mode === 'abs,X' || mode === 'abs,Y' || mode === '(ind)') {
      addr = b1 | (b2 << 8);
    }

    if (addr >= 0 && addr <= 0x1FFF) {
      ramCounts[addr] = (ramCounts[addr] || 0) + 1;
    }

    pos += len;
  }
}

// ===== Main =====
const rom = fs.readFileSync(ROM_PATH);
const cdl = fs.readFileSync(CDL_PATH);

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

// Only PRG ROM banks (not CHR)
const prgPages = rom[4];
const prgSize = prgPages * 16384;
const numBanks = Math.floor(prgSize / BANK_SIZE);
console.log(`ROM: ${rom.length} bytes, PRG: ${prgSize} bytes, ${prgPages} pages, ${numBanks} banks (${numBanks*8}KB)`);
console.log(`CDL: ${cdl.length} bytes`);

// MMC3 CPU base addresses for each bank window
// Standard MMC3: last bank fixed at $E000, second-to-last at $C000
function getCpuBase(bankNum) {
  const lastBank = numBanks - 1;
  if (bankNum === lastBank) return 0xE000;     // fixed bank
  if (bankNum === lastBank - 1) return 0xC000;  // fixed bank in most MMC3 configs
  // Swappable banks - use $8000 as default
  return 0x8000;
}

// First pass: track RAM usage across all banks
const ramCounts = new Array(0x2000).fill(0);

for (let b = 0; b < numBanks; b++) {
  const romStart = HEADER_SIZE + b * BANK_SIZE;
  const romEnd = romStart + BANK_SIZE;
  const romSlice = rom.slice(romStart, romEnd);

  // CDL is indexed by ROM offset (minus header, because CDL tracks PRG only)
  const cdlStart = b * BANK_SIZE;
  const cdlEnd = Math.min(cdlStart + BANK_SIZE, cdl.length);
  const cdlSlice = cdl.slice(cdlStart, cdlEnd);

  const cpuBase = getCpuBase(b);
  trackRamUsage(romSlice, cdlSlice, b, cpuBase, ramCounts);
}

// Output RAM report
let ramReport = [];
ramReport.push(`; === RAM ADDRESS USAGE (BZK-style cross-bank analysis) ===\n`);
ramReport.push(`; Format: address = count (bank:count ...)\n`);
ramReport.push(`; Only addresses referenced by absolute/zp addressing modes\n\n`);

const usedRams = [];
for (let i = 0; i < ramCounts.length; i++) {
  if (ramCounts[i] > 0) {
    const hex = '$' + i.toString(16).toUpperCase().padStart(4, '0');
    usedRams.push({ addr: i, hex, count: ramCounts[i] });
  }
}
usedRams.sort((a, b) => a.addr - b.addr);

for (const r of usedRams) {
  ramReport.push(`  ram_${r.hex.replace('$', '')} = ${r.hex}  ; refs: ${r.count}\n`);
}
ramReport.push(`\n; Total RAM addresses referenced: ${usedRams.length}\n\n`);
fs.writeFileSync(`${OUT_DIR}/_ram_usage.inc`, ramReport.join(''));

// Second pass: disassemble each bank
let allStats = [];
allStats.push(`; === BZK-style CDL-aware disassembly of ${numBanks} MMC3 banks ===\n`);
allStats.push(`; CDL flags: C=code D=data [bank#] J=jump_target I=indirect_ref A=absolute_access\n`);
allStats.push(`; ROM file: ${ROM_NAME}\n`);
allStats.push(`; CDL file: ${CDL_NAME}\n\n`);

for (let b = 0; b < numBanks; b++) {
  const romStart = HEADER_SIZE + b * BANK_SIZE;
  const romEnd = romStart + BANK_SIZE;
  const romSlice = rom.slice(romStart, romEnd);
  const cpuBase = getCpuBase(b);

  const cdlStart = b * BANK_SIZE;
  const cdlEnd = Math.min(cdlStart + BANK_SIZE, cdl.length);
  const cdlSlice = cdl.slice(cdlStart, cdlEnd);

  // Pad CDL if shorter
  while (cdlSlice.length < BANK_SIZE) {
    cdlSlice.push(0);
  }

  // Statistics
  let codeBytes = 0, dataBytes = 0, unaccBytes = 0;
  for (let i = 0; i < cdlSlice.length && i < BANK_SIZE; i++) {
    const c = cdlSlice[i];
    if (c & CDL_CODE) codeBytes++;
    else if (c & CDL_DATA) dataBytes++;
    else unaccBytes++;
  }

  const lines = [];
  lines.push(`; ===== MMC3 Bank ${b.toString().padStart(2, '0')} =====`);
  lines.push(`; ROM: 0x${(romStart).toString(16).toUpperCase().padStart(6, '0')}-0x${(romEnd - 1).toString(16).toUpperCase().padStart(6, '0')}`);
  lines.push(`; CPU: ${'$' + cpuBase.toString(16).toUpperCase().padStart(4, '0')}-${'$' + (cpuBase + BANK_SIZE - 1).toString(16).toUpperCase().padStart(4, '0')}`);
  lines.push(`; CDL: code=${codeBytes} data=${dataBytes} unaccessed=${unaccBytes}\n`);

  allStats.push(`Bank ${b.toString().padStart(2, '0')}: code=${codeBytes.toString().padStart(4)} data=${dataBytes.toString().padStart(4)} unacc=${unaccBytes.toString().padStart(4)}  CPU=${'$' + cpuBase.toString(16).toUpperCase().padStart(4, '0')}\n`);

  disasmBank(romSlice, cdlSlice, b, cpuBase, lines);

  fs.writeFileSync(`${OUT_DIR}/bank_${b.toString().padStart(2, '0')}.asm`, lines.join('\n'));
}

fs.writeFileSync(`${OUT_DIR}/_stats.txt`, allStats.join(''));

// Merge all into single file
let merged = [];
merged.push(`; ====================================================================`);
merged.push(`; BZK-style CDL-aware Full Disassembly`);
merged.push(`; ${ROM_NAME.replace('.nes', '')}`);
merged.push(`; 32 MMC3 banks × 8KB = 256KB PRG ROM`);
merged.push(`; CDL flags: C=code D=data [#]=data_bank J=jump I=indirect A=absolute`);
merged.push(`; '!!' prefix = undefined/truncated instruction`);
merged.push(`; ====================================================================\n`);
merged.push(fs.readFileSync(`${OUT_DIR}/_ram_usage.inc`, 'utf8'));

for (let b = 0; b < numBanks; b++) {
  const bankContent = fs.readFileSync(`${OUT_DIR}/bank_${b.toString().padStart(2, '0')}.asm`, 'utf8');
  merged.push(bankContent);
}

fs.writeFileSync(`${OUT_DIR}/_full_disasm.asm`, merged.join('\n'));

console.log(`\nDone! Output in ${OUT_DIR}/`);
console.log(`  _full_disasm.asm - complete disassembly`);
console.log(`  _ram_usage.inc   - RAM address usage report`);
console.log(`  _stats.txt       - per-bank statistics`);
console.log(`  bank_XX.asm      - individual bank files`);
