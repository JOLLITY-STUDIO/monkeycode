// 反汇编 bank2 场景 14-23 正文与辅助例程
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
function cpu2prg(cpu) { return cpu - 0xA000 + 0x4000; }
const ops = new Map([
  [0xa9, 'LDA #$'], [0xa5, 'LDA $'], [0x85, 'STA $'], [0x86, 'STX $'], [0x84, 'STY $'],
  [0x8d, 'STA abs$'], [0xad, 'LDA abs$'], [0xae, 'LDX abs$'], [0xa6, 'LDX $'],
  [0xa0, 'LDY #$'], [0xa4, 'LDY $'], [0xc8, 'INY'], [0xca, 'DEX'], [0xe8, 'INX'],
  [0x20, 'JSR $'], [0x4c, 'JMP $'], [0x60, 'RTS'], [0x4a, 'LSR'], [0x66, 'ROR $'],
  [0x2c, 'BIT $'], [0x30, 'BMI +'], [0xd0, 'BNE +'], [0xf0, 'BEQ +'], [0x90, 'BCC +'],
  [0xb0, 'BCS +'], [0x10, 'BPL +'], [0x70, 'BVS +'], [0xaa, 'TAX'], [0xa8, 'TAY'],
  [0x8a, 'TXA'], [0x98, 'TYA'], [0x48, 'PHA'], [0x68, 'PLA'], [0xea, 'NOP'],
  [0x38, 'SEC'], [0x18, 'CLC'], [0xe6, 'INC $'], [0xc6, 'DEC $'], [0x09, 'ORA #$'],
  [0x29, 'AND #$'], [0x49, 'EOR #$'], [0x0a, 'ASL'], [0x65, 'ADC $'], [0xe5, 'SBC $'],
  [0x69, 'ADC #$'], [0xe9, 'SBC #$'], [0xc9, 'CMP #$'], [0x9d, 'STA abs,X$'],
  [0xbd, 'LDA abs,X$'], [0xb9, 'LDA abs,Y$'], [0x99, 'STA abs,Y$'], [0x96, 'STX $,Y'],
  [0x81, 'STA ($,X)'], [0x91, 'STA ($),Y'], [0xb1, 'LDA ($),Y'], [0xa1, 'LDA ($,X)'],
  [0xb5, 'LDA $,X'], [0x95, 'STA $,X'], [0xd9, 'CMP abs,Y$'], [0x79, 'ADC abs,Y$'],
  [0x75, 'ADC $,X'], [0x7d, 'ADC abs,X$'], [0xf9, 'SBC abs,Y$'], [0xdd, 'CMP abs,X$'],
]);
function disasm(cpuStart, len) {
  let p = cpuStart; const end = cpuStart + len; const out = [];
  while (p < end) {
    const i = cpu2prg(p); const b = prg[i]; const op = ops.get(b);
    if (op === undefined) { out.push('$' + p.toString(16).toUpperCase() + ' .byte $' + b.toString(16).padStart(2, '0')); p++; continue; }
    if (b === 0xa9 || b === 0xa0 || b === 0x09 || b === 0x29 || b === 0x49 || b === 0x69 || b === 0xe9 || b === 0xc9) {
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + prg[i + 1].toString(16).padStart(2, '0')); p += 2;
    } else if (b === 0x20 || b === 0x4c) {
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + '$' + (prg[i + 1] | (prg[i + 2] << 8)).toString(16).padStart(4, '0').toUpperCase()); p += 3;
    } else if (b === 0x30 || b === 0xd0 || b === 0xf0 || b === 0x90 || b === 0xb0 || b === 0x10 || b === 0x70) {
      const rel = prg[i + 1]; const tgt = p + 2 + (rel > 127 ? rel - 256 : rel);
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + rel.toString(16).padStart(2, '0') + ' -> $' + tgt.toString(16).toUpperCase()); p += 2;
    } else if (b === 0xa5 || b === 0x85 || b === 0x86 || b === 0x84 || b === 0xa6 || b === 0xa4 || b === 0x66 || b === 0x2c || b === 0xe6 || b === 0xc6 || b === 0x65 || b === 0xe5 || b === 0x96 || b === 0xb5 || b === 0x95 || b === 0x75 || b === 0xd5 || b === 0xf5) {
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + prg[i + 1].toString(16).padStart(2, '0')); p += 2;
    } else if (b === 0x8d || b === 0xad || b === 0xae || b === 0x9d || b === 0xbd || b === 0xb9 || b === 0x99 || b === 0xd9 || b === 0x79 || b === 0x7d || b === 0xf9 || b === 0xdd) {
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + (prg[i + 1] | (prg[i + 2] << 8)).toString(16).padStart(4, '0').toUpperCase()); p += 3;
    } else if (b === 0x81 || b === 0x91 || b === 0xb1 || b === 0xa1) {
      out.push('$' + p.toString(16).toUpperCase() + ' ' + op + prg[i + 1].toString(16).padStart(2, '0')); p += 2;
    } else { out.push('$' + p.toString(16).toUpperCase() + ' ' + op); p++; }
  }
  return out.join('\n');
}
const REGIONS = [
  [0xa62a, 0xa651 - 0xa62a, 'scene14 $A62A'],
  [0xa651, 0xa69d - 0xa651, 'scene15 $A651'],
  [0xa69d, 0xa77b - 0xa69d, 'scene16 $A69D'],
  [0xa72c, 0xa767 - 0xa72c, 'helper $A72C sprite mover'],
  [0xa767, 0xa77b - 0xa767, 'helper $A767 copy'],
  [0xa77b, 0xa783 - 0xa77b, 'scene17 $A77B'],
  [0xa783, 0xa78e - 0xa783, 'scene18 $A783'],
  [0xa78e, 0xa7be - 0xa78e, 'scene19 $A78E'],
  [0xa7be, 0xa7cf - 0xa7be, 'scene20 $A7BE'],
  [0xa7cf, 0xa7d7 - 0xa7cf, 'scene21 $A7CF'],
  [0xa7d7, 0xa7fb - 0xa7d7, 'scene22 $A7D7'],
  [0xa7fb, 0xa82f - 0xa7fb, 'scene23 $A7FB'],
  [0xa82f, 0xa855 - 0xa82f, 'helper $A82F sprite loader'],
];
for (const [start, len, label] of REGIONS) {
  console.log('\n===== ' + label + ' =====');
  console.log(disasm(start, len));
}
