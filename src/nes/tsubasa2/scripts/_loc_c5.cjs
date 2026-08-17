const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';
const files = fs.readdirSync(dir);
const targets = ['C50C', 'C515', 'C527', 'C536', 'C539', 'C50C:', 'C515:', 'C527:', 'C536:', 'C539:'];
for (const f of files) {
  if (!f.endsWith('.asm')) continue;
  const path = dir + '/' + f;
  const lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    // 定义行: 例如 0D:C50C: 20 ...
    if (/[0-9A-F]{2}:[0-9A-F]{4}:/.test(l) && targets.some(t => l.includes(t + ':'))) {
      console.log(`${f}:${i + 1}: ${l.trim()}`);
    }
  }
}
console.log('--- JSR refs in bank_27.asm ---');
const b27 = fs.readFileSync(dir + '/bank_27.asm', 'utf8').split(/\r?\n/);
for (let i = 0; i < b27.length; i++) {
  if (/JSR \$C5|JMP \$A1|JMP \$A2|JMP \$A4|JMP \$A6|JMP \$AB/.test(b27[i])) {
    console.log(`${i + 1}: ${b27[i].trim()}`);
  }
}
