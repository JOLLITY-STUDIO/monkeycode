
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');

const rom = fs.readFileSync(ROM_PATH);
console.log(`ROM size: ${rom.length} bytes (${(rom.length/1024/1024).toFixed(2)} MB)`);

const RESOURCE_TABLE_BASE = 0x0B0000;
const NUM_ENTRIES = 256;

console.log('\n=== 资源指针表 (ROM 0x0B0000) ===\n');

const resources = [];

for (let i = 0; i < NUM_ENTRIES; i++) {
  const offset = RESOURCE_TABLE_BASE + i * 4;
  if (offset + 4 > rom.length) break;
  
  const ptr = (rom[offset] << 24) | (rom[offset + 1] << 16) | (rom[offset + 2] << 8) | rom[offset + 3];
  
  if (ptr !== 0 && ptr < rom.length) {
    const type = rom[ptr];
    let typeName = 'Unknown';
    let extraInfo = '';
    
    if (type === 1) {
      typeName = 'Type 1 (Nibble RLE)';
      if (ptr + 3 <= rom.length) {
        const size = (rom[ptr + 1] << 8) | rom[ptr + 2];
        extraInfo = `size=${size}B`;
      }
    } else if (type === 2) {
      typeName = 'Type 2 (Bit-plane)';
      const planes = rom[ptr + 1] & 0x7F;
      extraInfo = `planes=${planes}`;
    } else if (type === 3) {
      typeName = 'Type 3 (LZSS)';
      if (ptr + 4 <= rom.length) {
        const outSize = (rom[ptr + 1] << 24) | (rom[ptr + 2] << 16) | (rom[ptr + 3] << 8) | rom[ptr + 4];
        extraInfo = `outSize=${outSize}B`;
      }
    }
    
    resources.push({
      index: i,
      address: ptr,
      type,
      typeName,
      extraInfo
    });
  }
}

console.log(`找到 ${resources.length} 个有效资源:\n`);

const typeCounts = {};
for (const r of resources) {
  typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
}

console.log('类型分布:');
for (const [type, count] of Object.entries(typeCounts)) {
  console.log(`  Type ${type}: ${count} 个`);
}

console.log('\n前50个资源详情:');
for (let i = 0; i < Math.min(50, resources.length); i++) {
  const r = resources[i];
  console.log(`  Entry ${r.index.toString().padStart(3)}: ROM 0x${r.address.toString(16).toUpperCase().padStart(6, '0')} - ${r.typeName} ${r.extraInfo}`);
}

console.log('\n=== Type 2 (位平面压缩) 资源列表:');
const type2 = resources.filter(r => r.type === 2);
for (const r of type2) {
  console.log(`  Entry ${r.index.toString().padStart(3)}: ROM 0x${r.address.toString(16).toUpperCase().padStart(6, '0')} - ${r.extraInfo}`);
}

console.log('\n=== Type 3 (LZSS) 资源列表:');
const type3 = resources.filter(r => r.type === 3);
for (const r of type3.slice(0, 30)) {
  console.log(`  Entry ${r.index.toString().padStart(3)}: ROM 0x${r.address.toString(16).toUpperCase().padStart(6, '0')} - ${r.extraInfo}`);
}
console.log(`  ... 共 ${type3.length} 个 Type 3 资源`);
