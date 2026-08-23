import NES from '../../tsnes/src/nes';
import * as fs from 'fs';

const romPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm\\dist\\tsubasa2.nes';
const outPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\debug\\trace_f9_0490.txt';
const romData = fs.readFileSync(romPath);

const nes = new NES({ onFrame: () => {}, onAudioSample: () => {}, onStatusUpdate: () => {}, emulateSound: false });
nes.loadROM(romData);
const cpu: any = nes.cpu;
const mem = cpu.mem;

// 跑 8 帧
for (let f = 1; f <= 8; f++) nes.frame();

// frame 9: trace 所有指令，过滤出涉及 $0490-$0497 的
const lines: string[] = [];
let prev0490 = Array.from({length:8}, (_,i) => mem[0x0490+i]);

nes.enableTrace({
  callback: (line: string) => {
    // 每条指令后检查 $0490 变化
    for (let i = 0; i < 8; i++) {
      const v = mem[0x0490+i];
      if (v !== prev0490[i]) {
        lines.push(`*** $049${i.toString(16).toUpperCase()}: $${prev0490[i].toString(16).toUpperCase()}→$${v.toString(16).toUpperCase()} ***`);
        lines.push('  PREV: ' + line);
        prev0490[i] = v;
      }
    }
  },
  trackCPU: true,
  trackMMC3: true,
});

nes.frame();
nes.disableTrace();

lines.push(`\nTotal $0490 changes: ${lines.filter(l=>l.startsWith('***')).length}`);
fs.writeFileSync(outPath, lines.join('\n'));
console.log('Output: ' + outPath);
console.log('Changes: ' + lines.filter(l=>l.startsWith('***')).length);
