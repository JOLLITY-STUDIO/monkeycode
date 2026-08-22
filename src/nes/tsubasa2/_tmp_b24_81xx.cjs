// 临时: 简单 6502 反汇编 bank24 $80FC-$81F0 区域
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgOff = 0x10;
const base = 0x8000;
const bank = 24;
function b(addr) { return rom[prgOff + bank * 0x2000 + (addr - base)]; }
const OPS = {
  0xA9:['LDA #',2],0xA2:['LDX #',2],0xA0:['LDY #',2],0xA5:['LDA zp',2],0xA6:['LDX zp',2],
  0xA4:['LDY zp',2],0xAD:['LDA abs',3],0xAE:['LDX abs',3],0xAC:['LDY abs',3],0x8D:['STA abs',3],
  0x8E:['STX abs',3],0x8C:['STY abs',3],0x85:['STA zp',2],0x86:['STX zp',2],0x84:['STY zp',2],
  0xB1:['LDA (zp),Y',2],0xB9:['LDA abs,Y',3],0x60:['RTS',1],0x20:['JSR',3],0x4C:['JMP',3],
  0x6C:['JMP (abs)',3],0x0A:['ASL',1],0x4A:['LSR',1],0x18:['CLC',1],0x38:['SEC',1],
  0xE8:['INX',1],0xC8:['INY',1],0xCA:['DEX',1],0x88:['DEY',1],0xAA:['TAX',1],0xA8:['TAY',1],
  0x8A:['TXA',1],0x98:['TYA',1],0x48:['PHA',1],0x68:['PLA',1],0x29:['AND #',2],0x09:['ORA #',2],
  0x49:['EOR #',2],0x0D:['ORA abs',3],0x2D:['AND abs',3],0x4D:['EOR abs',3],0xCD:['CMP abs',3],
  0xC9:['CMP #',2],0xE0:['CPX #',2],0xC0:['CPY #',2],0x2C:['BIT abs',3],0x24:['BIT zp',2],
  0x6D:['ADC abs',3],0x69:['ADC #',2],0xED:['SBC abs',3],0xE9:['SBC #',2],0x65:['ADC zp',2],
  0xE5:['SBC zp',2],0xC5:['CMP zp',2],0x10:['BPL',2],0x30:['BMI',2],0xF0:['BEQ',2],
  0xD0:['BNE',2],0x90:['BCC',2],0xB0:['BCS',2],0x50:['BVC',2],0x70:['BVS',2],0xEA:['NOP',1],
};
let addr = 0x80FC;
const end = 0x81F8;
const seen = new Set();
while (addr < end) {
  const op = b(addr);
  const def = OPS[op];
  if (!def) { addr++; continue; }
  const [name, len] = def;
  let opstr = '';
  if (len === 2) {
    const o = b(addr + 1);
    opstr = name === 'BPL' || name === 'BMI' || name === 'BEQ' || name === 'BNE' ||
            name === 'BCC' || name === 'BCS' || name === 'BVC' || name === 'BVS'
      ? `$${(addr + 2 + (o < 0x80 ? o : o - 256)).toString(16).toUpperCase().padStart(4, '0')}`
      : `#$${o.toString(16).toUpperCase().padStart(2, '0')}`;
  } else if (len === 3) {
    const lo = b(addr + 1), hi = b(addr + 2);
    opstr = `$${hi.toString(16).toUpperCase().padStart(2, '0')}${lo.toString(16).toUpperCase().padStart(2, '0')}`;
  }
  let bytes = [];
  for (let i = 0; i < len; i++) bytes.push(b(addr + i).toString(16).padStart(2, '0'));
  console.log(`$${addr.toString(16).toUpperCase()}  ${bytes.join(' ').padEnd(9)} ${name} ${opstr}`);
  addr += len;
}
