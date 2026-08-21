const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgStart = 16;

function parseArray(file) {
  const text = fs.readFileSync(file, 'utf8');
  const start = text.indexOf('= [');
  const end = text.indexOf('];', start);
  const body = text.slice(start, end);
  const bytes = [];
  const re = /0x([0-9A-Fa-f]{2})/g;
  let m;
  while ((m = re.exec(body)) !== null) bytes.push(parseInt(m[1], 16));
  return bytes;
}

const pal = parseArray('src/game/prg/data/bank31-palette-fbcc.ts');
const bank31Start = prgStart + 31 * 8192;
const fbcc = bank31Start + (0x1BCC);
let pok = true;
for (let i = 0; i < pal.length; i++) {
  if (pal[i] !== rom[fbcc + i]) { pok = false; console.log('PAL MISMATCH at', i, 'file', pal[i], 'rom', rom[fbcc+i]); break; }
}
console.log('pal len', pal.length, 'match:', pok);
console.log('entry 0x15:', pal.slice(252, 264).map(b=>'0x'+b.toString(16).toUpperCase().padStart(2,'0')).join(','));
console.log('entry 0x16:', pal.slice(264, 276).map(b=>'0x'+b.toString(16).toUpperCase().padStart(2,'0')).join(','));

const stream = parseArray('src/game/prg/data/bank19-scene-stream.ts');
const bank19Start = prgStart + 19 * 8192;
let sok = true;
for (let i = 0; i < stream.length; i++) {
  if (stream[i] !== rom[bank19Start + 0x1467 + i]) { sok = false; console.log('STREAM MISMATCH at', i, 'file', stream[i], 'rom', rom[bank19Start+0x1467+i]); break; }
}
console.log('stream len', stream.length, 'match:', sok);
