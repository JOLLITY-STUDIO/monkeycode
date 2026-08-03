const fs = require('fs');
const c = fs.readFileSync('game-engine/native-game/tsubasa/banks/prg/bank-19-script-engine-data.ts', 'utf8');

function extractArray(label) {
  const idx = c.indexOf('DATA_' + label);
  if (idx < 0) return [];
  const eqIdx = c.indexOf('=', idx);
  const open = c.indexOf('[', eqIdx);
  if (open < 0) return [];
  let depth = 0, close = open;
  for (let i = open; i < c.length; i++) {
    if (c[i] === '[') depth++;
    else if (c[i] === ']') { depth--; if (depth === 0) { close = i; break; } }
  }
  const arr = c.substring(open + 1, close);
  return (arr.match(/0x[0-9A-Fa-f]{2}/g) || []).map(h => parseInt(h, 16));
}

const raw = extractArray('$944E_$988E');

// Trace: log every byte and what it means
let i = 0;
let cmdIdx = 0;
while (i < raw.length) {
  const byte = raw[i];
  const offset = i;
  let consumed = 0;

  if (byte >= 0xE0) {
    switch (byte) {
      case 0xE0: consumed = 2; break; // E0 + param
      case 0xE1: consumed = 2; break; // E1 + delta
      case 0xE2: consumed = 3; break; // E2 + x + y
      case 0xE3: consumed = 1; break; // just E3
      case 0xE4: {
        // String: E4 + tiles until FC/E0+/00
        let j = i + 1;
        while (j < raw.length && raw[j] < 0xE0 && raw[j] !== 0x00 && raw[j] !== 0xFC) j++;
        consumed = j - i + (j < raw.length && raw[j] === 0xFC ? 1 : 0);
        break;
      }
      case 0xE5: consumed = 2; break;
      case 0xE6: consumed = 2; break;
      default: consumed = 1; break;
    }
    console.log(`[${String(cmdIdx).padStart(3)}] offset=$${offset.toString(16).padStart(4)} byte=$${byte.toString(16).padStart(2)} ctrl  consumed=${consumed}`);
  } else if (byte === 0x00) {
    consumed = 1;
    console.log(`[${String(cmdIdx).padStart(3)}] offset=$${offset.toString(16).padStart(4)} byte=$${byte.toString(16).padStart(2)} upload_null consumed=1`);
  } else {
    // upload packet: [len(1), addr_lo(1), addr_hi(1), tiles(N)]
    const len = byte;
    consumed = 1 + 2 + len;
    const addrLo = i + 1 < raw.length ? raw[i+1] : 0;
    const addrHi = i + 2 < raw.length ? raw[i+2] : 0;
    const addr = (addrHi << 8) | addrLo;
    // Show first 8 tiles of large packets
    const tiles = raw.slice(i+3, i+3+Math.min(len, 8));
    console.log(`[${String(cmdIdx).padStart(3)}] offset=$${offset.toString(16).padStart(4)} byte=$${byte.toString(16).padStart(2)} upload len=${len.toString().padStart(3)} addr=$${addr.toString(16).padStart(4)} tiles_head=[${tiles.map(b=>'$'+b.toString(16).padStart(2,'0')).join(',')}] consumed=${consumed}`);
  }

  i += consumed;
  cmdIdx++;

  if (cmdIdx > 70) {
    console.log('... stopping trace');
    break;
  }
}

console.log(`\nFinal i=${i}/${raw.length}`);
if (i < raw.length) {
  console.log(`Remaining bytes at offset $${i.toString(16).padStart(4)}:`);
  const rem = raw.slice(i, i + 40);
  console.log(rem.map(b => '$' + b.toString(16).padStart(2, '0')).join(' '));
}
