const fs = require('fs');
const s = fs.readFileSync('src/game/data/prg/bank28-tables.ts', 'utf8');
const i = s.indexOf('export const T_ATTR_ROLE_8A9D');
console.log('found at', i);
console.log(s.slice(i, i + 120));
const eq = s.indexOf('=', i);
const j = s.indexOf('[', eq);
let k = j + 1, depth = 1;
while (k < s.length && depth > 0) {
  if (s[k] === '[') depth++;
  if (s[k] === ']') depth--;
  k++;
}
const body = s.slice(j + 1, k - 1);
console.log('---BODY---');
console.log(body);
const arr = body.split(',').map(x => parseInt(x.trim(), 16)).filter(v => !isNaN(v));
console.log('---ARR len', arr.length, '---');
console.log(arr.slice(0, 24).map((v, idx) => idx + ':' + v.toString(16)).join(' '));
