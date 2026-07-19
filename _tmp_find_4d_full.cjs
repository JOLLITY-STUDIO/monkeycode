const fs = require('fs');

// Search all bank asm files for $4D/$4E stores
const banks = [];
for (let b = 0; b <= 31; b++) {
  try { banks.push(fs.readFileSync('_tmp_bzk_out/bank_' + b.toString().padStart(2,'0') + '.asm', 'utf8')); }
  catch(e) { banks.push(''); }
}

console.log('=== 搜索 STA/STX/STY $4D 或 $4E (不包括间接寻址) ===');
for (let b = 0; b <= 31; b++) {
  if (!banks[b]) continue;
  const lines = banks[b].split('\n');
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];
    // Match STA/STX/STY $4D or $4E (not ($4D) or ($4E))
    if (/STA\s+\$004D\b|STX\s+\$004D\b|STY\s+\$004D\b/.test(L) ||
        /STA\s+\$004E\b|STX\s+\$004E\b|STY\s+\$004E\b/.test(L)) {
      console.log(`bank_${b.toString().padStart(2,'0')}.asm:${i+1}: ${L}`);
      // Show context
      for (let j = Math.max(0, i - 3); j <= Math.min(lines.length - 1, i + 3); j++) {
        if (j !== i) console.log(`  ${' '.repeat(3)} ${lines[j]}`);
      }
    }
  }
}
