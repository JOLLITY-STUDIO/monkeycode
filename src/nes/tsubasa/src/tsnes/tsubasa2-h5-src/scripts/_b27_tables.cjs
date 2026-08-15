const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm'));
const targets = ['8103', '81EB', '81EE', '#1B', '#$1B'];
for (const f of files) {
  const lines = fs.readFileSync(dir + '/' + f, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    // JSR/JMP to bank27 entry (via $A000-$BFFF window: CPU addr 0x8103/0x81EB 也在 $8000 窗口)
    if (/(JSR|JMP) \$81(03|EB|EE)/.test(l)) {
      console.log(`${f}:${i + 1}: ${l.trim().slice(0, 80)}`);
    }
    // bank 切换: STA $8001 (R6) with #$1B; 或 LDA #$1B
    if (l.includes('A9 1B') || l.includes('#$1B') || l.includes('#$1b')) {
      console.log(`${f}:${i + 1}: ${l.trim().slice(0, 80)}`);
    }
  }
}
console.log('--- done ---');
