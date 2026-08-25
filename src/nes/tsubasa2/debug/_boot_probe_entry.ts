import * as fs from 'fs';
import * as path from 'path';
import NES from '../src/core/nes';

async function main() {
  const romPath = path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
  const nes: any = new NES({ emulateSound: false });
  nes.loadROM(fs.readFileSync(romPath));

  const cpu = nes.cpu;
  const origWrite = cpu.write.bind(cpu);
  let curFrame = -1;
  const writes: { a: string; v: number }[] = [];
  cpu.write = (addr: number, value: number) => {
    const a = addr & 0x2007;
    if (a === 0x2000 || a === 0x2005) {
      writes.push({ a: a === 0x2000 ? 'CTRL' : 'SCRL', v: value });
    }
    return origWrite(addr, value);
  };

  const rd = (ad: number) => cpu.mem[ad & 0x7ff];
  const snap = () => ({
    scene: rd(0x00ed), r44: rd(0x0044), r45: rd(0x0045), r46: rd(0x0046), r47: rd(0x0047),
    r79: rd(0x0079), r7a: rd(0x007a), r7b: rd(0x007b), r7c: rd(0x007c),
    r1b: rd(0x001b), r5b: rd(0x005b), r628: rd(0x0628),
  });

  const out: string[] = [];
  let prev: ReturnType<typeof snap> | null = null;
  for (let f = 0; f < 620; f++) {
    curFrame = f;
    writes.length = 0;
    nes.frame();
    const s = snap();
    const w = writes.slice(-8).map((x) => x.a + '=' + x.v.toString(16)).join(',');
    if (!prev) {
      out.push(`f${f} ${JSON.stringify(s)} w=[${w}]`);
      prev = s;
      continue;
    }
    const ch: string[] = [];
    for (const k of Object.keys(s) as (keyof typeof s)[]) {
      if (s[k] !== prev[k]) ch.push(`${k}:${prev[k]}->${s[k]}`);
    }
    // 每 32 帧记录一行（用于观察 scroll 阶段），变化帧都记录
    if (ch.length) out.push(`f${f} CHG ${ch.join(' ')} w=[${w}]`);
    else if (f % 16 === 0) out.push(`f${f} ${JSON.stringify(s)} w=[${w}]`);
    prev = s;
  }
  fs.writeFileSync(path.resolve(__dirname, '_probe_analysis.txt'), out.join('\n'), 'utf8');
  console.log('written', out.length, 'lines -> debug/_probe_analysis.txt');
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
