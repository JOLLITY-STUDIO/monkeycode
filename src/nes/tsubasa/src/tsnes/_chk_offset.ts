import { BGM00_RAW, BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE } from './mini-audio/bgm-data/BGM00';

console.log('Total raw:', BGM00_RAW.length);
console.log('Header:', [...BGM00_RAW.slice(0, 12)]);
console.log('Byte 12:', '0x' + BGM00_RAW[12].toString(16));

// Parse header — NES addresses
for (let i = 0; i < 4; i++) {
  const ch = BGM00_RAW[i * 3];
  const lo = BGM00_RAW[i * 3 + 1];
  const hi = BGM00_RAW[i * 3 + 2];
  const nes = lo | (hi << 8);
  const off = nes - 0xB7AD;
  console.log(`  ch${ch}: NES $${nes.toString(16).padStart(4, '0')} offset=${off}`);
}

// Check raw data at computed offsets
const offs = [13, 784, 1457, 1938];
const tracks = [BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE];
const names = ['SQ1', 'SQ2', 'TRI', 'NOISE'];

for (let i = 0; i < 4; i++) {
  const off = offs[i];
  const track = tracks[i];
  console.log(`\n${names[i]}:`);
  console.log(`  offset=${off}, track len=${track.length}`);
  console.log(`  RAW[${off}..${off + 9}]:`, [...BGM00_RAW.slice(off, off + 10)].map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
  console.log(`  TRACK[0..9]:`, [...track.slice(0, 10)].map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
  
  // Verify match
  let match = true;
  for (let j = 0; j < Math.min(20, track.length); j++) {
    if (BGM00_RAW[off + j] !== track[j]) {
      console.log(`  MISMATCH at pos ${j}: raw=0x${BGM00_RAW[off+j].toString(16)} vs track=0x${track[j].toString(16)}`);
      match = false;
    }
  }
  if (match) console.log(`  ✓ First 20 bytes match`);
}
