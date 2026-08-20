const fs = require('fs');
const s = fs.readFileSync('asm/bank30/_full.s', 'utf8');
const lines = s.split('\n');
function dumpAddr(start, end, label) {
  console.log('=== ' + label + ' ===');
  for (const l of lines) {
    const m = l.match(/;\s*\$([0-9A-F]{4})/);
    if (m) {
      const a = parseInt(m[1], 16);
      if (a >= start && a <= end) {
        console.log('$' + m[1].toUpperCase() + ': ' + l.trim().slice(0, 95));
      }
    }
  }
}
dumpAddr(0xC57B, 0xC640, '$C57B-$C640 (跳转表尾→RESET区)');
dumpAddr(0xC640, 0xC760, '$C640-$C760 (RESET 区)');
