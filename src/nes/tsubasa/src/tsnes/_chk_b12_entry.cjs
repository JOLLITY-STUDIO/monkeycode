const b12 = require('./mini-audio/rom-data/prg-bank-12').default;
console.log('Bank12 offset 0 ($8000 entry):');
for (let i = 0; i < 48; i++) {
  process.stdout.write(b12[i].toString(16).toUpperCase().padStart(2, '0') + ' ');
  if ((i + 1) % 16 === 0) process.stdout.write('\n');
}
console.log('\n$818E (play entry):');
for (let i = 0x18E; i < 0x18E + 32; i++) {
  process.stdout.write(b12[i].toString(16).toUpperCase().padStart(2, '0') + ' ');
  if ((i - 0x18E + 1) % 16 === 0) process.stdout.write('\n');
}
