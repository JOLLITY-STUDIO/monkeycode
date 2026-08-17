/* 手动解码 bank_03 handler 区域 (offset 0x4C0-0x7FA) */
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', '..', 'rom-data', 'prg-bank-03.ts');
let src = fs.readFileSync(dataFile, 'utf8');
const m = src.match(/=\s*\[([\s\S]*?)\]\s*;/);
if (!m) { console.error('parse fail'); process.exit(1); }
const bytes = m[1].split(',').map(s => parseInt(s.trim(), 16));

// 6502 opcode table
const T = {};
const def = [
  '00 BRK imp', '01 ORA izx', '05 ORA zp', '06 ASL zp', '08 PHP imp', '09 ORA imm', '0A ASL acc', '0D ORA abs', '0E ASL abs',
  '10 BPL rel', '11 ORA izy', '15 ORA zpx', '16 ASL zpx', '18 CLC imp', '19 ORA aby', '1D ORA abx', '1E ASL abx',
  '20 JSR abs', '21 AND izx', '24 BIT zp', '25 AND zp', '26 ROL zp', '28 PLP imp', '29 AND imm', '2A ROL acc', '2C BIT abs', '2D AND abs', '2E ROL abs',
  '30 BMI rel', '31 AND izy', '35 AND zpx', '36 ROL zpx', '38 SEC imp', '39 AND aby', '3D AND abx', '3E ROL abx',
  '40 RTI imp', '41 EOR izx', '45 EOR zp', '46 LSR zp', '48 PHA imp', '49 EOR imm', '4A LSR acc', '4C JMP abs', '4D EOR abs', '4E LSR abs',
  '50 BVC rel', '51 EOR izy', '55 EOR zpx', '56 LSR zpx', '58 CLI imp', '59 EOR aby', '5D EOR abx', '5E LSR abx',
  '60 RTS imp', '61 ADC izx', '65 ADC zp', '66 ROR zp', '68 PLA imp', '69 ADC imm', '6A ROR acc', '6C JMP ind', '6D ADC abs', '6E ROR abs',
  '70 BVS rel', '71 ADC izy', '75 ADC zpx', '76 ROR zpx', '78 SEI imp', '79 ADC aby', '7D ADC abx', '7E ROR abx',
  '81 STA izx', '84 STY zp', '85 STA zp', '86 STX zp', '88 DEY imp', '8A TXA imp', '8C STY abs', '8D STA abs', '8E STX abs',
  '90 BCC rel', '91 STA izy', '94 STY zpx', '95 STA zpx', '96 STX zpy', '98 TYA imp', '99 STA aby', '9A TXS imp', '9D STA abx',
  'A0 LDY imm', 'A1 LDA izx', 'A2 LDX imm', 'A4 LDY zp', 'A5 LDA zp', 'A6 LDX zp', 'A8 TAY imp', 'A9 LDA imm', 'AA TAX imp', 'AC LDY abs', 'AD LDA abs', 'AE LDX abs',
  'B0 BCS rel', 'B1 LDA izy', 'B4 LDY zpx', 'B5 LDA zpx', 'B6 LDX zpy', 'B8 CLV imp', 'B9 LDA aby', 'BA TSX imp', 'BC LDY abx', 'BD LDA abx', 'BE LDX aby',
  'C0 CPY imm', 'C1 CMP izx', 'C4 CPY zp', 'C5 CMP zp', 'C6 DEC zp', 'C8 INY imp', 'C9 CMP imm', 'CA DEX imp', 'CC CPY abs', 'CD CMP abs', 'CE DEC abs',
  'D0 BNE rel', 'D1 CMP izy', 'D5 CMP zpx', 'D6 DEC zpx', 'D8 CLD imp', 'D9 CMP aby', 'DD CMP abx', 'DE DEC abx',
  'E0 CPX imm', 'E1 SBC izx', 'E4 CPX zp', 'E5 SBC zp', 'E6 INC zp', 'E8 INX imp', 'E9 SBC imm', 'EA NOP imp', 'EC CPX abs', 'ED SBC abs', 'EE INC abs',
  'F0 BEQ rel', 'F1 SBC izy', 'F5 SBC zpx', 'F6 INC zpx', 'F8 SED imp', 'F9 SBC aby', 'FD SBC abx', 'FE INC abx',
];
def.forEach(d => {
  const [op, name, mode] = d.split(' ');
  T[parseInt(op, 16)] = { name, mode };
});

const SIZES = { imp: 1, acc: 1, imm: 2, zp: 2, zpx: 2, zpy: 2, izx: 2, izy: 2, rel: 2, abs: 3, abx: 3, aby: 3, ind: 3 };

function format(addr, op) {
  const b = bytes;
  const pc = addr;
  const info = T[op] || { name: '.byte', mode: 'raw' };
  let txt;
  if (info.mode === 'raw') {
    txt = '.byte $' + op.toString(16).toUpperCase().padStart(2, '0');
  } else if (info.mode === 'imp' || info.mode === 'acc') {
    txt = info.name;
  } else if (info.mode === 'imm') { txt = info.name + ' #$' + b[pc+1].toString(16).toUpperCase(); }
  else if (info.mode === 'zp') { txt = info.name + ' $' + b[pc+1].toString(16).toUpperCase(); }
  else if (info.mode === 'zpx') { txt = info.name + ' $' + b[pc+1].toString(16).toUpperCase() + ',X'; }
  else if (info.mode === 'zpy') { txt = info.name + ' $' + b[pc+1].toString(16).toUpperCase() + ',Y'; }
  else if (info.mode === 'izx') { txt = info.name + ' ($' + b[pc+1].toString(16).toUpperCase() + ',X)'; }
  else if (info.mode === 'izy') { txt = info.name + ' ($' + b[pc+1].toString(16).toUpperCase() + '),Y'; }
  else if (info.mode === 'abs') { txt = info.name + ' $' + (b[pc+2]*256 + b[pc+1]).toString(16).toUpperCase().padStart(4,'0'); }
  else if (info.mode === 'abx') { txt = info.name + ' $' + (b[pc+2]*256 + b[pc+1]).toString(16).toUpperCase().padStart(4,'0') + ',X'; }
  else if (info.mode === 'aby') { txt = info.name + ' $' + (b[pc+2]*256 + b[pc+1]).toString(16).toUpperCase().padStart(4,'0') + ',Y'; }
  else if (info.mode === 'ind') { txt = info.name + ' ($' + (b[pc+2]*256 + b[pc+1]).toString(16).toUpperCase().padStart(4,'0') + ')'; }
  else if (info.mode === 'rel') {
    const off = b[pc+1] >= 0x80 ? b[pc+1] - 0x100 : b[pc+1];
    const target = (pc + 2 + off) & 0xFFFF;
    txt = info.name + ' $' + target.toString(16).toUpperCase().padStart(4,'0');
  }
  return txt;
}

// decode from 0x4C0 to 0x7FA
const START = 0x4C0;
const END = 0x7FA;
let out = [];
for (let pc = START; pc < END; ) {
  const op = bytes[pc];
  const info = T[op];
  const size = info ? (SIZES[info.mode] || 1) : 1;
  let line = (0xA000 + pc).toString(16).toUpperCase() + ': ';
  if (pc === 0x4C0) line += ';; === [0] $A4C0 === ';
  if (pc === 0x559) line += ';; === [1] $A559 === ';
  if (pc === 0x57B) line += ';; === [2] $A57B === ';
  if (pc === 0x581) line += ';; === [3] $A581 === ';
  if (pc === 0x5A2) line += ';; === [4] $A5A2 === ';
  if (pc === 0x5A8) line += ';; === [5] $A5A8 === ';
  if (pc === 0x5B0) line += ';; === [6] $A5B0 === ';
  if (pc === 0x5B8) line += ';; === [7] $A5B8 === ';
  if (pc === 0x5BF) line += ';; === [8] $A5BF === ';
  if (pc === 0x5CD) line += ';; === [9] $A5CD === ';
  if (pc === 0x5DB) line += ';; === [10] $A5DB === ';
  if (pc === 0x5E8) line += ';; === [11] $A5E8 === ';
  if (pc === 0x602) line += ';; === [12] $A602 === ';
  if (pc === 0x61C) line += ';; === [13] $A61C === ';
  if (pc === 0x629) line += ';; === [14] $A629 === ';
  if (pc === 0x650) line += ';; === [15] $A650 === ';
  if (pc === 0x69C) line += ';; === [16] $A69C === ';
  if (pc === 0x77A) line += ';; === [17] $A77A === ';
  if (pc === 0x782) line += ';; === [18] $A782 === ';
  if (pc === 0x78D) line += ';; === [19] $A78D === ';
  if (pc === 0x7BD) line += ';; === [20] $A7BD === ';
  if (pc === 0x7CE) line += ';; === [21] $A7CE === ';
  if (pc === 0x7D6) line += ';; === [22] $A7D6 === ';
  if (pc === 0x7FA) line += ';; === [23] $A7FA === ';
  const bytesTxt = [];
  for (let i = 0; i < size; i++) bytesTxt.push(bytes[pc+i].toString(16).toUpperCase().padStart(2,'0'));
  line += bytesTxt.join(' ') + '   ' + format(pc, op);
  out.push(line);
  pc += size;
}
fs.writeFileSync(path.join(__dirname, '_handler_disasm.txt'), out.join('\n'));
console.log('done, lines=' + out.length);
