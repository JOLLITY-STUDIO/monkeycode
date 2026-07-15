// dump-ram-units-all.mjs — try different strides/offsets to find the real struct
import fs from 'fs';

const ramPath = 'src/langrisser2/20260713/stages/Langrisser II (Japan)_68K-stage1_0.ram';
const ram = fs.readFileSync(ramPath);

const RAM_BASE = 0xFF0000;
const UNIT_ARRAY = 0xFF603C;
const offset = UNIT_ARRAY - RAM_BASE;

// Read word
const rw = (d, pos) => (pos + 1 < d.length) ? (d[pos] << 8) | d[pos + 1] : 0;

// Try multiple strides and field layouts
const strides = [0x0A, 0x0C, 0x10, 0x12, 0x14, 0x16, 0x18, 0x1A, 0x1C, 0x1E, 0x20, 0x24, 0x28, 0x30];

for (const stride of strides) {
  let goodCount = 0;
  let badCount = 0;
  const details = [];
  
  for (let i = 0; i < 32; i++) {
    const off = offset + i * stride;
    if (off + stride > ram.length) break;
    const d = ram.slice(off, off + stride);
    
    // Try different x,y offsets
    const xOffs = [4, 5, 6, 7, 8, 9, 0x0A, 0x0B, 0x0C];
    for (const xo of xOffs) {
      if (xo + 1 >= d.length) continue;
      const x = d[xo];
      const y = d[xo + 1];
      
      // Map is 32×24, but coordinates can be 0-63 or tile-based
      if (x >= 1 && x <= 32 && y >= 1 && y <= 24) {
        goodCount++;
        details.push({unit: i, x, y, xOff: xo});
      } else if (x !== 0 || y !== 0) {
        badCount++;
      }
    }
  }
  
  if (goodCount >= 3) {
    console.log(`\n=== stride=0x${stride.toString(16).toUpperCase().padStart(2,'0')} | good=${goodCount} bad=${badCount} ===`);
    for (const d of details) {
      console.log(`  unit#${d.unit} xy=(${d.x},${d.y}) at struct+${d.xOff}`);
    }
  }
}
