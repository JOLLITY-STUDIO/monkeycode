// 手动反汇编 bank_02 的 $8200($A200) 区域, 确认场景分发结构
const fs = require('fs');
const path = require('path');

// 读取 prg-bank-02.ts 提取字节数组
const src = fs.readFileSync(path.join(__dirname, 'src/game/data/prg-bank-02.ts'), 'utf8');
const idx = src.indexOf('[');
const idx2 = src.lastIndexOf('];');
const body = src.slice(idx+1, idx2);
const bytes = body.replace(/\/\/.*/g,'').split(/[,\s]+/).filter(x=>x.startsWith('0x')).map(x=>parseInt(x,16));

// 6502 opcode 表 (简版: 长度 + 助记符)
const OPS = {
  0x00:['BRK',1],0x01:['ORA (zp,X)',2],0x05:['ORA zp',2],0x06:['ASL zp',2],0x08:['PHP',1],0x09:['ORA #',2],
  0x0A:['ASL',1],0x0D:['ORA abs',3],0x0E:['ASL abs',3],0x10:['BPL',2],0x11:['ORA (zp),Y',2],0x15:['ORA zp,X',2],
  0x16:['ASL zp,X',2],0x18:['CLC',1],0x19:['ORA abs,Y',3],0x1D:['ORA abs,X',3],0x1E:['ASL abs,X',3],
  0x20:['JSR abs',3],0x21:['AND (zp,X)',2],0x24:['BIT zp',2],0x25:['AND zp',2],0x26:['ROL zp',2],0x28:['PLP',1],
  0x29:['AND #',2],0x2A:['ROL',1],0x2C:['BIT abs',3],0x2D:['AND abs',3],0x2E:['ROL abs',3],0x30:['BMI',2],
  0x31:['AND (zp),Y',2],0x35:['AND zp,X',2],0x36:['ROL zp,X',2],0x38:['SEC',1],0x39:['AND abs,Y',3],
  0x3D:['AND abs,X',3],0x3E:['ROL abs,X',3],0x40:['RTI',1],0x41:['EOR (zp,X)',2],0x45:['EOR zp',2],
  0x46:['LSR zp',2],0x48:['PHA',1],0x49:['EOR #',2],0x4A:['LSR',1],0x4C:['JMP abs',3],0x4D:['EOR abs',3],
  0x4E:['LSR abs',3],0x50:['BVC',2],0x51:['EOR (zp),Y',2],0x55:['EOR zp,X',2],0x56:['LSR zp,X',2],
  0x58:['CLI',1],0x59:['EOR abs,Y',3],0x5D:['EOR abs,X',3],0x5E:['LSR abs,X',3],0x60:['RTS',1],
  0x61:['ADC (zp,X)',2],0x65:['ADC zp',2],0x66:['ROR zp',2],0x68:['PLA',1],0x69:['ADC #',2],0x6A:['ROR',1],
  0x6C:['JMP (abs)',3],0x6D:['ADC abs',3],0x6E:['ROR abs',3],0x70:['BVS',2],0x71:['ADC (zp),Y',2],
  0x75:['ADC zp,X',2],0x76:['ROR zp,X',2],0x78:['SEI',1],0x79:['ADC abs,Y',3],0x7D:['ADC abs,X',3],
  0x7E:['ROR abs,X',3],0x81:['STA (zp,X)',2],0x84:['STY zp',2],0x85:['STA zp',2],0x86:['STX zp',2],
  0x88:['DEY',1],0x8A:['TXA',1],0x8C:['STY abs',3],0x8D:['STA abs',3],0x8E:['STX abs',3],0x90:['BCC',2],
  0x91:['STA (zp),Y',2],0x94:['STY zp,X',2],0x95:['STA zp,X',2],0x96:['STX zp,Y',2],0x98:['TYA',1],
  0x99:['STA abs,Y',3],0x9A:['TXS',1],0x9D:['STA abs,X',3],0xA0:['LDY #',2],0xA1:['LDA (zp,X)',2],
  0xA2:['LDX #',2],0xA4:['LDY zp',2],0xA5:['LDA zp',2],0xA6:['LDX zp',2],0xA8:['TAY',1],0xA9:['LDA #',2],
  0xAA:['TAX',1],0xAC:['LDY abs',3],0xAD:['LDA abs',3],0xAE:['LDX abs',3],0xB0:['BCS',2],
  0xB1:['LDA (zp),Y',2],0xB4:['LDY zp,X',2],0xB5:['LDA zp,X',2],0xB6:['LDX zp,Y',2],0xB8:['CLV',1],
  0xB9:['LDA abs,Y',3],0xBA:['TSX',1],0xBC:['LDY abs,X',3],0xBD:['LDA abs,X',3],0xBE:['LDX abs,Y',3],
  0xC0:['CPY #',2],0xC1:['CMP (zp,X)',2],0xC4:['CPY zp',2],0xC5:['CMP zp',2],0xC6:['DEC zp',2],
  0xC8:['INY',1],0xC9:['CMP #',2],0xCA:['DEX',1],0xCC:['CPY abs',3],0xCD:['CMP abs',3],0xCE:['DEC abs',3],
  0xD0:['BNE',2],0xD1:['CMP (zp),Y',2],0xD5:['CMP zp,X',2],0xD6:['DEC zp,X',2],0xD8:['CLD',1],
  0xD9:['CMP abs,Y',3],0xDD:['CMP abs,X',3],0xDE:['DEC abs,X',3],0xE0:['CPX #',2],0xE1:['SBC (zp,X)',2],
  0xE4:['CPX zp',2],0xE5:['SBC zp',2],0xE6:['INC zp',2],0xE8:['INX',1],0xE9:['SBC #',2],0xEA:['NOP',1],
  0xEC:['CPX abs',3],0xED:['SBC abs',3],0xEE:['INC abs',3],0xF0:['BEQ',2],0xF1:['SBC (zp),Y',2],
  0xF5:['SBC zp,X',2],0xF6:['INC zp,X',2],0xF8:['SED',1],0xF9:['SBC abs,Y',3],0xFD:['SBC abs,X',3],
  0xFE:['INC abs,X',3],
};

function hex(b){return '$'+b.toString(16).toUpperCase().padStart(2,'0');}

function disasm(baseAddr, startOff, count) {
  let off = startOff;
  let line = 0;
  while (off < bytes.length && line < count) {
    const addr = baseAddr + off - startOff;
    const op = bytes[off];
    const def = OPS[op];
    if (!def) {
      console.log('$'+addr.toString(16).toUpperCase().padStart(4,'0')+': .byte '+hex(op)+' (unknown)');
      off++; line++; continue;
    }
    const [mnem, len] = def;
    let operand = '';
    if (len === 2) operand = hex(bytes[off+1]);
    else if (len === 3) {
      // 小端序: 低字节在前 bytes[off+1], 高字节在后 bytes[off+2]
      const lo = bytes[off+1];
      const hi = bytes[off+2];
      operand = '$'+hi.toString(16).toUpperCase().padStart(2,'0') + lo.toString(16).toUpperCase().padStart(2,'0');
    }
    // branch 目标计算
    if (mnem.startsWith('B')) {
      const rel = bytes[off+1];
      const target = addr + 2 + (rel < 128 ? rel : rel-256);
      operand = '$'+target.toString(16).toUpperCase().padStart(4,'0');
    }
    console.log('$'+addr.toString(16).toUpperCase().padStart(4,'0')+': '+hex(op)+' '+mnem+' '+operand);
    off += len;
    line++;
  }
}

// 读 bank31 字节
const src2 = fs.readFileSync(path.join(__dirname, 'src/game/data/prg-bank-31.ts'), 'utf8');
const b2s = src2.indexOf('[');
const b2e = src2.lastIndexOf('];');
const body2 = src2.slice(b2s+1, b2e);
const bytes2 = body2.replace(/\/\/.*/g,'').split(/[,\s]+/).filter(x=>x.startsWith('0x')).map(x=>parseInt(x,16));

function disasm2(baseAddr, startOff, count) {
  let off = startOff;
  let line = 0;
  while (off < bytes2.length && line < count) {
    const addr = baseAddr + off - startOff;
    const op = bytes2[off];
    const def = OPS[op];
    if (!def) {
      console.log('$'+addr.toString(16).toUpperCase().padStart(4,'0')+': .byte '+hex(op)+' (unknown)');
      off++; line++; continue;
    }
    const [mnem, len] = def;
    let operand = '';
    if (len === 2) operand = hex(bytes2[off+1]);
    else if (len === 3) {
      const lo = bytes2[off+1];
      const hi = bytes2[off+2];
      operand = '$'+hi.toString(16).toUpperCase().padStart(2,'0') + lo.toString(16).toUpperCase().padStart(2,'0');
    }
    if (mnem.startsWith('B')) {
      const rel = bytes2[off+1];
      const target = addr + 2 + (rel < 128 ? rel : rel-256);
      operand = '$'+target.toString(16).toUpperCase().padStart(4,'0');
    }
    console.log('$'+addr.toString(16).toUpperCase().padStart(4,'0')+': '+hex(op)+' '+mnem+' '+operand);
    off += len;
    line++;
  }
}

console.log('=== bank_02 $8484 间接跳转分发 (ram_00ED索引×2→地址表$A491) ===');
// 地址表 @ $8491 (反汇编), 每项2字节小端, 索引=ram_00ED
console.log('地址表 $A491 内容:');
for (let idx=0; idx<16; idx++) {
  const off = 0x491 + idx*2;
  if (off+1 >= bytes.length) break;
  const lo = bytes[off], hi = bytes[off+1];
  const target = (hi<<8)|lo;
  console.log(`  idx${idx}: $${(0x8491+idx*2).toString(16).toUpperCase()} = $${lo.toString(16).padStart(2,'0')} $${hi.toString(16).padStart(2,'0')} → $${target.toString(16).toUpperCase()}`);
}

// 反汇编几个目标找密码特征
console.log('\n=== idx0 $A4C0 (反汇编$84C0) ===');
disasm(0x84C0, 0x4C0, 25);
console.log('\n=== idx1 $A559 (反汇编$8559) ===');
disasm(0x8559, 0x559, 25);
console.log('\n=== idx10 $A5DB (反汇编$85DB, 开场ram_00ED=$0A) ===');
disasm(0x85DB, 0x5DB, 25);
