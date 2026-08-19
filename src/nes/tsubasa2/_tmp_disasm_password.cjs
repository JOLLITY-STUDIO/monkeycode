const fs = require('fs');
const s = fs.readFileSync('src/game/data/prg-bank-02.ts', 'utf8');
const i = s.indexOf('[');
const e = s.lastIndexOf('];');
const b = s.slice(i+1,e).replace(/\/\/.*/g,'').split(/[,\s]+/).filter(x=>x.startsWith('0x')).map(x=>parseInt(x,16));

const OPS = {
  0x00:['BRK',1],0x01:['ORA (zp,X)',2],0x05:['ORA zp',2],0x06:['ASL zp',2],0x08:['PHP',1],0x09:['ORA #',2],0x0A:['ASL',1],0x0D:['ORA abs',3],0x0E:['ASL abs',3],0x10:['BPL',2],0x11:['ORA (zp),Y',2],0x15:['ORA zp,X',2],0x16:['ASL zp,X',2],0x18:['CLC',1],0x19:['ORA abs,Y',3],0x1D:['ORA abs,X',3],0x1E:['ASL abs,X',3],0x20:['JSR abs',3],0x21:['AND (zp,X)',2],0x24:['BIT zp',2],0x25:['AND zp',2],0x26:['ROL zp',2],0x28:['PLP',1],0x29:['AND #',2],0x2A:['ROL',1],0x2C:['BIT abs',3],0x2D:['AND abs',3],0x2E:['ROL abs',3],0x30:['BMI',2],0x31:['AND (zp),Y',2],0x35:['AND zp,X',2],0x36:['ROL zp,X',2],0x38:['SEC',1],0x39:['AND abs,Y',3],0x3D:['AND abs,X',3],0x3E:['ROL abs,X',3],0x40:['RTI',1],0x41:['EOR (zp,X)',2],0x45:['EOR zp',2],0x46:['LSR zp',2],0x48:['PHA',1],0x49:['EOR #',2],0x4A:['LSR',1],0x4C:['JMP abs',3],0x4D:['EOR abs',3],0x4E:['LSR abs',3],0x50:['BVC',2],0x51:['EOR (zp),Y',2],0x55:['EOR zp,X',2],0x56:['LSR zp,X',2],0x58:['CLI',1],0x59:['EOR abs,Y',3],0x5D:['EOR abs,X',3],0x5E:['LSR abs,X',3],0x60:['RTS',1],0x61:['ADC (zp,X)',2],0x65:['ADC zp',2],0x66:['ROR zp',2],0x68:['PLA',1],0x69:['ADC #',2],0x6A:['ROR',1],0x6C:['JMP (abs)',3],0x6D:['ADC abs',3],0x6E:['ROR abs',3],0x70:['BVS',2],0x71:['ADC (zp),Y',2],0x75:['ADC zp,X',2],0x76:['ROR zp,X',2],0x78:['SEI',1],0x79:['ADC abs,Y',3],0x7D:['ADC abs,X',3],0x7E:['ROR abs,X',3],0x81:['STA (zp,X)',2],0x84:['STY zp',2],0x85:['STA zp',2],0x86:['STX zp',2],0x88:['DEY',1],0x8A:['TXA',1],0x8C:['STY abs',3],0x8D:['STA abs',3],0x8E:['STX abs',3],0x90:['BCC',2],0x91:['STA (zp),Y',2],0x94:['STY zp,X',2],0x95:['STA zp,X',2],0x96:['STX zp,Y',2],0x98:['TYA',1],0x99:['STA abs,Y',3],0x9A:['TXS',1],0x9D:['STA abs,X',3],0xA0:['LDY #',2],0xA1:['LDA (zp,X)',2],0xA2:['LDX #',2],0xA4:['LDY zp',2],0xA5:['LDA zp',2],0xA6:['LDX zp',2],0xA8:['TAY',1],0xA9:['LDA #',2],0xAA:['TAX',1],0xAC:['LDY abs',3],0xAD:['LDA abs',3],0xAE:['LDX abs',3],0xB0:['BCS',2],0xB1:['LDA (zp),Y',2],0xB4:['LDY zp,X',2],0xB5:['LDA zp,X',2],0xB6:['LDX zp,Y',2],0xB8:['CLV',1],0xB9:['LDA abs,Y',3],0xBA:['TSX',1],0xBC:['LDY abs,X',3],0xBD:['LDA abs,X',3],0xBE:['LDX abs,Y',3],0xC0:['CPY #',2],0xC1:['CMP (zp,X)',2],0xC4:['CPY zp',2],0xC5:['CMP zp',2],0xC6:['DEC zp',2],0xC8:['INY',1],0xC9:['CMP #',2],0xCA:['DEX',1],0xCC:['CPY abs',3],0xCD:['CMP abs',3],0xCE:['DEC abs',3],0xD0:['BNE',2],0xD1:['CMP (zp),Y',2],0xD5:['CMP zp,X',2],0xD6:['DEC zp,X',2],0xD8:['CLD',1],0xD9:['CMP abs,Y',3],0xDD:['CMP abs,X',3],0xDE:['DEC abs,X',3],0xE0:['CPX #',2],0xE1:['SBC (zp,X)',2],0xE4:['CPX zp',2],0xE5:['SBC zp',2],0xE6:['INC zp',2],0xE8:['INX',1],0xE9:['SBC #',2],0xEA:['NOP',1],0xEC:['CPX abs',3],0xED:['SBC abs',3],0xEE:['INC abs',3],0xF0:['BEQ',2],0xF1:['SBC (zp),Y',2],0xF5:['SBC zp,X',2],0xF6:['INC zp,X',2],0xF8:['SED',1],0xF9:['SBC abs,Y',3],0xFD:['SBC abs,X',3],0xFE:['INC abs,X',3],
};

function disasm(baseAddr, startOff, count) {
  let off = startOff, line = 0;
  while (off < b.length && line < count) {
    const addr = baseAddr + off - startOff;
    const op = b[off];
    const def = OPS[op];
    if (!def) { console.log('$'+addr.toString(16).toUpperCase().padStart(4,'0')+': .byte $'+op.toString(16).padStart(2,'0')); off++; line++; continue; }
    const [mnem, len] = def;
    let operand = '';
    if (len === 2) operand = '$'+b[off+1].toString(16).padStart(2,'0');
    else if (len === 3) { const lo=b[off+1], hi=b[off+2]; operand = '$'+hi.toString(16).toUpperCase().padStart(2,'0')+lo.toString(16).toUpperCase().padStart(2,'0'); }
    if (mnem.startsWith('B')) { const rel=b[off+1]; const t=addr+2+(rel<128?rel:rel-256); operand='$'+t.toString(16).toUpperCase().padStart(4,'0'); }
    console.log('$'+addr.toString(16).toUpperCase().padStart(4,'0')+': '+mnem+' '+operand);
    off += len; line++;
  }
}

console.log('=== bank2 $8AF7 (Cut背景初始化子程, $84E0 JSR 调入) ===');
disasm(0x8AF7, 0xAF7, 40);
console.log('\n=== bank2 $9A0D (清屏) ===');
disasm(0x9A0D, 0xA0D, 30);
console.log('\n=== bank2 $890C (48循环调的子程) ===');
disasm(0x890C, 0x90C, 30);
