/**
 * _emu_smoke.ts — Smoke test: 跑 30 帧验证脚本能跑通
 */
import * as fs from 'fs';
import * as path from 'path';
import { NES } from '../src/core';

const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const N = 30;

const audioSamples: number[] = [];
const nes = new NES({
  emulateSound: true,
  sampleRate: 44100,
  onAudioSample: (l: number, r: number) => { audioSamples.push(l); audioSamples.push(r); },
});
nes.loadROM(fs.readFileSync(ROM_PATH));

console.log(`[smoke] running ${N} frames...`);
for (let i = 0; i < N; i++) {
  nes.frame();
  console.log(`  f${i+1} samples=${audioSamples.length/2} pc=$${((nes as any).cpu.REG_PC >>> 0).toString(16)}`);
}
console.log(`[smoke] OK. audio samples: ${audioSamples.length/2}`);
