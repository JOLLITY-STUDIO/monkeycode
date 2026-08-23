// 钩 $8AF7 sceneLoad: 抓每次场景装载的 A(场景id) + 装载后寄存器 + NT 填充量
const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const nes = new tsnes.NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

let frameCount = 0;
const loads = [];

nes.tracer.start(nes, {
  trackCPU: true,
  addressRange: [0x8af0, 0x8b20],
  maxLines: 100000,
  callback: (line) => {
    const aM = line.match(/A:([0-9A-F]{2})/);
    const a = aM ? parseInt(aM[1], 16) : -1;
    const pcM = line.match(/:8AF[0-9A-F]:/);
    if (!pcM) return;
    const vm = nes.ppu.vramMem;
    let n0 = 0, n1 = 0;
    if (vm) {
      for (let j = 0x2000; j < 0x2400; j++) if (vm[j] !== 0) n0++;
      for (let j = 0x2400; j < 0x2800; j++) if (vm[j] !== 0) n1++;
    }
    const ptr = (nes.cpu.mem[0x0076] << 8 | nes.cpu.mem[0x0075]);
    loads.push({ f: frameCount, a, ptr, se: nes.cpu.mem[0x005e], sf: nes.cpu.mem[0x005f], n0, n1 });
    console.log(`f${frameCount} A=0x${a.toString(16).toUpperCase()} ptr=0x${ptr.toString(16).toUpperCase().padStart(4, '0')} w=${nes.cpu.mem[0x005e]} h=${nes.cpu.mem[0x005f]} nt0=${n0} nt1=${n1}`);
  },
});

for (let i = 0; i < 4000; i++) {
  nes.frame();
  frameCount++;
  if (loads.length >= 14) break;
  if (frameCount % 1000 === 0) console.log(`... f${frameCount} loads=${loads.length}`);
}
nes.tracer.stop();
console.log('--- total sceneLoad hits:', loads.length, 'frames:', frameCount);
