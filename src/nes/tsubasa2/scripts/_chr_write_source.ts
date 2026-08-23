/**
 * 精确追踪 frame 6-9 的 ram_0490 写入来源
 */
import NES from '../../tsnes/src/nes';
import * as fs from 'fs';

const romPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm\\dist\\tsubasa2.nes';
const outPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\debug\\chr_write_source.txt';
const romData = fs.readFileSync(romPath);

const nes = new NES({
  onFrame: () => {},
  onAudioSample: () => {},
  onStatusUpdate: () => {},
  emulateSound: false,
});

nes.loadROM(romData);
const cpu: any = nes.cpu;
const mem = cpu.mem;

const lines: string[] = [];
function log(msg: string) { lines.push(msg); console.log(msg); }

log('=== Frame 1-12 detailed trace ===');

for (let f = 1; f <= 12; f++) {
  // 在 frame 前后检查关键 RAM
  const before = {
    r490: mem[0x0490], r491: mem[0x0491], r492: mem[0x0492], r493: mem[0x0493],
    r494: mem[0x0494], r495: mem[0x0495], r496: mem[0x0496], r497: mem[0x0497],
    r048: mem[0x0048], r049: mem[0x0049], r075: mem[0x0075], r076: mem[0x0076],
    r005E: mem[0x005E], r005F: mem[0x005F], r005C: mem[0x005C], r005D: mem[0x005D],
    r00ED: mem[0x00ED], r001B: mem[0x001B], r0628: mem[0x0628],
    r0022: mem[0x0022], r0025: mem[0x0025],
  };
  
  nes.frame();
  
  const after = {
    r490: mem[0x0490], r491: mem[0x0491], r492: mem[0x0492], r493: mem[0x0493],
    r494: mem[0x0494], r495: mem[0x0495], r496: mem[0x0496], r497: mem[0x0497],
    r048: mem[0x0048], r049: mem[0x0049], r075: mem[0x0075], r076: mem[0x0076],
    r005E: mem[0x005E], r005F: mem[0x005F], r005C: mem[0x005C], r005D: mem[0x005D],
    r00ED: mem[0x00ED], r001B: mem[0x001B], r0628: mem[0x0628],
    r0022: mem[0x0022], r0025: mem[0x0025],
  };
  
  // 输出变化的字段
  const changes: string[] = [];
  for (const key of Object.keys(after)) {
    const b = (before as any)[key];
    const a = (after as any)[key];
    if (b !== a) {
      changes.push(`${key}: $${b.toString(16).toUpperCase()}→$${a.toString(16).toUpperCase()}`);
    }
  }
  
  log(`frame ${f}: ${changes.length === 0 ? '(no change)' : changes.join(', ')}`);
  log(`  req=[${mem[0x0490]},${mem[0x0491]},${mem[0x0492]},${mem[0x0493]},${mem[0x0494]},${mem[0x0495]},${mem[0x0496]},${mem[0x0497]}] r048=$${mem[0x0048].toString(16)} r075=$${mem[0x0075].toString(16)} r076=$${mem[0x0076].toString(16)} r005E=$${mem[0x005E].toString(16)} r005F=$${mem[0x005F].toString(16)}`);
}

fs.writeFileSync(outPath, lines.join('\n'));
console.log('\nOutput: ' + outPath);
