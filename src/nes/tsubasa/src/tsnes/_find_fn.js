const c = require('fs').readFileSync('game-engine/native-game/tsubasa/banks/prg/bank-30-code.ts', 'utf-8');

// Find ALL exported functions
const re = /export function ([^(\n]+)\(/g;
let m;
console.log('=== All exported functions ===');
while ((m = re.exec(c)) !== null) {
  const name = m[1];
  const idx = m.index;
  if (name.indexOf('CB02') >= 0 || name.indexOf('irqHandler') >= 0 || name.indexOf('coroutine') >= 0 || name.indexOf('timerInit') >= 0) {
    console.log(name + ' at ' + idx + ' -> ' + c.substring(idx, idx + 150).replace(/\n/g, '\\n'));
  }
}

// Also search for CB02 anywhere
console.log('\n=== CB02 occurrences ===');
let idx = -1;
while ((idx = c.indexOf('CB02', idx + 1)) >= 0) {
  console.log('at ' + idx + ': ' + c.substring(Math.max(0, idx - 20), idx + 40).replace(/\n/g, ' '));
}
