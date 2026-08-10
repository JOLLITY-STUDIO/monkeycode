import b from '../rom-data/prg-bank-30';
for (let i = 0; i < b.length - 2; i++) {
  if (b[i] === 0x20 && b[i + 1] === 0x00 && b[i + 2] === 0x80) {
    console.log('JSR 8000 at ' + (0xC000 + i).toString(16).toUpperCase());
  }
}
// Also search for MMC3 bank switch to Bank12: STA $8000 then #$0C, STA $8001
for (let i = 0; i < b.length - 5; i++) {
  // STA $8000 = 8D 00 80
  if (b[i] === 0x8D && b[i + 1] === 0x00 && b[i + 2] === 0x80) {
    console.log('STA 8000 at ' + (0xC000 + i).toString(16).toUpperCase());
  }
}
// Also search bank 12 references
for (let i = 0; i < b.length - 1; i++) {
  if (b[i] === 0xA9 && b[i + 1] === 0x0C) {
    console.log('LDA #0C at ' + (0xC000 + i).toString(16).toUpperCase());
  }
}
