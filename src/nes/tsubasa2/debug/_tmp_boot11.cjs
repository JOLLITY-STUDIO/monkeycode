// 读原始 ROM 的 bank2 数据，反汇编 offset $0200-$0220，确认 JMP $A200 滑行终点
const fs = require('fs');
const path = require('path');

// 找 ROM 文件
const candidates = [
  path.join(__dirname, '..', 'dist', 'tsubasa2.nes'),
  path.join(__dirname, '..', '_tmp_bzk_out', 'PRG_ROM.bin'),
  path.join(__dirname, '..', '_tmp_bzk_out', 'tsubasa2.nes'),
];
let romPath = null;
for (const c of candidates) {
  if (fs.existsSync(c)) { romPath = c; break; }
}
// 递归找 .nes 文件
if (!romPath) {
  function walk(dir, depth) {
    if (depth > 3) return null;
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) {
        const r = walk(p, depth + 1);
        if (r) return r;
      } else if (f.endsWith('.nes') && fs.statSync(p).size > 100000) {
        return p;
      }
    }
    return null;
  }
  romPath = walk(path.join(__dirname, '..'), 0);
}
console.log('ROM:', romPath);

if (!romPath) process.exit(1);
const buf = fs.readFileSync(romPath);
console.log('ROM size:', buf.length);
const header = 16;
// bank2 = PRG offset (2 * 0x2000) + header
const bank2Off = header + 2 * 0x2000;
console.log('bank2 offset:', bank2Off.toString(16));

// 反汇编 $0200-$0230 (bank2 偏移)
const OPCODES = {
  0xA9: 'LDA #', 0x20: 'JSR ', 0x4C: 'JMP ', 0x8D: 'STA $', 0xAD: 'LDA $',
  0xA2: 'LDX #', 0xA0: 'LDY #', 0x85: 'STA zp$', 0xA5: 'LDA zp$', 0xEA: 'NOP',
  0x60: 'RTS', 0xAA: 'TAX', 0xA8: 'TAY', 0x9D: 'STA $abs,X', 0x99: 'STA $abs,Y',
  0xB9: 'LDA $abs,Y', 0xBD: 'LDA $abs,X', 0xD0: 'BNE ', 0xF0: 'BEQ ',
  0xC9: 'CMP #', 0xE0: 'CPX #', 0xC8: 'INY', 0xE8: 'INX', 0xCA: 'DEX',
  0x88: 'DEY', 0x18: 'CLC', 0x38: 'SEC', 0x10: 'BPL ', 0x30: 'BMI ',
  0x90: 'BCC ', 0xB0: 'BCS ', 0x29: 'AND #', 0x09: 'ORA #', 0x49: 'EOR #',
  0x4A: 'LSR A', 0x0A: 'ASL A', 0x2A: 'ROL A', 0x6A: 'ROR A', 0x65: 'ADC zp$',
  0x69: 'ADC #', 0xE5: 'SBC zp$', 0xE9: 'SBC #', 0xF5: 'SBC zp,X',
  0x75: 'ADC zp,X', 0x95: 'STA zp,X', 0xB5: 'LDA zp,X', 0xD5: 'CMP zp,X',
  0xE6: 'INC zp$', 0xC6: 'DEC zp$', 0xF6: 'INC zp,X', 0xD6: 'DEC zp,X',
  0xEE: 'INC $', 0xCE: 'DEC $', 0x86: 'STX zp$', 0x84: 'STY zp$',
  0xA6: 'LDX zp$', 0xA4: 'LDY zp$', 0xE4: 'CPX zp$', 0xC4: 'CPY zp$',
  0x01: 'ORA (zp,X)', 0x11: 'ORA (zp),Y', 0x91: 'STA (zp),Y', 0x81: 'STA (zp,X)',
  0xB1: 'LDA (zp),Y', 0xA1: 'LDA (zp,X)', 0xD1: 'CMP (zp),Y', 0xC1: 'CMP (zp,X)',
  0x48: 'PHA', 0x68: 'PLA', 0x8A: 'TXA', 0x98: 'TYA', 0xBA: 'TSX',
  0x9A: 'TXS', 0x78: 'SEI', 0x58: 'CLI', 0xD8: 'CLD', 0xF8: 'SED',
  0xE2: undefined, 0x5C: undefined,
};

function disasm(off, count) {
  let i = 0;
  let lines = [];
  while (i < count) {
    const abs = 0x8000 + off + i;
    const op = buf[bank2Off + off + i];
    const name = OPCODES[op];
    const raddr = (abs + 0x2000) & 0xFFFF;
    if (op === 0xA9) { lines.push(`${raddr.toString(16).toUpperCase().padStart(4,'0')}: LDA #$${buf[bank2Off+off+i+1].toString(16).padStart(2,'0')}`); i += 2; }
    else if (op === 0x20 || op === 0x4C) {
      const lo = buf[bank2Off+off+i+1], hi = buf[bank2Off+off+i+2];
      const target = (hi << 8) | lo;
      lines.push(`${raddr.toString(16).toUpperCase().padStart(4,'0')}: ${name}$${target.toString(16).toUpperCase().padStart(4,'0')}`);
      i += 3;
    }
    else if (op === 0x8D || op === 0xAD || op === 0x9D || op === 0x99 || op === 0xB9 || op === 0xBD || op === 0xEE || op === 0xCE) {
      const lo = buf[bank2Off+off+i+1], hi = buf[bank2Off+off+i+2];
      const target = (hi << 8) | lo;
      lines.push(`${raddr.toString(16).toUpperCase().padStart(4,'0')}: ${name}$${target.toString(16).toUpperCase().padStart(4,'0')}`);
      i += 3;
    }
    else if (op === 0xD0 || op === 0xF0 || op === 0x10 || op === 0x30 || op === 0x90 || op === 0xB0) {
      const rel = buf[bank2Off+off+i+1];
      const dest = ((abs + 2 + (rel > 127 ? rel - 256 : rel)) & 0xFFFF);
      lines.push(`${raddr.toString(16).toUpperCase().padStart(4,'0')}: ${name}$${dest.toString(16).toUpperCase().padStart(4,'0')}`);
      i += 2;
    }
    else if (op === 0x85 || op === 0xA5 || op === 0x65 || op === 0xE5 || op === 0x86 || op === 0x84 || op === 0xA6 || op === 0xA4 || op === 0xE4 || op === 0xC4 || op === 0xE6 || op === 0xC6 || op === 0xB5 || op === 0x95 || op === 0x75 || op === 0xF5 || op === 0xD5 || op === 0x91 || op === 0x81 || op === 0xB1 || op === 0xA1 || op === 0xD1 || op === 0xC1 || op === 0x01 || op === 0x11) {
      const zp = buf[bank2Off+off+i+1];
      lines.push(`${raddr.toString(16).toUpperCase().padStart(4,'0')}: ${name}$${zp.toString(16).toUpperCase().padStart(2,'0')}`);
      i += 2;
    }
    else if (op === 0x29 || op === 0x09 || op === 0x49 || op === 0x69 || op === 0xE9 || op === 0xC9 || op === 0xE0 || op === 0xC0) {
      lines.push(`${raddr.toString(16).toUpperCase().padStart(4,'0')}: ${name}$${buf[bank2Off+off+i+1].toString(16).padStart(2,'0')}`);
      i += 2;
    }
    else if (op === 0xEA || op === 0x60 || op === 0xAA || op === 0xA8 || op === 0xC8 || op === 0xE8 || op === 0xCA || op === 0x88 || op === 0x18 || op === 0x38 || op === 0x4A || op === 0x0A || op === 0x2A || op === 0x6A || op === 0x48 || op === 0x68 || op === 0x8A || op === 0x98 || op === 0xBA || op === 0x9A || op === 0x78 || op === 0x58 || op === 0xD8 || op === 0xF8) {
      lines.push(`${raddr.toString(16).toUpperCase().padStart(4,'0')}: ${name}`);
      i += 1;
    }
    else {
      lines.push(`${raddr.toString(16).toUpperCase().padStart(4,'0')}: .byte $${op.toString(16).padStart(2,'0')}`);
      i += 1;
    }
  }
  return lines;
}

// 从 $0200 开始反汇编 64 字节（$A200-$A240）
console.log('--- $A200 起反汇编 ---');
console.log(disasm(0x200, 80).join('\n'));
