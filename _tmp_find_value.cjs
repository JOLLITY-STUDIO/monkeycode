const fs = require('fs');
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const h = rom.slice(0, 16);
const prgCount = h[4];
const prgSize = prgCount * 16384;

// 748 = 0x02EC, bytes: EC 02
// In NES 16-bit little-endian: lo=0xEC, hi=0x02
// Search for 0xEC followed by 0x02 in PRG
console.log('=== 搜索体力值 748 (EC 02 little-endian) in PRG ===');
let matches = [];
for (let off = 16; off < 16 + prgSize - 1; off++) {
  if (rom[off] === 0xEC && rom[off + 1] === 0x02) {
    let prgOff = off - 16;
    let bank = Math.floor(prgOff / 0x2000);
    let cpu = 0x8000 + (prgOff % 0x2000);
    matches.push({rom: off, prg: prgOff, bank, cpu});
  }
}
matches.forEach(m => {
  // Show surrounding bytes
  let ctx = [];
  for (let i = -8; i <= 8; i++) {
    let b = rom[m.rom + i];
    ctx.push(b.toString(16).padStart(2, '0').toUpperCase());
  }
  console.log(`PRG bank ${m.bank}: CPU $${m.cpu.toString(16)}, ROM 0x${m.rom.toString(16)}`);
  console.log(`  context: ${ctx.join(' ')}`);
  console.log(`           ${' '.repeat(8*3)}EC 02`);
});

// Also look for player roster structure in bank 2, 3, 4 (common data banks)
// Search for byte patterns that could be player stat arrays
// Players have G=goal, S=shot, D=dribble, P=pass, SP=speed, ST=stamina etc.
console.log('\n=== 搜索字节码流生成代码 (LDA $02EC 或附近) ===');
for (let b = 0; b <= 15; b++) {
  try {
    const s = fs.readFileSync('_tmp_bzk_out/bank_' + b.toString().padStart(2, '0') + '.asm', 'utf8');
    // Search for any reference to 0xEC as a value
    const lines = s.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (/LDA\s+#\$EC\b|LDX\s+#\$EC\b|LDY\s+#\$EC\b|CMP\s+#\$EC\b/.test(lines[i])) {
        console.log(`bank_${b.toString().padStart(2,'0')}.asm:${i+1}: ${lines[i]}`);
      }
    }
  } catch(e) {}
}

// Search for routines that convert number to bytes (division/subtraction)
// Look for SBC #$64 (100) or SBC #$0A (10) patterns - hundred/tens decomposition
console.log('\n=== 搜索数字分离逻辑 (SBC #$64=100, SBC #$0A=10) ===');
for (let b = 0; b <= 15; b++) {
  try {
    const s = fs.readFileSync('_tmp_bzk_out/bank_' + b.toString().padStart(2,'0') + '.asm', 'utf8');
    const lines = s.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('#$64') || lines[i].includes('#100') || 
          (lines[i].includes('#$0A') && lines[i].includes('SBC'))) {
        // Show context
        let start = Math.max(0, i - 5);
        let end = Math.min(lines.length - 1, i + 5);
        let block = '';
        for (let j = start; j <= end; j++) block += (j+1) + ': ' + lines[j] + '\n';
        console.log(`bank_${b.toString().padStart(2,'0')}.asm (around line ${i+1}):\n${block}---`);
      }
    }
  } catch(e) {}
}
