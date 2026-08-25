const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
// bank2 全 16KB：$8000-$BFFF → PRG 0x4000-0x5FFF（R6=R7=2）
const b2 = (cpu) => 0x4000 + (cpu - 0x8000);
// bank0：$8000-$9FFF → PRG 0x0000-0x1FFF
const b0 = (cpu) => cpu - 0x8000;
console.log('bank2 @$8895:', JSON.stringify(Array.from(prg.slice(b2(0x8895), b2(0x8895) + 0x18))));
console.log('bank0 @$8895:', JSON.stringify(Array.from(prg.slice(b0(0x8895), b0(0x8895) + 0x18))));
console.log('bank2 @$88FB:', JSON.stringify(Array.from(prg.slice(b2(0x88fb), b2(0x88fb) + 0x14))));
console.log('bank0 @$88FB:', JSON.stringify(Array.from(prg.slice(b0(0x88fb), b0(0x88fb) + 0x14))));
console.log('bank2 @$8976:', JSON.stringify(Array.from(prg.slice(b2(0x8976), b2(0x8976) + 0x20))));
console.log('bank0 @$8976:', JSON.stringify(Array.from(prg.slice(b0(0x8976), b0(0x8976) + 0x20))));
console.log('bank2 @$88CA:', JSON.stringify(Array.from(prg.slice(b2(0x88ca), b2(0x88ca) + 0x30))));
console.log('bank0 @$88CA:', JSON.stringify(Array.from(prg.slice(b0(0x88ca), b0(0x88ca) + 0x30))));
console.log('bank2 @$88A8 (CHR ptr target):', JSON.stringify(Array.from(prg.slice(b2(0x88a8), b2(0x88a8) + 0x10))));
console.log('bank2 @$A677 256B first16:', JSON.stringify(Array.from(prg.slice(0x4677, 0x4677 + 16))));
