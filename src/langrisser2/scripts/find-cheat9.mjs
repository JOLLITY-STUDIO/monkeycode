import { readFileSync } from 'fs';

const asm = readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = asm.split('\n');

// Strategy 1: Look for jump table pattern add.w d0,d0 + jmp (pc,d0.w) + dc.w labels
// near button processing code (around $02B000-$02C000)

console.log('=== Searching for jump tables in $02B000-$02D000 area ===');
let inArea = false;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // Detect area start
  if (l.includes('$02B0') || l.includes('$02C0') || l.includes('$02D0')) {
    inArea = true;
  }
  if (l.includes('$02E0') || l.includes('$02F0') || l.includes('$0300')) {
    // Still in our range
  } else if (inArea && (l.includes('$0400') || l.includes('$0500'))) {
    inArea = false;
  }
  
  if (!inArea) continue;
  
  // Look for jump table: dc.w sequence of labels
  if (l.trimStart().startsWith('dc.w') && l.includes('loc_')) {
    const next = i + 1 < lines.length ? lines[i + 1] : '';
    const next2 = i + 2 < lines.length ? lines[i + 2] : '';
    if ((next.trimStart().startsWith('dc.w') && next.includes('loc_')) ||
        (next2.trimStart().startsWith('dc.w') && next2.includes('loc_'))) {
      // Found potential jump table
      const before = Math.max(0, i - 10);
      const after = Math.min(lines.length - 1, i + 30);
      console.log(`\n--- Jump table at line ${i+1} ---`);
      for (let j = before; j <= after; j++) {
        console.log(`${(j+1).toString().padStart(7)}: ${lines[j].substring(0, 140)}`);
      }
    }
  }
}

// Strategy 2: Search for specific RAM flags related to shop mode
// The hidden shop would toggle some flag, e.g. $FFFFxxxx
console.log('\n\n=== Searching for shop-related RAM flags in $02A000-$02D000 ===');
let inShopArea = false;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('$02A') || l.includes('$02B') || l.includes('$02C') || l.includes('$02D')) {
    inShopArea = true;
  }
  if (l.includes('$02E')) {
    inShopArea = false;
  }
  
  if (!inShopArea) continue;
  
  // Look for code that branches differently based on a flag
  if (l.includes('cmpi.b') && l.includes('FF') && !l.includes('loc_') && !l.includes('dc')) {
    const s = Math.max(0, i - 3);
    const e = Math.min(lines.length - 1, i + 5);
    for (let j = s; j <= e; j++) {
      console.log(`${(j+1).toString().padStart(7)}: ${lines[j].substring(0, 140)}`);
    }
  }
}
