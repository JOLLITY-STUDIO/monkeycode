/**
 * 追踪 frame 9 的 CPU PC，找谁写 ram_0490
 */
import NES from '../../tsnes/src/nes';
import * as fs from 'fs';

const romPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm\\dist\\tsubasa2.nes';
const outPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\debug\\trace_frame9.txt';
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
function log(msg: string) { lines.push(msg); }

// 跑 8 帧
for (let f = 1; f <= 8; f++) nes.frame();

// frame 9: 逐指令追踪，找写 0x0490 的指令
log('=== Frame 9 instruction trace (looking for STA $0490-0497) ===');

// hook cpu 写操作
const origWrite = cpu.write.bind(cpu);
let writeCount = 0;
cpu.write = function(addr: number, val: number) {
  if (addr >= 0x0490 && addr <= 0x0497) {
    const pc = cpu.REGISTER_PC;
    log(`  WRITE $${addr.toString(16).toUpperCase()} = $${val.toString(16).toUpperCase()} at PC=$${pc.toString(16).toUpperCase()}`);
    writeCount++;
  }
  return origWrite(addr, val);
};

nes.frame();
log(`Total CHR req writes in frame 9: ${writeCount}`);

fs.writeFileSync(outPath, lines.join('\n'));
console.log('Output: ' + outPath);
console.log('Writes: ' + writeCount);
