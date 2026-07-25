import { TsubasaNes } from './src/tsnes/tsubasa-code/tsubasa_nes';

console.log('Creating TsubasaNes...');
const n = new TsubasaNes({ onFrame() {}, emulateSound: false });
console.log('Created. Type of frame:', typeof n.frame);
console.log('cpu mem type:', n.cpu?.mem?.constructor?.name);

try {
  n.frame();
  console.log('Frame 0 OK');
} catch(e: any) {
  console.error('Frame 0 FAIL:', e.message);
}

for (let f = 1; f <= 3; f++) {
  try {
    n.frame();
    console.log('F' + f,
      'scene=' + n.cpu.mem[0x26]?.toString(16).toUpperCase(),
      'jmp=' + n.cpu.mem[0x27]?.toString(16).toUpperCase(),
      'sStat=' + n.cpu.mem[0x4C]?.toString(16).toUpperCase());
  } catch(e: any) {
    console.error('Frame ' + f + ' FAIL:', e.message);
  }
}
