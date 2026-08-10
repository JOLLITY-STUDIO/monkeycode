import { NES_PRG_ROM } from './rom-data/index-4bank';
const BK = 8192;
const b30 = NES_PRG_ROM.slice(30*BK, 31*BK);

console.log('=== Bank30 at $C500 (offset 0x500):');
for (let i=0x500; i<0x518; i++) console.log('  $' + (0xC000+i).toString(16) + ': 0x' + b30[i].toString(16).padStart(2,'0'));

console.log('\n=== Bank30 at $C76E (offset 0x76E):');
for (let i=0x76E; i<0x790; i++) console.log('  $' + (0xC000+i).toString(16).padStart(4,'0') + ': 0x' + b30[i].toString(16).padStart(2,'0'));

// Also check $C64E (second JMP target)
console.log('\n=== Bank30 at $C64E (offset 0x64E):');
for (let i=0x64E; i<0x660; i++) console.log('  $' + (0xC000+i).toString(16).padStart(4,'0') + ': 0x' + b30[i].toString(16).padStart(2,'0'));
