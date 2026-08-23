import NES from '../../tsnes/src/nes';
import * as fs from 'fs';

const romPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm\\dist\\tsubasa2.nes';
const outPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\debug\\trace_wr0490.txt';
const romData = fs.readFileSync(romPath);

const nes = new NES({ onFrame: () => {}, onAudioSample: () => {}, onStatusUpdate: () => {}, emulateSound: false });
nes.loadROM(romData);
const cpu: any = nes.cpu;
const mem = cpu.mem;

// 跑 8 帧
for (let f = 1; f <= 8; f++) nes.frame();

// frame 9: 每条指令前检查 $0490-$0497 是否变化
const lines: string[] = [];
let prev = Array.from({length:8}, (_,i) => mem[0x490+i]);

// 挂载 emulate，每条指令后检查
const origEmulate = cpu.emulate.bind(cpu);
cpu.emulate = function() {
  const pc = cpu.REGISTER_PC;
  const result = origEmulate();
  for (let i = 0; i < 8; i++) {
    const v = mem[0x490+i];
    if (v !== prev[i]) {
      lines.push(`$049${i.toString(16)}: $${prev[i].toString(16).toUpperCase()}→$${v.toString(16).toUpperCase()} at PC=$${pc.toString(16).toUpperCase()}`);
      prev[i] = v;
    }
  }
  return result;
};

nes.frame();
lines.push(`Total: ${lines.length} writes`);
fs.writeFileSync(outPath, lines.join('\n'));
console.log('Writes: ' + lines.length);
