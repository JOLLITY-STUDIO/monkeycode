// Direct data dump - reads TS export via require
const fs = require('fs');
const path = require('path');

// Read the Bank30 raw data from the NES_PRG_ROM export in index-4bank.ts
// Use the already-built PRG data
const BK = 8192;

// Import the built module
const { NES_PRG_ROM } = require('./rom-data/index-4bank');

const b30 = NES_PRG_ROM.slice(30*BK, 31*BK);

console.log('=== Bank30 at $C500 (offset 0x500):');
for (let i=0x500; i<0x518; i++) {
  const addr = 0xC000 + i;
  console.log('  $' + addr.toString(16) + ': 0x' + b30[i].toString(16).padStart(2,'0'));
}

console.log('\n=== Bank30 at $C76E (offset 0x76E):');
for (let i=0x76E; i<0x790; i++) {
  const addr = 0xC000 + i;
  console.log('  $' + addr.toString(16).padStart(4,'0') + ': 0x' + b30[i].toString(16).padStart(2,'0'));
}

console.log('\n=== Bank30 at $C64E (offset 0x64E):');
for (let i=0x64E; i<0x660; i++) {
  const addr = 0xC000 + i;
  console.log('  $' + addr.toString(16).padStart(4,'0') + ': 0x' + b30[i].toString(16).padStart(2,'0'));
}
