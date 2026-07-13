import fs from 'fs';
const t = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = t.split('\n');

// Search for instructions that load the copyright string address into a register
// 68k patterns: lea ($000252).w, aX; pea ($000252).w; movea.l #$00000252, aX
// Also: move.l #$00000252, dX; move.l #$00000252, (aX)+
// Target addrs: $000252 (or $000240-$00026F)
// But these addresses at ROM begin at $000240, and as absolute long the full 24-bit address is $000240

const targets = ['000240', '000252', '00025E', '000250'];
console.log('=== Instructions referencing copyright string area ===');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // Skip lines that are just address comments
  if (l.match(/^\s+;\s+\$/)) continue;
  
  for (const tgt of targets) {
    if (l.includes(tgt) && 
        (l.includes('lea') || l.includes('movea') || l.includes('move.l') ||
         l.includes('pea') || l.includes('jsr') || l.includes('addi.l') ||
         l.includes('subi.l') || l.includes('cmpi.l'))) {
      console.log(`${(i+1).toString().padStart(7)}: ${l.trim().substring(0, 180)}`);
      break;
    }
  }
}

// Also search for the string "Copyright" in the ROM data directly
console.log('\n=== Search for "NCS/MASAYA" in ROM ===');
const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');
const search = Buffer.from('NCS/MASAYA');
for (let i = 0; i < rom.length - search.length; i++) {
  let m = true;
  for (let j = 0; j < search.length; j++) {
    if (rom[i+j] !== search[j]) { m = false; break; }
  }
  if (m) console.log(`  ROM $${i.toString(16).padStart(6,'0')}`);
}
