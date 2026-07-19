const fs = require('fs');
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能-strippeddata.prg.bin');
const p1 = Buffer.from([16,14,12,11,12,12]);
const p2 = Buffer.from([8,8,9,8,8,8]);
let idx = rom.indexOf(p1);
console.log('P1 stats at ROM offset:', idx >= 0 ? '0x'+idx.toString(16) : 'not found');
idx = rom.indexOf(p2);
console.log('P2 stats at ROM offset:', idx >= 0 ? '0x'+idx.toString(16) : 'not found');
console.log('P1 raw:', p1.toString('hex'));
console.log('P2 raw:', p2.toString('hex'));

for (let i=0; i<rom.length-6; i++) {
  if (rom[i]===16 && rom[i+1]===14 && rom[i+2]===12) {
    console.log('found 16,14,12 at', '0x'+i.toString(16), 'next:', rom[i+3], rom[i+4], rom[i+5]);
  }
  if (rom[i]===8 && rom[i+1]===8 && rom[i+2]===9) {
    console.log('found 8,8,9 at', '0x'+i.toString(16), 'next:', rom[i+3], rom[i+4], rom[i+5]);
  }
}
