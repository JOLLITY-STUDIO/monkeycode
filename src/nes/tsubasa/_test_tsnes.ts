import { TsubasaNes } from './src/tsnes/tsubasa-code/tsubasa_nes';

const n = new TsubasaNes({ onFrame() {}, emulateSound: false });
console.log('TSNES created. running frame 0...');
n.frame();
n.frame(); // 2 warmup frames
console.log('Frame done. ZP[$26]=0x' + n.cpu.mem[0x26].toString(16).toUpperCase());
console.log('ZP[$27]=0x' + n.cpu.mem[0x27].toString(16).toUpperCase());
console.log('ZP[$4C]=0x' + n.cpu.mem[0x4C].toString(16).toUpperCase());
