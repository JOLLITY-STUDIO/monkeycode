// 反汇编: bank0 $8807 (JSR $A212 -> dispatcher) 调用者上下文 + bank2 $A98A (JSR $A86E) 上下文
const fs = require('fs');
const path = require('path');

const romPath = process.argv[2] || 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = fs.readFileSync(path.resolve(__dirname, '..', romPath));
const PRG_BANKS = rom[4];
const prg = rom.slice(16, 16 + PRG_BANKS * 0x4000);

function cpu2prg(cpu) {
  if (cpu >= 0x8000 && cpu < 0xa000) return cpu - 0x8000;
  if (cpu >= 0xa000 && cpu < 0xc000) return cpu - 0xa000 + 0x4000;
  return -1;
}

const OPS = {};
const ops = [
  ['00','BRK'],['01','ORA (zp,X)'],['05','ORA zp'],['06','ASL zp'],['08','PHP'],['09','ORA #$'],['0A','ASL A'],['0D','ORA abs'],['0E','ASL abs'],
  ['10','BPL $'],['11','ORA (zp),Y'],['15','ORA zp,X'],['16','ASL zp,X'],['18','CLC'],['19','ORA abs,Y'],['1D','ORA abs,X'],['1E','ASL abs,X'],
  ['20','JSR $'],['21','AND (zp,X)'],['24','BIT zp'],['25','AND zp'],['26','ROL zp'],['28','PLP'],['29','AND #$'],['2A','ROL A'],['2C','BIT abs'],['2D','AND abs'],['2E','ROL abs'],
  ['30','BMI $'],['31','AND (zp),Y'],['35','AND zp,X'],['36','ROL zp,X'],['38','SEC'],['39','AND abs,Y'],['3D','AND abs,X'],['3E','ROL abs,X'],
  ['40','RTI'],['41','EOR (zp,X)'],['45','EOR zp'],['46','LSR zp'],['48','PHA'],['49','EOR #$'],['4A','LSR A'],['4C','JMP $'],['4D','EOR abs'],['4E','LSR abs'],
  ['50','BVC $'],['51','EOR (zp),Y'],['55','EOR zp,X'],['56','LSR zp,X'],['58','CLI'],['59','EOR abs,Y'],['5D','EOR abs,X'],['5E','LSR abs,X'],
  ['60','RTS'],['61','ADC (zp,X)'],['65','ADC zp'],['66','ROR zp'],['68','PLA'],['69','ADC #$'],['6A','ROR A'],['6C','JMP ($)'],['6D','ADC abs'],['6E','ROR abs'],
  ['70','BVS $'],['71','ADC (zp),Y'],['75','ADC zp,X'],['76','ROR zp,X'],['78','SEI'],['79','ADC abs,Y'],['7D','ADC abs,X'],['7E','ROR abs,X'],
  ['81','STA (zp,X)'],['84','STY zp'],['85','STA zp'],['86','STX zp'],['88','DEY'],['8A','TXA'],['8C','STY abs'],['8D','STA abs'],['8E','STX abs'],
  ['90','BCC $'],['91','STA (zp),Y'],['94','STY zp,X'],['95','STA zp,X'],['96','STX zp,Y'],['98','TYA'],['99','STA abs,Y'],['9A','TXS'],['9D','STA abs,X'],
  ['A0','LDY #$'],['A1','LDA (zp,X)'],['A2','LDX #$'],['A4','LDY zp'],['A5','LDA zp'],['A6','LDX zp'],['A8','TAY'],['A9','LDA #$'],['AA','TAX'],['AC','LDY abs'],['AD','LDA abs'],['AE','LDX abs'],
  ['B0','BCS $'],['B1','LDA (zp),Y'],['B4','LDY zp,X'],['B5','LDA zp,X'],['B6','LDX zp,Y'],['B8','CLV'],['B9','LDA abs,Y'],['BA','TSX'],['BC','LDY abs,X'],['BD','LDA abs,X'],['BE','LDX abs,Y'],
  ['C0','CPY #$'],['C1','CMP (zp,X)'],['C4','CPY zp'],['C5','CMP zp'],['C6','DEC zp'],['C8','INY'],['C9','CMP #$'],['CA','DEX'],['CC','CPY abs'],['CD','CMP abs'],['CE','DEC abs'],
  ['D0','BNE $'],['D1','CMP (zp),Y'],['D5','CMP zp,X'],['D6','DEC zp,X'],['D8','CLD'],['D9','CMP abs,Y'],['DD','CMP abs,X'],['DE','DEC abs,X'],
  ['E0','CPX #$'],['E1','SBC (zp,X)'],['E4','CPX zp'],['E5','SBC zp'],['E6','INC zp'],['E8','INX'],['E9','SBC #$'],['EA','NOP'],['EC','CPX abs'],['ED','SBC abs'],['EE','INC abs'],
  ['F0','BEQ $'],['F1','SBC (zp),X'],['F5','SBC zp,X'],['F6','SBC zp,X'],['F8','SED'],['F9','SBC abs,Y'],['FD','SBC abs,X'],['FE','INC abs,X'],
];
for (const [code, name] of ops) OPS[parseInt(code, 16)] = name;

function disasm(start, end, label) {
  console.log(`\n===== ${label} ($${start.toString(16).toUpperCase()}-$${end.toString(16).toUpperCase()}) =====`);
  let cpu = start;
  while (cpu < end) {
    const idx = cpu2prg(cpu);
    if (idx < 0) { console.log(`  $${cpu.toString(16).toUpperCase()}: OUT-OF-RANGE`); break; }
    const op = prg[idx];
    const name = OPS[op] || '??';
    const isBranch = op === 0x10 || op === 0x30 || op === 0x50 || op === 0x70 || op === 0x90 || op === 0xB0 || op === 0xD0 || op === 0xF0;
    let line = `  $${cpu.toString(16).toUpperCase()}: ${name} `;
    let extra = 1;
    if (name.includes('#$')) { line += `#$${prg[idx+1].toString(16).padStart(2,'0').toUpperCase()}`; extra = 2; }
    else if (name.includes('abs')) { const a = prg[idx+1] | (prg[idx+2]<<8); line += `$${a.toString(16).padStart(4,'0').toUpperCase()}`; extra = 3; }
    else if (name.includes('zp')) { line += `$${prg[idx+1].toString(16).padStart(2,'0').toUpperCase()}`; extra = 2; }
    else if (name.includes('JMP') || name.includes('JSR')) { const a = prg[idx+1] | (prg[idx+2]<<8); line += `$${a.toString(16).padStart(4,'0').toUpperCase()}`; extra = 3; }
    else if (isBranch) { const off = (prg[idx+1] << 24) >> 24; const t = cpu + 2 + off; line += `$${t.toString(16).padStart(4,'0').toUpperCase()}`; extra = 2; }
    else if (name.includes('(zp')) { line += `($${prg[idx+1].toString(16).padStart(2,'0').toUpperCase()}),Y`; extra = 2; }
    console.log(line);
    cpu += extra;
  }
}

disasm(0x87E0, 0x8830, 'bank0: $8807 JSR $A212 调用者');
disasm(0xA960, 0xA9B0, 'bank2: $A98A JSR $A86E 调用者');
// 关键: dispatcher $A212 = JMP $A484, 看 $A200-$A230 的完整 hub 区域
disasm(0xA200, 0xA260, 'bank2: hub $A200-$A260');
