import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..', '..');
const ROM_PATH = path.join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');

const rom = fs.readFileSync(ROM_PATH);

const Z80_CODE_START = 0x1EC000;
const Z80_CODE_SIZE = 0x1FFF;

console.log('=== Z80 音频驱动程序分析 ===');
console.log(`Z80 程序在 ROM 中的位置: 0x${Z80_CODE_START.toString(16)}`);
console.log(`程序大小: ${Z80_CODE_SIZE} 字节`);

const z80Code = rom.slice(Z80_CODE_START, Z80_CODE_START + Z80_CODE_SIZE);

const outputDir = path.join(__dirname, '../20260713/output/audio');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'z80_driver.bin'), z80Code);

console.log('\nZ80 程序前 256 字节:');
for (let i = 0; i < 32; i++) {
  let line = '';
  for (let j = 0; j < 8; j++) {
    line += `${z80Code[i * 8 + j].toString(16).padStart(2, '0')} `;
  }
  console.log(`0x${(Z80_CODE_START + i * 8).toString(16).padStart(8, '0')}: ${line}`);
}

console.log('\n=== 搜索 Z80 程序中的音乐命令 ===');
const commands = [];
for (let i = 0; i < z80Code.length - 1; i++) {
  const byte1 = z80Code[i];
  const byte2 = z80Code[i + 1];
  
  if (byte1 === 0xED && byte2 === 0x49) {
    commands.push({ offset: i, cmd: 'LD BC' });
  } else if (byte1 === 0xED && byte2 === 0x51) {
    commands.push({ offset: i, cmd: 'LD DE' });
  } else if (byte1 === 0xED && byte2 === 0x59) {
    commands.push({ offset: i, cmd: 'LD HL' });
  } else if (byte1 === 0xCD) {
    const addr = (z80Code[i + 2] << 8) | z80Code[i + 1];
    commands.push({ offset: i, cmd: `CALL 0x${addr.toString(16)}` });
  } else if (byte1 === 0x01) {
    const val = (z80Code[i + 2] << 8) | z80Code[i + 1];
    commands.push({ offset: i, cmd: `LD BC, 0x${val.toString(16)}` });
  } else if (byte1 === 0x11) {
    const val = (z80Code[i + 2] << 8) | z80Code[i + 1];
    commands.push({ offset: i, cmd: `LD DE, 0x${val.toString(16)}` });
  } else if (byte1 === 0x21) {
    const val = (z80Code[i + 2] << 8) | z80Code[i + 1];
    commands.push({ offset: i, cmd: `LD HL, 0x${val.toString(16)}` });
  }
}

console.log('重要指令:');
for (const cmd of commands.slice(0, 20)) {
  console.log(`  0x${(Z80_CODE_START + cmd.offset).toString(16)}: ${cmd.cmd}`);
}

console.log('\n=== 搜索 Z80 程序中的 YM2612 端口写入 ===');
for (let i = 0; i < z80Code.length - 2; i++) {
  if (z80Code[i] === 0x3E) {
    const data = z80Code[i + 1];
    if (i + 2 < z80Code.length && z80Code[i + 2] === 0xD3) {
      const port = z80Code[i + 3];
      console.log(`  OUT (0x${port.toString(16)}), A  ; data=0x${data.toString(16)}`);
    }
  }
}

console.log('\n=== 搜索 Z80 程序中的 68K 通信 ===');
for (let i = 0; i < z80Code.length - 1; i++) {
  if (z80Code[i] === 0xDB) {
    const port = z80Code[i + 1];
    console.log(`  IN A, (0x${port.toString(16)})`);
  }
}