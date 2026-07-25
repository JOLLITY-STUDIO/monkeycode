/**
 * 简单验证: 跑 N 帧，看 [tsHandler] log 是否出现
 */
import { TsubasaNes } from './src/tsnes/tsubasa-code/tsubasa_nes';

const n = new TsubasaNes({ onFrame() {}, emulateSound: false });

const start = Date.now();
for (let i = 0; i < 90; i++) n.frame();
const elapsed = Date.now() - start;

console.log(`90 frames in ${elapsed}ms`);
console.log('ZP[$27]=0x' + n.cpu.mem[0x27].toString(16).toUpperCase());
