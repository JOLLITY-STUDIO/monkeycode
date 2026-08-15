const fs = require('fs');
const s = fs.readFileSync(__dirname + '/_full_disasm.asm', 'utf8').split(/\r?\n/);
const tgt = ['CC02', 'CCD2', 'CAE7', 'CA97', 'CF1F', 'C421', 'C4B9', 'C4B2'];
tgt.forEach(t => {
  const idx = s.findIndex(l => l.includes('$' + t));
  console.log('=== $' + t + ' @line ' + idx + ' ===');
  if (idx >= 0) {
    console.log(s.slice(idx, idx + Math.min(90, s.length - idx)).join('\n'));
  }
  console.log('');
});
