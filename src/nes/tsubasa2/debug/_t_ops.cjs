const ops = new Map();
'00:BRK 01:ORA(X) 05:ORA zp'.split(/\s+/).reduce((m, s) => { const p = s.split(':'); m.set(parseInt(p[0], 16), p[1]); return m; }, ops);
console.log('size', ops.size, 'get0', ops.get(0), 'get1', ops.get(1));
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
console.log('prg[0x807]=', prg[0x807].toString(16));
