/**
 * 将 PRG bank TS 文件中的 hex bytes 反汇编为 6502 助记符注释
 * 用法: node _disasm_hex.mjs src/tsnes/tsubasa-code/prg_banks/bank_00.ts
 */
import { readFileSync, writeFileSync } from 'fs';

// ─── 6502 操作码表: 寻址模式 → 助记符格式化 ───
const OPS = {
  0x00:['BRK',1], 0x01:['ORA (${z},X)',2], 0x05:['ORA $${z}',2], 0x06:['ASL $${z}',2],
  0x08:['PHP',1], 0x09:['ORA #$${i}',2], 0x0A:['ASL A',1],
  0x0D:['ORA $${a}',3], 0x0E:['ASL $${a}',3],
  0x10:['BPL $${r}',2], 0x11:['ORA (${z}),Y',2], 0x15:['ORA $${z},X',2], 0x16:['ASL $${z},X',2],
  0x18:['CLC',1], 0x19:['ORA $${a},Y',3], 0x1D:['ORA $${a},X',3], 0x1E:['ASL $${a},X',3],
  0x20:['JSR $${a}',3], 0x21:['AND (${z},X)',2], 0x24:['BIT $${z}',2], 0x25:['AND $${z}',2],
  0x26:['ROL $${z}',2], 0x28:['PLP',1], 0x29:['AND #$${i}',2],
  0x2A:['ROL A',1], 0x2C:['BIT $${a}',3], 0x2D:['AND $${a}',3], 0x2E:['ROL $${a}',3],
  0x30:['BMI $${r}',2], 0x31:['AND (${z}),Y',2], 0x35:['AND $${z},X',2], 0x36:['ROL $${z},X',2],
  0x38:['SEC',1], 0x39:['AND $${a},Y',3], 0x3D:['AND $${a},X',3], 0x3E:['ROL $${a},X',3],
  0x40:['RTI',1], 0x41:['EOR (${z},X)',2], 0x45:['EOR $${z}',2], 0x46:['LSR $${z}',2],
  0x48:['PHA',1], 0x49:['EOR #$${i}',2], 0x4A:['LSR A',1],
  0x4C:['JMP $${a}',3], 0x4D:['EOR $${a}',3], 0x4E:['LSR $${a}',3],
  0x50:['BVC $${r}',2], 0x51:['EOR (${z}),Y',2], 0x55:['EOR $${z},X',2], 0x56:['LSR $${z},X',2],
  0x58:['CLI',1], 0x59:['EOR $${a},Y',3], 0x5D:['EOR $${a},X',3], 0x5E:['LSR $${a},X',3],
  0x60:['RTS',1], 0x61:['ADC (${z},X)',2], 0x65:['ADC $${z}',2], 0x66:['ROR $${z}',2],
  0x68:['PLA',1], 0x69:['ADC #$${i}',2], 0x6A:['ROR A',1],
  0x6C:['JMP ($${a})',3], 0x6D:['ADC $${a}',3], 0x6E:['ROR $${a}',3],
  0x70:['BVS $${r}',2], 0x71:['ADC (${z}),Y',2], 0x75:['ADC $${z},X',2], 0x76:['ROR $${z},X',2],
  0x78:['SEI',1], 0x79:['ADC $${a},Y',3], 0x7D:['ADC $${a},X',3], 0x7E:['ROR $${a},X',3],
  0x81:['STA (${z},X)',2], 0x84:['STY $${z}',2], 0x85:['STA $${z}',2], 0x86:['STX $${z}',2],
  0x88:['DEY',1], 0x8A:['TXA',1], 0x8C:['STY $${a}',3], 0x8D:['STA $${a}',3], 0x8E:['STX $${a}',3],
  0x90:['BCC $${r}',2], 0x91:['STA (${z}),Y',2], 0x94:['STY $${z},X',2],
  0x95:['STA $${z},X',2], 0x96:['STX $${z},Y',2], 0x98:['TYA',1],
  0x99:['STA $${a},Y',3], 0x9A:['TXS',1], 0x9D:['STA $${a},X',3],
  0xA0:['LDY #$${i}',2], 0xA1:['LDA (${z},X)',2], 0xA2:['LDX #$${i}',2],
  0xA4:['LDY $${z}',2], 0xA5:['LDA $${z}',2], 0xA6:['LDX $${z}',2],
  0xA8:['TAY',1], 0xA9:['LDA #$${i}',2], 0xAA:['TAX',1],
  0xAC:['LDY $${a}',3], 0xAD:['LDA $${a}',3], 0xAE:['LDX $${a}',3],
  0xB0:['BCS $${r}',2], 0xB1:['LDA (${z}),Y',2], 0xB4:['LDY $${z},X',2],
  0xB5:['LDA $${z},X',2], 0xB6:['LDX $${z},Y',2], 0xB8:['CLV',1],
  0xB9:['LDA $${a},Y',3], 0xBA:['TSX',1], 0xBC:['LDY $${a},X',3],
  0xBD:['LDA $${a},X',3], 0xBE:['LDX $${a},Y',3], 0xC0:['CPY #$${i}',2],
  0xC1:['CMP (${z},X)',2], 0xC4:['CPY $${z}',2], 0xC5:['CMP $${z}',2],
  0xC6:['DEC $${z}',2], 0xC8:['INY',1], 0xC9:['CMP #$${i}',2],
  0xCA:['DEX',1], 0xCC:['CPY $${a}',3], 0xCD:['CMP $${a}',3],
  0xCE:['DEC $${a}',3], 0xD0:['BNE $${r}',2], 0xD1:['CMP (${z}),Y',2],
  0xD5:['CMP $${z},X',2], 0xD6:['DEC $${z},X',2], 0xD8:['CLD',1],
  0xD9:['CMP $${a},Y',3], 0xDD:['CMP $${a},X',3], 0xDE:['DEC $${a},X',3],
  0xE0:['CPX #$${i}',2], 0xE1:['SBC (${z},X)',2], 0xE4:['CPX $${z}',2],
  0xE5:['SBC $${z}',2], 0xE6:['INC $${z}',2], 0xE8:['INX',1],
  0xE9:['SBC #$${i}',2], 0xEA:['NOP',1], 0xEC:['CPX $${a}',3],
  0xED:['SBC $${a}',3], 0xEE:['INC $${a}',3], 0xF0:['BEQ $${r}',2],
  0xF1:['SBC (${z}),Y',2], 0xF5:['SBC $${z},X',2], 0xF6:['INC $${z},X',2],
  0xF8:['SED',1], 0xF9:['SBC $${a},Y',3], 0xFD:['SBC $${a},X',3], 0xFE:['INC $${a},X',3],
};

function hex2(v, pad) { return (v ?? 0).toString(16).toUpperCase().padStart(pad, '0'); }

function fmt(op, pc, b1, b2) {
  const def = OPS[op];
  if (!def) return `??? $${hex2(op, 2)}`;
  let s = def[0];
  const len = def[1];
  if (len === 2) {
    // 格式串已含 $ / #$，替换时不再加 $
    s = s.replace(/\$\{z\}/, hex2(b1, 2))
         .replace(/\$\{i\}/, hex2(b1, 2))
         .replace(/\$\{r\}/, () => {
           let rel = b1 ?? 0;
           if (rel > 127) rel -= 256;
           return hex2(pc + 2 + rel, 4);
         });
  } else if (len === 3) {
    const addr = (b1 ?? 0) + ((b2 ?? 0) << 8);
    s = s.replace(/\$\{a\}/, hex2(addr, 4))
         .replace(/\$\{r\}/, hex2(addr, 4));
  }
  return s;
}

function disasm(bytes, pc) {
  const out = [];
  for (let i = 0; i < bytes.length; ) {
    const op = bytes[i];
    const len = (OPS[op] || [null, 1])[1];
    out.push('$' + pc.toString(16).toUpperCase().padStart(4,'0') + ': ' + fmt(op, pc, bytes[i + 1], bytes[i + 2]));
    i += len;
    pc += len;
  }
  return out;
}

// ─── Parse & transform ───
const file = process.argv[2] || 'src/tsnes/tsubasa-code/prg_banks/bank_00.ts';
let src = readFileSync(file, 'utf8');
const lines = src.split('\n');

// State tracking
let currentCpuAddr = 0;
let pending = []; // bytes waiting for their hex line indices
let blockStartOutIdx = -1; // index in output where the first hex line of this block is
const output = [];

function flush() {
  if (pending.length === 0) return;
  const asm = disasm(pending.map(e => e.byte), pending[0].cpuAddr);
  // Insert asm comment before the first hex data line
  const indent = output[blockStartOutIdx].match(/^(\s*)/)[1];
  for (let j = asm.length - 1; j >= 0; j--) {
    output.splice(blockStartOutIdx, 0, indent + '// ' + asm[j]);
  }
  pending = [];
  blockStartOutIdx = -1;
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const t = line.trim();

  // Detect CPU range from section header: // $XXXX-$YYYY
  const rangeMatch = t.match(/\$([0-9A-Fa-f]{4})\s*-\s*\$([0-9A-Fa-f]{4})/);
  if (rangeMatch && t.startsWith('//')) {
    flush();
    currentCpuAddr = parseInt(rangeMatch[1], 16);
    output.push(line);
    continue;
  }

  // Detect start of hex array block
  if (t === 'return [' || t.startsWith('return [')) {
    flush();
    blockStartOutIdx = output.length; // next line will be first hex line
    output.push(line);
    continue;
  }

  // Detect pure hex data line (like: 0xA5, 0x27, ...)
  const hexMatch = t.match(/^(0x[0-9A-Fa-f]{2},\s*)+(0x[0-9A-Fa-f]{2},?)??$/);
  if (hexMatch) {
    const hexs = t.match(/0x[0-9A-Fa-f]{2}/gi);
    if (hexs && currentCpuAddr > 0) {
      if (blockStartOutIdx < 0) blockStartOutIdx = output.length; // first hex line
      for (const h of hexs) {
        pending.push({ byte: parseInt(h, 16), cpuAddr: currentCpuAddr });
        currentCpuAddr++;
      }
    }
    output.push(line);
    continue;
  }

  // End of array
  if (t === '];' || t.startsWith('];')) {
    flush();
    output.push(line);
    continue;
  }

  // Any other non-comment line — flush
  if (pending.length > 0 && !t.startsWith('//') && t.length > 0) {
    flush();
  }

  output.push(line);
}

// Write output
const result = output.join('\n');
if (result !== src) {
  writeFileSync(file, result);
  console.log(`[OK] ${file} — ${pending.length ? 'partial ' : ''}disassembly added`);
} else {
  console.log('[INFO] No changes (already disassembled?)');
}
