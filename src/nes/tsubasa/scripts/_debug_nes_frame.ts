/**
 * Quick debug: check what jsnes NES renders on first frame
 * 执行: npx tsx scripts/_debug_nes_frame.ts
 */
import NES from '../src/tsnes/src/nes';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const CWD = process.cwd();
const romU8 = new Uint8Array(readFileSync(join(CWD, 'rom.nes')));

let frameCount = 0;
const nes = new NES({
  onFrame(buffer: Uint32Array) {
    frameCount++;
    if (frameCount <= 5 || frameCount % 30 === 0) {
      // Count unique colors
      const colors = new Set<number>();
      let nonZero = 0;
      for (let i = 0; i < 256 * 240; i++) {
        const c = buffer[i] & 0xFFFFFF;
        if (c !== 0) nonZero++;
        colors.add(c);
      }
      console.log(`  [frame ${frameCount}] unique colors: ${colors.size}, non-black pixels: ${nonZero} / ${256*240}`);

      // Sample first 10 unique colors
      const samples = [...colors].slice(0, 10).map(c => '#' + c.toString(16).padStart(6, '0'));
      console.log(`    sample colors: ${samples.join(' ')}`);
    }
  },
  emulateSound: false,
});

nes.loadROM(romU8);

function hex(v: number) { return v.toString(16).padStart(2, '0'); }

// Run boot frames
console.log('Running boot frames...');
for (let i = 0; i < 30; i++) nes.frame();

let scene = nes.cpu.mem[0x26];
console.log(`After boot: scene=$26=${hex(scene)}`);

// Run to scene 0
if (scene !== 0) {
  for (let i = 0; i < 200; i++) {
    nes.frame();
    scene = nes.cpu.mem[0x26];
    if (scene === 0) break;
  }
}
console.log(`After seeking: scene=$26=${hex(scene)}`);

if (scene === 0) {
  console.log('Running scene 0 frames (first 20)...');
  frameCount = 0;
  for (let i = 0; i < 20; i++) {
    nes.frame();
    if (frameCount % 5 === 0) {
      const z4A = nes.cpu.mem[0x4A];
      console.log(`  scene0 frame ${i}: z4A=${z4A}`);
    }
  }
}
