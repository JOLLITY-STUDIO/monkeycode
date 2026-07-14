import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

console.log(`VRAM size: ${vram.length} (0x${vram.length.toString(16)})`);

function countNonZero(start, end, label) {
  let c = 0;
  for (let i = start; i < end; i++) if (vram[i] !== 0) c++;
  console.log(`${label} [0x${start.toString(16)}-0x${end.toString(16)}]: ${c} 非零字节 (共${end-start})`);
}

// 标准地址布局
countNonZero(0x0000, 0xBFFF, 'Tile data area');
countNonZero(0xC000, 0xCFFF, 'Plane A nametable (0xC000)');
countNonZero(0xD800, 0xDBFF, 'Sprite Attribute Table');
countNonZero(0xE000, 0xEFFF, 'Plane B nametable (0xE000)');
countNonZero(0xF000, 0xFFFF, 'Window nametable (0xF000)');

// 显示前几个字节
console.log('\n=== 各nametable起始16字节 ===');
function dump16(addr) {
  const bytes = [];
  for (let i = 0; i < 16; i++) bytes.push(vram[addr + i].toString(16).padStart(2, '0'));
  console.log(`0x${addr.toString(16).padStart(4,'0')}: ${bytes.join(' ')}`);
}
dump16(0xC000);
dump16(0xE000);
dump16(0xF000);

// 找到所有非零块
console.log('\n=== 所有非零字节块 (>=8字节连续) ===');
let i = 0;
let blockStart = -1;
const blocks = [];
while (i < vram.length) {
  if (vram[i] !== 0) {
    if (blockStart === -1) blockStart = i;
  } else {
    if (blockStart !== -1) {
      if (i - blockStart >= 8) blocks.push({ start: blockStart, end: i, size: i - blockStart });
      blockStart = -1;
    }
  }
  i++;
}
if (blockStart !== -1 && vram.length - blockStart >= 8) {
  blocks.push({ start: blockStart, end: vram.length, size: vram.length - blockStart });
}

for (const b of blocks) {
  console.log(`0x${b.start.toString(16).padStart(4,'0')} - 0x${b.end.toString(16).padStart(4,'0')} (${b.size} 字节)`);
}

// 特别分析 Plane A nametable (0xC000-0xCFFF)
console.log('\n=== Plane A nametable (0xC000) 前10个非零条目 ===');
let cnt = 0;
for (let i = 0; i < 0x800 && cnt < 10; i++) {
  const addr = 0xC000 + i * 2;
  if (addr + 1 >= vram.length) break;
  const lo = vram[addr], hi = vram[addr + 1];
  if (lo === 0 && hi === 0) continue;
  const word = (hi << 8) | lo;
  const priority = (word >> 15) & 1;
  const palette = (word >> 13) & 3;
  const tileIdx = word & 0x7FF;
  const tx = i % 64, ty = Math.floor(i / 64);
  console.log(`  [${tx},${ty}] word=0x${word.toString(16).padStart(4,'0')}: pal=${palette} pri=${priority} tile=${tileIdx}`);
  cnt++;
}

// 特别分析 Plane B nametable (0xE000-0xEFFF)
console.log('\n=== Plane B nametable (0xE000) 前10个非零条目 ===');
cnt = 0;
for (let i = 0; i < 0x800 && cnt < 10; i++) {
  const addr = 0xE000 + i * 2;
  if (addr + 1 >= vram.length) break;
  const lo = vram[addr], hi = vram[addr + 1];
  if (lo === 0 && hi === 0) continue;
  const word = (hi << 8) | lo;
  const priority = (word >> 15) & 1;
  const palette = (word >> 13) & 3;
  const tileIdx = word & 0x7FF;
  const tx = i % 64, ty = Math.floor(i / 64);
  console.log(`  [${tx},${ty}] word=0x${word.toString(16).padStart(4,'0')}: pal=${palette} pri=${priority} tile=${tileIdx}`);
  cnt++;
}
