const fs = require('fs');

// Search all asm for LDA $02EC / STA $02EC etc
console.log('=== 搜索 $02EC 作为 RAM 地址引用 ===');
for (let b = 0; b <= 31; b++) {
  try {
    const s = fs.readFileSync('_tmp_bzk_out/bank_' + b.toString().padStart(2,'0') + '.asm', 'utf8');
    const lines = s.split('\n');
    for (let i = 0; i < lines.length; i++) {
      // Match instructions referencing $02EC as address (not label)
      if (/(LDA|STA|LDX|STX|LDY|STY|ADC|SBC|CMP|CPX|CPY|AND|ORA|EOR|INC|DEC|ASL|LSR|ROL|ROR|BIT)\s+\$02EC\b/.test(lines[i])) {
        console.log(`bank_${b.toString().padStart(2,'0')}.asm:${i+1}: ${lines[i]}`);
      }
    }
  } catch(e) {}
}

// Also search for the bytecode stream pattern: FF 07 04 (two-digit: 7, 4)
console.log('\n=== 搜索字节码模式 FF 07 04 (百位7, 十位4) ===');
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const h = rom.slice(0, 16);
const prgSize = h[4] * 16384;
for (let off = 16; off < 16 + prgSize - 2; off++) {
  if (rom[off] === 0xFF && rom[off+1] === 0x07 && rom[off+2] === 0x04) {
    let cpuOff = off - 16;
    console.log(`ROM 0x${off.toString(16)} (PRG 0x${cpuOff.toString(16)}): FF 07 04`);
  }
}

// Also search $EC, $02 separately as lo/hi byte pair in ROM data areas
console.log('\n=== 搜索 ROM 中的 .byte $EC, $02 数据（可能是体力值小序存储） ===');
for (let off = 16; off < 16 + prgSize - 1; off++) {
  if (rom[off] === 0xEC && rom[off+1] === 0x02) {
    let cpuOff = off - 16;
    // Only print ones in data/code areas (not pattern address tables)
    let bank = Math.floor(cpuOff / 0x2000);
    if (bank <= 15) {
      console.log(`PRG bank ${bank}: CPU 0x${(0x8000 + cpuOff % 0x2000).toString(16)}, ROM 0x${off.toString(16)}`);
    }
  }
}
