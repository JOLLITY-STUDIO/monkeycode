import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const ROM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');

const rom = new Uint8Array(readFileSync(ROM_PATH));

console.log('=== 搜索 ROM 中所有 VDP 寄存器写入 ===');
console.log('');

const vdpWrites = [];

for (let i = 0; i < rom.length - 3; i++) {
  if (rom[i] === 0x33 && rom[i+1] === 0xF8) {
    const opcode = rom[i+2];
    const value = rom[i+3];
    const controlWord = (opcode << 8) | value;
    const regNum = (controlWord >> 8) & 0x1F;
    const regValue = controlWord & 0xFF;
    
    if ((opcode & 0x80) !== 0) {
      vdpWrites.push({
        addr: i,
        controlWord,
        regNum,
        regValue,
        opcode: `0x${opcode.toString(16).padStart(2,'0')}`,
        value: `0x${value.toString(16).padStart(2,'0')}`
      });
    }
  }
}

console.log('找到的 VDP 寄存器写入:');
console.log('地址      | 控制字    | 寄存器 | 值');
console.log('----------|-----------|--------|-----');
for (const w of vdpWrites) {
  console.log(`0x${w.addr.toString(16).padStart(6,'0')} | 0x${w.controlWord.toString(16).padStart(4,'0')} | R${w.regNum}   | 0x${w.regValue.toString(16).padStart(2,'0')}`);
}
console.log('');

console.log('=== R2 (Plane A 地址) 写入分析 ===');
const r2Writes = vdpWrites.filter(w => w.regNum === 2);
if (r2Writes.length > 0) {
  for (const w of r2Writes) {
    const vramAddr = w.regValue << 9;
    console.log(`R2写入: 地址 0x${w.addr.toString(16).padStart(6,'0')}, 值 0x${w.regValue.toString(16)} -> VRAM地址 0x${vramAddr.toString(16).toUpperCase()}`);
  }
} else {
  console.log('未找到直接写入 R2 的指令!');
  console.log('');
  console.log('=== 搜索间接写入 R2 的模式 ===');
  
  for (let i = 0; i < rom.length - 3; i++) {
    if (rom[i] === 0x33 && rom[i+1] === 0xC9) {
      const dReg = rom[i+2];
      const opcode = rom[i+3];
      
      if ((opcode & 0x80) !== 0 && ((opcode >> 8) & 0x1F) === 2) {
        console.log(`间接写入: 地址 0x${i.toString(16).padStart(6,'0')}, move.w d${dReg},(VDP_CTRL).l`);
      }
    }
  }
  
  console.log('');
  console.log('=== 搜索 move.w d1,(VDP_CTRL).l 模式 ===');
  for (let i = 0; i < rom.length - 2; i++) {
    if (rom[i] === 0x33 && rom[i+1] === 0xC9 && rom[i+2] === 0x01) {
      let context = '';
      for (let j = Math.max(0, i-20); j < Math.min(rom.length, i+20); j++) {
        context += rom[j].toString(16).padStart(2,'0') + ' ';
      }
      console.log(`地址 0x${i.toString(16).padStart(6,'0')}: move.w d1,(VDP_CTRL).l`);
      console.log(`上下文: ${context}`);
      console.log('');
    }
  }
}
console.log('');

console.log('=== 搜索 R7 (背景色) 写入 ===');
const r7Writes = vdpWrites.filter(w => w.regNum === 7);
if (r7Writes.length > 0) {
  for (const w of r7Writes) {
    const bgIndex = w.regValue & 0x3F;
    console.log(`R7写入: 地址 0x${w.addr.toString(16).padStart(6,'0')}, 值 0x${w.regValue.toString(16)} -> 背景色索引 ${bgIndex}`);
  }
} else {
  console.log('未找到直接写入 R7 的指令');
}
console.log('');

console.log('=== R4 (Plane B 地址) 写入 ===');
const r4Writes = vdpWrites.filter(w => w.regNum === 4);
if (r4Writes.length > 0) {
  for (const w of r4Writes) {
    const vramAddr = w.regValue << 9;
    console.log(`R4写入: 地址 0x${w.addr.toString(16).padStart(6,'0')}, 值 0x${w.regValue.toString(16)} -> VRAM地址 0x${vramAddr.toString(16).toUpperCase()}`);
  }
}
console.log('');

console.log('=== R5 (Sprite 表地址) 写入 ===');
const r5Writes = vdpWrites.filter(w => w.regNum === 5);
if (r5Writes.length > 0) {
  for (const w of r5Writes) {
    const vramAddr = w.regValue << 9;
    console.log(`R5写入: 地址 0x${w.addr.toString(16).padStart(6,'0')}, 值 0x${w.regValue.toString(16)} -> VRAM地址 0x${vramAddr.toString(16).toUpperCase()}`);
  }
}
console.log('');

console.log('=== R6 (Sprite Tile 基址) 写入 ===');
const r6Writes = vdpWrites.filter(w => w.regNum === 6);
if (r6Writes.length > 0) {
  for (const w of r6Writes) {
    const vramAddr = w.regValue << 13;
    console.log(`R6写入: 地址 0x${w.addr.toString(16).padStart(6,'0')}, 值 0x${w.regValue.toString(16)} -> VRAM地址 0x${vramAddr.toString(16).toUpperCase()}`);
  }
}
console.log('');

console.log('=== R0 (显示模式) 写入 ===');
const r0Writes = vdpWrites.filter(w => w.regNum === 0);
if (r0Writes.length > 0) {
  for (const w of r0Writes) {
    const mode1 = (w.regValue & 0x08) ? 'Mode1' : 'Mode0';
    const displayOff = (w.regValue & 0x04) ? 'OFF' : 'ON';
    const h40 = (w.regValue & 0x40) ? 'H40 (320px)' : 'H32 (256px)';
    console.log(`R0写入: 地址 0x${w.addr.toString(16).padStart(6,'0')}, 值 0x${w.regValue.toString(16)} -> ${mode1}, Display=${displayOff}, ${h40}`);
  }
}
