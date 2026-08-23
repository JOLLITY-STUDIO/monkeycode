/**
 * 用 tsnes core NES 模拟器跑 300 帧
 * 输出每帧的 CPU 状态、场景号、VRAM 关键地址
 */
const fs = require('fs');
const path = require('path');

// 加载 tsnes core
const coreRoot = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\core';
const NES = require(coreRoot + '/nes.ts').default || require(coreRoot + '/nes.js').default || require(coreRoot + '/nes.ts');

// ROM 文件
const romPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\asm\\dist\\tsubasa2.nes';
const romData = fs.readFileSync(romPath);

console.log('ROM size:', romData.length);
console.log('ROM header:', Array.from(romData.slice(0, 16)).map(b => b.toString(16).padStart(2,'0')).join(' '));

// 创建 NES 实例
const nes = new NES({
  onFrame: (frameBuffer) => {},
  onAudioSample: (l, r) => {},
  onStatusUpdate: (s) => {},
  onBatteryRamWrite: (addr, val) => {},
});

// 装载 ROM
nes.loadRom(romData);
console.log('ROM loaded');

// 跑 300 帧
const FRAMES = 300;
console.log('\n=== Running', FRAMES, 'frames ===');

for (let f = 1; f <= FRAMES; f++) {
  nes.frame();
  
  // 每 30 帧输出一次状态
  if (f % 30 === 0 || f <= 10) {
    const cpu = nes.cpu;
    const ppu = nes.ppu;
    const mem = cpu.mem;
    
    // 关键 RAM 状态
    const sceneId = mem ? mem[0x00ED] : -1;  // 当前场景号
    const ram_001B = mem ? mem[0x001B] : -1;  // NMI 标志
    const ram_0628 = mem ? mem[0x0628] : -1;  // 渲染缓冲
    const ram_043B = mem ? mem[0x043B] : -1;  // 控球方
    const ram_0044 = mem ? mem[0x0044] : -1;  // 滚动 Y
    
    // CPU PC
    const pc = cpu ? cpu.REGISTER_PC : -1;
    
    console.log(`frame ${f.toString().padStart(3)}: PC=${pc.toString(16).toUpperCase()} scene=${sceneId} ram_001B=${ram_001B?.toString(16)} ram_0628=${ram_0628} ram_043B=${ram_043B} ram_0044=${ram_0044?.toString(16)}`);
  }
}

console.log('\n=== Done ===');
