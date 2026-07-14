/**
 * deep-audit-event.mjs
 * 深入审计 SCENARIO_CONFIG — 找出所有 31 关用了多少套独立模板
 * 关键发现: 0x0821BE 不是地图形/触发器数据，是 faction 分屏 sprite DMA 事件表
 * 只有 ~6 套模板被所有关卡复用
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rom = readFileSync(join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin'));
const readU32 = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;

// Collect unique event data templates
const templates = new Map(); // addr -> { stages, hash }
const stageTemplates = {};  // stageIdx -> addr

for (let stage = 0; stage < 31; stage++) {
  const sPtr = readU32(0x0821BE + stage * 4);
  stageTemplates[stage] = sPtr;
  
  if (sPtr && sPtr < rom.length) {
    // Simple hash: concatenate first 16 dwords
    let hash = '';
    for (let i = 0; i < 16; i++) {
      hash += readU32(sPtr + i * 4).toString(16).padStart(8, '0');
    }
    
    if (!templates.has(sPtr)) {
      templates.set(sPtr, { stages: [], hash, addr: sPtr });
    }
    templates.get(sPtr).stages.push(stage + 1);
  }
}

console.log('=== Unique SCENARIO_CONFIG Templates ===');
console.log(`Total templates: ${templates.size}\n`);

for (const [addr, info] of templates) {
  const stageList = info.stages.join(', ');
  console.log(`Template @0x${addr.toString(16)} (${info.stages.length} stages): ${stageList}`);
  
  // Show first 8 bytes as word pairs
  const words = [];
  for (let i = 0; i < 8; i++) {
    words.push('0x' + ((rom[addr + i * 2] << 8) | rom[addr + i * 2 + 1]).toString(16).padStart(4, '0'));
  }
  console.log('  First 8 words: ' + words.join(' '));
  
  // Look for 0x0EEE terminator pattern
  const allWords = [];
  for (let i = 0; i < 64; i++) {
    allWords.push((rom[addr + i * 2] << 8) | rom[addr + i * 2 + 1]);
  }
  const termIdx = allWords.indexOf(0x0EEE);
  if (termIdx >= 0) console.log(`  Terminator 0x0EEE at word #${termIdx}`);
  console.log('');
}

// Show which stages use which template
console.log('=== Stage → Template Mapping ===');
for (let stage = 0; stage < 31; stage++) {
  const addr = stageTemplates[stage];
  const slug = addr ? '0x' + addr.toString(16) : 'NULL';
  console.log(`Stage ${String(stage + 1).padStart(2)}: ${slug}`);
}
