// analyze-unit-struct.mjs — brute-force ROM unit data with different field layouts
import fs from 'fs';

const bin = fs.readFileSync('src/langrisser2/20260713/stages/Langrisser II (Japan)_68K_stage1_0.bin');

// From earlier analysis: config at 0x180196 → +0x0C list at 0x1801B6
// List format: 2-byte count, followed by entries
const listPtr = 0x1801B6;
const count = (bin[listPtr] << 8) | bin[listPtr + 1];
console.log(`Unit list at 0x${listPtr.toString(16).toUpperCase()}: count = ${count}`);
console.log();

// Try different strides: 0x0A, 0x0C, 0x0E, 0x10, 0x12, 0x14, 0x16, 0x18, 0x1A, 0x1C, 0x1E, 0x20
const strides = [0x0A, 0x0C, 0x0E, 0x10, 0x12, 0x14, 0x16, 0x18, 0x1A, 0x1C, 0x1E, 0x20, 0x22, 0x24, 0x28];
const dataStart = listPtr + 2 + 4; // count + 4 unknown bytes

for (const stride of strides) {
  console.log(`\n=== stride=0x${stride.toString(16).toUpperCase().padStart(2,'0')} (${stride} bytes) ===`);
  
  let valid = 0;
  for (let i = 0; i < Math.min(count, 12); i++) {
    const off = dataStart + i * stride;
    if (off + stride > bin.length) break;
    const d = bin.slice(off, off + stride);
    
    // Without knowing fields yet, just dump hex and look for sensible values
    const hex = Array.from(d).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    
    // Check for any byte in range [1,32] (potential x or y within map bounds 32x24)
    const hasXY = [];
    for (let j = 0; j < d.length; j++) {
      if (d[j] >= 1 && d[j] <= 32) hasXY.push(`+${j}=${d[j]}`);
    }
    
    // Check for non-FF, non-00 bytes (these are padding/terminator)
    const nonFiller = d.filter(b => b !== 0xFF && b !== 0x00).length;
    
    // Only show entries that have at least 2 valid-looking bytes
    if (nonFiller >= 2) {
      valid++;
      const xyStr = hasXY.length > 0 ? ` | [${hasXY.join(', ')}]` : '';
      console.log(`  #${i}: ${hex}${xyStr}`);
    }
  }
  console.log(`  => ${valid}/${Math.min(count,12)} non-empty entries`);
}
