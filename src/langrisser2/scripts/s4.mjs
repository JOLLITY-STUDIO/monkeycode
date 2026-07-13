import fs from 'fs';
const t = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = t.split('\n');

// Find all VDP_CTRL writes (that set VRAM address)
console.log('=== All VDP_CTRL writes (setting VRAM address) ===');
let cnt = 0;
for (let i = 0; i < lines.length && cnt < 40; i++) {
  const l = lines[i];
  if (/move\.l\s+#\$[4-7][0-9A-Fa-f]{5},\(VDP_CTRL\)/.test(l)) {
    const addr = l.match(/\$([4-7][0-9A-Fa-f]{5})/)[1];
    // VRAM addr = (vdp_addr & 0x3FFF) << 1, or for VRAM write: cmd & 0x3FFF gives word addr
    // VDP write command: bits 0-1 = 01, bits 2-3 = 10, bits 4-13 = addr >> 1, bits 14-15 = 01
    // For Plane A nametable at VRAM $C000: VDP command = ($C000/2) | $40000000 = $6000 | $40000000 = $40006000
    // Wait, let me recalculate:
    // VRAM addr $C000, command for VRAM write:
    // bits 0-1: 01 (CD4-CD5, VRAM write mode)
    // bit 4: 0 (CD3, low nibble of upper byte of addr)
    // The actual format: $4xxx yyyy where x=first nibble of (addr>>1), y=second nibble
    // For $C000: addr>>1 = $6000, so command = $40006000 ... nope
    
    // Actually VDP command format:
    // 4 0 0 0 0 0 0 3 = $40000003 for VRAM write
    // Let me just decode what addresses these correspond to
    
    // VDP command = (addr & 0x3FFF) << 16 | (addr & 0xC000) >> 14 | 0x40000000 | mode
    // For VRAM write (mode=1): 
    // bits 15-14: 01 (CD1-CD0) 
    // bits 31-30: 01 (CD4-CD3 with bit 4 set?)
    // 
    // Actually I think the convention in this ASM is:
    // move.l #$XXXX000Y, (VDP_CTRL) where XXXX is (addr & 0x3FFF) | 0x4000, Y is the command byte
    // $40000003 means: CD1=0, CD0=0, CD2=0, CD3=0, CD4=0, CD5=0 → VRAM read
    // $40000080: VRAM write at a specific address?
    
    console.log(`${(i+1).toString().padStart(7)}: ${l.trim().substring(0, 160)}`);
    cnt++;
  }
}
