const fs = require('fs');
const lines = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).log', 'utf8').split('\n');

// Find PPU address writes and PPU data writes to nametable area
const ppuAddrHits = [];
const ppuDataHits = [];
const targetPPUAddr = 0x212A; // nametable x=10, y=9

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // PPU_ADDRESS writes
  if (line.includes('PPU_ADDRESS')) {
    ppuAddrHits.push({num: i+1, line: line});
  }
  
  // PPU_DATA writes - opcode 8D 07 20
  if (line.includes('PPU_DATA')) {
    ppuDataHits.push({num: i+1, line: line});
  }
}

console.log('=== PPU_ADDRESS writes (total: ' + ppuAddrHits.length + ') ===');
ppuAddrHits.forEach(h => console.log(h.num + ':', h.line));

console.log('\n=== PPU_DATA writes (total: ' + ppuDataHits.length + ') ===');
ppuDataHits.forEach(h => console.log(h.num + ':', h.line));

// Also search for any write around line 2800-3000 that writes digit tiles
console.log('\n=== Context around PPU_DATA writes ===');
for (const h of ppuDataHits) {
  const idx = h.num - 1;
  const start = Math.max(0, idx - 8);
  const end = Math.min(lines.length, idx + 5);
  console.log('\n--- Around line ' + h.num + ' ---');
  for (let j = start; j < end; j++) {
    console.log((j+1) + ': ' + lines[j]);
  }
}
