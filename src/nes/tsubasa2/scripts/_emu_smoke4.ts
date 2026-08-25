import * as fs from 'fs';
import * as path from 'path';
import { NES } from '../src/core';
import PAPU from '../src/core/papu/index';

const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');

const audioSamplesL: number[] = [];
const samplesPerFrame: number[] = [];

const nes = new NES({
  emulateSound: true,
  sampleRate: 44100,
  onAudioSample: (l, r) => {
    if (samplesPerFrame.length > 0) samplesPerFrame[samplesPerFrame.length - 1]++;
    audioSamplesL.push(l);
  },
});
nes.loadROM(fs.readFileSync(ROM_PATH));

const proto: any = (PAPU as any).prototype;
const origWriteReg = proto.writeReg;
proto.writeReg = function (addr: number, value: number) {
  return origWriteReg.call(this, addr, value);
};

console.log('[smoke4] test 100 frames with ppu.startFrame() per frame');
const ppu: any = (nes as any).ppu;
const mmap: any = (nes as any).mmap;
for (let f = 1; f <= 100; f++) {
  samplesPerFrame.push(0);
  nes.frame();
  ppu.startFrame();
  ppu.advanceDots(262 * 341);
  ppu.renderFramePartially(0, 240);
  ppu.endFrame();
  if (mmap && Array.isArray(mmap.chrBanks) && typeof mmap.load1kVromBank === 'function') {
    for (let slot = 0; slot < 8; slot++) {
      mmap.load1kVromBank(mmap.chrBanks[slot], slot * 0x400);
    }
  }
  if (f % 10 === 0 || f === 1) {
    const cpu: any = (nes as any).cpu;
    console.log('  f' + f + ' pc=$' + (cpu.REG_PC >>> 0).toString(16) + ' chr=[' + Array.from(mmap.chrBanks).join(',') + '] audio=' + samplesPerFrame[f-1]);
  }
}
console.log('[smoke4] done. total audio=' + audioSamplesL.length + ' avg=' + (audioSamplesL.length/100).toFixed(1));
