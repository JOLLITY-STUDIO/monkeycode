const fs = require('fs');
const asm = fs.readFileSync('asm/bank24/code_main.s','utf8') + fs.readFileSync('asm/bank24/code_sub.s','utf8') + fs.readFileSync('asm/bank24/code_data.s','utf8');
const ts = fs.readFileSync('src/game/prg/code/match/MatchHudService.ts','utf8');
const addrs = new Set();
const re = /;\s*\$([0-9A-Fa-f]{4})/g;
let m;
while ((m = re.exec(asm))) { addrs.add(m[1].toUpperCase()); }
let covered = 0;
for (const a of addrs) {
  if (ts.includes('$' + a) || ts.includes('0x' + a)) covered++;
}
console.log('bank24: ' + covered + '/' + addrs.size + ' = ' + (covered / addrs.size * 100).toFixed(1) + '%');
console.log('TS lines: ' + ts.split('\n').length);
