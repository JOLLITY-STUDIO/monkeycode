/**
 * debug-unit-struct.mjs
 * 重新定位 Stage 1 的单位部署数据结构
 *
 * 已知: 截图里 32x24 地图, 2玩家 + 2NPC + 4敌军 (Lv4,4,6,1)
 * 旧逻辑: cfgPtr + 0x0C -> unit list, stride 0x1E -> 只解析出 6 单位且无 NPC
 * 目标: 找出真正的单位列表地址和 struct 布局
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rom = readFileSync(join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin'));
const readU32 = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;
const readU16 = (addr) => ((rom[addr] << 8) | rom[addr + 1]);

const LEVEL = 0; // Stage 1

const mapPtr = readU32(0x61CB0 + LEVEL * 4);
const mapW = readU16(mapPtr);
const mapH = readU16(mapPtr + 2);
console.log(`Map ${mapW}x${mapH} at 0x${mapPtr.toString(16)}\n`);

const cfgPtr = readU32(0x18005E + LEVEL * 4) & 0xFFFFFF;
console.log(`Stage 1 config pointer: 0x${cfgPtr.toString(16).padStart(6, '0')}`);

// Dump config header (first 32 bytes) as dwords and words
console.log('\nConfig header (32 bytes):');
for (let i = 0; i < 32; i += 4) {
  const u = readU32(cfgPtr + i);
  console.log(`  +0x${i.toString(16).padStart(2, '0')}: 0x${u.toString(16).padStart(8, '0')} (${u})`);
}

// Dump config header as words for better readability
console.log('\nConfig header (as words):');
for (let i = 0; i < 32; i += 2) {
  const u = readU16(cfgPtr + i);
  console.log(`  +0x${i.toString(16).padStart(2, '0')}: 0x${u.toString(16).padStart(4, '0')} (${u})`);
}

// Try interpreting +0x0C as pointer to unit list
const ulPtr = readU32(cfgPtr + 0x0C) & 0xFFFFFF;
console.log(`\nUnit list pointer (cfg+0x0C): 0x${ulPtr.toString(16).padStart(6, '0')}`);
console.log('First 256 bytes of unit list as hex:');
for (let r = 0; r < 16; r++) {
  const row = [];
  for (let c = 0; c < 16; c++) row.push(rom[ulPtr + r * 16 + c].toString(16).padStart(2, '0'));
  console.log(`  +0x${(r * 16).toString(16).padStart(3, '0')}: ${row.join(' ')}`);
}

// Try other offsets inside config as potential unit list pointers
console.log('\nPotential pointers inside config header:');
for (let off = 0; off <= 28; off += 4) {
  const ptr = readU32(cfgPtr + off) & 0xFFFFFF;
  if (ptr && ptr < rom.length) {
    // Heuristic: if first few bytes look like unit data (classId/cmdId near 0x00-0x80, coords in 0..mapW/H)
    const cls = rom[ptr + 0x1B];
    const cmd = rom[ptr + 0x1A];
    const x = rom[ptr + 0x18];
    const y = rom[ptr + 0x19];
    console.log(`  +0x${off.toString(16)} -> 0x${ptr.toString(16)} | cls=${cls} cmd=${cmd} x=${x} y=${y}`);
  }
}

// Print the old 0x1E parsing as reference
console.log('\nOld 0x1E parsing reference:');
let off = 0;
const STRIDE = 0x1E;
let count = 0;
while (ulPtr + off + STRIDE <= rom.length && count < 10) {
  const a = ulPtr + off;
  const cls = rom[a + 0x1B], cmd = rom[a + 0x1A];
  if (cls === 0xFF && cmd === 0xFF) break;
  const x = rom[a + 0x18], y = rom[a + 0x19];
  const attr2 = readU32(a + 0x08);
  const isPlayer = (attr2 & 1) !== 0, isNPC = (attr2 & 2) !== 0;
  const faction = isPlayer ? 'P' : isNPC ? 'N' : 'E';
  console.log(`  #${count} [${faction}] cls=0x${cls.toString(16).padStart(2, '0')} cmd=0x${cmd.toString(16).padStart(2, '0')} (${x},${y}) attr2=0x${attr2.toString(16)}`);
  off += STRIDE;
  count++;
}

// Search for valid coordinate patterns near config pointer
console.log('\nSearch for byte pairs (x,y) where 0 < x < 32 and 0 < y < 24 in config area:');
const start = cfgPtr;
const end = Math.min(cfgPtr + 0x1000, rom.length);
for (let i = start; i < end - 2; i++) {
  const x = rom[i], y = rom[i + 1];
  if (x > 0 && x < mapW && y > 0 && y < mapH) {
    // Check next 2 bytes for classId/cmdId in reasonable range
    const cls = rom[i + 3], cmd = rom[i + 2];
    if (cls < 0xA0 && cmd < 0xA0) {
      console.log(`  Addr 0x${i.toString(16)}: (${x},${y}) cls=${cls} cmd=${cmd}`);
    }
  }
}
