import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const PLANE_B_BASE = 0xE000;

console.log('=== Plane B标题区域原始VRAM数据 ===');
console.log('');

console.log('位置 | 字节1 | 字节2 | 小端序 | 大端序 | 小端调色板 | 大端调色板 | 小端Tile | 大端Tile');
console.log('-----|-------|-------|--------|--------|-----------|-----------|----------|----------');

for (let row = 6; row < 10; row++) {
  for (let col = 4; col < 18; col++) {
    const ntOffset = PLANE_B_BASE + row * 64 + col * 2;
    const byte1 = vram[ntOffset];
    const byte2 = vram[ntOffset + 1];
    const leEntry = (byte2 << 8) | byte1;
    const beEntry = (byte1 << 8) | byte2;
    const lePalette = (leEntry >> 13) & 3;
    const bePalette = (beEntry >> 13) & 3;
    const leTile = leEntry & 0x7FF;
    const beTile = beEntry & 0x7FF;
    
    if (leTile !== 0 || beTile !== 0) {
      console.log(`(${row},${col}) | 0x${byte1.toString(16).padStart(2,'0')} | 0x${byte2.toString(16).padStart(2,'0')} | 0x${leEntry.toString(16).padStart(4,'0')} | 0x${beEntry.toString(16).padStart(4,'0')} | ${lePalette} | ${bePalette} | ${leTile} | ${beTile}`);
    }
  }
}

console.log('');
console.log('=== MD Nametable条目格式 ===');
console.log('16位大端序:');
console.log('  bit 15: 优先级');
console.log('  bit 14-13: 调色板索引 (0-3)');
console.log('  bit 12: H翻转');
console.log('  bit 11: V翻转');
console.log('  bit 10-0: Tile索引 (0-2047)');
console.log('');
console.log('如果VRAM存储是小端序(LSB在前):');
console.log('  字节1 = LSB = bit 7-0');
console.log('  字节2 = MSB = bit 15-8');
console.log('  条目 = (字节2 << 8) | 字节1');
console.log('');
console.log('如果VRAM存储是大端序(MSB在前):');
console.log('  字节1 = MSB = bit 15-8');
console.log('  字节2 = LSB = bit 7-0');
console.log('  条目 = (字节1 << 8) | 字节2');
