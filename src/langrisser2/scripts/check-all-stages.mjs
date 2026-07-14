import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rom = readFileSync(join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin'));

const readU32 = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;
const readU16 = (addr) => ((rom[addr] << 8) | rom[addr + 1]);

const MAX = 40;

console.log('=== Map pointer table 0x61CB0 ===');
let lastMapStage = 0;
for (let i = 0; i < MAX; i++) {
  const ptr = readU32(0x61CB0 + i * 4);
  if (ptr === 0 || ptr >= 0x200000) continue;
  const w = readU16(ptr), h = readU16(ptr + 2);
  if (w === 0 || h === 0 || w > 128) continue;
  console.log(`  Stage ${i+1}: mapPtr=0x${ptr.toString(16)} size=${w}x${h}`);
  lastMapStage = i + 1;
}
console.log(`  => Last valid map: Stage ${lastMapStage}`);

console.log('');
console.log('=== Config pointer table 0x18005E ===');
let lastCfgStage = 0;
for (let i = 0; i < MAX; i++) {
  const ptr = readU32(0x18005E + i * 4);
  if (ptr === 0 || ptr >= 0x200000) continue;
  const cfg = ptr & 0xFFFFFF;
  const ul = readU32(cfg + 0x0C) & 0xFFFFFF;
  if (ul === 0) continue;
  const cls = rom[ul + 0x1B];
  console.log(`  Stage ${i+1}: cfg=0x${cfg.toString(16)} ul=0x${ul.toString(16)} cls=0x${cls.toString(16)}`);
  lastCfgStage = i + 1;
}
console.log(`  => Last valid config: Stage ${lastCfgStage}`);

console.log('');
console.log('=== Scenario config table 0x0821BE ===');
let lastScfgStage = 0;
for (let i = 0; i < MAX; i++) {
  const ptr = readU32(0x0821BE + i * 4);
  if (ptr === 0 || ptr >= 0x200000) continue;
  const d1 = readU32(ptr);
  if (d1 === 0) continue;
  console.log(`  Stage ${i+1}: p=0x${ptr.toString(16)} d0=0x${d1.toString(16)}`);
  lastScfgStage = i + 1;
}
console.log(`  => Last valid scenario config: Stage ${lastScfgStage}`);

console.log('');
console.log('=== Tile attrs table 0x061D2C/0x061D30 ===');
let lastAttrStage = 0;
for (let i = 0; i < MAX; i++) {
  const lo = readU32(0x061D2C + i * 8);
  if (lo === 0 || lo >= 0x200000) continue;
  console.log(`  Stage ${i+1}: lo=0x${lo.toString(16)}`);
  lastAttrStage = i + 1;
}
console.log(`  => Last valid tile attrs: Stage ${lastAttrStage}`);

console.log('');
console.log('=== Boss table 0x060600 ===');
for (let i = 0; i < MAX; i++) {
  const c0 = rom[0x060600 + i * 8];
  if (c0 !== 0xFF && c0 !== 0x00) console.log(`  Stage ${i+1}: boss[0]=0x${c0.toString(16)}`);
}
