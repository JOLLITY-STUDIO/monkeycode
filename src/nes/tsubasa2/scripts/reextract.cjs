const fs = require('fs');
const prg = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(16);

console.log('=== Verify PRG[0x3BAF8..0x3BC00] 真实字节 ===');
for (let i = 0x3BAF8; i < 0x3BC00; i++) {
  if ((i - 0x3BAF8) % 16 === 0) process.stdout.write('\n0x' + i.toString(16).toUpperCase() + ': ');
  process.stdout.write(prg[i].toString(16).padStart(2,'0').toUpperCase() + ' ');
}
console.log();

console.log('\n=== Anchors verification ===');
console.log('Cor Pos10 file 0x3BB1A -> PRG[0x3BB0A] = 0x' + prg[0x3BB0A].toString(16).padStart(2,'0').toUpperCase() + ' (dec ' + prg[0x3BB0A] + ', doc says 24=Riverio)');
console.log('Cor Pos9  file 0x3BB1C -> PRG[0x3BB0C] = 0x' + prg[0x3BB0C].toString(16).padStart(2,'0').toUpperCase() + ' (dec ' + prg[0x3BB0C] + ', doc says 23=Satilst)');
console.log('Gre Pos1  file 0x3BB2A -> PRG[0x3BB1A] = 0x' + prg[0x3BB1A].toString(16).padStart(2,'0').toUpperCase() + ' (dec ' + prg[0x3BB1A] + ', doc says 26=Meon GK)');
console.log('Gre Pos9  file 0x3BB28 -> PRG[0x3BB18] = 0x' + prg[0x3BB18].toString(16).padStart(2,'0').toUpperCase() + ' (dec ' + prg[0x3BB18] + ', doc says 25=Da Silva)');
