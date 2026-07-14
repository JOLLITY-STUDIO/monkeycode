import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const ROM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');

const rom = new Uint8Array(readFileSync(ROM_PATH));

console.log('=== VDP 初始配置 (ROM 0x80B2 - 0x80D0) ===');
console.log('');

for (let i = 0x80B2; i < 0x80D0; i += 2) {
  const regByte = rom[i];
  const regVal = rom[i + 1];
  
  const regNum = (regByte >> 4) & 0x1F;
  
  let desc = '';
  let vramAddr = null;
  
  switch(regNum) {
    case 0:
      const mode = (regVal & 0x08) ? 'Mode1' : 'Mode0';
      const disp = (regVal & 0x04) ? 'OFF' : 'ON';
      const h40 = (regVal & 0x40) ? 'H40 (320px)' : 'H32 (256px)';
      desc = `${mode}, Display=${disp}, ${h40}`;
      break;
    case 1:
      const dmaEn = (regVal & 0x40) ? 'DMA=ON' : 'DMA=OFF';
      desc = dmaEn;
      break;
    case 2:
      vramAddr = regVal << 9;
      desc = `PlaneA base = VRAM 0x${vramAddr.toString(16).toUpperCase()}`;
      break;
    case 3:
      vramAddr = regVal << 10;
      desc = `Window base = VRAM 0x${vramAddr.toString(16).toUpperCase()}`;
      break;
    case 4:
      vramAddr = regVal << 9;
      desc = `PlaneB base = VRAM 0x${vramAddr.toString(16).toUpperCase()}`;
      break;
    case 5:
      vramAddr = regVal << 9;
      desc = `Sprite table = VRAM 0x${vramAddr.toString(16).toUpperCase()}`;
      break;
    case 6:
      vramAddr = regVal << 13;
      desc = `Sprite tile = VRAM 0x${vramAddr.toString(16).toUpperCase()}`;
      break;
    case 7:
      const bgIdx = regVal & 0x3F;
      desc = `Background color index = ${bgIdx}`;
      break;
    default:
      desc = '';
  }
  
  console.log(`0x${i.toString(16).toUpperCase()}: R${regNum} = 0x${regVal.toString(16).toUpperCase().padStart(2,'0')} ${desc}`);
}

console.log('');
console.log('=== RAM dump 中 VDP 影子寄存器值 (单字节) ===');
const RAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_68K-ram-in-title-page.ram');
const ram = new Uint8Array(readFileSync(RAM_PATH));

const shadowBase = 0x81A0;
for (let i = 0; i <= 24; i++) {
  const addr = shadowBase + i;
  const val = ram[addr];
  
  let desc = '';
  let vramAddr = null;
  
  switch(i) {
    case 0:
      const mode = (val & 0x08) ? 'Mode1' : 'Mode0';
      const disp = (val & 0x04) ? 'OFF' : 'ON';
      const h40 = (val & 0x40) ? 'H40' : 'H32';
      desc = `${mode}, Display=${disp}, ${h40}`;
      break;
    case 2:
      vramAddr = val << 9;
      desc = `PlaneA = VRAM 0x${vramAddr.toString(16).toUpperCase()}`;
      break;
    case 3:
      vramAddr = val << 10;
      desc = `Window = VRAM 0x${vramAddr.toString(16).toUpperCase()}`;
      break;
    case 4:
      vramAddr = val << 9;
      desc = `PlaneB = VRAM 0x${vramAddr.toString(16).toUpperCase()}`;
      break;
    case 5:
      vramAddr = val << 9;
      desc = `SpriteTable = VRAM 0x${vramAddr.toString(16).toUpperCase()}`;
      break;
    case 6:
      vramAddr = val << 13;
      desc = `SpriteTile = VRAM 0x${vramAddr.toString(16).toUpperCase()}`;
      break;
    case 7:
      const bgIdx = val & 0x3F;
      desc = `BG color index = ${bgIdx}`;
      break;
  }
  
  if (val !== 0 || i <= 7) {
    console.log(`R${i} (0x${addr.toString(16).toUpperCase().padStart(4,'0')}) = 0x${val.toString(16).toUpperCase().padStart(2,'0')} ${desc}`);
  }
}

console.log('');
console.log('=== 关键发现 ===');
console.log('VDP初始配置中没有设置R2，使用默认值');
const r2Default = ram[shadowBase + 2];
console.log(`RAM中R2影子寄存器值 = 0x${r2Default.toString(16).toUpperCase()}`);
console.log(`-> PlaneA VRAM地址 = 0x${(r2Default << 9).toString(16).toUpperCase()}`);
