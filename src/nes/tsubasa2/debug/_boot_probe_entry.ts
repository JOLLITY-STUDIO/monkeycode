import * as fs from 'fs';
import * as path from 'path';
import NES from '../src/core/nes';

async function main() {
  const romPath = path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
  const nes: any = new NES({ emulateSound: false });
  nes.loadROM(fs.readFileSync(romPath));

  const cpu = nes.cpu;
  const origEmulate = cpu.emulate.bind(cpu);
  let curFrame = -1;
  const framePcs: Map<number, Set<number>> = new Map();
  cpu.emulate = () => {
    const pc = cpu._instrPC;
    if (pc >= 0x8000) {
      let s = framePcs.get(curFrame);
      if (!s) { s = new Set(); framePcs.set(curFrame, s); }
      if (s.size < 80000) s.add(pc);
    }
    return origEmulate();
  };

  for (let f = 0; f < 620; f++) {
    curFrame = f;
    nes.frame();
  }

  const phases: { name: string; f0: number; f1: number }[] = [
    { name: 'B:f6-f375 scene0', f0: 6, f1: 375 },
    { name: 'C:f376-f619 scroll', f0: 376, f1: 619 },
  ];
  const phasePcs: { name: string; set: Set<number> }[] = phases.map((p) => ({ name: p.name, set: new Set<number>() }));
  for (let f = 0; f < 620; f++) {
    for (let i = 0; i < phases.length; i++) {
      if (f >= phases[i].f0 && f <= phases[i].f1) {
        for (const pc of framePcs.get(f) || []) phasePcs[i].set.add(pc);
      }
    }
  }

  for (let i = 0; i < phases.length; i++) {
    const pcs = phasePcs[i].set;
    const a000 = [...pcs].filter((x) => x >= 0xa000 && x <= 0xbfff).sort((x, y) => x - y);
    const c000 = [...pcs].filter((x) => x >= 0xc000 && x <= 0xdfff).sort((x, y) => x - y);
    const e000 = [...pcs].filter((x) => x >= 0xe000 && x <= 0xffff).sort((x, y) => x - y);
    console.log('=== ' + phases[i].name + '  code pcs:');
    console.log('  $A000-$BFFF (' + a000.length + '): ' + a000.map((x) => '$' + x.toString(16)).join(' '));
    console.log('  $C000-$DFFF (' + c000.length + '): ' + c000.map((x) => '$' + x.toString(16)).join(' '));
    console.log('  $E000-$FFFF (' + e000.length + '): ' + e000.map((x) => '$' + x.toString(16)).join(' '));
    console.log();
  }
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
