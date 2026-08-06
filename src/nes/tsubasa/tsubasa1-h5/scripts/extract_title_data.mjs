/**
 * 从 Bank 2/5 提取标题画面数据
 * 用法: node scripts/extract_title_data.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const PRG_BULK = join(PROJECT_ROOT, 'src', 'data', 'raw', 'prg_bulk.json');

function loadBank(id) {
  const bulk = JSON.parse(readFileSync(PRG_BULK, 'utf-8'));
  const entry = bulk.find(e => e.bankId === id);
  if (!entry) throw new Error(`Bank ${id} 未找到`);
  return Uint8Array.from(Buffer.from(entry.base64, 'base64'));
}

function read16LE(data, offset) {
  return data[offset] | (data[offset + 1] << 8);
}

// NES 64色调色板 → RGB (近似值)
const NES_PALETTE_RGB = [
  [0x62,0x62,0x62],[0x00,0x1F,0x88],[0x1F,0x11,0xCF],[0x3E,0x00,0xCF],
  [0x58,0x00,0xA8],[0x6A,0x00,0x6F],[0x6A,0x06,0x28],[0x5B,0x1A,0x00],
  [0x46,0x30,0x00],[0x2B,0x47,0x00],[0x0F,0x54,0x00],[0x00,0x53,0x13],
  [0x00,0x48,0x43],[0x00,0x3D,0x7C],[0x00,0x00,0x00],[0x00,0x00,0x00],
  [0xAB,0xAB,0xAB],[0x0F,0x56,0xD7],[0x4B,0x3C,0xFF],[0x84,0x29,0xFF],
  [0xAD,0x21,0xEB],[0xB7,0x21,0xA5],[0xB4,0x2E,0x53],[0xA2,0x46,0x0F],
  [0x88,0x5E,0x00],[0x64,0x78,0x00],[0x3B,0x87,0x00],[0x13,0x85,0x35],
  [0x00,0x79,0x76],[0x00,0x6D,0xBB],[0x00,0x00,0x00],[0x00,0x00,0x00],
  [0xFF,0xFF,0xFF],[0x50,0xA6,0xFF],[0x8E,0x84,0xFF],[0xC2,0x6E,0xFF],
  [0xEE,0x65,0xFF],[0xFB,0x65,0xE2],[0xFA,0x73,0x8E],[0xEC,0x8D,0x3F],
  [0xCF,0xA7,0x00],[0xA7,0xC3,0x00],[0x7A,0xD3,0x06],[0x50,0xD1,0x73],
  [0x30,0xC4,0xBB],[0x25,0xB6,0xF9],[0x4E,0x4E,0x4E],[0x00,0x00,0x00],
];

console.log('═'.repeat(60));
console.log('  标题画面数据提取');
console.log('═'.repeat(60));

// 1. 从 Bank 2 $B24F 提取标题调色板 (32字节 = 8组×4色)
const bank2 = loadBank(2);
const PALETTE_OFFSET = 0xB24F - 0x8000; // $324F
console.log(`\nBank 2 标题调色板 @ ROM offset $${PALETTE_OFFSET.toString(16).toUpperCase()} (CPU $B24F)`);

const paletteBytes = [];
for (let i = 0; i < 32; i++) {
  paletteBytes.push(bank2[PALETTE_OFFSET + i]);
}

console.log('\n标题调色板 (NES色号):');
for (let g = 0; g < 8; g++) {
  const colors = paletteBytes.slice(g * 4, g * 4 + 4);
  const hexColors = colors.map(c => c.toString(16).toUpperCase().padStart(2, '0'));
  console.log(`  组${g}: ${hexColors.join(' ')} (BG${g < 4 ? g : g-4}${g < 4 ? '' : '/SPR' + (g-4)})`);
}

// 输出为TypeScript数组
const tsExport = `/** 标题画面调色板 (Bank 2 $B24F) */
export const TITLE_PALETTE: number[] = [\n  ${paletteBytes.join(', ')}\n];`;
console.log('\n' + tsExport);

// 2. 检查 Bank 5 标题画面数据
const bank5 = loadBank(5);
console.log('\n--- Bank 5 前 256 字节 ---');
for (let i = 0; i < 256; i += 16) {
  const bytes = Array.from(bank5.slice(i, i + 16))
    .map(b => b.toString(16).toUpperCase().padStart(2, '0'));
  console.log(`  $${(0x8000 + i).toString(16).toUpperCase().padStart(4,'0')}: ${bytes.join(' ')}`);
}

// 3. 检查 Bank 2 $8000 区域 (可能的标题 nametable 数据)
console.log('\n--- Bank 2 标题区域 ($B000-$B300) ---');
for (let offset = 0xB000 - 0x8000; offset < 0xB300 - 0x8000; offset += 16) {
  const bytes = Array.from(bank2.slice(offset, offset + 16))
    .map(b => b.toString(16).toUpperCase().padStart(2, '0'));
  console.log(`  $${(0x8000 + offset).toString(16).toUpperCase().padStart(4,'0')}: ${bytes.join(' ')}`);
}

// 4. 保存调色板数据
const outputPath = join(PROJECT_ROOT, 'src', 'data', 'opening', 'title_palette.json');
const dir = dirname(outputPath);
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
writeFileSync(outputPath, JSON.stringify({
  source: 'Bank 2 $B24F',
  palette: paletteBytes,
  groups: Array.from({length: 8}, (_, g) => ({
    index: g,
    type: g < 4 ? 'BG' : 'SPR',
    colors: paletteBytes.slice(g * 4, g * 4 + 4),
  })),
}, null, 2), 'utf-8');
console.log(`\n✅ 调色板已保存: ${outputPath}`);
