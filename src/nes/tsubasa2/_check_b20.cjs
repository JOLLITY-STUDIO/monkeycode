const fs = require('fs');
const s = fs.readFileSync('src/game/prg/code/bank20_match-aux.ts', 'utf8');
const lines = s.split('\n');
const re = /PRG_BANK|readByte|readU16|_readBank21|T_8264|MAIN_STREAM_TABLE|NAME_MAP_TABLE\b|B21_PAL_BASES/;
let n = 0;
lines.forEach((l, i) => {
  if (re.test(l)) { console.log(i + 1 + ': ' + l.trim()); n++; }
});
console.log('matches:', n);
