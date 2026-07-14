import { readFileSync } from 'fs';

// Read ROM and ASM
const rom = readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');
const asm = readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = asm.split('\n');

// Strategy: Look for code patterns that match any button single-bit value
// AND check another button single-bit value, with state tracking.
// Common pattern: btst #bit,button_reg + beq/bne + inc/dec counter

// Sega Genesis button bits in d0 (byte):
// bit0=Up, bit1=Down, bit2=Left, bit3=Right, bit4=B, bit5=C, bit6=A, bit7=Start

// For cheat code: B(bit4), Start(bit7), Right(bit3), Left(bit2), Up(bit0), Down(bit1),
//                 B(bit4), A(bit6), B(bit4), A(bit6), Up(bit0), Down(bit1),
//                 Left(bit2), Right(bit3), Start(bit7)

// The code likely uses btst #bit,d0 + beq/bne pattern
// Let's search for clusters of btst instructions checking button bits

// Find all btst instructions
const btstLines = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('btst') && (l.includes('#0,') || l.includes('#1,') || l.includes('#2,') || 
      l.includes('#3,') || l.includes('#4,') || l.includes('#5,') || l.includes('#6,') || l.includes('#7,'))) {
    btstLines.push(i);
  }
}

console.log(`Total btst lines with bit tests: ${btstLines.length}`);

// Find clusters (consecutive btst within 30 lines)
let clusters = [];
let clusterStart = 0;
for (let i = 1; i <= btstLines.length; i++) {
  if (i === btstLines.length || btstLines[i] - btstLines[i-1] > 30) {
    const cluster = btstLines.slice(clusterStart, i);
    if (cluster.length >= 5) {
      clusters.push(cluster);
    }
    clusterStart = i;
  }
}

console.log(`btst clusters (5+): ${clusters.length}`);

// Show clusters that test multiple different bits
for (const cluster of clusters) {
  const testedBits = new Set();
  for (const idx of cluster) {
    const l = lines[idx];
    const m = l.match(/btst\s+#(\d)/);
    if (m) testedBits.add(parseInt(m[1]));
  }
  
  // Check if tests both direction bits AND function bits (interesting!)
  const hasDirection = [0,1,2,3].some(b => testedBits.has(b));
  const hasFunction = [4,5,6,7].some(b => testedBits.has(b));
  
  if (hasDirection && hasFunction && testedBits.size >= 3) {
    const start = Math.max(0, cluster[0] - 20);
    const end = Math.min(lines.length - 1, cluster[cluster.length-1] + 20);
    console.log(`\n=== btst cluster at lines ${cluster[0]+1}-${cluster[cluster.length-1]+1}, bits: ${[...testedBits].sort().join(',')} ===`);
    for (let j = start; j <= end; j++) {
      const l = lines[j];
      const trimmed = l.trimStart();
      // Skip empty lines and pure comment lines
      if (trimmed && !trimmed.startsWith(';') && !trimmed.startsWith('dc.')) {
        console.log(`${(j+1).toString().padStart(7)}: ${l.substring(0, 140)}`);
      }
    }
  }
}

// Also try: look for specific ROM data patterns near shop-related code
// Search ROM for ASCII "SHOP" or shop-related strings
console.log('\n\n=== Searching for shop-related strings in ROM ===');
for (let i = 0; i < rom.length - 3; i++) {
  const s = String.fromCharCode(rom[i], rom[i+1], rom[i+2], rom[i+3]);
  if (s === 'SHOP' || s === 'shop' || s === 'Shop') {
    console.log(`Found "${s}" at ROM 0x${i.toString(16)}`);
  }
}
