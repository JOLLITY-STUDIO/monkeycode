// parse-ram-units.mjs — parse RAM unit array at 0xFF603C with known struct
// Per ASM: stride 0x60, 8 sub-slots of 0x0C each
// X/Y at sub-slot+6/+7 (confirmed by ASM move.b d2,$6(a0))
import fs from 'fs';

const ram = fs.readFileSync('src/langrisser2/20260713/stages/Langrisser II (Japan)_68K-stage1_0.ram');
const offset = 0xFF603C - 0xFF0000; // 0x603C

const SUB_STRIDE = 0x0C;
const CMD_STRIDE = 0x60; // 8 * 0x0C = 0x60
const NUM_COMMANDERS = 20; // 20 entries in array

console.log('=== RAM Unit Array at 0xFF603C ===\n');
console.log('Structure: 20 commanders × 0x60 bytes, each with 8 sub-slots of 0x0C bytes');
console.log('FF at sub-slot[0] = inactive/empty slot\n');

for (let cmd = 0; cmd < NUM_COMMANDERS; cmd++) {
  const base = offset + cmd * CMD_STRIDE;
  if (base + CMD_STRIDE > ram.length) break;
  
  const slots = [];
  for (let s = 0; s < 8; s++) {
    const slotOff = base + s * SUB_STRIDE;
    const d = ram.slice(slotOff, slotOff + SUB_STRIDE);
    const active = d[0] !== 0xFF;
    const x = d[6];
    const y = d[7];
    const hex = Array.from(d).map(b => b.toString(16).padStart(2, '0')).join(' ');
    
    slots.push({ s, active, x, y, hex, raw: Array.from(d) });
  }
  
  if (slots.some(s => s.active)) {
    const addr = 0xFF603C + cmd * CMD_STRIDE;
    console.log(`── Commander ${cmd} @ 0x${addr.toString(16).toUpperCase()} ──`);
    for (const sl of slots) {
      const mark = sl.active ? '●' : '○';
      const xy = sl.active ? ` (${sl.x},${sl.y})` : '';
      console.log(`  ${mark} Slot ${sl.s}: ${sl.hex}${xy}`);
    }
    console.log();
  }
}

// Now try to extract meaningful data from active main slots (slot 0)
console.log('=== Active Commanders (Slot 0 data) ===\n');
for (let cmd = 0; cmd < NUM_COMMANDERS; cmd++) {
  const base = offset + cmd * CMD_STRIDE;
  const d0 = ram.slice(base, base + SUB_STRIDE);
  if (d0[0] === 0xFF) continue; // inactive
  
  const x = d0[6], y = d0[7];
  // Based on sub-slot 0 layout: 
  // +0: type/ID byte
  // +1: ?? 
  // +2-3: ??
  // +6: X
  // +7: Y
  // +8-11: ??
  
  console.log(`Commander ${cmd}: xy=(${x},${y}) | raw: ${Array.from(d0).map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
}

// Also dump mercenary positions from active sub-slots 1-7
console.log('\n=== Mercenary Positions ===');
for (let cmd = 0; cmd < NUM_COMMANDERS; cmd++) {
  const base = offset + cmd * CMD_STRIDE;
  for (let s = 1; s < 8; s++) {
    const slotOff = base + s * SUB_STRIDE;
    const d = ram.slice(slotOff, slotOff + SUB_STRIDE);
    if (d[0] === 0xFF) continue;
    const x = d[6], y = d[7];
    console.log(`  Cmd ${cmd} Slot ${s}: (${x},${y})  raw: ${Array.from(d).map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
  }
}
