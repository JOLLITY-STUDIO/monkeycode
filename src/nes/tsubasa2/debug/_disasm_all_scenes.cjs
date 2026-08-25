// 反汇编 bank2 $A484-$A855（派发器 + 24 场景 + 辅助例程），完整操作码表
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
const b2 = (cpu) => 0x4000 + (cpu - 0x8000); // bank2 16KB
const ops = new Map([
  [0xa9, 'LDA #$'], [0xa5, 'LDA $'], [0x85, 'STA $'], [0x86, 'STX $'], [0x84, 'STY $'],
  [0x8d, 'STA abs$'], [0xad, 'LDA abs$'], [0xae, 'LDX abs$'], [0xa6, 'LDX $'], [0xa2, 'LDX #$'],
  [0xa0, 'LDY #$'], [0xa4, 'LDY $'], [0xc8, 'INY'], [0xca, 'DEX'], [0xe8, 'INX'], [0x88, 'DEY'],
  [0x20, 'JSR $'], [0x4c, 'JMP $'], [0x60, 'RTS'], [0x4a, 'LSR'], [0x66, 'ROR $'], [0x0a, 'ASL'],
  [0x2c, 'BIT $'], [0x30, 'BMI +'], [0xd0, 'BNE +'], [0xf0, 'BEQ +'], [0x90, 'BCC +'],
  [0xb0, 'BCS +'], [0x10, 'BPL +'], [0x70, 'BVS +'], [0x50, 'BVC +'], [0xaa, 'TAX'], [0xa8, 'TAY'],
  [0x8a, 'TXA'], [0x98, 'TYA'], [0x48, 'PHA'], [0x68, 'PLA'], [0xea, 'NOP'],
  [0x38, 'SEC'], [0x18, 'CLC'], [0xe6, 'INC $'], [0xc6, 'DEC $'], [0x09, 'ORA #$'],
  [0x29, 'AND #$'], [0x49, 'EOR #$'], [0x65, 'ADC $'], [0xe5, 'SBC $'],
  [0x69, 'ADC #$'], [0xe9, 'SBC #$'], [0xc9, 'CMP #$'], [0xc0, 'CPY #$'], [0xe0, 'CPX #$'],
  [0xe4, 'CPX $'], [0xc4, 'CPY $'], [0xc5, 'CMP $'], [0x25, 'AND $'], [0x05, 'ORA $'], [0x24, 'BIT $'],
  [0x9d, 'STA abs,X$'], [0xbd, 'LDA abs,X$'], [0xb9, 'LDA abs,Y$'], [0x99, 'STA abs,Y$'], [0x96, 'STX $,Y'],
  [0x81, 'STA ($,X)'], [0x91, 'STA ($),Y'], [0xb1, 'LDA ($),Y'], [0xa1, 'LDA ($,X)'],
  [0xb5, 'LDA $,X'], [0x95, 'STA $,X'], [0xd9, 'CMP abs,Y$'], [0x79, 'ADC abs,Y$'],
  [0x75, 'ADC $,X'], [0x7d, 'ADC abs,X$'], [0xf9, 'SBC abs,Y$'], [0xdd, 'CMP abs,X$'],
  [0xd5, 'CMP $,X'], [0xf5, 'SBC $,X'], [0xec, 'CPX abs$'], [0xcc, 'CPY abs$'],
  [0x7a, '???'], [0x7b, '???'],
]);
function disasm(cpuStart, len) {
  let p = cpuStart; const end = cpuStart + len; const out = [];
  while (p < end) {
    const i = b2(p); const b = prg[i]; const op = ops.get(b);
    if (op === undefined) { out.push('$' + p.toString(16).toUpperCase() + ' .byte $' + b.toString(16).padStart(2, '0')); p++; continue; }
    const imm = [0xa9, 0xa0, 0xa2, 0x09, 0x29, 0x49, 0x69, 0xe9, 0xc9, 0xc0, 0xe0];
    if (imm.includes(b)) {
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + prg[i + 1].toString(16).padStart(2, '0')); p += 2;
    } else if (b === 0x20 || b === 0x4c) {
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + '$' + (prg[i + 1] | (prg[i + 2] << 8)).toString(16).padStart(4, '0').toUpperCase()); p += 3;
    } else if ([0x30, 0xd0, 0xf0, 0x90, 0xb0, 0x10, 0x70, 0x50].includes(b)) {
      const rel = prg[i + 1]; const tgt = p + 2 + (rel > 127 ? rel - 256 : rel);
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + rel.toString(16).padStart(2, '0') + ' -> $' + tgt.toString(16).toUpperCase()); p += 2;
    } else if ([0xa5, 0x85, 0x86, 0x84, 0xa6, 0xa4, 0x66, 0x2c, 0xe6, 0xc6, 0x65, 0xe5, 0x96, 0xb5, 0x95, 0x75, 0xd5, 0xf5, 0x25, 0x05, 0x24, 0xc5, 0xe4, 0xc4].includes(b)) {
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + prg[i + 1].toString(16).padStart(2, '0')); p += 2;
    } else if ([0x8d, 0xad, 0xae, 0x9d, 0xbd, 0xb9, 0x99, 0xd9, 0x79, 0x7d, 0xf9, 0xdd, 0xec, 0xcc].includes(b)) {
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + (prg[i + 1] | (prg[i + 2] << 8)).toString(16).padStart(4, '0').toUpperCase()); p += 3;
    } else if ([0x81, 0x91, 0xb1, 0xa1].includes(b)) {
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + prg[i + 1].toString(16).padStart(2, '0')); p += 2;
    } else { out.push('$' + p.toString(16).toUpperCase() + ' ' + op); p++; }
  }
  return out.join('\n');
}
const REGIONS = [
  [0xa484, 0x40, 'dispatcher $A484 + vector table'],
  [0xa4c1, 0x99, 'scene0 $A4C1'],
  [0xa55a, 0x22, 'scene1 $A55A'],
  [0xa57c, 0x06, 'scene2 $A57C'],
  [0xa582, 0x21, 'scene3 $A582'],
  [0xa5a3, 0x06, 'scene4 $A5A3'],
  [0xa5a9, 0x08, 'scene5 $A5A9'],
  [0xa5b1, 0x08, 'scene6 $A5B1'],
  [0xa5b9, 0x07, 'scene7 $A5B9'],
  [0xa5c0, 0x0e, 'scene8 $A5C0'],
  [0xa5ce, 0x0e, 'scene9 $A5CE'],
  [0xa5dc, 0x0d, 'scene10 $A5DC'],
  [0xa5e9, 0x1a, 'scene11 $A5E9'],
  [0xa603, 0x1a, 'scene12 $A603'],
  [0xa61d, 0x0d, 'scene13 $A61D'],
  [0xa855, 0x19, 'scene-entry A $A855'],
  [0xa86e, 0x42, 'scene-entry B roster $A86E'],
  [0xa8ce, 0x30, 'oam dma $A8CE'],
  [0xa8fe, 0x20, 'scene enter $A8FE'],
];
for (const [start, len, label] of REGIONS) {
  console.log('\n===== ' + label + ' =====');
  console.log(disasm(start, len));
}
