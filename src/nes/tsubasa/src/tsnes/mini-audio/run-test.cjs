#!/usr/bin/env node
/**
 * mini-audio/run-test.cjs
 * 
 * Simple node.js runner that tests audio from bank12 PRG-ROM.
 * Uses CPU emulation to execute bank12 code and PAPU to generate audio.
 * 
 * Run: node mini-audio/run-test.cjs
 */

const path = require('path');
const fs = require('fs');

try {
  // Load bank12 data from pre-generated JSON
  const bank12 = require('./bank12-data.json');

  console.log('Bank12 loaded from JSON');
  console.log('Bank12 length:', bank12.length);
  
  if (Array.isArray(bank12) && bank12.length > 0) {
    console.log('\nBank12 first 32 bytes:');
    for (let i = 0; i < 32; i++) {
      const val = typeof bank12[i] === 'number' ? bank12[i] : 0;
      process.stdout.write(val.toString(16).padStart(2, '0') + ' ');
      if ((i + 1) % 16 === 0) console.log('');
    }
    
    // Quick analysis of code at $8000
    console.log('\n=== Disasm at $8000 ===');
    let addr = 0;
    while (addr < Math.min(0x80, bank12.length)) {
      let op = bank12[addr];
      if (typeof op !== 'number') { addr++; continue; }
      let len = 1;
      let mnem = '???';
      
      const MNEMS = {
        0xA2: ['LDX #', 2], 0xA9: ['LDA #', 2], 0xA0: ['LDY #', 2],
        0xBC: ['LDY $,X', 3], 0xBD: ['LDA $,X', 3], 0x9D: ['STA $,X', 3],
        0x8D: ['STA $', 3], 0x8C: ['STY $', 3], 0x85: ['STA $', 2],
        0x20: ['JSR $', 3], 0x4C: ['JMP $', 3], 0x60: ['RTS', 1],
        0xF0: ['BEQ $', 2], 0xD0: ['BNE $', 2], 0xB0: ['BCS $', 2],
        0x90: ['BCC $', 2], 0xC0: ['CPY #', 2], 0xC9: ['CMP #', 2],
        0xCA: ['DEX', 1], 0xC8: ['INY', 1], 0xA5: ['LDA $', 2],
        0xA6: ['LDX $', 2], 0x86: ['STX $', 2], 0x84: ['STY $', 2],
        0x18: ['CLC', 1], 0x38: ['SEC', 1], 0x09: ['ORA #', 2],
        0x29: ['AND #', 2], 0x25: ['AND $', 2], 0x05: ['ORA $', 2],
        0x45: ['EOR $', 2], 0x65: ['ADC $', 2], 0x69: ['ADC #', 2],
        0x48: ['PHA', 1], 0x68: ['PLA', 1], 0xAA: ['TAX', 1],
        0x10: ['BPL $', 2], 0x30: ['BMI $', 2], 0x4A: ['LSR A', 1],
        0x0A: ['ASL A', 1], 0xB1: ['LDA ($),Y', 2], 0x91: ['STA ($),Y', 2],
        0xC6: ['DEC $', 2], 0xE6: ['INC $', 2], 0x06: ['ASL $', 2],
        0x2A: ['ROL A', 1], 0x6A: ['ROR A', 1], 0xDE: ['DEC $,X', 3],
        0xFE: ['INC $,X', 3], 0xBE: ['LDX $,Y', 3], 0xCE: ['DEC $', 3],
        0xEE: ['INC $', 3], 0x2C: ['BIT $', 3], 0x24: ['BIT $', 2],
        0xAE: ['LDX $', 3], 0xAC: ['LDY $', 3], 0xAD: ['LDA $', 3],
        0x2D: ['AND $', 3], 0x4D: ['EOR $', 3], 0x0D: ['ORA $', 3],
        0x2E: ['ROL $', 3], 0x4E: ['LSR $', 3], 0x6D: ['ADC $', 3],
        0xED: ['SBC $', 3], 0xCD: ['CMP $', 3], 0xEC: ['CPX $', 3],
        0xCC: ['CPY $', 3], 0x6E: ['ROR $', 3], 0x0E: ['ASL $', 3],
        0x40: ['RTI', 1], 0x08: ['PHP', 1], 0x28: ['PLP', 1],
        0xBA: ['TSX', 1], 0x9A: ['TXS', 1], 0x98: ['TYA', 1],
        0x8A: ['TXA', 1], 0xE8: ['INX', 1], 0x88: ['DEY', 1],
        0x95: ['STA $,X', 2], 0xB5: ['LDA $,X', 2], 0x94: ['STY $,X', 2],
        0x99: ['STA $,Y', 3], 0xB9: ['LDA $,Y', 3], 0xBE: ['LDX $,Y', 3],
        0x9E: ['STX $,Y', 3],
      };
      
      let info = MNEMS[op];
      if (info) {
        mnem = info[0];
        len = info[1];
      }
      
      let bytes = bank12.slice(addr, addr + len).map(function(b) {
        return (typeof b === 'number' ? b : 0).toString(16).padStart(2, '0');
      }).join(' ');
      let comment = '';
      if (mnem.indexOf('$') >= 0 && len > 1) {
        let target = 0;
        let b1 = typeof bank12[addr + 1] === 'number' ? bank12[addr + 1] : 0;
        if (len === 2) target = b1;
        else if (len === 3) {
          let b2 = typeof bank12[addr + 2] === 'number' ? bank12[addr + 2] : 0;
          target = b1 | (b2 << 8);
        }
        comment = ' ; $' + target.toString(16).padStart(4, '0');
      }
      console.log(('$' + (0x8000 + addr).toString(16).padStart(4, '0') + ': ' + bytes).padEnd(24) + mnem + comment);
      addr += len;
    }
    
    // Show data tables
    console.log('\n=== Key data tables (offsets from $8000) ===');
    
    // Frequency table at $870D (bank12 offset $070D)
    console.log('\nFREQ_TBL at $870D:');
    for (let i = 0; i < 12; i++) {
      let off = 0x070D + i * 2;
      if (off + 1 < bank12.length) {
        let lo = typeof bank12[off] === 'number' ? bank12[off] : 0;
        let hi = typeof bank12[off + 1] === 'number' ? bank12[off + 1] : 0;
        console.log(('  [' + i.toString().padStart(2) + ']').padEnd(8) + '$' + ((hi << 8) | lo).toString(16).padStart(4));
      }
    }
    
    // Duration table at $8725 (bank12 offset $0725)
    console.log('\nDUR_TBL at $8725 (first 32):');
    for (let i = 0; i < 32; i++) {
      let off = 0x0725 + i;
      if (off < bank12.length) {
        let val = typeof bank12[off] === 'number' ? bank12[off] : 0;
        process.stdout.write(val.toString(16).padStart(2, '0') + ' ');
        if ((i + 1) % 16 === 0) console.log('');
      }
    }
    
    // SE pointer table at $8BDA (bank12 offset $0BDA)
    console.log('\n\nSE pointer table at $8BDA (first 31 entries):');
    for (let i = 0; i < 31; i++) {
      let off = 0x0BDA + i * 2;
      if (off + 1 < bank12.length) {
        let lo = typeof bank12[off] === 'number' ? bank12[off] : 0;
        let hi = typeof bank12[off + 1] === 'number' ? bank12[off + 1] : 0;
        let ptr = (hi << 8) | lo;
        console.log(('  SE $' + (0x30 + i).toString(16) + ':').padEnd(12) + '$' + ptr.toString(16).padStart(4, '0'));
      }
    }
    
    // Show SE $30 data
    console.log('\n=== SE $30 data ===');
    let sePtrLo = typeof bank12[0x0BDA] === 'number' ? bank12[0x0BDA] : 0;
    let sePtrHi = typeof bank12[0x0BDB] === 'number' ? bank12[0x0BDB] : 0;
    let sePtr = (sePtrHi << 8) | sePtrLo;
    console.log('SE $30 pointer: $' + sePtr.toString(16));
    let seOff = sePtr - 0x8000;
    if (seOff >= 0 && seOff < bank12.length) {
      console.log('SE $30 first 64 bytes:');
      for (let i = 0; i < 64 && seOff + i < bank12.length; i++) {
        let val = typeof bank12[seOff + i] === 'number' ? bank12[seOff + i] : 0;
        process.stdout.write(val.toString(16).padStart(2, '0') + ' ');
        if ((i + 1) % 16 === 0) console.log('');
      }
      console.log('');
    }
    
    // Also show SE $31 data
    console.log('\n=== SE $31 data ===');
    let se31Lo = typeof bank12[0x0BDC] === 'number' ? bank12[0x0BDC] : 0;
    let se31Hi = typeof bank12[0x0BDD] === 'number' ? bank12[0x0BDD] : 0;
    let se31Ptr = (se31Hi << 8) | se31Lo;
    console.log('SE $31 pointer: $' + se31Ptr.toString(16));
    let se31Off = se31Ptr - 0x8000;
    if (se31Off >= 0 && se31Off < bank12.length) {
      console.log('SE $31 first 64 bytes:');
      for (let i = 0; i < 64 && se31Off + i < bank12.length; i++) {
        let val = typeof bank12[se31Off + i] === 'number' ? bank12[se31Off + i] : 0;
        process.stdout.write(val.toString(16).padStart(2, '0') + ' ');
        if ((i + 1) % 16 === 0) console.log('');
      }
      console.log('');
    }

    // Find the init code around $8349
    console.log('\n=== Disasm around $8349 (SE init) ===');
    let initOff = 0x0349;
    for (let i = 0; i < 40 && initOff + i < bank12.length; i++) {
      let off = initOff + i;
      let val = typeof bank12[off] === 'number' ? bank12[off] : 0;
      process.stdout.write(val.toString(16).padStart(2, '0') + ' ');
      if ((i + 1) % 16 === 0) console.log('');
    }
    console.log('');

    // Find the per-frame update at $80BA
    console.log('\n=== Disasm around $80BA (per-frame update) ===');
    let updateOff = 0x00BA;
    for (let i = 0; i < 40 && updateOff + i < bank12.length; i++) {
      let off = updateOff + i;
      let val = typeof bank12[off] === 'number' ? bank12[off] : 0;
      process.stdout.write(val.toString(16).padStart(2, '0') + ' ');
      if ((i + 1) % 16 === 0) console.log('');
    }
    console.log('');
    
    // Show MMC3 bank switch writes in the code  
    console.log('\n=== MMC3 bank switch writes (STA $8000/8001) in bank12 ===');
    // Look for writes to $8000/$8001 in bank12 code
    // 8D 00 80 = STA $8000, 8D 01 80 = STA $8001
    for (let i = 0; i < bank12.length - 2; i++) {
      let b0 = typeof bank12[i] === 'number' ? bank12[i] : 0;
      let b1 = typeof bank12[i + 1] === 'number' ? bank12[i + 1] : 0;
      let b2 = typeof bank12[i + 2] === 'number' ? bank12[i + 2] : 0;
      if (b0 === 0x8D && b1 === 0x00 && b2 === 0x80) {
        console.log('  STA $8000 at bank offset $' + i.toString(16).padStart(4, '0') + ' (ROM $' + (0x8000 + i).toString(16) + ')');
      }
      if (b0 === 0x8D && b1 === 0x01 && b2 === 0x80) {
        console.log('  STA $8001 at bank offset $' + i.toString(16).padStart(4, '0') + ' (ROM $' + (0x8000 + i).toString(16) + ')');
      }
    }
    
    // Check vector area - what's at $BFF0-$BFFF?
    console.log('\n=== Last bytes at $BFF0-$BFFF ===');
    for (let i = 0x1FF0; i < bank12.length; i++) {
      let val = typeof bank12[i] === 'number' ? bank12[i] : 0;
      console.log(('  $' + (0x8000 + i).toString(16) + ':').padEnd(12) + '$' + val.toString(16).padStart(2, '0'));
    }

  } else {
    console.log('Bank12 data is not a valid array.');
    console.log('Module keys:', Object.keys(bank12Module));
    console.log('Data preview:', JSON.stringify(bank12Module).substring(0, 200));
  }
} catch (e) {
  console.error('Error loading bank12:', e.message);
  console.error('Stack:', e.stack);
}
