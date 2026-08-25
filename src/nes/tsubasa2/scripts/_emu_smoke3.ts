import * as fs from 'fs';
import * as path from 'path';
import { NES } from '../src/core';
import PAPU from '../src/core/papu/index';

const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');

const audioSamplesL: number[] = [];
const audioSamplesR: number[] = [];
const samplesPerFrame: number[] = [];
const apuWritesPerFrame: number[] = [];
const apuWrites: any[] = [];
let currentFrameForHook = 0;

const nes = new NES({
  emulateSound: true,
  sampleRate: 44100,
  onAudioSample: (l, r) => {
    if (samplesPerFrame.length > 0) samplesPerFrame[samplesPerFrame.length - 1]++;
    audioSamplesL.push(l);
    audioSamplesR.push(r);
  },
});
nes.loadROM(fs.readFileSync(ROM_PATH));

const proto: any = (PAPU as any).prototype;
const origWriteReg = proto.writeReg;
proto.writeReg = function (addr: number, value: number) {
  if (addr >= 0x4000 && addr <= 0x4017) {
    if (apuWritesPerFrame.length > 0) apuWritesPerFrame[apuWritesPerFrame.length - 1]++;
    apuWrites.push({ frame: currentFrameForHook, addr, value });
  }
  return origWriteReg.call(this, addr, value);
};

console.log('[smoke3] running 30 frames (with audio + apu hooks)');
for (let f = 1; f <= 30; f++) {
  currentFrameForHook = f;
  samplesPerFrame.push(0);
  apuWritesPerFrame.push(0);
  nes.frame();
  const cpu: any = (nes as any).cpu;
  const mmap: any = (nes as any).mmap;
  console.log('  f' + f + ' pc=$' + (cpu.REG_PC >>> 0).toString(16) + ' chr=[' + Array.from(mmap.chrBanks).join(',') + '] apuW=' + apuWritesPerFrame[f-1] + ' audio=' + samplesPerFrame[f-1]);
}
console.log('[smoke3] done. audio total=' + audioSamplesL.length + ' apu total=' + apuWrites.length);
