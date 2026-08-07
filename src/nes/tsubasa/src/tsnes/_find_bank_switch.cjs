const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';
const allFiles = fs.readdirSync(dir).filter(f => f.startsWith('bank_') && f.endsWith('.asm'));

// Search for C4B9, CD7C, and the actual bank switch MMC3 write functions
console.log('=== Searching for $C4B9, $CD7C, $CD77 across ALL banks ===');
for (const file of allFiles) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  for (const addr of ['C4B9', 'CD7C', 'CD77']) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('0F:' + addr + ':') || lines[i].includes(':' + addr + ':')) {
        const match = lines[i].match(/([0-9A-Fa-f]+):([0-9A-Fa-f]+):/g);
        if (match) {
          console.log(`\n$${addr} in Bank ${bn} at L${i+1}:`);
          lines.slice(i, i + 25).forEach((l, idx) => console.log(`  ${l.trim().substring(0, 95)}`));
        }
      }
    }
  }
}
