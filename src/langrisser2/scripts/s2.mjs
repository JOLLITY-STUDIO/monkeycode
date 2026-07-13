import fs from 'fs';
const t = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = t.split('\n');

// Show first non-empty lines to understand format
console.log('=== Label format samples ===');
let shown = 0;
for (let i = 0; i < lines.length && shown < 20; i++) {
  const l = lines[i].trim();
  if (l && (l.startsWith('loc_') || l.startsWith('FUN_') || l.match(/^[\w@]+\:/))) {
    console.log(`${(i+1).toString().padStart(7)}: ${l.substring(0, 120)}`);
    shown++;
  }
}

// Find text rendering area - search for VDP_DATA writes with tile values
console.log('\n=== VDP_DATA writes ===');
let cnt = 0;
for (let i = 0; i < lines.length && cnt < 15; i++) {
  if (lines[i].includes('VDP_DATA')) {
    console.log(`${(i+1).toString().padStart(7)}: ${lines[i].substring(0, 140)}`);
    cnt++;
  }
}

// Search for "1994" or address $0c9xxx range
console.log('\n=== Searching for $C9xx addresses ===');
cnt = 0;
for (let i = 0; i < lines.length && cnt < 10; i++) {
  if (/C9[A-Fa-f0-9]{2}/.test(lines[i]) && !lines[i].includes('$C000')) {
    console.log(`${(i+1).toString().padStart(7)}: ${lines[i].substring(0, 140)}`);
    cnt++;
  }
}
