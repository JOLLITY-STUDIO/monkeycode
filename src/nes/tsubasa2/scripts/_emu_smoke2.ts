import * as fs from 'fs';
import * as path from 'path';
import { NES } from '../src/core';
import PAPU from '../src/core/papu/index';

const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const N = 30;

const apuWrites: any[] = [];
const nes = new NES({
  emulateSound: true,
  sampleRate: 44100,
  onAudioSample: () => {},
});
nes.loadROM(fs.readFileSync(ROM_PATH));

const proto: any = (PAPU as any).prototype;
const origWriteReg = proto.writeReg;
proto.writeReg = function (addr: number, value: number) {
  if (addr >= 0x4000 && addr <= 0x4017) apuWrites.push({ addr, value });
  return origWriteReg.call(this, addr, value);
};

console.log('[smoke2] running ' + N + ' frames...');
for (let i = 0; i < N; i++) {
  nes.frame();
  const cpu: any = (nes as any).cpu;
  const mmap: any = (nes as any).mmap;
  const chr = Array.from(mmap.chrBanks).join(',');
  const prg = mmap.prgBankMap[0x8000];
  console.log('  f' + (i+1) + ' pc=$' + (cpu.REG_PC >>> 0).toString(16) + ' chr=[' + chr + '] prg@8000=' + prg + ' apuWrites=' + apuWrites.length);
}
console.log('[smoke2] done. apuWrites=' + apuWrites.length);
