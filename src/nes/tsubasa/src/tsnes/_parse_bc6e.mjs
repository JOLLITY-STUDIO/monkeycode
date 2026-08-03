import fs from 'fs';

const c = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8');

// Find the full BC6E data table
// In bank_01.asm, BC6E = offset 0x3C6E from bank start (bank 01 starts at 0x2000)
// Look for the data section at 0x3C6E
const idx = c.indexOf('0x003C6E');
if (idx >= 0) {
  // Get a big chunk - the raw .byte lines
  const chunk = c.substring(idx, idx + 3000);
  const lines = chunk.split('\n');
  
  const bytes = [];
  for (const line of lines) {
    const m = line.match(/\.byte\s+\$([0-9A-F]{2})/);
    if (m) bytes.push(parseInt(m[1], 16));
  }
  
  console.log('BC6E table total bytes:', bytes.length);
  
  // Parse as PPU upload packets
  // Each packet: [addrHi, addrLo, ...tiles...]
  // With control codes to separate packets
  let i = 0;
  while (i + 1 < bytes.length) {
    const hi = bytes[i];
    const lo = bytes[i + 1];
    const addr = (hi << 8) | lo;
    
    // if hi is FF or FE -> this is a control code, not a PPU addr
    if (hi === 0xFF || hi === 0xFE) {
      console.log(`\n[CONTROL] ${hi.toString(16).padStart(2,'0')} ${lo.toString(16).padStart(2,'0')}`);
      i += 2;
      continue;
    }
    
    // Otherwise: address, then tile bytes follow until next addr
    let tiles = [];
    let j = i + 2;
    // Read tiles: next byte could be a tile or next PPU addr hi
    while (j + 1 < bytes.length) {
      const nextHi = bytes[j];
      const nextLo = bytes[j + 1];
      const nextAddr = (nextHi << 8) | nextLo;
      // If this looks like a PPU nametable address (0x2000-0x2FFF), stop
      if (nextAddr >= 0x2000 && nextAddr <= 0x2FFF) break;
      // If it's a control code, stop
      if (nextHi === 0xFF || nextHi === 0xFE) break;
      tiles.push(bytes[j]);
      j++;
    }
    
    if (tiles.length > 0) {
      const tileStr = tiles.map(t => t.toString(16).padStart(2,'0').toUpperCase()).join(' ');
      console.log(`\nPPU_ADDR $${addr.toString(16).toUpperCase()} → tiles: ${tileStr} (${tiles.length} tiles)`);
    }
    i = j;
    if (i > 200) break; // safety
  }
}
