/**
 * mini-audio/gen-bank12-json.cjs
 * Reads prg-bank-12.ts and extracts the raw array into a .json file.
 * Run: node mini-audio/gen-bank12-json.cjs
 */
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'rom-data', 'prg-bank-12.ts');
const outPath = path.join(__dirname, 'bank12-data.json');

const content = fs.readFileSync(srcPath, 'utf-8');

// Extract the array between = [ and ]; 
const match = content.match(/=\s*\[([\s\S]*?)\];/);
if (!match) {
  console.error('Failed to find array in prg-bank-12.ts');
  process.exit(1);
}

// Parse the hex values: each line has one or more 0xNN values
const arrayBody = match[1];
const hexValues = [];
const hexPattern = /0x([0-9A-Fa-f]{2})/g;
let m;
while ((m = hexPattern.exec(arrayBody)) !== null) {
  hexValues.push(parseInt(m[1], 16));
}

// Also try comma-separated values (some files may not use 0x prefix)
if (hexValues.length === 0) {
  const commaVals = arrayBody.split(',').map(s => s.trim()).filter(s => /^\d+$/.test(s));
  if (commaVals.length > 0) {
    commaVals.forEach(v => hexValues.push(parseInt(v, 10)));
  }
}

if (hexValues.length === 0) {
  console.error('No values extracted from prg-bank-12.ts');
  // Preview first 500 chars
  console.log('File preview:', content.substring(0, 500));
  process.exit(1);
}

// Write JSON
fs.writeFileSync(outPath, JSON.stringify(hexValues));
console.log(`Generated ${outPath} with ${hexValues.length} bytes`);
console.log(`First 16 bytes: ${hexValues.slice(0, 16).map(v => v.toString(16).padStart(2, '0')).join(' ')}`);
