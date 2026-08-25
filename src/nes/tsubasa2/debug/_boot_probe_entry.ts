import * as fs from 'fs';
import * as path from 'path';
import NES from '../src/core/nes';

async function main() {
  const romPath = path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
  const nes: any = new NES({ emulateSound: false });
  nes.loadROM(fs.readFileSync(romPath));

  const cpu = nes.cpu;
  const origLoad = cpu.load.bind(cpu);
  let curFrame = -1;
  // 只收集每帧前 60000 次 PRG 读，避免内存爆炸
  const frameAddrs: Map<number, Set<number>> = new Map();
  cpu.load = (addr: number) => {
    if (addr >= 0x8000) {
      let s = frameAddrs.get(curFrame);
      if (!s) { s = new Set(); frameAddrs.set(curFrame, s); }
      if (s.size < 60000) s.add(addr);
    }
    return origLoad(addr);
  };

  for (let f = 0; f < 620; f++) {
    curFrame = f;
    nes.frame();
  }

  const phases: { name: string; f0: number; f1: number }[] = [
    { name: 'A:f0-f5 reset', f0: 0, f1: 5 },
    { name: 'B:f6-f375 scene0', f0: 6, f1: 375 },
    { name: 'C:f376-f619 scroll', f0: 376, f1: 619 },
  ];
  const phaseAddrs: { name: string; set: Set<number> }[] = phases.map((p) => ({ name: p.name, set: new Set<number>() }));
  for (let f = 0; f < 620; f++) {
    for (let i = 0; i < phases.length; i++) {
      if (f >= phases[i].f0 && f <= phases[i].f1) {
        for (const a of frameAddrs.get(f) || []) phaseAddrs[i].set.add(a);
      }
    }
  }

  for (let i = 0; i < phases.length; i++) {
    const a = phaseAddrs[i].set;
    const a000 = [...a].filter((x) => x >= 0xa000 && x <= 0xbfff).sort((x, y) => x - y);
    const c000 = [...a].filter((x) => x >= 0xc000 && x <= 0xdfff).sort((x, y) => x - y);
    console.log('=== ' + phases[i].name + '  $A000-$BFFF addrs (' + a000.length + ') ===');
    console.log(a000.map((x) => '$' + x.toString(16)).join(' '));
    console.log('  $C000-$DFFF addrs (' + c000.length + '):');
    console.log(c000.map((x) => '$' + x.toString(16)).join(' '));
    console.log();
  }
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
