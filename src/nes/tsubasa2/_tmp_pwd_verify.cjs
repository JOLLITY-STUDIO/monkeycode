// 核对 bank02 密码相关表 vs ROM 原始字节
const fs = require('fs');
const path = require('path');
const romPath = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const rom = fs.readFileSync(romPath);
console.log('ROM size:', rom.length, '0x' + rom.length.toString(16));
// PRG banks at offset bankIdx*0x2000
const BANK02_OFF = 2 * 0x2000;
function byte(addr) { return rom[BANK02_OFF + (addr - 0x8000)]; }
function hex(b) { return '0x' + (b & 0xff).toString(16).toUpperCase().padStart(2, '0'); }
function dump(start, end, label) {
  console.log(`\n=== ${label} $${start.toString(16).toUpperCase()}-$${end.toString(16).toUpperCase()} ===`);
  let line = '';
  for (let a = start; a <= end; a++) {
    line += hex(byte(a)) + ' ';
    if ((a - start + 1) % 16 === 0) { console.log('$' + a.toString(16).toUpperCase().padStart(4, '0') + ': ' + line.trim()); line = ''; }
  }
  if (line.trim()) console.log('$' + (end + 1).toString(16).toUpperCase().padStart(4, '0') + ': ' + line.trim());
}

// 1. 密码解码增量表区域 $8ADF-$8AEE (PASSWORD_POS_INC_LO/HI)
dump(0x8AD0, 0x8B00, 'PASSWORD_POS_INC area');

// 2. 续关表 $8A97-$8ADF (PASSWORD_CONTINUE_TABLE)
dump(0x8A80, 0x8AE0, 'PASSWORD_CONTINUE_TABLE area');

// 3. 等级调节表 $AB1F 段 (bank02 $8B1F)
dump(0x8B00, 0x8B70, 'LEVEL_ADJ area ($AB1F)');

// 4. 反汇编 $8338-$83E0 (密码解码后续分支)
console.log('\n=== disasm $8338-$83E0 ===');
{
  const ops = { 0xa9: 'LDA #', 0x8d: 'STA abs', 0xad: 'LDA abs', 0xa0: 'LDY #', 0x84: 'STY zp', 0x8c: 'STY abs', 0x20: 'JSR ', 0x60: 'RTS', 0x4c: 'JMP ', 0x88: 'DEY', 0xd0: 'BNE ', 0xf0: 'BEQ ', 0x30: 'BMI ', 0x10: 'BPL ', 0xb0: 'BCS ', 0x90: 'BCC ', 0xc9: 'CMP #', 0x18: 'CLC', 0x38: 'SEC', 0x69: 'ADC #', 0xe9: 'SBC #', 0xaa: 'TAX', 0xa8: 'TAY', 0x8a: 'TXA', 0x98: 'TYA', 0x85: 'STA zp', 0xa5: 'LDA zp', 0x86: 'STX zp', 0xa6: 'LDX zp', 0xe0: 'CPX #', 0xe8: 'INX', 0xca: 'DEX', 0x9d: 'STA abs,X', 0xbd: 'LDA abs,X', 0xb9: 'LDA abs,Y', 0x99: 'STA abs,Y', 0x29: 'AND #', 0x4a: 'LSR A', 0x0a: 'ASL A', 0x6d: 'ADC abs', 0xee: 'INC abs', 0xce: 'DEC abs', 0x45: 'EOR zp', 0x65: 'ADC zp', 0x75: 'ADC zp,X', 0x71: 'ADC (zp),Y', 0x91: 'STA (zp),Y', 0xb1: 'LDA (zp),Y', 0xa1: 'LDA (zp,X)', 0xea: 'NOP', 0x2c: 'BIT abs', 0x24: 'BIT zp' };
  let a = 0x8338;
  while (a <= 0x83e0) {
    const op = byte(a);
    const mn = ops[op];
    if (!mn) { console.log('$' + a.toString(16).toUpperCase() + ': .byte ' + hex(op) + '  (unk)'); a++; continue; }
    if (op === 0xa9 || op === 0xc9 || op === 0xe0 || op === 0x69 || op === 0xe9 || op === 0x29 || op === 0xa0) {
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn + hex(byte(a + 1))); a += 2;
    } else if (op === 0x20 || op === 0x4c) {
      const lo = byte(a + 1), hi = byte(a + 2);
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn + '$' + ((hi << 8) | lo).toString(16).toUpperCase()); a += 3;
    } else if (op === 0x8d || op === 0xad || op === 0x99 || op === 0xb9 || op === 0xbd || op === 0x9d || op === 0xee || op === 0xce || op === 0x6d || op === 0x2c) {
      const lo = byte(a + 1), hi = byte(a + 2);
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn + ' $' + ((hi << 8) | lo).toString(16).toUpperCase()); a += 3;
    } else if (op === 0xd0 || op === 0xf0 || op === 0x30 || op === 0x10 || op === 0xb0 || op === 0x90) {
      const rel = byte(a + 1);
      const tgt = (a + 2 + (rel >= 0x80 ? rel - 0x100 : rel)) & 0xffff;
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn + '$' + tgt.toString(16).toUpperCase()); a += 2;
    } else if (op === 0x85 || op === 0xa5 || op === 0x86 || op === 0xa6 || op === 0x84 || op === 0x24 || op === 0x65 || op === 0x75 || op === 0x45) {
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn + ' $' + hex(byte(a + 1))); a += 2;
    } else {
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn); a += 1;
    }
  }
}

// 5. 反汇编 $8651-$86A0 (续关表用法)
console.log('\n=== disasm $8651-$86A0 ===');
{
  const ops = { 0xa9: 'LDA #', 0x8d: 'STA abs', 0xad: 'LDA abs', 0xa0: 'LDY #', 0x84: 'STY zp', 0x8c: 'STY abs', 0x20: 'JSR ', 0x60: 'RTS', 0x4c: 'JMP ', 0x88: 'DEY', 0xd0: 'BNE ', 0xf0: 'BEQ ', 0x30: 'BMI ', 0x10: 'BPL ', 0xb0: 'BCS ', 0x90: 'BCC ', 0xc9: 'CMP #', 0x18: 'CLC', 0x38: 'SEC', 0x69: 'ADC #', 0xe9: 'SBC #', 0xaa: 'TAX', 0xa8: 'TAY', 0x8a: 'TXA', 0x98: 'TYA', 0x85: 'STA zp', 0xa5: 'LDA zp', 0x86: 'STX zp', 0xa6: 'LDX zp', 0xe0: 'CPX #', 0xe8: 'INX', 0xca: 'DEX', 0x9d: 'STA abs,X', 0xbd: 'LDA abs,X', 0xb9: 'LDA abs,Y', 0x99: 'STA abs,Y', 0x29: 'AND #', 0x4a: 'LSR A', 0x0a: 'ASL A', 0x6d: 'ADC abs', 0xee: 'INC abs', 0xce: 'DEC abs', 0x45: 'EOR zp', 0x65: 'ADC zp', 0x75: 'ADC zp,X', 0x71: 'ADC (zp),Y', 0x91: 'STA (zp),Y', 0xb1: 'LDA (zp),Y', 0xa1: 'LDA (zp,X)', 0xea: 'NOP', 0x2c: 'BIT abs', 0x24: 'BIT zp' };
  let a = 0x8651;
  while (a <= 0x86a0) {
    const op = byte(a);
    const mn = ops[op];
    if (!mn) { console.log('$' + a.toString(16).toUpperCase() + ': .byte ' + hex(op) + '  (unk)'); a++; continue; }
    if (op === 0xa9 || op === 0xc9 || op === 0xe0 || op === 0x69 || op === 0xe9 || op === 0x29 || op === 0xa0) {
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn + hex(byte(a + 1))); a += 2;
    } else if (op === 0x20 || op === 0x4c) {
      const lo = byte(a + 1), hi = byte(a + 2);
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn + '$' + ((hi << 8) | lo).toString(16).toUpperCase()); a += 3;
    } else if (op === 0x8d || op === 0xad || op === 0x99 || op === 0xb9 || op === 0xbd || op === 0x9d || op === 0xee || op === 0xce || op === 0x6d || op === 0x2c) {
      const lo = byte(a + 1), hi = byte(a + 2);
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn + ' $' + ((hi << 8) | lo).toString(16).toUpperCase()); a += 3;
    } else if (op === 0xd0 || op === 0xf0 || op === 0x30 || op === 0x10 || op === 0xb0 || op === 0x90) {
      const rel = byte(a + 1);
      const tgt = (a + 2 + (rel >= 0x80 ? rel - 0x100 : rel)) & 0xffff;
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn + '$' + tgt.toString(16).toUpperCase()); a += 2;
    } else if (op === 0x85 || op === 0xa5 || op === 0x86 || op === 0xa6 || op === 0x84 || op === 0x24 || op === 0x65 || op === 0x75 || op === 0x45) {
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn + ' $' + hex(byte(a + 1))); a += 2;
    } else {
      console.log('$' + a.toString(16).toUpperCase() + ': ' + mn); a += 1;
    }
  }
}
