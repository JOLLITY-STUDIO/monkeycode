// Step 1: Read ROM raw bytes
const fs = require('fs');
const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');

// ROM has no header - ROM addr == file offset
// $082114 = 0x82114 bytes from start

// Read 216 bytes (54 words × 2 = enough for a ~9×6 panel maybe?)
// Let's read more to be safe
const offset = 0x82114;
const panelWords = [];
for (let i = 0; i < 200; i++) {
  const val = (rom[offset + i*2] << 8) | rom[offset + i*2 + 1];
  panelWords.push(val);
  // Check if we've hit the end (0x0000 sentinel)
  if (val === 0) {
    console.log(`Found sentinel at word index ${i}`);
    break;
  }
}

// VDP nametable word format:
// bits 0-10:  tile index (0-2047)
// bit 11:     horizontal flip
// bit 12:     vertical flip  
// bit 13-14:  palette (0-3)
// bit 15:     priority

console.log(`\n=== $082114 Nametable Data (${panelWords.length} entries) ===`);
panelWords.forEach((w, i) => {
  const tileIdx = w & 0x07FF;
  const hFlip = (w >> 11) & 1;
  const vFlip = (w >> 12) & 1;
  const pal = (w >> 13) & 3;
  const prio = (w >> 15) & 1;
  console.log(`[${i.toString().padStart(3)}] 0x${w.toString(16).padStart(4,'0')} → tile=0x${tileIdx.toString(16).padStart(3,'0')}(${tileIdx}) pal=${pal}`);
});

// Now look at the A122 function to see how it processes this data
// The function at loc_00A122 takes a2 = pointer to this panel data
// and populates a structure at $A49C area
console.log(`\n=== Unique tile indices ===`);
const uniqueTiles = [...new Set(panelWords.map(w => w & 0x07FF))];
uniqueTiles.sort((a,b) => a-b);
console.log(`Total unique tiles: ${uniqueTiles.length}`);
console.log(uniqueTiles.map(t => '0x' + t.toString(16).padStart(3,'0') + '('+t+')').join(', '));
