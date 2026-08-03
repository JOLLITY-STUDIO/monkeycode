const fs = require('fs');
const c = fs.readFileSync('game-engine/native-game/tsubasa/banks/prg/bank-01-data.ts', 'utf8');

function extractArray(label) {
  const searchStr = 'DATA_' + label;
  const idx = c.indexOf(searchStr);
  console.log('  searching:', JSON.stringify(searchStr), 'found at', idx);
  if (idx < 0) return [];
  const open = c.indexOf('[', idx);
  console.log('  open at', open);
  if (open < 0) return [];
  let depth = 0, close = open;
  for (let i = open; i < c.length; i++) {
    if (c[i] === '[') depth++;
    else if (c[i] === ']') { depth--; if (depth === 0) { close = i; break; } }
  }
  console.log('  close at', close, 'length', close - open);
  const arr = c.substring(open + 1, close);
  const hexes = arr.match(/0x[0-9A-Fa-f]{2}/g) || [];
  console.log('  hexes:', hexes.length);
  return hexes.map(h => parseInt(h, 16));
}

// Test extraction
const t = extractArray('$9DF2_$9F14');
console.log('\nRESULT:', t.length, 'bytes');
if (t.length > 0) console.log(t.slice(0, 10));
