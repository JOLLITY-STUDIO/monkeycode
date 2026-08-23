import NES from '../../tsnes/src/nes';
import * as fs from 'fs';

const romPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm\\dist\\tsubasa2.nes';
const outPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\debug\\run_300.txt';
const romData = fs.readFileSync(romPath);

const nes = new NES({
  onFrame: () => {},
  onAudioSample: () => {},
  onStatusUpdate: () => {},
  emulateSound: false,
});

nes.loadROM(romData);

const cpu: any = nes.cpu;
// 检查 mem 是否存在
const mem = cpu.mem;
if (!mem) {
  console.log('ERROR: cpu.mem is undefined!');
  console.log('cpu keys:', Object.keys(cpu).slice(0, 20));
  process.exit(1);
}

const lines: string[] = [];
function log(msg: string) { lines.push(msg); console.log(msg); }

log('=== 300 frames trace ===');
log('frame | PC     | A  | X  | Y  | S  | ram_00ED | ram_001B | ram_0628 | ram_0044 | ram_0048');

for (let f = 1; f <= 300; f++) {
  nes.frame();
  
  if (f <= 10 || f % 10 === 0) {
    const pc = cpu.REGISTER_PC || 0;
    const a = cpu.REGISTER_A || 0;
    const x = cpu.REGISTER_X || 0;
    const y = cpu.REGISTER_Y || 0;
    const s = cpu.REGISTER_SP || 0;
    const scene = mem[0x00ED] || 0;
    const r1b = mem[0x001B] || 0;
    const r628 = mem[0x0628] || 0;
    const r44 = mem[0x0044] || 0;
    const r48 = mem[0x0048] || 0;
    log(
      f.toString().padStart(5) + ' | ' +
      '$' + pc.toString(16).toUpperCase().padStart(4, '0') + ' | ' +
      a.toString(16).toUpperCase().padStart(2, '0') + ' | ' +
      x.toString(16).toUpperCase().padStart(2, '0') + ' | ' +
      y.toString(16).toUpperCase().padStart(2, '0') + ' | ' +
      s.toString(16).toUpperCase().padStart(2, '0') + ' | ' +
      scene.toString().padStart(8) + ' | ' +
      r1b.toString(16).toUpperCase().padStart(8) + ' | ' +
      r628.toString().padStart(8) + ' | ' +
      '$' + r44.toString(16).toUpperCase().padStart(2, '0') + ' | ' +
      '$' + r48.toString(16).toUpperCase().padStart(2, '0')
    );
  }
}

log('\n=== PPU state after 300 frames ===');
const ppu: any = nes.ppu;
log('PPU scroll: regHT=' + ppu.regHT + ' regVT=' + ppu.regVT + ' regH=' + ppu.regH + ' regV=' + ppu.regV);

log('\n=== NT0 ($2000-$23FF) after 300 frames ===');
let ntNonZero = 0;
let ntSample = '';
const vram = ppu.vramMem || ppu.vram;
if (vram) {
  for (let i = 0; i < 0x400; i++) {
    const v = vram[i] || 0;
    if (v !== 0) { ntNonZero++; if (i < 64) ntSample += v.toString(16).padStart(2, '0').toUpperCase() + ' '; }
  }
  log('NT0 nonZero bytes: ' + ntNonZero + '/1024');
  log('NT0 first 64: ' + ntSample);
} else {
  log('PPU vramMem/vram not found');
}

log('\n=== OAM after 300 frames ===');
let oamNonZero = 0;
if (ppu.spriteMem) {
  for (let i = 0; i < 256; i++) {
    if (ppu.spriteMem[i] !== 0 && ppu.spriteMem[i] !== 0xF8) oamNonZero++;
  }
  log('OAM nonZero/nonF8: ' + oamNonZero + '/256');
}

// CHR bank 状态
log('\n=== CHR banks after 300 frames ===');
const mmap: any = nes.mmap;
if (mmap && mmap.chrBanks) {
  log('chrBanks: ' + JSON.stringify(mmap.chrBanks));
}

fs.writeFileSync(outPath, lines.join('\n'));
console.log('\nOutput: ' + outPath);
