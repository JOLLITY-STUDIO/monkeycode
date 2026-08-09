const { BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW } = require('./BGM00');

const tracks = [
  { name: 'SQ1', data: BGM00_TRACK_SQ1 },
  { name: 'SQ2', data: BGM00_TRACK_SQ2 },
  { name: 'TRI', data: BGM00_TRACK_TRI },
  { name: 'NOISE', data: BGM00_TRACK_NOISE },
];

console.log('BGM00_RAW length:', BGM00_RAW.length);
console.log();

// Print first 20 bytes of RAW
console.log('RAW[0:20]:', Array.from(BGM00_RAW.slice(0, 20)).map(b => b.toString(16).padStart(2, '0')).join(' '));
console.log();

// Print header (first 12 bytes)
const header = Array.from(BGM00_RAW.slice(0, 12)).map(b => b.toString(16).padStart(2, '0')).join(' ');
console.log('Header (12B):', header);
console.log('Byte 12 (0xFF separator):', BGM00_RAW[12].toString(16));
console.log();

// Each track starts after previous track + 0xFF separator
let rawOff = 13; // skip 12B header + 1B 0xFF
for (const t of tracks) {
  const startOff = rawOff;
  const endOff = startOff + t.data.length;
  const firstBytes = Array.from(BGM00_RAW.slice(startOff, Math.min(startOff + 16, endOff)))
    .map(b => (b >= 0xE0 ? `$${(b & 0x1F).toString(16).padStart(2, '0')}` : b.toString(16).padStart(2, '0')))
    .join(' ');
  
  console.log(`${t.name} (len=${t.data.length}): RAW[${startOff}-${endOff}): ${firstBytes}...`);
  
  // Check separator
  if (endOff < BGM00_RAW.length) {
    const sep = BGM00_RAW[endOff];
    console.log(`  separator at RAW[${endOff}]: 0x${sep.toString(16).padStart(2, '0')} ${sep === 0xFF ? '✓' : '✗ NOT FF!'}`);
  }
  
  // Next track offset
  rawOff = endOff + 1; // +1 for 0xFF separator
}

// Now track by track initial bytes
console.log('\n=== Per-track array first bytes ===');
for (const t of tracks) {
  console.log(`${t.name} first 16:`, Array.from(t.data.slice(0, 16))
    .map(b => (b >= 0xE0 ? `$${(b & 0x1F).toString(16).padStart(2, '0')}` : b.toString(16).padStart(2, '0')))
    .join(' '));
}
