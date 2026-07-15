// bruteforce-rom-units.mjs — try all stride/offset combos for Stage 1 unit data
import fs from 'fs';

const bin = fs.readFileSync('src/langrisser2/20260713/stages/Langrisser II (Japan)_68K_stage1_0.bin');

const readU16 = (addr) => ((bin[addr] << 8) | bin[addr + 1]);
const readU32 = (addr) => ((bin[addr] << 24) | (bin[addr + 1] << 16) | (bin[addr + 2] << 8) | bin[addr + 3]) >>> 0;

// Stage 1 config pointer
const cfgPtr = readU32(0x18005E) & 0xFFFFFF;
console.log(`Stage 1 cfgPtr: 0x${cfgPtr.toString(16).toUpperCase()}`);

// Unit list pointer at cfgPtr + 0x0C
const ulPtr = readU32(cfgPtr + 0x0C) & 0xFFFFFF;
console.log(`Unit list ptr: 0x${ulPtr.toString(16).toUpperCase()}`);

// Read count
const count = readU16(ulPtr);
console.log(`Unit count: ${count}`);
console.log();

// Dump raw bytes after count
console.log('=== Raw bytes at unit list + 2 ===');
for (let i = 0; i < 512; i += 16) {
  const addr = ulPtr + 2 + i;
  const row = Array.from(bin.slice(addr, addr + 16));
  const hex = row.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  console.log(`  ${addr.toString(16).toUpperCase()}: ${hex}`);
}

// Now try parsing with different layouts
// Known from ASM: classId at +0x1A, X at +0x06, Y at +0x07, stride = 0x24
console.log('\n=== Testing stride=0x24 with ASM offsets ===');
const STRIDE = 0x24;
const startOff = ulPtr + 2;
for (let i = 0; i < count; i++) {
  const a = startOff + i * STRIDE;
  const cls = bin[a + 0x1A];
  const x = bin[a + 0x06];
  const y = bin[a + 0x07];
  const flag = bin[a + 0x08];
  const hp = readU16(a + 0x18);
  const item = bin[a + 0x09];
  const extra = bin[a + 0x1C];
  
  const valid = cls > 0 && cls < 50 && x >= 1 && x <= 32 && y >= 1 && y <= 24;
  const mark = valid ? '✓' : '✗';
  console.log(`  #${i}: classId=${cls.toString(16).padStart(2,'0')} xy=(${x},${y}) hp=${hp} flag=${flag.toString(16).padStart(2,'0')} item=${item.toString(16).padStart(2,'0')} extra=${extra.toString(16).padStart(2,'0')} ${mark}`);
}

// Also try offset +4 and +6 as start
for (const skip of [0, 2, 4]) {
  console.log(`\n=== Testing stride=0x24, start=ulPtr+${2+skip} ===`);
  const start = ulPtr + 2 + skip;
  for (let i = 0; i < count; i++) {
    const a = start + i * STRIDE;
    const cls = bin[a + 0x1A];
    const x = bin[a + 0x06];
    const y = bin[a + 0x07];
    const valid = cls > 0 && cls < 50 && x >= 1 && x <= 32 && y >= 1 && y <= 24;
    if (valid) {
      console.log(`  #${i}: classId=${cls.toString(16).padStart(2,'0')} xy=(${x},${y}) ✓`);
    }
  }
}

// Try different strides
console.log('\n=== Testing different strides from ulPtr+2 ===');
for (const stride of [0x08, 0x0A, 0x0C, 0x10, 0x12, 0x14, 0x16, 0x18, 0x1A, 0x1C, 0x1E, 0x20, 0x24, 0x28]) {
  let valid = 0;
  const results = [];
  const start = ulPtr + 2;
  for (let i = 0; i < count; i++) {
    const a = start + i * stride;
    if (a + stride > bin.length) break;
    
    // Try classId at different positions
    for (const ciOff of [0, 0x1A, 1, 2, 4, 6, 8]) {
      const cls = bin[a + ciOff];
      // Try x at different positions
      for (const xOff of [0, 1, 2, 4, 6, 7, 8]) {
        const x = bin[a + xOff];
        const y = bin[a + xOff + 1];
        if (cls >= 1 && cls <= 30 && x >= 1 && x <= 32 && y >= 1 && y <= 24) {
          results.push({i, cls, x, y, clsOff: ciOff, xyOff: xOff});
          valid++;
        }
      }
    }
  }
  if (results.length >= 3) {
    console.log(`  stride=0x${stride.toString(16).padStart(2,'0')}: ${results.length} valid combos`);
    for (const r of results.slice(0, 6)) {
      console.log(`    #${r.i}: classId=${r.cls} (at +${r.clsOff}) xy=(${r.x},${r.y}) (at +${r.xyOff})`);
    }
  }
}
