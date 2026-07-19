const fs = require('fs');

// Search ROM for raw value $02EC (748) and its bytes
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const h = rom.slice(0, 16);
const prgSize = h[4] * 16384;

// Search for 0xEC 0x02 or 0x02 0xEC in PRG
console.log('=== 搜索 $02EC / $EC02 原始值在 PRG-ROM 中 ===');
for (let off = 16; off < 16 + prgSize - 1; off++) {
  if (rom[off] === 0xEC && rom[off+1] === 0x02) {
    console.log(`$EC02 at ROM 0x${off.toString(16)} (PRG 0x${(off-16).toString(16)})`);
  }
  if (rom[off] === 0x02 && rom[off+1] === 0xEC) {
    console.log(`$02EC at ROM 0x${off.toString(16)} (PRG 0x${(off-16).toString(16)})`);
  }
}

// Also search for 0xEC alone in data regions - might be lo byte of stamina
console.log('\n=== 在 asm 中搜索 $02EC ($48) 引用 ===');
for (let b = 0; b <= 15; b++) {
  try {
    const s = fs.readFileSync('_tmp_bzk_out/bank_' + b.toString().padStart(2,'0') + '.asm', 'utf8');
    if (s.includes('02EC') || s.includes('$02EC')) {
      console.log(`Found in bank_${b.toString().padStart(2,'0')}.asm`);  
      const lines = s.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('02EC')) console.log(`  ${i+1}: ${lines[i]}`);
      }
    }
  } catch(e) {}
}

// Search for references to $48 (hundreds digit) and $49 (tens digit) in all banks
// to find where they are set before calling $9A31
console.log('\n=== 搜索所有对 $48/$49 的写入（在调用 $9A31 之前） ===');
for (let b = 0; b <= 15; b++) {
  try {
    const s = fs.readFileSync('_tmp_bzk_out/bank_' + b.toString().padStart(2,'0') + '.asm', 'utf8');
    const lines = s.split('\n');
    for (let i = 0; i < lines.length; i++) {
      // Look for STA $48 or STA $49 or STX $48 etc
      if (/STA\s+\$0048\b|STA\s+\$0049\b|STX\s+\$0048\b|STX\s+\$0049\b/.test(lines[i])) {
        // Show context
        const ctxStart = Math.max(0, i - 5);
        const ctxEnd = Math.min(lines.length - 1, i + 5);
        let inContext = false;
        for (let j = ctxStart; j <= ctxEnd; j++) {
          if (lines[j].includes('9A31') || lines[j].includes('9A4C')) inContext = true;
        }
        if (inContext) {
          console.log(`bank_${b.toString().padStart(2,'0')}.asm:${i+1}: ${lines[i]}`);
          for (let j = Math.max(0, i-5); j <= Math.min(lines.length-1, i+5); j++) {
            if (j !== i) console.log(`  ${' '.repeat(3)}${lines[j]}`);
          }
          console.log('  ---');
        }
      }
    }
  } catch(e) {}
}
