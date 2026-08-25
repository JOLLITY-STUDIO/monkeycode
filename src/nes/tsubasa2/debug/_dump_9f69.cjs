const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
const off = (cpu) => cpu - 0x8000;
console.log('$9F50-$9F7F raw:', JSON.stringify(Array.from(prg.slice(off(0x9f50), off(0x9f80)))));
console.log('$9F69-$9F7F raw:', JSON.stringify(Array.from(prg.slice(off(0x9f69), off(0x9f80)))));
console.log('$88A0-$88B0 raw:', JSON.stringify(Array.from(prg.slice(off(0x88a0), off(0x88b0)))));
