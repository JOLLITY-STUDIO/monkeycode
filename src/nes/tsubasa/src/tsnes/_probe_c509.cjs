const fs = require('fs');
let m = require('./rom-data/prg-bank-30.js');
const b = Array.isArray(m) ? m : (m.default || m);
// bank30 CPU $C000-$DFFF → PRG offset
const base = 0xc000;
const addr = 0xcb99;
const off = addr - base;
console.log('bank30 len:', b.length);
for (let i = 0; i < 22; i++) {
  console.log('$' + (addr + i).toString(16).toUpperCase() + ': ' + b[off + i].toString(16).padStart(2, '0'));
}
