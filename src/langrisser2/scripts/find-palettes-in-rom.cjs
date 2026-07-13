const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');
const outDir = 'src/langrisser2/20260713/output/palettes';
const fs2 = require('fs');
if (!fs2.existsSync(outDir)) fs2.mkdirSync(outDir, { recursive: true });

// Genesis CRAM word: bit 0 and 15 unused, 9-bit BGR in bits 1-3, 5-7, 9-11
function isValidCRAMWord(w) {
  if (w & 0x8001) return false; // bits 15 and 0 must be 0
  return true;
}

function readWordLE(data, offset) {
  return (data[offset + 1] << 8) | data[offset];
}

function readWordBE(data, offset) {
  return (data[offset] << 8) | data[offset + 1];
}

function wordToRGB(w) {
  const r = ((w >> 1) & 0x7) * 36;
  const g = ((w >> 5) & 0x7) * 36;
  const b = ((w >> 9) & 0x7) * 36;
  return [r, g, b];
}

// Search for 16-color (32-byte) palette candidates in both byte orders
// A real palette: color 0 is black, at least 4 distinct colors, all valid CRAM words
const candidates = [];
for (let i = 0; i < rom.length - 32; i++) {
  for (const order of ['LE', 'BE']) {
    let valid = true;
    const distinct = new Set();
    let firstWord = 0;
    for (let c = 0; c < 16; c++) {
      const w = order === 'LE' ? readWordLE(rom, i + c * 2) : readWordBE(rom, i + c * 2);
      if (!isValidCRAMWord(w)) { valid = false; break; }
      if (c === 0) firstWord = w;
      distinct.add(w);
    }
    if (valid && firstWord === 0 && distinct.size >= 4) {
      candidates.push({ addr: i, order });
    }
  }
}

console.log(`Found ${candidates.length} candidate 16-color palettes`);

// Deduplicate: group by address (keep both if both LE and BE valid)
const byAddr = new Map();
for (const c of candidates) {
  if (!byAddr.has(c.addr)) byAddr.set(c.addr, []);
  byAddr.get(c.addr).push(c.order);
}

console.log(`Unique addresses: ${byAddr.size}`);

// Print first 30 candidates
let count = 0;
for (const [addr, orders] of byAddr) {
  if (count >= 30) break;
  console.log(`\n0x${addr.toString(16).padStart(6, '0')} (${orders.join(',')})`);
  for (let row = 0; row < 32; row += 16) {
    const bytes = Array.from(rom.slice(addr + row, addr + row + 16)).map(b => b.toString(16).padStart(2, '0')).join(' ');
    console.log(`  ${(addr + row).toString(16).padStart(6, '0')}: ${bytes}`);
  }
  // Also show words
  const words = [];
  for (let c = 0; c < 16; c++) {
    if (orders.includes('LE')) words.push(readWordLE(rom, addr + c * 2).toString(16).padStart(4, '0'));
    else words.push(readWordBE(rom, addr + c * 2).toString(16).padStart(4, '0'));
  }
  console.log(`  words: ${words.join(' ')}`);
  count++;
}

// Render each palette as a small PNG strip
function renderPalette(pal) {
  const canvas = createCanvas(16 * 16, 16);
  const ctx = canvas.getContext('2d');
  for (let i = 0; i < 16; i++) {
    const [r, g, b] = pal[i] || [0, 0, 0];
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(i * 16, 0, 16, 16);
  }
  return canvas;
}

let pngCount = 0;
for (const [addr, orders] of byAddr) {
  if (pngCount >= 100) break;
  for (const order of orders) {
    const pal = [];
    for (let c = 0; c < 16; c++) {
      const w = order === 'LE' ? readWordLE(rom, addr + c * 2) : readWordBE(rom, addr + c * 2);
      pal.push(wordToRGB(w));
    }
    const canvas = renderPalette(pal);
    const fn = path.join(outDir, `pal_${addr.toString(16).padStart(6, '0')}_${order}.png`);
    fs2.writeFileSync(fn, canvas.toBuffer('image/png'));
  }
  pngCount++;
}

console.log(`\nSaved ${pngCount} palette images to ${outDir}`);
console.log('Done.');
