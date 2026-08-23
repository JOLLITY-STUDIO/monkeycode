import NES from '../../tsnes/src/nes';
import * as fs from 'fs';

const romPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm\\dist\\tsubasa2.nes';
const outPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\debug\\trace_f9_full.txt';
const romData = fs.readFileSync(romPath);

const nes = new NES({ onFrame: () => {}, onAudioSample: () => {}, onStatusUpdate: () => {}, emulateSound: false });
nes.loadROM(romData);
const cpu: any = nes.cpu;
const mem = cpu.mem;

// 跑 8 帧
for (let f = 1; f <= 8; f++) nes.frame();

// frame 9: 用 enableTrace 记录所有指令
nes.enableTrace({
  callback: (line: string) => {
    // 只记录写 $0490-$0497 附近的指令
    // trace 行格式: "f9 c7412714 ... A:40 X:19 Y:00 S:E0 P:nvUbdizC $00:9F04: A5 1"
    // 完整记录太多，只保留写 $04xx 的
  },
  maxLines: 500000,
});

nes.frame();
nes.disableTrace();

// 读 trace 输出
// 但 enableTrace callback 模式不存文件，需要改用文件模式
// 重新跑
