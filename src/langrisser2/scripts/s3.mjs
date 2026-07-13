import fs from 'fs';

const t = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = t.split('\n');

// Title screen rendering: look for writes that set tile indices into Plane A nametable
// Plane A nametable starts at VRAM address $C000
// Setting VRAM addr to nametable area: move.l #$40000003, (VDP_CTRL) - sets write to $C000

// Step 1: Find VDP_CTRL writes that set nametable addresses
console.log('=== VDP_CTRL writes to nametable region ($4000-$4FFF or $C000+) ===');
let cnt = 0;
for (let i = 0; i < lines.length && cnt < 30; i++) {
  const l = lines[i];
  if (l.includes('VDP_CTRL') && !l.includes('C0000000') && !l.startsWith(';')) {
    // Check surrounding context for address values
    if (/(\$40[0-9A-Fa-f]|\$4[1-9A-Fa-f]|\$[CDEF][0-9A-Fa-f])/.test(l)) {
      console.log(`${(i+1).toString().padStart(7)}: ${l.trim().substring(0, 140)}`);
      cnt++;
    }
  }
}

// Step 2: Find tile value writes (0x080-0x0FF) to VDP_DATA
console.log('\n=== Tile index writes to VDP_DATA (values $080-$0FF) ===');
cnt = 0;
for (let i = 0; i < lines.length && cnt < 30; i++) {
  const l = lines[i];
  if (l.includes('VDP_DATA') && /\$0[89A-Fa-f][0-9A-Fa-f]/.test(l)) {
    console.log(`${(i+1).toString().padStart(7)}: ${l.trim().substring(0, 140)}`);
    cnt++;
  }
}

// Step 3: Look at function $010ABE and nearby text rendering
console.log('\n=== Function labels around title screen area ($010ABE etc) ===');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (/^loc_010ABE|^loc_010FDE|^loc_01105C|^loc_0110A8|^loc_00CC4E|^loc_00C7EC/.test(l)) {
    console.log(`${(i+1).toString().padStart(7)}: ${l.trim()}`);
    // Show next 40 lines
    for (let j = i + 1; j < Math.min(i + 45, lines.length); j++) {
      const jl = lines[j].trim();
      if (jl) console.log(`${(j+1).toString().padStart(7)}: ${jl.substring(0, 140)}`);
    }
    console.log('...');
  }
}
