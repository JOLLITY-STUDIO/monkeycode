const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'tsnes', 'tsubasa-hex2asm', 'prg_banks', 'prg_bank_00_dispatch_scene_engine.ts');
const src = fs.readFileSync(srcPath, 'utf8');

// Read ROM
const rom = fs.readFileSync('rom.nes');
const prgStart = 16;
const expected = Array.from(rom.slice(prgStart, prgStart + 8192));

// Find buildpadding function content
const padStart = src.indexOf('function buildpadding(');
let bracePad = src.indexOf('{', padStart);
let depth = 0, endPad = -1;
for (let i = bracePad; i < src.length; i++) {
  if (src[i] === '{') depth++;
  if (src[i] === '}') { depth--; if (depth === 0) { endPad = i; break; } }
}

const padBody = src.slice(bracePad + 1, endPad);
const allHexes = padBody.match(/0x([0-9a-fA-F]{2})/g) || [];
const padBytes = allHexes.map(b => parseInt(b.slice(2), 16));
console.log('buildpadding: ' + padBytes.length + ' bytes');

// ROM at end of bank ($1FF0-$1FFF = $9FF0-$9FFF)
console.log('\nROM at $1FF0:');
for (let off = 0x1FF0; off < 0x2000; off += 16) {
  console.log(off.toString(16) + ': ' + expected.slice(off, off+16).map(b => b.toString(16).padStart(2,'0')).join(' '));
}

// Find where in ROM the buildpadding bytes start
if (padBytes.length >= 10) {
  const search = padBytes.slice(0, 10);
  for (let i = 0; i < expected.length - 10; i++) {
    let match = true;
    for (let j = 0; j < 10; j++) {
      if (expected[i + j] !== search[j]) { match = false; break; }
    }
    if (match) {
      console.log('\nbuildpadding first 10 bytes found at ROM offset $' + i.toString(16) + ' (addr $' + (0x8000 + i).toString(16) + ')');
      // Check full match
      let fullMatch = true;
      for (let k = 0; k < padBytes.length && (i + k) < expected.length; k++) {
        if (expected[i + k] !== padBytes[k]) { 
          console.log('  First mismatch at offset $' + (i + k).toString(16) + ' (byte ' + k + ')');
          fullMatch = false; 
          break; 
        }
      }
      if (fullMatch && padBytes.length <= expected.length - i) {
        console.log('  FULL MATCH: ' + padBytes.length + ' bytes');
      }
      break;
    }
  }
}

// Also find all 0xFF padding bytes at end
let lastNonFF = expected.length - 1;
while (lastNonFF >= 0 && expected[lastNonFF] === 0xFF) lastNonFF--;
console.log('\nLast non-FF byte at offset $' + lastNonFF.toString(16) + ' = 0x' + expected[lastNonFF].toString(16));
console.log('Padding bytes: ' + (expected.length - 1 - lastNonFF));
