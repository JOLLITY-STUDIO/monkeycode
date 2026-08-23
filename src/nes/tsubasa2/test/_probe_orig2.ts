/**
 * Ground truth 探针2：逐帧段 dump 原版开场 CHR bank 时序
 */
import NES from '../src/core/nes';
import * as fs from 'fs';

const romPath = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = new Uint8Array(fs.readFileSync(romPath));

const nes: any = new NES();
nes.loadROM(rom);

const out: string[] = [];
const checkpoints = [0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120];
let last = 0;
for (const f of checkpoints) {
  for (let i = last; i < f; i++) nes.frame();
  last = f;
  const mapper = nes.mmap;
  const ppu = nes.ppu;
  let bufNz = 0;
  for (let i = 0; i < ppu.buffer.length; i++) if (ppu.buffer[i] !== 0) bufNz++;
  out.push(
    'frame=' + f +
    ' chrBanks=[' + Array.from(mapper.getChrBankMap()).join(',') + ']' +
    ' ram0490=[' + Array.from(nes.cpu.mem.slice(0x0490, 0x0498)).join(',') + ']' +
    ' bufNz=' + bufNz +
    ' bgVis=' + ppu.f_bgVisibility + ' spVis=' + ppu.f_spVisibility +
    ' bgPat=' + ppu.f_bgPatternTable + ' spPat=' + ppu.f_spPatternTable +
    ' nTbl=' + ppu.f_nTblAddress,
  );
}

fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/scripts/_probe_orig2_out.txt', out.join('\n'));
console.log('DONE');
